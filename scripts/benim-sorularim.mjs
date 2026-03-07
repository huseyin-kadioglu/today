/**
 * KENDİ SORULARINI EKLE
 * ─────────────────────
 * 1. Aşağıdaki diziye istediğin soruları ekle
 * 2. Terminalde şunu çalıştır:
 *       node scripts/benim-sorularim.mjs
 *
 * Not: Mevcut sorular silinmez, yeni sorular eklenir.
 *
 * SORU FORMATI:
 * {
 *   question:     "Soru metni",
 *   options:      ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"],
 *   correctIndex: 0,   ← 0=A · 1=B · 2=C · 3=D
 *   fact:         "Doğru cevabın kısa açıklaması (isteğe bağlı)"
 * }
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

// ─────────────────────────────────────────────────────────────────────────────
// SORULARI BURAYA EKLE ↓
// ─────────────────────────────────────────────────────────────────────────────

const yeniSorular = [
  // genel_kultur
  { question: "Türkiye'nin resmî para birimi nedir?", options: ["Euro", "Dolar", "Türk Lirası", "Sterlin"], correctIndex: 2, fact: "Türk Lirası (TL), 2005'te eski liradan 6 sıfır atılarak yeniden düzenlendi.", category: "genel_kultur" },
  { question: "Bir yılda kaç hafta vardır?", options: ["48", "50", "52", "54"], correctIndex: 2, fact: "Bir yıl 365 gün olup yaklaşık 52 haftaya karşılık gelir.", category: "genel_kultur" },
  { question: "Türk alfabesinde kaç harf vardır?", options: ["26", "27", "29", "31"], correctIndex: 2, fact: "1928'de kabul edilen Türk alfabesi 29 harften oluşur.", category: "genel_kultur" },
  { question: "Dünyanın en kalabalık ülkesi hangisidir?", options: ["Hindistan", "Çin", "ABD", "Endonezya"], correctIndex: 0, fact: "2023 itibarıyla Hindistan, Çin'i geçerek dünyanın en kalabalık ülkesi oldu.", category: "genel_kultur" },
  { question: "Nobel Barış Ödülü hangi şehirde verilir?", options: ["Stockholm", "Kopenhag", "Oslo", "Helsinki"], correctIndex: 2, fact: "Diğer Nobel ödülleri Stockholm'de verilirken Barış ödülü Oslo'da takdim edilir.", category: "genel_kultur" },
  { question: "İnternetin temeli sayılan ARPANET hangi ülkede geliştirildi?", options: ["İngiltere", "Japonya", "Almanya", "ABD"], correctIndex: 3, fact: "ARPANET, 1969'da ABD Savunma Bakanlığı tarafından hayata geçirildi.", category: "genel_kultur" },
  { question: "Hangi renk tehlikeyi simgelemek için en yaygın kullanılır?", options: ["Mavi", "Sarı", "Kırmızı", "Yeşil"], correctIndex: 2, fact: "Kırmızı, evrensel olarak dur, tehlike ve acil durum anlamına gelir.", category: "genel_kultur" },
  { question: "Türkiye'de zorunlu eğitim kaç yıldır?", options: ["8", "10", "12", "14"], correctIndex: 2, fact: "2012'den itibaren Türkiye'de zorunlu eğitim 12 yıla çıkarıldı (4+4+4).", category: "genel_kultur" },
  { question: "Hangisi bir programlama dilidir?", options: ["Linux", "Python", "Chrome", "Android"], correctIndex: 1, fact: "Python, 1991'de Guido van Rossum tarafından geliştirilen genel amaçlı bir dildir.", category: "genel_kultur" },
  { question: "Su kaç derecede kaynar (deniz seviyesinde)?", options: ["90°C", "95°C", "100°C", "105°C"], correctIndex: 2, fact: "Deniz seviyesinde su 100°C'de kaynar.", category: "genel_kultur" },
  { question: "Dünyanın en büyük okyanusu hangisidir?", options: ["Atlantik", "Hint", "Pasifik", "Arktik"], correctIndex: 2, fact: "Pasifik Okyanusu, yeryüzünün yaklaşık %30'unu kaplar.", category: "genel_kultur" },
  { question: "Hangi organ kanı pompalar?", options: ["Böbrek", "Karaciğer", "Akciğer", "Kalp"], correctIndex: 3, fact: "Kalp, yaşam boyu dakikada ortalama 60-100 kez atar.", category: "genel_kultur" },
  { question: "Türkiye hangi kıtada yer alır?", options: ["Sadece Asya", "Sadece Avrupa", "Asya ve Avrupa", "Afrika ve Asya"], correctIndex: 2, fact: "Türkiye'nin yaklaşık %97'si Asya'da, %3'ü Avrupa'dadır.", category: "genel_kultur" },
  { question: "Dünya Sağlık Örgütü'nün kısaltması nedir?", options: ["WTO", "WHO", "IMF", "UNESCO"], correctIndex: 1, fact: "WHO (World Health Organization), BM'ye bağlı olup 1948'de kuruldu.", category: "genel_kultur" },
  { question: "Hangi hayvan insanın en yakın genetik akrabasıdır?", options: ["Goril", "Orangutan", "Şempanze", "Bonobo"], correctIndex: 2, fact: "Şempanzeler ile insanlar arasında yaklaşık %98,7 DNA benzerliği bulunur.", category: "genel_kultur" },
  { question: "Ayın Dünya etrafındaki tam turu yaklaşık kaç gündür?", options: ["15", "21", "27", "30"], correctIndex: 2, fact: "Ay, Dünya'yı yaklaşık 27,3 günde bir tam dolaşır.", category: "genel_kultur" },
  { question: "TBMM kaç sandalyeden oluşur?", options: ["450", "500", "550", "600"], correctIndex: 3, fact: "2017 anayasa değişikliğiyle TBMM sandalye sayısı 550'den 600'e yükseltildi.", category: "genel_kultur" },
  { question: "Dünyada en fazla çay tüketen ülke hangisidir?", options: ["İngiltere", "Japonya", "Çin", "Hindistan"], correctIndex: 2, fact: "Çin hem en büyük çay üreticisi hem de tüketicisidir.", category: "genel_kultur" },
  { question: "İlk yapay uydu Sputnik hangi yıl fırlatıldı?", options: ["1952", "1955", "1957", "1961"], correctIndex: 2, fact: "Sputnik 1, Sovyetler Birliği tarafından 4 Ekim 1957'de uzaya gönderildi.", category: "genel_kultur" },
  { question: "Olimpiyatlar ilk kez nerede düzenlendi?", options: ["Roma", "Atina", "Paris", "Londra"], correctIndex: 1, fact: "Modern Olimpiyat Oyunları 1896'da Atina'da başladı.", category: "genel_kultur" },
  // tarih
  { question: "Türkiye Cumhuriyeti hangi yıl kuruldu?", options: ["1919", "1920", "1923", "1925"], correctIndex: 2, fact: "Türkiye Cumhuriyeti, 29 Ekim 1923'te ilan edildi.", category: "tarih" },
  { question: "Osmanlı İmparatorluğu'nu kuran hükümdar kimdir?", options: ["Orhan Gazi", "Osman Gazi", "Murat I", "Yıldırım Bayezid"], correctIndex: 1, fact: "Osman Gazi (1258–1326), Osmanlı Devleti'nin kurucusudur.", category: "tarih" },
  { question: "İstanbul'un fethi hangi yılda gerçekleşti?", options: ["1389", "1402", "1453", "1517"], correctIndex: 2, fact: "II. Mehmed (Fatih Sultan Mehmed), 29 Mayıs 1453'te İstanbul'u fethetti.", category: "tarih" },
  { question: "Birinci Dünya Savaşı hangi yılda başladı?", options: ["1912", "1914", "1916", "1918"], correctIndex: 1, fact: "I. Dünya Savaşı, Franz Ferdinand suikastının ardından 1914'te patlak verdi.", category: "tarih" },
  { question: "Kurtuluş Savaşı'nın başladığı kabul edilen tarih hangisidir?", options: ["19 Mayıs 1919", "23 Nisan 1920", "30 Ağustos 1922", "29 Ekim 1923"], correctIndex: 0, fact: "Atatürk'ün 19 Mayıs 1919'da Samsun'a çıkışı Kurtuluş Savaşı'nın sembolik başlangıcıdır.", category: "tarih" },
  { question: "Fransız Devrimi hangi yıl başladı?", options: ["1776", "1789", "1799", "1804"], correctIndex: 1, fact: "Fransız Devrimi 1789'da başladı; Bastille'in basılması simgesel ilk eylemdi.", category: "tarih" },
  { question: "Magna Carta hangi ülkede imzalandı?", options: ["Fransa", "İngiltere", "Almanya", "İtalya"], correctIndex: 1, fact: "Magna Carta, 1215'te İngiltere Kralı John tarafından imzalandı.", category: "tarih" },
  { question: "Ay'a ilk ayak basan astronot kimdir?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], correctIndex: 2, fact: "Neil Armstrong, 20 Temmuz 1969'da Ay'a ilk adımı attı.", category: "tarih" },
  { question: "Tanzimat Fermanı hangi padişah döneminde ilan edildi?", options: ["II. Mahmud", "Abdülmecid I", "Abdülaziz", "II. Abdülhamid"], correctIndex: 1, fact: "Tanzimat Fermanı, Sultan Abdülmecid döneminde 3 Kasım 1839'da ilan edildi.", category: "tarih" },
  { question: "Almanların Sovyetler'e saldırı operasyonunun adı nedir?", options: ["Barbarossa", "Overlord", "Market Garden", "Citadel"], correctIndex: 0, fact: "Operasyon Barbarossa, 22 Haziran 1941'de başlatıldı.", category: "tarih" },
  { question: "Atatürk soyadını hangi yıl aldı?", options: ["1931", "1932", "1934", "1936"], correctIndex: 2, fact: "Soyadı Kanunu 1934'te çıktı; TBMM Mustafa Kemal'e 'Atatürk' soyadını verdi.", category: "tarih" },
  { question: "ABD'nin bağımsızlık bildirisi hangi yıl ilan edildi?", options: ["1770", "1776", "1783", "1789"], correctIndex: 1, fact: "ABD Bağımsızlık Bildirisi, 4 Temmuz 1776'da ilan edildi.", category: "tarih" },
  { question: "Berlin Duvarı hangi yıl yıkıldı?", options: ["1985", "1987", "1989", "1991"], correctIndex: 2, fact: "Berlin Duvarı, 9 Kasım 1989'da yıkıldı.", category: "tarih" },
  { question: "Osmanlı'da ilk matbaa kimin önderliğinde kuruldu?", options: ["Evliya Çelebi", "İbrahim Müteferrika", "Katip Çelebi", "Piri Reis"], correctIndex: 1, fact: "İbrahim Müteferrika, 1727'de Osmanlı'nın ilk Türkçe matbaasını kurdu.", category: "tarih" },
  { question: "Napolyon hangi savaşta kesin olarak yenildi?", options: ["Austerlitz", "Borodino", "Leipzig", "Waterloo"], correctIndex: 3, fact: "Napolyon, 18 Haziran 1815'te Waterloo'da yenildi ve sürgüne gönderildi.", category: "tarih" },
  { question: "Büyük Taarruz hangi yılda yapıldı?", options: ["1919", "1920", "1921", "1922"], correctIndex: 3, fact: "Büyük Taarruz, 26 Ağustos 1922'de başladı ve 30 Ağustos'ta zaferle sonuçlandı.", category: "tarih" },
  { question: "İpek Yolu'nu canlandıran Çin hanedanı hangisidir?", options: ["Han", "Ming", "Qin", "Tang"], correctIndex: 0, fact: "Han Hanedanı döneminde (MÖ 206–MS 220) İpek Yolu ticareti zirveye ulaştı.", category: "tarih" },
  { question: "Lozan Antlaşması hangi yılda imzalandı?", options: ["1920", "1921", "1923", "1925"], correctIndex: 2, fact: "Lozan Antlaşması, 24 Temmuz 1923'te imzalandı.", category: "tarih" },
  { question: "Sanayi Devrimi ilk olarak hangi ülkede başladı?", options: ["Fransa", "Almanya", "İngiltere", "ABD"], correctIndex: 2, fact: "İngiltere, 18. yüzyıl sonlarında buhar makinesiyle sanayileşmeye öncülük etti.", category: "tarih" },
  { question: "Soğuk Savaş hangi yıllar arasında sürdü?", options: ["1939–1965", "1945–1991", "1950–1980", "1960–1995"], correctIndex: 1, fact: "Soğuk Savaş, II. Dünya Savaşı bitişinden Sovyetler'in dağılmasına (1991) kadar sürdü.", category: "tarih" },
  // bayraklar
  { question: "Japonya bayrağındaki şekil nedir?", options: ["Beyaz üzerine kırmızı daire", "Kırmızı üzerine beyaz daire", "Kırmızı üzerine sarı daire", "Mavi üzerine kırmızı daire"], correctIndex: 0, fact: "Japonya bayrağı 'Hinomaru'; beyaz zemin üzerinde kırmızı dairedir.", category: "bayraklar" },
  { question: "Hangi ülkenin bayrağında harita şekli bulunur?", options: ["Brezilya", "Kıbrıs", "Arjantin", "Madagaskar"], correctIndex: 1, fact: "Kıbrıs bayrağı kendi ülke haritasını taşıyan ender bayraklardan biridir.", category: "bayraklar" },
  { question: "Kanada bayrağındaki bitki hangisidir?", options: ["Çam", "Lale", "Akçaağaç yaprağı", "Meşe"], correctIndex: 2, fact: "Kırmızı akçaağaç yaprağı Kanada'nın ulusal sembolüdür.", category: "bayraklar" },
  { question: "Türk bayrağındaki ay ve yıldız hangi renklerdir?", options: ["Sarı ay, sarı yıldız", "Beyaz ay, beyaz yıldız", "Sarı ay, beyaz yıldız", "Beyaz ay, sarı yıldız"], correctIndex: 1, fact: "Kırmızı zemin üzerinde beyaz hilal ve beş köşeli beyaz yıldız bulunur.", category: "bayraklar" },
  { question: "Hangi ülkenin bayrağında ejderha figürü yer alır?", options: ["Çin", "Bhutan", "Vietnam", "Güney Kore"], correctIndex: 1, fact: "Bhutan bayrağında gök gürültüsü ejderhası 'Druk' yer alır.", category: "bayraklar" },
  { question: "ABD bayrağında kaç şerit vardır?", options: ["12", "13", "15", "50"], correctIndex: 1, fact: "13 şerit kurucu 13 koloniyi temsil eder; 50 yıldız 50 eyaleti simgeler.", category: "bayraklar" },
  { question: "İskandinav ülkelerinin bayraklarındaki ortak sembol nedir?", options: ["Ay-yıldız", "Haç", "Kartal", "Çapraz kılıç"], correctIndex: 1, fact: "İskandinavya haçı; İsveç, Norveç, Danimarka, Finlandiya ve İzlanda bayraklarında görülür.", category: "bayraklar" },
  { question: "Brezilya bayrağında kaç yıldız bulunur?", options: ["15", "22", "27", "31"], correctIndex: 2, fact: "27 yıldız Brezilya'nın 26 eyaletini ve federal bölgesini temsil eder.", category: "bayraklar" },
  { question: "Kare biçimli tek ülke bayrağı hangisidir?", options: ["Monaco", "İsviçre", "Vatikan", "Liechtenstein"], correctIndex: 1, fact: "İsviçre bayrağı kare biçimlidir.", category: "bayraklar" },
  { question: "Avustralya bayrağında hangi ülkenin bayrağı küçük görünür?", options: ["ABD", "Yeni Zelanda", "İngiltere", "Kanada"], correctIndex: 2, fact: "İngiltere bayrağı (Union Jack) Avustralya bayrağının sol üst köşesinde yer alır.", category: "bayraklar" },
  { question: "Hangi ülke tek renkli bayrağı olan ülkeydi?", options: ["Libya (eski)", "Suudi Arabistan", "Irak", "Ürdün"], correctIndex: 0, fact: "Libya, 1977–2011 arasında tamamen yeşil renkten oluşan tek renkli bayrağı kullandı.", category: "bayraklar" },
  { question: "Hindistan bayrağının ortasındaki sembol nedir?", options: ["Nilüfer çiçeği", "Güneş", "Ashoka Çarkı", "Fil"], correctIndex: 2, fact: "Ashoka Çarkı (24 kollu) bayrağın merkezinde mavi renkte yer alır.", category: "bayraklar" },
  { question: "Güney Afrika bayrağında kaç renk bulunur?", options: ["4", "5", "6", "7"], correctIndex: 2, fact: "Güney Afrika bayrağı; kırmızı, mavi, yeşil, sarı, siyah ve beyaz olmak üzere 6 renk içerir.", category: "bayraklar" },
  { question: "İsrail bayrağındaki sembol nedir?", options: ["Menora", "Davut Yıldızı", "Çift kartal", "Aslan"], correctIndex: 1, fact: "Davut Yıldızı (Magen David) İsrail bayrağının merkezinde yer alır.", category: "bayraklar" },
  { question: "Meksika bayrağındaki kartal ne tutuyor?", options: ["Meyve", "Yılan", "Ok", "Zeytin dalı"], correctIndex: 1, fact: "Aztek efsanesine göre kartal Tenochtitlan'ın kurulduğu yerde yılan tutarken görüldü.", category: "bayraklar" },
  { question: "Hangi kıtanın bayraklarında en sık yeşil renk görülür?", options: ["Asya", "Avrupa", "Afrika", "Güney Amerika"], correctIndex: 2, fact: "Afrika ülkeleri yeşili doğayı simgelemek için yaygın kullanır.", category: "bayraklar" },
  { question: "Nepal bayrağı nasıl bir şekle sahiptir?", options: ["Üçgen", "Dalgalı kenar", "İki üçgenin birleşimi", "Daire"], correctIndex: 2, fact: "Nepal, dünyanın tek dikdörtgen olmayan ülke bayrağına sahiptir.", category: "bayraklar" },
  { question: "Portekiz bayrağındaki küresel araç hangisidir?", options: ["Kılıç", "Kalkan", "Armillary sphere", "Zırh"], correctIndex: 2, fact: "Armillary sphere, Portekiz'in deniz keşifleri dönemini simgeler.", category: "bayraklar" },
  { question: "Hangi ülke bayrağında ay-yıldız bulunmaz?", options: ["Türkiye", "Pakistan", "Azerbaycan", "Japonya"], correctIndex: 3, fact: "Japonya bayrağında ay-yıldız yoktur; sadece kırmızı daire (güneş) yer alır.", category: "bayraklar" },
  { question: "Hangi renk hem Fransa hem İtalya hem de Meksika bayrağında bulunur?", options: ["Mavi ve kırmızı", "Yeşil, beyaz ve kırmızı", "Sarı ve kırmızı", "Mavi ve beyaz"], correctIndex: 1, fact: "Yeşil, beyaz ve kırmızı üçlüsü bu üç ülke bayrağında da mevcuttur.", category: "bayraklar" },
  // baskentler
  { question: "Fransa'nın başkenti neresidir?", options: ["Lyon", "Marsilya", "Paris", "Bordeaux"], correctIndex: 2, fact: "Paris yaklaşık 2.000 yıllık tarihi ile Fransa'nın başkentidir.", category: "baskentler" },
  { question: "Avustralya'nın başkenti neresidir?", options: ["Sidney", "Melbourne", "Canberra", "Brisbane"], correctIndex: 2, fact: "Canberra, Sidney ve Melbourne arasındaki rekabet nedeniyle özel olarak planlanan başkenttir.", category: "baskentler" },
  { question: "Brezilya'nın başkenti neresidir?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], correctIndex: 2, fact: "Brasília, 1960'ta modernist anlayışla inşa edilerek başkent ilan edildi.", category: "baskentler" },
  { question: "Kanada'nın başkenti neresidir?", options: ["Toronto", "Vancouver", "Montréal", "Ottawa"], correctIndex: 3, fact: "Ottawa, Ontario eyaletinde yer alır ve 1857'de başkent seçildi.", category: "baskentler" },
  { question: "Pakistan'ın başkenti neresidir?", options: ["Karaçi", "Lahor", "İslamabad", "Peşaver"], correctIndex: 2, fact: "İslamabad, 1966'dan bu yana Pakistan'ın başkentidir.", category: "baskentler" },
  { question: "Japonya'nın başkenti neresidir?", options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"], correctIndex: 2, fact: "Tokyo, 1869'dan itibaren Japonya'nın başkenti; eski adı Edo'dur.", category: "baskentler" },
  { question: "Güney Kore'nin başkenti neresidir?", options: ["Busan", "İncheon", "Seoul", "Daegu"], correctIndex: 2, fact: "Seoul, yaklaşık 600 yıldır Kore'nin idari merkezi konumundadır.", category: "baskentler" },
  { question: "Norveç'in başkenti neresidir?", options: ["Bergen", "Oslo", "Trondheim", "Stavanger"], correctIndex: 1, fact: "Oslo, 13. yüzyıldan bu yana Norveç'in başkenti; eski adı Christiania'dır.", category: "baskentler" },
  { question: "Arjantin'in başkenti neresidir?", options: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"], correctIndex: 2, fact: "Buenos Aires 'İyi Rüzgarlar' anlamına gelir.", category: "baskentler" },
  { question: "Mısır'ın başkenti neresidir?", options: ["İskenderiye", "Giza", "Luksor", "Kahire"], correctIndex: 3, fact: "Kahire, 969'dan bu yana Mısır'ın başkenti; Afrika'nın en kalabalık şehridir.", category: "baskentler" },
  { question: "Yeni Zelanda'nın başkenti neresidir?", options: ["Auckland", "Wellington", "Christchurch", "Dunedin"], correctIndex: 1, fact: "Wellington, dünyanın en güneyde yer alan başkentlerinden biridir.", category: "baskentler" },
  { question: "İsviçre'nin başkenti neresidir?", options: ["Zürih", "Cenevre", "Lozan", "Bern"], correctIndex: 3, fact: "Bern, Federal Şehir statüsüyle fiilî başkent işlevi görür.", category: "baskentler" },
  { question: "Endonezya'nın yeni başkenti neresidir?", options: ["Cakarta", "Bali", "Nusantara", "Surabaya"], correctIndex: 2, fact: "Endonezya, Cakarta'nın yerine Borneo'da Nusantara adlı yeni başkenti inşa ediyor.", category: "baskentler" },
  { question: "Nijerya'nın başkenti neresidir?", options: ["Lagos", "Ibadan", "Kano", "Abuja"], correctIndex: 3, fact: "Abuja, 1991'de Lagos'un yerine planlı olarak inşa edilen başkenttir.", category: "baskentler" },
  { question: "Hollanda'nın resmî başkenti neresidir?", options: ["Rotterdam", "Amsterdam", "Lahey", "Utrecht"], correctIndex: 1, fact: "Amsterdam resmî başkenttir; ancak hükümet Lahey'de bulunur.", category: "baskentler" },
  { question: "Kazakistan'ın başkenti neresidir?", options: ["Almatı", "Şımkent", "Astana", "Aktobe"], correctIndex: 2, fact: "Astana (eski adı Nur-Sultan), 1997'den bu yana Kazakistan'ın başkentidir.", category: "baskentler" },
  { question: "Tanzanya'nın resmî başkenti neresidir?", options: ["Dar es Selam", "Zanzibar", "Dodoma", "Mwanza"], correctIndex: 2, fact: "Dodoma, 1996'da resmî başkent ilan edildi; en büyük şehir hâlâ Dar es Selam'dır.", category: "baskentler" },
  { question: "Myanmar'ın başkenti neresidir?", options: ["Yangon", "Mandalay", "Naypyidaw", "Bago"], correctIndex: 2, fact: "Naypyidaw, 2006'da cunta yönetimi tarafından başkent yapıldı.", category: "baskentler" },
  { question: "İran'ın başkenti neresidir?", options: ["İsfahan", "Şiraz", "Tahran", "Tebriz"], correctIndex: 2, fact: "Tahran, 1786'dan bu yana İran'ın başkenti ve en kalabalık şehridir.", category: "baskentler" },
  { question: "Portekiz'in başkenti neresidir?", options: ["Porto", "Lizbon", "Braga", "Coimbra"], correctIndex: 1, fact: "Lizbon (Lisboa), Atlantik kıyısında yedi tepe üzerine kurulmuş başkenttir.", category: "baskentler" },
  // spor
  { question: "Hangi ülke 2022 FIFA Dünya Kupası'nı kazandı?", options: ["Fransa", "Hırvatistan", "Arjantin", "Fas"], correctIndex: 2, fact: "Arjantin, Katar'daki finalda Fransa'yı penaltılarla yenerek kupayı kazandı.", category: "spor" },
  { question: "Olimpiyat Oyunları kaç yılda bir düzenlenir?", options: ["2", "3", "4", "5"], correctIndex: 2, fact: "Modern Yaz Olimpiyatları 1896'dan bu yana dört yılda bir düzenlenir.", category: "spor" },
  { question: "Tenis'te Grand Slam kaç turnuvadan oluşur?", options: ["2", "3", "4", "5"], correctIndex: 2, fact: "Avustralya Açık, Fransa Açık, Wimbledon ve ABD Açık olmak üzere 4 Grand Slam vardır.", category: "spor" },
  { question: "Basketbolda sahada kaç oyuncu bulunur?", options: ["4", "5", "6", "7"], correctIndex: 1, fact: "NBA ve FIBA kurallarına göre sahada her takımdan 5 oyuncu bulunur.", category: "spor" },
  { question: "Formula 1'de en fazla şampiyonluğa sahip pilot kimdir?", options: ["Ayrton Senna", "Michael Schumacher", "Lewis Hamilton", "Sebastian Vettel"], correctIndex: 2, fact: "Lewis Hamilton, 7 şampiyonlukla rekoru kırdı.", category: "spor" },
  { question: "Voleybolda bir set kazanmak için gereken minimum puan kaçtır?", options: ["21", "23", "25", "30"], correctIndex: 2, fact: "Bir seti kazanmak için en az 25 puan ve 2 puan fark gerekir.", category: "spor" },
  { question: "Hangi ülke en fazla FIFA Dünya Kupası şampiyonluğuna sahiptir?", options: ["Almanya", "Arjantin", "Brezilya", "İtalya"], correctIndex: 2, fact: "Brezilya 5 kez Dünya Kupası kazandı (1958, 62, 70, 94, 2002).", category: "spor" },
  { question: "Türkiye'de hangi kulüp en fazla Süper Lig şampiyonluğuna sahiptir?", options: ["Beşiktaş", "Fenerbahçe", "Galatasaray", "Trabzonspor"], correctIndex: 2, fact: "Galatasaray rekor düzeyde Süper Lig şampiyonluğuna sahiptir.", category: "spor" },
  { question: "Usain Bolt hangi ülkelidir?", options: ["Amerika", "Jamaika", "Trinidad", "Barbados"], correctIndex: 1, fact: "Usain Bolt, 100m'de 9.58 saniyelik dünya rekoruyla tarihe geçti.", category: "spor" },
  { question: "Olimpiyat çemberlerinin renkleri hangileridir?", options: ["Mavi, sarı, kırmızı, yeşil, siyah", "Mavi, beyaz, kırmızı, yeşil, sarı", "Kırmızı, turuncu, sarı, yeşil, mavi", "Mavi, mor, kırmızı, yeşil, sarı"], correctIndex: 0, fact: "5 halka; mavi, sarı, kırmızı, yeşil ve siyahı temsil eder.", category: "spor" },
  { question: "Tour de France hangi spor dalına aittir?", options: ["Atletizm", "Motosiklet", "Bisiklet", "Triatlon"], correctIndex: 2, fact: "Tour de France, 1903'ten bu yana düzenlenen en prestijli bisiklet yarışıdır.", category: "spor" },
  { question: "Boks maçlarında KO ne anlama gelir?", options: ["Kaçış Oyunu", "Knockout", "Kontrol Öncesi", "Kural Onayı"], correctIndex: 1, fact: "Knockout: rakibin yere düşmesi ve 10 sayım içinde kalkamamasıdır.", category: "spor" },
  { question: "Türkiye olimpiyatlarda hangi sporda en fazla altın madalya almıştır?", options: ["Futbol", "Atletizm", "Güreş", "Halter"], correctIndex: 2, fact: "Güreş, Türk sporcuların olimpiyatlarda en fazla altın madalya kazandığı branştır.", category: "spor" },
  { question: "Amerikan futbolunda touchdown kaç sayı değerindedir?", options: ["3", "6", "7", "8"], correctIndex: 1, fact: "Touchdown 6 sayı değerindedir; dönüşüm denemesiyle toplamda 7'ye çıkabilir.", category: "spor" },
  { question: "Hangi şehir 2024 Yaz Olimpiyatları'na ev sahipliği yaptı?", options: ["Tokyo", "Los Angeles", "Paris", "Brisbane"], correctIndex: 2, fact: "Paris 2024 Olimpiyatları'na ev sahipliği yaptı; 100 yıl önce de (1924) aynı görevi üstlenmişti.", category: "spor" },
  { question: "Tae Kwon Do hangi ülkeden çıkmıştır?", options: ["Japonya", "Çin", "Kore", "Vietnam"], correctIndex: 2, fact: "Tae Kwon Do Kore menşeili bir dövüş sanatıdır ve 2000'den beri olimpik branştır.", category: "spor" },
  { question: "Hentbolda sahada kaç oyuncu bulunur?", options: ["5", "6", "7", "9"], correctIndex: 2, fact: "Hentbolda sahada her takımdan 7 oyuncu (6 saha + 1 kaleci) yer alır.", category: "spor" },
  { question: "Beyzbolda home run nedir?", options: ["Bir tur koşu", "Topu sahadan dışarı atma", "Üç vuruş hakkı", "Dördüncü tabanı geçme"], correctIndex: 1, fact: "Home run: topun sahayı aşmasıyla oyuncunun tüm tabanları dolaşıp sayı kazanmasıdır.", category: "spor" },
  { question: "Modern Pentatlon hangi sporları kapsar?", options: ["Eskrim, yüzme, binicilik, koşu, atış", "Koşu, bisiklet, yüzme, kürek, atlama", "Güreş, boks, judo, karate, tekvando", "Tenis, golf, yüzme, koşu, atlama"], correctIndex: 0, fact: "Modern Pentatlon; eskrim, yüzme, binicilik, koşu ve atışı kapsar.", category: "spor" },
  { question: "Kriket hangi ülkenin en geleneksel sporudur?", options: ["Avustralya", "Hindistan", "İngiltere", "Pakistan"], correctIndex: 2, fact: "Kriket İngiltere'de ortaya çıktı ve ülkenin en geleneksel sporudur.", category: "spor" },
  // film_dizi
  { question: "Yüzüklerin Efendisi filminin yönetmeni kimdir?", options: ["Ridley Scott", "James Cameron", "Peter Jackson", "Christopher Nolan"], correctIndex: 2, fact: "Peter Jackson, Tolkien'in romanlarını üçleme olarak 2001–2003'te sinemaya uyarladı.", category: "film_dizi" },
  { question: "Game of Thrones hangi kitap serisine dayanmaktadır?", options: ["Wheel of Time", "A Song of Ice and Fire", "Malazan Book of the Fallen", "The First Law"], correctIndex: 1, fact: "George R.R. Martin'in 'Buz ve Ateşin Şarkısı' serisi dizinin temelini oluşturur.", category: "film_dizi" },
  { question: "The Dark Knight'ta Joker'i kim canlandırdı?", options: ["Jack Nicholson", "Jared Leto", "Heath Ledger", "Joaquin Phoenix"], correctIndex: 2, fact: "Heath Ledger, performansıyla ölümünden sonra Oscar aldı.", category: "film_dizi" },
  { question: "Breaking Bad'de Walter White hangi mesleği yapıyordu?", options: ["Doktor", "Kimya öğretmeni", "Eczacı", "Mühendis"], correctIndex: 1, fact: "Walter White, Albuquerque'deki bir lisede kimya öğretmeniydi.", category: "film_dizi" },
  { question: "Titanic filminde iki ana karakteri kim canlandırdı?", options: ["Brad Pitt & Cate Blanchett", "Tom Hanks & Meg Ryan", "Leonardo DiCaprio & Kate Winslet", "Johnny Depp & Winona Ryder"], correctIndex: 2, fact: "James Cameron'ın 1997 filmi o dönemin gişe rekorunu kırdı.", category: "film_dizi" },
  { question: "Squid Game hangi ülke yapımıdır?", options: ["Japonya", "Çin", "Tayvan", "Güney Kore"], correctIndex: 3, fact: "Squid Game, 2021'de Netflix'te yayınlanarak küresel rekorlar kırdı.", category: "film_dizi" },
  { question: "Stranger Things hangi platformda yayınlanmaktadır?", options: ["HBO", "Disney+", "Netflix", "Amazon Prime"], correctIndex: 2, fact: "Stranger Things, 2016'dan bu yana Netflix'te yayınlanmaktadır.", category: "film_dizi" },
  { question: "Avatar filminin yönetmeni kimdir?", options: ["Steven Spielberg", "James Cameron", "Ridley Scott", "J.J. Abrams"], correctIndex: 1, fact: "James Cameron'ın 2009 yapımı Avatar uzun yıllar gişe rekoru tuttu.", category: "film_dizi" },
  { question: "Hangi animasyon filmi 'Let It Go' şarkısıyla tanınır?", options: ["Moana", "Tangled", "Frozen", "Brave"], correctIndex: 2, fact: "Frozen (Karlar Ülkesi), 2013'te Disney tarafından yayınlandı.", category: "film_dizi" },
  { question: "Pulp Fiction'ın yönetmeni kimdir?", options: ["Martin Scorsese", "Francis Ford Coppola", "Quentin Tarantino", "David Fincher"], correctIndex: 2, fact: "Pulp Fiction (1994), Quentin Tarantino'nun non-lineer anlatı yapısıyla sinema tarihine geçti.", category: "film_dizi" },
  { question: "Harry Potter'da Hogwarts müdürü kimdir?", options: ["Albus Dumbledore", "Severus Snape", "Minerva McGonagall", "Filius Flitwick"], correctIndex: 0, fact: "Albus Dumbledore ilk altı filmde Hogwarts müdürüdür.", category: "film_dizi" },
  { question: "Black Mirror dizisi hangi temayı işler?", options: ["Romantik ilişkiler", "Teknoloji ve toplum", "Uzay keşfi", "Polisiye"], correctIndex: 1, fact: "Black Mirror, dijital çağın karanlık yüzünü ele alan Britanya yapımı antoloji dizisidir.", category: "film_dizi" },
  { question: "Hangi Türk filmi Cannes'dan Altın Palmiye aldı?", options: ["Yol", "Kuru Otlar Üstüne", "Bir Zamanlar Anadolu'da", "Uzak"], correctIndex: 0, fact: "Yılmaz Güney'in 1982 yapımı 'Yol', Cannes'da Altın Palmiye kazandı.", category: "film_dizi" },
  { question: "The Witcher dizisindeki Geralt karakterini kim oynuyor?", options: ["Kit Harington", "Henry Cavill", "Chris Hemsworth", "Tom Hardy"], correctIndex: 1, fact: "Henry Cavill ilk üç sezonda Geralt of Rivia'yı canlandırdı.", category: "film_dizi" },
  { question: "Schindler's List filminin yönetmeni kimdir?", options: ["Stanley Kubrick", "Steven Spielberg", "Roman Polanski", "Francis Ford Coppola"], correctIndex: 1, fact: "Spielberg'in 1993 yapımı Oscar Schindler'in Yahudileri kurtarma hikayesini anlatır.", category: "film_dizi" },
  { question: "Euphoria dizisinde baş rolü oynayan oyuncu kimdir?", options: ["Selena Gomez", "Zendaya", "Billie Eilish", "Dua Lipa"], correctIndex: 1, fact: "Zendaya, Euphoria'daki rolüyle Emmy ödülü kazandı.", category: "film_dizi" },
  { question: "Aşağıdakilerden hangisi Pixar filmi değildir?", options: ["Toy Story", "Finding Nemo", "Moana", "Up"], correctIndex: 2, fact: "Moana, Walt Disney Animation Studios yapımıdır; Pixar değil.", category: "film_dizi" },
  { question: "Money Heist (La Casa de Papel) hangi ülke yapımıdır?", options: ["Arjantin", "Meksika", "İspanya", "Portekiz"], correctIndex: 2, fact: "İspanya yapımı dizi Netflix'te yayınlandıktan sonra küresel fenomene dönüştü.", category: "film_dizi" },
  { question: "Hangi Türk dizisi Netflix'te uluslararası ilk Türk yapımı oldu?", options: ["Diriliş Ertuğrul", "Kara Para Aşk", "Kuruluş Osman", "Fatma"], correctIndex: 3, fact: "Fatma, Netflix uluslararası listesinde en üst sıralara çıkan ilk Türk dizisi oldu.", category: "film_dizi" },
  { question: "11 Oscar ile rekor kıran filmlerden biri hangisidir?", options: ["Casablanca", "Ben-Hur", "Gladiator", "Avatar"], correctIndex: 1, fact: "Ben-Hur (1959), Titanic (1997) ve LOTR: ROTK (2003) 11'er Oscar ile rekor kırmıştır.", category: "film_dizi" },
  // bilim
  { question: "Işığın vakuumdaki hızı yaklaşık kaçtır?", options: ["300 km/s", "3.000 km/s", "300.000 km/s", "3.000.000 km/s"], correctIndex: 2, fact: "Işık vakumda saniyede yaklaşık 299.792 km hızla ilerler.", category: "bilim" },
  { question: "Periyodik tabloda en hafif element hangisidir?", options: ["Helyum", "Lityum", "Hidrojen", "Bor"], correctIndex: 2, fact: "Hidrojen (H), atom numarası 1 ve en düşük kütlesiyle periyodik tablonun ilk elementidir.", category: "bilim" },
  { question: "DNA'nın tam açılımı nedir?", options: ["Deoksiribonükleik Asit", "Dinitro Amino Asit", "Dinamik Nükleer Analiz", "Difüzyon Nükleer Ajan"], correctIndex: 0, fact: "DNA, genetik bilgiyi taşıyan çift sarmal yapıdaki moleküldür.", category: "bilim" },
  { question: "Güneş'e en yakın gezegen hangisidir?", options: ["Venüs", "Dünya", "Merkür", "Mars"], correctIndex: 2, fact: "Merkür Güneş'e en yakın gezegendir; ama en sıcak gezegen Venüs'tür.", category: "bilim" },
  { question: "Evrim teorisini ortaya atan bilim insanı kimdir?", options: ["Gregor Mendel", "Louis Pasteur", "Charles Darwin", "Isaac Newton"], correctIndex: 2, fact: "Charles Darwin 'Türlerin Kökeni' adlı eserini 1859'da yayımladı.", category: "bilim" },
  { question: "İnsan vücudundaki en uzun kemik hangisidir?", options: ["Humerus (üst kol)", "Tibia (kaval)", "Fibula (baldır)", "Femur (uyluk)"], correctIndex: 3, fact: "Femur (uyluk kemiği), yetişkin insanda ortalama 50 cm ile en uzun kemiktir.", category: "bilim" },
  { question: "pH değeri 7'nin altındaki sıvılar nasıl tanımlanır?", options: ["Bazik", "Nötr", "Asidik", "Tuzlu"], correctIndex: 2, fact: "pH 7 altı asidik, üzeri bazik, tam 7 nötral kabul edilir.", category: "bilim" },
  { question: "E=mc² formülünü kim geliştirdi?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Max Planck"], correctIndex: 2, fact: "Albert Einstein kütle-enerji denkliğini 1905'te özel görelilik teorisiyle ortaya koydu.", category: "bilim" },
  { question: "İnsan vücudunda kaç kemik bulunur?", options: ["186", "206", "226", "256"], correctIndex: 1, fact: "Yetişkin insan iskeleti yaklaşık 206 kemikten oluşur.", category: "bilim" },
  { question: "Fotosentezde bitkiler hangi gazı üretir?", options: ["Karbondioksit", "Azot", "Oksijen", "Hidrojen"], correctIndex: 2, fact: "Bitkiler güneş ışığıyla CO₂ ve suyu şekere dönüştürürken O₂ açığa çıkarır.", category: "bilim" },
  { question: "Au sembolü hangi elementin simgesidir?", options: ["Gümüş", "Altın", "Bakır", "Alüminyum"], correctIndex: 1, fact: "Au, Latince 'aurum'dan gelir ve altının kimyasal sembolüdür.", category: "bilim" },
  { question: "Kara delik nedir?", options: ["Çok soğuk bir gezegen", "Işığın kaçamadığı uzay bölgesi", "Nötron yıldızı türü", "Süpernova patlaması"], correctIndex: 1, fact: "Kara deliklerin yerçekimi o kadar güçlüdür ki ışık bile olay ufkundan kaçamaz.", category: "bilim" },
  { question: "Antibiyotiği kim keşfetti?", options: ["Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Robert Koch"], correctIndex: 1, fact: "Alexander Fleming, 1928'de penisilini keşfetti.", category: "bilim" },
  { question: "Büyük Patlama teorisi neyi açıklar?", options: ["Dünya'nın oluşumunu", "Evrenin genişlemesini ve başlangıcını", "Güneş sisteminin doğuşunu", "Kıtaların kaymasını"], correctIndex: 1, fact: "Büyük Patlama (Big Bang), evrenin yaklaşık 13,8 milyar yıl önce tek noktadan genişlemeye başladığını savunur.", category: "bilim" },
  { question: "İnsan beyninin yaklaşık ağırlığı nedir?", options: ["0,5 kg", "1 kg", "1,4 kg", "2 kg"], correctIndex: 2, fact: "Yetişkin insan beyni ortalama 1.300–1.400 gram arasındadır.", category: "bilim" },
  { question: "Ses hangi ortamda daha hızlı ilerler?", options: ["Boşluk", "Hava", "Su", "Çelik"], correctIndex: 3, fact: "Ses katı maddede (~5.100 m/s) havaya (~343 m/s) göre çok daha hızlı ilerler.", category: "bilim" },
  { question: "Hangi vitamin güneş ışığından sentezlenir?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], correctIndex: 2, fact: "Cilt, UV-B ışınları ile kolesterolden D vitamini sentezler.", category: "bilim" },
  { question: "Newton'un hareket yasaları kaç tanedir?", options: ["2", "3", "4", "5"], correctIndex: 1, fact: "Isaac Newton, 1687'de Principia'da üç hareket yasasını yayımladı.", category: "bilim" },
  { question: "Dünya atmosferindeki en bol gaz hangisidir?", options: ["Oksijen", "Karbondioksit", "Azot", "Argon"], correctIndex: 2, fact: "Atmosferin yaklaşık %78'i azottan, %21'i oksijendan oluşur.", category: "bilim" },
  { question: "Bir atomun çekirdeğinde hangi parçacıklar bulunur?", options: ["Elektron ve proton", "Proton ve nötron", "Elektron ve nötron", "Yalnızca elektron"], correctIndex: 1, fact: "Çekirdek proton ve nötronlardan oluşur; elektronlar dışarıdaki yörüngelerde dolaşır.", category: "bilim" },
  // cografya
  { question: "Dünyanın en uzun nehri hangisidir?", options: ["Amazon", "Yangtze", "Nil", "Mississippi"], correctIndex: 2, fact: "Nil nehri yaklaşık 6.650 km ile genel kabule göre dünyanın en uzun nehridir.", category: "cografya" },
  { question: "Dünyanın en yüksek dağı hangisidir?", options: ["K2", "Kangchenjunga", "Lhotse", "Everest"], correctIndex: 3, fact: "Everest (8.849 m), Nepal-Çin sınırında dünyanın en yüksek zirvesidir.", category: "cografya" },
  { question: "Yüzölçümü bakımından dünyanın en büyük ülkesi hangisidir?", options: ["Kanada", "Çin", "Rusya", "ABD"], correctIndex: 2, fact: "Rusya yaklaşık 17,1 milyon km² ile dünyanın en büyük ülkesidir.", category: "cografya" },
  { question: "Türkiye'nin en yüksek dağı hangisidir?", options: ["Uludağ", "Erciyes", "Kaçkar", "Ağrı Dağı"], correctIndex: 3, fact: "Ağrı Dağı, 5.137 m yüksekliğiyle Türkiye'nin en yüksek zirvesidir.", category: "cografya" },
  { question: "Dünyanın en derin gölü hangisidir?", options: ["Hazar Denizi", "Süperior Gölü", "Baykal Gölü", "Tanganika Gölü"], correctIndex: 2, fact: "Baykal Gölü, Sibirya'da yaklaşık 1.642 m derinliğiyle dünyanın en derin gölüdür.", category: "cografya" },
  { question: "Amazon Ormanları hangi kıtada yer alır?", options: ["Afrika", "Asya", "Güney Amerika", "Kuzey Amerika"], correctIndex: 2, fact: "Amazon Yağmur Ormanları başta Brezilya olmak üzere Güney Amerika'da 9 ülkeye yayılır.", category: "cografya" },
  { question: "Türkiye'nin en uzun nehri hangisidir?", options: ["Fırat", "Dicle", "Kızılırmak", "Sakarya"], correctIndex: 2, fact: "Kızılırmak, yaklaşık 1.355 km ile tamamen Türkiye topraklarındaki en uzun nehirdir.", category: "cografya" },
  { question: "Sahra Çölü hangi kıtadadır?", options: ["Asya", "Avustralya", "Afrika", "Güney Amerika"], correctIndex: 2, fact: "Sahra, dünyanın en büyük sıcak çölü olup Afrika'nın kuzeyindedir.", category: "cografya" },
  { question: "Hangi boğaz Karadeniz'i Marmara'ya bağlar?", options: ["Çanakkale Boğazı", "Hürmüz Boğazı", "İstanbul Boğazı", "Gibraltar Boğazı"], correctIndex: 2, fact: "İstanbul Boğazı (Boğaziçi), Karadeniz ile Marmara Denizi'ni birleştirir.", category: "cografya" },
  { question: "Dünyanın en küçük ülkesi hangisidir?", options: ["Monako", "San Marino", "Liechtenstein", "Vatikan"], correctIndex: 3, fact: "Vatikan, 0,44 km² ile dünyanın en küçük egemen devletidir.", category: "cografya" },
  { question: "Orta Doğu'nun en uzun nehri hangisidir?", options: ["Dicle", "Ürdün", "Fırat", "Karun"], correctIndex: 2, fact: "Fırat, yaklaşık 2.800 km uzunluğuyla Orta Doğu'nun en uzun nehridir.", category: "cografya" },
  { question: "Antarktika hangi statüdedir?", options: ["Norveç toprağı", "Avustralya toprağı", "Rusya toprağı", "Uluslararası alan"], correctIndex: 3, fact: "1959 Antarktika Antlaşması ile kıta uluslararası bilimsel alan ilan edildi.", category: "cografya" },
  { question: "Türkiye'nin kaç ili vardır?", options: ["77", "79", "81", "83"], correctIndex: 2, fact: "Türkiye 81 ile ayrılmıştır.", category: "cografya" },
  { question: "Dünyanın en büyük adası hangisidir?", options: ["Madagaskar", "Borneo", "Grönland", "Yeni Gine"], correctIndex: 2, fact: "Grönland, yaklaşık 2,1 milyon km² ile dünyanın en büyük adasıdır.", category: "cografya" },
  { question: "Ekvator hangi kıtalardan geçer?", options: ["Sadece Afrika", "Sadece Güney Amerika", "Asya ve Afrika", "Afrika ve Güney Amerika"], correctIndex: 3, fact: "Ekvator hem Afrika'dan hem de Güney Amerika'dan geçer.", category: "cografya" },
  { question: "İstanbul'un tarihi yarımadası hangi iki su yolu arasındadır?", options: ["Karadeniz–Ege", "Haliç–Boğaz", "Marmara–Karadeniz", "Boğaziçi–Akdeniz"], correctIndex: 1, fact: "Tarihi İstanbul yarımadası; güneyde Marmara, kuzeyde Haliç, doğuda Boğaz ile çevrilmiştir.", category: "cografya" },
  { question: "Himalayalar hangi iki plakanın çarpışmasıyla oluştu?", options: ["Avrasya–Afrika", "Avrasya–Hint-Avustralya", "Pasifik–Avrasya", "Kuzey Amerika–Avrasya"], correctIndex: 1, fact: "Hint-Avustralya plakasının Avrasya plakasına çarpması Himalayaları yükseltmiştir.", category: "cografya" },
  { question: "Yüzey alanı bakımından dünyanın en büyük gölü hangisidir?", options: ["Baykal", "Hazar", "Süperior", "Michigan"], correctIndex: 1, fact: "Hazar Denizi, ~371.000 km² ile dünyanın en büyük kapalı su kütlesidir.", category: "cografya" },
  { question: "Türkiye'nin en uzun kıyı şeridine sahip denizi hangisidir?", options: ["Karadeniz", "Marmara", "Ege", "Akdeniz"], correctIndex: 2, fact: "Türkiye'nin Ege kıyısı çok sayıda körfez ve yarımadayla en uzun kıyı şeridini oluşturur.", category: "cografya" },
  { question: "Dünyanın en büyük çölü hangisidir?", options: ["Sahra", "Gobi", "Arabistan", "Antarktika"], correctIndex: 3, fact: "Antarktika soğuk çöl olarak ~14,2 milyon km² ile dünyanın en büyük çölüdür.", category: "cografya" },
];

// ─────────────────────────────────────────────────────────────────────────────

async function ekle() {
  if (!yeniSorular.length) {
    console.log("⚠️  Eklenecek soru yok. Dosyayı düzenleyip tekrar dene.");
    return;
  }

  const col = db.collection("quiz_questions");
  const batch = db.batch();
  yeniSorular.forEach(q => batch.set(col.doc(), q));
  await batch.commit();

  console.log(`✅ ${yeniSorular.length} soru eklendi.`);
  console.log(`📦 Firestore'daki toplam soru sayısı için konsolu kontrol et.`);
}

ekle().catch(e => { console.error(e); process.exit(1); });
