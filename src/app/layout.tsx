import type { Metadata } from "next"
import {
  UnifrakturMaguntia,
  Playfair_Display,
  IM_Fell_English,
  Libre_Baskerville,
  Old_Standard_TT,
} from "next/font/google"
import "./globals.css"

const unifraktur = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-unifraktur",
  display: "swap",
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})
const imFell = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-im-fell",
  display: "swap",
})
const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
  display: "swap",
})
const oldStandard = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-old-standard",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terekhindigital.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terekhin Digital Media — MarTech · Startups · LLMs",
    template: "%s | Terekhin Digital Media",
  },
  description:
    "Independent long-form journalism at the frontier of marketing technology, venture-backed startups, and large language models. Rigorous analysis for senior practitioners.",
  keywords: ["MarTech", "startups", "LLMs", "AI", "venture capital", "marketing technology", "artificial intelligence"],
  authors: [{ name: "Terekhin Digital Media", url: SITE_URL }],
  creator: "Terekhin Digital Media",
  publisher: "Terekhin Digital Media",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Terekhin Digital Media",
    title: "Terekhin Digital Media — MarTech · Startups · LLMs",
    description:
      "Independent long-form journalism at the frontier of marketing technology, venture-backed startups, and large language models.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@terekhindigital",
    creator: "@terekhindigital",
    title: "Terekhin Digital Media",
    description: "Independent journalism on MarTech, Startups, and LLMs.",
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    unifraktur.variable,
    playfair.variable,
    imFell.variable,
    baskerville.variable,
    oldStandard.variable,
  ].join(" ")

  return (
    <html lang="en" className={fontVars}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Terekhin Digital Media — RSS" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "Terekhin Digital Media",
              url: SITE_URL,
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
              description:
                "Independent long-form journalism at the frontier of marketing technology, venture-backed startups, and large language models.",
              sameAs: ["https://twitter.com/terekhindigital", "https://linkedin.com/company/terekhin-digital"],
              foundingDate: "2025",
              masthead: `${SITE_URL}/about`,
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
