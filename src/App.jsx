import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const SHEET_ID = "1yHFAy4yCOkEfDpJS0l8HV1jwI8cwJz3A4On6yJvblgQ";
const SHEET_NAME = "Sheet1";

const monthMap = {
  ocak: "01", subat: "02", mart: "03", nisan: "04",
  mayis: "05", haziran: "06", temmuz: "07", agustos: "08",
  eylul: "09", ekim: "10", kasim: "11", aralik: "12",
};

const monthNames = {
  "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan",
  "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos",
  "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık",
};

const monthSlug = {
  "01": "ocak", "02": "subat", "03": "mart", "04": "nisan",
  "05": "mayis", "06": "haziran", "07": "temmuz", "08": "agustos",
  "09": "eylul", "10": "ekim", "11": "kasim", "12": "aralik",
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const pickerRef = useRef(null);

  const [allEvents, setAllEvents] = useState([]);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [open, setOpen] = useState(false);

  /* URL → TARİH */
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (!path) {
      const now = new Date();
      navigate(`/${String(now.getDate()).padStart(2, "0")}-${monthSlug[String(now.getMonth() + 1).padStart(2, "0")]}`, { replace: true });
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
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`)
      .then(r => r.text())
      .then(t => {
        const json = JSON.parse(t.substring(47).slice(0, -2));
        let current = null;
        const parsed = [];
        json.table.rows.forEach(r => {
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
    () => allEvents.filter(e => e.date === `${day}${month}`),
    [allEvents, day, month]
  );

  const stoic = events.find(e => e.stoic)?.stoic;

  /* dışarı tıklanınca kapat */
  useEffect(() => {
    const close = e => pickerRef.current && !pickerRef.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!day || !month) return null;

  return (
    <div className="screen">
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
                onChange={e => navigate(`/${day}-${monthSlug[e.target.value]}`)}
              >
                {Object.entries(monthNames).map(([v, n]) => (
                  <option key={v} value={v}>{n}</option>
                ))}
              </select>

              <select
                value={day}
                onChange={e => navigate(`/${e.target.value}-${monthSlug[month]}`)}
              >
                {Array.from({ length: 31 }, (_, i) => {
                  const d = String(i + 1).padStart(2, "0");
                  return <option key={d} value={d}>{d}</option>;
                })}
              </select>
            </div>
          )}
        </div>

        <div className="subtitle">Tarihte Ne Oldu?</div>

        {stoic && <p className="stoic">{stoic}</p>}

        <ul className="events">
          {events.map((e, i) => (
            <li key={i}>
              <span className="year">{e.year}</span>
              <span>{e.text}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
