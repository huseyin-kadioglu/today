import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const SHEET_ID = "1yHFAy4yCOkEfDpJS0l8HV1jwI8cwJz3A4On6yJvblgQ";
const SHEET_NAME = "Sheet1";

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

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const pickerRef = useRef(null);

  const [allEvents, setAllEvents] = useState([]);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [open, setOpen] = useState(false);

  /* SEO – TARAYICI BAŞLIĞI */
  useEffect(() => {
    if (!day || !month) return;

    document.title = `${day} ${monthNames[month]} Tarihte Ne Oldu?`;
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

  /* DATA */
  useEffect(() => {
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
              stoic: r.c[3]?.v || null,
            });
          }
        });
        setAllEvents(parsed);
      });
  }, []);

  const events = useMemo(
    () => allEvents.filter((e) => e.date === `${day}${month}`),
    [allEvents, day, month],
  );

  const stoic = events.find((e) => e.stoic)?.stoic;

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

    const title = `${day} ${monthNames[month]} Tarihte Ne Oldu?`;
    const desc = `${day} ${monthNames[month]} tarihinde dünyada ve Türkiye’de yaşanan önemli olaylar.`;

    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute("content", title);
    document
      .querySelector("meta[property='og:description']")
      ?.setAttribute("content", desc);
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute("content", title);
    document
      .querySelector("meta[name='twitter:description']")
      ?.setAttribute("content", desc);
  }, [day, month]);

  useEffect(() => {
    if (!day || !month || !events.length) return;

    const year = new Date().getFullYear();

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${day} ${monthNames[month]} Tarihte Ne Oldu?`,
      description: `${day} ${monthNames[month]} tarihinde yaşanan önemli olaylar.`,
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

  return (
    <div className="screen">
      <h1 className="visually-hidden">
        {day} {monthNames[month]} Tarihte Ne Oldu?
      </h1>
      <p className="visually-hidden">
        {day} {monthNames[month]} tarihinde dünyada ve Türkiye’de yaşanan önemli
        olaylar, doğumlar ve tarihi gelişmeler listelenmektedir.
      </p>

      <div className="terminal">
        {/* BAŞLIK PICKER */}
        <div className="title-picker" ref={pickerRef}>
          <button onClick={() => setOpen(!open)}>
            {day} {monthNames[month]}
          </button>

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

        <div className="subtitle">TARİHTE NE OLDU?</div>

        {stoic && <p className="stoic">{stoic}</p>}

        <ul className="events">
          {events.map((e, i) => (
            <li key={i} style={{ animationDelay: `${i * 40}ms` }}>
              <span className="year">{e.year}</span>
              <span className="event-text">{e.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
