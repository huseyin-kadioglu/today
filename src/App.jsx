import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BirthsAndDeaths from "./BirthsAndDeaths.jsx";
import TerminalActions from "./TerminalActions.jsx";
import Quiz from "./Quiz.jsx";
import QuizHub from "./QuizHub.jsx";
import CookieBanner from "./CookieBanner.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import ArticlePage, { ArticleList } from "./ArticlePage.jsx";
import { getSpecialDay } from "./specialDates.js";
import { getEvents } from "./firestore.js";

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

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/quiz" element={<QuizHub />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/gizlilik" element={<PrivacyPolicy />} />
        <Route path="/makaleler" element={<ArticleList />} />
        <Route path="/makale/:slug" element={<ArticlePage />} />
        <Route path="/:date/:pageType" element={<BirthsAndDeaths />} />
        <Route path="/:date" element={<MainApp />} />
      </Routes>
    </>
  );
}

function MainApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const pickerRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  /* SEO – TARAYICI BAŞLIĞI */
  useEffect(() => {
    if (!day || !month) return;
    document.title = `${day} ${monthNames[month]} Tarihte Ne Oldu? | Bugünün Tarihi`;
  }, [day, month]);

  /* URL → TARİH */
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (!path) {
      const now = new Date();
      navigate(
        `/${String(now.getDate()).padStart(2, "0")}-${monthSlug[String(now.getMonth() + 1).padStart(2, "0")]}`,
        { replace: true },
      );
      return;
    }
    const [d, m] = path.split("-");
    if (d && monthMap[m]) {
      setDay(d);
      setMonth(monthMap[m]);
    }
  }, [location.pathname, navigate]);

  /* DATA – Firestore'dan sadece o günün verisi */
  useEffect(() => {
    if (!day || !month) return;
    setLoading(true);
    getEvents(`${day}${month}`)
      .then((data) => {
        setEvents(data);
        setLoading(false);
        window.__APP_RENDERED = true;
        document.dispatchEvent(new Event("app-rendered"));
      })
      .catch(() => {
        setLoading(false);
        window.__APP_RENDERED = true;
        document.dispatchEvent(new Event("app-rendered"));
      });
  }, [day, month]);

  const stoic = events.find((e) => e.stoic)?.stoic;

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  /* =========================
   TEXT HELPERS
========================= */

  const getWrappedLines = (ctx, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    words.forEach((w) => {
      const test = line + w + " ";
      if (ctx.measureText(test).width > maxWidth && line !== "") {
        lines.push(line);
        line = w + " ";
      } else {
        line = test;
      }
    });

    lines.push(line);
    return lines;
  };

  /* =========================
   COPY TEXT
========================= */

  const copyText = (e) => {
    const text = `${day} ${monthNames[month]} ${e.year}
${e.text}

bugununtarihi.com.tr/${day}-${monthSlug[month]}`;

    navigator.clipboard.writeText(text);
  };

  /* =========================
   COPY IMAGE
========================= */

  const copyImage = async (e) => {
    const size = 1080;
    const cx   = size / 2;
    const hp   = 108;

    const canvas = document.createElement("canvas");
    const ctx    = canvas.getContext("2d");
    canvas.width  = size;
    canvas.height = size;

    ctx.fillStyle = "#e8e3d8";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#f4f1ea";
    roundRect(ctx, 52, 52, size - 104, size - 104, 28);
    ctx.fill();

    ctx.strokeStyle = "#c8c1b8";
    ctx.lineWidth = 1.5;
    roundRect(ctx, 52, 52, size - 104, size - 104, 28);
    ctx.stroke();

    const yearDisplay = e.year < 0 ? `MÖ ${Math.abs(e.year)}` : String(e.year);
    ctx.fillStyle = "#8b5e34";
    ctx.font = "500 128px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(yearDisplay, cx, 248);

    ctx.fillStyle = "#6f675d";
    ctx.font = "400 30px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${day} ${monthNames[month]}`.toUpperCase(), cx, 310);

    ctx.strokeStyle = "#c8c1b8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(hp, 352);
    ctx.lineTo(size - hp, 352);
    ctx.stroke();

    const len = e.text.length;
    const fs  = len < 70 ? 40 : len < 130 ? 34 : len < 220 ? 29 : 25;
    ctx.fillStyle = "#1f1b16";
    ctx.font = `400 ${fs}px 'IBM Plex Mono', monospace`;
    ctx.textAlign = "center";

    const maxW  = size - hp * 2 - 16;
    const lineH = Math.round(fs * 1.65);
    const lines = getWrappedLines(ctx, e.text, maxW);

    const zoneTop = 372;
    const zoneBot = 920;
    const blockH  = lines.length * lineH;
    const textY   = zoneTop + (zoneBot - zoneTop - blockH) / 2 + fs * 0.8;

    lines.forEach((line, i) =>
      ctx.fillText(line.trim(), cx, textY + i * lineH)
    );

    ctx.strokeStyle = "#c8c1b8";
    ctx.beginPath();
    ctx.moveTo(hp, 932);
    ctx.lineTo(size - hp, 932);
    ctx.stroke();

    ctx.fillStyle = "#8b5e34";
    ctx.font = "700 20px 'IBM Plex Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(">_", hp, 972);

    ctx.fillStyle = "#6f675d";
    ctx.font = "300 18px 'IBM Plex Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText("bugununtarihi.com.tr", size - hp, 972);

    const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  };

  /* =========================
   ROUND RECT
========================= */

  const roundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  /* dışarı tıklanınca kapat */
  useEffect(() => {
    const close = (e) =>
      pickerRef.current &&
      !pickerRef.current.contains(e.target) &&
      setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!day || !month || !monthSlug[month]) return;
    const canonicalUrl = `https://bugununtarihi.com.tr/${day}-${monthSlug[month]}`;
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [day, month]);

  useEffect(() => {
    if (!day || !month) return;
    const title = `${day} ${monthNames[month]} Tarihte Ne Oldu? | Bugünün Tarihi`;
    const desc = `${day} ${monthNames[month]} tarihinde dünyada ve Türkiye'de ne oldu? Tarihte bu gün yaşanan önemli olaylar, doğumlar ve gelişmeler.`;
    document.querySelector("meta[property='og:title']")?.setAttribute("content", title);
    document.querySelector("meta[property='og:description']")?.setAttribute("content", desc);
    document.querySelector("meta[name='twitter:title']")?.setAttribute("content", title);
    document.querySelector("meta[name='twitter:description']")?.setAttribute("content", desc);
  }, [day, month]);

  useEffect(() => {
    if (!day || !month || !events.length) return;
    const year = new Date().getFullYear();
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${day} ${monthNames[month]} Tarihte Ne Oldu? | Bugünün Tarihi`,
      description: `${day} ${monthNames[month]} tarihinde dünyada ve Türkiye'de ne oldu? Tarihte bu gün yaşanan önemli olaylar, doğumlar ve gelişmeler.`,
      keywords: `${day} ${monthNames[month]} tarihte ne oldu, bugün ne oldu, bugünün tarihi, tarihte bu gün`,
      datePublished: `${year}-${month}-${day}`,
      dateModified: `${year}-${month}-${day}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://bugununtarihi.com.tr/${day}-${monthSlug[month]}`,
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
  }, [day, month, events]);

  if (!day || !month) return null;

  const prev = getAdjacentDate(day, month, -1);
  const next = getAdjacentDate(day, month, 1);
  const specialDay = getSpecialDay(day, month);

  return (
    <div className={`screen${specialDay ? ` theme-${specialDay.theme}` : ""}`}>
      <h1 className="visually-hidden">
        {day} {monthNames[month]} Tarihte Ne Oldu?
      </h1>
      <p className="visually-hidden">
        {day} {monthNames[month]} tarihinde dünyada ve Türkiye'de yaşanan önemli
        olaylar, doğumlar ve tarihi gelişmeler listelenmektedir.
      </p>

      <div className="terminal">
        <TerminalActions />

        {/* BAŞLIK PICKER */}
        <div className="title-picker" ref={pickerRef}>
          <Link
            to={`/${prev.day}-${monthSlug[prev.month]}`}
            className="nav-arrow nav-prev"
            title={`${prev.day} ${monthNames[prev.month]} Tarihte Ne Oldu?`}
          >
            <span className="nav-label">← {prev.day} {monthNames[prev.month]}</span>
            <span className="nav-icon">‹</span>
          </Link>

          <button onClick={() => setOpen(!open)}>
            {day} {monthNames[month]}
          </button>

          <Link
            to={`/${next.day}-${monthSlug[next.month]}`}
            className="nav-arrow nav-next"
            title={`${next.day} ${monthNames[next.month]} Tarihte Ne Oldu?`}
          >
            <span className="nav-label">{next.day} {monthNames[next.month]} →</span>
            <span className="nav-icon">›</span>
          </Link>

          {open && (
            <div className="picker-panel">
              <select
                value={month}
                onChange={(e) =>
                  navigate(`/${day}-${monthSlug[e.target.value]}`)
                }
              >
                {Object.entries(monthNames).map(([v, n]) => (
                  <option key={v} value={v}>
                    {n}
                  </option>
                ))}
              </select>

              <select
                value={day}
                onChange={(e) =>
                  navigate(`/${e.target.value}-${monthSlug[month]}`)
                }
              >
                {Array.from({ length: 31 }, (_, i) => {
                  const d = String(i + 1).padStart(2, "0");
                  return (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>

        <div className="page-tabs">
          <span className="tab tab-active">Tarihte Ne Oldu</span>
          <span className="tab-dot">·</span>
          <span className="tab" onClick={() => navigate(`/${day}-${monthSlug[month]}/dogumlar-ve-olumler`)}>
            Doğumlar &amp; Ölümler
          </span>
          <span className="tab-dot">·</span>
          <Link to="/quiz" className="tab">Günlük Quiz</Link>
          <span className="tab-dot">·</span>
          <Link to="/makaleler" className="tab">Makaleler</Link>
        </div>

        {stoic && <p className="stoic">{stoic}</p>}

        {specialDay && (
          <div className="special-day-banner">
            <span className="special-day-title">{specialDay.title}</span>
            <span className="special-day-sub">{specialDay.subtitle}</span>
            {specialDay.articleSlug && (
              <Link
                to={`/makale/${specialDay.articleSlug}`}
                className="special-day-link"
              >
                Makaleyi oku →
              </Link>
            )}
          </div>
        )}

        {loading ? (
          <p className="no-data">Yükleniyor…</p>
        ) : (
          <ul className="events">
            {events.map((e, i) => (
              <li
                key={i}
                className={openMenu === i ? "menu-open" : ""}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="year">{e.year < 0 ? `MÖ ${Math.abs(e.year)}` : e.year}</span>
                <span className="event-text">
                  {e.text}
                </span>

                <div className="event-actions">
                  <button
                    className={`dots ${openMenu === i ? "active" : ""}`}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setOpenMenu(openMenu === i ? null : i);
                    }}
                  >
                    …
                  </button>

                  {openMenu === i && (
                    <div className="action-menu">
                      <button onClick={() => copyText(e)}>Metni kopyala</button>
                      <button
                        onClick={() => {
                          copyImage(e);
                          setOpenMenu(null);
                        }}
                      >
                        Görseli kopyala
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
