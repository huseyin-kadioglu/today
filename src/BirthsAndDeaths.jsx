import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./App.css";
import TerminalActions from "./TerminalActions.jsx";

const SHEET_ID = "1yHFAy4yCOkEfDpJS0l8HV1jwI8cwJz3A4On6yJvblgQ";
const SHEET_NAME = "dogumlar-olumler"; // Google Sheets'te bu isimde yeni sekme oluştur

const monthMap = {
  ocak: "01",
  subat: "02",
  mart: "03",
  nisan: "04",
  mayis: "05",
  haziran: "06",
  temmuz: "07",
  agustos: "08",
  eylul: "09",
  ekim: "10",
  kasim: "11",
  aralik: "12",
};

const monthNames = {
  "01": "Ocak",
  "02": "Şubat",
  "03": "Mart",
  "04": "Nisan",
  "05": "Mayıs",
  "06": "Haziran",
  "07": "Temmuz",
  "08": "Ağustos",
  "09": "Eylül",
  10: "Ekim",
  11: "Kasım",
  12: "Aralık",
};

const monthSlug = {
  "01": "ocak",
  "02": "subat",
  "03": "mart",
  "04": "nisan",
  "05": "mayis",
  "06": "haziran",
  "07": "temmuz",
  "08": "agustos",
  "09": "eylul",
  10: "ekim",
  11: "kasim",
  12: "aralik",
};

const MONTH_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getAdjacentDate(day, month, offset) {
  let d = parseInt(day);
  let m = parseInt(month) - 1;
  d += offset;
  if (d < 1) {
    m = (m - 1 + 12) % 12;
    d = MONTH_DAYS[m];
  } else if (d > MONTH_DAYS[m]) {
    m = (m + 1) % 12;
    d = 1;
  }
  return {
    day: String(d).padStart(2, "0"),
    month: String(m + 1).padStart(2, "0"),
  };
}

let _birthsDeathsCache = null;

export default function BirthsAndDeaths() {
  const location = useLocation();
  const navigate = useNavigate();

  const [allEvents, setAllEvents] = useState([]);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "tr");

  const toggleLang = () => {
    const next = lang === "tr" ? "en" : "tr";
    localStorage.setItem("lang", next);
    setLang(next);
  };

  /* URL → TARİH */
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (!path) return;
    
    const parts = path.split("/");
    if (parts.length >= 2) {
      const [datePart, pageType] = parts;
      const [d, m] = datePart.split("-");
      if (d && monthMap[m]) {
        setDay(d);
        setMonth(monthMap[m]);
      }
    }
  }, [location.pathname]);

  /* DATA */
  useEffect(() => {
    if (_birthsDeathsCache) {
      setAllEvents(_birthsDeathsCache);
      return;
    }
    fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`,
    )
      .then((r) => r.text())
      .then((t) => {
        const json = JSON.parse(t.substring(47).slice(0, -2));
        let current = null;
        const parsed = [];
        json.table.rows.forEach((r) => {
          const d = r.c[0]?.v;
          if (d) current = String(d).padStart(4, "0");
          if (current && r.c[1]?.v && r.c[2]?.v) {
            parsed.push({
              date: current,
              year: r.c[1].v,
              text: r.c[2].v,
              type: r.c[4]?.v || "event",
              // EN metni Sheets'te 6. kolon (index 5) olarak eklenmeli
              text_en: r.c[5]?.v || null,
            });
          }
        });
        _birthsDeathsCache = parsed;
        setAllEvents(parsed);
      });
  }, []);

  const events = useMemo(
    () => allEvents.filter((e) => e.date === `${day}${month}`),
    [allEvents, day, month],
  );

  const births = useMemo(
    () => events.filter((e) => e.type === "birth"),
    [events]
  );

  const deaths = useMemo(
    () => events.filter((e) => e.type === "death"),
    [events]
  );

  /* SEO – BAŞLIK */
  useEffect(() => {
    if (!day || !month) return;
    document.title = `${day} ${monthNames[month]} Doğumlar ve Ölümler`;
  }, [day, month]);

  /* CANONICAL */
  useEffect(() => {
    if (!day || !month || !monthSlug[month]) return;
    const canonicalUrl = `https://bugununtarihi.com.tr/${day}-${monthSlug[month]}/dogumlar-ve-olumler`;
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [day, month]);

  /* OG / TWITTER */
  useEffect(() => {
    if (!day || !month) return;
    const title = `${day} ${monthNames[month]} Doğumlar ve Ölümler`;
    const desc = `${day} ${monthNames[month]} tarihinde dünyaya gelen önemli kişiler ve hayatını kaybedenler.`;
    document.querySelector("meta[property='og:title']")?.setAttribute("content", title);
    document.querySelector("meta[property='og:description']")?.setAttribute("content", desc);
    document.querySelector("meta[name='twitter:title']")?.setAttribute("content", title);
    document.querySelector("meta[name='twitter:description']")?.setAttribute("content", desc);
  }, [day, month]);

  /* SCHEMA */
  useEffect(() => {
    if (!day || !month) return;
    const year = new Date().getFullYear();
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${day} ${monthNames[month]} Doğumlar ve Ölümler`,
      description: `${day} ${monthNames[month]} tarihinde dünyaya gelen önemli kişiler ve hayatını kaybedenler.`,
      datePublished: `${year}-${month}-${day}`,
      dateModified: `${year}-${month}-${day}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://bugununtarihi.com.tr/${day}-${monthSlug[month]}/dogumlar-ve-olumler`,
      },
      author: {
        "@type": "Organization",
        name: "Bugün Tarihte",
        url: "https://bugununtarihi.com.tr",
      },
    };
    let el = document.getElementById("schema-article");
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "schema-article";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
  }, [day, month]);

  if (!day || !month) return null;

  const prev = getAdjacentDate(day, month, -1);
  const next = getAdjacentDate(day, month, 1);

  return (
    <div className="screen">
      <h1 className="visually-hidden">
        {day} {monthNames[month]} Doğumlar ve Ölümler
      </h1>
      <p className="visually-hidden">
        {day} {monthNames[month]} tarihinde dünyaya gelen önemli kişiler ve hayatını kaybedenler.
      </p>

      <div className="terminal">
        <TerminalActions lang={lang} onToggleLang={toggleLang} />

        {/* BAŞLIK */}
        <div className="title-picker">
          <Link
            to={`/${prev.day}-${monthSlug[prev.month]}/dogumlar-ve-olumler`}
            className="nav-arrow nav-prev"
            title={`${prev.day} ${monthNames[prev.month]} Doğumlar ve Ölümler`}
          >
            <span className="nav-label">← {prev.day} {monthNames[prev.month]}</span>
            <span className="nav-icon">‹</span>
          </Link>

          <button onClick={() => navigate(`/${day}-${monthSlug[month]}`)}>
            {day} {monthNames[month]}
          </button>

          <Link
            to={`/${next.day}-${monthSlug[next.month]}/dogumlar-ve-olumler`}
            className="nav-arrow nav-next"
            title={`${next.day} ${monthNames[next.month]} Doğumlar ve Ölümler`}
          >
            <span className="nav-label">{next.day} {monthNames[next.month]} →</span>
            <span className="nav-icon">›</span>
          </Link>
        </div>

        <div className="page-tabs">
          <span className="tab" onClick={() => navigate(`/${day}-${monthSlug[month]}`)}>
            Tarihte Ne Oldu
          </span>
          <span className="tab-dot">·</span>
          <span className="tab tab-active">Doğumlar &amp; Ölümler</span>
        </div>

        {/* İKİ KOLONLU TASARIM */}
        <div className="two-column-layout">
          {/* DOĞUMLAR */}
          <div className="column">
            <div className="column-header">
              <h2>🌱 Doğumlar</h2>
            </div>
            <div className="column-content">
              {births.length > 0 ? (
                births.map((e, i) => (
                  <div key={i} className="event-item birth-item">
                    <span className="year">{e.year}</span>
                    <span className="event-text">
                      {lang === "en" && e.text_en ? e.text_en : e.text}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-data">Bu tarihte doğum kaydı bulunamadı.</p>
              )}
            </div>
          </div>

          {/* ÖLÜMLER */}
          <div className="column">
            <div className="column-header">
              <h2>🕊️ Ölümler</h2>
            </div>
            <div className="column-content">
              {deaths.length > 0 ? (
                deaths.map((e, i) => (
                  <div key={i} className="event-item death-item">
                    <span className="year">{e.year}</span>
                    <span className="event-text">
                      {lang === "en" && e.text_en ? e.text_en : e.text}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-data">Bu tarihte ölüm kaydı bulunamadı.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
