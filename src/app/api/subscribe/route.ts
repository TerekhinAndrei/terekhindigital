import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Service not configured." }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ""

    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    // Resend returns 409 when contact already exists
    if (message.includes("already exists") || message.includes("409")) {
      return NextResponse.json({ ok: true, already: true })
    }
    console.error("[subscribe]", message)
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 })
  }
}
