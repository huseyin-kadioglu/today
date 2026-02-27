import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function TerminalActions({ lang, onToggleLang }) {
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
          <div className="settings-lang">
            <button
              className={`lang-btn${lang === "tr" ? " lang-active" : ""}`}
              onClick={() => lang !== "tr" && onToggleLang()}
            >
              TR
            </button>
            <span className="lang-sep">|</span>
            <button
              className={`lang-btn${lang === "en" ? " lang-active" : ""}`}
              onClick={() => lang !== "en" && onToggleLang()}
            >
              EN
            </button>
          </div>

          <div className="settings-divider" />

          <Link to="/quiz">
            <span className="settings-icon">📜</span>
            Tarih Quizi
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
        </div>
      )}

      <button
        className={`settings-btn${showPanel ? " settings-btn-active" : ""}`}
        onClick={() => setShowPanel((s) => !s)}
        title="Ayarlar"
      >
        ⚙
      </button>
    </div>
  );
}
