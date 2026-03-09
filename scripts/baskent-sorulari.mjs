/**
 * BAŞKENT SORULARI — Firestore'a ekle
 * ──────────────────────────────────────
 * node scripts/baskent-sorulari.mjs
 *
 * 60 soru: 20 kolay · 20 orta · 20 zor
 * Koleksiyon: quiz_questions
 * Kategori:   baskentler
 * Günlük seçim: 3 kolay + 4 orta + 3 zor = 10 soru
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
  // ── KOLAY (20) ─────────────────────────────────────────────────────────────
  {
    question: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "Ankara", "Bursa", "İzmir"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Ankara 1923'te başkent ilan edildi; Osmanlı döneminde İstanbul başkentti. Atatürk'ün Kurtuluş Savaşı komuta merkezi olarak seçildi.",
  },
  {
    question: "Fransa'nın başkenti neresidir?",
    options: ["Lyon", "Paris", "Marsilya", "Bordeaux"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Paris 987'den beri Fransa'nın başkentidir ve her yıl 33 milyondan fazla turist çeker.",
  },
  {
    question: "Almanya'nın başkenti neresidir?",
    options: ["Münih", "Frankfurt", "Berlin", "Hamburg"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Berlin 1990 yılında yeniden birleşmeden sonra başkent oldu; 1949-1990 yılları arasında Batı Almanya'nın başkenti Bonn'du.",
  },
  {
    question: "İtalya'nın başkenti neresidir?",
    options: ["Roma", "Napoli", "Milano", "Floransa"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Roma yaklaşık 3000 yıldır kesintisiz yerleşim yeri olan şehirlerden biridir; 'Ebedi Şehir' olarak anılır.",
  },
  {
    question: "İspanya'nın başkenti neresidir?",
    options: ["Barselona", "Sevilla", "Madrid", "Valencia"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Madrid Avrupa'nın en yüksek rakımlı başkentlerinden biridir; deniz seviyesinden 650 metre yükseklikte yer alır.",
  },
  {
    question: "Japonya'nın başkenti neresidir?",
    options: ["Osaka", "Kyoto", "Nagoya", "Tokyo"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Tokyo 1869'a kadar 'Edo' adıyla anılıyordu. İmparator'un taşınmasıyla adı Tokyo (Doğu Başkenti) olarak değişti.",
  },
  {
    question: "Çin'in başkenti neresidir?",
    options: ["Şanghay", "Pekin", "Hong Kong", "Nanjing"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Pekin (Beijing) 'kuzey başkenti' anlamına gelir ve 1421'den bu yana Çin'in başkentidir.",
  },
  {
    question: "Rusya'nın başkenti neresidir?",
    options: ["Moskova", "Sankt Petersburg", "Kazan", "Novosibirsk"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Moskova 1918'de Sankt Petersburg'dan başkentliği devraldı; 12. yüzyıldan beri önemli bir siyasi merkezdir.",
  },
  {
    question: "Amerika Birleşik Devletleri'nin başkenti neresidir?",
    options: ["New York", "Los Angeles", "Washington D.C.", "Chicago"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Washington D.C.'deki 'D.C.' District of Columbia anlamına gelir; şehir hiçbir eyalete bağlı değildir.",
  },
  {
    question: "Yunanistan'ın başkenti neresidir?",
    options: ["Selanik", "Atina", "Pire", "Rodos"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Atina Avrupa'nın en eski başkentlerinden biridir; 5000 yılı aşkın kesintisiz yerleşim tarihi vardır.",
  },
  {
    question: "Mısır'ın başkenti neresidir?",
    options: ["İskenderiye", "Luxor", "Kahire", "Asvan"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Kahire Afrika'nın en kalabalık şehridir. Arapça adı 'Al-Qahira' (Savaşçı) anlamına gelir.",
  },
  {
    question: "Brezilya'nın başkenti neresidir?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Belo Horizonte"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Brasília 1960'ta sıfırdan inşa edilen bir şehirdir. Başkentliği iç bölgeleri kalkındırmak için tasarlandı.",
  },
  {
    question: "Kanada'nın başkenti neresidir?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montréal"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Ottawa, Toronto ile Montréal arasındaki rekabeti gidermek amacıyla 1857'de Kraliçe Victoria tarafından başkent seçildi.",
  },
  {
    question: "Avustralya'nın başkenti neresidir?",
    options: ["Sydney", "Melbourne", "Brisbane", "Kanberra"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Kanberra, Sydney ile Melbourne arasındaki rekabeti çözmek için 1913'te iki şehrin tam ortasına kuruldu.",
  },
  {
    question: "Güney Kore'nin başkenti neresidir?",
    options: ["Seul", "Busan", "Incheon", "Daegu"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Seul yaklaşık 600 yıldır başkent işlevi görür; Joseon Hanedanlığı'ndan bu yana siyasi merkez olmayı sürdürüyor.",
  },
  {
    question: "Meksika'nın başkenti neresidir?",
    options: ["Guadalajara", "Mexico City", "Monterrey", "Puebla"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Mexico City, Aztekler'in inşa ettiği Tenochtitlan'ın üzerine kurulmuştur. Bataklık zemin nedeniyle her yıl birkaç santimetre çökmektedir.",
  },
  {
    question: "Arjantin'in başkenti neresidir?",
    options: ["Córdoba", "Buenos Aires", "Rosario", "Mendoza"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Buenos Aires 'iyi hava' anlamına gelir. Güney Amerika'nın 'Paris'i' olarak bilinir; Avrupa etkisi yoğun hissedilir.",
  },
  {
    question: "Hindistan'ın başkenti neresidir?",
    options: ["Mumbai", "Kolkata", "Yeni Delhi", "Chennai"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Yeni Delhi, eski Britanya Hindistanı'nın başkentiydi. Komşusu Delhi'den ayrı bir idari birimdir.",
  },
  {
    question: "Portekiz'in başkenti neresidir?",
    options: ["Porto", "Lizbon", "Braga", "Coimbra"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Lizbon Avrupa'nın en batısındaki başkentlerden biridir ve Büyük Keşifler döneminin kalbi olmuştur.",
  },
  {
    question: "Hollanda'nın başkenti neresidir?",
    options: ["Rotterdam", "Lahey", "Utrecht", "Amsterdam"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Amsterdam anayasal başkenttir; ancak hükümet ve parlamento Lahey'de bulunur. Bu durum dünyadaki nadir çift-merkez örneklerinden biridir.",
  },

  // ── ORTA (20) ──────────────────────────────────────────────────────────────
  {
    question: "Avusturya'nın başkenti neresidir?",
    options: ["Salzburg", "Innsbruck", "Graz", "Viyana"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Viyana 1814-15 Viyana Kongresi'ne ev sahipliği yaparak modern Avrupa haritasını şekillendirdi.",
  },
  {
    question: "İsviçre'nin başkenti neresidir?",
    options: ["Zürih", "Cenevre", "Basel", "Bern"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Birçok kişi Zürih veya Cenevre'yi sanır; ancak başkent Bern'dir. Zürih finans merkezi, Cenevre uluslararası kuruluşların evidir.",
  },
  {
    question: "Pakistan'ın başkenti neresidir?",
    options: ["Lahor", "Karaçi", "İslamabad", "Peşaver"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "İslamabad 1960'larda Karaçi'nin üzerindeki yükü hafifletmek için sıfırdan planlanan bir şehir olarak inşa edildi.",
  },
  {
    question: "Nijerya'nın başkenti neresidir?",
    options: ["Lagos", "Abuja", "Kano", "Ibadan"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Abuja 1991'de Lagos'tan başkentliği devraldı; Lagos Afrika'nın en kalabalık şehirlerinden biri olmayı sürdürüyor.",
  },
  {
    question: "Vietnam'ın başkenti neresidir?",
    options: ["Ho Chi Minh Şehri", "Hanoi", "Da Nang", "Hue"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Ho Chi Minh Şehri (eski Saygon) Vietnam'ın en büyük şehridir; başkent ise Hanoi'dir.",
  },
  {
    question: "Kazakistan'ın başkenti neresidir?",
    options: ["Almatı", "Şımkent", "Astana", "Türkistan"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Başkent 1997'de Almatı'dan Astana'ya taşındı. 2019'da Nur-Sultan adını aldı, 2022'de tekrar Astana oldu.",
  },
  {
    question: "Polonya'nın başkenti neresidir?",
    options: ["Kraków", "Gdańsk", "Wrocław", "Varşova"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Varşova İkinci Dünya Savaşı'nda %85 oranında tahrip edildi; savaş sonrası yeniden inşa edilen tarihi merkezi UNESCO listesindedir.",
  },
  {
    question: "İran'ın başkenti neresidir?",
    options: ["Isfahan", "Tahran", "Şiraz", "Tebriz"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Tahran 19. yüzyıl başlarında başkent oldu; önceki başkent olan Isfahan hâlâ UNESCO Dünya Mirası olarak korunmaktadır.",
  },
  {
    question: "Suudi Arabistan'ın başkenti neresidir?",
    options: ["Cidde", "Mekke", "Riyad", "Medine"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Riyad 'bahçeler' anlamına gelir. Cidde ticaret ve turizm merkezi, Mekke ve Medine ise İslam'ın kutsal şehirleridir.",
  },
  {
    question: "Güney Afrika'nın yürütme başkenti neresidir?",
    options: ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Güney Afrika'nın 3 başkenti vardır: Pretoria (yürütme), Cape Town (yasama), Bloemfontein (yargı).",
  },
  {
    question: "Norveç'in başkenti neresidir?",
    options: ["Bergen", "Stavanger", "Trondheim", "Oslo"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Oslo 14. yüzyıldan bu yana ülkenin başkentidir. 1814'te Norveç anayasasının ilan edildiği Eidsvoll yakınındadır.",
  },
  {
    question: "Danimarka'nın başkenti neresidir?",
    options: ["Aarhus", "Odense", "Kopenhag", "Malmö"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Kopenhag 'tüccarların limanı' anlamına gelir ve 15. yüzyıldan bu yana Danimarka'nın başkentidir.",
  },
  {
    question: "Belçika'nın başkenti neresidir?",
    options: ["Gent", "Brugge", "Antwerp", "Brüksel"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Brüksel hem Belçika'nın hem de Avrupa Birliği'nin fiili başkentidir; NATO genel merkezi de burada yer alır.",
  },
  {
    question: "Kolombiya'nın başkenti neresidir?",
    options: ["Medellín", "Bogotá", "Cali", "Cartagena"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Bogotá 2600 metre yüksekliğiyle dünyanın en yüksek başkentlerinden biridir.",
  },
  {
    question: "Ukrayna'nın başkenti neresidir?",
    options: ["Lviv", "Odessa", "Kiev", "Kharkiv"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Kiev (Kyiv) 9. yüzyıldan bu yana önemli bir metropoldür; Doğu Slav uygarlığının beşiği sayılır.",
  },
  {
    question: "Peru'nun başkenti neresidir?",
    options: ["Cusco", "Lima", "Arequipa", "Trujillo"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Lima 16.-19. yüzyıllar arasında İspanya'nın Güney Amerika'daki en önemli sömürge merkezi oldu.",
  },
  {
    question: "Tayland'ın başkenti neresidir?",
    options: ["Phuket", "Pattaya", "Chiang Mai", "Bangkok"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Bangkok'un Tayce resmi adı 169 karakterden oluşur ve dünyanın en uzun şehir adı olarak kayıtlara geçmiştir.",
  },
  {
    question: "Finlandiya'nın başkenti neresidir?",
    options: ["Tampere", "Turku", "Espoo", "Helsinki"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Helsinki 1550'de İsveç Kral I. Gustav Vasa tarafından kuruldu; 1812'de Rusya döneminde başkent ilan edildi.",
  },
  {
    question: "Malezya'nın başkenti neresidir?",
    options: ["Penang", "Putrajaya", "Johor Bahru", "Kuala Lumpur"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Kuala Lumpur 'çamurlu kavşak' anlamına gelir. Hükümet merkezi Putrajaya'ya taşınmış olsa da resmi başkent KL'dir.",
  },
  {
    question: "İsveç'in başkenti neresidir?",
    options: ["Göteborg", "Malmö", "Uppsala", "Stockholm"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Stockholm 13. yüzyıldan bu yana İsveç'in başkentidir ve yaklaşık 14 ada üzerine kurulmuştur.",
  },

  // ── ZOR (20) ───────────────────────────────────────────────────────────────
  {
    question: "Yeni Zelanda'nın başkenti neresidir?",
    options: ["Auckland", "Christchurch", "Wellington", "Hamilton"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Pek çok kişi Auckland'ı sanır; oysa başkent Wellington'dır. Auckland nüfus bakımından daha büyük olsa da hükümet Wellington'dadır.",
  },
  {
    question: "Myanmar'ın başkenti neresidir?",
    options: ["Yangon", "Naypyidaw", "Mandalay", "Bago"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Myanmar başkentini 2006'da Yangon'dan Naypyidaw'a taşıdı. Naypyidaw 'Kraliyet Başkenti' anlamına gelir.",
  },
  {
    question: "Tanzanya'nın başkenti neresidir?",
    options: ["Dar es Selam", "Mombasa", "Arusha", "Dodoma"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Dodoma 1974'te başkent ilan edildi; ancak Dar es Selam ekonomik ve ticari merkez olmayı sürdürüyor.",
  },
  {
    question: "Beliz'in başkenti neresidir?",
    options: ["Belize City", "Nassau", "Belmopan", "Port-au-Prince"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "1970'teki bir kasırga hasarının ardından başkentlik Belize City'den Belmopan'a taşındı; birçok kişi hâlâ Belize City'yi sanıyor.",
  },
  {
    question: "Bolivya'nın anayasal başkenti neresidir?",
    options: ["La Paz", "Santa Cruz", "Cochabamba", "Sucre"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Bolivya'nın iki başkenti var: Sucre anayasal ve yargı başkenti, La Paz ise yürütme ve yasama merkezidir.",
  },
  {
    question: "Sri Lanka'nın resmi başkenti neresidir?",
    options: ["Colombo", "Kandy", "Sri Jayawardenepura Kotte", "Galle"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Resmi başkent Sri Jayawardenepura Kotte'dir; büyük şehir Colombo ise ticaret merkezi olarak öne çıkar.",
  },
  {
    question: "Laos'un başkenti neresidir?",
    options: ["Luang Prabang", "Vientiane", "Savannakhet", "Pakse"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Vientiane Mekong Nehri kıyısında yer alır. Laos'un en büyük şehri ve idari merkezi olarak öne çıkar.",
  },
  {
    question: "Moritanya'nın başkenti neresidir?",
    options: ["Dakar", "Bamako", "Niamey", "Nouakchott"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Nouakchott 1960'ta bağımsızlıkla birlikte küçük bir köyden başkente dönüştürüldü; bugün yaklaşık 1 milyon kişi yaşıyor.",
  },
  {
    question: "Eritre'nin başkenti neresidir?",
    options: ["Addis Ababa", "Khartoum", "Mogadişu", "Asmara"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Asmara İtalyan sömürge döneminin mimarisiyle tanınır ve 'Afrika'nın küçük Roma'sı' olarak anılır.",
  },
  {
    question: "Papua Yeni Gine'nin başkenti neresidir?",
    options: ["Honiara", "Port Moresby", "Suva", "Apia"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Port Moresby, 800'den fazla ayrı dile ev sahipliği yapan Papua Yeni Gine'nin başkentidir.",
  },
  {
    question: "Orta Afrika Cumhuriyeti'nin başkenti neresidir?",
    options: ["Brazzaville", "Bangui", "Yaoundé", "Libreville"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Bangui Ubangi Nehri kıyısında yer alır ve Fransız sömürge döneminden bu yana başkenttir.",
  },
  {
    question: "Madagaskar'ın başkenti neresidir?",
    options: ["Toamasina", "Fianarantsoa", "Mahajanga", "Antananarivo"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Antananarivo 'binlerin şehri' anlamına gelir; 1610'dan bu yana Madagaskar'ın siyasi merkezi olmuştur.",
  },
  {
    question: "Surinam'ın başkenti neresidir?",
    options: ["Georgetown", "Paramaribo", "Cayenne", "Port of Spain"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Paramaribo'nun tarihi iç kenti Hollandalı sömürge mimarisiyle UNESCO Dünya Mirası listesindedir.",
  },
  {
    question: "Özbekistan'ın başkenti neresidir?",
    options: ["Almatı", "Bişkek", "Taşkent", "Duşanbe"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Taşkent İpek Yolu üzerindeki tarihiyle bilinir ve Orta Asya'nın en büyük şehridir.",
  },
  {
    question: "Fiji'nin başkenti neresidir?",
    options: ["Nadi", "Lautoka", "Port Vila", "Suva"],
    correctIndex: 3,
    difficulty: "hard",
    fact: "Suva 1882'den bu yana Fiji'nin başkentidir; Pasifik adaları içinde en büyük başkentlerden biridir.",
  },
  {
    question: "Lesoto'nun başkenti neresidir?",
    options: ["Mbabane", "Maseru", "Gaborone", "Bloemfontein"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Maseru, Güney Afrika tarafından tamamen çevrilmiş Lesoto'nun başkentidir; Lesoto tam anlamıyla enklave bir ülkedir.",
  },
  {
    question: "Maldivler'in başkenti neresidir?",
    options: ["Addu", "Kulhudhuffushi", "Malé", "Fuvahmulah"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Malé dünyada nüfus yoğunluğu en yüksek kentlerin başında gelir; yaklaşık 2 km² üzerinde 130.000 kişi yaşar.",
  },
  {
    question: "Etiyopya'nın başkenti neresidir?",
    options: ["Asmara", "Addis Ababa", "Khartoum", "Mogadişu"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Addis Ababa 'yeni çiçek' anlamına gelir. Afrika Birliği'nin merkezi burada yer alır.",
  },
  {
    question: "Namibya'nın başkenti neresidir?",
    options: ["Lusaka", "Harare", "Windhoek", "Gaborone"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Windhoek Almanca kökenlidir ve 'rüzgar köşesi' anlamına gelir; Alman sömürge döneminin mimarisi şehirde hâlâ görülür.",
  },
  {
    question: "Zambiya'nın başkenti neresidir?",
    options: ["Harare", "Lusaka", "Lilongwe", "Gaborone"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Lusaka 1935'te küçük bir demiryolu kasabasından başkente yükseldi; çevre bölgeler arasındaki merkezi konumuyla seçildi.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");
  const batch = db.batch();
  for (const q of Q) {
    batch.set(col.doc(), { ...q, category: "baskentler" });
  }
  await batch.commit();
  console.log(`✅ ${Q.length} başkent sorusu eklendi.`);
}

seed().catch(console.error);
