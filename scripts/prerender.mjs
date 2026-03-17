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
  routes.push("/quiz", "/makaleler", "/gizlilik", "/makale/10-kasim");
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
async function renderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 15000 });

    // İçeriğin yüklenmesini bekle (app-rendered event veya bilinen DOM öğeleri)
    await page.waitForFunction(
      () => window.__APP_RENDERED === true ||
            document.querySelector(".events li") ||
            document.querySelector(".qz-header") ||
            document.querySelector(".article-title") ||
            document.querySelector(".qh-grid"),
      { timeout: 6000 }
    ).catch(() => {});

    const html = await page.content();
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
      await renderRoute(browser, route);
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
