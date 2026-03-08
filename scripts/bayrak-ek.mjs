/**
 * BAYRAK SORULARI — EK SORULAR
 * ──────────────────────────────
 * node scripts/bayrak-ek.mjs
 *
 * Mevcut 60 soruya 30 soru daha ekler (12 kolay, 10 orta, 8 zor).
 * Daha önce bayrak-sorulari.mjs çalıştırılmış olmalı.
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
  // ── KOLAY (12) ─────────────────────────────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/qa.png",
    options: ["Bahreyn", "Katar", "Umman", "Birleşik Arap Emirlikleri"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Katar bayrağının testere dişi şeklindeki beyaz kenarlığı, diğer Körfez ülkelerinin bayraklarından kolayca ayırt ettirir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ge.png",
    options: ["İsviçre", "Kıbrıs", "Gürcistan", "Malta"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Gürcistan bayrağında beş haç bulunur; büyük kırmızı haç İsa'yı, dört küçük haç dört İncil yazarını temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/cu.png",
    options: ["Porto Riko", "Küba", "Liberya", "Chile"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Küba bayrağındaki üçgen masonik sembolizmi, beyaz yıldız ise ülkenin bağımsızlığını simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ph.png",
    options: ["Filipinler", "Küba", "Uruguay", "Şili"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Filipinler bayrağındaki güneşin 8 ışını, İspanya'ya karşı ilk ayaklanan 8 eyaleti simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/sg.png",
    options: ["Malezya", "Endonezya", "Singapur", "Tayland"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Singapur bayrağındaki hilal ve beş yıldız genç ulusun yükselişini ve demokrasi, barış, ilerleme, adalet, eşitlik değerlerini simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/kh.png",
    options: ["Laos", "Myanmar", "Tayland", "Kamboçya"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Kamboçya bayrağı, dünyada bir yapıyı (Angkor Vat tapınağı) gösteren ender bayraklardan biridir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mm.png",
    options: ["Laos", "Myanmar", "Litvanya", "Senegal"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Myanmar bayrağı 2010'da değiştirildi; sarı, yeşil ve kırmızı renk dayanışmayı, barışı ve cesareti simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/al.png",
    options: ["Kuzey Makedonya", "Arnavutluk", "Ermenistan", "Karadağ"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Arnavutluk bayrağındaki çift başlı kartal Arnavutluk prenslerinin armacından alınmıştır ve doğuya ile batıya bakan vizyonu simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mv.png",
    options: ["Maldivler", "Pakistan", "Türkiye", "Cezayir"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Maldivler bayrağındaki yeşil dikdörtgen içindeki beyaz hilal İslam'ı simgeler; kırmızı zemin ülkenin bağımsızlığı için dökülen kanı temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/lk.png",
    options: ["Sri Lanka", "Bhutan", "Myanmar", "Moğolistan"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Sri Lanka bayrağındaki aslan ve kılıç Kandy Krallığı'nın son hükümdarlarının bayrağından gelmektedir; 2500 yıllık bir sembol.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mn.png",
    options: ["Moğolistan", "Kazakistan", "Kırgızistan", "Özbekistan"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Moğolistan bayrağındaki Soyombo sembolü 1686'da yaratılmış olup ateş, güneş, ay, yıl ve Taijitu'dan oluşan karmaşık bir simgedir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/cy.png",
    options: ["Kıbrıs", "Malta", "Yunanistan", "İsrail"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Kıbrıs bayrağı, üzerinde ülkenin haritasını taşıyan dünyada ender bayraklardan biridir. Zeytin dalları barışı simgeler.",
  },

  // ── ORTA (10) ──────────────────────────────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/fr.png",
    options: ["İtalya", "Belçika", "Fransa", "Hollanda"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Fransa bayrağının mavi, beyaz ve kırmızı renkleri Fransız Devrimi'nin sembolü haline gelmiş; özgürlük, eşitlik ve kardeşliği simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/it.png",
    options: ["İrlanda", "Meksika", "Macaristan", "İtalya"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "İtalya bayrağı Napoleon seferlerinden ilham alınarak Fransız bayrağının renklerine dayanır; yeşil İtalyan peyzajını simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/pl.png",
    options: ["Endonezya", "Monako", "Polonya", "Singapur"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Polonya bayrağındaki beyaz karkarın karın sembolü, kırmızı ise atalardan gelen zenginliği ve vatanseverliği temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/co.png",
    options: ["Ekvador", "Kolombiya", "Venezuela", "Bolivya"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Kolombiya, Ekvador ve Venezuela bayrakları neredeyse aynı renkleri taşır; hepsi Büyük Kolombiya'nın bayrağından esinlenmiştir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/cl.png",
    options: ["Küba", "Arjantin", "Şili", "Uruguay"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Şili bayrağındaki beyaz yıldız kuzey yıldızını simgeler; mavi şerit Büyük Okyanus'u, kırmızı şerit ise bağımsızlık için dökülen kanı temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/am.png",
    options: ["Ermenistan", "Kolombiya", "Ekvador", "Rusya"],
    correctIndex: 0,
    difficulty: "medium",
    fact: "Ermenistan bayrağının kırmızısı Ermeni dağlıklarını ve kanı, mavisi gökyüzünü ve nehirleri, turuncusu ise cesareti ve yaratıcılığı simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/jo.png",
    options: ["Filistin", "Ürdün", "Sudan", "Irak"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Ürdün bayrağındaki yedi köşeli yıldız Kuran'ın ilk suresinin yedi ayetini ve birlik, iman, ruh, erdem, adalet, feraset ve tevazuyu simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ae.png",
    options: ["Yemen", "Ürdün", "Umman", "Birleşik Arap Emirlikleri"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "BAE bayrağındaki dikey kırmızı şerit Kureş kabilesini simgeler; yatay renkler yeşil (umut), beyaz (barış) ve siyah (petrol zenginliği) anlamına gelir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/tw.png",
    options: ["Çin", "Tayvan", "Japonya", "Güney Kore"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Tayvan'ın 'Mavi Gökyüzü, Beyaz Güneş ve Kırmızı Toprak' bayrağı 12 ışınlı beyaz güneşiyle diğer Doğu Asya bayraklarından ayrılır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/iq.png",
    options: ["Suriye", "Mısır", "Irak", "Yemen"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Irak bayrağındaki Arapça yazı 'Allahu Ekber' (Allah en büyüktür) anlamına gelir ve 1991 yılında Saddam Hüseyin döneminde eklendi.",
  },

  // ── ZOR (8) ────────────────────────────────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/cz.png",
    options: ["Slovakya", "Çek Cumhuriyeti", "Polonya", "Slovenya"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Çek Cumhuriyeti bayrağı beyaz-kırmızı üstüne sol tarafta mavi üçgen içerir; Polonya bayrağıyla aynı renkler ama farklı tasarım.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/lv.png",
    options: ["Avusturya", "Letonya", "Polonya", "İsviçre"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Letonya bayrağının koyu kırmızı (bordo) ve beyaz rengi 13. yüzyıldan beri kullanılmaktadır. Kırmızı tonu Avusturya bayrağından daha koyudur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/lt.png",
    options: ["Gana", "Kolombiya", "Litvanya", "Etiyopya"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Litvanya bayrağındaki sarı buğdayı, yeşil ormanları ve umuda duyulan inancı, kırmızı ise cesareti ve dökülen kanı simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ee.png",
    options: ["Estonya", "Arjantin", "Finlandiya", "Slovakya"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Estonya bayrağındaki mavi gökyüzünü, siyah toprağı ve karanlık tarihi, beyaz ise karı ve saflığı simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/at.png",
    options: ["Avusturya", "Letonya", "Danimarka", "Singapur"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Avusturya bayrağının kırmızı-beyaz-kırmızı deseni efsaneye göre 1191'deki bir savaşta beyaz giysinin kandan kırmızıya boyanmasından gelir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/uy.png",
    options: ["Arjantin", "Uruguay", "El Salvador", "Guatemala"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Uruguay bayrağının sol üst köşesindeki Mayıs Güneşi Arjantin bayrağıyla benzerdir; ancak Uruguay'ın 9 yatay şeridi vardır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/pe.png",
    options: ["Peru", "Polonya", "Kanada", "Avusturya"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Peru bayrağı kırmızı-beyaz-kırmızı dikey şeritlerden oluşur; Avusturya bayrağıyla aynı renkler, ancak Peru'nunkinde şeritler dikeydir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ba.png",
    options: ["Bosna-Hersek", "Kosova", "Ukrayna", "Kazakistan"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Bosna-Hersek bayrağındaki mavi ve sarı renkler AB üyeliği hedefini simgeler; beyaz yıldızlar ülkenin üç kurucu halkını temsil eder.",
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
  console.log(`✅ ${Q.length} ek bayrak sorusu eklendi.`);
}

seed().catch(console.error);
