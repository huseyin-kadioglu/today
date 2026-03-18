/**
 * Post-build prerender script
 * Çalıştır: node scripts/prerender.mjs
 * Build komutuna entegre: vite build && node scripts/prerender.mjs
 */

import http   from "node:http";
import fs     from "node:fs";
import path   from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST  = path.join(__dirname, "..", "dist");
const PORT  = 3033;
const BASE  = `http://localhost:${PORT}`;

// Her kaç rotada bir browser yeniden başlatılsın
const RESTART_EVERY = 40;

// ── Rota listesi ──────────────────────────────────────────────────────────────
const MONTH_SLUGS   = ["ocak","subat","mart","nisan","mayis","haziran","temmuz","agustos","eylul","ekim","kasim","aralik"];
const DAYS_IN_MONTH = [31,29,31,30,31,30,31,31,30,31,30,31];

function generateRoutes() {
  const routes = [];
  MONTH_SLUGS.forEach((slug, mi) => {
    for (let d = 1; d <= DAYS_IN_MONTH[mi]; d++) {
      routes.push(`/${String(d).padStart(2, "0")}-${slug}`);
    }
  });
  routes.push(
    "/quiz",
    "/makaleler",
    "/gizlilik",
    "/makale/10-kasim",
    "/makale/29-ekim",
    "/makale/23-nisan",
    "/makale/19-mayis",
    "/makale/18-mart",
  );
  return routes;
}

// ── Statik dosya sunucusu (SPA fallback ile) ──────────────────────────────────
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp",
  ".ico": "image/x-icon", ".json": "application/json", ".txt": "text/plain",
  ".woff2": "font/woff2", ".woff": "font/woff",
};

function startServer() {
  const server = http.createServer((req, res) => {
    const url      = req.url.split("?")[0];
    const filePath = path.join(DIST, url);
    const isFile   = fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    const servePath = isFile ? filePath : path.join(DIST, "index.html");
    const ext = path.extname(servePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(servePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

// ── Chrome başlatma ───────────────────────────────────────────────────────────
async function launchBrowser() {
  return puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-zygote",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-default-apps",
      "--disable-sync",
      "--disable-translate",
      "--hide-scrollbars",
      "--mute-audio",
      "--no-first-run",
      "--safebrowsing-disable-auto-update",
    ],
  });
}

// ── Tek rota render ───────────────────────────────────────────────────────────
async function renderRoute(browser, route, eventsMap) {
  const page = await browser.newPage();
  try {
    // Tarih rotaları için preloaded events enjekte et
    const dateMatch = route.match(/^\/(\d{2})-(\w+)$/);
    if (dateMatch && eventsMap) {
      const [, dd, slug] = dateMatch;
      const monthIndex = MONTH_SLUGS.indexOf(slug);
      if (monthIndex !== -1) {
        const mm = String(monthIndex + 1).padStart(2, "0");
        const dateKey = `${dd}${mm}`;
        const eventsForDate = eventsMap[dateKey] ?? [];
        await page.evaluateOnNewDocument((data) => {
          window.__PRELOADED_EVENTS__ = data;
        }, eventsForDate);
      }
    }

    // Sayfa JS hatalarını yakala
    page.on("pageerror", (err) => {
      process.stdout.write(`\n  ⚠ JS error on ${route}: ${err.message} `);
    });

    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });

    // Rota tipine göre ilgili DOM elemanının belirmesini bekle
    let selectorFound = true;
    if (dateMatch) {
      // .events → loading=false olunca render edilir (boş olsa bile)
      selectorFound = await page.waitForSelector(".events", { timeout: eventsMap ? 6000 : 12000 })
        .then(() => true).catch(() => false);
    } else if (route === "/quiz") {
      selectorFound = await page.waitForSelector(".qh-grid", { timeout: 6000 })
        .then(() => true).catch(() => false);
    } else if (route.startsWith("/makale")) {
      selectorFound = await page.waitForSelector(".article-title", { timeout: 6000 })
        .then(() => true).catch(() => false);
    } else {
      // /gizlilik, /makaleler, vb.
      await new Promise((r) => setTimeout(r, 1500));
    }

    // Selector bulunamadıysa uyar
    if (!selectorFound) {
      process.stdout.write(`\n  ⚠ selector timeout: ${route} `);
    }

    // React'ın DOM'u tamamen settle etmesi için kısa bekleme
    await new Promise((r) => setTimeout(r, 80));

    const html = await page.content();

    // Boş root div kontrolü
    if (html.includes('id="root"></div>') || html.includes("id='root'></div>")) {
      process.stdout.write(`\n  ✗ EMPTY ROOT: ${route} `);
    }

    const outDir = path.join(DIST, route.replace(/^\//, ""));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
    return true;
  } finally {
    await page.close().catch(() => {}); // browser çökmüşse hata verme
  }
}

// ── Ana prerender akışı ───────────────────────────────────────────────────────
async function prerender() {
  console.log("▶ Prerendering başlıyor…");

  // Firebase-admin başlat ve tüm events'i önceden çek
  let eventsMap = null;
  try {
    let saRaw;
    if (process.env.FIREBASE_SA_JSON) {
      console.log("  FIREBASE_SA_JSON env var bulundu, decode ediliyor…");
      saRaw = Buffer.from(process.env.FIREBASE_SA_JSON, "base64").toString("utf8");
    } else {
      const saPath = path.join(__dirname, "serviceAccountKey.json");
      console.log(`  Env var yok, local dosya okunuyor: ${saPath}`);
      saRaw = fs.readFileSync(saPath, "utf8");
    }
    const sa = JSON.parse(saRaw);
    console.log(`  Service account: ${sa.client_email}`);
    initializeApp({ credential: cert(sa) });
    const adminDb = getFirestore();
    console.log("  Firestore bağlantısı kuruldu, events çekiliyor…");
    const snap = await adminDb.collection("events").get();
    eventsMap = {};
    snap.forEach((doc) => {
      const d = doc.data();
      if (!eventsMap[d.date]) eventsMap[d.date] = [];
      eventsMap[d.date].push(d);
    });
    for (const key of Object.keys(eventsMap)) {
      eventsMap[key].sort((a, b) => a.year - b.year);
    }
    console.log(`  ✅ Firestore: ${Object.keys(eventsMap).length} tarih, ${snap.size} event yüklendi`);
  } catch (e) {
    console.error(`  ❌ Firestore başlatılamadı: ${e.message}`);
    console.error("  → Prerender firebase-admin olmadan devam edecek (sayfalar boş olabilir)");
  }

  const server = await startServer();
  const routes = generateRoutes();
  console.log(`  ${routes.length} rota işlenecek\n`);

  let ok = 0;
  let fail = 0;
  let browser = await launchBrowser();

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];

    // Periyodik browser restart — memory birikimini önler
    if (i > 0 && i % RESTART_EVERY === 0) {
      await browser.close().catch(() => {});
      browser = await launchBrowser();
      process.stdout.write(`\n  [restart] ${i}/${routes.length} `);
    }

    try {
      await renderRoute(browser, route, eventsMap);
      ok++;
      process.stdout.write(ok % 50 === 0 ? `\n  ${ok}/${routes.length} ` : ".");
    } catch (e) {
      fail++;
      process.stdout.write("✗");

      // Browser çöktüyse yeniden başlat
      if (!browser.connected) {
        browser = await launchBrowser();
      }
    }
  }

  await browser.close().catch(() => {});
  server.close();

  console.log(`\n\n✅ Tamamlandı: ${ok} başarılı, ${fail} başarısız`);
  // Çok az başarısız rota kabul edilebilir (boş günler, vb.)
  if (fail > routes.length * 0.2) process.exit(1);
}

prerender().catch((e) => { console.error(e); process.exit(1); });
