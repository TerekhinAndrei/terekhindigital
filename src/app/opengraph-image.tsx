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
          background: "#f4f0e8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top black ribbon */}
        <div
          style={{
            background: "#0a0a0a",
            color: "#f4f0e8",
            fontSize: 15,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "10px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Est. MMXXV</span>
          <span>Independent Digital Press</span>
          <span>Morning Edition</span>
        </div>

        {/* Masthead area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
          }}
        >
          <div style={{ width: "100%", height: 1, background: "#0a0a0a", marginBottom: 22 }} />

          <div
            style={{
              color: "#0a0a0a",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "0.01em",
              textAlign: "center",
              lineHeight: 1,
              fontFamily: "Georgia, serif",
            }}
          >
            Terekhin Digital Media
          </div>

          <div style={{ width: "100%", marginTop: 18, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ height: 3, background: "#0a0a0a" }} />
            <div style={{ height: 1, background: "#0a0a0a" }} />
          </div>

          <div
            style={{
              color: "#4a4a4a",
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 16,
              fontFamily: "Georgia, serif",
            }}
          >
            Rigorous Journalism at the Frontier of Digital Commerce &amp; Machine Intelligence
          </div>

          <div style={{ fontSize: 26, color: "#0a0a0a", marginTop: 20, letterSpacing: "0.5em" }}>
            ✦ ✦ ✦
          </div>

          <div style={{ width: "100%", height: 1, background: "#0a0a0a", marginTop: 20 }} />
        </div>

        {/* Bottom black bar */}
        <div
          style={{
            background: "#0a0a0a",
            color: "#f4f0e8",
            fontSize: 13,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: "10px 48px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>MarTech</span>
          <span>Startups</span>
          <span>Large Language Models</span>
          <span>Digital Strategy</span>
          <span>terekhindigital.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
