import React from "react";
import { useNavigate, Link } from "react-router-dom";


const CATEGORIES = [
  {
    id: "genel-kultur",
    title: "Genel Kültür",
    desc: "10 soru · 25 saniye · günde 1 hak",
    icon: "🧩",
    href: "/quiz/genel-kultur",
    active: true,
  },
  {
    id: "bayraklar",
    title: "Ülke Bayrakları",
    desc: "10 bayrak · 25 saniye · günde 1 hak",
    icon: "🌍",
    href: "/quiz/bayraklar",
    active: true,
  },
  {
    id: "baskentler",
    title: "Başkentler",
    desc: "10 soru · 25 saniye · günde 1 hak",
    icon: "🏛️",
    href: "/quiz/baskentler",
    active: true,
  },
];

export default function QuizHub() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="terminal">
        <div className="qz-header">
          <Link className="qz-back" to="/">← ana sayfa</Link>
          <span className="qz-title">quiz</span>
          <span className="qz-sub">kategori seç</span>
        </div>

        <div className="qh-grid">
          {CATEGORIES.map((cat) =>
            cat.active ? (
              <Link key={cat.id} to={cat.href} className="qh-card">
                <span className="qh-icon">{cat.icon}</span>
                <span className="qh-name">{cat.title}</span>
                <span className="qh-desc">{cat.desc}</span>
                <span className="qh-arrow">→</span>
              </Link>
            ) : (
              <div key={cat.id} className="qh-card qh-card-soon">
                <span className="qh-badge">yakında</span>
                <span className="qh-icon">{cat.icon}</span>
                <span className="qh-name">{cat.title}</span>
                <span className="qh-desc">{cat.desc}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
