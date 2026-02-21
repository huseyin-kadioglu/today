/**
 * bugununtarihi.com.tr - Doğumlar & Ölümler
 * Google Apps Script - tr.wikipedia.org'dan veri çeker
 *
 * KULLANIM:
 * 1. Google Sheets → Uzantılar → Apps Komut Dosyası
 * 2. Bu kodu yapıştır, kaydet
 * 3. Tüm yıl için: fetchAll() çalıştır
 *    Zaman aşımı olursa aylık çalıştır: fetchOcak(), fetchSubat() ...
 */

const SHEET_GID = 1080197625; // gid'yi URL'den aldım

const MONTHS = [
  { num: "01", name: "Ocak",    days: 31 },
  { num: "02", name: "Şubat",   days: 29 },
  { num: "03", name: "Mart",    days: 31 },
  { num: "04", name: "Nisan",   days: 30 },
  { num: "05", name: "Mayıs",   days: 31 },
  { num: "06", name: "Haziran", days: 30 },
  { num: "07", name: "Temmuz",  days: 31 },
  { num: "08", name: "Ağustos", days: 31 },
  { num: "09", name: "Eylül",   days: 30 },
  { num: "10", name: "Ekim",    days: 31 },
  { num: "11", name: "Kasım",   days: 30 },
  { num: "12", name: "Aralık",  days: 31 },
];

// ─── TEK SEFERDE TÜM YIL ─────────────────────────────────────────────────────
// Toplam ~5-8 dk sürer. Google zaman aşımına uğrarsa aylık fonksiyonları kullan.
function fetchAll() {
  const sheet = getSheet_();
  sheet.clearContents();
  for (const month of MONTHS) {
    fetchMonth_(sheet, month);
  }
  Logger.log("✅ Tamamlandı.");
}

// ─── AYLIK FONKSİYONLAR (zaman aşımı olursa bunları tek tek çalıştır) ────────
function fetchOcak()   { fetchMonth_(getSheet_(), MONTHS[0]);  }
function fetchSubat()  { fetchMonth_(getSheet_(), MONTHS[1]);  }
function fetchMart()   { fetchMonth_(getSheet_(), MONTHS[2]);  }
function fetchNisan()  { fetchMonth_(getSheet_(), MONTHS[3]);  }
function fetchMayis()  { fetchMonth_(getSheet_(), MONTHS[4]);  }
function fetchHaziran(){ fetchMonth_(getSheet_(), MONTHS[5]);  }
function fetchTemmuz() { fetchMonth_(getSheet_(), MONTHS[6]);  }
function fetchAgustos(){ fetchMonth_(getSheet_(), MONTHS[7]);  }
function fetchEylul()  { fetchMonth_(getSheet_(), MONTHS[8]);  }
function fetchEkim()   { fetchMonth_(getSheet_(), MONTHS[9]);  }
function fetchKasim()  { fetchMonth_(getSheet_(), MONTHS[10]); }
function fetchAralik() { fetchMonth_(getSheet_(), MONTHS[11]); }

// ─── YARDIMCI: SAYFAYI GİD'E GÖRE BUL ────────────────────────────────────────
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().find(s => s.getSheetId() === SHEET_GID);
  if (!sheet) throw new Error("Sheet bulunamadı! gid=" + SHEET_GID);
  return sheet;
}

// ─── TEK AY VERİSİ ÇEK VE SAYFAYA EKLE ─────────────────────────────────────
function fetchMonth_(sheet, month) {
  const rows = [];

  for (let d = 1; d <= month.days; d++) {
    const dayStr  = String(d).padStart(2, "0");
    const dateNum = parseInt(dayStr + month.num); // DDMM → sayı (ör: 2102)
    const pageName = `${d}_${month.name}`;

    try {
      const url =
        "https://tr.wikipedia.org/w/api.php" +
        "?action=parse" +
        "&page=" + encodeURIComponent(pageName) +
        "&format=json" +
        "&prop=wikitext" +
        "&formatversion=2";

      const res  = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      const json = JSON.parse(res.getContentText());

      if (json.error) {
        Logger.log("HATA: " + pageName + " → " + json.error.info);
        continue;
      }

      const wt = json.parse.wikitext;

      parseSection_(wt, "Doğumlar").forEach(({ year, text }) =>
        rows.push([dateNum, year, text, "", "birth"])
      );
      parseSection_(wt, "Ölümler").forEach(({ year, text }) =>
        rows.push([dateNum, year, text, "", "death"])
      );

      Logger.log(d + " " + month.name + " → " +
        parseSection_(wt, "Doğumlar").length + " doğum, " +
        parseSection_(wt, "Ölümler").length + " ölüm");

    } catch (e) {
      Logger.log("HATA: " + d + " " + month.name + " → " + e);
    }

    Utilities.sleep(250); // Wikipedia rate limit
  }

  // Mevcut verinin altına ekle (her ayın üzerine yazmasın)
  if (rows.length > 0) {
    const lastRow = Math.max(sheet.getLastRow(), 0);
    sheet.getRange(lastRow + 1, 1, rows.length, 5).setValues(rows);
    Logger.log("✅ " + month.name + ": " + rows.length + " satır eklendi.");
  }
}

// ─── WİKİPEDİ BÖLÜM PARSER ───────────────────────────────────────────────────
function parseSection_(wikitext, sectionName) {
  const results = [];

  const regex = new RegExp(
    "==\\s*" + sectionName + "\\s*==([\\s\\S]*?)(?:==|$)"
  );
  const match = wikitext.match(regex);
  if (!match) return results;

  const lines = match[1]
    .split("\n")
    .filter(l => l.trim().startsWith("*"));

  for (const line of lines) {
    // Yıl: [[1900]] veya [[1900 yılı]] veya ca. [[1900]]
    const yearMatch = line.match(/\[\[(\d{3,4})(?:\s+y[ıi]l[ıi])?\]\]/);
    if (!yearMatch) continue;

    const year = parseInt(yearMatch[1]);
    if (isNaN(year) || year < 1 || year > 2100) continue;

    let text = line
      .replace(/^\*+\s*/, "")                                    // öndeki *
      .replace(/\[\[\d{3,4}(?:\s+y[ıi]l[ıi])?\]\]\s*[-–]\s*/, "") // [[yıl]] -
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")             // [[link|metin]] → metin
      .replace(/\[\[([^\]]+)\]\]/g, "$1")                        // [[metin]] → metin
      .replace(/'{2,3}([^']+)'{2,3}/g, "$1")                    // kalın/italic
      .replace(/<ref[^>]*\/>|<ref[^>]*>[\s\S]*?<\/ref>/gi, "")  // <ref> etiketleri
      .replace(/<[^>]+>/g, "")                                   // kalan HTML
      .replace(/\{\{[^}]+\}\}/g, "")                             // {{şablonlar}}
      .replace(/\([^)]*\d{3,4}[^)]*\)/g, "")                   // (doğum-ölüm yılları)
      .replace(/\s+/g, " ")
      .trim();

    if (text.length > 3) {
      results.push({ year, text });
    }
  }

  return results;
}
