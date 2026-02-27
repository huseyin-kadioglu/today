/**
 * bugununtarihi.com.tr - Quiz Soruları
 * Google Apps Script — quiz-sorular sekmesine 50 soru yazar
 *
 * KULLANIM:
 * 1. Google Sheets → Uzantılar → Apps Komut Dosyası
 * 2. Bu kodu yapıştır, kaydet
 * 3. populateQuizQuestions() fonksiyonunu çalıştır
 *
 * SORU FORMATI: tarih | soru | a | b | c | d | cevap(0-3) | bilgi_notu
 * Yeni soru eklemek için QUESTIONS dizisine satır ekle ve tekrar çalıştır.
 */

const QUIZ_SHEET_GID = 383499031;

// ─── ANA FONKSİYON ────────────────────────────────────────────────────────────
function populateQuizQuestions() {
  const sheet = getQuizSheet_();
  sheet.clearContents();

  // Başlık satırı
  sheet.appendRow(["tarih","soru","a","b","c","d","cevap","bilgi_notu"]);

  // Soruları toplu yaz (daha hızlı)
  const rows = QUESTIONS.map(q => [
    q.tarih || "",
    q.soru,
    q.a, q.b, q.c, q.d,
    q.cevap,
    q.bilgi || ""
  ]);

  sheet.getRange(2, 1, rows.length, 8).setValues(rows);

  // Başlığı kalın yap
  sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
  // Sütun genişlikleri
  sheet.setColumnWidth(2, 380); // soru
  sheet.setColumnWidth(3, 160); // a
  sheet.setColumnWidth(4, 160); // b
  sheet.setColumnWidth(5, 160); // c
  sheet.setColumnWidth(6, 160); // d
  sheet.setColumnWidth(8, 420); // bilgi_notu

  Logger.log("✅ " + rows.length + " soru eklendi.");
  SpreadsheetApp.getUi().alert("✅ " + rows.length + " soru başarıyla eklendi!");
}

// ─── SHEET BULUCU ─────────────────────────────────────────────────────────────
function getQuizSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().find(s => s.getSheetId() === QUIZ_SHEET_GID);
  if (!sheet) throw new Error("Quiz sheet bulunamadı! gid=" + QUIZ_SHEET_GID);
  return sheet;
}

// ─── SORULAR ──────────────────────────────────────────────────────────────────
// tarih: boş bırakılırsa gün bazlı deterministik karıştırmayla seçilir
// cevap: 0=a, 1=b, 2=c, 3=d
const QUESTIONS = [

  // ── TÜRK TARİHİ ──────────────────────────────────────────────────────────
  {
    soru: "Türkiye'de kadınlara milletvekili seçme ve seçilme hakkı hangi yılda tanındı?",
    a: "1928", b: "1930", c: "1934", d: "1938", cevap: 2,
    bilgi: "1934 anayasa değişikliğiyle Türk kadınları siyasi haklarını kazandı; bu tarih pek çok Avrupa ülkesinden daha erken."
  },
  {
    soru: "Harf Devrimi ile Türkiye hangi alfabeye geçti?",
    a: "Kiril", b: "Arap", c: "Latin", d: "İbrani", cevap: 2,
    bilgi: "1 Kasım 1928'de Latin alfabesine geçildi. Atatürk bizzat yurt gezileriyle 'Baş Öğretmen' unvanıyla yeni harfleri öğretti."
  },
  {
    soru: "Atatürk'ün Kurtuluş Savaşı'nı başlatmak için Samsun'a çıktığı tarih hangisidir?",
    a: "15 Mayıs 1919", b: "19 Mayıs 1919", c: "23 Nisan 1920", d: "9 Eylül 1919", cevap: 1,
    bilgi: "19 Mayıs 1919, bugün Atatürk'ü Anma Gençlik ve Spor Bayramı olarak kutlanmaktadır."
  },
  {
    soru: "Lozan Antlaşması hangi yılda imzalandı?",
    a: "1920", b: "1921", c: "1922", d: "1923", cevap: 3,
    bilgi: "24 Temmuz 1923'te imzalanan Lozan Antlaşması, Türkiye Cumhuriyeti'nin uluslararası alanda tanınmasını sağladı."
  },
  {
    soru: "Osmanlı Devleti'nin son padişahı kimdir?",
    a: "IV. Mehmed", b: "Abdülhamid II", c: "VI. Mehmed Vahdettin", d: "Abdülmecid II", cevap: 2,
    bilgi: "VI. Mehmed Vahdettin 1918–1922 yılları arasında tahtta kaldı; saltanat kaldırılınca ülkeyi terk etti."
  },
  {
    soru: "Türkiye NATO'ya hangi yılda katıldı?",
    a: "1949", b: "1950", c: "1952", d: "1955", cevap: 2,
    bilgi: "18 Şubat 1952'de Türkiye ve Yunanistan NATO'ya katıldı. Kore Savaşı'ndaki Türk katkısı bu süreci hızlandırdı."
  },
  {
    soru: "Atatürk hangi şehirde doğdu?",
    a: "Ankara", b: "İstanbul", c: "İzmir", d: "Selanik", cevap: 3,
    bilgi: "Mustafa Kemal 1881'de o dönem Osmanlı toprağı olan Selanik'te (bugünkü Yunanistan) doğdu."
  },
  {
    soru: "İstiklal Marşı hangi yılda kabul edildi?",
    a: "1919", b: "1920", c: "1921", d: "1922", cevap: 2,
    bilgi: "12 Mart 1921'de TBMM tarafından kabul edilen İstiklal Marşı, Mehmet Akif Ersoy tarafından yazıldı."
  },
  {
    soru: "Topkapı Sarayı'nı yaptıran padişah kimdir?",
    a: "II. Murat", b: "II. Mehmed (Fatih)", c: "II. Bayezid", d: "Yavuz Selim", cevap: 1,
    bilgi: "Fatih Sultan Mehmet İstanbul'un fethinden sonra 1459–1465 yılları arasında Topkapı Sarayı'nı yaptırdı."
  },
  {
    soru: "Yavuz Sultan Selim Mısır'ı hangi yılda fethetti?",
    a: "1512", b: "1514", c: "1516", d: "1517", cevap: 3,
    bilgi: "1517'de Ridaniye Savaşı'yla Mısır'ı fetheden Yavuz Selim, halifeliği de Osmanlı'ya devretti."
  },
  {
    soru: "Çanakkale Cephesi hangi yılda açıldı?",
    a: "1914", b: "1915", c: "1916", d: "1917", cevap: 1,
    bilgi: "Şubat 1915'te başlayan Çanakkale Harekâtı, İtilaf Devletleri'nin Osmanlı'yı savaş dışı bırakma planının parçasıydı."
  },
  {
    soru: "Osmanlı Devleti'nde Tanzimat Fermanı hangi yılda ilan edildi?",
    a: "1826", b: "1839", c: "1856", d: "1876", cevap: 1,
    bilgi: "3 Kasım 1839'da ilan edilen Tanzimat Fermanı, Osmanlı'da modern hukuk ve yönetim anlayışının dönüm noktasıdır."
  },
  {
    soru: "Kurtuluş Savaşı'nın son büyük kara muharebesinin adı nedir?",
    a: "Sakarya", b: "İnönü", c: "Dumlupınar", d: "Afyon", cevap: 2,
    bilgi: "26–30 Ağustos 1922'de gerçekleşen Dumlupınar Muharebesi Türk ordusunun kesin zaferini getirdi."
  },
  {
    soru: "Osmanlı'nın Balkan topraklarını büyük ölçüde kaybettiği savaş hangisidir?",
    a: "Birinci Balkan Savaşı", b: "Trablusgarp Savaşı", c: "93 Harbi", d: "Birinci Dünya Savaşı", cevap: 0,
    bilgi: "1912–1913 Birinci Balkan Savaşı'yla Osmanlı, Avrupa'daki topraklarının büyük bölümünü tek seferde kaybetti."
  },
  {
    soru: "Osmanlı İmparatorluğu yaklaşık kaç yıl sürmüştür?",
    a: "400 yıl", b: "500 yıl", c: "600 yıl", d: "700 yıl", cevap: 2,
    bilgi: "1299'dan 1922'ye kadar yaklaşık 623 yıl süren Osmanlı İmparatorluğu, tarihin en uzun ömürlü devletlerinden biridir."
  },

  // ── DÜNYA TARİHİ ─────────────────────────────────────────────────────────
  {
    soru: "Büyük İskender kaç yaşında hayatını kaybetti?",
    a: "28", b: "30", c: "32", d: "36", cevap: 2,
    bilgi: "MÖ 323'te Babil'de hayatını kaybeden Büyük İskender 32 yaşındaydı."
  },
  {
    soru: "Magna Carta hangi yılda imzalandı?",
    a: "1066", b: "1215", c: "1265", d: "1348", cevap: 1,
    bilgi: "1215'te İngiltere Kralı John tarafından imzalanan Magna Carta, modern hukuk devletinin temel belgelerinden biridir."
  },
  {
    soru: "ABD Bağımsızlık Bildirisi hangi yılda ilan edildi?",
    a: "1773", b: "1775", c: "1776", d: "1783", cevap: 2,
    bilgi: "4 Temmuz 1776'da yayımlanan Bağımsızlık Bildirisi, 13 koloninin İngiltere'den bağımsızlığını duyuruyordu."
  },
  {
    soru: "Sovyetler Birliği hangi yılda dağıldı?",
    a: "1989", b: "1990", c: "1991", d: "1992", cevap: 2,
    bilgi: "25 Aralık 1991'de Gorbaçov'un istifasıyla SSCB resmen sona erdi; 15 bağımsız devlet oluştu."
  },
  {
    soru: "Fransız Devrimi'nin sloganı hangisidir?",
    a: "Adalet-Özgürlük-Eşitlik", b: "Özgürlük-Eşitlik-Kardeşlik", c: "Barış-Adalet-Refah", d: "Özgürlük-Demokrasi-Halk", cevap: 1,
    bilgi: "Liberté, Égalité, Fraternité bugün hâlâ Fransa'nın ulusal sloganıdır."
  },
  {
    soru: "Birinci Dünya Savaşı'nı başlatan suikastin kurbanı kimdir?",
    a: "Franz Josef", b: "Wilhelm II", c: "Arşidük Franz Ferdinand", d: "Bismarck", cevap: 2,
    bilgi: "28 Haziran 1914'te Saraybosna'da Arşidük Franz Ferdinand suikaste kurban gitti ve savaşın fitilini ateşledi."
  },
  {
    soru: "Napolyon Waterloo Savaşı'nda hangi yılda yenildi?",
    a: "1812", b: "1813", c: "1815", d: "1821", cevap: 2,
    bilgi: "18 Haziran 1815'te gerçekleşen Waterloo Muharebesi'nde Napolyon kesin yenilgiye uğradı ve sürgüne gönderildi."
  },
  {
    soru: "Columbus Amerika'ya hangi yılda ulaştı?",
    a: "1488", b: "1490", c: "1492", d: "1498", cevap: 2,
    bilgi: "12 Ekim 1492'de Columbus'un gemileri Bahamalar'a ulaştı; bu tarih bazı ülkelerde Columbus Günü olarak anılır."
  },
  {
    soru: "Dünyayı ilk kez gemisiyle dolaşmayı başaran ekibin lideri kimdir?",
    a: "Vasco da Gama", b: "Bartolomeu Dias", c: "Ferdinand Magellan", d: "Francis Drake", cevap: 2,
    bilgi: "Magellan 1519'da sefere çıktı ancak yolda öldürüldü; ekibinin geri kalanı 1522'de ilk dünya turunu tamamladı."
  },
  {
    soru: "Süveyş Kanalı hangi yılda açıldı?",
    a: "1857", b: "1863", c: "1869", d: "1875", cevap: 2,
    bilgi: "17 Kasım 1869'da açılan Süveyş Kanalı, Avrupa ile Asya arasındaki deniz yolunu önemli ölçüde kısalttı."
  },
  {
    soru: "İkinci Dünya Savaşı'nda ilk atom bombası hangi şehre atıldı?",
    a: "Nagasaki", b: "Tokyo", c: "Hiroşima", d: "Osaka", cevap: 2,
    bilgi: "6 Ağustos 1945'te 'Little Boy' kod adlı atom bombası Hiroşima'ya atıldı; üç gün sonra Nagasaki'ye ikincisi."
  },
  {
    soru: "Fransız Devrimi sırasında idam edilen Fransız Kralı kimdir?",
    a: "XIII. Louis", b: "XIV. Louis", c: "XV. Louis", d: "XVI. Louis", cevap: 3,
    bilgi: "XVI. Louis 21 Ocak 1793'te Devrim Meydanı'nda giyotinle idam edildi; karısı Marie Antoinette de aynı yıl aynı akıbete uğradı."
  },
  {
    soru: "Pearl Harbor saldırısı hangi yılda gerçekleşti?",
    a: "1939", b: "1940", c: "1941", d: "1942", cevap: 2,
    bilgi: "7 Aralık 1941'de Japonya'nın Pearl Harbor'a saldırması ABD'nin İkinci Dünya Savaşı'na girmesine neden oldu."
  },
  {
    soru: "Rusya'da 1917 Bolşevik Devrimi'ni gerçekleştiren lider kimdir?",
    a: "Troçki", b: "Stalin", c: "Lenin", d: "Kerenski", cevap: 2,
    bilgi: "Lenin liderliğindeki Bolşevikler Ekim 1917'de geçici hükümeti devirdi ve Sovyet yönetimini kurdu."
  },
  {
    soru: "Mao Zedong Çin Halk Cumhuriyeti'ni hangi yılda ilan etti?",
    a: "1945", b: "1947", c: "1949", d: "1952", cevap: 2,
    bilgi: "1 Ekim 1949'da Mao Zedong Pekin'de Çin Halk Cumhuriyeti'nin kuruluşunu ilan etti."
  },
  {
    soru: "Berlin Duvarı hangi yılda inşa edildi?",
    a: "1956", b: "1958", c: "1961", d: "1963", cevap: 2,
    bilgi: "13 Ağustos 1961'de inşa edilen Duvar, 28 yıl boyunca Soğuk Savaş'ın en güçlü sembolü oldu."
  },

  // ── BİLİM VE KEŞIFLER ────────────────────────────────────────────────────
  {
    soru: "Darwin 'Türlerin Kökeni' adlı eserini hangi yılda yayımladı?",
    a: "1844", b: "1852", c: "1859", d: "1872", cevap: 2,
    bilgi: "24 Kasım 1859'da yayımlanan bu eser evrim teorisini bilim dünyasına tanıttı ve büyük tartışmalara yol açtı."
  },
  {
    soru: "Penisilin'i keşfeden bilim insanı kimdir?",
    a: "Louis Pasteur", b: "Marie Curie", c: "Alexander Fleming", d: "Robert Koch", cevap: 2,
    bilgi: "Alexander Fleming 1928'de petri kabındaki bir küfün bakterileri öldürdüğünü fark etti; penisilin İkinci Dünya Savaşı'nda milyonları kurtardı."
  },
  {
    soru: "NASA hangi yılda kuruldu?",
    a: "1955", b: "1957", c: "1958", d: "1961", cevap: 2,
    bilgi: "NASA 29 Temmuz 1958'de kuruldu; Sovyetler'in Sputnik başarısına karşılık olarak uzay yarışında öncü olmak amacıyla oluşturuldu."
  },
  {
    soru: "İlk uzay yürüyüşünü gerçekleştiren kozmonot kimdir?",
    a: "Yuri Gagarin", b: "Neil Armstrong", c: "Alexei Leonov", d: "John Glenn", cevap: 2,
    bilgi: "18 Mart 1965'te Sovyet kozmonot Alexei Leonov 12 dakika süren ilk uzay yürüyüşünü gerçekleştirdi."
  },
  {
    soru: "Heliosentrik (Güneş merkezli) teoriyi ilk ileri süren bilim insanı kimdir?",
    a: "Galileo", b: "Kepler", c: "Kopernik", d: "Newton", cevap: 2,
    bilgi: "Nicolaus Kopernik 1543'te yayımladığı eserinde Dünya'nın Güneş etrafında döndüğünü savundu."
  },
  {
    soru: "Gutenberg matbaayı hangi yüzyılda icat etti?",
    a: "13. yüzyıl", b: "14. yüzyıl", c: "15. yüzyıl", d: "16. yüzyıl", cevap: 2,
    bilgi: "Johannes Gutenberg yaklaşık 1440'ta hareketli baskı tekniğini geliştirdi; ilk büyük baskı 1455'te tamamlanan Kutsal Kitap'tır."
  },
  {
    soru: "İngiliz Sanayi Devrimi hangi yüzyılda başladı?",
    a: "16. yüzyıl", b: "17. yüzyıl", c: "18. yüzyıl", d: "19. yüzyıl", cevap: 2,
    bilgi: "18. yüzyılın ortasında İngiltere'de başlayan Sanayi Devrimi, buhar makinesinin yaygınlaşmasıyla tarihin seyrini değiştirdi."
  },
  {
    soru: "Marco Polo hangi hükümdarın sarayında misafir olmuştur?",
    a: "Osmanlı Sultanı", b: "Moğol İmparatoru Kubilay Han", c: "Çin Ming İmparatoru", d: "Hindistan Sultanı", cevap: 1,
    bilgi: "Marco Polo 1275–1292 arasında Kubilay Han'ın sarayında yaşadı; dönüşünde yazdıkları Avrupa'yı Asya'ya ilgiyle baktırdı."
  },
  {
    soru: "İnsan Hakları Evrensel Beyannamesi hangi yılda kabul edildi?",
    a: "1945", b: "1946", c: "1948", d: "1950", cevap: 2,
    bilgi: "10 Aralık 1948'de BM Genel Kurulu tarafından kabul edildi; bu tarih bugün Dünya İnsan Hakları Günü olarak kutlanmaktadır."
  },

  // ── ANTİK TARİH ──────────────────────────────────────────────────────────
  {
    soru: "Antik Olimpiyat Oyunları ilk kez hangi yılda düzenlendi?",
    a: "MÖ 1000", b: "MÖ 880", c: "MÖ 776", d: "MÖ 490", cevap: 2,
    bilgi: "MÖ 776'da Yunanistan'ın Olympia şehrinde başlayan oyunlar MS 393'e kadar yaklaşık 1200 yıl kesintisiz düzenlendi."
  },
  {
    soru: "Giza Büyük Piramidi hangi firavun için inşa edildi?",
    a: "Ramses II", b: "Tutankamon", c: "Keops (Khufu)", d: "Kleopatra", cevap: 2,
    bilgi: "MÖ yaklaşık 2560'ta tamamlanan Büyük Piramit, Firavun Keops için yapıldı ve 3800 yıl dünyanın en yüksek yapısı kaldı."
  },
  {
    soru: "MÖ 79'da Vezüv Yanardağı'nın püskürmesiyle yok olan antik şehir hangisidir?",
    a: "Atina", b: "Kartaca", c: "Pompeii", d: "Troia", cevap: 2,
    bilgi: "MÖ 79'da Vezüv'ün püskürmesiyle Pompeii saatler içinde küle gömüldü; binlerce kişi hayatını kaybetti."
  },
  {
    soru: "Antik Mısır'ın son firavunu kimdir?",
    a: "Nefertiti", b: "Hatşepsut", c: "Kleopatra VII", d: "Ramses III", cevap: 2,
    bilgi: "Kleopatra VII MÖ 30'da Roma'ya yenik düştüğünde Antik Mısır Krallığı sona erdi ve Roma eyaleti oldu."
  },
  {
    soru: "Büyük İskender hangi ülkenin kralıydı?",
    a: "Roma", b: "Atina", c: "Makedonya", d: "Sparta", cevap: 2,
    bilgi: "Büyük İskender MÖ 336'da Makedonya Krallığı'nın başına geçti ve kısa sürede tarihin en büyük imparatorluklarından birini kurdu."
  },
  {
    soru: "Doğu Roma (Bizans) İmparatorluğu'nun başkenti neresidir?",
    a: "Roma", b: "Atina", c: "Konstantinopolis", d: "İskenderiye", cevap: 2,
    bilgi: "Konstantinopolis (bugünkü İstanbul), MS 330'dan 1453'e kadar yaklaşık 1100 yıl Doğu Roma İmparatorluğu'nun başkenti oldu."
  },

  // ── KÜLTÜR VE SANAT ───────────────────────────────────────────────────────
  {
    soru: "Rönesans hareketi hangi ülkede başladı?",
    a: "Fransa", b: "İngiltere", c: "İtalya", d: "Almanya", cevap: 2,
    bilgi: "14. yüzyılda İtalya'da başlayan Rönesans, antik Yunan ve Roma eserlerinin yeniden keşfedilmesiyle bilim ve sanatı dönüştürdü."
  },
  {
    soru: "Mona Lisa'yı hangi sanatçı yapmıştır?",
    a: "Michelangelo", b: "Leonardo da Vinci", c: "Raphael", d: "Botticelli", cevap: 1,
    bilgi: "Leonardo da Vinci tarafından 1503–1519 arasında yapılan Mona Lisa, dünyanın en tanınan ve en çok ziyaret edilen sanat eseridir."
  },
  {
    soru: "İlk modern Olimpiyat Oyunları hangi yılda ve nerede yapıldı?",
    a: "1892 Paris", b: "1896 Atina", c: "1900 Paris", d: "1904 St. Louis", cevap: 1,
    bilgi: "Modern Olimpiyat Oyunları Pierre de Coubertin'in girişimiyle 1896'da Atina'da yeniden başlatıldı; 14 ülkeden 241 sporcu katıldı."
  },
  {
    soru: "Hangi ülke 1945'teki BM kuruluşunda yer almamıştır?",
    a: "Türkiye", b: "Çin", c: "Japonya", d: "Fransa", cevap: 2,
    bilgi: "Japonya, İkinci Dünya Savaşı'nın yenik tarafı olduğu için BM'nin 1945'teki kuruluşunda yer almadı; 1956'da üye oldu."
  },
];
