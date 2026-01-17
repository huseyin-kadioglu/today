import { useEffect, useState, useMemo } from "react";
import "./App.css";

const SHEET_ID = "1yHFAy4yCOkEfDpJS0l8HV1jwI8cwJz3A4On6yJvblgQ";
const SHEET_NAME = "Sheet1";

export default function App() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");

  const [allEvents, setAllEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(dd);
  const [selectedMonth, setSelectedMonth] = useState(mm);

  // Arşiv yazım state'leri
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [visibleStoic, setVisibleStoic] = useState(null);

  /* -------------------- KLAVYE -------------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setSelectedDay(d =>
          String(Math.min(parseInt(d) + 1, 31)).padStart(2, "0")
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedDay(d =>
          String(Math.max(parseInt(d) - 1, 1)).padStart(2, "0")
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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
    return allEvents.filter(e => e.date === key);
  }, [allEvents, selectedDay, selectedMonth]);

  const stoicNote = useMemo(() => {
    return filteredEvents.find(e => e.stoic)?.stoic || null;
  }, [filteredEvents]);

  /* -------------------- ARŞİV OKUMA EFEKTİ -------------------- */
  useEffect(() => {
    setVisibleEvents([]);
    setVisibleStoic(null);

    if (filteredEvents.length === 0) return;

    let i = 0;

    const interval = setInterval(() => {
      setVisibleEvents(prev => {
        if (i >= filteredEvents.length) {
          clearInterval(interval);

          // Stoic not EN SON, bilinçli gecikmeyle gelsin
          if (stoicNote) {
            setTimeout(() => setVisibleStoic(stoicNote), 600);
          }
          return prev;
        }

        const next = [...prev, filteredEvents[i]];
        i++;
        return next;
      });
    }, 260); // ⏱️ arşiv hızı (220–320 ideal)

    return () => clearInterval(interval);
  }, [filteredEvents, stoicNote]);

  /* -------------------- UI -------------------- */
  const months = [
    { v: "01", n: "Oca" }, { v: "02", n: "Şub" }, { v: "03", n: "Mar" },
    { v: "04", n: "Nis" }, { v: "05", n: "May" }, { v: "06", n: "Haz" },
    { v: "07", n: "Tem" }, { v: "08", n: "Ağu" }, { v: "09", n: "Eyl" },
    { v: "10", n: "Eki" }, { v: "11", n: "Kas" }, { v: "12", n: "Ara" }
  ];

  const daysInMonth = useMemo(() => {
    const year = new Date().getFullYear();
    const count = new Date(year, parseInt(selectedMonth), 0).getDate();
    return Array.from({ length: count }, (_, i) =>
      String(i + 1).padStart(2, "0")
    );
  }, [selectedMonth]);

  return (
    <div className="screen">
      <div className="terminal">
        <div className="header">ARŞİV://</div>

        <div className="picker">
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            {months.map(m => (
              <option key={m.v} value={m.v}>{m.n}</option>
            ))}
          </select>

          <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
            {daysInMonth.map(d => (
              <option key={d} value={d}>{d}</option>
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
