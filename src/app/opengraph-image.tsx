import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const alt = "Terekhin Digital Media — MarTech · Startups · LLMs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
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
          padding: "0 80px",
        }}
      >
        <div style={{ color: "#f4f0e8", fontSize: 86, fontWeight: 700, textAlign: "center" }}>
          Terekhin Digital Media
        </div>
        <div style={{ color: "#9a8f7a", fontSize: 20, marginTop: 24, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          MarTech · Startups · LLMs · Venture
        </div>
        <div style={{ color: "#9a8f7a", fontSize: 14, marginTop: 16 }}>
          terekhindigital.com
        </div>
      </div>
    ),
    { ...size }
  )
}
