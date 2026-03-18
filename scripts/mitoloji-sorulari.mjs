/**
 * Mitoloji quiz soruları
 * Kategori: mitoloji
 * 5 zorluk seviyesi × 10 soru = 50 soru
 *
 * Çalıştır: node scripts/mitoloji-sorulari.mjs
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
    question: "Yunan mitolojisinde gökyüzü ve şimşeğin tanrısı kimdir?",
    options: ["Poseidon", "Hades", "Zeus", "Ares"],
    correctIndex: 2,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Zeus, Olympos dağının en güçlü tanrısıydı ve şimşek yıldırımı onun silahıydı.",
  },
  {
    question: "Truva Savaşı'nı başlatan Troyalı prens kimdir?",
    options: ["Hektor", "Paris", "Aeneas", "Priam"],
    correctIndex: 1,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Paris, Sparta Kralı Menelaos'un karısı Helena'yı kaçırarak Truva Savaşı'nı başlattı.",
  },
  {
    question: "Yunan mitolojisinde denizler ve okyanusların tanrısı kimdir?",
    options: ["Zeus", "Hades", "Hermes", "Poseidon"],
    correctIndex: 3,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Poseidon'un silahı trident (üç çatallı mızrak) idi ve deniz depremlerine neden olduğuna inanılırdı.",
  },
  {
    question: "Yunan mitolojisinde ölüler diyarının tanrısı kimdir?",
    options: ["Ares", "Hades", "Kronos", "Thanatos"],
    correctIndex: 1,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Hades, yeraltı dünyasını yönetirdi. Ölü ruhların bu aleme geçişi için Kharon onları Styx nehriyle taşırdı.",
  },
  {
    question: "Mitolojide güneş arabası süren ve güneşi temsil eden tanrı kimdir?",
    options: ["Apollo", "Helios", "Hermes", "Hephaestus"],
    correctIndex: 1,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Helios, her gün güneş arabasını gökyüzünde sürerek günü başlatır, akşam ise okyanusa inerdi.",
  },
  {
    question: "Roma mitolojisinde aşk tanrıçası kimdir?",
    options: ["Juno", "Diana", "Venus", "Minerva"],
    correctIndex: 2,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Venus, Yunan mitolojisindeki Aphrodite'e karşılık gelir. Hem güzellik hem de aşkın tanrıçasıdır.",
  },
  {
    question: "Yunan mitolojisinde savaş tanrısı kimdir?",
    options: ["Hermes", "Ares", "Hephaestus", "Dionysus"],
    correctIndex: 1,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Ares, savaşın ve vahşetin tanrısıydı. Roma mitolojisindeki karşılığı Mars'tır.",
  },
  {
    question: "Yunan mitolojisinde bilgelik ve savaş stratejisinin tanrıçası kimdir?",
    options: ["Hera", "Demeter", "Artemis", "Athena"],
    correctIndex: 3,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Atina şehri Athena'nın adını taşır. Ona adanan Parthenon tapınağı hâlâ ayaktadır.",
  },
  {
    question: "Mitolojide 'Olimpos'un habercisi' olarak bilinen tanrı kimdir?",
    options: ["Apollo", "Hermes", "Dionysus", "Hephaestus"],
    correctIndex: 1,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Hermes, tanrıların habercisi ve tüccarların, hırsızların, yolcuların tanrısıydı. Kanatlı sandaletleriyle ünlüdür.",
  },
  {
    question: "Türk mitolojisinde gökyüzü tanrısı kimdir?",
    options: ["Tengri", "Erlik", "Ülgen", "Umay"],
    correctIndex: 0,
    difficulty: "easy",
    category: "mitoloji",
    fact: "Tengri, Türk ve Moğol mitolojisinde en yüce varlık ve gökyüzünün tanrısıdır. 'Tanrı' kelimesi Tengri'den türemiştir.",
  },

  // ─── MEDIUM ──────────────────────────────────────────────────────────────────

  {
    question: "Medusa'nın bakışının insanları taşa çevirdiği mitolojik hikâyede onu öldüren kahraman kimdir?",
    options: ["Herkül", "Theseus", "Perseus", "Bellerophon"],
    correctIndex: 2,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Perseus, Medusa'yı kalkanının yansımasını kullanarak öldürdü. Kesik başını sonradan bir silah olarak kullandı.",
  },
  {
    question: "Mitolojide Minotaur'u öldüren Atinalı kahraman kimdir?",
    options: ["Odysseus", "Akhilleus", "Theseus", "Iason"],
    correctIndex: 2,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Theseus, Girit'teki labirentten Ariadne'nin yardımıyla çıkarak Minotaur'u öldürdü.",
  },
  {
    question: "Prometheus insanlara neyi çalarak verdi?",
    options: ["Ölümsüzlük iksiri", "Ateş", "Demir işleme sanatı", "Yazı"],
    correctIndex: 1,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Prometheus, ateşi tanrılardan çalıp insanlara verdiği için Zeus tarafından bir kayaya zincirlenip her gün kartalın ciğerini yemesine mahkûm edildi.",
  },
  {
    question: "Altın postu aramak için Argonautları toplayan mitolojik kahraman kimdir?",
    options: ["Odysseus", "Iason", "Herakles", "Orpheus"],
    correctIndex: 1,
    difficulty: "medium",
    category: "mitoloji",
    fact: "İason (Jason), Argo gemisiyle altın postu aramaya çıktı. Bu yolculuğa katılanlara Argonautlar denir.",
  },
  {
    question: "Oğluna uçacak kanat yapan ve 'güneşe yaklaşma' diye uyaran mitolojik usta kimdir?",
    options: ["Daedalus", "Hephaestus", "Pygmalion", "Archimedes"],
    correctIndex: 0,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Daedalus, Kral Minos'un labirentini inşa eden ünlü mucitti. Oğlu Ikarus, uyarıya rağmen güneşe yaklaşınca kanatları eridi ve denize düştü.",
  },
  {
    question: "Yunan mitolojisinde kader tanrıçalarına ne ad verilir?",
    options: ["Moira'lar", "Graiai'lar", "Musa'lar", "Erini'ler"],
    correctIndex: 0,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Üç Moira (Kloto, Lakhesis, Atropos) her insanın kaderini bir ipliği eğirerek, ölçerek ve keserek belirlerdi.",
  },
  {
    question: "Ölüp dirilen bitkileri temsil eden, Hades tarafından kaçırılan tanrıça kimdir?",
    options: ["Artemis", "Hera", "Persephone", "Eos"],
    correctIndex: 2,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Persephone, yılın bir bölümünü yeraltında Hades'le, diğer bölümünü yeryüzünde annesi Demeter'le geçirir. Bu mitoloji mevsimleri açıklar.",
  },
  {
    question: "Truva'ya hediye olarak bırakılan tahta atı Yunanlılara önerdiği söylenen kahraman kimdir?",
    options: ["Akhilleus", "Menelaos", "Odysseus", "Agamemnon"],
    correctIndex: 2,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Odysseus (Ulysses), kurnazlığıyla ünlüydü. Tahta at stratejisi on yıllık Truva kuşatmasını sona erdirdi.",
  },
  {
    question: "Kuzey (Nordik) mitolojisinde tek gözlü bilgelik tanrısı kimdir?",
    options: ["Thor", "Odin", "Loki", "Freyr"],
    correctIndex: 1,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Odin, bilgelik için bir gözünü feda etti. Rünleri de öğrenmek için kendini dokuz gün ağaca astı.",
  },
  {
    question: "Türk mitolojisinde kötülüklerin ve yeraltının hâkimi kimdir?",
    options: ["Erlik", "Tengri", "Ülgen", "Albastı"],
    correctIndex: 0,
    difficulty: "medium",
    category: "mitoloji",
    fact: "Erlik Han, Türk mitolojisinde yeraltı dünyasının hâkimi ve kötülüklerin kaynağıdır. Tengri ile sürekli mücadele içindedir.",
  },

  // ─── MEDIUM_HARD ─────────────────────────────────────────────────────────────

  {
    question: "Labirentte yaşayan Minotaur'un annesi hangi kraliçedir?",
    options: ["Medea", "Pasiphae", "Ariadne", "Circe"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Pasiphae, Girit Kralı Minos'un karısıydı. Poseidon'un lanetinden kaynaklanan tuhaf bir tutku sonucu Minotaur dünyaya geldi.",
  },
  {
    question: "Sonsuz susuzluk ve açlık içinde ceza çeken, meyvelere uzanınca kaçan mitolojik kral kimdir?",
    options: ["Sisifos", "Tantalos", "İxion", "Tityos"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Tantalos, tanrıları sınamak için oğlunu kurban ettiğinden Tartaros'ta sonsuza kadar ulaşamayacağı yiyecek ve içeceklerle cezalandırıldı.",
  },
  {
    question: "Orpheus, Eurydice'yi Yeraltı'ndan çıkarmak için müziğiyle hangi çifti ikna etti?",
    options: ["Kronos ve Rhea", "Zeus ve Hera", "Hades ve Persephone", "Ares ve Aphrodite"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Orpheus'un müziği o kadar büyüleyiciydi ki Hades ve Persephone bile ağladı. Ancak Orpheus geri dönerken ardına baktığı için Eurydice tekrar karanlığa döndü.",
  },
  {
    question: "Kendi yaptığı heykele âşık olan mitolojik heykeltraş kimdir?",
    options: ["Daedalus", "Pygmalion", "Hephaestus", "Phidias"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Pygmalion, fildişinden yaptığı kadın heykelini o kadar çok sevdi ki Aphrodite'ye dua etti ve tanrıça heykeli canlandırdı.",
  },
  {
    question: "Nordik mitolojisinde 'Ragnarök' ne anlama gelir?",
    options: ["Tanrıların zaferi", "Dünya ağacının büyümesi", "Tanrıların alacakaranlığı/sonu", "Odin'in dönüşü"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Ragnarök, Nordik mitolojisinde tanrıların ve dünyanın sonunu anlatan kaçınılmaz bir savaştır. Odin, Thor ve diğer tanrıların çoğu bu savaşta ölür.",
  },
  {
    question: "Mısır mitolojisinde ölülerin kalbini tüy ile tartan tanrı kimdir?",
    options: ["Ra", "Osiris", "Anubis", "Thoth"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Anubis, ölülerin ruhlarını yeraltına eşlik eden çakal başlı tanrıdır. Kalp tartma töreninde Maat'ın tüyüyle ölünün kalbini tartar.",
  },
  {
    question: "Yunan mitolojisinde tanrıların içtiği ölümsüzlük içeceği ne adla bilinir?",
    options: ["Ambrosia", "Nektar", "Lethe suyu", "Elixir"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Nektar tanrıların içtiği, ambrosia ise yediği ölümsüzlük gıdasıydı. İnsanların bunları yemesi yasaktu.",
  },
  {
    question: "Truva Savaşı'nı başlatan 'en güzel tanrıça' tartışmasında elma kime verildi?",
    options: ["Hera", "Athena", "Aphrodite", "Artemis"],
    correctIndex: 2,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Paris, altın elmayı 'en güzel tanrıçaya' verecekti. Aphrodite, ona dünyanın en güzel kadınını (Helena) vermeyi vaat edince Paris elmayı ona verdi.",
  },
  {
    question: "Mısır mitolojisinde güneş tanrısının adı nedir?",
    options: ["Osiris", "Ra", "Horus", "Seth"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Ra (veya Re), Mısır'ın en önemli tanrısıydı. Her gün güneş gemisiyle gökyüzünü geçer, geceleri yeraltını kat ederdi.",
  },
  {
    question: "Türk-Altay mitolojisinde dünya ağacının adı nedir?",
    options: ["Yggdrasil", "Bayterek", "Zerdüşt", "Hayat ağacı"],
    correctIndex: 1,
    difficulty: "medium_hard",
    category: "mitoloji",
    fact: "Bayterek (veya Hayat Ağacı), Türk ve Altay mitolojisinde dünyayı tutan, gök ile yeri birleştiren kutsal ağaçtır. Kazakistan'ın başkenti Astana'daki kulede sembolize edilir.",
  },

  // ─── HARD ─────────────────────────────────────────────────────────────────────

  {
    question: "Yunan mitolojisinde Herakles'in 12 görevi arasında temizlediği ahır hangi krala aittir?",
    options: ["Kral Augeas", "Kral Eurystheus", "Kral Minos", "Kral Admetos"],
    correctIndex: 0,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Augeas'ın ahırı 30 yıldır temizlenmemişti ve binlerce sığır barındırıyordu. Herakles iki nehri yatağından saptırarak ahırı bir günde temizledi.",
  },
  {
    question: "Hesiod'un 'Theogonia' eserine göre kaos'tan ilk doğan varlıklar nelerdir?",
    options: ["Zeus ve Hera", "Gaia ve Tartaros", "Kronos ve Rhea", "Okeanos ve Tethys"],
    correctIndex: 1,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Hesiod'a göre ilk önce Kaos vardı, ardından Gaia (toprak), Tartaros (yeraltı) ve Eros (aşk) ortaya çıktı.",
  },
  {
    question: "Sisifos'un cezası neydi ve neden bu cezaya çarptırıldı?",
    options: [
      "Kaya yuvarlama — tanrıları sınadığı için",
      "Su taşıma — karısını öldürdüğü için",
      "Ateş söndürme — tanrılardan ateşi çaldığı için",
      "Ağır yük taşıma — Olympos'a girdiği için",
    ],
    correctIndex: 0,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Sisifos, Ölüm Tanrısı Thanatos'u zincirlemiş, ölümü iki kez atlatmıştı. Cezası: sonsuza kadar bir kayayı tepeye yuvarlayıp tekrar düşmesini izlemek.",
  },
  {
    question: "Nordik mitolojisinde Loki'nin çocuğu olan dev yılan Jörmungandr hakkında doğru olan hangisidir?",
    options: [
      "Ragnarök'te Thor'u öldürür",
      "Odin'i yutar",
      "Yggdrasil'i kemiren yılandır",
      "Dünyayı kucaklayan balıktır",
    ],
    correctIndex: 0,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Ragnarök'te Jörmungandr (Midgard yılanı) Thor ile savaşır. Thor yılanı öldürür ama yılanın zehirinden aldığı dokuz adım sonra Thor da ölür.",
  },
  {
    question: "Mısır mitolojisinde Osiris'i parçalara bölen ve tabutuna koyarak nehre atan kardeşi kimdir?",
    options: ["Ra", "Thoth", "Seth", "Anubis"],
    correctIndex: 2,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Seth, kıskançlıktan ağabeyi Osiris'i öldürdü. Osiris'in eşi İsis, parçaları toplayıp Osiris'i geçici olarak diriltip ondan Horus'u dünyaya getirdi.",
  },
  {
    question: "Yunan mitolojisinde 'Gerçek güzellik saklanmalı' temasını işleyen Eros ve Psyche mitinde Psyche'ye verilen imkânsız görevler kim tarafından verilir?",
    options: ["Zeus", "Hera", "Aphrodite", "Athena"],
    correctIndex: 2,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Aphrodite, oğlu Eros'un kendisinden aşağı gördüğü bir ölümlüye âşık olmasına kızdı ve Psyche'ye imkânsız görevler verdi. Ancak Psyche hepsini başardı ve ölümsüzlüğe kavuştu.",
  },
  {
    question: "Japonya mitolojisine göre İzanagi ve İzanami kim sayılır?",
    options: [
      "Güneş ve Ay tanrıları",
      "Japonya adalarını yaratan yaratıcı çift",
      "Ölüm ve doğum tanrıçaları",
      "İlk Japon imparatorları",
    ],
    correctIndex: 1,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Japon yaratılış mitinde İzanagi ve İzanami, gökyüzünden bir mızrağı okyanusa batırarak ilk adayı ve ardından Japonya adalarını yarattı.",
  },
  {
    question: "Mezopotamya mitolojisinde Sümer dilinde yazılmış en eski destanın kahramanı kimdir?",
    options: ["Enkidu", "Gilgameş", "Hammurabi", "Marduk"],
    correctIndex: 1,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Gılgameş Destanı, MÖ 2100 civarında yazıya geçirilmiş, bilinen en eski yazılı destanlardan biridir. Ölümsüzlük arayışındaki Uruk Kralı Gılgameş'i anlatır.",
  },
  {
    question: "Hindu mitolojisinde Brahma, Vishnu ve Shiva'dan oluşan üçlüye ne ad verilir?",
    options: ["Dharma", "Trimurti", "Karma", "Moksha"],
    correctIndex: 1,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Trimurti'de Brahma yaratıcı, Vishnu koruyucu ve Shiva yıkıcı-dönüştürücü güçleri temsil eder.",
  },
  {
    question: "Türk mitolojisinde 'Ergenekon' destanında Türklerin içinde sıkışıp kaldıkları yeri eritmeleri nasıl anlatılır?",
    options: [
      "Üç gün üç gece dua ederek",
      "Demirci ustasına dağı dövdürerek",
      "Kurt önderliğinde tünel kazar",
      "Demir dağı ateşe verip eriterek",
    ],
    correctIndex: 3,
    difficulty: "hard",
    category: "mitoloji",
    fact: "Ergenekon destanında Türkler, düşmanlarından kaçarak bir dağla çevrili vadiye sığındılar. Nesiller sonra bir demirci, dağın demir damarını eritince dışarı çıkabildiler.",
  },

  // ─── VERY_HARD ────────────────────────────────────────────────────────────────

  {
    question: "Hesiod'a göre Titanların babası Kronos, çocuklarını neden yutuyordu?",
    options: [
      "Tanrıların yasasını çiğnedikleri için",
      "Gaia'nın laneti yüzünden",
      "Kendi oğlunun kendisini devirecek kehanetinden korktuğu için",
      "Ölümsüzlük güçlerini almak için",
    ],
    correctIndex: 2,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Uranos'u deviren Kronos, kendi çocuklarından biri tarafından devrilecektir kehanetini duyunca hepsini yuttu. Annesi Rhea, Zeus'u kurtarıp onun yerine taş sardı.",
  },
  {
    question: "Yunan mitolojisinde 'Ekhidna' nasıl tanımlanır?",
    options: [
      "Savaşta ölen savaşçıların ruhu",
      "Yarı kadın yarı yılan canavar, birçok canavarın anası",
      "Yeraltı nehrinin tanrıçası",
      "Kışın cisimleşmiş hali",
    ],
    correctIndex: 1,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Ekhidna, Hydra, Kerberos, Sfenks, Kimera gibi pek çok efsanevi canavarın anasıdır. Bu yüzden 'canavarların anası' olarak da anılır.",
  },
  {
    question: "Hint mitolojisinde Mahabharata destanında Kurukshetra Savaşı öncesinde Arjuna'ya savaşması için öğüt veren kimdir?",
    options: ["Brahma", "Indra", "Krishna", "Rama"],
    correctIndex: 2,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Bhagavad Gita, Mahabharata'nın bir bölümüdür. Krishna, arabasını sürerken Arjuna'ya görev, erdem ve ruh hakkında öğütler verir.",
  },
  {
    question: "Babil yaratılış destanı Enuma Eliş'te dünyayı yaratmak için hangi tanrı Tiamat'ı öldürür?",
    options: ["Enlil", "Anu", "Marduk", "Ea"],
    correctIndex: 2,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Marduk, tanrıların savaşında ilkel kaos canavarı Tiamat'ı öldürerek onun vücudundan yeri ve göğü yarattı. Bu sayede Babil'in baş tanrısı oldu.",
  },
  {
    question: "Kalevala destanında Finlandiya'nın ulusal kahramanı Väinämöinen hangi mitolojik geleneğe aittir?",
    options: [
      "Nordik-Viking mitolojisi",
      "Fin-Ugrik (Finno-Ugric) mitolojisi",
      "Slav mitolojisi",
      "Baltık mitolojisi",
    ],
    correctIndex: 1,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Kalevala, Elias Lönnrot tarafından derlenen Fin halk şiiri ve mitolojisinden oluşur. Fin-Ugrik geleneğindeki büyücü ozan Väinämöinen'in destanını anlatır.",
  },
  {
    question: "Yunan mitolojisinde 'Nemesis' hangi kavramın tanrıçasıdır?",
    options: [
      "İntikam ve ilahi adalet",
      "Ölüm ve uykuya dalış",
      "Kaderin bağlanması",
      "Denizlerin öfkesi",
    ],
    correctIndex: 0,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Nemesis, kibir ve aşırılığa karşı ilahi adaletin kişileştirilmiş halidir. Özellikle kendini çok büyük gören ölümlüleri cezalandırırdı.",
  },
  {
    question: "Aztek mitolojisinde güneşin ve savaşın tanrısı, insan kurbanlarıyla beslenen hangi tanrıdır?",
    options: ["Quetzalcoatl", "Huitzilopochtli", "Tlaloc", "Tezcatlipoca"],
    correctIndex: 1,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Huitzilopochtli, Aztekler için savaş ve güneş tanrısıydı. Güneşin her gün doğabilmesi için insan kurbanları gerektiğine inanılırdı.",
  },
  {
    question: "Yunan mitolojisinde tanrıların yemeği ve ölümsüzlüğün sembolü 'ambrosia' kelimesi hangi kökten gelir?",
    options: ["'Ambrotos' — ölümsüz", "'Ambros' — parlak", "'Ambar' — depo", "'Amphis' — çift taraflı"],
    correctIndex: 0,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "'Ambrosia' kelimesi Yunanca 'ambrotos' (ölümsüz) kökünden gelir; 'a-' olumsuzluk eki, 'brotos' ise ölümlü demektir.",
  },
  {
    question: "Yoruba mitolojisinde (Batı Afrika) yaratıcı tanrı kimdir ve insanlığı nasıl yarattığına inanılır?",
    options: [
      "Anansi — örümcek kılığında ip örerek",
      "Obatala — kil ve palmiye şarabından",
      "Shango — gökgürültüsünden",
      "Yemoja — deniz suyundan",
    ],
    correctIndex: 1,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Yoruba mitolojisinde Obatala, baş tanrı Olodumare'nin izniyle yeryüzüne inerek kilden insan bedenlerini yoğurdu. Olodumare bu bedenlere ruh üfledi.",
  },
  {
    question: "Maorilerin (Yeni Zelanda) yaratılış mitine göre Ranginui ve Papatūānuku kimlerdir?",
    options: [
      "Deniz ve ateş tanrıları",
      "Gök babası ve toprak anası",
      "İlk insan çifti",
      "Ay ve güneşin kişileştirilmiş hali",
    ],
    correctIndex: 1,
    difficulty: "very_hard",
    category: "mitoloji",
    fact: "Maori yaratılış mitinde Ranginui (gök baba) ve Papatūānuku (toprak ana) sıkıca kucaklaşmış halde yaşıyordu. Onları ayıran çocukları ışık ve yaşamın ortaya çıkmasını sağladı.",
  },
];

async function seed() {
  console.log(`▶  ${questions.length} soru yükleniyor...`);
  const col = db.collection("quiz_questions");
  let ok = 0;
  for (const q of questions) {
    await col.add(q);
    ok++;
    process.stdout.write(".");
  }
  console.log(`\n✅ ${ok} soru eklendi.`);
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
