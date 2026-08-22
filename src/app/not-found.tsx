import Link from "next/link"
import Masthead from "@/components/Masthead"
import { LATEST_ISSUE } from "@/lib/seed"

export default function NotFound() {
  const issue = LATEST_ISSUE
  return (
    <>
      <Masthead issueNumber={issue.number} issueLabel={issue.label} />
      <main style={{ padding: "40px 24px", textAlign: "center", minHeight: "50vh" }}>
        <div className="kicker" style={{ marginBottom: 12 }}>Error 404</div>
        <h1 className="headline-xl" style={{ marginBottom: 16 }}>
          This Dispatch<br />Was Not Found
        </h1>
        <p className="deck" style={{ marginBottom: 24 }}>
          The article you seek has either been moved, removed, or never existed in our archives.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-old-standard), serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "var(--ink)",
            border: "1px solid var(--ink)",
            padding: "8px 20px",
          }}
        >
          Return to Front Page
        </Link>
      </main>
    </>
  )
}
