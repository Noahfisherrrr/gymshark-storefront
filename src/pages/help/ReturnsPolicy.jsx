import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../../components/header/icons'
import {
  RETURNS_CHRISTMAS_NOTE,
  RETURNS_CONDITION_REQUIREMENTS,
  RETURNS_EXCHANGE_COUNTRIES,
  RETURNS_EXCHANGE_LIMITATIONS,
  RETURNS_GOOD_TO_KNOWS,
  RETURNS_INTRO,
  RETURNS_NON_RETURNABLE_ITEMS,
  RETURNS_RELATED_ARTICLES,
} from '../../config/returnsPolicy'

// gymshark.com support article "Returns Policy"
// (support.gymshark.com/en/articles/5227025-returns-policy), linked from
// the Help hub's matching FAQ row instead of expanding inline.
export default function ReturnsPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/help" className="hover:underline">Help</Link>
        <ChevronRightIcon size={12} />
        <Link to="/help#returns-refunds" className="hover:underline">Returns & Refunds</Link>
        <ChevronRightIcon size={12} />
        <span className="text-black/80">Returns Policy</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold uppercase lg:text-3xl">Returns Policy</h1>
      <p className="mt-3 text-sm text-black/60">
        Understand our returns policy, what items can/can't be returned and how exchanges are processed.
      </p>

      {RETURNS_INTRO.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-sm text-black/70">{paragraph}</p>
      ))}

      <section className="mt-8 rounded-sm border border-line bg-surface-subtle p-4">
        <h2 className="text-sm font-bold uppercase">{RETURNS_CHRISTMAS_NOTE.heading}</h2>
        {RETURNS_CHRISTMAS_NOTE.lines.map((line) => (
          <p key={line} className="mt-2 text-sm font-semibold">{line}</p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">What Items Can I Return?</h2>
        <p className="mt-3 text-sm text-black/60">
          Any unwanted product must be returned within 30 days from when your order was delivered (if the order
          was placed online) or was purchased (if you bought the items in one of our stores).
        </p>
        <p className="mt-2 text-sm text-black/60">Please see below for any exceptions to this rule:</p>

        <h3 className="mt-5 text-sm font-semibold">Non-returnable items</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-black/60">
          {RETURNS_NON_RETURNABLE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="mt-5 text-sm font-semibold">Product condition requirements</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-black/60">
          {RETURNS_CONDITION_REQUIREMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-black/50">This does not affect your statutory rights.</p>

        <p className="mt-4 text-sm text-black/60">
          To receive a full refund on eligible returns, all items must be returned to us unworn, unused, unwashed
          and in the same condition you received them. If an item is returned to us damaged, worn, or in an
          unsuitable condition, we won't be able to give you a refund.
        </p>
        <p className="mt-2 text-sm text-black/60">
          All items are inspected on return. Items do not need to be returned in their original packaging, but
          they should be securely packed to avoid damage during transit.
        </p>

        <Link
          to="/account/returns"
          className="mt-5 inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-semibold uppercase text-white transition-opacity duration-200 hover:opacity-80"
        >
          Start A Return or Exchange
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Returning Items In Our Retail Stores</h2>
        <p className="mt-3 text-sm text-black/60">
          If you purchased items at one of our stores, you must have a valid original receipt or e-receipt.
        </p>
        <p className="mt-2 text-sm text-black/60">You can only return online orders in the same country you purchased.</p>
        <p className="mt-4 rounded-sm border border-line bg-surface-subtle p-4 text-sm text-black/70">
          <span className="font-bold uppercase">Important: </span>
          Orders placed through our NL online store cannot be returned to the Kalverstraat store. You can only
          return items purchased in store at this location.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">When Will I Get My Refund?</h2>
        <p className="mt-3 text-sm text-black/60">
          This can depend on how long it takes your chosen returns courier to get the items back to us before
          being processed for a return at our warehouse.
        </p>

        <h3 className="mt-5 text-sm font-semibold">Good to knows...</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-black/60">
          {RETURNS_GOOD_TO_KNOWS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Can I Combine Multiple Returns Into One Return?</h2>
        <p className="mt-3 text-sm text-black/60">
          The short answer is no. Unfortunately, we're currently unable to process combined returns and
          therefore require you to send your returns from different orders separately.
        </p>
        <p className="mt-2 text-sm text-black/60">
          Furthermore, returns registered separately, even if from the same order, can't be processed if
          returned in one package. This only applies to combining multiple separate returns. If you're doing a
          return and an exchange from the same order, you can send both items back together in one package.
        </p>
        <p className="mt-2 text-sm text-black/60">
          Combining the returns into the same package may cause an error in your refund, so please package them
          separately.
        </p>
        <p className="mt-2 text-sm text-black/60">
          If you've already sent back multiple returns in one package, please let us know so we can look into
          this for you. Please retain any proof of return postage receipts as we may need to view these as part
          of your return query.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Do You Offer Exchanges?</h2>
        <p className="mt-3 text-sm text-black/60">Exchanges are currently available on the following stores:</p>
        <p className="mt-2 text-sm text-black/60">{RETURNS_EXCHANGE_COUNTRIES}</p>

        <h3 className="mt-5 text-sm font-semibold">Exchange limitations</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-black/60">
          {RETURNS_EXCHANGE_LIMITATIONS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Can I Return Something If I Bought It At Your Pop-Up Store/Event?</h2>
        <p className="mt-3 text-sm text-black/60">
          Unfortunately, items purchased at our pop-up stores or during events aren't eligible to be returned.
        </p>
        <p className="mt-2 text-sm text-black/60">
          We know this isn't the news you were hoping for, but if you've got any questions about your purchase,
          our Customer Support team will be happy to help.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Returning Items From Other Brands</h2>
        <p className="mt-3 text-sm text-black/60">
          If you've returned an item from another brand to us, it will not be returned, unless at our discretion.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Received A Faulty Or Incorrect Item?</h2>

        <h3 className="mt-5 text-sm font-semibold">Faulty items</h3>
        <p className="mt-2 text-sm text-black/60">
          Photos of the fault may be required for verification, but faulty items do not need to be returned.
        </p>

        <h3 className="mt-5 text-sm font-semibold">Incorrect items</h3>
        <p className="mt-2 text-sm text-black/60">
          Contact us if you've received an incorrect item and we'll sort a replacement or return.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Related Articles</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {RETURNS_RELATED_ARTICLES.map((article) => (
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
