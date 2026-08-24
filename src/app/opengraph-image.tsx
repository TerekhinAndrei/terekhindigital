import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const alt = "Terekhin Digital Media — MarTech · Startups · LLMs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  const playfair = readFileSync(join(process.cwd(), "public/fonts/playfair-700.woff2"))

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
          fontFamily: "Playfair, Georgia, serif",
          padding: "0 80px",
        }}
      >
        {/* Top triple rule */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5, marginBottom: 44 }}>
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.35 }} />
          <div style={{ height: 3, background: "#f4f0e8" }} />
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.35 }} />
        </div>

        {/* Overline */}
        <div
          style={{
            color: "#9a8f7a",
            fontSize: 14,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "Playfair, Georgia, serif",
          }}
        >
          Est. MMXXV — Independent Digital Press
        </div>

        {/* Publication name */}
        <div
          style={{
            color: "#f4f0e8",
            fontSize: 86,
            fontWeight: 700,
            lineHeight: 1,
            textAlign: "center",
            fontFamily: "Playfair, Georgia, serif",
          }}
        >
          Terekhin Digital Media
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#9a8f7a",
            fontSize: 19,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: 26,
            lineHeight: 1.6,
            fontFamily: "Playfair, Georgia, serif",
          }}
        >
          Rigorous Journalism at the Frontier of Digital Commerce &amp; Machine Intelligence
        </div>

        {/* Bottom triple rule */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5, marginTop: 44, marginBottom: 24 }}>
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.35 }} />
          <div style={{ height: 3, background: "#f4f0e8" }} />
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.35 }} />
        </div>

        {/* Sections row */}
        <div
          style={{
            display: "flex",
            gap: 28,
            color: "#f4f0e8",
            fontSize: 13,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.5,
            fontFamily: "Playfair, Georgia, serif",
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
    {
      ...size,
      fonts: [{ name: "Playfair", data: playfair, style: "normal", weight: 700 }],
    }
  )
}
