import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// ── In-memory cache (sayfa geçişlerinde tekrar fetch yapılmasın) ──────────────
const _eventsCache = {};
const _birthsDeathsCache = {};

// ── Events (Sheet1 → Firestore: events) ──────────────────────────────────────
// date format: "DDMM" → örn. "0503" = 5 Mart
export async function getEvents(date) {
  if (_eventsCache[date]) return _eventsCache[date];

  const q = query(collection(db, "events"), where("date", "==", date));
  const snap = await getDocs(q);
  const events = snap.docs
    .map((d) => d.data())
    .sort((a, b) => a.year - b.year);

  _eventsCache[date] = events;
  return events;
}

// ── Births & Deaths (dogumlar-olumler → Firestore: birthsDeaths) ─────────────
export async function getBirthsDeaths(date) {
  if (_birthsDeathsCache[date]) return _birthsDeathsCache[date];

  const q = query(collection(db, "birthsDeaths"), where("date", "==", date));
  const snap = await getDocs(q);
  const events = snap.docs
    .map((d) => d.data())
    .sort((a, b) => a.year - b.year);

  _birthsDeathsCache[date] = events;
  return events;
}

// ── Quiz Questions ────────────────────────────────────────────────────────────
export async function getQuizQuestions() {
  const snap = await getDocs(collection(db, "quiz"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── Quiz Scores ───────────────────────────────────────────────────────────────
// dateSeed: YYYYMMDD string — aynı günde oynayan herkes karşılaştırılır
export async function submitQuizScore({ score, total, nickname, dateSeed }) {
  return addDoc(collection(db, "quizScores"), {
    score,
    total,
    nickname: nickname || "Anonim",
    date: String(dateSeed),
    timestamp: serverTimestamp(),
  });
}

// Günün tüm skorlarını çeker, en yüksekten sıralar
// Dönüş: { totalPlayers, rank, scores[] }
export async function getQuizStats(dateSeed, myScore) {
  const q = query(
    collection(db, "quizScores"),
    where("date", "==", String(dateSeed)),
    orderBy("score", "desc")
  );
  const snap = await getDocs(q);
  const scores = snap.docs.map((d) => d.data());
  const totalPlayers = scores.length;
  const rank = scores.filter((s) => s.score > myScore).length + 1;

  return { totalPlayers, rank, scores };
}
