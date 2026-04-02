import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ENSO JOURNAL — やったことが、勝手に日記になる";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {/* ロゴ 160x160 — 円相 + 3本線グラデーション */}
        <svg
          width={160}
          height={160}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            stroke="#ededed"
            strokeWidth="5"
            fill="none"
            opacity="0.9"
          />
          <line x1="38" y1="42" x2="62" y2="42" stroke="#ededed" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <line x1="38" y1="50" x2="62" y2="50" stroke="#ededed" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <line x1="38" y1="58" x2="62" y2="58" stroke="#ededed" strokeWidth="3" strokeLinecap="round" opacity="1" />
        </svg>

        {/* アプリ名 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: "#ededed",
            letterSpacing: "0.05em",
          }}
        >
          ENSO JOURNAL
        </div>

        {/* タグライン */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          やったことが、勝手に日記になる
        </div>
      </div>
    ),
    { ...size }
  );
}
