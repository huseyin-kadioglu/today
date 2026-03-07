import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./App.css";
import TerminalActions from "./TerminalActions.jsx";
import { getBirthsDeaths } from "./firestore.js";

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

export default function BirthsAndDeaths() {
  const location = useLocation();
  const navigate = useNavigate();

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const [datePart] = parts;
      const [d, m] = datePart.split("-");
      if (d && monthMap[m]) {
        setDay(d);
        setMonth(monthMap[m]);
      }
    }
  }, [location.pathname]);

  /* DATA – Firestore'dan sadece o günün verisi */
  useEffect(() => {
    if (!day || !month) return;
    setLoading(true);
    getBirthsDeaths(`${day}${month}`)
      .then((data) => {
        setAllEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [day, month]);

  const births = useMemo(
    () => allEvents.filter((e) => e.type === "birth"),
    [allEvents]
  );

  const deaths = useMemo(
    () => allEvents.filter((e) => e.type === "death"),
    [allEvents]
  );

  /* SEO – BAŞLIK */
  useEffect(() => {
    if (!day || !month) return;
    document.title = `${day} ${monthNames[month]} Doğumlar ve Ölümler | Bugünün Tarihi`;
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
    const title = `${day} ${monthNames[month]} Doğumlar ve Ölümler | Bugünün Tarihi`;
    const desc = `${day} ${monthNames[month]} tarihinde dünyaya gelen ve hayatını kaybeden önemli kişiler. Tarihte bu gün doğanlar ve ölenler.`;
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
      headline: `${day} ${monthNames[month]} Doğumlar ve Ölümler | Bugünün Tarihi`,
      description: `${day} ${monthNames[month]} tarihinde dünyaya gelen ve hayatını kaybeden önemli kişiler. Tarihte bu gün doğanlar ve ölenler.`,
      keywords: `${day} ${monthNames[month]} doğumlar ölümler, bugün ne oldu, bugünün tarihi, tarihte bu gün`,
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
          <span className="tab-dot">·</span>
          <Link to="/quiz" className="tab">Günlük Quiz</Link>
        </div>

        {/* İKİ KOLONLU TASARIM */}
        {loading ? (
          <p className="no-data">Yükleniyor…</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}
