import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

// Minimal inline-markdown renderer for blog body copy — just the two things
// config/blog.ts article bodies use: `[label](/path)` links and `**bold**`
// text. Internal paths (starting with `/`) use react-router's Link so
// in-article product/article links don't full-reload.
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g

interface RichTextProps {
  text?: string | null
}

export default function RichText({ text }: RichTextProps) {
  if (!text) return null
  const nodes: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = TOKEN.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const [, linkLabel, href, bold] = match
    if (href) {
      nodes.push(
        href.startsWith('/') ? (
          <Link key={key++} to={href} className="underline hover:text-ink">
            {linkLabel}
          </Link>
        ) : (
          <a key={key++} href={href} className="underline hover:text-ink" target="_blank" rel="noreferrer">
            {linkLabel}
          </a>
        ),
      )
    } else {
      nodes.push(<strong key={key++}>{bold}</strong>)
    }
    last = TOKEN.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))

  return <>{nodes}</>
}
