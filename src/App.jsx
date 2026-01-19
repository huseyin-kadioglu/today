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
  "10": "ekim",
  "11": "kasim",
  "12": "aralik",
};


export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");

  const [allEvents, setAllEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(dd);
  const [selectedMonth, setSelectedMonth] = useState(mm);

  const [visibleEvents, setVisibleEvents] = useState([]);
  const [visibleStoic, setVisibleStoic] = useState(null);

  /* -------------------- URL → TARİH -------------------- */
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (!path) return;

    const [day, monthName] = path.split("-");
    if (day && monthMap[monthName]) {
      setSelectedDay(day.padStart(2, "0"));
      setSelectedMonth(monthMap[monthName]);
    }
  }, [location.pathname]);

  /* -------------------- SEO -------------------- */
  useEffect(() => {
    const monthLabel = monthNames[selectedMonth];
    const title = `${selectedDay} ${monthLabel} Tarihte Ne Oldu?`;
    const description = `${selectedDay} ${monthLabel} tarihinde dünyada ve Türkiye’de yaşanan önemli tarihi olaylar.`;
    const canonical = `https://bugununtarihi.com/${selectedDay}-${monthLabel.toLowerCase()}`;

    document.title = title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", description);

    const canonTag = document.querySelector('link[rel="canonical"]');
    if (canonTag) canonTag.setAttribute("href", canonical);

    document.dispatchEvent(new Event("prerender-ready"));
  }, [selectedDay, selectedMonth]);

  useEffect(() => {
    const slug = `${selectedDay}-${monthSlug[selectedMonth]}`;
    const currentPath = location.pathname.replace("/", "");

    if (currentPath !== slug) {
      navigate(`/${slug}`, { replace: true });
    }
  }, [selectedDay, selectedMonth]);

  /* -------------------- KLAVYE -------------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      const current = new Date(
        new Date().getFullYear(),
        parseInt(selectedMonth) - 1,
        parseInt(selectedDay),
      );

      if (e.key === "ArrowRight") {
        current.setDate(current.getDate() + 1);
      }

      if (e.key === "ArrowLeft") {
        current.setDate(current.getDate() - 1);
      }

      setSelectedDay(String(current.getDate()).padStart(2, "0"));
      setSelectedMonth(String(current.getMonth() + 1).padStart(2, "0"));
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedDay, selectedMonth]);

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
    const key = `${selectedDay}${selectedMonth}`;
    return allEvents.filter((e) => e.date === key);
  }, [allEvents, selectedDay, selectedMonth]);

  const stoicNote = useMemo(() => {
    return filteredEvents.find((e) => e.stoic)?.stoic || null;
  }, [filteredEvents]);

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

  /* -------------------- UI -------------------- */
  const months = [
    { v: "01", n: "Oca" },
    { v: "02", n: "Şub" },
    { v: "03", n: "Mar" },
    { v: "04", n: "Nis" },
    { v: "05", n: "May" },
    { v: "06", n: "Haz" },
    { v: "07", n: "Tem" },
    { v: "08", n: "Ağu" },
    { v: "09", n: "Eyl" },
    { v: "10", n: "Eki" },
    { v: "11", n: "Kas" },
    { v: "12", n: "Ara" },
  ];

  const daysInMonth = useMemo(() => {
    const year = new Date().getFullYear();
    const count = new Date(year, parseInt(selectedMonth), 0).getDate();
    return Array.from({ length: count }, (_, i) =>
      String(i + 1).padStart(2, "0"),
    );
  }, [selectedMonth]);

  return (
    <div className="screen">
      <div className="terminal">
        <div className="header">
          <div className="archive-label">ARŞİV //</div>
          <h1 className="archive-title">
            {selectedDay} {monthNames[selectedMonth]} Tarihte Ne Oldu?
          </h1>
        </div>

        <div className="picker">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m.v} value={m.v}>
                {m.n}
              </option>
            ))}
          </select>

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {daysInMonth.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
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
