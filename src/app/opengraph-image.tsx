import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Terekhin Digital Media — MarTech · Startups · LLMs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const playfair = await fetch(
    "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2"
  ).then((r) => r.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f4f0e8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Playfair, Georgia, serif",
        }}
      >
        {/* Top black ribbon */}
        <div
          style={{
            background: "#0a0a0a",
            color: "#f4f0e8",
            fontSize: 15,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "10px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Est. MMXXV — Independent Digital Press</span>
          <span>Morning Edition</span>
          <span>Vol. I</span>
        </div>

        {/* Sub-rule */}
        <div style={{ background: "#0a0a0a", height: 1, margin: "0 0" }} />

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
          {/* Thin rule */}
          <div style={{ width: "100%", height: 1, background: "#0a0a0a", marginBottom: 20 }} />

          {/* Publication name */}
          <div
            style={{
              color: "#0a0a0a",
              fontSize: 100,
              fontWeight: 900,
              letterSpacing: "0.01em",
              textAlign: "center",
              lineHeight: 1,
              fontFamily: "Playfair, Georgia, serif",
            }}
          >
            Terekhin Digital Media
          </div>

          {/* Double rule */}
          <div style={{ width: "100%", marginTop: 16, marginBottom: 8, display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ height: 3, background: "#0a0a0a" }} />
            <div style={{ height: 1, background: "#0a0a0a" }} />
          </div>

          {/* Tagline */}
          <div
            style={{
              color: "#4a4a4a",
              fontSize: 20,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 6,
              fontFamily: "Playfair, Georgia, serif",
            }}
          >
            Rigorous Journalism at the Frontier of Digital Commerce &amp; Machine Intelligence
          </div>

          {/* Ornament */}
          <div style={{ fontSize: 28, color: "#0a0a0a", marginTop: 18, letterSpacing: "0.4em" }}>
            ✦ ✦ ✦
          </div>

          {/* Thin rule */}
          <div style={{ width: "100%", height: 1, background: "#0a0a0a", marginTop: 18 }} />
        </div>

        {/* Bottom black bar */}
        <div
          style={{
            background: "#0a0a0a",
            color: "#f4f0e8",
            fontSize: 13,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            padding: "9px 48px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>MarTech</span>
          <span>·</span>
          <span>Startups &amp; Venture</span>
          <span>·</span>
          <span>Large Language Models</span>
          <span>·</span>
          <span>Digital Strategy</span>
          <span>·</span>
          <span>terekhindigital.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair", data: playfair, style: "normal", weight: 900 }],
    }
  )
}
