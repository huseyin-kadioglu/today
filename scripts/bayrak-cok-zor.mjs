/**
 * BAYRAK SORULARI — ÇOK ZOR
 * ──────────────────────────
 * node scripts/bayrak-cok-zor.mjs
 *
 * 20 çok zor soru: neredeyse özdeş bayraklar ve az bilinen ülkeler.
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
  // ── Neredeyse özdeş bayraklar ──────────────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/is.png",
    options: ["Norveç", "İsveç", "İzlanda", "Danimarka"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "İzlanda bayrağındaki kırmızı-beyaz İskandinav haçı mavi zemin üzerindedir; Norveç bayrağının renk düzeninin tam tersidir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/td.png",
    options: ["Romanya", "Andorra", "Belçika", "Çad"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Çad ve Romanya bayrakları neredeyse özdeştir; Çad bayrağının mavisi biraz daha koyu bir tona sahiptir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/si.png",
    options: ["Slovakya", "Rusya", "Slovenya", "Hırvatistan"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Slovenya bayrağı solunda kalkan motifli arma taşır; Slovakya bayrağından armanın konumuyla ayrılır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/sk.png",
    options: ["Rusya", "Slovenya", "Sırbistan", "Slovakya"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Slovakya bayrağındaki çift haçlı arma ortaya yerleştirilmiştir; Slovenya bayrağındaki arma sol tarafa yakındır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/nz.png",
    options: ["Avustralya", "Tuvalu", "Fiji", "Yeni Zelanda"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Yeni Zelanda ve Avustralya bayrakları çok benzer; ancak Yeni Zelanda'nın Güney Çarmıhı daha az yıldız içerir ve yıldızlar kırmızıdır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/au.png",
    options: ["Yeni Zelanda", "Tuvalu", "Papua Yeni Gine", "Avustralya"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Avustralya bayrağı 6 beyaz yıldız içerir: 5 Güney Çarmıhı için, 1 ise Commonwealth yıldızı olarak.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/nl.png",
    options: ["Fransa", "Lüksemburg", "Hollanda", "Hırvatistan"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Hollanda ve Lüksemburg bayrakları aynı renklerden oluşur; Lüksemburg bayrağı biraz daha açık mavi ve daha uzun proporsiyon taşır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/lu.png",
    options: ["Hollanda", "Fransa", "Andorra", "Lüksemburg"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Lüksemburg bayrağı Hollanda bayrağıyla aynı renk düzenini paylaşır; fark yalnızca mavinin tonu ve bayrağın en-boy oranındadır.",
  },
  // ── Az bilinen/egzotik ülke bayrakları ────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/km.png",
    options: ["Maldivler", "Komor Adaları", "Mauritanya", "Libya"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Komor Adaları bayrağı soldan sağa uzanan hilal ve 4 yıldız içerir; her yıldız bir adayı temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/pw.png",
    options: ["Palau", "Mikronezya", "Marshall Adaları", "Nauru"],
    correctIndex: 0,
    difficulty: "very_hard",
    fact: "Palau bayrağı açık mavi zemin üzerinde sarı bir daire taşır; bu daire tam ortada değil, hafif sola kaymış şekilde konumlanmıştır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/nr.png",
    options: ["Palau", "Marshall Adaları", "Tuvalu", "Nauru"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Nauru bayrağı lacivert zemininde ince altın şerit ile sola yakın konumlanmış 12 köşeli beyaz bir yıldız içerir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/fm.png",
    options: ["Palau", "Nauru", "Mikronezya", "Marshall Adaları"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Mikronezya Federal Devletleri bayrağında mavi zemin üzerinde 4 beyaz yıldız bulunur; bu yıldızlar 4 eyaleti temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mh.png",
    options: ["Nauru", "Mikronezya", "Kiribati", "Marshall Adaları"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Marshall Adaları bayrağı sol alttan sağ üste uzanan iki diyagonal şerit içerir; turuncu (cesaret) ve beyaz (barış) anlamına gelir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/tv.png",
    options: ["Fiji", "Tuvalu", "Avustralya", "Yeni Zelanda"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Tuvalu bayrağı açık mavi zemin üzerinde Union Jack ve 9 sarı yıldız içerir; yıldızlar Tuvalu'nun 9 adasını simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/gq.png",
    options: ["Kamerun", "Gabon", "Gine", "Ekvator Ginesi"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Ekvator Ginesi bayrağında yeşil, beyaz ve kırmızı yatay şeritler ve ortada ülkenin arması yer alır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/gw.png",
    options: ["Gana", "Gine-Bissau", "Gine", "Senegal"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Gine-Bissau bayrağı solunda dikey kırmızı şerit ve ortasında siyah yıldız, yatay üst yarısında sarı ve alt yarısında yeşil bulunur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/md.png",
    options: ["Romanya", "Belçika", "Moldova", "Çad"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Moldova bayrağı Romanya ile aynı mavi-sarı-kırmızı düzene sahiptir; yalnız ortasında Moldovya'nın karmaşık devlet arması bulunur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/tj.png",
    options: ["Kazakistan", "Kırgızistan", "Tacikistan", "Özbekistan"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Tacikistan bayrağı kırmızı, beyaz ve yeşil yatay şeritler içerir; ortasında altın renkli taç ve yedi yıldız yer alır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/tm.png",
    options: ["Azerbaycan", "Özbekistan", "Kırgızistan", "Türkmenistan"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Türkmenistan bayrağı koyu yeşil zemininde sol tarafta 5 halı deseni ve sağ üstte hilal ve 5 yıldız içeren benzersiz bir bayraktır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ss.png",
    options: ["Sudan", "Etiyopya", "Ekvator Ginesi", "Güney Sudan"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Güney Sudan bayrağı 2011'de bağımsızlıkla birlikte benimsendi; siyah, kırmızı ve yeşil şeritler, solda mavi üçgen ve altın yıldız içerir.",
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
  console.log(`✅ ${Q.length} çok zor bayrak sorusu eklendi.`);
}

seed().catch(console.error);
