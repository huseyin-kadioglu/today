/**
 * BAYRAK SORULARI — Firestore'a ekle
 * ────────────────────────────────────
 * node scripts/bayrak-sorulari.mjs
 *
 * 60 soru: 20 kolay · 20 orta · 20 zor
 * Koleksiyon: quiz_questions  (mevcut sorularla aynı koleksiyon)
 * Kategori:   bayraklar
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

// Bayrak CDN: https://flagcdn.com/w320/{kod}.png  (ISO 3166-1 alpha-2, küçük harf)
const Q = [
  // ── KOLAY (20) ───────────────────────────────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/jp.png",
    options: ["Güney Kore", "Japonya", "Tayvan", "Gürcistan"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Japonya'nın kırmızı güneş diski 'Hinomaru' (güneşin kökeni) olarak bilinir ve yüzyıllardır kullanılmaktadır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ca.png",
    options: ["Amerika Birleşik Devletleri", "Avustralya", "Kanada", "Yeni Zelanda"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Kanada akçaağaç yaprağını 1965'te bayrağına almıştır; daha önce Union Jack ve kırmızı bayrak kullanılıyordu.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ch.png",
    options: ["Danimarka", "Kıbrıs", "Yunanistan", "İsviçre"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "İsviçre bayrağı kare biçimiyle dünyanın yalnızca iki kare ulusal bayrağından biridir (diğeri Vatikan).",
  },
  {
    flagUrl: "https://flagcdn.com/w320/gb.png",
    options: ["Avustralya", "Kanada", "Yeni Zelanda", "Birleşik Krallık"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Union Jack, İngiltere'nin kırmızı haçını, İskoçya'nın beyaz X haçını ve İrlanda'nın kırmızı X haçını birleştirir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/br.png",
    options: ["Brezilya", "Bolivya", "Ekvador", "Venezuela"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Brezilya bayrağındaki yıldız deseni 15 Kasım 1889 gecesi Rio de Janeiro'nun gökyüzünü temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/cn.png",
    options: ["Vietnam", "Kuzey Kore", "Laos", "Çin"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Büyük yıldız Komünist Parti'yi, dört küçük yıldız işçi, köylü, kentli ve ulusal burjuvaziyi temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/sa.png",
    options: ["Pakistan", "Afganistan", "Libya", "Suudi Arabistan"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Suudi Arabistan bayrağındaki Kelime-i Şahadet yazısı nedeniyle bayrak asla yarıya indirilmez.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/tr.png",
    options: ["Azerbaycan", "Pakistan", "Özbekistan", "Türkiye"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Türk bayrağındaki kırmızı zemin üzerindeki ay ve yıldız sembolü Osmanlı İmparatorluğu'ndan miras kalmıştır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/jm.png",
    options: ["Trinidad ve Tobago", "Bahamalar", "Barbados", "Jamaika"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Jamaika bayrağı, renkleri arasında kırmızı veya mavi içermeyen tek ulusal bayraktır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/za.png",
    options: ["Kenya", "Nijerya", "Zimbabwe", "Güney Afrika"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Güney Afrika bayrağı 1994'te apartheid sonrası birliği simgelemek için tasarlandı; Y şekli yolların birleşmesini temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/us.png",
    options: ["Liberya", "Amerika Birleşik Devletleri", "Uruguay", "Malezya"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "50 yıldız 50 eyaleti, 13 şerit ise İngiltere'den bağımsızlığını kazanan ilk 13 koloniyi temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/np.png",
    options: ["Bhutan", "Sri Lanka", "Hindistan", "Nepal"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Nepal bayrağı dikdörtgen olmayan tek ulusal bayraktır; iki üçgenin birleşiminden oluşan özgün bir formdur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/bt.png",
    options: ["Sri Lanka", "Brunei", "Ermenistan", "Bhutan"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Bhutan'ın Tibetçe adı 'Druk Yul' (Ejderha Ülkesi) demektir. Bayrağındaki ejderha bu isimden gelir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/kr.png",
    options: ["Japonya", "Tayvan", "Moğolistan", "Güney Kore"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Taegukgi'deki kırmızı-mavi yin-yang kozmik dengeyi, dört köşedeki trigram sembolü doğanın döngüsünü temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/in.png",
    options: ["Nijer", "Fildişi Sahili", "İrlanda", "Hindistan"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Ortadaki Ashoka Çarkı Maurya İmparatorluğu'ndan alınmış Dharma Çarkı'dır; 24 dişi günün 24 saatini temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ar.png",
    options: ["Uruguay", "El Salvador", "Guatemala", "Arjantin"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Arjantin bayrağındaki 'Mayıs Güneşi', 25 Mayıs 1810'da Buenos Aires'te görüldüğü rivayet edilen güneşi simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/pt.png",
    options: ["İtalya", "İspanya", "Macaristan", "Portekiz"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Portekiz bayrağındaki armillary sphere (küresi) 15-16. yüzyıllardaki büyük keşif seferlerini simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mx.png",
    options: ["İtalya", "Bulgaristan", "Macaristan", "Meksika"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Meksika bayrağındaki kartal ve yılan Azteklerin Tenochtitlan'ı kurmalarına dair efsaneyi anlatır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/gr.png",
    options: ["Finlandiya", "İsveç", "Uruguay", "Yunanistan"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Yunan bayrağındaki 9 çizgi 'ΕΛΕΥΘΕΡΊΑ Ή ΘΑΝΑΤΟΣ' (Özgürlük Ya Da Ölüm) sloganının 9 hecesini temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/bb.png",
    options: ["Bahamalar", "Trinidad ve Tobago", "Fiji", "Barbados"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Barbados bayrağındaki trident (üç dişli yaba), deniz tanrısı Neptün'ün asasından esinlenerek tasarlanmıştır.",
  },

  // ── ORTA (20) ────────────────────────────────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/az.png",
    options: ["Türkiye", "Tacikistan", "Özbekistan", "Azerbaycan"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Azerbaycan bayrağındaki mavi Türk kimliğini, kırmızı modernliği, yeşil İslam'ı temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/pk.png",
    options: ["Suudi Arabistan", "Afganistan", "Türkmenistan", "Pakistan"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Pakistan bayrağındaki beyaz dikey şerit Müslüman olmayan azınlıkları, yeşil alan ise Müslüman çoğunluğu simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/no.png",
    options: ["Danimarka", "İzlanda", "Finlandiya", "Norveç"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Norveç bayrağı, mavi-beyaz kenarlıklı İskandinav haçını kırmızı zemine yerleştirerek Danimarka bayrağından türetilmiştir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/se.png",
    options: ["Norveç", "Finlandiya", "Danimarka", "İsveç"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "İsveç bayrağının sarı-mavi renkleri en az 14. yüzyıldan beri kullanılmakta olup kraliyet armasından gelmektedir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/dk.png",
    options: ["İzlanda", "İsviçre", "Norveç", "Danimarka"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Danimarka bayrağı 'Dannebrog' dünyanın en eski ulusal bayrağıdır; 1219'dan beri kullanılmaktadır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/eg.png",
    options: ["Suriye", "Irak", "Yemen", "Mısır"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Mısır bayrağındaki Selahaddin kartalı ortaçağ İslam mirasından ilham alarak ülkenin gücünü simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/vn.png",
    options: ["Çin", "Kuzey Kore", "Küba", "Vietnam"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Vietnam bayrağındaki kırmızı zemin devrimi, altın yıldız beş toplumsal sınıfı (işçi, köylü, asker, aydın, genç) simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/de.png",
    options: ["Belçika", "Almanya", "Nijer", "Kolombiya"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Almanya'nın siyah-kırmızı-altın renkleri 19. yüzyıl liberal ve ulusal birlik hareketlerinden kaynaklanır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ir.png",
    options: ["Afganistan", "Tacikistan", "Özbekistan", "İran"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "İran bayrağındaki şeritlerin birleşim noktasında 22 kez tekrarlanan 'Allah' yazısı İslam Cumhuriyeti'nin kuruluş tarihini simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ua.png",
    options: ["İsveç", "Kazakistan", "Finlandiya", "Ukrayna"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Ukrayna bayrağının mavisi gökyüzünü, sarısı altın buğday tarlalarını simgeler; 1848'den beri kullanılmaktadır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/au.png",
    options: ["Yeni Zelanda", "Fiji", "Tuvalu", "Avustralya"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Avustralya bayrağındaki Güney Haçı 7 yıldızlıdır (6 eyalet + 1 federal bölge), Yeni Zelanda'nınki ise 4 kırmızı yıldızdan oluşur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/il.png",
    options: ["Yunanistan", "Uruguay", "Finlandiya", "İsrail"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "İsrail bayrağındaki iki mavi çizgi geleneksel Yahudi dua şalını (tallit) simgeler. Davud Yıldızı 1897'den beri Siyonizm sembolüdür.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/kz.png",
    options: ["Moğolistan", "Özbekistan", "Türkmenistan", "Kazakistan"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Kazakistan bayrağının açık mavisi Türk kimliğini, altın güneş refahı, kartal özgürlüğü simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/th.png",
    options: ["Endonezya", "Laos", "Kamboçya", "Tayland"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Tayland bayrağının ortasındaki mavi şerit 1917'de Birinci Dünya Savaşı sırasında kraliyet ailesini simgelemek için eklendi.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ma.png",
    options: ["Lübnan", "Irak", "Suudi Arabistan", "Fas"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Fas bayrağındaki yeşil pentagram (beş köşeli yıldız) Hz. Süleyman'ın Mührü'nden esinlenerek tasarlanmıştır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ru.png",
    options: ["Sırbistan", "Hollanda", "Fransa", "Rusya"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Rusya'nın beyaz-mavi-kırmızı trikoloru 17. yüzyılda Çar I. Petro tarafından Hollanda bayrağından ilham alınarak tasarlandı.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/fi.png",
    options: ["Estonya", "İsveç", "Yunanistan", "Finlandiya"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Finlandiya bayrağındaki mavi İskandinav haçı gölleri ve gökyüzünü, beyaz zemin kış karını simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/dz.png",
    options: ["Pakistan", "Suudi Arabistan", "Libya", "Cezayir"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Cezayir bayrağının yarısı yeşil (İslam ve umut), yarısı beyaz (barış); ortasında kırmızı hilal ve yıldız bulunur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ly.png",
    options: ["Yemen", "Suriye", "Mısır", "Libya"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Libya bayrağı kırmızı, siyah ve yeşil yatay şeritlerden oluşur; ortadaki hilal ve yıldız 2011 devriminden sonra yeniden benimsendi.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/es.png",
    options: ["Kolombiya", "Venezuela", "Ekvador", "İspanya"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "İspanya bayrağındaki kırmızı ve sarı renkler Kastilya, Aragon, Navarra ve Granada krallıklarının geleneksel renklerinden gelir.",
  },

  // ── ZOR (20) ─────────────────────────────────────────────────────────────────
  {
    flagUrl: "https://flagcdn.com/w320/ro.png",
    options: ["Çad", "Andorra", "Moldova", "Romanya"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Romanya ve Çad bayrakları neredeyse identiktir; yalnızca mavi tonun hafifçe farklı olmasıyla ayrılırlar.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/td.png",
    options: ["Fransa", "Çad", "Moldova", "Romanya"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Çad 1959'da bağımsızlığında Romanya bayrağıyla neredeyse aynı renkleri benimsedi. BM bu benzerliği resmi kayıt altına almıştır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/id.png",
    options: ["Endonezya", "Monako", "Singapur", "Polonya"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Endonezya ve Monako bayrakları renk olarak tamamen aynıdır; yalnızca boyut oranları birbirinden farklıdır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/mc.png",
    options: ["Endonezya", "Monako", "Polonya", "Singapur"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Monako bayrağı Avrupa'nın en eski bayraklarından biridir ve Grimaldi hanedanı renkleri olan kırmızı ile beyazı kullanır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ci.png",
    options: ["İrlanda", "Hindistan", "Nijer", "Fildişi Sahili"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Fildişi Sahili bayrağı İrlanda bayrağının ayna görüntüsüdür; turuncu solda, yeşil sağda yer alır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ie.png",
    options: ["Fildişi Sahili", "Nijer", "Hindistan", "İrlanda"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "İrlanda bayrağının yeşili Katolikleri, turuncu Protestanları, beyaz ise iki topluluk arasındaki barışı simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/nl.png",
    options: ["Hollanda", "Lüksemburg", "Fransa", "Rusya"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Hollanda bayrağı 1630'larda kırmızısının zamanla solmasıyla bugünkü rengine kavuştu. Dünyanın en eski üç renkli bayraklarından biridir.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/lu.png",
    options: ["Hollanda", "Lüksemburg", "Fransa", "Rusya"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Lüksemburg bayrağı Hollanda bayrağına çok benzer; mavi rengi daha açık ve boyut oranı biraz farklıdır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/sk.png",
    options: ["Slovenya", "Rusya", "Slovakya", "Hırvatistan"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Slovakya bayrağındaki Ortodoks haçı ve üç tepe Tatry, Fatra ve Matra dağlarını simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/si.png",
    options: ["Rusya", "Slovakya", "Hırvatistan", "Slovenya"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Slovenya bayrağının sol üst köşesindeki armada üç altın yıldız ve dağ silueti bulunur; bu detay Slovakya'dan ayırt etmeyi sağlar.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/rs.png",
    options: ["Rusya", "Slovakya", "Çek Cumhuriyeti", "Sırbistan"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Sırbistan bayrağı Rusya'nın tersine (kırmızı üstte) düzenlenmiştir ve ortasında iki başlı kartal arması bulunur.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ng.png",
    options: ["Nijerya", "Senegal", "Gine", "Mali"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Nijerya bayrağı 1960 bağımsızlığında kabul edildi. Yeşil tarımı, beyaz ise birlik ve barışı simgeler.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/sn.png",
    options: ["Gine", "Mali", "Nijerya", "Senegal"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Senegal bayrağındaki Pan-Afrika renkleri Gine ve Mali bayraklarıyla aynıdır; ortadaki yeşil yıldız ise Senegal'i ayırt eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ml.png",
    options: ["Senegal", "Gine", "Mali", "Kamerun"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Mali bayrağı Fransa bayrağının Pan-Afrika versiyonudur; mavi-beyaz-kırmızı yerine yeşil-sarı-kırmızı kullanılmıştır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/hr.png",
    options: ["Sırbistan", "Rusya", "Slovenya", "Hırvatistan"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Hırvatistan bayrağındaki kırmızı-beyaz kareli arma ortaçağdan beri ülkenin ulusal sembolüdür.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/nz.png",
    options: ["Avustralya", "Fiji", "Tuvalu", "Yeni Zelanda"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Yeni Zelanda bayrağını Avustralya'dan ayırmanın en kolay yolu: Yeni Zelanda'nın 4 yıldızı kırmızı ve beyaz kenarlıksızdır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/gn.png",
    options: ["Mali", "Senegal", "Gine", "Kamerun"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Gine bayrağı Mali bayrağının tam tersidir; Gine'de kırmızı solda, Mali'de yeşil soldadır. İkisi de Pan-Afrika renklerini kullanır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/cm.png",
    options: ["Senegal", "Gine", "Mali", "Kamerun"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Kamerun bayrağı Pan-Afrika renkleri taşır; ortasındaki sarı yıldız birliği simgeler ve renk sırası Mali ve Gine'den farklıdır.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/by.png",
    options: ["Rusya", "Polonya", "Litvanya", "Belarus"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Belarus bayrağı 1995 referandumundan bu yana Sovyet dönemine yakın bir tasarıma sahiptir. Soldaki dekoratif desen geleneksel Belorus dokumacılığını temsil eder.",
  },
  {
    flagUrl: "https://flagcdn.com/w320/ad.png",
    options: ["Romanya", "Moldova", "Andorra", "Çad"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Andorra bayrağı Fransa ve İspanya arasındaki küçük Pireneler prensliğini yansıtır; armasında her iki komşu ülkeye gönderme yapan semboller bulunur.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");
  let batch = db.batch();
  for (let i = 0; i < Q.length; i++) {
    if (i > 0 && i % 499 === 0) {
      await batch.commit();
      batch = db.batch();
    }
    batch.set(col.doc(), {
      ...Q[i],
      question: "Bu bayrak hangi ülkeye ait?",
      category: "bayraklar",
    });
  }
  await batch.commit();
  console.log(`✅ ${Q.length} bayrak sorusu eklendi.`);
}

seed().catch(console.error);
