"use client"

import { useState } from "react"

type State = "idle" | "loading" | "success" | "error"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<State>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === "loading") return

    setState("loading")
    setMessage("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setState("success")
        setMessage(
          data.already
            ? "You are already subscribed to the Brief."
            : "Confirmed. Your first dispatch arrives Monday.",
        )
        setEmail("")
      } else {
        setState("error")
        setMessage(data.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      setState("error")
      setMessage("Connection error. Please try again.")
    }
  }

  if (state === "success") {
    return (
      <div
        style={{
          border: "1px solid var(--rule)",
          padding: "12px 20px",
          fontFamily: "var(--font-im-fell), serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--faded)",
          maxWidth: 360,
          margin: "10px auto 0",
          textAlign: "center",
        }}
      >
        {message}
      </div>
    )
  }

  return (
    <div>
      <form className="sub-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your address…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "loading"}
          required
        />
        <button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </form>

      {state === "error" && (
        <p
          style={{
            fontFamily: "var(--font-old-standard), serif",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "#666",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
    </div>
  )
}
