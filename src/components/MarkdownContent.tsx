"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Props {
  content: string
  dropCap?: boolean
}

export default function MarkdownContent({ content, dropCap = true }: Props) {
  return (
    <div className={`prose-newspaper body-text${dropCap ? " drop-cap-first" : ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // h1 in article body → treat as h2 (main title already rendered)
          h1: ({ children }) => <h2>{children}</h2>,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          // paragraphs: first one gets drop-cap class
          p: ({ children, node, ...props }) => {
            const isFirst =
              dropCap &&
              node?.position?.start.line === 1
            return <p className={isFirst ? "drop-cap" : ""} {...props}>{children}</p>
          },
          // blockquote → pull-quote style
          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
          // *** → ornamental rule
          hr: () => (
            <div className="ornament" aria-hidden>— ✦ —</div>
          ),
          // open links in new tab
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
          ),
          // tables — rendered via .prose-newspaper table styles
          table: ({ children }) => <table>{children}</table>,
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => <th>{children}</th>,
          td: ({ children }) => <td>{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
