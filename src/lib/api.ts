import type { Article } from "@/types"

const BASE = process.env.RANKCASTER_API_BASE ?? "https://platform.rankcaster.ai/api/public/content"
const TOKEN = process.env.RANKCASTER_TOKEN ?? "34f03306-d2b3-43ea-9d39-ea0aa367c4df"

export async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${BASE}/${TOKEN}/articles`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.map((a: Article) => ({ ...a, source: "rankcaster" as const }))
  } catch {
    return []
  }
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${BASE}/${TOKEN}/articles/${slug}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return { ...data, source: "rankcaster" as const }
  } catch {
    return null
  }
}
