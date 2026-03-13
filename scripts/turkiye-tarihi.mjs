/**
 * Türkiye tarihi ve coğrafyası odaklı sorular
 * Kategori: genel-kultur
 * 5 zorluk seviyesi × 10 soru = 50 soru
 *
 * Çalıştır: node scripts/turkiye-tarihi.mjs
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

const questions = [

  // ─── EASY ────────────────────────────────────────────────────────────────────

  {
    question: "Türkiye Cumhuriyeti hangi yıl kuruldu?",
    options: ["1919", "1920", "1923", "1928"],
    correctIndex: 2,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "Türkiye Cumhuriyeti 29 Ekim 1923'te ilan edildi.",
  },
  {
    question: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "İzmir", "Bursa", "Ankara"],
    correctIndex: 3,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "Ankara, 13 Ekim 1923'te Türkiye Cumhuriyeti'nin başkenti oldu.",
  },
  {
    question: "Atatürk'ün soyadı hangi kanunla belirlendi?",
    options: ["Medeni Kanun", "Soyadı Kanunu", "Harf Kanunu", "Tevhid-i Tedrisat"],
    correctIndex: 1,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "1934'te çıkarılan Soyadı Kanunu ile Mustafa Kemal'e Türkiye Büyük Millet Meclisi tarafından 'Atatürk' soyadı verildi.",
  },
  {
    question: "Türkiye hangi kıtaların kesişim noktasındadır?",
    options: ["Asya ve Afrika", "Avrupa ve Asya", "Avrupa ve Afrika", "Asya ve Amerika"],
    correctIndex: 1,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "Türkiye'nin yüzde 97'si Asya'da (Anadolu), yüzde 3'ü Avrupa'da (Trakya) yer alır.",
  },
  {
    question: "Türkiye'nin en uzun nehri hangisidir?",
    options: ["Fırat", "Sakarya", "Kızılırmak", "Dicle"],
    correctIndex: 2,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "Kızılırmak, yaklaşık 1355 km uzunluğuyla Türkiye'nin en uzun nehridir.",
  },
  {
    question: "Türkiye'nin nüfus bakımından en kalabalık şehri hangisidir?",
    options: ["Ankara", "İzmir", "Bursa", "İstanbul"],
    correctIndex: 3,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "İstanbul, 15 milyonu aşan nüfusuyla Türkiye'nin ve Avrupa'nın en kalabalık şehridir.",
  },
  {
    question: "Türk alfabesi kaç harften oluşur?",
    options: ["26", "27", "29", "31"],
    correctIndex: 2,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "1928 harf devrimi ile kabul edilen Latin alfabesi temelli Türk alfabesi 29 harften oluşur.",
  },
  {
    question: "Türkiye'nin para birimi nedir?",
    options: ["Euro", "Lira", "Dram", "Dinar"],
    correctIndex: 1,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "Türk Lirası, 1923'ten bu yana Türkiye'nin resmi para birimidir.",
  },
  {
    question: "Boğaziçi Köprüsü hangi iki kıyıyı birbirine bağlar?",
    options: ["Avrupa - Afrika", "Asya - Avrupa", "Anadolu - Trakya", "İstanbul - Bursa"],
    correctIndex: 1,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "1973'te açılan Boğaziçi Köprüsü, İstanbul'un Avrupa ve Asya yakalarını birbirine bağlar.",
  },
  {
    question: "Kurtuluş Savaşı hangi antlaşmayla resmen sona erdi?",
    options: ["Mondros", "Sevr", "Lozan", "Mudanya"],
    correctIndex: 2,
    difficulty: "easy",
    category: "genel-kultur",
    fact: "24 Temmuz 1923'te imzalanan Lozan Antlaşması, Türk Kurtuluş Savaşı'nı ve modern Türkiye'nin sınırlarını belirledi.",
  },

  // ─── MEDIUM ──────────────────────────────────────────────────────────────────

  {
    question: "Anadolu'daki ilk büyük Türk devleti hangisidir?",
    options: ["Osmanlı", "Selçuklu", "Karamanoğulları", "Danişmentliler"],
    correctIndex: 1,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Anadolu Selçuklu Devleti, 1077'de Süleyman Şah tarafından kuruldu ve başkenti Konya'ydı.",
  },
  {
    question: "İstanbul'un Osmanlılar tarafından fethi kaç yılında gerçekleşti?",
    options: ["1389", "1402", "1453", "1492"],
    correctIndex: 2,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Fatih Sultan Mehmet, 29 Mayıs 1453'te İstanbul'u fethetti. Bu tarih Ortaçağ'ın sona erişinin simgesi kabul edilir.",
  },
  {
    question: "Türkiye Büyük Millet Meclisi hangi şehirde bulunur?",
    options: ["İstanbul", "Ankara", "Bursa", "İzmir"],
    correctIndex: 1,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "TBMM, 23 Nisan 1920'de Ankara'da açıldı. O tarihte Ankara, küçük bir Anadolu kasabasıydı.",
  },
  {
    question: "Türkiye'de kadınlara seçme ve seçilme hakkı hangi yıl tanındı?",
    options: ["1923", "1930", "1934", "1946"],
    correctIndex: 2,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Türk kadınları 1930'da belediye seçimlerinde, 1934'te milletvekili seçimlerinde oy kullanma hakkı kazandı. Bu, pek çok Avrupa ülkesinden önce gerçekleşti.",
  },
  {
    question: "Türkiye NATO'ya hangi yıl katıldı?",
    options: ["1945", "1949", "1952", "1955"],
    correctIndex: 2,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Türkiye, Yunanistan ile birlikte 18 Şubat 1952'de NATO'ya katıldı.",
  },
  {
    question: "Anadolu'da kurulan en eski medeniyetlerden Hititlerin başkenti neresidir?",
    options: ["Gordion", "Hattuşaş", "Efes", "Pergamon"],
    correctIndex: 1,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Hattuşaş (bugünkü Boğazköy, Çorum), Hitit İmparatorluğu'nun başkentiydi ve UNESCO Dünya Mirası listesindedir.",
  },
  {
    question: "Osmanlı İmparatorluğu'nun en uzun süre hüküm süren padişahı kimdir?",
    options: ["Kanuni Sultan Süleyman", "Yavuz Sultan Selim", "II. Abdülhamid", "II. Murat"],
    correctIndex: 0,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Kanuni Sultan Süleyman, 1520-1566 yılları arasında 46 yıl tahtta kaldı; bu Osmanlı tarihinin en uzun saltanatıdır.",
  },
  {
    question: "Türkiye'nin yüzölçümü bakımından en büyük ili hangisidir?",
    options: ["Erzurum", "Konya", "Sivas", "Ankara"],
    correctIndex: 1,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Konya, yaklaşık 38.000 km² yüzölçümüyle Türkiye'nin en büyük ilidir.",
  },
  {
    question: "Ege Denizi kıyısındaki antik Yunan şehri Efes hangi ilimizin sınırları içindedir?",
    options: ["İzmir", "Muğla", "Aydın", "Antalya"],
    correctIndex: 0,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "Efes, bugünkü İzmir iline bağlı Selçuk ilçesi yakınlarında yer alır ve dünyanın en iyi korunmuş antik kentlerinden biridir.",
  },
  {
    question: "Türkiye'de 'Milli Mücadele'nin başlangıcı olarak kabul edilen olay nedir?",
    options: ["Çanakkale Savaşı", "Sakarya Meydan Muharebesi", "Atatürk'ün Samsun'a çıkışı", "TBMM'nin açılışı"],
    correctIndex: 2,
    difficulty: "medium",
    category: "genel-kultur",
    fact: "19 Mayıs 1919'da Mustafa Kemal'in Samsun'a çıkışı, Kurtuluş Savaşı'nın fiilen başlangıcı olarak kabul edilir.",
  },

  // ─── MEDIUM_HARD ─────────────────────────────────────────────────────────────

  {
    question: "Osmanlı'nın ilk başkenti hangisidir?",
    options: ["Bursa", "Edirne", "Söğüt", "İznik"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "Osman Gazi'nin beyliğini kurduğu Söğüt, Osmanlı Devleti'nin ilk merkezi kabul edilir. Ardından Bursa (1326) ve Edirne (1363) başkent oldu.",
  },
  {
    question: "Türkiye'de hangi yıl çok partili hayata geçildi?",
    options: ["1923", "1938", "1946", "1950"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "1946'da CHP dışındaki partilerin kurulmasına izin verildi; 1950'de Demokrat Parti seçimi kazanarak ilk iktidar değişimi yaşandı.",
  },
  {
    question: "Türkiye'de ilk demiryolu hattı hangi güzergâhta açılmıştır?",
    options: ["İstanbul–Edirne", "İzmir–Aydın", "Ankara–Eskişehir", "Haydarpaşa–İzmit"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "1856'da İngilizler tarafından açılan İzmir–Aydın hattı, Türkiye'nin ilk demiryolu hattıdır.",
  },
  {
    question: "Kurtuluş Savaşı'nın deniz cephesindeki önemli zafer hangisidir?",
    options: ["İnebolu Çıkarması", "Karadeniz Harekâtı", "Bandırma Vapuru", "Pontus Harekatı"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "Bandırma Vapuru, Mustafa Kemal'i 19 Mayıs 1919'da Samsun'a taşıyan gemidir; Milli Mücadele'nin simgelerinden biri olmuştur.",
  },
  {
    question: "Türkiye'nin kıyı şeridinin en uzun olduğu deniz hangisidir?",
    options: ["Marmara", "Ege", "Karadeniz", "Akdeniz"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "Karadeniz kıyı şeridi yaklaşık 1700 km ile Türkiye'nin kıyıları arasında en uzunudur.",
  },
  {
    question: "Dünya'nın en büyük tuz gölü sayılan Tuz Gölü hangi ilde bulunur?",
    options: ["Konya", "Ankara", "Nevşehir", "Kırşehir"],
    correctIndex: 0,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "Tuz Gölü, Konya, Aksaray ve Ankara illeri sınırında yer alır; yazın büyük bölümü kurur ve tuz üretimi yapılır.",
  },
  {
    question: "Türkiye'nin ilk anayasası hangi yıl kabul edilmiştir?",
    options: ["1876", "1908", "1921", "1924"],
    correctIndex: 0,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "Kanun-i Esasi, 1876'da II. Abdülhamid döneminde ilan edildi; Osmanlı'nın ilk ve Türkiye topraklarındaki ilk anayasadır.",
  },
  {
    question: "Türkiye'nin doğusunda komşu olmadığı ülke hangisidir?",
    options: ["Ermenistan", "Azerbaycan", "İran", "Irak"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "Türkiye'nin doğu komşuları Gürcistan, Ermenistan, İran ve Irak'tır. Azerbaycan ile kara sınırı yoktur.",
  },
  {
    question: "Atatürk döneminde ilan edilen 'Harf Devrimi' kaç yılında gerçekleşti?",
    options: ["1924", "1926", "1928", "1932"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "1 Kasım 1928'de yürürlüğe giren Harf Kanunu ile Arap alfabesinin yerini Latin alfabesi aldı.",
  },
  {
    question: "Türkiye'de hangi dağ Olimpos adıyla da bilinir?",
    options: ["Ağrı", "Erciyes", "Uludağ", "Kazdağı"],
    correctIndex: 3,
    difficulty: "medium_hard",
    category: "genel-kultur",
    fact: "Kazdağı (Balıkesir), antik çağda Ida Dağı olarak bilinir ve mitolojide önemli bir yere sahiptir. Ayrıca Bursa'daki Uludağ da bazen Olimpos adıyla anılmıştır.",
  },

  // ─── HARD ────────────────────────────────────────────────────────────────────

  {
    question: "Osmanlı İmparatorluğu hangi savaş sonrasında Balkanlardaki topraklarının büyük bölümünü kaybetti?",
    options: ["93 Harbi", "I. Balkan Savaşı", "II. Balkan Savaşı", "I. Dünya Savaşı"],
    correctIndex: 1,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "1912-13 I. Balkan Savaşı'nda Osmanlı, Edirne dahil Balkanlardaki neredeyse tüm topraklarını yitirdi.",
  },
  {
    question: "Türkiye'de yürürlüğe giren Medeni Kanun hangi ülkenin medeni kanunundan uyarlanmıştır?",
    options: ["Fransa", "Almanya", "İsviçre", "İtalya"],
    correctIndex: 2,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "1926'da kabul edilen Türk Medeni Kanunu, İsviçre Medeni Kanunu esas alınarak hazırlandı.",
  },
  {
    question: "Atatürk hangi savaşta doğrudan komuta ettiği zaferle uluslararası şöhret kazandı?",
    options: ["Çanakkale", "Sakarya", "Büyük Taarruz", "Dumlupınar"],
    correctIndex: 0,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "Çanakkale Savaşı'nda (1915) Anafartalar Grubu komutanı olarak İtilaf kuvvetlerini durduran Mustafa Kemal, bu başarıyla ün kazandı.",
  },
  {
    question: "Anadolu'da M.Ö. 7000'e tarihlenen ve dünyanın en eski kentsel yerleşimlerinden biri kabul edilen yer hangisidir?",
    options: ["Truva", "Göbeklitepe", "Çatalhöyük", "Hattuşaş"],
    correctIndex: 2,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "Çatalhöyük (Konya), yaklaşık M.Ö. 7500-5700 yıllarına tarihlenen, dünyanın en iyi belgelenmiş Neolitik yerleşimlerinden biridir.",
  },
  {
    question: "Türkiye'de yapılan ilk nüfus sayımı kaç yılında gerçekleştirilmiştir?",
    options: ["1923", "1927", "1931", "1935"],
    correctIndex: 1,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "Cumhuriyet'in ilk nüfus sayımı 28 Ekim 1927'de yapıldı; o tarihte nüfus yaklaşık 13,6 milyondu.",
  },
  {
    question: "Tanzimat Fermanı hangi padişah döneminde ilan edildi?",
    options: ["II. Mahmud", "Abdülmecid I", "Abdülaziz", "II. Abdülhamid"],
    correctIndex: 1,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "Tanzimat Fermanı (Gülhane Hatt-ı Hümayunu) 3 Kasım 1839'da Abdülmecid döneminde ilan edildi.",
  },
  {
    question: "Göbeklitepe neye örnek teşkil etmektedir?",
    options: ["İlk yazılı antlaşmaya", "İnsanlığın ilk tapınak yapısına", "İlk sulama kanalına", "İlk sikke darphanesine"],
    correctIndex: 1,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "Şanlıurfa yakınlarındaki Göbeklitepe (M.Ö. ~9600), tarım öncesine tarihlenen dünyanın bilinen en eski tapınak kompleksidir.",
  },
  {
    question: "1683'te Osmanlı'nın Avrupa'daki son büyük ilerleyişini durduran kuşatma hangisidir?",
    options: ["Viyana Kuşatması", "Büdapeşte Kuşatması", "Prag Kuşatması", "Varşova Kuşatması"],
    correctIndex: 0,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "II. Viyana Kuşatması (1683) başarısız oldu; bu Osmanlı'nın Batı'daki genişlemesinin son noktasıdır. Kara Mustafa Paşa komuta etmiş, yenilgi sonrası idam edilmiştir.",
  },
  {
    question: "Türk İstiklal Marşı'nın şairi kimdir?",
    options: ["Ziya Gökalp", "Tevfik Fikret", "Mehmet Akif Ersoy", "Yahya Kemal"],
    correctIndex: 2,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "Mehmet Akif Ersoy'un yazdığı İstiklal Marşı, 12 Mart 1921'de TBMM tarafından kabul edildi.",
  },
  {
    question: "Türkiye Cumhuriyeti'nin ikinci cumhurbaşkanı kimdir?",
    options: ["Celal Bayar", "İsmet İnönü", "Fevzi Çakmak", "Ali Fuat Cebesoy"],
    correctIndex: 1,
    difficulty: "hard",
    category: "genel-kultur",
    fact: "İsmet İnönü, Atatürk'ün 10 Kasım 1938'deki vefatının ardından cumhurbaşkanı seçildi ve 1950'ye kadar görev yaptı.",
  },

  // ─── VERY_HARD ───────────────────────────────────────────────────────────────

  {
    question: "Osmanlı Devleti'nin Batılı anlamda ilk diplomasi kurumu olan 'Hariciye Nezareti' hangi padişah döneminde kuruldu?",
    options: ["III. Selim", "II. Mahmud", "Abdülmecid", "II. Abdülhamid"],
    correctIndex: 1,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "Hariciye Nezareti, II. Mahmud'un reform döneminde (1836) Osmanlı dışişleri bakanlığı olarak kuruldu.",
  },
  {
    question: "Türkiye'de en fazla barajın bulunduğu nehir hangisidir?",
    options: ["Fırat", "Sakarya", "Dicle", "Kızılırmak"],
    correctIndex: 0,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "GAP (Güneydoğu Anadolu Projesi) kapsamında Fırat üzerinde pek çok büyük baraj inşa edilmiştir; Atatürk Barajı bunların en büyüğüdür.",
  },
  {
    question: "Mondros Mütarekesi'nin imzalandığı gemi hangisidir?",
    options: ["HMS Agamemnon", "HMS Inflexible", "HMS Victory", "HMS Dreadnought"],
    correctIndex: 0,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "Mondros Mütarekesi, 30 Ekim 1918'de İzmir açıklarında İngiliz zırhlısı HMS Agamemnon'da imzalandı.",
  },
  {
    question: "Türkiye'nin AB tam üyelik müzakerelerini resmen başladığı yıl hangisidir?",
    options: ["1999", "2002", "2005", "2008"],
    correctIndex: 2,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "Türkiye, 3 Ekim 2005'te AB ile tam üyelik müzakerelerini başlattı. Aday ülke statüsünü ise 1999 Helsinki Zirvesi'nde kazanmıştı.",
  },
  {
    question: "Türkiye'de ilk tren yolculuğunu hangi yabancı şirket işletmiştir?",
    options: ["British Levant Railways", "Oriental Railway", "Smyrna-Aidin Railway", "Baghdad Railway"],
    correctIndex: 2,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "1856'da açılan İzmir-Aydın hattı, İngiliz Smyrna-Aidin Railway Company tarafından inşa edilmiş ve işletilmiştir.",
  },
  {
    question: "Anadolu'da M.Ö. 6. yüzyılda sikkeyi icat ettiği kabul edilen medeniyet hangisidir?",
    options: ["Hititler", "Urartular", "Lidyalılar", "Frigler"],
    correctIndex: 2,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "Lidyalılar, M.Ö. 7. yüzyılda Sardes'te (bugün İzmir'e yakın) altın-gümüş alaşımından ilk sikkeleri kestiler.",
  },
  {
    question: "Türkiye'de ilk sivil hava taşımacılığını başlatan şirket hangisidir?",
    options: ["THY", "Türk Hava Yolları", "Nallıhan Havacılık", "Türk Tayyare Cemiyeti"],
    correctIndex: 3,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "Türk Tayyare Cemiyeti 1925'te kuruldu. THY ise 1933'te devlet havayolu olarak faaliyete geçti.",
  },
  {
    question: "Lozan Antlaşması'nda Türkiye adına imzayı atan baş delege kimdir?",
    options: ["Atatürk", "Rauf Orbay", "İsmet İnönü", "Kazım Karabekir"],
    correctIndex: 2,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "İsmet İnönü, 9 ay süren Lozan Konferansı'nda Türk heyetini yönetti ve antlaşmayı imzaladı. Bu başarısından dolayı soyadını 'İnönü' olarak aldı.",
  },
  {
    question: "Türkiye'de Kurtuluş Savaşı döneminde kurulan ilk hükümeti kim yönetmiştir?",
    options: ["Mustafa Kemal", "İsmet İnönü", "Fevzi Çakmak", "Ali Rıza Paşa"],
    correctIndex: 0,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "TBMM'nin 24 Nisan 1920'de Ankara'da kurduğu ilk hükümette Mustafa Kemal hem meclis başkanı hem yürütme başkanıydı.",
  },
  {
    question: "Osmanlı'nın son Şeyhülislamı ve son sadrazamı aynı kişi midir?",
    options: ["Evet, Damat Ferit Paşa", "Hayır, farklı kişilerdir", "Evet, Tevfik Paşa", "Hayır, son sadrazam Ahmet Tevfik'tir"],
    correctIndex: 3,
    difficulty: "very_hard",
    category: "genel-kultur",
    fact: "Osmanlı'nın son sadrazamı Ahmet Tevfik Paşa'dır (1920-22). Son Şeyhülislam ise Medine Müftüsü Mustafa Sabri Efendi'dir.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");
  const batch = db.batch();
  for (const q of questions) {
    batch.set(col.doc(), q);
  }
  await batch.commit();
  console.log(`✅ ${questions.length} Türkiye tarihi sorusu eklendi.`);
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
