import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function TerminalActions() {
  const [showPanel, setShowPanel] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="floating-actions" ref={wrapRef}>
      {showPanel && (
        <div className="settings-panel">
          <Link to="/quiz" className="settings-link" onClick={() => setShowPanel(false)}>
            <span className="settings-icon">🧩</span>
            Günlük Quiz
          </Link>
          <Link to="/makaleler" className="settings-link" onClick={() => setShowPanel(false)}>
            <span className="settings-icon">📖</span>
            Makaleler
          </Link>

          <div className="settings-divider" />

          <a
            href="https://x.com/caddyoglu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="settings-icon">𝕏</span>
            @caddyoglu
          </a>
          <a
            href="https://www.losev.org.tr/bagis"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="settings-icon">🎗️</span>
            LÖSEV'e bağış yap
          </a>
          <Link to="/gizlilik" className="settings-link" onClick={() => setShowPanel(false)}>
            <span className="settings-icon">🔒</span>
            Gizlilik Politikası
          </Link>
        </div>
      )}

      <button
        className={`settings-btn${showPanel ? " settings-btn-active" : ""}`}
        onClick={() => setShowPanel((s) => !s)}
        title="Menü"
      >
        ⚙
      </button>
    </div>
  );
}
