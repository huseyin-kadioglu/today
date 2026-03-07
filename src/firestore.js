import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// ── In-memory cache ───────────────────────────────────────────────────────────
const _eventsCache = {};
const _birthsDeathsCache = {};
const _questionsCache = { data: null };

// ── Events ────────────────────────────────────────────────────────────────────
export async function getEvents(date) {
  if (_eventsCache[date]) return _eventsCache[date];
  const q = query(collection(db, "events"), where("date", "==", date));
  const snap = await getDocs(q);
  const events = snap.docs.map((d) => d.data()).sort((a, b) => a.year - b.year);
  _eventsCache[date] = events;
  return events;
}

// ── Births & Deaths ───────────────────────────────────────────────────────────
export async function getBirthsDeaths(date) {
  if (_birthsDeathsCache[date]) return _birthsDeathsCache[date];
  const q = query(collection(db, "birthsDeaths"), where("date", "==", date));
  const snap = await getDocs(q);
  const events = snap.docs.map((d) => d.data()).sort((a, b) => a.year - b.year);
  _birthsDeathsCache[date] = events;
  return events;
}

// ── Quiz: Seeded daily question selection ─────────────────────────────────────
function seededRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function seededShuffle(arr, seed) {
  const rng = seededRng(seed);
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function getDailyQuestions(count = 10) {
  if (!_questionsCache.data) {
    const snap = await getDocs(collection(db, "quiz_questions"));
    _questionsCache.data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  return seededShuffle(_questionsCache.data, seed).slice(0, count);
}

// ── Quiz: Submit score ────────────────────────────────────────────────────────
export async function submitScore({ username, score, correct, total, timeMs }) {
  const dateKey = new Date().toISOString().slice(0, 10);
  return addDoc(collection(db, "quiz_scores"), {
    username,
    score,
    correct,
    total,
    timeMs,
    dateKey,
    createdAt: serverTimestamp(),
  });
}

// ── Quiz: Leaderboard ─────────────────────────────────────────────────────────
export async function getLeaderboard(period) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  let q;
  if (period === "daily") {
    q = query(
      collection(db, "quiz_scores"),
      where("dateKey", "==", todayStr)
    );
  } else {
    const days = period === "weekly" ? 7 : 365;
    const cutoff = new Date(now - days * 86400000).toISOString().slice(0, 10);
    q = query(
      collection(db, "quiz_scores"),
      where("dateKey", ">=", cutoff)
    );
  }

  const snap = await getDocs(q);
  const scores = snap.docs.map((d) => d.data());
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, 10);
}
