/**
 * GENEL KÜLTÜR — EK SORULAR (zorluk etiketli)
 * ─────────────────────────────────────────────
 * node scripts/genel-kultur-ek.mjs
 *
 * 80 soru: 20 kolay · 20 orta · 20 zor · 20 çok zor
 * Mevcut soru havuzunu büyütür; çakışma olmaz.
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
    question: "Dünya'nın en büyük okyanusu hangisidir?",
    options: ["Atlas Okyanusu", "Hint Okyanusu", "Arktik Okyanusu", "Büyük Okyanus"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Büyük Okyanus (Pasifik) yaklaşık 165 milyon km² alanıyla diğer tüm okyanusların toplamından daha büyüktür.",
  },
  {
    question: "İnsan vücudundaki en büyük organ hangisidir?",
    options: ["Karaciğer", "Akciğer", "Deri", "Kalp"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Deri yaklaşık 1,5-2 m² alanıyla insan vücudunun en büyük organıdır.",
  },
  {
    question: "Güneş Sistemi'nin en büyük gezegeni hangisidir?",
    options: ["Satürn", "Jüpiter", "Uranüs", "Neptün"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Jüpiter, Dünya'nın 1.300 katı hacmindedir ve Güneş Sistemi'ndeki tüm diğer gezegenlerin toplam kütlesinin iki katına eşittir.",
  },
  {
    question: "DNA'nın açılımı nedir?",
    options: ["Dijital Nükleer Asit", "Dinitrojen Amino Asit", "Dezoksiribonükleik Asit", "Dinamik Nükleotid Analizi"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Dezoksiribonükleik Asit (DNA), canlılardaki genetik bilgiyi taşıyan moleküldür.",
  },
  {
    question: "Türk lirasının para birimi sembolü nedir?",
    options: ["₺", "€", "₼", "₸"],
    correctIndex: 0,
    difficulty: "easy",
    fact: "Türk Lirası sembolü (₺) 2012 yılında Türkiye Cumhuriyet Merkez Bankası tarafından resmi kullanıma alındı.",
  },
  {
    question: "Hangi element periyodik tablonun ilk sırasındadır?",
    options: ["Helyum", "Lityum", "Hidrojen", "Oksijen"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Hidrojen (H) atom numarası 1 ile periyodik tablonun başındadır ve evrendeki en bol elementtir.",
  },
  {
    question: "Osmanlı Devleti hangi yıl yıkılmıştır?",
    options: ["1918", "1920", "1922", "1923"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "TBMM, 1 Kasım 1922'de saltanatı kaldırdı. Türkiye Cumhuriyeti 29 Ekim 1923'te ilan edildi.",
  },
  {
    question: "Hangisi bir programlama dilidir?",
    options: ["HTML", "Python", "CSS", "Markdown"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "Python Guido van Rossum tarafından geliştirilen genel amaçlı bir programlama dilidir; adını Monty Python'dan alır.",
  },
  {
    question: "Nil Nehri hangi kıtada yer alır?",
    options: ["Asya", "Güney Amerika", "Avrupa", "Afrika"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Nil Nehri yaklaşık 6.650 km ile dünyanın en uzun nehirlerinden biridir; Uganda'dan Akdeniz'e uzanır.",
  },
  {
    question: "Hangisi yenilenebilir bir enerji kaynağıdır?",
    options: ["Doğal gaz", "Kömür", "Güneş enerjisi", "Petrol"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Güneş enerjisi doğrudan tükenmez bir kaynak olan güneş ışığından elde edilir; karbon salımı yoktur.",
  },
  {
    question: "Hangi renk ışığın dalga boyu en kısadır?",
    options: ["Kırmızı", "Sarı", "Yeşil", "Mor"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Mor ışığın dalga boyu yaklaşık 380-450 nm ile görünür ışık spektrumunun en kısa dalga boylu uçundadır.",
  },
  {
    question: "Türkiye'nin para birimi nedir?",
    options: ["Euro", "Dolar", "Türk Lirası", "Sterlin"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Türk Lirası (₺) 1923'ten bu yana Türkiye'nin resmi para birimidir.",
  },
  {
    question: "Su kaç derecede kaynar (deniz seviyesinde)?",
    options: ["80°C", "90°C", "95°C", "100°C"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Deniz seviyesinde su 100°C'de kaynar; yüksek rakımlı yerlerde basınç düştüğünden kaynama noktası da düşer.",
  },
  {
    question: "Dünya üzerinde kaç kıta vardır?",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Genel olarak 7 kıta kabul edilir: Afrika, Antarktika, Asya, Avustralya, Avrupa, Kuzey Amerika, Güney Amerika.",
  },
  {
    question: "Hangisi bir uydu değildir?",
    options: ["Ay", "Titan", "Fobos", "Merkür"],
    correctIndex: 3,
    difficulty: "easy",
    fact: "Merkür, Güneş'e en yakın gezegendir; kendi etrafında dönen doğal uydusu yoktur.",
  },
  {
    question: "Hangi bilim insanı yerçekimi yasasını formüle etmiştir?",
    options: ["Albert Einstein", "Galileo Galilei", "Isaac Newton", "Nikola Tesla"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Isaac Newton evrensel yerçekimi yasasını 1687'de 'Principia Mathematica' adlı eserinde yayımladı.",
  },
  {
    question: "Türkiye'nin resmi dili nedir?",
    options: ["Osmanlıca", "Kürtçe", "Türkçe", "Arapça"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Türkçe Türkiye'nin tek resmi dilidir; aynı zamanda Kıbrıs'ta da resmi dil statüsündedir.",
  },
  {
    question: "Hangi hayvan insanlara en fazla ölüm sebebiyet verir?",
    options: ["Aslan", "Timsah", "Sivrisinek", "Köpekbalığı"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Sivrisinekler sıtma, dang ve diğer hastalıkları bulaştırarak yılda 700.000'den fazla insanın ölümüne neden olur.",
  },
  {
    question: "Hangisi bir yazılı iletişim protokolüdür?",
    options: ["USB", "HTTP", "HDMI", "Bluetooth"],
    correctIndex: 1,
    difficulty: "easy",
    fact: "HTTP (HyperText Transfer Protocol) web sayfalarının internet üzerinden aktarılmasını sağlayan protokoldür.",
  },
  {
    question: "Dünya'nın en yüksek dağı hangisidir?",
    options: ["K2", "Kangchenjunga", "Everest", "Lhotse"],
    correctIndex: 2,
    difficulty: "easy",
    fact: "Everest Dağı 8.849 metre ile deniz seviyesinden ölçülen en yüksek noktadır; Himalayalar'da Nepal-Çin sınırında yer alır.",
  },

  // ── ORTA (20) ──────────────────────────────────────────────────────────────
  {
    question: "Hangi element simgesi 'Au' ile gösterilir?",
    options: ["Gümüş", "Bakır", "Altın", "Alüminyum"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "'Au' sembolü Latince 'aurum' (altın) kelimesinden gelir; altın atom numarası 79'dur.",
  },
  {
    question: "Hangisi bir asal sayı değildir?",
    options: ["97", "89", "51", "71"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "51 = 3 × 17 olduğundan asal değildir. 71, 89 ve 97 asal sayılardır.",
  },
  {
    question: "Rönesans hareketi hangi ülkede başladı?",
    options: ["Fransa", "İspanya", "İtalya", "Almanya"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Rönesans 14. yüzyılda İtalya'da başladı; Floransa, Venedik ve Roma bu hareketin merkezleriydi.",
  },
  {
    question: "Işığın boşluktaki hızı yaklaşık kaç km/s'dir?",
    options: ["150.000 km/s", "300.000 km/s", "500.000 km/s", "1.000.000 km/s"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Işık boşlukta saniyede yaklaşık 299.792 km hızla ilerler; bu değer 'c' sembolüyle gösterilir.",
  },
  {
    question: "Hangi savaş 1853-1856 yılları arasında yaşandı?",
    options: ["Birinci Dünya Savaşı", "Kırım Savaşı", "Fransız-Prusya Savaşı", "Balkan Savaşları"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "Kırım Savaşı'nda Osmanlı, İngiltere ve Fransa Rusya'ya karşı savaştı; Florence Nightingale bu savaşta hemşirelik hizmetleriyle öne çıktı.",
  },
  {
    question: "Olimpiyat Oyunları ilk kez hangi ülkede düzenlendi?",
    options: ["İtalya", "Fransa", "İngiltere", "Yunanistan"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Modern Olimpiyat Oyunları 1896'da Atina'da başladı. Antik Olimpiyat Oyunları ise MÖ 776'da Olympia'da yapılıyordu.",
  },
  {
    question: "Antarktika'nın büyük çoğunluğu hangi ülkeye aittir?",
    options: ["Avustralya", "Norveç", "Arjantin", "Hiçbir ülkeye ait değil"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "1959 Antarktika Antlaşması ile Antarktika'nın tüm insanlığa ait olduğu tescillendi; hiçbir ülkenin egemenliği geçerli değildir.",
  },
  {
    question: "Hangi bilim insanı görelilik teorisini geliştirdi?",
    options: ["Niels Bohr", "Max Planck", "Albert Einstein", "Werner Heisenberg"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Albert Einstein 1905'te Özel Görelilik, 1915'te Genel Görelilik teorisini yayımladı.",
  },
  {
    question: "Dünyanın en uzun nehri hangisidir?",
    options: ["Amazon", "Yangtze", "Mississippi", "Nil"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Nil Nehri yaklaşık 6.650 km uzunluğuyla tartışmalı biçimde en uzun nehir unvanını Amazon ile paylaşır.",
  },
  {
    question: "Hangi kimyasal bileşik 'kuru buz' olarak bilinir?",
    options: ["Azot dioksit", "Sülfür heksaflorür", "Katı karbon dioksit", "Sıvı azot"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Kuru buz, -78,5°C'de sıvıya geçmeden doğrudan gazlaşan katı karbondioksittir; soğutma ve sahne efektlerinde kullanılır.",
  },
  {
    question: "Hangi gezegen Güneş'e en yakındır?",
    options: ["Venüs", "Dünya", "Mars", "Merkür"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Merkür Güneş'e en yakın gezegendir; ancak en sıcak gezegen değildir — en sıcağı kalın atmosferi nedeniyle Venüs'tür.",
  },
  {
    question: "Çin Seddi yaklaşık kaç km uzunluğundadır?",
    options: ["2.000 km", "5.000 km", "12.000 km", "21.000 km"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Tüm kollar dahil Çin Seddi'nin uzunluğu yaklaşık 21.196 km'dir; tek bir yapı olarak inşa edilmemiştir.",
  },
  {
    question: "Hangi ülke dünyada en fazla nüfusa sahiptir?",
    options: ["Hindistan", "Çin", "ABD", "Endonezya"],
    correctIndex: 0,
    difficulty: "medium",
    fact: "Hindistan 2023'te Çin'i geçerek dünya nüfusunda birinci sıraya yerleşti; her iki ülkenin nüfusu da 1,4 milyarı aşmaktadır.",
  },
  {
    question: "İnternet'i geliştiren ilk protokol hangisidir?",
    options: ["HTTP", "FTP", "ARPANET", "TCP/IP"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "ARPANET 1969'da ABD Savunma Bakanlığı tarafından geliştirilen modern internetin öncüsüdür.",
  },
  {
    question: "Hangi okyanus dünyada en küçüğüdür?",
    options: ["Hint Okyanusu", "Atlas Okyanusu", "Güney Okyanusu", "Arktik Okyanusu"],
    correctIndex: 3,
    difficulty: "medium",
    fact: "Arktik Okyanusu yaklaşık 14 milyon km² alanıyla dünyanın en küçük ve sığ okyanusudur.",
  },
  {
    question: "Hangi dil dünyada en çok konuşan kişi sayısına sahiptir?",
    options: ["İspanyolca", "İngilizce", "Mandarin Çincesi", "Hintçe"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Mandarin Çincesi yaklaşık 920 milyon anadil konuşucusuyla dünya birincisidir.",
  },
  {
    question: "Hangi organ insülin hormonu üretir?",
    options: ["Karaciğer", "Böbrek", "Pankreas", "Tiroid"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Pankreas, kan şekerini düzenlemek için insülin ve glukagon hormonlarını üretir.",
  },
  {
    question: "Dünya Sağlık Örgütü'nün kısaltması nedir?",
    options: ["WTO", "WHO", "UNESCO", "UNICEF"],
    correctIndex: 1,
    difficulty: "medium",
    fact: "WHO (World Health Organization), 1948'de kurulan BM'nin sağlık alanındaki uzman kuruluşudur.",
  },
  {
    question: "Hangisi öte-gezegen değildir?",
    options: ["Kepler-22b", "Proxima Centauri b", "Ganymede", "TRAPPIST-1e"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "Ganymede Güneş Sistemi'nin en büyük uydusu ve Jüpiter'in doğal uydusudur; öte-gezegen (başka yıldız etrafında dönen gezegen) değildir.",
  },
  {
    question: "Hangi Osmanlı padişahı 1453'te İstanbul'u fethetti?",
    options: ["I. Murat", "II. Bayezid", "II. Mehmed", "Yavuz Sultan Selim"],
    correctIndex: 2,
    difficulty: "medium",
    fact: "II. Mehmed (Fatih Sultan Mehmed), 29 Mayıs 1453'te İstanbul'u fethederek Bizans İmparatorluğu'na son verdi.",
  },

  // ── ZOR (20) ───────────────────────────────────────────────────────────────
  {
    question: "Fermat'ın Son Teoremi kimtarafından ispatlandı?",
    options: ["Leonhard Euler", "Carl Gauss", "Andrew Wiles", "Henri Poincaré"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Andrew Wiles 357 yıl boyunca ispatsız kalan Fermat'ın Son Teoremi'ni 1995'te kanıtladı.",
  },
  {
    question: "Higgs bozonu hangi yılda deneysel olarak gözlemlendi?",
    options: ["2008", "2010", "2012", "2015"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "CERN'deki LHC deneylerinde 2012'de keşfedilen Higgs bozonu, parçacıklara kütle kazandıran alanın taşıyıcısıdır.",
  },
  {
    question: "Hangi antik medeniyet Linear B yazısını kullandı?",
    options: ["Minos uygarlığı", "Miken uygarlığı", "Sümer uygarlığı", "Mısır uygarlığı"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Linear B, MÖ 1450-1200 yılları arasında Miken uygarlığı tarafından kullanılan ve 1952'de Michael Ventris tarafından çözülen Yunanca öncesine ait bir yazı sistemidir.",
  },
  {
    question: "Hangi Türk şairi 'Safahat' adlı eseriyle tanınır?",
    options: ["Yahya Kemal", "Tevfik Fikret", "Mehmet Akif Ersoy", "Nazım Hikmet"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Mehmet Akif Ersoy'un 'Safahat'ı 7 kitaptan oluşur; İstiklal Marşı'nı da yazan Ersoy 1936'da hayatını kaybetti.",
  },
  {
    question: "Hangi fizik yasası 'her etki için eşit ve zıt tepki vardır' ifadesini içerir?",
    options: ["Newton'ın 1. Yasası", "Newton'ın 2. Yasası", "Newton'ın 3. Yasası", "Termodinamiğin 2. Yasası"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Newton'ın üçüncü hareket yasası eylem-tepki ilkesini tanımlar; roket iticisi, yüzme ve yürüyüş bu ilkeye dayanır.",
  },
  {
    question: "Osmanlı Devleti'nin kuruluş tarihi olarak kabul edilen yıl hangisidir?",
    options: ["1071", "1243", "1299", "1326"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "1299 yılı, Osman Bey'in bağımsızlığını ilan ettiği gelenek tarafından kabul edilen kuruluş tarihi olarak bilinir.",
  },
  {
    question: "Hangi ülke 'yükselen güneşin ülkesi' anlamına gelen ismiyle anılır?",
    options: ["Çin", "Tayland", "Japonya", "Kore"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Japonya'nın Japonca adı 'Nihon/Nippon', 'güneşin kökeni' anlamına gelir; bu ifade Çince'de 'Riben' olarak yazılır.",
  },
  {
    question: "Hangi savaşta Türkler Anadolu'nun kontrolünü kesin olarak ele geçirdi?",
    options: ["Dandanakan Muharebesi", "Malazgirt Muharebesi", "Miryokefalon Muharebesi", "Kösedağ Muharebesi"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "1071 Malazgirt Muharebesi'nde Alparslan, Bizans İmparatoru Romanos'u esir aldı; bu zafer Türklerin Anadolu'ya yerleşmesinin kapısını araladı.",
  },
  {
    question: "Bağıl atomik kütle birimi olarak kullanılan 'dalton' hangi bilim insanından alınmıştır?",
    options: ["Michael Faraday", "John Dalton", "Ernest Rutherford", "J.J. Thomson"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "John Dalton modern atom teorisini 1803'te geliştirdi; 1 dalton yaklaşık 1.66×10⁻²⁷ kg'a eşittir.",
  },
  {
    question: "Hangi dönemde 'Altın Çağ İslam Medeniyeti' yaşandı?",
    options: ["7-8. yüzyıl", "8-13. yüzyıl", "13-15. yüzyıl", "15-17. yüzyıl"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "8-13. yüzyıllar arasındaki Abbasi halifeliği döneminde matematik, astronomi, tıp ve felsefede büyük ilerlemeler kaydedildi.",
  },
  {
    question: "Hangisi Osmanlı'da 'Kanuni' olarak anılan padişahın diğer adıdır?",
    options: ["Fatih", "Yavuz", "Süleyman", "Suleiman the Magnificent"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Kanuni Sultan Süleyman (1520-1566) en uzun süre tahtta kalan Osmanlı padişahıdır; 46 yıllık saltanatında imparatorluk en geniş sınırlarına ulaştı.",
  },
  {
    question: "Şroedinger'in kedisi deneyi hangi kavramı ele alır?",
    options: ["Tünel etkisi", "Kuantum süperpozisyonu", "Heisenberg belirsizliği", "Dalga-parçacık ikiliği"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Erwin Schrödinger 1935'te kuantum mekaniğindeki süperpozisyon kavramını irdelemek için bu düşünce deneyini önerdi.",
  },
  {
    question: "Türkiye hangi yıl NATO'ya katıldı?",
    options: ["1949", "1951", "1952", "1955"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Türkiye, Kore Savaşı'nda BM kuvvetlerine katıldıktan sonra 1952'de Yunanistan ile birlikte NATO'ya üye oldu.",
  },
  {
    question: "Hangi bilim insanı 'doğal seçilim' teorisini geliştirdi?",
    options: ["Jean-Baptiste Lamarck", "Gregor Mendel", "Charles Darwin", "Thomas Huxley"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Charles Darwin 1859'da 'Türlerin Kökeni' adlı eserinde doğal seçilim yoluyla evrimi bilimsel kanıtlarıyla ortaya koydu.",
  },
  {
    question: "Kutup Yıldızı (Kuzeyyıldızı) hangi takımyıldızına aittir?",
    options: ["Büyük Ayı", "Küçük Ayı", "Cassiopeia", "Ejderha"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Kutup Yıldızı (Polaris), Küçük Ayı (Ursa Minor) takımyıldızının 'kuyruğundaki' en uç yıldızdır.",
  },
  {
    question: "Hangi ülke alfabesini Kiril alfabesine döndüren son ülkedir?",
    options: ["Kazakistan", "Türkmenistan", "Özbekistan", "Azerbaycan"],
    correctIndex: 0,
    difficulty: "hard",
    fact: "Kazakistan 2017'de Latin alfabesine geçiş sürecini başlattı; 2023'e kadar Latin tabanlı yeni alfabeye tam geçişi hedefledi.",
  },
  {
    question: "CRISPR-Cas9 teknolojisi neyi sağlar?",
    options: ["Protein sentezini hızlandırır", "DNA'yı hassas biçimde düzenler", "Hücre bölünmesini durdurur", "Antikorları çoğaltır"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "CRISPR-Cas9 bir 'gen makası' olarak çalışır; genomun istenen bir bölgesini kesmek veya değiştirmek için kullanılır.",
  },
  {
    question: "Türkiye'deki hangi tarihi yapı UNESCO Dünya Mirası listesinde yer alan ilk modern mimari yapıdır?",
    options: ["Galata Kulesi", "Çatalhöyük", "Divriği Ulucamii", "Safranbolu Evleri"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Divriği Ulucamii ve Darüşşifası 1985'te listeye alındı; Anadolu Selçuklu dönemi taş işçiliğinin eşsiz örneğidir.",
  },
  {
    question: "Hangi matematiksel kavram Georg Cantor tarafından geliştirildi?",
    options: ["Kaos teorisi", "Sonsuzluk teorisi (transfinite sayılar)", "Fraktal geometri", "Topoloji"],
    correctIndex: 1,
    difficulty: "hard",
    fact: "Georg Cantor 19. yüzyılda farklı büyüklüklerde sonsuzluklar bulunduğunu kanıtladı; bu transfinite sayı teorisinin temelini oluşturdu.",
  },
  {
    question: "Hangi savaş 'savaşları bitiren savaş' olarak anılır?",
    options: ["Kore Savaşı", "Vietnam Savaşı", "Birinci Dünya Savaşı", "Napolyon Savaşları"],
    correctIndex: 2,
    difficulty: "hard",
    fact: "Birinci Dünya Savaşı (1914-1918) 'tüm savaşları bitirecek savaş' olarak lanse edildi; ne var ki 21 yıl içinde İkinci Dünya Savaşı patlak verdi.",
  },

  // ── ÇOK ZOR (20) ───────────────────────────────────────────────────────────
  {
    question: "Hangi element için 'Nd' sembolü kullanılır?",
    options: ["Niyobyum", "Neodimyum", "Neptünyum", "Nobel"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Nd (Neodyum), güçlü mıknatıslarda (NdFeB) kullanılır; rüzgar türbinleri ve elektrikli araç motorları için kritik bir element.",
  },
  {
    question: "Osmanlı Devleti'nde 'Tanzimat Fermanı' hangi padişah döneminde ilan edildi?",
    options: ["II. Mahmut", "Abdülmecid I", "Abdülaziz", "II. Abdülhamid"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Tanzimat Fermanı 1839'da Sultan Abdülmecid döneminde Gülhane Parkı'nda okundu; modernleşmenin resmi başlangıcı sayılır.",
  },
  {
    question: "Hangi Bizans imparatoru 'büyük kanun derleyicisi' unvanıyla bilinir?",
    options: ["Justinianus I", "Konstantinos I", "Herakleios", "Basileios II"],
    correctIndex: 0,
    difficulty: "very_hard",
    fact: "Justinianus I, Roma hukukunu Corpus Juris Civilis'te derledi; bu hukuki miras Avrupa hukuk sistemlerinin temelini oluşturur.",
  },
  {
    question: "Hangi parçacık nükleer kuvvetleri aktarır?",
    options: ["Foton", "W ve Z bozonarı", "Gluon", "Graviton"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Gluonlar, kuark ve anti-kuarkları bir arada tutan kuvvetli nükleer kuvvetin aracı parçacıklarıdır.",
  },
  {
    question: "Türkçe 'Divanü Lugati't-Türk' hangi dönemde yazıldı?",
    options: ["9. yüzyıl", "10. yüzyıl", "11. yüzyıl", "12. yüzyıl"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Kaşgarlı Mahmud 1072-1074 yılları arasında bu Türkçe-Arapça sözlüğü kaleme aldı; Türk dili ve kültürünün en erken kaynaklarından biridir.",
  },
  {
    question: "Hangi matematiksel problem 'Riemann Hipotezi' olarak bilinir?",
    options: ["Tüm çift sayılar iki asal sayının toplamıdır", "Seta fonksiyonunun sıfırları Bulanık eksen üzerindedir", "Her polinomun en az bir karmaşık kökü vardır", "Sonsuz sayıda ikiz asal sayı çifti vardır"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Riemann Hipotezi, 1859'dan bu yana kanıtlanamayan Milenyum Ödülü problemlerinden biridir; asal sayıların dağılımıyla ilgilidir.",
  },
  {
    question: "Hangi ülke dünyanın ilk nükleer silah kullanılan savaşında saldırıya uğradı?",
    options: ["Çin", "Japonya", "Almanya", "Kore"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "ABD, Ağustos 1945'te Japonya'nın Hiroşima (6 Ağustos) ve Nagasaki (9 Ağustos) kentlerine atom bombası attı.",
  },
  {
    question: "Türkiye'de hangi tarihte çok partili sisteme geçildi?",
    options: ["1945", "1946", "1950", "1952"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Türkiye 1946'da çok partili seçimlere geçti; 1950'de Demokrat Parti ilk kez iktidara geldi.",
  },
  {
    question: "Hangi antik Mısır firavununun mezarı 1922'de bulundu?",
    options: ["Ramses II", "Amenhotep III", "Tutankhamun", "Akhenaten"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Howard Carter, Kral Vadisi'nde neredeyse dokunulmamış olan Tutankhamun'un mezarını 1922'de keşfetti.",
  },
  {
    question: "Hangi şehir 1930'a kadar İstanbul'un resmi adıydı?",
    options: ["Kostantinopolis", "Bizans", "Konstantinopolis", "Konstantinopolis"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Şehir 1453'ten beri halk arasında İstanbul olarak anılıyordu; ancak Türk Posta Kanunu ile yabancı devletlere resmi adın 'İstanbul' olduğu 1930'da bildirildi.",
  },
  {
    question: "P ≠ NP problemi hangi alanla ilgilidir?",
    options: ["Kuantum mekaniği", "Hesaplama teorisi", "Kriptografi", "Yapay Zeka"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "P ≠ NP, Milenyum Ödülü problemlerinden biri olup 'çözümü doğrulamak, çözümü bulmak kadar kolay mıdır?' sorusunu ele alır.",
  },
  {
    question: "Hangi astronomi terimi 'parlak bir yıldız grubunu' ifade eder ve İngilizce 'galaxy' kelimesinin kökeni Yunanca'da neye dayanır?",
    options: ["Süt (gala)", "Işık (phos)", "Yıldız (aster)", "Boşluk (kenon)"],
    correctIndex: 0,
    difficulty: "very_hard",
    fact: "'Galaxy' kelimesi Yunanca 'galaktos' (süt) kökünden gelir; Samanyolu'nun Yunanca adı 'Kyklos Galaktikos' (Sütlü Çember) anlamına gelir.",
  },
  {
    question: "Türkiye'nin ilk cumhurbaşkanı sonrası ikinci cumhurbaşkanı kimdir?",
    options: ["Celal Bayar", "İsmet İnönü", "Adnan Menderes", "Fahri Korutürk"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "İsmet İnönü, 1938-1950 yılları arasında Türkiye'nin ikinci cumhurbaşkanı olarak görev yaptı.",
  },
  {
    question: "Hangi antik Yunan filozofu 'Devlet' (Politeia) adlı eserin yazarıdır?",
    options: ["Sokrates", "Aristoteles", "Platon", "Thukydides"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Platon'un 'Devlet' adlı diyaloğu ideal şehir-devletini tartışır; 'filozof-kral' kavramını da bu eserde ortaya koymuştur.",
  },
  {
    question: "Hangi ülke 'Güneşin Batmadığı İmparatorluk' olarak anıldı?",
    options: ["Fransa", "Portekiz", "İspanya", "İngiltere"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Bu ifade ilk kez 16. yüzyılda İspanya İmparatorluğu için kullanıldı; ardından 19. yüzyılda İngiliz İmparatorluğu için popüler hale geldi.",
  },
  {
    question: "Hangi Nobel ödüllü bilim insanı karadelikler üzerine yaptığı çalışmalarla tanınır?",
    options: ["Stephen Hawking", "Roger Penrose", "Kip Thorne", "Andrea Ghez"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Andrea Ghez 2020'de Samanyolu'nun merkezindeki süpermasif karadeliğin keşfine katkısıyla Nobel Fizik Ödülü'nü kazandı.",
  },
  {
    question: "Türkiye'de 'Kurtuluş Savaşı'nın resmi bitiş tarihi hangidir?",
    options: ["30 Ağustos 1922", "11 Ekim 1922", "24 Temmuz 1923", "29 Ekim 1923"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "Lozan Antlaşması 24 Temmuz 1923'te imzalandı; bu antlaşma Türkiye'nin uluslararası alanda tanınmasını ve Kurtuluş Savaşı'nın sona ermesini simgeler.",
  },
  {
    question: "Hangi matematikçi 'Gauss-Bonet teoremi' ile tanınır?",
    options: ["Leonhard Euler", "Carl Friedrich Gauss", "Pierre-Simon Laplace", "Jean le Rond d'Alembert"],
    correctIndex: 1,
    difficulty: "very_hard",
    fact: "Carl Friedrich Gauss 'matematikçilerin prensi' olarak anılır; eğrilik, sayı teorisi ve istatistik alanlarında köklü katkılar yapmıştır.",
  },
  {
    question: "Bağımsız Türkiye'nin ilk nüfus sayımı hangi yılda yapıldı?",
    options: ["1923", "1925", "1927", "1930"],
    correctIndex: 2,
    difficulty: "very_hard",
    fact: "1927 sayımı Türkiye Cumhuriyeti'nin ilk nüfus sayımıdır; bu sayımda nüfus yaklaşık 13,6 milyon olarak tespit edildi.",
  },
  {
    question: "Hangi kimyasal element insan vücudunda kütlece en bol bulunur?",
    options: ["Karbon", "Hidrojen", "Azot", "Oksijen"],
    correctIndex: 3,
    difficulty: "very_hard",
    fact: "Oksijen vücut kütlesinin yaklaşık %65'ini oluşturur; çoğunlukla su ve organik moleküller içinde bulunur.",
  },
];

async function seed() {
  const col = db.collection("quiz_questions");

  // 500-belgeli Firestore batch limiti nedeniyle gruplara böl
  const batchSize = 499;
  for (let i = 0; i < Q.length; i += batchSize) {
    const chunk = Q.slice(i, i + batchSize);
    const batch = db.batch();
    for (const q of chunk) {
      batch.set(col.doc(), { ...q, category: "genel-kultur" });
    }
    await batch.commit();
    console.log(`✅ ${i + chunk.length}/${Q.length} soru eklendi.`);
  }
  console.log(`🎉 Toplam ${Q.length} genel kültür sorusu eklendi.`);
}

seed().catch(console.error);
