import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { LATEST_ISSUE } from "@/lib/seed"
import { renderIssueEmail } from "@/lib/email"

export const runtime = "nodejs"

async function handleRequest(req: NextRequest): Promise<NextResponse> {
  // Vercel cron adds Authorization: Bearer <CRON_SECRET> automatically.
  // Manual calls can pass the same header or ?secret= query param.
  const authHeader = req.headers.get("authorization")
  const querySecret = req.nextUrl.searchParams.get("secret")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 })
  }

  const isAuthorised =
    authHeader === `Bearer ${cronSecret}` || querySecret === cronSecret

  if (!isAuthorised) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    return NextResponse.json({ error: "RESEND_API_KEY or RESEND_AUDIENCE_ID not configured" }, { status: 503 })
  }

  // Only send when today's issue is live. Date is compared in UTC.
  const today = new Date().toISOString().slice(0, 10)
  if (LATEST_ISSUE.date !== today) {
    return NextResponse.json({
      skipped: true,
      reason: "No new issue for today",
      today,
      latestIssueDate: LATEST_ISSUE.date,
    })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL ?? "Terekhin Digital Media <digest@terekhindigital.com>"

  const html = renderIssueEmail(LATEST_ISSUE)

  const { data, error } = await resend.broadcasts.create({
    audienceId: process.env.RESEND_AUDIENCE_ID,
    from,
    name: `Issue #${LATEST_ISSUE.number} — ${LATEST_ISSUE.date}`,
    subject: `Issue #${LATEST_ISSUE.number}: ${LATEST_ISSUE.lead.title}`,
    html,
    send: true,
  } as Parameters<typeof resend.broadcasts.create>[0])

  if (error || !data) {
    console.error("[send-issue] broadcast create failed:", error)
    return NextResponse.json({ error: error?.message ?? "Failed to create broadcast" }, { status: 500 })
  }

  console.log(`[send-issue] broadcast ${data.id} sent for issue #${LATEST_ISSUE.number}`)
  return NextResponse.json({ ok: true, broadcastId: data.id, issue: LATEST_ISSUE.number })
}

// GET: called by Vercel cron (Authorization: Bearer <CRON_SECRET>)
export const GET = handleRequest

// POST: manual trigger with same auth
export const POST = handleRequest
