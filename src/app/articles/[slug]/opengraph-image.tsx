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

  return new ImageResponse(
    (
      <div
        style={{
          background: "#111010",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#f5f0e8",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Terekhin Digital
          </div>
          {category && (
            <div
              style={{
                color: "#a09880",
                fontSize: 14,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                border: "1px solid #a09880",
                padding: "4px 14px",
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            color: "#f5f0e8",
            fontSize: title.length > 60 ? 44 : 56,
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: 950,
          }}
        >
          {title}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #333",
            paddingTop: 20,
          }}
        >
          {author && (
            <div style={{ color: "#7a7060", fontSize: 16 }}>
              By {author}
            </div>
          )}
          <div
            style={{
              color: "#a09880",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginLeft: "auto",
            }}
          >
            terekhindigital.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
