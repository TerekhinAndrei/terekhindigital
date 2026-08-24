import { ImageResponse } from "next/og"
import { fetchArticle } from "@/lib/api"
import { getArticleBySlug } from "@/lib/seed"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const liveArticle = await fetchArticle(slug)
  const article = liveArticle ?? getArticleBySlug(slug)

  const title = article?.title ?? "Terekhin Digital Media"
  const category = article?.category ?? ""
  const author = article?.author ?? ""

  const playfair = await fetch(
    "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2"
  ).then((r) => r.arrayBuffer())

  const titleSize = title.length > 80 ? 44 : title.length > 50 ? 54 : 64

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
        {/* Top ribbon */}
        <div
          style={{
            background: "#0a0a0a",
            color: "#f4f0e8",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "8px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Terekhin Digital Media</span>
          <span>Est. MMXXV — Independent Digital Press</span>
          <span>Morning Edition</span>
        </div>

        {/* Article content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "36px 60px 28px",
          }}
        >
          {/* Top rule */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 24 }}>
            <div style={{ height: 3, background: "#0a0a0a" }} />
            <div style={{ height: 1, background: "#0a0a0a" }} />
          </div>

          {/* Category kicker */}
          {category && (
            <div
              style={{
                color: "#4a4a4a",
                fontSize: 15,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontFamily: "Playfair, Georgia, serif",
              }}
            >
              {category}
            </div>
          )}

          {/* Article title */}
          <div
            style={{
              color: "#0a0a0a",
              fontSize: titleSize,
              fontWeight: 900,
              lineHeight: 1.15,
              fontFamily: "Playfair, Georgia, serif",
              flex: 1,
            }}
          >
            {title}
          </div>

          {/* Bottom rule + byline */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 16 }}>
              <div style={{ height: 1, background: "#0a0a0a" }} />
              <div style={{ height: 3, background: "#0a0a0a" }} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#4a4a4a",
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {author ? <span>By {author}</span> : <span />}
              <span style={{ letterSpacing: "0.2em" }}>terekhindigital.com</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair", data: playfair, style: "normal", weight: 900 }],
    }
  )
}
