import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../../components/header/icons'
import {
  REVIEWS_POLICY_INTRO,
  REVIEWS_POLICY_LAST_UPDATED,
  REVIEWS_POLICY_RELATED_ARTICLES,
  REVIEWS_POLICY_SECTIONS,
} from '../../config/reviewsPolicy'

// gymshark.com support article "Reviews Policy"
// (eu.gymshark.com/pages/reviews-policy), linked from the Help footer
// column instead of expanding inline.
export default function ReviewsPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/help" className="hover:underline">Help</Link>
        <ChevronRightIcon size={12} />
        <span className="text-black/80">Reviews Policy</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold uppercase lg:text-3xl">Reviews Policy</h1>
      <p className="mt-3 text-sm text-black/60">
        How we handle customer reviews, ratings and related information published on our site.
      </p>

      {REVIEWS_POLICY_INTRO.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-sm text-black/70">{paragraph}</p>
      ))}

      {REVIEWS_POLICY_SECTIONS.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-lg font-bold uppercase">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm text-black/60">{paragraph}</p>
          ))}
          {section.list && (
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-black/60">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.outro && <p className="mt-3 text-sm text-black/60">{section.outro}</p>}
        </section>
      ))}

      <p className="mt-10 text-xs text-black/50">Last updated: {REVIEWS_POLICY_LAST_UPDATED}</p>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Related Articles</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {REVIEWS_POLICY_RELATED_ARTICLES.map((article) => (
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
        Can't find what you're looking for? Visit the{' '}
        <Link to="/help" className="underline">Help Centre</Link>.
      </p>
    </div>
  )
}
