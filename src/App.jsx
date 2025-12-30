import { useEffect, useState } from "react";
import "./App.css";

// Google Sheets ayarları
const SHEET_ID = "1yHFAy4yCOkEfDpJS0l8HV1jwI8cwJz3A4On6yJvblgQ";
const SHEET_NAME = "Sheet1"; // gerekirse değiştir

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSheet = async () => {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));

      const rows = json.table.rows;

      // Excel formatını normalize et
      let currentDate = null;
      const parsed = [];

      rows.forEach((r) => {
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

      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const todayKey = `${dd}${mm}`;

      setEvents(parsed.filter((e) => e.date === todayKey));
    };

    fetchSheet();
  }, []);

  const todayTitle = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });

  const stoicNote = events.find((e) => e.stoic)?.stoic;

  return (
    <div className="screen">
      <div className="terminal">
        <div className="header">ARCHIVE://TODAY</div>

        <h1 className="date">{todayTitle}</h1>

        {stoicNote && <p className="stoic">{stoicNote}</p>}

        <p className="section">BUGÜN TARİHTE YAŞANANLAR</p>

        {events.length === 0 ? (
          <p className="empty">Kayıt bulunamadı.</p>
        ) : (
          <ul className="events">
            {events.map((e, i) => (
              <li key={i}>
                <span className="year">{e.year}</span> {e.text}
              </li>
            ))}
          </ul>
        )}

        <div className="footer">ARCHIVE SOURCE: WIKI</div>
      </div>
    </div>
  );
}
