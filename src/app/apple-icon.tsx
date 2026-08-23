import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default async function AppleIcon() {
  const playfair = await fetch(
    "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTnohkk7zvvs.woff2",
  ).then((r) => r.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* thin top rule */}
        <div style={{ width: 100, height: 2, background: "#f4f0e8", marginBottom: 8, display: "flex" }} />

        {/* monogram */}
        <div
          style={{
            color: "#f4f0e8",
            fontSize: 88,
            fontWeight: 900,
            fontFamily: "'Playfair Display'",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          T
        </div>

        {/* thin bottom rule */}
        <div style={{ width: 100, height: 2, background: "#f4f0e8", marginTop: 8, display: "flex" }} />

        {/* TDM label */}
        <div
          style={{
            color: "#f4f0e8",
            fontSize: 13,
            fontFamily: "'Playfair Display'",
            letterSpacing: "0.25em",
            marginTop: 10,
            opacity: 0.7,
            display: "flex",
          }}
        >
          TDM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair Display", data: playfair, weight: 900 }],
    },
  )
}
