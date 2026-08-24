import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Masthead from "@/components/Masthead"
import BreakingTicker from "@/components/BreakingTicker"
import SubscribeForm from "@/components/SubscribeForm"
import { fetchArticles } from "@/lib/api"
import { LATEST_ISSUE, ISSUES, getAllArticles } from "@/lib/seed"
import { formatDateShort, stripMarkdown } from "@/lib/utils"
import type { Article } from "@/types"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Terekhin Digital Media — MarTech · Startups · LLMs",
  alternates: { canonical: "/" },
}

function SectionRule({ label }: { label: string }) {
  return (
    <div className="section-rule">
      <span>{label}</span>
    </div>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return <div className="pull-quote">{children}</div>
}

function previewParagraphs(content: string, n = 3): string[] {
  return content
    .split(/\n\n+/)
    .map((p) => stripMarkdown(p.trim()))
    .filter((p) => p.length > 20)
    .slice(0, n)
}

function ArticleBody({ content, className = "" }: { content: string; className?: string }) {
  return (
    <div className={`body-text ${className}`}>
      {previewParagraphs(content).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

export default async function HomePage() {
  const liveArticles = await fetchArticles()
  const issue = LATEST_ISSUE

  // Merge live articles at top, then seed
  const allSeed = getAllArticles()
  const allArticles: Article[] = [
    ...liveArticles,
    ...allSeed.filter((s) => !liveArticles.find((l) => l.slug === s.slug)),
  ]

  const lead = issue.lead
  const secondary = issue.secondary
  const briefs = issue.briefs

  // Sections from all issues (for category grids)
  const llmArticles = allArticles.filter((a) => a.category === "LLMs").slice(0, 3)
  const martechArticles = allArticles.filter((a) => a.category === "MarTech").slice(0, 3)
  const startupArticles = allArticles.filter((a) => a.category === "Startups" || a.category === "Venture").slice(0, 3)
  const ventureArticles = allArticles.filter((a) => a.category === "Venture").slice(0, 3)
  const opinionArticles = allArticles.filter((a) => a.category === "Opinion").slice(0, 1)
  const dataArticles = allArticles.filter((a) => a.category === "Data & Analysis").slice(0, 3)
  const eventArticles = allArticles.filter((a) => a.category === "Events").slice(0, 4)
  const mostRead = allArticles.slice(0, 5)

  return (
    <>
      <BreakingTicker />
      <Masthead issueNumber={issue.number} issueLabel={issue.label} />

      <main style={{ padding: "0 24px 32px" }}>

        {/* ── HERO GRID ── */}
        <div className="grid-hero">

          {/* Lead story */}
          <article>
            <div className="kicker">Exclusive &bull; {lead.category ?? "Analysis"}</div>
            <Link href={`/articles/${lead.slug}`} style={{ textDecoration: "none" }}>
              <h1 className="headline-xl" style={{ marginBottom: 8 }}>{lead.title}</h1>
            </Link>
            {lead.teaser && (
              <p className="deck" style={{ marginBottom: 10 }}>{lead.teaser}</p>
            )}
            <div className="byline" style={{ marginBottom: 10 }}>
              <span>By {lead.author ?? "A. Terekhin, Technology Correspondent"}</span>
              <span>{lead.publishedAt ? formatDateShort(lead.publishedAt) : ""}</span>
            </div>

            {lead.imageUrl && (
              <div className="hero-img">
                <Image
                  src={lead.imageUrl}
                  alt={lead.imageAlt ?? lead.title}
                  width={800}
                  height={260}
                  style={{ width: "100%", height: 260, objectFit: "cover", filter: "grayscale(100%) contrast(1.08)" }}
                  priority
                  unoptimized
                />
                <div className="caption">
                  {lead.imageAlt ?? `Illustration accompanying the article on ${lead.title}.`}
                </div>
              </div>
            )}

            <div className="body-text drop-cap">
              {previewParagraphs(lead.content, 3).map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <PullQuote>
              &ldquo;We are witnessing the most consequential restructuring of information work since the invention of the spreadsheet — perhaps since the printing press itself.&rdquo;
            </PullQuote>

            <div className="body-text">
              {previewParagraphs(lead.content.split(/\n\n+/).slice(3).join("\n\n"), 2).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </article>

          <div className="col-divider" />

          {/* Right column */}
          <div>
            {secondary[0] && (
              <article>
                <div className="kicker">{secondary[0].category ?? "Analysis"}</div>
                <Link href={`/articles/${secondary[0].slug}`} style={{ textDecoration: "none" }}>
                  <h2 className="headline-md" style={{ marginBottom: 8 }}>{secondary[0].title}</h2>
                </Link>
                {secondary[0].teaser && (
                  <p className="deck" style={{ marginBottom: 10 }}>{secondary[0].teaser}</p>
                )}
                {secondary[0].imageUrl && (
                  <div className="thumb-img">
                    <Image
                      src={secondary[0].imageUrl}
                      alt={secondary[0].imageAlt ?? secondary[0].title}
                      width={600}
                      height={130}
                      style={{ width: "100%", height: 130, objectFit: "cover", filter: "grayscale(100%) contrast(1.08)" }}
                      unoptimized
                    />
                  </div>
                )}
                <div className="body-text">
                  {previewParagraphs(secondary[0].content, 2).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </article>
            )}

            <div className="ornament">— ✦ —</div>

            {secondary[1] && (
              <article>
                <div className="kicker">{secondary[1].category ?? "Analysis"}</div>
                <Link href={`/articles/${secondary[1].slug}`} style={{ textDecoration: "none" }}>
                  <h2 className="headline-md" style={{ marginBottom: 8 }}>{secondary[1].title}</h2>
                </Link>
                <div className="body-text">
                  {previewParagraphs(secondary[1].content, 2).map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="byline" style={{ marginTop: 8 }}>
                  <span>By {secondary[1].author ?? "Staff Reporter"}</span>
                  <span>{secondary[1].publishedAt ? formatDateShort(secondary[1].publishedAt) : ""}</span>
                </div>
              </article>
            )}

            {/* Index box */}
            <div className="index-box">
              <div className="index-box-title">Also Inside This Issue</div>
              {briefs.concat(startupArticles).slice(0, 5).map((a) => (
                <div key={a.slug} className="index-item">
                  <Link href={`/articles/${a.slug}`} className="index-item-title" style={{ textDecoration: "none", color: "inherit" }}>
                    {a.title}
                  </Link>
                  {a.category && <span className="index-item-tag">{a.category}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="stats-row">
          {[
            { num: "$847B", label: "Global MarTech Spend 2026" },
            { num: "14,213", label: "Active AI Startups Worldwide" },
            { num: "2.4T", label: "Tokens Processed Daily" },
            { num: "$7.90", label: "Cost per 1M Tokens" },
          ].map(({ num, label }) => (
            <div key={label} className="stat-cell">
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>

        {/* ── MARTECH SECTION ── */}
        <SectionRule label="Marketing Technology" />
        <div className="grid-3col" id="martech">
          {martechArticles.map((a, i) => (
            <article key={a.slug} className="col">
              <div className="kicker">{a.category}</div>
              <Link href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
                <h3 className={i === 0 ? "headline-md" : "headline-sm"} style={{ marginBottom: 8 }}>
                  {a.title}
                </h3>
              </Link>
              {a.imageUrl && i === 0 && (
                <div className="thumb-img">
                  <Image
                    src={a.imageUrl}
                    alt={a.imageAlt ?? a.title}
                    width={400}
                    height={120}
                    style={{ width: "100%", height: 120, objectFit: "cover", filter: "grayscale(100%) contrast(1.08)" }}
                    unoptimized
                  />
                </div>
              )}
              <div className="body-text">
                {a.content.split(/\n\n+/).slice(0, 2).map((p, pi) => <p key={pi}>{p.trim()}</p>)}
              </div>
              <div className="byline" style={{ marginTop: 8 }}>
                <span>By {a.author ?? "Staff Reporter"}</span>
                <span>{a.publishedAt ? formatDateShort(a.publishedAt) : ""}</span>
              </div>
            </article>
          ))}
        </div>

        {/* ── STARTUPS SECTION ── */}
        <SectionRule label="Startups & Venture Capital" />
        <div className="grid-sidebar" id="startups">
          <div>
            {startupArticles[0] && (
              <article>
                <div className="kicker">Venture Capital &bull; Series</div>
                <Link href={`/articles/${startupArticles[0].slug}`} style={{ textDecoration: "none" }}>
                  <h2 className="headline-lg" style={{ marginBottom: 10 }}>{startupArticles[0].title}</h2>
                </Link>
                <div className="byline" style={{ marginBottom: 10 }}>
                  <span>By {startupArticles[0].author ?? "P. Castellan, Venture Correspondent"}</span>
                  <span>{startupArticles[0].publishedAt ? formatDateShort(startupArticles[0].publishedAt) : ""}</span>
                </div>
                {startupArticles[0].imageUrl && (
                  <div style={{ marginBottom: 14 }}>
                    <Image
                      src={startupArticles[0].imageUrl}
                      alt={startupArticles[0].imageAlt ?? startupArticles[0].title}
                      width={700}
                      height={200}
                      style={{ width: "100%", height: 200, objectFit: "cover", filter: "grayscale(100%) contrast(1.08)" }}
                      unoptimized
                    />
                  </div>
                )}
                <div className="body-text drop-cap">
                  {previewParagraphs(startupArticles[0].content, 4).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </article>
            )}
          </div>

          <div className="col-divider" />

          {/* Sidebar */}
          <div>
            <div className="ad-box">
              <div style={{ fontSize: 22, marginBottom: 6 }}>✦</div>
              <div className="ad-headline">Digital Intelligence Summit</div>
              <div className="ad-body">
                Three days with the minds reshaping the digital economy. &bull; October 14–16, 2026
              </div>
              <div className="ad-cta">Reserve Your Place</div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div className="footer-col-title">Most Read Today</div>
              {mostRead.map((a) => (
                <div key={a.slug} className="sidebar-brief">
                  {a.category && <span className="tag">{a.category}</span>}
                  <Link href={`/articles/${a.slug}`} className="headline-xs" style={{ display: "block", marginTop: 4, textDecoration: "none", color: "inherit" }}>
                    {a.title}
                  </Link>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
              <div className="footer-col-title">Market Pulse</div>
              {[
                ["AI Infrastructure Index", "+2.4%"],
                ["MarTech Composite", "+0.8%"],
                ["SaaS Multiples (median)", "8.2×"],
                ["VC Deal Volume (QTD)", "+18%"],
                ["Token Cost Trend", "−80% YoY"],
              ].map(([label, val]) => (
                <div key={label} className="index-item">
                  <span style={{ fontFamily: "var(--font-baskerville), serif", fontSize: 12 }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-baskerville), serif", fontWeight: 700, fontSize: 12 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LLMs SECTION ── */}
        <SectionRule label="Large Language Models & AI Research" />
        <div className="grid-3col" id="llms-ai">
          {llmArticles.map((a, i) => (
            <article key={a.slug} className="col">
              <div className="kicker">{a.category}</div>
              <Link href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
                <h3 className={i === 0 ? "headline-md" : "headline-sm"} style={{ marginBottom: 8 }}>
                  {a.title}
                </h3>
              </Link>
              {a.imageUrl && i === 0 && (
                <div className="hero-img">
                  <Image
                    src={a.imageUrl}
                    alt={a.imageAlt ?? a.title}
                    width={400}
                    height={200}
                    style={{ width: "100%", height: 200, objectFit: "cover", filter: "grayscale(100%) contrast(1.08)" }}
                    unoptimized
                  />
                </div>
              )}
              <div className="body-text">
                {a.content.split(/\n\n+/).slice(0, 2).map((p, pi) => <p key={pi}>{p.trim()}</p>)}
              </div>
              {i === 1 && (
                <PullQuote>
                  &ldquo;Open source did not destroy the frontier labs. It forced them to become better.&rdquo;
                </PullQuote>
              )}
              <div className="byline" style={{ marginTop: 8 }}>
                <span>By {a.author ?? "Dr. T. Nakamura"}</span>
                <Link href={`/articles/${a.slug}`} style={{ textDecoration: "none", color: "var(--faded)", fontSize: 10 }}>
                  Read in full →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── VENTURE LEDGER ── */}
        {ventureArticles.length > 0 && (
          <>
            <SectionRule label="Venture Ledger" />
            <div className="grid-3col" id="venture">
              {ventureArticles.map((a, i) => (
                <article key={a.slug} className="col">
                  <div className="kicker">Venture Capital</div>
                  <Link href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
                    <h3 className={i === 0 ? "headline-md" : "headline-sm"} style={{ marginBottom: 8 }}>
                      {a.title}
                    </h3>
                  </Link>
                  {a.teaser && <p className="deck" style={{ marginBottom: 8 }}>{a.teaser}</p>}
                  <div className="byline" style={{ marginTop: 8 }}>
                    <span>By {a.author ?? "P. Castellan"}</span>
                    <span>{a.publishedAt ? formatDateShort(a.publishedAt) : ""}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* ── THE DIGITAL DESK (Opinion) ── */}
        {opinionArticles[0] && (
          <>
            <SectionRule label="The Digital Desk — Opinion" />
            <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 16, marginBottom: 24 }}>
              <article>
                <div className="kicker" style={{ fontStyle: "italic" }}>Commentary &bull; {opinionArticles[0].author ?? "A. Terekhin"}</div>
                <Link href={`/articles/${opinionArticles[0].slug}`} style={{ textDecoration: "none" }}>
                  <h2 className="headline-lg" style={{ marginBottom: 10 }}>{opinionArticles[0].title}</h2>
                </Link>
                {opinionArticles[0].teaser && (
                  <p className="deck" style={{ marginBottom: 12, fontStyle: "italic" }}>{opinionArticles[0].teaser}</p>
                )}
                <div className="body-text drop-cap">
                  {previewParagraphs(opinionArticles[0].content, 3).map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="byline" style={{ marginTop: 10 }}>
                  <span>{opinionArticles[0].author ?? "A. Terekhin"}, Editor-at-Large</span>
                  <Link href={`/articles/${opinionArticles[0].slug}`} style={{ textDecoration: "none", color: "var(--faded)", fontSize: 10 }}>
                    Continue reading →
                  </Link>
                </div>
              </article>
            </div>
          </>
        )}

        {/* ── DATA & ANALYSIS ── */}
        {dataArticles.length > 0 && (
          <>
            <SectionRule label="Data &amp; Analysis" />
            <div style={{ display: "grid", gridTemplateColumns: dataArticles.length === 1 ? "1fr" : "2fr 1fr", alignItems: "start", gap: "0 var(--col-gap)", borderTop: "1px solid var(--rule)", paddingTop: 14 }} id="data">
              {dataArticles.map((a, i) => (
                <article key={a.slug} style={{ paddingRight: i < dataArticles.length - 1 ? 12 : 0, borderRight: i < dataArticles.length - 1 ? "1px solid var(--rule)" : "none", paddingLeft: i > 0 ? 12 : 0 }}>
                  <div className="kicker">Data &amp; Analysis</div>
                  <Link href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
                    <h3 className={i === 0 ? "headline-md" : "headline-sm"} style={{ marginBottom: 8 }}>{a.title}</h3>
                  </Link>
                  {a.imageUrl && i === 0 && (
                    <div className="thumb-img">
                      <Image src={a.imageUrl} alt={a.imageAlt ?? a.title} width={600} height={120}
                        style={{ width: "100%", height: 120, objectFit: "cover", filter: "grayscale(100%) contrast(1.08)" }}
                        unoptimized />
                    </div>
                  )}
                  <div className="body-text">
                    {a.content.split(/\n\n+/).slice(0, i === 0 ? 2 : 1).map((p, pi) => <p key={pi}>{p.trim()}</p>)}
                  </div>
                  <div className="byline" style={{ marginTop: 8 }}>
                    <span>{a.author ?? "Editorial Research Desk"}</span>
                    <span>{a.publishedAt ? formatDateShort(a.publishedAt) : ""}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* ── EVENTS ── */}
        {eventArticles.length > 0 && (
          <>
            <SectionRule label="Events &amp; Conferences" />
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(eventArticles.length, 4)}, 1fr)`, alignItems: "start", gap: "0 var(--col-gap)", borderTop: "1px solid var(--rule)", paddingTop: 14 }} id="events">
              {eventArticles.map((a, i) => (
                <div key={a.slug} style={{ borderRight: i < eventArticles.length - 1 ? "1px solid var(--rule)" : "none", paddingRight: 12, paddingLeft: i > 0 ? 12 : 0 }}>
                  <div className="kicker">Events</div>
                  <Link href={`/articles/${a.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="headline-xs" style={{ marginBottom: 6 }}>{a.title}</div>
                  </Link>
                  {a.teaser && (
                    <p style={{ fontFamily: "var(--font-baskerville), serif", fontSize: 11, color: "var(--faded)", lineHeight: 1.5, margin: 0 }}>
                      {a.teaser}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── ISSUE ARCHIVE ── */}
        <SectionRule label="Recent Issues" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", alignItems: "start", gap: "0 var(--col-gap)", borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
          {ISSUES.map((iss) => (
            <div
              key={iss.number}
              style={{
                borderRight: "1px solid #ddd",
                paddingRight: 12,
                paddingLeft: iss === ISSUES[0] ? 0 : 12,
              }}
            >
              <div className="kicker" style={{ marginBottom: 6 }}>{iss.label.split(",")[0]}</div>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: 11, marginBottom: 6 }}>
                Issue {iss.number}
              </div>
              <Link href={`/articles/${iss.lead.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="headline-xs">{iss.lead.title}</div>
              </Link>
            </div>
          ))}
        </div>

        {/* ── SUBSCRIBE ── */}
        <div className="sub-box" style={{ marginTop: 24 }}>
          <div className="headline-md" style={{ textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
            The Weekly Intelligence Brief
          </div>
          <p
            className="font-deck"
            style={{ fontSize: 13, color: "var(--faded)", fontStyle: "italic" }}
          >
            Delivered every Monday to senior practitioners in MarTech, Startups, and AI. Distilled to what matters.
          </p>
          <SubscribeForm />
        </div>

      </main>

      {/* ── FOOTER ── */}
      <hr style={{ border: "none", borderTop: "3px double var(--rule)", margin: "0 24px" }} />
      <footer style={{ padding: "14px 24px 20px", display: "grid", gridTemplateColumns: "1fr 2px 1fr 2px 1fr", gap: "0 20px" }}>
        <div>
          <div className="footer-col-title">Sections</div>
          <ul style={{ listStyle: "none" }}>
            {[
              ["MarTech Intelligence", "Weekly"],
              ["Startup Dispatch", "Daily"],
              ["LLM Watch", "Daily"],
              ["Venture Ledger", "Weekly"],
              ["The Digital Desk", "Opinion"],
              ["Data & Analysis", "Weekly"],
              ["Events & Conferences", "Weekly"],
            ].map(([title, freq]) => (
              <li key={title} style={{ fontFamily: "var(--font-baskerville), serif", fontSize: 12, padding: "3px 0", borderBottom: "1px dotted #ccc", display: "flex", justifyContent: "space-between" }}>
                {title}
                <span style={{ fontFamily: "var(--font-old-standard), serif", fontSize: 10, color: "var(--faded)" }}>{freq}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#bbb", width: 1 }} />

        <div>
          <div className="footer-col-title">About</div>
          <p className="body-text" style={{ fontSize: 12 }}>
            Terekhin Digital Media is an independent publication dedicated to rigorous, long-form journalism at the intersection of marketing technology, venture-backed enterprise software, and artificial intelligence. Founded in 2025.
          </p>
          <p className="body-text" style={{ fontSize: 12, marginTop: 8 }}>
            Editorial independence is our founding principle. We accept no vendor-sponsored content.
          </p>
        </div>

        <div style={{ background: "#bbb", width: 1 }} />

        <div>
          <div className="footer-col-title">Contact</div>
          <ul style={{ listStyle: "none" }}>
            {[
              ["Editorial", "edit@terekhindigital.com"],
              ["Advertising", "ads@terekhindigital.com"],
              ["Press Tips", "tips@terekhindigital.com"],
              ["Subscriptions", "subs@terekhindigital.com"],
            ].map(([label, email]) => (
              <li key={label} style={{ fontFamily: "var(--font-baskerville), serif", fontSize: 12, padding: "3px 0", borderBottom: "1px dotted #ccc", display: "flex", justifyContent: "space-between" }}>
                {label}
                <span style={{ fontFamily: "var(--font-old-standard), serif", fontSize: 10, color: "var(--faded)" }}>{email}</span>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <div style={{ background: "var(--ink)", color: "var(--paper)", padding: 8, fontFamily: "var(--font-old-standard), serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <span>&copy; MMXXVI Terekhin Digital Media &mdash; All Rights Reserved &mdash; An Independent Digital Publication</span>
        <a href="https://rankcaster.ai" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, flexShrink: 0, lineHeight: 0 }}>
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="https://rankcaster.ai/badge-dark.svg" />
            <img src="https://rankcaster.ai/badge-light.svg" alt="AI Visibility tracked by RankCaster AI" width={110} height={18} style={{ display: "block" }} />
          </picture>
        </a>
      </div>
    </>
  )
}
