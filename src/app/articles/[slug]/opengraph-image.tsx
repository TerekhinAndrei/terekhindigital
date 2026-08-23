import { ImageResponse } from "next/og"
import { getArticleBySlug } from "@/lib/seed"
import { fetchArticle } from "@/lib/api"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const liveArticle = await fetchArticle(slug).catch(() => null)
  const article = liveArticle ?? getArticleBySlug(slug)

  const playfair = await fetch(
    "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTnohkk7zvvs.woff2",
  ).then((r) => r.arrayBuffer())

  const oldStandard = await fetch(
    "https://fonts.gstatic.com/s/oldstandardtt/v20/MwQubh3o1vLImiwAVvYawgcf2eVurQ.woff2",
  ).then((r) => r.arrayBuffer())

  const title = article?.title ?? "Terekhin Digital Media"
  const teaser = article?.teaser ?? "Independent journalism on MarTech, Startups & LLMs"
  const category = article?.category ?? "Analysis"
  const author = article?.author ?? "Terekhin Digital Media"
  const date = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      })
    : ""

  // Truncate title for layout
  const shortTitle = title.length > 80 ? title.slice(0, 78) + "…" : title
  const shortTeaser = teaser ? (teaser.length > 120 ? teaser.slice(0, 118) + "…" : teaser) : ""

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#f4f0e8",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* top bar */}
        <div style={{ background: "#0a0a0a", height: 6, display: "flex" }} />

        {/* top meta strip */}
        <div
          style={{
            background: "#0a0a0a",
            color: "#f4f0e8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 60px",
            fontFamily: "'Old Standard TT'",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>Terekhin Digital Media</span>
          <span>terekhindigital.com</span>
          <span>{date}</span>
        </div>

        {/* main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            padding: "40px 60px 32px",
            gap: 48,
          }}
        >
          {/* left: article text */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRight: "1px solid #0a0a0a",
              paddingRight: 48,
            }}
          >
            {/* kicker */}
            <div
              style={{
                fontFamily: "'Old Standard TT'",
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#4a4a4a",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  background: "#0a0a0a",
                  color: "#f4f0e8",
                  padding: "2px 10px",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                }}
              >
                {category}
              </span>
              <span>{author}</span>
            </div>

            {/* headline */}
            <div
              style={{
                fontFamily: "'Playfair Display'",
                fontWeight: 900,
                fontSize: shortTitle.length > 60 ? 36 : 44,
                lineHeight: 1.12,
                color: "#0a0a0a",
                marginBottom: 20,
              }}
            >
              {shortTitle}
            </div>

            {/* teaser */}
            {shortTeaser && (
              <div
                style={{
                  fontFamily: "'Old Standard TT'",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#4a4a4a",
                  fontStyle: "italic",
                }}
              >
                {shortTeaser}
              </div>
            )}
          </div>

          {/* right: publication mark */}
          <div
            style={{
              width: 240,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 900,
                  fontSize: 22,
                  color: "#0a0a0a",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                  textAlign: "center",
                }}
              >
                Terekhin{"\n"}Digital{"\n"}Media
              </div>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "#0a0a0a",
                  display: "flex",
                }}
              />
              <div
                style={{
                  fontFamily: "'Old Standard TT'",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#4a4a4a",
                  textAlign: "center",
                }}
              >
                MarTech{"\n"}Startups{"\n"}LLMs
              </div>
            </div>

            {/* decorative ornament */}
            <div
              style={{
                fontFamily: "'Playfair Display'",
                fontSize: 48,
                color: "#0a0a0a",
                opacity: 0.12,
                display: "flex",
              }}
            >
              ✦
            </div>

            <div
              style={{
                fontFamily: "'Old Standard TT'",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4a4a4a",
                textAlign: "center",
              }}
            >
              Independent{"\n"}Digital Press
            </div>
          </div>
        </div>

        {/* bottom rule */}
        <div
          style={{
            borderTop: "1px solid #0a0a0a",
            borderBottom: "3px solid #0a0a0a",
            height: 6,
            margin: "0 60px",
            display: "flex",
          }}
        />
        <div style={{ height: 12, display: "flex" }} />
        <div style={{ background: "#0a0a0a", height: 6, display: "flex" }} />
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
