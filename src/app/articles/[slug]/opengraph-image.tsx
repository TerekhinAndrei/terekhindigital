import { ImageResponse } from "next/og"
import { playfairB64 } from "@/lib/og-font"
import { fetchArticle } from "@/lib/api"
import { getArticleBySlug } from "@/lib/seed"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

function b64ToArrayBuffer(b64: string): ArrayBuffer {
  const binaryStr = atob(b64)
  const bytes = new Uint8Array(binaryStr.length)
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i)
  }
  return bytes.buffer
}

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

  const fontData = b64ToArrayBuffer(playfairB64)
  const titleSize = title.length > 80 ? 42 : title.length > 50 ? 52 : 62

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Playfair, Georgia, serif",
          padding: "44px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#9a8f7a",
            fontSize: 13,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          <span>Terekhin Digital Media</span>
          <span>Est. MMXXV</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 28 }}>
          <div style={{ height: 3, background: "#f4f0e8" }} />
          <div style={{ height: 1, background: "#f4f0e8", opacity: 0.35 }} />
        </div>

        {category ? (
          <div style={{ color: "#9a8f7a", fontSize: 14, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 18 }}>
            {category}
          </div>
        ) : null}

        <div style={{ color: "#f4f0e8", fontSize: titleSize, fontWeight: 700, lineHeight: 1.2, flex: 1 }}>
          {title}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 18 }}>
            <div style={{ height: 1, background: "#f4f0e8", opacity: 0.35 }} />
            <div style={{ height: 3, background: "#f4f0e8" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#9a8f7a",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {author ? <span>By {author}</span> : <span />}
            <span>terekhindigital.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair", data: fontData, style: "normal", weight: 700 }],
    }
  )
}
