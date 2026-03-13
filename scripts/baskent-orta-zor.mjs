/**
 * BAŞKENT SORULARI — ORTA-ZOR
 * ─────────────────────────────
 * node scripts/baskent-orta-zor.mjs
 *
 * 20 orta-zor soru: büyük şehirle başkentin karıştırıldığı ülkeler.
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
    question: "Fas'ın başkenti neresidir?",
    options: ["Kazablanka", "Marakeş", "Rabat", "Fes"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Rabat 1912'den bu yana başkenttir; çoğu insan büyük ticaret kenti Kazablanka'yı (Casablanca) başkent sanır.",
  },
  {
    question: "Kenya'nın başkenti neresidir?",
    options: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Nairobi 'serin sular' anlamına gelir; Swahili dilinde bu isim bölgedeki bir su kaynağından gelmektedir.",
  },
  {
    question: "Zimbabwe'nin başkenti neresidir?",
    options: ["Bulawayo", "Harare", "Mutare", "Gweru"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Harare 1982'ye kadar 'Salisbury' adını taşıyordu; bağımsızlığın ardından Zimbabwe Shona dilinde 'uyumuyor' anlamına gelen ismiyle yeniden adlandırıldı.",
  },
  {
    question: "Angola'nın başkenti neresidir?",
    options: ["Lubango", "Benguela", "Luanda", "Huambo"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Luanda 1576'da Portekizliler tarafından kurulan ve günümüzde Afrika'nın en pahalı şehirleri arasında yer alan başkenttir.",
  },
  {
    question: "Mozambik'in başkenti neresidir?",
    options: ["Beira", "Nampula", "Maputo", "Quelimane"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Maputo 1976'ya kadar 'Lourenço Marques' adıyla biliniyordu; ülkenin güney ucunda, Hint Okyanusu kıyısında yer alır.",
  },
  {
    question: "Cezayir'in başkenti neresidir?",
    options: ["Oran", "Constantine", "Cezayir", "Annaba"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Cezayir şehri ülkenin adıyla aynıdır (Arapça: Türkçede Cezayir = 'Adalar'). Akdeniz kıyısında ve Osmanlı döneminden gelen tarihi mimarisiyle öne çıkar.",
  },
  {
    question: "Tunus'un başkenti neresidir?",
    options: ["Sfax", "Sousse", "Tunus", "Kairouan"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Tunus şehri de ülkeyle aynı adı taşır. Tarihi Kartaca kalıntıları başkentin yakınındadır ve UNESCO Dünya Mirası listesindedir.",
  },
  {
    question: "Libya'nın başkenti neresidir?",
    options: ["Bingazi", "Trablus", "Misrata", "Sirte"],
    correctIndex: 1,
    difficulty: "medium_hard",
    fact: "Trablus (Tripoli) Akdeniz kıyısında yer alır; Bingazi (Benghazi) ikinci büyük şehir olmasına karşın başkent değildir.",
  },
  {
    question: "Nepal'in başkenti neresidir?",
    options: ["Pokhara", "Birgunj", "Biratnagar", "Katmandu"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Katmandu yaklaşık 1400 metre yükseklikte yer alır; 'Kâtmandu' adı eski bir ahşap tapınaktan gelmektedir.",
  },
  {
    question: "Moğolistan'ın başkenti neresidir?",
    options: ["Darkhan", "Erdenet", "Ulan Bator", "Choibalsan"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Ulan Bator (Ulaanbaatar) 'kızıl kahraman' anlamına gelir ve Moğolistan nüfusunun yaklaşık yarısı bu şehirde yaşar.",
  },
  {
    question: "İzlanda'nın başkenti neresidir?",
    options: ["Akureyri", "Keflavík", "Reykjavik", "Selfoss"],
    correctIndex: 2,
    difficulty: "medium_hard",
    fact: "Reykjavik 'buğulu körfez' anlamına gelir; dünyanın en kuzey başkentlerinden biri olup enerji ihtiyacını büyük ölçüde jeotermal kaynaklardan karşılar.",
  },
  {
    question: "İrlanda'nın başkenti neresidir?",
    options: ["Cork", "Galway", "Limerick", "Dublin"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Dublin İrlanda dilinde 'Baile Átha Cliath' (çitli sığ su keçidinin şehri) olarak adlandırılır.",
  },
  {
    question: "Çekya'nın başkenti neresidir?",
    options: ["Brno", "Ostrava", "Plzeň", "Prag"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Prag 'Bohemia Krallığı'nın' başkentliğini yüzyıllardır sürdürmektedir; 'Yüz Kulelerin Şehri' olarak da bilinir.",
  },
  {
    question: "Macaristan'ın başkenti neresidir?",
    options: ["Debrecen", "Miskolc", "Pécs", "Budapeşte"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Budapeşte 1873'te Buda ve Pest'in birleşmesiyle kuruldu; Tuna Nehri iki yakayı birbirinden ayırır.",
  },
  {
    question: "Romanya'nın başkenti neresidir?",
    options: ["Cluj-Napoca", "Timișoara", "Iaşi", "Bükreş"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Bükreş (Bucharest), 'küçük Paris' lakabını 20. yüzyılın başındaki Fransız etkili mimarisi nedeniyle kazandı.",
  },
  {
    question: "Bulgaristan'ın başkenti neresidir?",
    options: ["Plovdiv", "Varna", "Burgas", "Sofya"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Sofya Avrupa'nın en eski şehirlerinden biridir; yaklaşık 7000 yıllık geçmişiyle İstanbul'dan bile daha eskidir.",
  },
  {
    question: "Sırbistan'ın başkenti neresidir?",
    options: ["Novi Sad", "Niš", "Kragujevac", "Belgrad"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Belgrad 'beyaz şehir' anlamına gelir; Sava ve Tuna nehirlerinin kavşağında yer alır.",
  },
  {
    question: "Hırvatistan'ın başkenti neresidir?",
    options: ["Split", "Rijeka", "Dubrovnik", "Zagreb"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Zagreb, Adriyatik kıyısı yerine ülkenin iç kesiminde yer alır; çoğu turistin ziyaret ettiği Split veya Dubrovnik başkent değildir.",
  },
  {
    question: "Slovenya'nın başkenti neresidir?",
    options: ["Maribor", "Celje", "Koper", "Ljubljana"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Ljubljana Orta Avrupa'nın en küçük başkentlerinden biridir; tarihi merkezi nehir kıyısında şato altında yer alır.",
  },
  {
    question: "Slovakya'nın başkenti neresidir?",
    options: ["Košice", "Prešov", "Žilina", "Bratislava"],
    correctIndex: 3,
    difficulty: "medium_hard",
    fact: "Bratislava Avusturya ve Macaristan sınırına yürüme mesafesindedir; böylece iki farklı ülkeye en yakın konumdaki başkentlerden biridir.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");
  const batch = db.batch();
  for (const q of Q) {
    batch.set(col.doc(), { ...q, category: "baskentler" });
  }
  await batch.commit();
  console.log(`✅ ${Q.length} orta-zor başkent sorusu eklendi.`);
}

seed().catch(console.error);
