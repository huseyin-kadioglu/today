import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getDailyQuestions, getDailyFlagQuestions, submitScore, getLeaderboard } from "./firestore.js";

const Q_COUNT = 10;
const LETTERS = ["A", "B", "C", "D"];

const BANNED = [
  "orospu","piç","sik","göt","amk","bok","yarrak","amına","oç",
  "gavat","ibne","kahpe","sürtük","siktir","pezevenk",
];
function norm(s) {
  return s.toLowerCase()
    .replace(/[ıİ]/g,"i").replace(/[şŞ]/g,"s").replace(/[çÇ]/g,"c")
    .replace(/[üÜ]/g,"u").replace(/[öÖ]/g,"o").replace(/[ğĞ]/g,"g");
}
function hasProfanity(t) { const n=norm(t); return BANNED.some(w=>n.includes(norm(w))); }
function todayKey() {
  const d = new Date(Date.now() + 3 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}
function scoreFor(correct, ms, qTime) {
  return correct ? 100 + Math.round(Math.max(0,1-ms/(qTime*1000))*50) : 0;
}
function fmtTime(ms) {
  const s=Math.round(ms/1000);
  return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
}

// ── Streak helpers ────────────────────────────────────────────────────────────
function readStreak() {
  return {
    count: parseInt(localStorage.getItem("quiz_streak") || "0"),
    last:  localStorage.getItem("quiz_streak_last") || null,
  };
}
function bumpStreak() {
  const today = todayKey();
  const { count, last } = readStreak();
  if (last === today) return count; // already updated today
  const diff = last
    ? Math.round((new Date(today) - new Date(last)) / 86400000)
    : 999;
  const next = diff === 1 ? count + 1 : 1;
  localStorage.setItem("quiz_streak", String(next));
  localStorage.setItem("quiz_streak_last", today);
  return next;
}
function badgeFor(streak) {
  if (streak >= 100) return { icon: "🏆", label: "Tarih Ustası" };
  if (streak >= 60)  return { icon: "🥇", label: "Tarih Tutkunu" };
  if (streak >= 30)  return { icon: "🏅", label: "Aylık Dedektif" };
  if (streak >= 14)  return { icon: "💫", label: "2 Haftalık Seri" };
  if (streak >= 7)   return { icon: "⚡", label: "Haftalık Seri" };
  if (streak >= 3)   return { icon: "🔥", label: "Ateşli Başlangıç" };
  return null;
}

const TABS = [["daily","günlük"],["weekly","haftalık"],["yearly","yıllık"]];

const CATEGORY_META = {
  "bayraklar": { title: "Bayraklar", desc: "10 bayrak · 25 saniye · kolaydan zora · günde 1 hak", qTime: 25 },
};
function categoryMeta(cat) {
  return CATEGORY_META[cat] || { title: "Genel Kültür", desc: "10 soru · 25 saniye · karışık · günde 1 hak", qTime: 25 };
}

export default function Quiz() {
  const navigate = useNavigate();
  const { category = "genel-kultur" } = useParams();
  const meta = categoryMeta(category);
  const Q_TIME = meta.qTime;

  const [phase,      setPhase]      = useState("name");
  const [editingName, setEditingName] = useState(() => !localStorage.getItem("quiz_username"));
  const [username, setUsername] = useState(()=>localStorage.getItem("quiz_username")||"");
  const [nameErr,  setNameErr]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const [questions, setQuestions] = useState([]);
  const [qi,        setQi]        = useState(0);
  const [chosen,    setChosen]    = useState(null);
  const [answers,   setAnswers]   = useState([]);
  const [timeLeft,  setTimeLeft]  = useState(Q_TIME);

  const [boardTab,     setBoardTab]     = useState("daily");
  const [board,        setBoard]        = useState({});
  const [boardLoading, setBoardLoading] = useState(false);

  const [playedToday, setPlayedToday] = useState(undefined);
  const [streak,      setStreak]      = useState(0);

  const qStartRef    = useRef(Date.now());
  const selectingRef = useRef(false);

  const lsKey = `quiz_${category}_${todayKey()}`;

  // Init
  useEffect(() => {
    const { count } = readStreak();
    setStreak(count);
    const stored = localStorage.getItem(lsKey);
    if (stored) { setPlayedToday(JSON.parse(stored)); setPhase("board"); }
    else        { setPlayedToday(null); }
  }, []);

  // Leaderboard lazy-load
  useEffect(() => {
    if (phase !== "board") return;
    if (board[boardTab] !== undefined) return;
    setBoardLoading(true);
    getLeaderboard(boardTab, category)
      .then(data => setBoard(p=>({...p,[boardTab]:data})))
      .catch(()   => setBoard(p=>({...p,[boardTab]:[]})))
      .finally(() => setBoardLoading(false));
  }, [phase, boardTab]);

  // Reset timer on new question
  useEffect(() => {
    if (phase !== "play") return;
    qStartRef.current = Date.now();
    setTimeLeft(Q_TIME);
    selectingRef.current = false;
  }, [qi, phase]);

  // Timer tick
  useEffect(() => {
    if (phase !== "play" || chosen !== null || timeLeft <= 0) return;
    const id = setTimeout(()=>setTimeLeft(t=>t-1), 1000);
    return ()=>clearTimeout(id);
  }, [timeLeft, phase, chosen]);

  // Timeout auto-pick
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{ if(phase==="play"&&chosen===null&&timeLeft===0) pick(null); },[timeLeft]);

  function pick(idx) {
    if (chosen!==null||selectingRef.current) return;
    selectingRef.current = true;
    const ms = Math.min(Date.now()-qStartRef.current, Q_TIME*1000);
    const q  = questions[qi];
    const ok = idx!==null && idx===q.correctIndex;
    setChosen(idx===null?-1:idx);
    const ans = { chosen:idx, correct:ok, timeMs:ms, score:scoreFor(ok,ms,Q_TIME) };
    setTimeout(()=>{
      const next = [...answers, ans];
      if (qi+1<questions.length) { setAnswers(next); setQi(q=>q+1); setChosen(null); }
      else                       { setAnswers(next); finish(next); }
    }, 1400);
  }

  async function finish(all) {
    setPhase("done");
    const score   = all.reduce((s,a)=>s+a.score, 0);
    const correct = all.filter(a=>a.correct).length;
    const ms      = all.reduce((s,a)=>s+a.timeMs, 0);
    const result  = { score, correct, total:all.length, timeMs:ms };
    localStorage.setItem(lsKey, JSON.stringify(result));
    setPlayedToday(result);
    const newStreak = bumpStreak();
    setStreak(newStreak);
    setBoard({});
    try { await submitScore({ username:username.trim(), ...result, streak:newStreak, category }); }
    catch(e){ console.error("submitScore:",e); }
  }

  async function startQuiz() {
    const name = username.trim();
    if (!name||name.length<2)  { setNameErr("En az 2 karakter gir."); return; }
    if (name.length>20)        { setNameErr("En fazla 20 karakter."); return; }
    if (hasProfanity(name))    { setNameErr("Uygunsuz kelime içeriyor."); return; }
    setNameErr("");
    localStorage.setItem("quiz_username",name);
    setEditingName(false);
    setLoading(true);
    try {
      const qs = category === "bayraklar"
        ? await getDailyFlagQuestions()
        : await getDailyQuestions(Q_COUNT);
      if (!qs.length) { setNameErr("Henüz soru yüklenmemiş."); setLoading(false); return; }
      setQuestions(qs); setQi(0); setAnswers([]); setChosen(null);
      setPhase("play");
    } catch(e) {
      console.error("getDailyQuestions:", e);
      const msg = e?.code==="permission-denied"
        ? "Erişim reddedildi — Firestore kurallarını kontrol et."
        : "Bağlantı hatası. Tekrar dene.";
      setNameErr(msg);
    }
    setLoading(false);
  }

  if (playedToday===undefined) return null;

  const q   = questions[qi];
  const pct = (timeLeft/Q_TIME)*100;
  const badge = badgeFor(streak);

  return (
    <div className="screen">
      <div className="terminal">

        {/* header */}
        <div className="qz-header">
          <button className="qz-back" onClick={()=>navigate("/quiz")}>← geri</button>
          <span className="qz-title">quiz</span>
          <div className="qz-header-right">
            <span className="qz-sub">
              {new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"long"})}
            </span>
            <Link to="/" className="qz-home-link">ana sayfa</Link>
          </div>
        </div>

        {/* ── NAME ── */}
        {phase==="name" && (
          <div className="qz-name-phase">
            {streak>0 && (
              <div className="qz-streak-banner">
                {badge ? `${badge.icon} ${badge.label}` : `🔥 ${streak} günlük serin var`}
              </div>
            )}
            <p className="qz-desc">{meta.desc}</p>
            <div className="qz-field">
              <label className="qz-label">takma adın</label>
              {editingName || !username ? (
                <input
                  className="qz-input"
                  type="text"
                  value={username}
                  onChange={e=>{setUsername(e.target.value);setNameErr("");}}
                  onKeyDown={e=>e.key==="Enter"&&startQuiz()}
                  placeholder="…"
                  maxLength={20}
                  autoFocus
                />
              ) : (
                <div className="qz-saved-name">
                  <span>{username}</span>
                  <button className="qz-link" type="button" onClick={()=>setEditingName(true)}>değiştir</button>
                </div>
              )}
              {nameErr && <p className="qz-err">{nameErr}</p>}
            </div>
            <div className="qz-actions">
              <button className="qz-btn" onClick={startQuiz} disabled={loading}>
                {loading?"yükleniyor…":"başla →"}
              </button>
              <button className="qz-link" onClick={()=>{setBoardTab("daily");setPhase("board");}}>
                skor tablosu
              </button>
            </div>
          </div>
        )}

        {/* ── PLAY ── */}
        {phase==="play" && q && (
          <div className="qz-play">
            <div className="qz-meta">
              <span>{qi+1}/{questions.length}</span>
              <span className={`qz-timer${timeLeft<=5?" qz-timer-red":""}`}>{timeLeft}</span>
            </div>
            <div className="qz-bar">
              <div className="qz-bar-fill" style={{width:`${pct}%`,background:timeLeft<=5?"#e57373":"var(--accent)"}}/>
            </div>
            {q.flagUrl && (
              <img className="qz-flag" src={q.flagUrl} alt="bayrak" loading="eager" />
            )}
            <p className="qz-q">{q.question || "Bu bayrak hangi ülkeye ait?"}</p>
            <div className="qz-opts">
              {q.options.map((opt,i)=>{
                let c="qz-opt";
                if (chosen!==null) {
                  if (i===q.correctIndex)  c+=" qz-opt-ok";
                  else if (i===chosen)     c+=" qz-opt-wrong";
                  else                     c+=" qz-opt-dim";
                }
                return (
                  <button key={i} className={c} onClick={()=>pick(i)} disabled={chosen!==null}>
                    <span className="qz-letter">{LETTERS[i]}</span>{opt}
                  </button>
                );
              })}
            </div>
            {chosen!==null && (
              <div className="qz-feedback">
                {chosen===-1 && <span className="qz-timeout">süre doldu · doğru: {q.options[q.correctIndex]}</span>}
                {q.fact && <span className="qz-fact">{q.fact}</span>}
              </div>
            )}
          </div>
        )}

        {/* ── DONE ── */}
        {phase==="done" && (()=>{
          const ok = answers.filter(a=>a.correct).length;
          const sc = answers.reduce((s,a)=>s+a.score, 0);
          const ms = answers.reduce((s,a)=>s+a.timeMs, 0);
          const newBadge = badgeFor(streak);
          return (
            <div className="qz-done">
              <p className="qz-score">{sc}<span className="qz-max">/{questions.length*150}</span></p>
              <p className="qz-stats">{ok} doğru · {answers.length-ok} yanlış · {fmtTime(ms)}</p>

              {/* streak */}
              <div className="qz-streak-done">
                {newBadge
                  ? <><span className="qz-badge-icon">{newBadge.icon}</span><span>{newBadge.label} · {streak} günlük seri</span></>
                  : <><span>🔥</span><span>{streak} günlük seri</span></>
                }
              </div>
              <p className="qz-comeback">Yarın tekrar gel, serini koru!</p>

              <div className="qz-summary">
                {answers.map((a,i)=>(
                  <div key={i} className={`qz-row ${a.correct?"qz-row-ok":"qz-row-wrong"}`}>
                    <span>{a.correct?"✓":"✗"}</span>
                    <span className="qz-row-q">
                      {questions[i]?.flagUrl
                        ? <><img className="qz-flag-sm" src={questions[i].flagUrl} alt=""/>{" "}{questions[i].options[questions[i].correctIndex]}</>
                        : questions[i]?.question
                      }
                    </span>
                    <span>+{a.score}</span>
                  </div>
                ))}
              </div>
              <button className="qz-btn" style={{marginTop:20}} onClick={()=>{setBoardTab("daily");setPhase("board");}}>
                skor tablosu →
              </button>
            </div>
          );
        })()}

        {/* ── BOARD ── */}
        {phase==="board" && (
          <div className="qz-board">
            {playedToday && (
              <div className="qz-today">
                <div>
                  bugünkü puanın: <strong>{playedToday.score}</strong>
                  <span className="qz-today-ratio"> · {playedToday.correct}/{playedToday.total} doğru</span>
                </div>
                {streak>0 && (
                  <div className="qz-today-streak">
                    {badge ? `${badge.icon} ${badge.label}` : `🔥 ${streak} gün`}
                    {" · Yarın tekrar gel!"}
                  </div>
                )}
              </div>
            )}
            <div className="qz-tabs">
              {TABS.map(([k,l])=>(
                <button key={k} className={`qz-tab${boardTab===k?" qz-tab-on":""}`} onClick={()=>setBoardTab(k)}>{l}</button>
              ))}
            </div>
            <div className="qz-list">
              {boardLoading||board[boardTab]===undefined ? (
                <p className="qz-empty">yükleniyor…</p>
              ) : board[boardTab].length===0 ? (
                <p className="qz-empty">henüz kayıt yok.</p>
              ) : (<>
                {boardTab==="daily"
                  ? <div className="qz-list-head"><span>#</span><span>kullanıcı</span><span>puan</span><span>d/y</span></div>
                  : <div className="qz-list-head"><span>#</span><span>kullanıcı</span><span>toplam</span><span>oynama</span></div>
                }
                {board[boardTab].map((r,i)=>(
                  <div key={i} className={`qz-list-row${r.username===username?" qz-list-me":""}`}>
                    <span className="qz-rank">{i===0?"·1·":i===1?"·2·":i===2?"·3·":i+1}</span>
                    <span className="qz-uname">{r.username}</span>
                    <span className="qz-pts">{r.score}</span>
                    {boardTab==="daily"
                      ? <span className="qz-ratio">{r.correct}/{r.total}</span>
                      : <span className="qz-ratio">{r.plays}x</span>
                    }
                  </div>
                ))}
              </>)}
            </div>
            {!playedToday && (
              <button className="qz-btn" style={{marginTop:20}} onClick={()=>setPhase("name")}>
                quize katıl →
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
