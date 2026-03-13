import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import VitePluginPrerender from "vite-plugin-prerender";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MONTH_SLUGS = [
  "ocak", "subat", "mart", "nisan", "mayis", "haziran",
  "temmuz", "agustos", "eylul", "ekim", "kasim", "aralik",
];
const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function generateDateRoutes() {
  const routes = [];
  MONTH_SLUGS.forEach((slug, mi) => {
    for (let d = 1; d <= DAYS_IN_MONTH[mi]; d++) {
      routes.push(`/${String(d).padStart(2, "0")}-${slug}`);
    }
  });
  return routes;
}

const STATIC_ROUTES = [
  "/quiz",
  "/makaleler",
  "/gizlilik",
  "/makale/10-kasim",
];

export default defineConfig({
  plugins: [
    react(),
    VitePluginPrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: [...generateDateRoutes(), ...STATIC_ROUTES],
      renderer: new PuppeteerRenderer({
        renderAfterDocumentEvent: "app-rendered",
        timeout: 6000,
        launchOptions: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      }),
    }),
  ],
});
