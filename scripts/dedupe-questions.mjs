/**
 * Duplicate quiz soru temizleyici
 * question text'e göre duplicate'leri bulur, fazlalarını siler.
 * Çalıştır: node scripts/dedupe-questions.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore }        from "firebase-admin/firestore";
import { readFileSync }        from "fs";
import { fileURLToPath }       from "url";
import { dirname, join }       from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sa = JSON.parse(readFileSync(join(__dirname, "serviceAccountKey.json"), "utf8"));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

async function dedupe() {
  console.log("▶  quiz_questions koleksiyonu okunuyor...");
  const snap = await db.collection("quiz_questions").get();
  console.log(`   Toplam ${snap.size} döküman bulundu.`);

  // question text → ilk görülen doc ID
  const seen = new Map();
  const toDelete = [];

  for (const doc of snap.docs) {
    const text = doc.data().question?.trim();
    if (!text) continue;
    if (seen.has(text)) {
      toDelete.push(doc.id);
    } else {
      seen.set(text, doc.id);
    }
  }

  console.log(`   ${toDelete.length} duplicate bulundu.`);
  if (toDelete.length === 0) {
    console.log("✅ Temizlenecek bir şey yok.");
    process.exit(0);
  }

  // Firestore batch delete (500 limit)
  let deleted = 0;
  while (toDelete.length > 0) {
    const batch = db.batch();
    const chunk = toDelete.splice(0, 500);
    for (const id of chunk) {
      batch.delete(db.collection("quiz_questions").doc(id));
    }
    await batch.commit();
    deleted += chunk.length;
    process.stdout.write(`\r   Silindi: ${deleted}`);
  }

  console.log(`\n✅ ${deleted} duplicate döküman silindi.`);
  console.log(`   Kalan benzersiz soru sayısı: ${seen.size}`);
  process.exit(0);
}

dedupe().catch((e) => { console.error(e); process.exit(1); });
