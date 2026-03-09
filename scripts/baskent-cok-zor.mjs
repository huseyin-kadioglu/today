/**
 * BAŞKENT SORULARI — ÇOK ZOR
 * ────────────────────────────
 * node scripts/baskent-cok-zor.mjs
 *
 * 20 çok zor başkent sorusu: az bilinen veya yanıltıcı başkentler.
 * difficulty: "very_hard"
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

const Q = [
  {
    question: "Fildişi Sahili'nin (Côte d'Ivoire) resmi başkenti neresidir?",
    options: ["Abidjan", "Yamoussoukro", "Bouaké", "Korhogo"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Yamoussoukro 1983'ten bu yana resmi başkenttir; ticaret ve büyük şehir Abidjan'dır. Çoğu insan Abidjan'ı başkent sanır.",
  },
  {
    question: "Palau'nun başkenti neresidir?",
    options: ["Melekeok", "Koror", "Ngerulmud", "Babeldaob"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Ngerulmud dünyanın en az nüfuslu başkentidir; yaklaşık 300 kişilik nüfusuyla mütevazı idari binalardan oluşur.",
  },
  {
    question: "Tuvalu'nun başkenti neresidir?",
    options: ["Apia", "Nukualofa", "Funafuti", "Tarawa"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Funafuti dünyada iklim değişikliği tehdidiyle karşı karşıya olan başkentlerin başında gelir; ada yüksekliği yalnızca birkaç metredir.",
  },
  {
    question: "Kiribati'nin başkenti neresidir?",
    options: ["Funafuti", "Honiara", "Nuku'alofa", "Tarawa"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Tarawa, hem gün değişim çizgisinin iki yanına yayılmış hem de okyanus yükselmesine karşı savunmasız olan Kiribati'nin başkentidir.",
  },
  {
    question: "Mikronezya Federal Devletleri'nin başkenti neresidir?",
    options: ["Koror", "Honiara", "Palikir", "Majuro"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Palikir Pohnpei adasında yer alır ve 6.000'den az kişiyle dünyanın en küçük başkent nüfusları arasındadır.",
  },
  {
    question: "Marshall Adaları'nın başkenti neresidir?",
    options: ["Palikir", "Funafuti", "Yaren", "Majuro"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Majuro atoolu Marshall Adaları'nın hem başkenti hem de en büyük kentsel merkezidir.",
  },
  {
    question: "Nauru'nun başkent niteliğindeki yönetim merkezi neresidir?",
    options: ["Denigomodu", "Aiwo", "Yaren", "Boe"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Nauru'nun resmi başkenti yoktur; Yaren bölgesi parlamento ve hükümet binaları nedeniyle fiili başkent işlevi görür.",
  },
  {
    question: "Samoa'nın başkenti neresidir?",
    options: ["Nuku'alofa", "Pago Pago", "Suva", "Apia"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Apia Samoa'nın en büyük şehridir. Pago Pago ise ABD'ye bağlı Amerikan Samoa'nın yönetim merkezidir.",
  },
  {
    question: "Tonga'nın başkenti neresidir?",
    options: ["Apia", "Suva", "Honiara", "Nuku'alofa"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Nuku'alofa 'rüzgarların aşkı' anlamına gelir ve Pasifik'in son monarşisi olan Tonga Krallığı'nın başkentidir.",
  },
  {
    question: "Vanuatu'nun başkenti neresidir?",
    options: ["Honiara", "Suva", "Apia", "Port Vila"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Port Vila Efate adasında yer alır ve Vanuatu'nun en büyük şehri ve turizm merkezidir.",
  },
  {
    question: "Brunei'nin başkenti neresidir?",
    options: ["Kota Kinabalu", "Kuching", "Miri", "Bandar Seri Begawan"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Bandar Seri Begawan 'huzur yurdu sultanının şehri' anlamına gelir ve petrol zengini Brunei'nin parlak başkentidir.",
  },
  {
    question: "Timor-Leste'nin başkenti neresidir?",
    options: ["Kupang", "Baucau", "Dili", "Maliana"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Dili 2002'de bağımsızlıkla birlikte başkent oldu; Timor-Leste 21. yüzyılın ilk yeni ülkesiydi.",
  },
  {
    question: "Bhutan'ın başkenti neresidir?",
    options: ["Paro", "Punakha", "Phuntsholing", "Thimphu"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Thimphu, deniz seviyesinden yaklaşık 2300 metre yüksekliğiyle dünyanın en yüksek başkentlerinden biridir.",
  },
  {
    question: "Burkina Faso'nun başkenti neresidir?",
    options: ["Bamako", "Niamey", "Lomé", "Ouagadougou"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Ouagadougou Moré dilinde 'onurlu insanların vatanı' anlamına gelir ve Batı Afrika'nın en büyük kültür başkentlerinden biridir.",
  },
  {
    question: "Nijer'in başkenti neresidir?",
    options: ["Ndjamena", "Ouagadougou", "Bamako", "Niamey"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Niamey Niger Nehri kıyısında yer alır ve yüz yılı aşkın süredir Nijer'in idari merkezi olma özelliğini korumaktadır.",
  },
  {
    question: "Çad'ın başkenti neresidir?",
    options: ["Niamey", "Bangui", "Khartoum", "N'Djamena"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "N'Djamena Arapça 'dinlence yeri' anlamına gelir; 1900'de Fransız sömürge dönemi kenti olarak kurulmuştur.",
  },
  {
    question: "Ekvator Ginesi'nin başkenti neresidir?",
    options: ["Libreville", "Yaoundé", "Bangui", "Malabo"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Malabo Bioko adasında yer alır; kıta Afrikası'ndan ayrı bir adada bulunan nadir başkentlerden biridir.",
  },
  {
    question: "Komor Adaları'nın başkenti neresidir?",
    options: ["Victoria", "São Tomé", "Moroni", "Malé"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Moroni 'kalp' anlamına gelir ve Hint Okyanusu'ndaki volkanik Komor Adaları'nın başkentidir.",
  },
  {
    question: "Seyşeller'in başkenti neresidir?",
    options: ["Moroni", "Port Louis", "Victoria", "Antananarivo"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Victoria, Hint Okyanusu'ndaki Mahe adasında yer alır ve dünyanın en küçük başkentlerinden biri olup yaklaşık 26.000 kişi yaşar.",
  },
  {
    question: "São Tomé ve Príncipe'nin başkenti neresidir?",
    options: ["Libreville", "Malabo", "Victoria", "São Tomé"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "São Tomé körfez kıyısındaki bu küçük ada ülkesinin başkentidir; Atlas Okyanusu'ndaki tek çikolata üreticisi ülkelerden biridir.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");
  const batch = db.batch();
  for (const q of Q) {
    batch.set(col.doc(), { ...q, category: "baskentler" });
  }
  await batch.commit();
  console.log(`✅ ${Q.length} çok zor başkent sorusu eklendi.`);
}

seed().catch(console.error);
