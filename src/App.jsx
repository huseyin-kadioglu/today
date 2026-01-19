import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
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

  const [allEvents, setAllEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const [visibleEvents, setVisibleEvents] = useState([]);
  const [visibleStoic, setVisibleStoic] = useState(null);

  /* -------------------- URL → TARİH (TEK KAYNAK) -------------------- */
  useEffect(() => {
    const path = location.pathname.replace("/", "");

    // URL YOK → BUGÜNE REDIRECT
    if (!path) {
      const now = new Date();
      const d = String(now.getDate()).padStart(2, "0");
      const m = String(now.getMonth() + 1).padStart(2, "0");
      navigate(`/${d}-${monthSlug[m]}`, { replace: true });
      return;
    }

    const [day, monthName] = path.split("-");
    const month = monthMap[monthName];

    if (!day || !month) return;

    setSelectedDay(day.padStart(2, "0"));
    setSelectedMonth(month);
  }, [location.pathname, navigate]);

  /* -------------------- SEO -------------------- */
  useEffect(() => {
    if (!selectedDay || !selectedMonth) return;

    const monthLabel = monthNames[selectedMonth];
    const title = `${selectedDay} ${monthLabel} Tarihte Ne Oldu?`;
    const description = `${selectedDay} ${monthLabel} tarihinde dünyada ve Türkiye’de yaşanan önemli tarihi olaylar.`;
    const canonical = `https://bugununtarihi.com.tr/${selectedDay}-${monthSlug[selectedMonth]}`;

    document.title = title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", description);

    const canonTag = document.querySelector('link[rel="canonical"]');
    if (canonTag) canonTag.setAttribute("href", canonical);

    document.dispatchEvent(new Event("prerender-ready"));
  }, [selectedDay, selectedMonth]);

  /* -------------------- KLAVYE (GÜN + AY GEÇİŞLİ) -------------------- */
  useEffect(() => {
    if (!selectedDay || !selectedMonth) return;

    const handleKey = (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      const current = new Date(
        new Date().getFullYear(),
        parseInt(selectedMonth) - 1,
        parseInt(selectedDay),
      );

      current.setDate(
        e.key === "ArrowRight" ? current.getDate() + 1 : current.getDate() - 1,
      );

      const d = String(current.getDate()).padStart(2, "0");
      const m = String(current.getMonth() + 1).padStart(2, "0");

      navigate(`/${d}-${monthSlug[m]}`);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedDay, selectedMonth, navigate]);

  /* -------------------- DATA FETCH -------------------- */
  useEffect(() => {
    const fetchSheet = async () => {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));

      let currentDate = null;
      const parsed = [];

      json.table.rows.forEach((r) => {
        const dateCell = r.c[0]?.v;
        const year = r.c[1]?.v;
        const event = r.c[2]?.v;
        const stoic = r.c[3]?.v;

        if (dateCell) currentDate = String(dateCell).padStart(4, "0");

        if (currentDate && year && event) {
          parsed.push({
            date: currentDate,
            year,
            text: event,
            stoic: stoic || null,
          });
        }
      });

      setAllEvents(parsed);
    };

    fetchSheet();
  }, []);

  /* -------------------- FİLTRE -------------------- */
  const filteredEvents = useMemo(() => {
    if (!selectedDay || !selectedMonth) return [];
    return allEvents.filter((e) => e.date === `${selectedDay}${selectedMonth}`);
  }, [allEvents, selectedDay, selectedMonth]);

  const stoicNote = useMemo(
    () => filteredEvents.find((e) => e.stoic)?.stoic || null,
    [filteredEvents],
  );

  /* -------------------- ARŞİV OKUMA -------------------- */
  useEffect(() => {
    setVisibleEvents([]);
    setVisibleStoic(null);
    if (filteredEvents.length === 0) return;

    let i = 0;
    const interval = setInterval(() => {
      setVisibleEvents((prev) => {
        if (i >= filteredEvents.length) {
          clearInterval(interval);
          if (stoicNote) setTimeout(() => setVisibleStoic(stoicNote), 600);
          return prev;
        }
        return [...prev, filteredEvents[i++]];
      });
    }, 260);

    return () => clearInterval(interval);
  }, [filteredEvents, stoicNote]);

  if (!selectedDay || !selectedMonth) return null;

  return (
    <div className="screen">
      <div className="terminal">
        <div className="header">
          <div className="archive-label">ARŞİV //</div>
          <h1 className="archive-title">
            {selectedDay} {monthNames[selectedMonth]} Tarihte Ne Oldu?
          </h1>
        </div>

        {visibleStoic && <p className="stoic">{visibleStoic}</p>}

        <p className="section">ARŞİV KAYITLARI</p>

        {visibleEvents.length === 0 ? (
          <p className="empty">Kayıtlar taranıyor…</p>
        ) : (
          <ul className="events">
            {visibleEvents.map((e, i) => (
              <li key={i}>
                <span className="year">{e.year}</span> {e.text}
              </li>
            ))}
          </ul>
        )}

        <div className="footer">
          RECORD DATE :: {selectedDay}.{selectedMonth}
        </div>
      </div>
    </div>
  );
}
