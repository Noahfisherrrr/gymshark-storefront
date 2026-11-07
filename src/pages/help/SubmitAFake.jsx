import { Link } from 'react-router-dom'
import { ChevronDownIcon, ChevronRightIcon } from '../../components/header/icons'
import {
  SUBMIT_FAKE_FAQS,
  SUBMIT_FAKE_INTRO,
  SUBMIT_FAKE_RELATED_ARTICLES,
  SUBMIT_FAKE_REPORT_NOTE,
  SUBMIT_FAKE_RISKS,
} from '../../config/submitAFake'

// gymshark.com support page "Submit a Fake"
// (gymshark.com/pages/submit-a-fake), linked from the Help footer column.
// The report CTA points at /help as a placeholder — a dedicated brand
// protection contact channel is pending the client (Brief.md #4).
export default function SubmitAFake() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/help" className="hover:underline">Help</Link>
        <ChevronRightIcon size={12} />
        <span className="text-black/80">Submit a Fake</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold uppercase lg:text-3xl">Submit a Fake</h1>

      {SUBMIT_FAKE_INTRO.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-sm text-black/70">{paragraph}</p>
      ))}

      <section className="mt-8 rounded-sm border border-line bg-surface-subtle p-6">
        <h2 className="text-sm font-bold uppercase">Report A Fake</h2>
        <p className="mt-2 text-sm text-black/60">{SUBMIT_FAKE_REPORT_NOTE}</p>
        <Link
          to="/help"
          className="mt-4 inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-semibold uppercase text-white transition-opacity duration-200 hover:opacity-80"
        >
          Report A Fake
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">FAQs</h2>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {SUBMIT_FAKE_FAQS.map((faq) => (
            <details key={faq.q} className="group scroll-mt-28">
              <summary className="flex items-center justify-between gap-4 py-4 text-sm font-semibold">
                {faq.q}
                <ChevronDownIcon size={18} className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-4 pr-8 text-sm text-black/60">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Fake Websites? Risky Business.</h2>
        <p className="mt-3 text-sm text-black/60">
          Buying from a counterfeit site isn't just a wasted order — it can cost you more than you think:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/60">
          {SUBMIT_FAKE_RISKS.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Related Articles</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {SUBMIT_FAKE_RELATED_ARTICLES.map((article) => (
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
