import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler() {
  const date = new Date();

  const today = date
    .toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
    })
    .toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#f4f1ea",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 72, letterSpacing: "2px" }}>{today}</div>

        <div style={{ fontSize: 28, marginTop: 16 }}>Bugün Tarihte</div>

        <div style={{ fontSize: 18, marginTop: 40, opacity: 0.6 }}>
          bugununtarihi.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
