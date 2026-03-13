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
    _questionsCache.data = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.id < b.id ? -1 : 1)); // stabil sıralama
  }
  const today = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const seed =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  return seededShuffle(_questionsCache.data, seed).slice(0, count);
}

const _flagCache    = { data: null };
const _categoryCache = {};

// ID'ye göre sırala — yeni soru eklenince aynı günün seçimi değişmez
function sortById(arr) {
  return [...arr].sort((a, b) => (a.id < b.id ? -1 : 1));
}

// Dağılım: 1 kolay · 3 orta · 2 orta-zor · 2 zor · 2 çok zor = 10
function pickByDifficulty(all, seed) {
  const easy       = sortById(all.filter((q) => q.difficulty === "easy"));
  const medium     = sortById(all.filter((q) => q.difficulty === "medium"));
  const mediumHard = sortById(all.filter((q) => q.difficulty === "medium_hard"));
  const hard       = sortById(all.filter((q) => q.difficulty === "hard"));
  const veryHard   = sortById(all.filter((q) => q.difficulty === "very_hard"));

  const hasDiff = easy.length + medium.length + mediumHard.length + hard.length + veryHard.length > 0;
  if (!hasDiff) return seededShuffle(sortById(all), seed).slice(0, 10);

  const picked = [
    ...seededShuffle(easy,       seed    ).slice(0, Math.min(1, easy.length)),
    ...seededShuffle(medium,     seed + 1).slice(0, Math.min(3, medium.length)),
    ...seededShuffle(mediumHard, seed + 2).slice(0, Math.min(2, mediumHard.length)),
    ...seededShuffle(hard,       seed + 3).slice(0, Math.min(2, hard.length)),
    ...seededShuffle(veryHard,   seed + 4).slice(0, Math.min(2, veryHard.length)),
  ];
  return seededShuffle(picked, seed + 5);
}

export async function getDailyCategoryQuestions(category) {
  if (!_categoryCache[category]) {
    const snap = await getDocs(
      query(collection(db, "quiz_questions"), where("category", "==", category))
    );
    _categoryCache[category] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  const today = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const seed  =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  return pickByDifficulty(_categoryCache[category], seed);
}

export async function getDailyFlagQuestions() {
  if (!_flagCache.data) {
    const snap = await getDocs(
      query(collection(db, "quiz_questions"), where("category", "==", "bayraklar"))
    );
    _flagCache.data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  const today = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const seed  =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  return pickByDifficulty(_flagCache.data, seed);
}

// UTC+3 (Türkiye) bazlı tarih anahtarı
function dateKeyTR() {
  return new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

// Bu haftanın Pazartesi günü (UTC+3)
function weekCutoffTR() {
  const nowUTC3 = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const day = nowUTC3.getUTCDay(); // 0=Paz, 1=Pzt...
  const daysFromMonday = day === 0 ? 6 : day - 1;
  return new Date(+nowUTC3 - daysFromMonday * 86400000).toISOString().slice(0, 10);
}

// Bu yılın 1 Ocak tarihi (UTC+3)
function yearCutoffTR() {
  const year = new Date(Date.now() + 3 * 60 * 60 * 1000).getUTCFullYear();
  return `${year}-01-01`;
}

// ── Quiz: Today's unique participant count ────────────────────────────────────
export async function getDailyParticipantCount(category = "genel-kultur") {
  const todayStr = dateKeyTR();
  const q = query(
    collection(db, "quiz_scores"),
    where("category", "==", category),
    where("dateKey", "==", todayStr)
  );
  const snap = await getDocs(q);
  const usernames = new Set(snap.docs.map((d) => d.data().username));
  return usernames.size;
}

// ── Quiz: Submit score ────────────────────────────────────────────────────────
export async function submitScore({ username, score, correct, total, timeMs, category = "genel-kultur" }) {
  const dateKey = dateKeyTR();
  return addDoc(collection(db, "quiz_scores"), {
    username,
    score,
    correct,
    total,
    timeMs,
    dateKey,
    category,
    createdAt: serverTimestamp(),
  });
}

// ── Quiz: Leaderboard ─────────────────────────────────────────────────────────
export async function getLeaderboard(period, category = "genel-kultur") {
  const todayStr = dateKeyTR();

  let q;
  if (period === "daily") {
    q = query(
      collection(db, "quiz_scores"),
      where("category", "==", category),
      where("dateKey", "==", todayStr)
    );
  } else if (period === "weekly") {
    q = query(
      collection(db, "quiz_scores"),
      where("category", "==", category),
      where("dateKey", ">=", weekCutoffTR())
    );
  } else {
    // alltime — no date filter
    q = query(
      collection(db, "quiz_scores"),
      where("category", "==", category)
    );
  }

  const snap = await getDocs(q);
  const raw = snap.docs.map((d) => d.data());

  if (period === "daily") {
    const uniqueCount = new Set(raw.map((r) => r.username)).size;
    raw.sort((a, b) => b.score - a.score);
    return { rows: raw.slice(0, 10), uniqueCount };
  }

  // weekly / alltime: aggregate per username
  const byUser = {};
  for (const s of raw) {
    const u = s.username;
    if (!byUser[u]) byUser[u] = { username: u, score: 0, correct: 0, total: 0, plays: 0 };
    byUser[u].score   += s.score;
    byUser[u].correct += s.correct;
    byUser[u].total   += s.total;
    byUser[u].plays   += 1;
  }
  const agg = Object.values(byUser);
  agg.sort((a, b) => b.score - a.score);
  return { rows: agg.slice(0, 10), uniqueCount: agg.length };
}
