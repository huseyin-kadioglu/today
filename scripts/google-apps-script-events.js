/**
 * bugununtarihi.com.tr - Tarihte Ne Oldu (Olaylar)
 * Google Apps Script - tr.wikipedia.org'dan olay verisi çeker
 *
 * Hedef sheet: events (gid=0)
 * Çıktı formatı: [tarihKodu, yıl, metin]  ← App.jsx ile uyumlu
 *   Tarih kodu yalnızca o tarihin ilk satırında, geri kalanı boş.
 *
 * KULLANIM:
 * 1. Google Sheets → Uzantılar → Apps Komut Dosyası
 * 2. Bu kodu yapıştır, kaydet
 * 3. Tüm yıl: fetchAllEvents() çalıştır
 *    Zaman aşımı olursa aylık: fetchOcakE(), fetchSubatE() ...
 */

const EVENTS_SHEET_GID = 0; // events sekmesinin gid'si

const MONTHS_E = [
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

// ─── TEK SEFERDE TÜM YIL ──────────────────────────────────────────────────────
function fetchAllEvents() {
  const sheet = getEventsSheet_();
  sheet.clearContents();
  for (const month of MONTHS_E) {
    fetchEventsMonth_(sheet, month);
  }
  Logger.log("✅ Tüm olaylar tamamlandı.");
}

// ─── AYLIK FONKSİYONLAR ───────────────────────────────────────────────────────
function fetchOcakE()   { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[0]);  }
function fetchSubatE()  { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[1]);  }
function fetchMartE()   { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[2]);  }
function fetchNisanE()  { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[3]);  }
function fetchMayisE()  { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[4]);  }
function fetchHazıranE(){ fetchEventsMonth_(getEventsSheet_(), MONTHS_E[5]);  }
function fetchTemmuzE() { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[6]);  }
function fetchAgustosE(){ fetchEventsMonth_(getEventsSheet_(), MONTHS_E[7]);  }
function fetchEylulE()  { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[8]);  }
function fetchEkimE()   { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[9]);  }
function fetchKasimE()  { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[10]); }
function fetchAralikE() { fetchEventsMonth_(getEventsSheet_(), MONTHS_E[11]); }

// ─── YARDIMCI: SAYFAYI GİD'E GÖRE BUL ────────────────────────────────────────
function getEventsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().find(s => s.getSheetId() === EVENTS_SHEET_GID);
  if (!sheet) throw new Error("Sheet bulunamadı! gid=" + EVENTS_SHEET_GID);
  return sheet;
}

// ─── TEK AY VERİSİ ÇEK VE SAYFAYA EKLE ──────────────────────────────────────
function fetchEventsMonth_(sheet, month) {
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
      const events = parseOlaylar_(wt);

      // Tarih kodu yalnızca o tarihin ilk satırında (App.jsx parsing uyumu)
      events.forEach(({ year, text }, i) =>
        rows.push([i === 0 ? dateNum : "", year, text])
      );

      Logger.log(d + " " + month.name + " → " + events.length + " olay");

    } catch (e) {
      Logger.log("HATA: " + d + " " + month.name + " → " + e);
    }

    Utilities.sleep(250); // Wikipedia rate limit
  }

  // Mevcut verinin altına ekle
  if (rows.length > 0) {
    const lastRow = Math.max(sheet.getLastRow(), 0);
    sheet.getRange(lastRow + 1, 1, rows.length, 3).setValues(rows);
    Logger.log("✅ " + month.name + ": " + rows.length + " satır eklendi.");
  }
}

// ─── WİKİPEDİ "OLAYLAR" BÖLÜM PARSER ─────────────────────────────────────────
function parseOlaylar_(wikitext) {
  const results = [];

  const regex = /==\s*Olaylar\s*==\s*([\s\S]*?)(?:==|$)/;
  const match = wikitext.match(regex);
  if (!match) return results;

  const lines = match[1]
    .split("\n")
    .filter(l => l.trim().startsWith("*"));

  for (const line of lines) {
    // Milattan Önce: [[MÖ 45]] veya [[M.Ö. 45]] → -45
    const bcMatch = line.match(/\[\[M[ÖO]\.?\s*(\d{1,4})\]\]/i);
    // Normal yıl: [[45]] veya [[1453 yılı]]
    const adMatch = line.match(/\[\[(\d{1,4})(?:\s+y[ıi]l[ıi])?\]\]/);

    let year;
    if (bcMatch) {
      year = -parseInt(bcMatch[1]);
    } else if (adMatch) {
      year = parseInt(adMatch[1]);
      if (isNaN(year) || year < 1 || year > 2100) continue;
    } else {
      continue;
    }

    let text = line
      .replace(/^\*+\s*/, "")                                     // öndeki *
      .replace(/\[\[M[ÖO]\.?\s*\d{1,4}\]\]\s*[-–]\s*/i, "")      // [[MÖ yıl]] -
      .replace(/\[\[\d{1,4}(?:\s+y[ıi]l[ıi])?\]\]\s*[-–]\s*/, "") // [[yıl]] -
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")              // [[link|metin]] → metin
      .replace(/\[\[([^\]]+)\]\]/g, "$1")                         // [[metin]] → metin
      .replace(/'{2,3}([^']+)'{2,3}/g, "$1")                     // kalın/italic
      .replace(/<ref[^>]*\/>|<ref[^>]*>[\s\S]*?<\/ref>/gi, "")   // <ref> etiketleri
      .replace(/<[^>]+>/g, "")                                    // kalan HTML
      .replace(/\{\{[^}]+\}\}/g, "")                              // {{şablonlar}}
      .replace(/\s+/g, " ")
      .trim();

    if (text.length > 3) {
      results.push({ year, text });
    }
  }

  return results;
}
