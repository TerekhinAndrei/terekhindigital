import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Terekhin Digital Media — MarTech · Startups · LLMs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111010",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          borderTop: "6px solid #f5f0e8",
        }}
      >
        <div
          style={{
            color: "#f5f0e8",
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          Terekhin Digital
        </div>
        <div
          style={{
            color: "#a09880",
            fontSize: 22,
            marginTop: 24,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          MarTech · Startups · LLMs
        </div>
        <div
          style={{
            width: 60,
            height: 2,
            background: "#a09880",
            marginTop: 28,
            marginBottom: 28,
          }}
        />
        <div
          style={{
            color: "#7a7060",
            fontSize: 18,
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Independent long-form journalism at the frontier of marketing technology, venture-backed startups, and large language models.
        </div>
      </div>
    ),
    { ...size }
  )
}
