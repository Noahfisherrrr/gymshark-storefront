import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../../components/header/icons'
import {
  TERMS_OF_USE_INTRO,
  TERMS_OF_USE_LAST_UPDATED,
  TERMS_OF_USE_RELATED_ARTICLES,
  TERMS_OF_USE_SECTIONS,
} from '../../config/termsOfUse'

// Terms of Use page, linked from the footer's legal row. Replaces the old
// placeholder link that pointed at /help.
export default function TermsOfUse() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="hover:underline">Home</Link>
        <ChevronRightIcon size={12} />
        <span className="text-black/80">Terms of Use</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold uppercase lg:text-3xl">Terms of Use</h1>

      {TERMS_OF_USE_INTRO.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-sm text-black/70">{paragraph}</p>
      ))}

      {TERMS_OF_USE_SECTIONS.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-lg font-bold uppercase">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm text-black/60">{paragraph}</p>
          ))}
        </section>
      ))}

      <p className="mt-10 text-xs text-black/50">Last updated: {TERMS_OF_USE_LAST_UPDATED}</p>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Related Articles</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {TERMS_OF_USE_RELATED_ARTICLES.map((article) => (
            <li key={article.q}>
              <Link
                to={article.href}
                className="flex items-center justify-between gap-4 py-4 text-sm font-semibold hover:bg-surface-subtle"
              >
                {article.q}
                <ChevronRightIcon size={18} className="shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">
        Questions about these Terms? Visit the{' '}
        <Link to="/help" className="underline">Help Centre</Link>.
      </p>
    </div>
  )
}
