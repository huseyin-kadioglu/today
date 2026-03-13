/**
 * Özel günler tanım dosyası.
 * key formatı: "DDMM" — örn. 10 Kasım → "1011"
 *
 * theme: CSS class suffix — .theme-<theme> App.css'de tanımlı
 * articleSlug: /makale/:slug rotasına karşılık gelir
 */
export const SPECIAL_DATES = {
  "1011": {
    theme: "memorial",
    title: "10 Kasım",
    subtitle: "Atatürk'ü saygı ve minnetle anıyoruz.",
    articleSlug: "10-kasim",
  },
  "2910": {
    theme: "celebration",
    title: "29 Ekim Cumhuriyet Bayramı",
    subtitle: "Türkiye Cumhuriyeti'nin 101. yılı kutlu olsun.",
    articleSlug: "29-ekim",
  },
  "1903": {
    theme: "celebration",
    title: "18 Mart Çanakkale Zaferi",
    subtitle: "Çanakkale geçilmez.",
    articleSlug: null,
  },
  "1905": {
    theme: "celebration",
    title: "19 Mayıs Atatürk'ü Anma",
    subtitle: "Gençlik ve Spor Bayramı kutlu olsun.",
    articleSlug: null,
  },
  "3008": {
    theme: "celebration",
    title: "30 Ağustos Zafer Bayramı",
    subtitle: "Büyük Taarruz'un 103. yılı kutlu olsun.",
    articleSlug: null,
  },
};

/**
 * Verilen gün ve ay için özel gün tanımını döndürür.
 * @param {string} day  — "10" gibi
 * @param {string} month — "11" gibi
 * @returns {object|null}
 */
export function getSpecialDay(day, month) {
  const key = `${day.replace(/^0/, "")}${month}`;
  return SPECIAL_DATES[key] ?? null;
}
