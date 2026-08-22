import type { MetadataRoute } from "next"
import { fetchArticles } from "@/lib/api"
import { getAllArticles } from "@/lib/seed"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terekhindigital.com"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const liveArticles = await fetchArticles()
  const seedArticles = getAllArticles()
  const allArticles = [
    ...liveArticles,
    ...seedArticles.filter((s) => !liveArticles.find((l) => l.slug === s.slug)),
  ]

  const articleUrls: MetadataRoute.Sitemap = allArticles.map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    news: {
      publication: { name: "Terekhin Digital Media", language: "en" },
      publicationDate: a.publishedAt ? new Date(a.publishedAt) : new Date(),
      title: a.title,
      keywords: a.keywords?.join(", "),
    },
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...articleUrls,
  ]
}
