import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SHEET_ID = "1yHFAy4yCOkEfDpJS0l8HV1jwI8cwJz3A4On6yJvblgQ";
const QUIZ_GID = "383499031";

/* ─── Sabit yedek sorular (sheet boşsa kullanılır) ─────────────────── */
const FALLBACK_QUESTIONS = [
  { q: "Türkiye Cumhuriyeti hangi yıl ilan edilmiştir?", options: ["1919", "1920", "1923", "1925"], answer: 2, fact: "29 Ekim 1923'te Mustafa Kemal Atatürk tarafından ilan edildi." },
  { q: "Fatih Sultan Mehmet İstanbul'u hangi yılda fethetti?", options: ["1389", "1444", "1453", "1492"], answer: 2, fact: "29 Mayıs 1453'te Konstantinopolis düştü, Bizans İmparatorluğu sona erdi." },
  { q: "Türkiye Büyük Millet Meclisi hangi yıl açıldı?", options: ["1919", "1920", "1921", "1922"], answer: 1, fact: "23 Nisan 1920'de Ankara'da ilk kez toplandı." },
  { q: "Berlin Duvarı hangi yıl yıkıldı?", options: ["1985", "1987", "1989", "1991"], answer: 2, fact: "9 Kasım 1989'da Doğu Almanya sınırları açtı, yıkım başladı." },
  { q: "Fransız Devrimi hangi yılda başladı?", options: ["1776", "1783", "1789", "1799"], answer: 2, fact: "14 Temmuz 1789'da Bastille Hapishanesi'nin basılmasıyla simgelenir." },
  { q: "Osmanlı Devleti kaç yılında kuruldu?", options: ["1071", "1243", "1299", "1326"], answer: 2, fact: "1299 yılında Söğüt'te Osman Gazi tarafından kuruldu." },
  { q: "Birinci Dünya Savaşı hangi yıllar arasında yaşandı?", options: ["1912–1916", "1914–1918", "1915–1919", "1916–1920"], answer: 1, fact: "28 Temmuz 1914 – 11 Kasım 1918 tarihleri arasında sürdü." },
  { q: "Atatürk hangi yıl hayatını kaybetti?", options: ["1936", "1937", "1938", "1939"], answer: 2, fact: "10 Kasım 1938'de İstanbul Dolmabahçe Sarayı'nda hayatını kaybetti." },
  { q: "Büyük Taarruz hangi tarihte başladı?", options: ["26 Ağustos 1921", "30 Ağustos 1921", "26 Ağustos 1922", "30 Ağustos 1922"], answer: 2, fact: "26 Ağustos 1922'de başlayan taarruz, 30 Ağustos'ta zaferle sonuçlandı." },
  { q: "İnsanoğlu ilk kez hangi yıl Ay'a ayak bastı?", options: ["1966", "1968", "1969", "1972"], answer: 2, fact: "Neil Armstrong, 20 Temmuz 1969'da Apollo 11 göreviyle Ay'a ilk adımı attı." },
];

/* ─── Yardımcı fonksiyonlar ─────────────────────────────────────────── */

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getDateSeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Deterministik karıştır — aynı gün herkes aynı soruları görür
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    s = (s ^ (s >>> 14)) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// cevap kolonu: 0-3, 1-4 veya a-d → 0-indexed
function normalizeAnswer(v) {
  if (v == null) return 0;
  const s = String(v).trim().toLowerCase();
  if (s === "a") return 0;
  if (s === "b") return 1;
  if (s === "c") return 2;
  if (s === "d") return 3;
  const n = parseInt(s);
  if (!isNaN(n)) return n > 3 ? n - 1 : n;
  return 0;
}

function parseSheetQuestions(json) {
  const rows = json.table?.rows || [];
  return rows.reduce((acc, r) => {
    const tarih = r.c[0]?.v != null ? String(r.c[0].v).trim() : "";
    const soru  = r.c[1]?.v;
    const a = r.c[2]?.v, b = r.c[3]?.v, c = r.c[4]?.v, d = r.c[5]?.v;
    const cevap = r.c[6]?.v;
    const bilgi = r.c[7]?.v || "";
    if (soru && a && b && c && d && cevap != null) {
      acc.push({ tarih, q: String(soru), options: [String(a), String(b), String(c), String(d)], answer: normalizeAnswer(cevap), fact: String(bilgi) });
    }
    return acc;
  }, []);
}

function selectDailyQuestions(allQ) {
  if (!allQ.length) return FALLBACK_QUESTIONS;
  const today = getTodayKey();
  const d = new Date();
  const altFormats = [
    today,
    `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}.${d.getFullYear()}`,
    `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`,
  ];
  const todayQ = allQ.filter(q => altFormats.includes(q.tarih));
  if (todayQ.length >= 10) return todayQ.slice(0, 10);
  const generalQ = allQ.filter(q => !altFormats.some(f => q.tarih === f));
  const shuffled = seededShuffle(generalQ, getDateSeed());
  return [...todayQ, ...shuffled].slice(0, Math.min(10, allQ.length));
}

function getTimeUntilMidnight() {
  const now = new Date();
  const mid = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const diff = mid - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

/* ─── Rozet sistemi ─────────────────────────────────────────────────── */

const BADGES = [
  { min: 10, label: "Tarih Efsanesi",      icon: "💎", color: "#4fc3f7" },
  { min: 7,  label: "Tarih Ustası",        icon: "🥇", color: "#f9a825" },
  { min: 4,  label: "Tarih Araştırmacısı", icon: "🥈", color: "#90a4ae" },
  { min: 0,  label: "Tarih Meraklısı",     icon: "🥉", color: "#a1887f" },
];

function getBadge(score) {
  return BADGES.find(b => score >= b.min);
}

/* ─── localStorage yardımcıları ─────────────────────────────────────── */

function getLeaderboard() {
  try { return JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]"); }
  catch { return []; }
}

function saveScore(name, score) {
  const board = getLeaderboard();
  board.push({ name, score, date: new Date().toLocaleDateString("tr-TR") });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem("quiz_leaderboard", JSON.stringify(board.slice(0, 20)));
}

function getPlayedToday() {
  try { return JSON.parse(localStorage.getItem(`quiz_played_${getTodayKey()}`)); }
  catch { return null; }
}

/* ─── Bileşen ───────────────────────────────────────────────────────── */

export default function Quiz() {
  const [questions, setQuestions]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [phase, setPhase]           = useState("start");
  const [username, setUsername]     = useState(() => localStorage.getItem("quiz_username") || "");
  const [current, setCurrent]       = useState(0);
  const [answers, setAnswers]       = useState([]);
  const [selected, setSelected]     = useState(null);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard);
  const [countdown, setCountdown]   = useState(getTimeUntilMidnight);
  const [copied, setCopied]         = useState(false);
  const playedToday = getPlayedToday();

  /* Sheets'ten sorular */
  useEffect(() => {
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${QUIZ_GID}`)
      .then(r => r.text())
      .then(t => {
        try {
          const json = JSON.parse(t.substring(47).slice(0, -2));
          const all  = parseSheetQuestions(json);
          setQuestions(selectDailyQuestions(all));
        } catch {
          setQuestions(FALLBACK_QUESTIONS);
        }
        setLoading(false);
      })
      .catch(() => { setQuestions(FALLBACK_QUESTIONS); setLoading(false); });
  }, []);

  /* SEO */
  useEffect(() => {
    document.title = "Günlük Tarih Quizi | Bugün Tarihte";
    document.querySelector("meta[name='description']")?.setAttribute("content", "Her gün 10 yeni tarih sorusu! Bilgini test et, rozet kazan, liderlik tablosuna gir.");
    const cl = document.querySelector("link[rel='canonical']");
    if (cl) cl.href = "https://bugununtarihi.com.tr/quiz";
    return () => { document.title = "Bugün Tarihte Ne Oldu? | Tarihte Bugün Yaşananlar"; };
  }, []);

  /* Geri sayım (sonuç ekranında) */
  useEffect(() => {
    if (phase !== "result") return;
    const t = setInterval(() => setCountdown(getTimeUntilMidnight()), 1000);
    return () => clearInterval(t);
  }, [phase]);

  /* ─── Aksiyon fonksiyonları ─────────────────────────────────────── */

  const startQuiz = () => {
    if (!username.trim()) return;
    localStorage.setItem("quiz_username", username.trim());
    setAnswers([]); setCurrent(0); setSelected(null); setPhase("quiz");
  };

  const selectAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const nextQuestion = () => {
    const isCorrect  = selected === questions[current].answer;
    const newAnswers = [...answers, { selected, correct: isCorrect }];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const score = newAnswers.filter(a => a.correct).length;
      if (!playedToday || score > playedToday.score) {
        localStorage.setItem(`quiz_played_${getTodayKey()}`, JSON.stringify({ score }));
        saveScore(username.trim(), score);
      }
      setLeaderboard(getLeaderboard());
      setPhase("result");
    }
  };

  const share = async (score) => {
    const badge = getBadge(score);
    const text = `📜 Günlük Tarih Quizi – ${new Date().toLocaleDateString("tr-TR")}\n${badge.icon} ${badge.label}: ${score}/10\n\nSen de dene → bugununtarihi.com.tr/quiz`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const restart = () => { setAnswers([]); setCurrent(0); setSelected(null); setPhase("start"); };

  const score = answers.filter(a => a.correct).length;

  /* ─── Render ────────────────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="screen">
        <div className="terminal">
          <div className="quiz-loading">
            <span className="quiz-loading-dot">·</span>
            <span className="quiz-loading-dot">·</span>
            <span className="quiz-loading-dot">·</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="terminal">

        {/* HEADER */}
        <div className="quiz-header">
          <Link to="/" className="quiz-back">← Ana Sayfa</Link>
          <span className="quiz-logo">&gt;_ Günlük Tarih Quizi</span>
        </div>

        {/* BAŞLANGIÇ */}
        {phase === "start" && (
          <div className="quiz-start">
            <div className="quiz-start-icon">📜</div>
            <h1 className="quiz-title">Günlük Tarih Quizi</h1>
            <p className="quiz-subtitle">
              Her gün 10 yeni soru. Bugün kaç doğru yaparsın?
            </p>

            {playedToday && (
              <div className="quiz-played-today">
                <span>Bugün oynadın</span>
                <strong>
                  {getBadge(playedToday.score).icon} {playedToday.score}/10 – {getBadge(playedToday.score).label}
                </strong>
              </div>
            )}

            <div className="quiz-name-wrap">
              <label className="quiz-name-label">Adın nedir?</label>
              <input
                className="quiz-name-input"
                type="text"
                placeholder="Adını yaz..."
                value={username}
                maxLength={24}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === "Enter" && startQuiz()}
                autoFocus
              />
            </div>

            <button
              className="quiz-btn-primary"
              onClick={startQuiz}
              disabled={!username.trim()}
            >
              {playedToday ? "Tekrar Oyna →" : "Quize Başla →"}
            </button>

            {leaderboard.length > 0 ? (
              <div className="quiz-leaderboard">
                <div className="quiz-board-title">Liderlik Tablosu</div>
                {leaderboard.slice(0, 5).map((e, i) => (
                  <div key={i} className="quiz-board-row">
                    <span className="quiz-board-rank">#{i + 1}</span>
                    <span className="quiz-board-name">{e.name}</span>
                    <span className="quiz-board-score">{e.score}/10</span>
                    <span className="quiz-board-date">{e.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="quiz-board-empty">Henüz skor yok. İlk sen ol!</p>
            )}
          </div>
        )}

        {/* SORU */}
        {phase === "quiz" && (
          <div className="quiz-question-wrap">
            <div className="quiz-counter">
              <span className="quiz-counter-text">
                Soru {current + 1} / {questions.length}
              </span>
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${(current / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="quiz-q-text">{questions[current].q}</div>

            <div className="quiz-options">
              {questions[current].options.map((opt, i) => {
                let cls = "quiz-option";
                if (selected !== null) {
                  if (i === questions[current].answer) cls += " quiz-option-correct";
                  else if (i === selected)             cls += " quiz-option-wrong";
                  else                                 cls += " quiz-option-dim";
                }
                return (
                  <button key={i} className={cls} onClick={() => selectAnswer(i)} disabled={selected !== null}>
                    <span className="quiz-option-letter">{["A","B","C","D"][i]}</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="quiz-feedback">
                {questions[current].fact && (
                  <p className="quiz-fact">{questions[current].fact}</p>
                )}
                <button className="quiz-btn-primary" onClick={nextQuestion}>
                  {current + 1 < questions.length ? "Sonraki Soru →" : "Sonuçları Gör →"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* SONUÇ */}
        {phase === "result" && (() => {
          const badge = getBadge(score);
          return (
            <div className="quiz-result">
              <div className="quiz-badge-icon">{badge.icon}</div>
              <div className="quiz-badge-label" style={{ color: badge.color }}>{badge.label}</div>
              <div className="quiz-score-display">
                {score}<span className="quiz-score-of"> / {questions.length}</span>
              </div>
              <p className="quiz-score-caption">
                {score === questions.length
                  ? "Mükemmel! Tüm soruları doğru yanıtladın."
                  : score >= 7 ? "Çok iyi! Tarih bilgin oldukça güçlü."
                  : score >= 4 ? "Fena değil! Biraz daha çalışabilirsin."
                  : "Devam et! Her deneme seni geliştiriyor."}
              </p>

              {/* Paylaş */}
              <button className="quiz-share-btn" onClick={() => share(score)}>
                {copied ? "✓ Kopyalandı!" : "↑ Sonucu Paylaş"}
              </button>

              {/* Yeni quiz sayacı */}
              <div className="quiz-countdown">
                <span className="quiz-countdown-label">Yeni quiz</span>
                <span className="quiz-countdown-time">{countdown}</span>
              </div>

              {/* Cevap özeti */}
              <div className="quiz-summary">
                {questions.map((q, i) => (
                  <div
                    key={i}
                    className={`quiz-summary-row ${answers[i]?.correct ? "quiz-summary-correct" : "quiz-summary-wrong"}`}
                  >
                    <span className="quiz-summary-mark">{answers[i]?.correct ? "✓" : "✗"}</span>
                    <div>
                      <div className="quiz-summary-q">{q.q}</div>
                      {!answers[i]?.correct && (
                        <div className="quiz-summary-ans">→ {q.options[q.answer]}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Liderlik tablosu */}
              {leaderboard.length > 0 && (
                <div className="quiz-leaderboard">
                  <div className="quiz-board-title">Liderlik Tablosu</div>
                  {leaderboard.slice(0, 5).map((e, i) => (
                    <div key={i} className="quiz-board-row">
                      <span className="quiz-board-rank">#{i + 1}</span>
                      <span className="quiz-board-name">{e.name}</span>
                      <span className="quiz-board-score">{e.score}/10</span>
                      <span className="quiz-board-date">{e.date}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="quiz-result-actions">
                <button className="quiz-btn-primary" onClick={restart}>Tekrar Oyna</button>
                <Link to="/" className="quiz-btn-secondary">Ana Sayfa</Link>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
