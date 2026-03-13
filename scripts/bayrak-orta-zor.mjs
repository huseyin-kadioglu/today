/**
 * BAYRAK SORULARI — ORTA-ZOR
 * ───────────────────────────
 * node scripts/bayrak-orta-zor.mjs
 *
 * 20 orta-zor soru: tanıdık olmayan ama tahmin edilebilir bayraklar.
 * difficulty: "medium_hard"
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
    flagUrl: "https://flagcdn.com/w320/gh.png",
    options: ["Senegal", "Gana", "Mali", "Kamerun"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Gana bayrağı siyah yıldızlı kırmızı-sarı-yeşil trikolordur; siyah yıldız Afrika'nın özgürlük mücadelesini simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ke.png",
    options: ["Zimbabwe", "Kenya", "Uganda", "Ruanda"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Kenya bayrağındaki siyah-kırmızı-yeşil renkler Masai kalkanı ve iki mızrakla birleşir; siyah Kenya halkını temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/et.png",
    options: ["Kamerun", "Etiyopya", "Gine", "Senegal"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Etiyopya bayrağı Pan-Afrika renklerinin (yeşil, sarı, kırmızı) kaynağıdır; ortadaki mavi daire ve yıldız birliği temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ng.png",
    options: ["İrlanda", "Nijerya", "Fildişi Sahili", "Madagaskar"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Nijerya bayrağı yeşil-beyaz-yeşil üç dikey şeritten oluşur; yeşil tarımı, beyaz ise barışı simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/tz.png",
    options: ["Tanzanya", "Trinidad ve Tobago", "Papau Yeni Gine", "Bruney"],
    correctIndex: 0,
    difficulty: "medium_hard",
    fact: "Tanzanya bayrağı köşeden köşeye uzanan altın şeritli siyah bant ve üçgen yeşil ile mavi alanlardan oluşur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/zw.png",
    options: ["Zimbabwe", "Zimbabve", "Mozambik", "Zambia"],
    correctIndex: 0,
    difficulty: "medium_hard",
    fact: "Zimbabwe bayrağı 7 renkli yatay şerit ve solda beyaz üçgen içinde Zimbabwe kuşu ile kırmızı yıldız taşır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mz.png",
    options: ["Mozambik", "Zimbabwe", "Angola", "Zambia"],
    correctIndex: 0,
    difficulty: "medium_hard",
    fact: "Mozambik bayrağı üzerinde AK-47 tüfeği bulunan tek ulusal bayraktır; silah, bağımsızlık mücadelesini simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/kz.png",
    options: ["Kazakistan", "Türkmenistan", "Özbekistan", "Kırgızistan"],
    correctIndex: 0,
    difficulty: "medium_hard",
    fact: "Kazakistan bayrağı açık mavi zemininde sol tarafta dikey sarı şerit, ortada güneş ve kartal motifi içerir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/az.png",
    options: ["Özbekistan", "Pakistan", "Türkmenistan", "Azerbaycan"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Azerbaycan bayrağı mavi-kırmızı-yeşil yatay şeritlerden oluşur; ortasında beyaz hilal ve sekiz köşeli yıldız bulunur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mk.png",
    options: ["Kuzey Makedonya", "Kıbrıs", "Japonya", "Filipinler"],
    correctIndex: 0,
    difficulty: "medium_hard",
    fact: "Kuzey Makedonya bayrağında kırmızı zemin üzerinde sekiz ışınlı altın güneş yer alır; bu sembol 'Vergina Güneşi' olarak bilinir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/rs.png",
    options: ["Rusya", "Sırbistan", "Slovakya", "Slovenya"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Sırbistan bayrağı kırmızı-mavi-beyaz yatay şeritler içerir; sol üst köşede armalı devlet bayrağı daha yaygın kullanılır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/hr.png",
    options: ["Hırvatistan", "Arnavutluk", "Sırbistan", "Avusturya"],
    correctIndex: 0,
    difficulty: "medium_hard",
    fact: "Hırvatistan bayrağı kırmızı-beyaz-mavi şeritleri ve ortasında ülkenin tarihi topraklarını gösteren karmaşık kalkanıyla tanınır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/hn.png",
    options: ["El Salvador", "Honduras", "Nikaragua", "Guatemala"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Honduras bayrağı mavi-beyaz-mavi yatay şeritler ve ortada beş mavi yıldızdan oluşur; yıldızlar Orta Amerika Federasyonu'nu simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ni.png",
    options: ["Honduras", "El Salvador", "Nikaragua", "Arjantin"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Nikaragua bayrağı mavi-beyaz-mavi şeritler içerir; ortasındaki arma Orta Amerika'nın beş ülkesini temsil eden bir üçgen içerir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/bo.png",
    options: ["Bolivya", "Macaristan", "Gana", "Gine"],
    correctIndex: 0,
    difficulty: "medium_hard",
    fact: "Bolivya bayrağı kırmızı-sarı-yeşil yatay şeritlerden oluşur; renkler ülkenin hayvan zenginliğini, madenleri ve bitki örtüsünü simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ec.png",
    options: ["Kolombiya", "Venezuela", "Ekvador", "Peru"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Ekvador, Kolombiya ve Venezuela bayrakları aynı sarı-mavi-kırmızı düzeni paylaşır; Ekvador'unki ortasında detaylı bir arma taşır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ve.png",
    options: ["Ekvador", "Venezuela", "Kolombiya", "Bolivia"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Venezuela bayrağında sarı-mavi-kırmızı şeritler ve ortasında 8 yıldızlı yay bulunur; Simon Bolivar'ın sözleri bayrağın ilham kaynağıdır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/kp.png",
    options: ["Vietnam", "Çin", "Kuzey Kore", "Güney Kore"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Kuzey Kore bayrağı mavi kenarlıklı kırmızı şerit içerir; solda beyaz daire içinde tek kırmızı yıldız yer alır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/sn.png",
    options: ["Kamerun", "Mali", "Senegal", "Gine"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Senegal bayrağı yeşil-sarı-kırmızı dikey şeritlerden oluşur; ortasındaki yeşil yıldız ülkenin İslam geleneğini simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/sz.png",
    options: ["Lesoto", "Swaziland/Eswatini", "Ruanda", "Burundi"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Eswatini (eski Swaziland) bayrağında mavi, sarı ve kırmızı şeritler arasında Swazi savaş kalkanı ve mızraklar yer alır.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");
  const batch = db.batch();
  for (const q of Q) {
    batch.set(col.doc(), {
      ...q,
      question: "Bu bayrak hangi ülkeye ait?",
      category: "bayraklar",
    });
  }
  await batch.commit();
  console.log(`✅ ${Q.length} orta-zor bayrak sorusu eklendi.`);
}

seed().catch(console.error);
