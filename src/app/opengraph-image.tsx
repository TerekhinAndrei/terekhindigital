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
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          padding: "0 80px",
        }}
      >
        {/* Top rule */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5, marginBottom: 40 }}>
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.4 }} />
          <div style={{ height: 3, background: "#f4f0e8" }} />
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.4 }} />
        </div>

        {/* Overline */}
        <div
          style={{
            color: "#a09070",
            fontSize: 14,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Est. MMXXV — Independent Digital Press
        </div>

        {/* Publication name */}
        <div
          style={{
            color: "#f4f0e8",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
            textAlign: "center",
            fontFamily: "Georgia, serif",
          }}
        >
          Terekhin Digital Media
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#a09070",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: 28,
            lineHeight: 1.5,
          }}
        >
          Rigorous Journalism at the Frontier of
        </div>
        <div
          style={{
            color: "#a09070",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Digital Commerce &amp; Machine Intelligence
        </div>

        {/* Bottom rule */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5, marginTop: 40, marginBottom: 28 }}>
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.4 }} />
          <div style={{ height: 3, background: "#f4f0e8" }} />
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.4 }} />
        </div>

        {/* Sections row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            color: "#f4f0e8",
            fontSize: 13,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          <span>MarTech</span>
          <span>|</span>
          <span>Startups</span>
          <span>|</span>
          <span>LLMs</span>
          <span>|</span>
          <span>Venture</span>
          <span>|</span>
          <span>terekhindigital.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
