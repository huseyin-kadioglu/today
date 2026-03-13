import { useState } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem("cookie_consent")
  );

  if (!visible) return null;

  const handle = (choice) => {
    localStorage.setItem("cookie_consent", choice);
    setVisible(false);
  };

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        Bu site deneyimi iyileştirmek ve reklam göstermek için çerez kullanır.{" "}
        <Link to="/gizlilik" className="cookie-link">
          Gizlilik Politikası
        </Link>
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn cookie-btn--accept" onClick={() => handle("accepted")}>
          Kabul Et
        </button>
        <button className="cookie-btn cookie-btn--reject" onClick={() => handle("rejected")}>
          Reddet
        </button>
      </div>
    </div>
  );
}
