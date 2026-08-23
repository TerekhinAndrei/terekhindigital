import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Terekhin Digital Media"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const playfair = await fetch(
    "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTnohkk7zvvs.woff2",
  ).then((r) => r.arrayBuffer())

  const oldStandard = await fetch(
    "https://fonts.gstatic.com/s/oldstandardtt/v20/MwQubh3o1vLImiwAVvYawgcf2eVurQ.woff2",
  ).then((r) => r.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#f4f0e8",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* top black bar */}
        <div style={{ background: "#0a0a0a", height: 8, width: "100%", display: "flex" }} />

        {/* header area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px 80px 32px",
            flex: 1,
            borderBottom: "3px double #0a0a0a",
          }}
        >
          {/* meta row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontFamily: "'Old Standard TT'",
              fontSize: 15,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4a4a4a",
              borderBottom: "1px solid #0a0a0a",
              paddingBottom: 10,
              marginBottom: 28,
            }}
          >
            <span>MarTech · Startups · LLMs</span>
            <span>terekhindigital.com</span>
            <span>Independent Digital Press</span>
          </div>

          {/* masthead */}
          <div
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: 96,
              color: "#0a0a0a",
              letterSpacing: "-0.01em",
              textAlign: "center",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Terekhin Digital Media
          </div>

          {/* tagline */}
          <div
            style={{
              fontFamily: "'Old Standard TT'",
              fontSize: 18,
              letterSpacing: "0.22em",
              color: "#4a4a4a",
              marginTop: 18,
              textTransform: "uppercase",
            }}
          >
            Rigorous Journalism at the Frontier of Digital Commerce &amp; Machine Intelligence
          </div>
        </div>

        {/* category pills row */}
        <div
          style={{
            background: "#0a0a0a",
            display: "flex",
            justifyContent: "center",
            gap: 0,
            padding: "0",
          }}
        >
          {["MarTech", "Startups", "LLMs & AI", "Venture", "Opinion"].map((cat) => (
            <div
              key={cat}
              style={{
                color: "#f4f0e8",
                fontFamily: "'Old Standard TT'",
                fontSize: 16,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "12px 36px",
                borderRight: "1px solid #444",
                display: "flex",
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* bottom rule */}
        <div style={{ background: "#0a0a0a", height: 4, width: "100%", display: "flex" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: playfair, weight: 900 },
        { name: "Old Standard TT", data: oldStandard, weight: 400 },
      ],
    },
  )
}
