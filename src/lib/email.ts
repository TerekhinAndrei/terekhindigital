import type { Issue } from "@/types"
import { stripMarkdown } from "@/lib/utils"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://terekhindigital.com"

function previewText(content: string, sentences = 3): string {
  return content
    .split(/\n\n+/)
    .map((p) => stripMarkdown(p.trim()))
    .filter((p) => p.length > 20)
    .slice(0, sentences)
    .join(" ")
}

function formatLongDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

export function renderIssueEmail(issue: Issue): string {
  const lead = issue.lead
  const secondaries = issue.secondary
  const briefs = issue.briefs

  const previewSnippet = previewText(lead.content, 2)
  const leadParas = lead.content
    .split(/\n\n+/)
    .map((p) => stripMarkdown(p.trim()))
    .filter((p) => p.length > 20)
    .slice(0, 3)

  const leadDate = lead.publishedAt ? formatLongDate(lead.publishedAt) : issue.label

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Issue #${issue.number}: ${lead.title}</title>
  <meta name="description" content="${previewSnippet.slice(0, 160)}" />
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#f5f1eb;font-family:Georgia,'Times New Roman',serif;">

  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f5f1eb;">
    ${previewSnippet.slice(0, 140)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f1eb;">
    <tr>
      <td align="center" style="padding:24px 16px;">

        <!-- Outer wrapper -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#faf8f3;border:1px solid #c8b99a;">
          <tr>
            <td>

              <!-- ── TOP RULE ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1a1009;height:4px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="background:#8b6914;height:1px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="background:#1a1009;height:1px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- ── MASTHEAD ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:18px 32px 4px;text-align:center;">
                    <div style="font-family:Georgia,'Times New Roman',serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#5a4a2a;margin-bottom:6px;">
                      Est. MMXXV &bull; ${leadDate}
                    </div>
                    <div style="font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:700;letter-spacing:0.04em;color:#1a1009;line-height:1;margin-bottom:4px;">
                      Terekhin Digital
                    </div>
                    <div style="font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8b6914;">
                      MarTech &nbsp;&bull;&nbsp; Startups &nbsp;&bull;&nbsp; LLMs
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-top:2px solid #1a1009;border-bottom:1px solid #1a1009;height:3px;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:2px 32px 10px;text-align:center;">
                    <span style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#5a4a2a;">
                      Issue No. ${issue.number} &mdash; The Intelligence Brief
                    </span>
                  </td>
                </tr>
              </table>

              <!-- ── LEAD ARTICLE ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:8px 32px 20px;">
                    <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b6914;margin-bottom:8px;">
                      Exclusive &bull; ${lead.category ?? "Analysis"}
                    </div>
                    <a href="${BASE_URL}/articles/${lead.slug}" style="text-decoration:none;color:#1a1009;">
                      <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.2;margin:0 0 10px;color:#1a1009;">
                        ${lead.title}
                      </h1>
                    </a>
                    ${lead.teaser ? `<p style="font-family:Georgia,serif;font-size:14px;font-style:italic;color:#3a2e1a;line-height:1.6;margin:0 0 10px;">${lead.teaser}</p>` : ""}
                    <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.1em;color:#8b7a56;margin-bottom:12px;border-top:1px solid #c8b99a;border-bottom:1px solid #c8b99a;padding:4px 0;">
                      By ${lead.author ?? "A. Terekhin, Technology Correspondent"}
                    </div>
                    ${leadParas.map((p) => `<p style="font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.75;color:#2a2015;margin:0 0 12px;">${p}</p>`).join("")}
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:10px 0 4px;">
                          <a href="${BASE_URL}/articles/${lead.slug}" style="font-family:Georgia,serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8b6914;text-decoration:none;">
                            Continue reading &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ── RULE ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-top:1px solid #c8b99a;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${secondaries.length > 0 ? `
              <!-- ── SECONDARY ARTICLES ── -->
              ${secondaries.map((a) => `
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:16px 32px 12px;">
                    <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b6914;margin-bottom:6px;">
                      ${a.category ?? "Analysis"}
                    </div>
                    <a href="${BASE_URL}/articles/${a.slug}" style="text-decoration:none;color:#1a1009;">
                      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;line-height:1.3;margin:0 0 8px;color:#1a1009;">
                        ${a.title}
                      </h2>
                    </a>
                    ${a.teaser ? `<p style="font-family:Georgia,serif;font-size:12px;font-style:italic;color:#5a4a2a;line-height:1.6;margin:0 0 8px;">${a.teaser}</p>` : ""}
                    <p style="font-family:Georgia,serif;font-size:12px;line-height:1.7;color:#3a2e1a;margin:0 0 6px;">
                      ${stripMarkdown(a.content.split(/\n\n+/)[0] ?? "").slice(0, 300)}&hellip;
                    </p>
                    <a href="${BASE_URL}/articles/${a.slug}" style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#8b6914;text-decoration:none;">Read more &rarr;</a>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:0 32px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px dotted #c8b99a;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
              </table>
              `).join("")}
              ` : ""}

              ${briefs.length > 0 ? `
              <!-- ── BRIEFS ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:14px 32px 4px;">
                    <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#1a1009;border-top:2px solid #1a1009;padding-top:6px;margin-bottom:12px;">
                      Also Inside This Issue
                    </div>
                    ${briefs.map((a) => `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                      <tr>
                        <td>
                          <span style="font-family:Georgia,serif;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#8b6914;">${a.category ?? ""}</span>
                          <br />
                          <a href="${BASE_URL}/articles/${a.slug}" style="font-family:Georgia,'Times New Roman',serif;font-size:13px;font-weight:700;color:#1a1009;text-decoration:none;line-height:1.4;">
                            ${a.title}
                          </a>
                          ${a.teaser ? `<br /><span style="font-family:Georgia,serif;font-size:11px;color:#5a4a2a;font-style:italic;">${a.teaser}</span>` : ""}
                        </td>
                      </tr>
                    </table>
                    `).join("")}
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- ── CTA ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:12px 32px 20px;text-align:center;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="background:#1a1009;padding:10px 28px;">
                          <a href="${BASE_URL}" style="font-family:Georgia,serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#faf8f3;text-decoration:none;">
                            Read the Full Issue Online &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ── FOOTER ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1a1009;padding:16px 32px;text-align:center;">
                    <p style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8b7a56;margin:0 0 8px;">
                      Terekhin Digital Media &mdash; An Independent Publication
                    </p>
                    <p style="font-family:Georgia,serif;font-size:10px;color:#5a4a2a;margin:0 0 6px;">
                      You are receiving this because you subscribed at terekhindigital.com
                    </p>
                    <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="font-family:Georgia,serif;font-size:10px;color:#8b6914;text-decoration:underline;">
                      Unsubscribe
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="background:#8b6914;height:1px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="background:#1a1009;height:3px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
        <!-- /Outer wrapper -->

      </td>
    </tr>
  </table>

</body>
</html>`
}
