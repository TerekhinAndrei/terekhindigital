"use client"

const ITEMS = [
  "OpenAI Announces $200B Valuation Round",
  "EU AI Act Compliance Deadline Extended to 2027",
  "Google DeepMind Releases Gemini Ultra 3.0",
  "Y Combinator S26 Batch: 60% of Startups Are AI-Native",
  "MarTech Consolidation: Salesforce Acquires MadTech Pioneer",
  "LLM Token Costs Drop 80% Year-Over-Year",
  "Meta Llama 4 Released Under Permissive Commercial Licence",
  "Anthropic's Claude Achieves New Benchmarks on Reasoning Tasks",
  "Venture Capital Flows to AI Infrastructure Exceed $4B in Q2",
  "Adobe GenStudio Reaches 500,000 Enterprise Users",
]

const text = ITEMS.join("   •   ") + "   •   " + ITEMS.join("   •   ")

export default function BreakingTicker() {
  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "6px 0",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "var(--font-old-standard), serif",
        fontSize: 11,
        letterSpacing: "0.08em",
      }}
    >
      <span
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
          padding: "2px 12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          whiteSpace: "nowrap",
          flexShrink: 0,
          marginRight: 16,
          marginLeft: 16,
        }}
      >
        Dispatch
      </span>
      <div style={{ overflow: "hidden", flex: 1, whiteSpace: "nowrap" }}>
        <span
          style={{
            display: "inline-block",
            animation: "ticker 40s linear infinite",
          }}
        >
          {text}
        </span>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
