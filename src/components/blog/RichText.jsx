import { Link } from 'react-router-dom'

// Minimal inline-markdown renderer for blog body copy — just the two things
// config/blog.js article bodies use: `[label](/path)` links and `**bold**`
// text. Internal paths (starting with `/`) use react-router's Link so
// in-article product/article links don't full-reload.
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g

export default function RichText({ text }) {
  if (!text) return null
  const nodes = []
  let last = 0
  let match
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
