import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { fetchArticle } from "@/lib/api"
import { getArticleBySlug, getAllArticles, LATEST_ISSUE } from "@/lib/seed"
import { formatDate } from "@/lib/utils"
import Masthead from "@/components/Masthead"
import BreakingTicker from "@/components/BreakingTicker"
import MarkdownContent from "@/components/MarkdownContent"

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const liveArticle = await fetchArticle(slug)
  const article = liveArticle ?? getArticleBySlug(slug)
  if (!article) return { title: "Not Found" }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terekhindigital.com"

  return {
    title: article.title,
    description: article.teaser ?? undefined,
    keywords: article.keywords,
    authors: article.author ? [{ name: article.author }] : undefined,
    openGraph: {
      type: "article",
      url: `${SITE_URL}/articles/${slug}`,
      title: article.title,
      description: article.teaser ?? undefined,
      publishedTime: article.publishedAt ?? undefined,
      authors: article.author ? [article.author] : undefined,
      tags: article.keywords,
      images: article.imageUrl
        ? [{ url: article.imageUrl, width: 1200, height: 630, alt: article.imageAlt ?? article.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.teaser ?? undefined,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
    alternates: { canonical: `/articles/${slug}` },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const liveArticle = await fetchArticle(slug)
  const article = liveArticle ?? getArticleBySlug(slug)
  if (!article) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terekhindigital.com"
  const issue = LATEST_ISSUE
  const related = getAllArticles()
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 4)

  // Build NewsArticle JSON-LD. If RankCaster returned jsonld, extract the Article entity
  // from @graph (the outer container has no @type which fails schema validators).
  let jsonLd: Record<string, unknown>
  const rcGraph = article.jsonld?.["@graph"]
  if (Array.isArray(rcGraph)) {
    const { "@type": _t, ...articleEntity } = (rcGraph.find(
      (x: Record<string, unknown>) => x["@type"] === "Article" || x["@type"] === "NewsArticle"
    ) ?? {}) as Record<string, unknown>
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      ...articleEntity,
      url: `${SITE_URL}/articles/${slug}`,
      isAccessibleForFree: true,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/articles/${slug}` },
      publisher: {
        "@type": "NewsMediaOrganization",
        name: "Terekhin Digital Media",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
    }
  } else {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: article.teaser,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      author: article.author ? { "@type": "Person", name: article.author } : undefined,
      publisher: {
        "@type": "NewsMediaOrganization",
        name: "Terekhin Digital Media",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      image: article.imageUrl
        ? { "@type": "ImageObject", url: article.imageUrl, description: article.imageAlt }
        : undefined,
      url: `${SITE_URL}/articles/${slug}`,
      keywords: article.keywords?.join(", "),
      articleSection: article.category,
      isAccessibleForFree: true,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/articles/${slug}` },
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: article.category ?? "Articles", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/articles/${slug}` },
            ],
          }),
        }}
      />

      <BreakingTicker />
      <Masthead issueNumber={issue.number} issueLabel={issue.label} />

      <main style={{ padding: "0 24px 32px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", paddingTop: 20 }}>

          {/* Breadcrumb */}
          <nav style={{ fontFamily: "var(--font-old-standard), serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--faded)", marginBottom: 16 }}>
            <Link href="/" style={{ textDecoration: "none", color: "var(--faded)" }}>Front Page</Link>
            {" — "}
            {article.category && <span>{article.category}</span>}
          </nav>

          {/* Article header */}
          <header style={{ borderTop: "3px double var(--rule)", paddingTop: 16, marginBottom: 20 }}>
            {article.category && <div className="kicker" style={{ marginBottom: 8 }}>{article.category}</div>}
            <h1 className="headline-xl" style={{ marginBottom: 12 }}>{article.title}</h1>
            {article.teaser && (
              <p className="deck" style={{ fontSize: 15, marginBottom: 14 }}>{article.teaser}</p>
            )}
            <div className="byline">
              {article.author && <span>By {article.author}</span>}
              {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
            </div>
          </header>

          {/* Hero image */}
          {article.imageUrl && (
            <div style={{ marginBottom: 20 }}>
              <Image
                src={article.imageUrl}
                alt={article.imageAlt ?? article.title}
                width={740}
                height={360}
                style={{ width: "100%", height: 360, objectFit: "cover", filter: "grayscale(100%) contrast(1.08)" }}
                priority
                unoptimized
              />
              {article.imageAlt && <div className="caption">{article.imageAlt}</div>}
            </div>
          )}

          {/* Article body */}
          <MarkdownContent content={article.content} />

          {/* Keywords */}
          {article.keywords?.length > 0 && (
            <div style={{ marginTop: 20, borderTop: "1px solid var(--rule)", paddingTop: 10 }}>
              {article.keywords.map((k) => <span key={k} className="tag">{k}</span>)}
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: 20, borderTop: "3px double var(--rule)", paddingTop: 14 }}>
            <Link
              href="/"
              style={{ fontFamily: "var(--font-old-standard), serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", color: "var(--faded)" }}
            >
              ← Return to Front Page
            </Link>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <>
            <div className="section-rule" style={{ marginTop: 32 }}><span>Related Articles</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 var(--col-gap)", borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
              {related.map((a) => (
                <article key={a.slug} style={{ borderRight: "1px solid #ddd", paddingRight: 12 }}>
                  <div className="kicker">{a.category}</div>
                  <Link href={`/articles/${a.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <h3 className="headline-xs" style={{ marginBottom: 6 }}>{a.title}</h3>
                  </Link>
                  {a.teaser && (
                    <p style={{ fontFamily: "var(--font-baskerville), serif", fontSize: 11, lineHeight: 1.5, color: "var(--faded)" }}>
                      {a.teaser.slice(0, 100)}…
                    </p>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      <div style={{ background: "var(--ink)", color: "var(--paper)", textAlign: "center", padding: 8, fontFamily: "var(--font-old-standard), serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        &copy; MMXXVI Terekhin Digital Media &mdash; All Rights Reserved &mdash; An Independent Digital Publication
      </div>
    </>
  )
}
