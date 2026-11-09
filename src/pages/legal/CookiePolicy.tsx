import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../../components/header/icons'
import { useCookieConsent } from '../../context/CookieConsentContext'
import { COOKIE_CATEGORIES } from '../../lib/cookieConsent'
import {
  COOKIE_EXAMPLES,
  COOKIE_POLICY_INTRO,
  COOKIE_POLICY_LAST_UPDATED,
  COOKIE_POLICY_RELATED_ARTICLES,
  COOKIE_POLICY_SECTIONS,
} from '../../config/cookiePolicy'

// Cookie Policy page, linked from the footer's legal row. The "2. The
// Cookies We Use" section renders straight from the same category list the
// consent banner/modal use, so this page can never drift out of sync with
// what those actually offer.
export default function CookiePolicy() {
  const { consent, openPreferences } = useCookieConsent()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="hover:underline">Home</Link>
        <ChevronRightIcon size={12} />
        <span className="text-black/80">Cookie Policy</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold uppercase lg:text-3xl">Cookie Policy</h1>

      {COOKIE_POLICY_INTRO.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-sm text-black/70">{paragraph}</p>
      ))}

      <button
        type="button"
        onClick={openPreferences}
        className="mt-6 bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-opacity duration-200 hover:opacity-80"
      >
        Manage Cookie Preferences
      </button>

      {COOKIE_POLICY_SECTIONS.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-lg font-bold uppercase">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm text-black/60">{paragraph}</p>
          ))}

          {section.heading === '2. The Cookies We Use' && (
            <div className="mt-6 divide-y divide-line border-y border-line">
              {COOKIE_CATEGORIES.map((cat) => (
                <div key={cat.key} className="py-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-bold uppercase">{cat.label}</h3>
                    <span className="shrink-0 text-xs font-semibold uppercase text-muted">
                      {cat.locked ? 'Always Active' : consent[cat.key] ? 'Currently On' : 'Currently Off'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-black/60">{cat.description}</p>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[480px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-line text-xs font-semibold uppercase text-muted">
                          <th className="py-2 pr-4">Example</th>
                          <th className="py-2 pr-4">Purpose</th>
                          <th className="py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COOKIE_EXAMPLES.filter((example) => example.category === cat.key).map((example) => (
                          <tr key={example.name} className="border-b border-line/60 last:border-b-0">
                            <td className="py-2 pr-4 font-mono text-xs text-black/70">{example.name}</td>
                            <td className="py-2 pr-4 text-black/60">{example.purpose}</td>
                            <td className="py-2 text-black/60">{example.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <p className="mt-10 text-xs text-black/50">Last updated: {COOKIE_POLICY_LAST_UPDATED}</p>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Related Articles</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {COOKIE_POLICY_RELATED_ARTICLES.map((article) => (
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
        Questions about this policy? Visit the{' '}
        <Link to="/help" className="underline">Help Centre</Link>.
      </p>
    </div>
  )
}
