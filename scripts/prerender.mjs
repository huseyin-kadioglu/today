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

// ── Ana prerender akışı ───────────────────────────────────────────────────────
async function prerender() {
  console.log("▶ Prerendering başlıyor…");
  const server = await startServer();
  const routes = generateRoutes();
  console.log(`  ${routes.length} rota işlenecek\n`);

  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
    ],
  });

  let ok = 0;
  let fail = 0;

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      // Sayfaya git — networkidle2: aktif bağlantı 2'nin altına düşünce devam
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 12000 });

      // Firestore verisi için ek bekleme
      await page.waitForFunction(
        () => !document.querySelector(".no-data[style]") &&
              (document.querySelector(".events li") || document.querySelector(".qz-header") ||
               document.querySelector(".article-title") || document.querySelector(".qh-grid")),
        { timeout: 5000 }
      ).catch(() => {}); // Veri yoksa timeout — yine de HTML'i al

      const html = await page.content();
      const outDir = path.join(DIST, route.replace(/^\//, ""));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

      ok++;
      process.stdout.write(ok % 30 === 0 ? `\n  ${ok}/${routes.length} ` : ".");
    } catch (e) {
      fail++;
      process.stdout.write("✗");
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n\n✅ Tamamlandı: ${ok} başarılı, ${fail} başarısız`);
  if (fail > 0) process.exit(1);
}

prerender().catch((e) => { console.error(e); process.exit(1); });
