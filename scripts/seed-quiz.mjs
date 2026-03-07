/**
 * Firestore'a quiz sorularını yükler.
 * Kullanım: node scripts/seed-quiz.mjs
 *
 * Gereksinim: scripts/serviceAccountKey.json
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, "serviceAccountKey.json"), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const questions = [
  // ── Türk Tarihi ──────────────────────────────────────────────────────────────
  {
    question: "Osmanlı'da Yeniçeri Ocağı'nın kaldırılmasına ne ad verilir?",
    options: ["Vaka-i Hayriye", "Islahat Fermanı", "Sened-i İttifak", "Tanzimat Fermanı"],
    correctIndex: 0,
    fact: "II. Mahmut, 1826'da Yeniçerileri 'Vaka-i Hayriye' (Hayırlı Olay) ile kaldırdı.",
  },
  {
    question: "Osmanlı'nın I. Dünya Savaşı'ndan çekilmesini sağlayan mütareke hangi tarihte imzalandı?",
    options: ["18 Ekim 1918", "30 Ekim 1918", "11 Kasım 1918", "3 Aralık 1918"],
    correctIndex: 1,
    fact: "Mondros Mütarekesi, 30 Ekim 1918'de Limni Adası'nda imzalandı.",
  },
  {
    question: "Türkiye Büyük Millet Meclisi hangi tarihte açıldı?",
    options: ["19 Mayıs 1919", "10 Ocak 1920", "23 Nisan 1920", "29 Ekim 1923"],
    correctIndex: 2,
    fact: "TBMM, 23 Nisan 1920'de Ankara'da açıldı.",
  },
  {
    question: "Lozan Antlaşması hangi yılda imzalandı?",
    options: ["1920", "1921", "1922", "1923"],
    correctIndex: 3,
    fact: "Lozan Antlaşması, 24 Temmuz 1923'te imzalanarak Türkiye Cumhuriyeti'nin sınırlarını belirledi.",
  },
  {
    question: "Türkiye NATO'ya hangi yılda katıldı?",
    options: ["1949", "1950", "1952", "1955"],
    correctIndex: 2,
    fact: "Türkiye ve Yunanistan, 18 Şubat 1952'de NATO'ya katıldı.",
  },
  {
    question: "Osmanlı'da Tanzimat Fermanı hangi padişah döneminde ilan edildi?",
    options: ["II. Mahmut", "Abdülmecid I", "Abdülaziz", "II. Abdülhamid"],
    correctIndex: 1,
    fact: "Tanzimat Fermanı, 3 Kasım 1839'da Padişah Abdülmecid I döneminde ilan edildi.",
  },
  {
    question: "Harf İnkılabı hangi yılda gerçekleştirildi?",
    options: ["1924", "1926", "1928", "1932"],
    correctIndex: 2,
    fact: "Latin alfabesine geçiş 1 Kasım 1928'de gerçekleştirildi.",
  },
  {
    question: "Türk Kurtuluş Savaşı'nda Yunanistan'a karşı kazanılan son büyük taarruz hangisidir?",
    options: ["Birinci İnönü", "Sakarya Muharebesi", "Büyük Taarruz", "İkinci İnönü"],
    correctIndex: 2,
    fact: "26 Ağustos 1922'de başlayan Büyük Taarruz, 9 Eylül 1922'de İzmir'in kurtuluşuyla sonuçlandı.",
  },
  {
    question: "Halifeliği Osmanlı'ya taşıyan padişah kimdir?",
    options: ["Fatih Sultan Mehmet", "Kanuni Sultan Süleyman", "I. Selim (Yavuz)", "II. Bayezid"],
    correctIndex: 2,
    fact: "Yavuz Sultan Selim, 1517'deki Mısır seferinin ardından halifeliği Osmanlı'ya taşıdı.",
  },
  {
    question: "Ankara hangi yılda Türkiye Cumhuriyeti'nin başkenti ilan edildi?",
    options: ["1919", "1920", "1923", "1924"],
    correctIndex: 2,
    fact: "Ankara, 13 Ekim 1923'te Türkiye Cumhuriyeti'nin başkenti ilan edildi.",
  },
  {
    question: "İstanbul'un 1453 fethinde Osmanlı kuvvetleri şehre hangi kapıdan girdi?",
    options: ["Edirnekapı", "Topkapı", "Yedikule", "Balat Kapısı"],
    correctIndex: 0,
    fact: "29 Mayıs 1453'te Osmanlı kuvvetleri, Blakhernai bölgesindeki Edirnekapı'dan surları aşarak içeri girdi.",
  },
  {
    question: "Osmanlı'da 'Divan-ı Hümayun' ne anlama gelir?",
    options: ["Padişahın sarayı", "İmparatorluğun hazinesi", "Devlet meclisi", "Yeniçeri karargahı"],
    correctIndex: 2,
    fact: "Divan-ı Hümayun, Osmanlı İmparatorluğu'nun en yüksek yönetim ve yargı kuruluydu.",
  },
  {
    question: "Osmanlı'da 'millet sistemi' neyi ifade eder?",
    options: ["Askeri teşkilat", "Vergi düzeni", "Din temelli toplum yönetimi", "Toprak dağıtım sistemi"],
    correctIndex: 2,
    fact: "Millet sistemi, Osmanlı'da farklı dinî toplulukların kendi iç işlerini yönetmesine olanak tanıyan sistemdir.",
  },
  {
    question: "Türkiye'de ilk çok partili seçim hangi yılda yapıldı?",
    options: ["1943", "1946", "1950", "1954"],
    correctIndex: 1,
    fact: "Türkiye'de ilk çok partili seçim 21 Temmuz 1946'da yapıldı. CHP iktidarını korudu ancak sistem açıldı.",
  },
  {
    question: "Osmanlı Devleti hangi devletlerle ittifak kurarak I. Dünya Savaşı'na girdi?",
    options: ["Fransa ve İngiltere", "Almanya ve Avusturya-Macaristan", "Rusya ve İtalya", "ABD ve Japonya"],
    correctIndex: 1,
    fact: "Osmanlı, İttifak Devletleri safında Almanya ve Avusturya-Macaristan ile birlikte savaşa girdi.",
  },

  // ── Dünya Tarihi ─────────────────────────────────────────────────────────────
  {
    question: "Fransız İhtilali'nin sembolik başlangıcı kabul edilen Bastille'in basılış tarihi nedir?",
    options: ["14 Temmuz 1789", "4 Ağustos 1789", "26 Ağustos 1789", "21 Eylül 1792"],
    correctIndex: 0,
    fact: "14 Temmuz 1789'daki Bastille baskını Fransız İhtilali'nin sembolik başlangıcı kabul edilir.",
  },
  {
    question: "Napolyon Bonapart'ın kesin olarak yenildiği muharebe hangisidir?",
    options: ["Trafalgar", "Borodino", "Waterloo", "Leipzig"],
    correctIndex: 2,
    fact: "18 Haziran 1815'teki Waterloo Muharebesi, Napolyon'un son ve kesin yenilgisi oldu.",
  },
  {
    question: "Amerika Birleşik Devletleri bağımsızlık bildirgesini hangi yılda imzaladı?",
    options: ["1773", "1775", "1776", "1783"],
    correctIndex: 2,
    fact: "Bağımsızlık Bildirgesi 4 Temmuz 1776'da imzalandı.",
  },
  {
    question: "İkinci Dünya Savaşı'nda Normandiya çıkarması hangi yılda gerçekleşti?",
    options: ["1942", "1943", "1944", "1945"],
    correctIndex: 2,
    fact: "D-Day olarak bilinen Normandiya çıkarması, 6 Haziran 1944'te gerçekleşti.",
  },
  {
    question: "Sovyet Sosyalist Cumhuriyetler Birliği hangi yılda dağıldı?",
    options: ["1989", "1990", "1991", "1992"],
    correctIndex: 2,
    fact: "SSCB, 25 Aralık 1991'de Gorbaçov'un istifasıyla resmen sona erdi.",
  },
  {
    question: "Birinci Dünya Savaşı'nı resmen sona erdiren antlaşma hangisidir?",
    options: ["Versay Antlaşması", "Brest-Litovsk Antlaşması", "Saint-Germain Antlaşması", "Trianon Antlaşması"],
    correctIndex: 0,
    fact: "Versay Antlaşması, 28 Haziran 1919'da imzalanarak I. Dünya Savaşı'nı resmen sona erdirdi.",
  },
  {
    question: "Hiroşima'ya atom bombası hangi tarihte atıldı?",
    options: ["6 Ağustos 1945", "9 Ağustos 1945", "15 Ağustos 1945", "2 Eylül 1945"],
    correctIndex: 0,
    fact: "ABD, 6 Ağustos 1945'te Hiroşima'ya, 9 Ağustos'ta ise Nagazaki'ye atom bombası attı.",
  },
  {
    question: "Çin Seddi'nin büyük bölümü hangi hanedan döneminde inşa edildi?",
    options: ["Han Hanedanı", "Tang Hanedanı", "Song Hanedanı", "Ming Hanedanı"],
    correctIndex: 3,
    fact: "Günümüzdeki Çin Seddi'nin büyük bölümü, 1368–1644 yılları arasındaki Ming Hanedanı döneminde inşa edildi.",
  },
  {
    question: "Berlin Duvarı hangi yılda yıkıldı?",
    options: ["1987", "1988", "1989", "1991"],
    correctIndex: 2,
    fact: "Berlin Duvarı, 9 Kasım 1989'da yıkıldı ve Almanya'nın birleşmesinin önünü açtı.",
  },
  {
    question: "Nobel ödülleri ilk kez hangi yılda verilmiştir?",
    options: ["1895", "1901", "1905", "1910"],
    correctIndex: 1,
    fact: "İlk Nobel ödülleri 1901 yılında verildi. Barış ödülünü Henri Dunant ve Frederic Passy paylaştı.",
  },

  // ── Bilim & Teknoloji ─────────────────────────────────────────────────────────
  {
    question: "DNA'nın çift sarmal yapısını kim keşfetti?",
    options: ["Darwin ve Mendel", "Watson ve Crick", "Pasteur ve Koch", "Curie ve Einstein"],
    correctIndex: 1,
    fact: "James Watson ve Francis Crick, 1953'te DNA'nın çift sarmal yapısını keşfetti ve Nobel Ödülü aldı.",
  },
  {
    question: "Periyodik tabloda 'Fe' sembolüyle gösterilen element hangisidir?",
    options: ["Flor", "Fosfor", "Demir", "Baryum"],
    correctIndex: 2,
    fact: "Demir'in simgesi Fe, Latince 'ferrum' kelimesinden gelir.",
  },
  {
    question: "Ay'a ilk insanlı iniş hangi yılda gerçekleşti?",
    options: ["1967", "1968", "1969", "1970"],
    correctIndex: 2,
    fact: "Apollo 11 misyonuyla Neil Armstrong ve Buzz Aldrin, 20 Temmuz 1969'da Ay'a ilk adımı attı.",
  },
  {
    question: "'E=mc²' formülünü kim ortaya koymuştur?",
    options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"],
    correctIndex: 2,
    fact: "Einstein bu formülü 1905'te özel görelilik teorisi kapsamında yayımladı.",
  },
  {
    question: "İlk yapay uydu hangisidir?",
    options: ["Explorer 1", "Sputnik 1", "Vostok 1", "Apollo 1"],
    correctIndex: 1,
    fact: "SSCB'nin fırlattığı Sputnik 1, 4 Ekim 1957'de ilk yapay uydu oldu.",
  },
  {
    question: "Penisilin'i kim keşfetti?",
    options: ["Louis Pasteur", "Robert Koch", "Alexander Fleming", "Joseph Lister"],
    correctIndex: 2,
    fact: "Alexander Fleming, 1928'de penisilin küfünü tesadüfen keşfetti.",
  },
  {
    question: "Işığın boşluktaki hızı yaklaşık kaç km/s'dir?",
    options: ["150.000", "200.000", "300.000", "400.000"],
    correctIndex: 2,
    fact: "Işık, boşlukta yaklaşık 299.792 km/s hızla hareket eder.",
  },
  {
    question: "World Wide Web hangi yılda kamuya açıldı?",
    options: ["1985", "1989", "1991", "1993"],
    correctIndex: 2,
    fact: "Tim Berners-Lee, World Wide Web'i 1991 yılında kamuya açtı. İlk web sitesi info.cern.ch'dir.",
  },
  {
    question: "Kopernik Devrimi hangi alandaki bilimsel dönüşümü ifade eder?",
    options: ["Yerçekimi teorisi", "Güneş merkezli evren modeli", "Atom teorisi", "Kan dolaşımı"],
    correctIndex: 1,
    fact: "Kopernik'in 1543'teki eseri, Dünya merkezli anlayışı yıkarak Güneş merkezli (heliosentrik) modeli ortaya koydu.",
  },

  // ── Coğrafya ─────────────────────────────────────────────────────────────────
  {
    question: "Yüzölçümüne göre dünyanın en büyük ülkesi hangisidir?",
    options: ["Kanada", "Amerika Birleşik Devletleri", "Çin", "Rusya"],
    correctIndex: 3,
    fact: "Rusya, 17,1 milyon km² yüzölçümüyle dünyanın en büyük ülkesidir.",
  },
  {
    question: "Dünyanın en derin gölü hangisidir?",
    options: ["Hazar Gölü", "Superior Gölü", "Baykal Gölü", "Titicaca Gölü"],
    correctIndex: 2,
    fact: "Sibirya'daki Baykal Gölü, 1.642 m derinliğiyle dünyanın en derin gölüdür.",
  },
  {
    question: "Tokyo'nun eski adı nedir?",
    options: ["Kyoto", "Osaka", "Edo", "Nara"],
    correctIndex: 2,
    fact: "Tokyo'nun eski adı Edo'dur. 1868'de Meiji Restorasyonu ile başkent yapılarak adı Tokyo olarak değiştirildi.",
  },
  {
    question: "Türkiye'nin toprakları içindeki en uzun nehri hangisidir?",
    options: ["Sakarya", "Kızılırmak", "Fırat", "Seyhan"],
    correctIndex: 1,
    fact: "Kızılırmak, 1.355 km uzunluğuyla Türkiye toprakları içindeki en uzun nehirdir.",
  },
  {
    question: "Türkiye'nin en büyük gölü hangisidir?",
    options: ["Tuz Gölü", "Van Gölü", "Beyşehir Gölü", "Eğirdir Gölü"],
    correctIndex: 1,
    fact: "3.713 km² yüzölçümüyle Van Gölü, Türkiye'nin en büyük gölüdür.",
  },
  {
    question: "Mount Everest hangi dağ silsilesinde bulunur?",
    options: ["Karakurum", "Hindu Kuş", "Himalayalar", "Pamir"],
    correctIndex: 2,
    fact: "Mount Everest (8.849 m), Himalaya dağ silsilesinde Çin-Nepal sınırında yer alır.",
  },

  // ── Kültür & Sanat ───────────────────────────────────────────────────────────
  {
    question: "Leonardo da Vinci'nin 'Son Akşam Yemeği' freski hangi şehirde bulunur?",
    options: ["Roma", "Floransa", "Milano", "Venedik"],
    correctIndex: 2,
    fact: "'Son Akşam Yemeği', Milano'daki Santa Maria delle Grazie kilisesinin yemekhanesinde yer alır.",
  },
  {
    question: "Rönesans'ın merkezi olarak kabul edilen İtalyan şehri hangisidir?",
    options: ["Roma", "Venedik", "Floransa", "Napoli"],
    correctIndex: 2,
    fact: "Rönesans, büyük ölçüde Floransa'da Medici ailesinin himayesiyle 14.–17. yüzyıllar arasında gelişti.",
  },
  {
    question: "Hangi eski Yunan filozofu 'Akademia'yı kurmuştur?",
    options: ["Sokrates", "Aristoteles", "Platon", "Epikür"],
    correctIndex: 2,
    fact: "Platon, MÖ 387'de Atina yakınlarında 'Akademia' adını verdiği okulu kurdu.",
  },
  {
    question: "Ayasofya, İstanbul'un fethinden önce yaklaşık kaç yıl Hristiyan katedrali olarak kullanıldı?",
    options: ["616 yıl", "716 yıl", "816 yıl", "916 yıl"],
    correctIndex: 3,
    fact: "Ayasofya, MS 537'den 1453'e kadar 916 yıl boyunca Hristiyan katedrali olarak hizmet verdi.",
  },
  // ── Ek Sorular: Türk Tarihi ──────────────────────────────────────────────────
  {
    question: "Osmanlı'da 'Devşirme' sistemi neyi ifade eder?",
    options: [
      "Vergi toplama yöntemi",
      "Hristiyan çocukların devşirilip devlet hizmetine alınması",
      "Toprak tahsis sistemi",
      "Ticaret vergisi uygulaması",
    ],
    correctIndex: 1,
    fact: "Devşirme, Hristiyan tebaanın erkek çocuklarının alınarak İslam eğitimiyle yetiştirilmesi ve yeniçeri/bürokrat yapılması sistemidir.",
  },
  {
    question: "Misak-ı Millî hangi tarihte kabul edildi?",
    options: ["19 Mayıs 1919", "28 Ocak 1920", "23 Nisan 1920", "10 Ağustos 1920"],
    correctIndex: 1,
    fact: "Misak-ı Millî, 28 Ocak 1920'de son Osmanlı Mebusan Meclisi tarafından kabul edilerek ulusal sınırları belirledi.",
  },
  {
    question: "Türkiye'nin ilk Anayasası olan Kanun-i Esasi hangi yılda ilan edildi?",
    options: ["1839", "1856", "1876", "1908"],
    correctIndex: 2,
    fact: "Kanun-i Esasi, 23 Aralık 1876'da II. Abdülhamid döneminde ilan edilen ilk Osmanlı anayasasıdır.",
  },
  {
    question: "Atatürk hangi tarihte vefat etmiştir?",
    options: ["10 Kasım 1938", "10 Kasım 1939", "10 Kasım 1937", "10 Kasım 1940"],
    correctIndex: 0,
    fact: "Mustafa Kemal Atatürk, 10 Kasım 1938'de İstanbul Dolmabahçe Sarayı'nda hayatını kaybetti.",
  },
  {
    question: "Türkiye'de kadınlara seçme ve seçilme hakkı hangi yılda tanındı?",
    options: ["1923", "1930", "1934", "1946"],
    correctIndex: 2,
    fact: "Türk kadınları 5 Aralık 1934'te milletvekili seçme ve seçilme hakkı kazandı; bu tarih pek çok Avrupa ülkesinden önceye denk gelir.",
  },
  {
    question: "Osmanlı'da 'Müsadere' sistemi ne anlama gelir?",
    options: [
      "Devletin vatandaşlara toprak dağıtması",
      "Devlet tarafından özel mülklere el koyma",
      "Yeniçeri maaş sistemi",
      "Ticaret izninin kaldırılması",
    ],
    correctIndex: 1,
    fact: "Müsadere, Osmanlı'da padişahın devlet yetkililerinin mülklerine ölüm ya da görevden alınma durumunda el koyabildiği sistemdir.",
  },

  // ── Ek Sorular: Dünya Tarihi ──────────────────────────────────────────────────
  {
    question: "Magna Carta hangi yılda imzalandı?",
    options: ["1066", "1215", "1348", "1453"],
    correctIndex: 1,
    fact: "Magna Carta, 15 Haziran 1215'te İngiltere Kralı John tarafından imzalanarak kraliyet gücünü sınırlandırdı.",
  },
  {
    question: "Fransız İhtilali'nin sloganı olan üç kavram nelerdir?",
    options: [
      "Eşitlik, Adalet, Özgürlük",
      "Özgürlük, Eşitlik, Kardeşlik",
      "Halk, Güç, Devrim",
      "Cumhuriyet, Laiklik, İlerleme",
    ],
    correctIndex: 1,
    fact: "Liberté, Égalité, Fraternité (Özgürlük, Eşitlik, Kardeşlik) Fransız İhtilali'nin ve bugünkü Fransa'nın resmî sloganıdır.",
  },
  {
    question: "Roma İmparatorluğu'nun ilk imparatoru kimdir?",
    options: ["Jül Sezar", "Augustus", "Nero", "Marcus Aurelius"],
    correctIndex: 1,
    fact: "Augustus (Octavianus), MÖ 27'de ilk Roma imparatoru oldu. Jül Sezar ise diktatördü, imparator değildi.",
  },
  {
    question: "İkinci Dünya Savaşı'nda en fazla kayıp hangi ülkede yaşandı?",
    options: ["Almanya", "Çin", "Sovyetler Birliği", "Polonya"],
    correctIndex: 2,
    fact: "Sovyetler Birliği yaklaşık 27 milyon kayıpla (asker + sivil) II. Dünya Savaşı'nın en büyük kaybını yaşadı.",
  },
  {
    question: "Peloponnesos Savaşı hangi şehir devletleri arasında gerçekleşti?",
    options: ["Atina ve Makedonya", "Atina ve Sparta", "Sparta ve Pers İmparatorluğu", "Atina ve Roma"],
    correctIndex: 1,
    fact: "MÖ 431–404 yılları arasında süren Peloponnesos Savaşı'nda Sparta, Atina karşısında galip geldi.",
  },
  {
    question: "İlk Haçlı Seferi ne zaman başladı?",
    options: ["1054", "1071", "1096", "1147"],
    correctIndex: 2,
    fact: "Papa II. Urban'ın çağrısıyla başlayan I. Haçlı Seferi, 1096'da yola çıktı ve 1099'da Kudüs'ün fethiyle sonuçlandı.",
  },

  // ── Ek Sorular: Bilim & Teknoloji ─────────────────────────────────────────────
  {
    question: "Charles Darwin'in doğal seçilim teorisini anlattığı eserin adı nedir?",
    options: [
      "İnsan ve Hayvan Duyguları",
      "Türlerin Kökeni Üzerine",
      "Evrim Kanıtları",
      "Doğanın Yasaları",
    ],
    correctIndex: 1,
    fact: "'On the Origin of Species' (Türlerin Kökeni Üzerine) 1859'da yayımlandı ve biyolojide devrim yarattı.",
  },
  {
    question: "Periyodik tabloda 'W' sembolüyle gösterilen element hangisidir?",
    options: ["Vanadyum", "Volfram (Tungsten)", "Wolfram Karbür", "Wismut (Bizmut)"],
    correctIndex: 1,
    fact: "Volfram'ın sembolü W, Almanca 'Wolfram' kelimesinden gelir. En yüksek erime noktasına (3422°C) sahip metaldir.",
  },
  {
    question: "Hangi bilim insanı genel görelilik teorisini formüle etmiştir?",
    options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"],
    correctIndex: 2,
    fact: "Einstein, özel göreliliği 1905'te, genel göreliliği ise 1915'te yayımladı. Genel görelilik, kütleçekimini uzay-zamanın eğriliği olarak tanımlar.",
  },
  {
    question: "İnsan vücudunda kaç kemik bulunur (yetişkin)?",
    options: ["186", "206", "226", "256"],
    correctIndex: 1,
    fact: "Yetişkin insan iskeleti 206 kemikten oluşur. Doğumda yaklaşık 270–300 kemik varken bazıları birleşerek azalır.",
  },

  // ── Ek Sorular: Coğrafya & Kültür ────────────────────────────────────────────
  {
    question: "Dünyanın en küçük ülkesi hangisidir?",
    options: ["San Marino", "Monako", "Vatikan", "Liechtenstein"],
    correctIndex: 2,
    fact: "Vatikan, 0.44 km² yüzölçümüyle dünyanın en küçük egemen devletidir.",
  },
  {
    question: "Amazon Ormanları hangi kıtada yer alır ve dünya oksijeninin yaklaşık yüzde kaçını üretir?",
    options: ["Afrika · %10", "Güney Amerika · %20", "Güney Amerika · %10", "Afrika · %20"],
    correctIndex: 1,
    fact: "Amazon yağmur ormanları Güney Amerika'dadır ve dünya oksijen üretiminin yaklaşık %20'sini sağlar.",
  },
  {
    question: "Hangi şehir hem Asya hem Avrupa kıtasında yer alır?",
    options: ["Moskova", "Kahire", "İstanbul", "Atina"],
    correctIndex: 2,
    fact: "İstanbul, Boğaz'la ikiye ayrılarak hem Avrupa hem Asya kıtasında yayılan dünyanın tek transseksiyon şehridir.",
  },
  {
    question: "Shakespeare'in en uzun oyunu hangisidir?",
    options: ["Macbeth", "Othello", "Kral Lear", "Hamlet"],
    correctIndex: 3,
    fact: "Hamlet, yaklaşık 4.000 satırıyla Shakespeare'in en uzun oyunudur.",
  },
  {
    question: "Osmanlı mimarisinin simgesi Mimar Sinan'ın kendi şaheseri olarak gördüğü eser hangisidir?",
    options: ["Süleymaniye Camii", "Selimiye Camii", "Şehzade Camii", "Rüstem Paşa Camii"],
    correctIndex: 1,
    fact: "Mimar Sinan, Edirne'deki Selimiye Camii'ni (1575) kendi ustalık eseri olarak tanımlamıştır.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");

  // Mevcut soruları kontrol et
  const existing = await col.get();
  if (!existing.empty) {
    console.log(`⚠️  ${existing.size} soru zaten var. Devam etmek için mevcut soruları silin.`);
    console.log("Silmek için: node scripts/seed-quiz.mjs --clear");
    if (!process.argv.includes("--force")) process.exit(0);
  }

  if (process.argv.includes("--clear")) {
    console.log("🗑️  Mevcut sorular siliniyor…");
    const batch = db.batch();
    existing.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    console.log(`✅ ${existing.size} soru silindi.`);
  }

  console.log(`📝 ${questions.length} soru yükleniyor…`);
  const BATCH_SIZE = 20;
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = questions.slice(i, i + BATCH_SIZE);
    chunk.forEach((q) => batch.set(col.doc(), q));
    await batch.commit();
    console.log(`  ✓ ${Math.min(i + BATCH_SIZE, questions.length)}/${questions.length}`);
  }
  console.log("🎉 Tamamlandı!");
}

seed().catch((e) => { console.error(e); process.exit(1); });
