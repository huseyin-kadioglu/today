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
  "10": "Ekim",
  "11": "Kasım",
  "12": "Aralık",
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

  const [allEvents, setAllEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const [visibleEvents, setVisibleEvents] = useState([]);
  const [visibleStoic, setVisibleStoic] = useState(null);

  /* ---------------- URL → TARİH ---------------- */
  useEffect(() => {
    const path = location.pathname.replace("/", "");

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

  /* ---------------- SEO ---------------- */
  useEffect(() => {
    if (!selectedDay || !selectedMonth) return;

    const monthLabel = monthNames[selectedMonth];
    document.title = `${selectedDay} ${monthLabel} Tarihte Ne Oldu?`;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        `${selectedDay} ${monthLabel} tarihinde yaşanan önemli olaylar.`,
      );

    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        `https://bugununtarihi.com.tr/${selectedDay}-${monthSlug[selectedMonth]}`,
      );
  }, [selectedDay, selectedMonth]);

  /* ---------------- KLAVYE ---------------- */
  useEffect(() => {
    if (!selectedDay || !selectedMonth) return;

    const handleKey = (e) => {
      if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;

      const current = new Date(
        2024,
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

  /* ---------------- DATA ---------------- */
  useEffect(() => {
    const fetchSheet = async () => {
      const res = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`,
      );
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

  /* ---------------- FİLTRE ---------------- */
  const filteredEvents = useMemo(() => {
    if (!selectedDay || !selectedMonth) return [];
    return allEvents.filter(
      (e) => e.date === `${selectedDay}${selectedMonth}`,
    );
  }, [allEvents, selectedDay, selectedMonth]);

  const stoicNote = filteredEvents.find((e) => e.stoic)?.stoic || null;

  /* ---------------- TYPEWRITER ---------------- */
  useEffect(() => {
    setVisibleEvents([]);
    setVisibleStoic(null);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= filteredEvents.length) {
        clearInterval(interval);
        if (stoicNote) setVisibleStoic(stoicNote);
        return;
      }
      setVisibleEvents((p) => [...p, filteredEvents[i++]]);
    }, 220);

    return () => clearInterval(interval);
  }, [filteredEvents, stoicNote]);

  if (!selectedDay || !selectedMonth) return null;

  /* ---------------- UI ---------------- */
  const daysInMonth = new Date(2024, selectedMonth, 0).getDate();

  return (
    <div className="screen">
      <div className="terminal">
        <h1>
          {selectedDay} {monthNames[selectedMonth]} Tarihte Ne Oldu?
        </h1>

        {/* TARİH SEÇİCİ */}
        <div className="picker">
          <select
            value={selectedMonth}
            onChange={(e) =>
              navigate(`/${selectedDay}-${monthSlug[e.target.value]}`)
            }
          >
            {Object.entries(monthNames).map(([v, n]) => (
              <option key={v} value={v}>
                {n}
              </option>
            ))}
          </select>

          <select
            value={selectedDay}
            onChange={(e) =>
              navigate(`/${e.target.value}-${monthSlug[selectedMonth]}`)
            }
          >
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = String(i + 1).padStart(2, "0");
              return (
                <option key={d} value={d}>
                  {d}
                </option>
              );
            })}
          </select>
        </div>

        {visibleStoic && <p className="stoic">{visibleStoic}</p>}

        <ul>
          {visibleEvents.map((e, i) => (
            <li key={i}>
              <strong>{e.year}</strong> — {e.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
