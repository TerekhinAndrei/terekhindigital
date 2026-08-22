import { Feed } from "feed"
import { fetchArticles } from "@/lib/api"
import { getAllArticles } from "@/lib/seed"

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terekhindigital.com"

export async function GET() {
  const liveArticles = await fetchArticles()
  const seedArticles = getAllArticles()
  const allArticles = [
    ...liveArticles,
    ...seedArticles.filter((s) => !liveArticles.find((l) => l.slug === s.slug)),
  ].slice(0, 50)

  const feed = new Feed({
    title: "Terekhin Digital Media",
    description:
      "Independent long-form journalism at the frontier of marketing technology, venture-backed startups, and large language models.",
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    copyright: `© ${new Date().getFullYear()} Terekhin Digital Media`,
    feedLinks: { rss: `${SITE_URL}/feed.xml` },
    author: { name: "Terekhin Digital Media", link: SITE_URL },
    image: `${SITE_URL}/og-default.jpg`,
    favicon: `${SITE_URL}/favicon.ico`,
  })

  for (const article of allArticles) {
    feed.addItem({
      title: article.title,
      id: `${SITE_URL}/articles/${article.slug}`,
      link: `${SITE_URL}/articles/${article.slug}`,
      description: article.teaser ?? "",
      content: article.content,
      date: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      image: article.imageUrl ?? undefined,
      category: article.keywords?.map((k) => ({ name: k })) ?? [],
      author: [{ name: article.author ?? "Terekhin Digital Media" }],
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
