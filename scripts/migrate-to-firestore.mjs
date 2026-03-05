/**
 * Google Sheets → Firestore Migration Script
 *
 * Kullanım:
 *   node scripts/migrate-to-firestore.mjs            → her ikisini de migrate et
 *   node scripts/migrate-to-firestore.mjs events      → sadece olaylar
 *   node scripts/migrate-to-firestore.mjs births      → sadece doğumlar/ölümler
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Firebase Admin Init ────────────────────────────────────────────────────────
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, "serviceAccountKey.json"), "utf8")
);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ── Google Sheets Config ───────────────────────────────────────────────────────
const SHEET_ID = "1yHFAy4yCOkEfDpJS0l8HV1jwI8cwJz3A4On6yJvblgQ";

async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet fetch hatası: ${res.status}`);
  const text = await res.text();
  return JSON.parse(text.substring(47).slice(0, -2));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Batch Write (500 limit, delay aralarında) ─────────────────────────────────
async function batchWrite(collectionName, docs) {
  const CHUNK = 400; // güvenli marjla 400
  let total = 0;

  for (let i = 0; i < docs.length; i += CHUNK) {
    const batch = db.batch();
    const chunk = docs.slice(i, i + CHUNK);

    chunk.forEach((doc) => {
      batch.set(db.collection(collectionName).doc(), doc);
    });

    let retries = 3;
    while (retries > 0) {
      try {
        await batch.commit();
        break;
      } catch (err) {
        retries--;
        if (retries === 0) throw err;
        console.log(`  ⚠️  Hata, ${3 - retries}. deneme: ${err.message}`);
        await sleep(3000);
      }
    }

    total += chunk.length;
    console.log(`  ${collectionName}: ${total}/${docs.length} yazıldı`);
    await sleep(300); // rate limit koruması
  }
}

// ── Parse Events (Sheet1) ─────────────────────────────────────────────────────
async function migrateEvents(offset = 0, limit = 999999) {
  console.log("\n📅 Olaylar çekiliyor (Sheet1)…");
  const json = await fetchSheet("Sheet1");

  let current = null;
  const seen = new Set();
  const docs = [];

  json.table.rows.forEach((r) => {
    const d = r.c[0]?.v;
    if (d) current = String(d).padStart(4, "0");
    if (current && r.c[1]?.v != null && r.c[2]?.v) {
      // Tekrar önleme
      const key = `${current}_${r.c[1].v}_${r.c[2].v.slice(0, 40)}`;
      if (seen.has(key)) return;
      seen.add(key);

      docs.push({
        date: current,
        year: Number(r.c[1].v),
        text: String(r.c[2].v),
        stoic: r.c[3]?.v ? String(r.c[3].v) : null,
        text_en: r.c[4]?.v ? String(r.c[4].v) : null,
      });
    }
  });

  const slice = docs.slice(offset, offset + limit);
  console.log(`  ${docs.length} benzersiz olay (${slice.length} tanesi yazılacak). Firestore'a yazılıyor…`);
  await batchWrite("events", slice);
  console.log("  ✅ Olaylar tamamlandı.");
}

// ── Parse Births & Deaths ─────────────────────────────────────────────────────
async function migrateBirthsDeaths(offset = 0, limit = 999999) {
  console.log("\n🌱 Doğumlar & Ölümler çekiliyor…");
  const json = await fetchSheet("dogumlar-olumler");

  let current = null;
  const seen = new Set();
  const docs = [];

  json.table.rows.forEach((r) => {
    const d = r.c[0]?.v;
    if (d) current = String(d).padStart(4, "0");
    if (current && r.c[1]?.v != null && r.c[2]?.v) {
      const key = `${current}_${r.c[1].v}_${r.c[2].v.slice(0, 40)}`;
      if (seen.has(key)) return;
      seen.add(key);

      docs.push({
        date: current,
        year: Number(r.c[1].v),
        text: String(r.c[2].v),
        type: r.c[4]?.v ? String(r.c[4].v) : "event",
        text_en: r.c[5]?.v ? String(r.c[5].v) : null,
      });
    }
  });

  const slice = docs.slice(offset, offset + limit);
  console.log(`  ${docs.length} benzersiz kayıt (${slice.length} tanesi yazılacak). Firestore'a yazılıyor…`);
  await batchWrite("birthsDeaths", slice);
  console.log("  ✅ Doğumlar & Ölümler tamamlandı.");
}

// ── Main ───────────────────────────────────────────────────────────────────────
// Kullanım örnekleri:
//   node migrate-to-firestore.mjs births          → tamamını yaz
//   node migrate-to-firestore.mjs births 0 15000  → 0'dan başla, 15000 yaz
//   node migrate-to-firestore.mjs births 15000    → 15000'den başla, kalanını yaz
const arg    = process.argv[2];
const offset = parseInt(process.argv[3] ?? "0");
const limit  = parseInt(process.argv[4] ?? "999999");

(async () => {
  console.log("🚀 Migration başlıyor…");
  if (process.argv[3]) console.log(`   offset: ${offset}, limit: ${limit}`);
  try {
    if (!arg || arg === "events") await migrateEvents(offset, limit);
    if (!arg || arg === "births") await migrateBirthsDeaths(offset, limit);
    console.log("\n🎉 Tamamlandı!");
  } catch (err) {
    console.error("\n❌ Hata:", err.message);
    process.exit(1);
  }
})();
