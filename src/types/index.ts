export type Category = "LLMs" | "MarTech" | "Startups" | "Venture" | "Opinion"

export interface Article {
  slug: string
  title: string
  teaser: string | null
  publishedAt: string | null
  imageUrl: string | null
  imageAlt: string | null
  keywords: string[]
  url: string
  content: string
  author?: string
  jsonld?: Record<string, unknown> | null
  category?: Category
  size?: "xl" | "lg" | "md" | "sm" | "xs"
  source?: "rankcaster" | "seed"
}

export interface Issue {
  number: number
  date: string
  label: string
  lead: Article
  secondary: Article[]
  briefs: Article[]
}
