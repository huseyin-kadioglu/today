import { useEffect, useRef } from "react";

const CLIENT = "ca-pub-1819018957701650";

/**
 * Kullanım:
 *   <AdUnit slot="1234567890" />
 *
 * slot: AdSense panelinden aldığın reklam birimi ID'si.
 * AdSense onayı geldikten sonra panelden "Reklam birimi oluştur" → ID'yi buraya yaz.
 */
export default function AdUnit({ slot, style }) {
  const pushed = useRef(false);
  const consent = localStorage.getItem("cookie_consent");

  useEffect(() => {
    if (consent !== "accepted") return;
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  }, [consent]);

  if (consent !== "accepted") return null;

  return (
    <div className="ad-unit" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
