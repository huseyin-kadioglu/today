/**
 * Sitemap üretici
 * Çalıştır: node scripts/generate-sitemap.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://bugununtarihi.com.tr";
const TODAY = new Date().toISOString().slice(0, 10);

const MONTH_SLUGS   = ["ocak","subat","mart","nisan","mayis","haziran","temmuz","agustos","eylul","ekim","kasim","aralik"];
const DAYS_IN_MONTH = [31,29,31,30,31,30,31,31,30,31,30,31];

// Bugünün DD-monthslug formatı (changefreq="daily" olan tek sayfa)
const now = new Date(Date.now() + 3 * 60 * 60 * 1000); // UTC+3
const todaySlug = `${String(now.getUTCDate()).padStart(2,"0")}-${MONTH_SLUGS[now.getUTCMonth()]}`;

function url(loc, lastmod, changefreq, priority) {
  return `  <url><loc>${BASE}${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  url("/",           TODAY, "daily",  "1.0"),
  url("/quiz",       TODAY, "weekly", "0.8"),
  url("/makaleler",  TODAY, "weekly", "0.8"),
  url("/makale/10-kasim", "2026-01-01", "yearly", "0.7"),
  url("/makale/29-ekim",  "2026-01-01", "yearly", "0.7"),
  url("/makale/23-nisan", "2026-01-01", "yearly", "0.7"),
  url("/makale/19-mayis", "2026-01-01", "yearly", "0.7"),
  url("/makale/18-mart",  "2026-01-01", "yearly", "0.7"),
];

MONTH_SLUGS.forEach((slug, mi) => {
  for (let d = 1; d <= DAYS_IN_MONTH[mi]; d++) {
    const dd    = String(d).padStart(2, "0");
    const dateSlug = `${dd}-${slug}`;
    const isToday  = dateSlug === todaySlug;
    lines.push(url(`/${dateSlug}`,
      TODAY,
      isToday ? "daily" : "monthly",
      "0.7"
    ));
    lines.push(url(`/${dateSlug}/dogumlar-ve-olumler`,
      TODAY,
      "monthly",
      "0.6"
    ));
  }
});

lines.push("</urlset>");

const out = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`✅ sitemap.xml güncellendi — ${lines.length - 3} URL (lastmod: ${TODAY})`);
