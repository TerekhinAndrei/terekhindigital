import Link from "next/link"

const CATEGORIES = ["MarTech", "Startups", "LLMs & AI", "Venture", "Opinion", "Data & Analytics", "Events"]

interface Props {
  issueNumber: number
  issueLabel: string
}

export default function Masthead({ issueNumber, issueLabel }: Props) {
  return (
    <>
      {/* Top ribbon */}
      <div
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          fontFamily: "var(--font-old-standard), serif",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "5px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Est. MMXXV &mdash; Independent Digital Press</span>
        <span>{issueLabel}</span>
        <span>Vol.&thinsp;I &mdash; No.&thinsp;{issueNumber}</span>
      </div>

      {/* Header */}
      <header style={{ padding: "12px 24px 0", borderBottom: "3px double var(--rule)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "var(--font-old-standard), serif",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            borderBottom: "1px solid var(--rule)",
            paddingBottom: 6,
            marginBottom: 4,
            color: "var(--faded)",
          }}
        >
          <span>MarTech &bull; Startups &bull; LLMs &bull; Digital Strategy</span>
          <span>terekhindigital.com</span>
          <span>Morning Edition</span>
        </div>

        <div style={{ textAlign: "center", padding: "10px 0 12px" }}>
          <h1
            className="font-masthead"
            style={{
              fontSize: "clamp(40px, 7vw, 82px)",
              fontWeight: "normal",
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "var(--ink)",
              textShadow: "2px 2px 0 rgba(0,0,0,0.1)",
            }}
          >
            Terekhin Digital Media
          </h1>
          <p
            className="font-deck"
            style={{ fontSize: 13, letterSpacing: "0.2em", color: "var(--faded)", marginTop: 4 }}
          >
            Rigorous Journalism at the Frontier of Digital Commerce &amp; Machine Intelligence
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--rule)", borderBottom: "3px solid var(--rule)", height: 5, margin: "6px 0 0" }} />
      </header>

      {/* Nav */}
      <nav
        style={{
          background: "var(--ink)",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        {["Front Page", ...CATEGORIES].map((cat) => (
          <Link
            key={cat}
            href={cat === "Front Page" ? "/" : `/#${cat.toLowerCase().replace(/[^a-z]/g, "-")}`}
            style={{
              color: "var(--paper)",
              textDecoration: "none",
              fontFamily: "var(--font-old-standard), serif",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "7px 16px",
              borderRight: "1px solid #444",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </Link>
        ))}
      </nav>

      {/* Edition strip */}
      <div
        style={{
          fontFamily: "var(--font-old-standard), serif",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          borderTop: "3px solid var(--ink)",
          borderBottom: "1px solid var(--ink)",
          padding: "5px 24px",
          display: "flex",
          justifyContent: "space-between",
          background: "var(--paper-dark)",
        }}
      >
        <span>{issueLabel}</span>
        <span>Issue No. {issueNumber}</span>
      </div>
    </>
  )
}
