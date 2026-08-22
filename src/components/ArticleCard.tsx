import Link from "next/link"
import Image from "next/image"
import type { Article } from "@/types"
import { formatDate } from "@/lib/utils"

interface Props {
  article: Article
  size?: "xl" | "lg" | "md" | "sm" | "xs"
  showImage?: boolean
  showBody?: boolean
  imageHeight?: number
}

export default function ArticleCard({
  article,
  size = "md",
  showImage = false,
  showBody = false,
  imageHeight = 180,
}: Props) {
  const { slug, title, teaser, publishedAt, imageUrl, imageAlt, keywords, author, category } = article
  const headlineClass = `headline-${size}`

  return (
    <article>
      {category && <div className="kicker">{category}</div>}

      {showImage && imageUrl && (
        <div className={size === "xl" ? "hero-img" : "thumb-img"} style={{ marginBottom: 8 }}>
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            width={800}
            height={imageHeight}
            style={{
              width: "100%",
              height: imageHeight,
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.08)",
            }}
            unoptimized
          />
        </div>
      )}

      <Link href={`/articles/${slug}`} style={{ textDecoration: "none" }}>
        <h2 className={headlineClass} style={{ marginBottom: 8 }}>
          {title}
        </h2>
      </Link>

      {teaser && (size === "xl" || size === "lg" || size === "md") && (
        <p className="deck" style={{ marginBottom: 10 }}>
          {teaser}
        </p>
      )}

      {(author || publishedAt) && (
        <div className="byline" style={{ marginBottom: 10 }}>
          {author && <span>By {author}</span>}
          {publishedAt && <span>{formatDate(publishedAt)}</span>}
        </div>
      )}

      {showBody && teaser && (
        <div className="body-text drop-cap">
          <p>{teaser}</p>
        </div>
      )}

      {keywords.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {keywords.slice(0, 3).map((k) => (
            <span key={k} className="tag">{k}</span>
          ))}
        </div>
      )}
    </article>
  )
}
