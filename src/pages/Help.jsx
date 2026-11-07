import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CardIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  GearIcon,
  InfoIcon,
  ProductIcon,
  ReturnIcon,
  SearchIcon,
  TruckIcon,
} from '../components/header/icons'

// Help center hub — layout and interaction model (hero search, popular
// articles, category grid -> per-category article accordions) follow the
// reference design. Article copy below is representative placeholder text,
// not the client's real policies, which are still pending (Brief.md #10, #11).
// Swap the `a` strings once real content is approved; everything else
// (routing, search, open/close logic) can stay as-is.
const CATEGORIES = [
  {
    id: 'orders-delivery',
    title: 'Orders & Delivery',
    icon: TruckIcon,
    articles: [
      { id: 'expected-delivery-date', q: 'Expected Delivery Date', a: 'Standard orders typically arrive within 3-5 working days, and express orders within 1-2 working days. You’ll get an estimated date at checkout and in your confirmation email.' },
      { id: 'delivery-information', q: 'Delivery Information', a: 'We offer standard and express delivery. Delivery costs and timeframes depend on your location and are shown at checkout before you pay.' },
      { id: 'track-my-order', q: 'How Do I Track My Order?', a: 'Once your order ships, you’ll receive a tracking link by email. You can also track it anytime from Your Account > Order History.' },
      { id: 'order-hasnt-arrived', q: 'My Order Hasn’t Arrived', a: 'If your order is later than the estimated delivery date, check the tracking link first. If it still hasn’t moved after 2 working days, contact us and we’ll look into it.' },
      { id: 'change-delivery-address', q: 'Can I Change My Delivery Address?', a: 'We can update your address if the order hasn’t been dispatched yet. Contact us as soon as possible after ordering and we’ll try to amend it.' },
      { id: 'international-delivery', q: 'Do You Deliver Internationally?', a: 'Yes, we ship to a number of countries outside the UK. Available destinations and rates are shown at checkout once you enter your address.' },
      { id: 'delivery-options', q: 'What Are My Delivery Options?', a: 'You can choose standard or express delivery at checkout, along with any click-and-collect options available in your area.' },
      { id: 'order-arrived-damaged', q: 'My Order Arrived Damaged', a: 'We’re sorry to hear that. Contact us with your order number and a photo of the item and we’ll sort a replacement or refund.' },
    ],
  },
  {
    id: 'returns-refunds',
    title: 'Returns & Refunds',
    icon: ReturnIcon,
    articles: [
      { id: 'refund-or-exchange', q: 'Where Is My Refund or Exchange?', a: 'Refunds are processed within 5 working days of us receiving your return, and typically show on your statement a few days after that. Exchanges are sent out as soon as the original item is received.' },
      { id: 'how-to-return', q: 'How Do I Return an Item?', a: 'Start a return from Your Account > Order History, print the label we send you, and drop the parcel at the specified carrier.' },
      { id: 'returns-policy', q: 'What Is Your Returns Policy?', a: 'Unworn items in their original condition can be returned within 30 days of delivery for a full refund or exchange.' },
      { id: 'refund-timing', q: 'How Long Do Refunds Take?', a: 'Once your return is received, refunds are issued within 5 working days to your original payment method.' },
    ],
  },
  {
    id: 'payments-promotions',
    title: 'Payments & Promotions',
    icon: CardIcon,
    articles: [
      { id: 'payment-methods', q: 'What Payment Methods Do You Accept?', a: 'We accept major debit and credit cards, plus a selection of digital wallets shown at checkout.' },
      { id: 'payment-declined', q: 'Why Was My Payment Declined?', a: 'Declines are usually down to the card issuer. Double-check your details, make sure there are sufficient funds, and try again or use another payment method.' },
      { id: 'discount-code', q: 'How Do I Use a Discount Code?', a: 'Enter your code in the promo code field at checkout and select Apply. The discount will be reflected in your order total before you pay.' },
      { id: 'multiple-codes', q: 'Can I Use Multiple Discount Codes?', a: 'Only one discount code can be applied per order, unless stated otherwise in the promotion’s terms.' },
      { id: 'charge-timing', q: 'When Am I Charged for My Order?', a: 'Payment is taken when you place your order, not when it ships.' },
      { id: 'gift-cards', q: 'Do You Offer Gift Cards?', a: 'Gift cards are available to purchase on-site and can be redeemed at checkout against any order.' },
      { id: 'change-payment-method', q: 'Can I Change My Payment Method After Ordering?', a: 'Once an order is placed we’re unable to change the payment method. You’d need to cancel (if not yet dispatched) and reorder.' },
      { id: 'charged-twice', q: 'Why Was I Charged Twice?', a: 'This is usually a temporary authorization hold rather than a duplicate charge, and it’ll drop off within a few days. Contact us if it’s still there after a week.' },
      { id: 'price-match', q: 'Do You Price Match?', a: 'We don’t currently offer price matching, but keep an eye on your account and our promotions page for upcoming offers.' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical',
    icon: GearIcon,
    articles: [
      { id: 'cant-log-in', q: 'I Can’t Log Into My Account', a: 'Make sure you’re using the email address you signed up with. If you’ve forgotten your password, use the reset link on the login page.' },
      { id: 'site-not-loading', q: 'The Website Isn’t Loading Properly', a: 'Try clearing your browser cache or switching browsers. If the problem continues, let us know what device and browser you’re using.' },
      { id: 'not-receiving-emails', q: 'I’m Not Receiving Emails From You', a: 'Check your spam or promotions folder first, and make sure your email was entered correctly at sign-up.' },
      { id: 'reset-password', q: 'How Do I Reset My Password?', a: 'Select "Forgot password" on the login page and follow the link we send to your email.' },
    ],
  },
  {
    id: 'product',
    title: 'Product',
    icon: ProductIcon,
    articles: [
      { id: 'find-my-size', q: 'How Do I Find My Size?', a: 'Each product page has a size guide link with measurements to help you choose the right fit.' },
      { id: 'care-instructions', q: 'How Should I Care For My Items?', a: 'Care instructions are on the product label and listed on each product page. In general, wash with similar colors and avoid high heat.' },
      { id: 'back-in-stock', q: 'Is an Item Back in Stock?', a: 'Sold-out items can be restocked depending on demand. Use the "notify me" option on the product page to be first to know.' },
      { id: 'true-to-size', q: 'Are Your Products True to Size?', a: 'Most styles fit true to size, though some are designed with a tighter or looser fit — this is noted in the product description.' },
      { id: 'materials', q: 'What Are Your Products Made From?', a: 'Fabric composition is listed on every product page under the details section.' },
      { id: 'size-availability', q: 'How Do I Know If an Item Is Available in My Size?', a: 'Available sizes are shown on the product page. A greyed-out size means it’s currently out of stock.' },
      { id: 'restock-sold-out', q: 'Do You Restock Sold-Out Items?', a: 'Popular items are often restocked, but this isn’t guaranteed for every style.' },
      { id: 'technical-fabric-care', q: 'How Do I Care for Technical Fabrics?', a: 'Wash technical fabrics inside out on a cool, gentle cycle and avoid fabric softener, which can affect moisture-wicking performance.' },
      { id: 'size-guides', q: 'Are There Size Guides for Each Product?', a: 'Yes, every product page links to a size guide with measurements for that specific style.' },
    ],
  },
  {
    id: 'general',
    title: 'General',
    icon: InfoIcon,
    articles: [
      { id: 'contact-customer-service', q: 'How Do I Contact Customer Service?', a: 'You can reach us through the Contact page — we aim to respond within 24-48 hours.' },
      { id: 'student-discount', q: 'Do You Offer Student Discount?', a: 'Eligible students can verify their status at checkout for a discount on their order.' },
      { id: 'where-based', q: 'Where Are You Based?', a: 'Details on our head office and operations are available on our About page.' },
      { id: 'physical-stores', q: 'Do You Have Physical Stores?', a: 'Store availability varies by location — check our site for the latest on any physical or pop-up locations.' },
      { id: 'unsubscribe-emails', q: 'How Do I Unsubscribe From Emails?', a: 'Use the unsubscribe link at the bottom of any marketing email, or update your preferences from Your Account.' },
      { id: 'size-guide-location', q: 'Where Can I Find Your Size Guide?', a: 'Size guides are linked on every product page, under the size selector.' },
    ],
  },
]

const POPULAR_ARTICLE_IDS = ['expected-delivery-date', 'refund-or-exchange', 'delivery-information']

export default function Help() {
  const { hash } = useLocation()
  const [query, setQuery] = useState('')
  const [openArticleId, setOpenArticleId] = useState(null)

  // The router doesn't jump to #anchors on its own.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  const allArticles = useMemo(
    () => CATEGORIES.flatMap((cat) => cat.articles.map((article) => ({ ...article, categoryId: cat.id, categoryTitle: cat.title }))),
    [],
  )

  const popularArticles = useMemo(
    () => POPULAR_ARTICLE_IDS.map((id) => allArticles.find((article) => article.id === id)).filter(Boolean),
    [allArticles],
  )

  const trimmedQuery = query.trim().toLowerCase()
  const searchResults = useMemo(() => {
    if (!trimmedQuery) return null
    return allArticles.filter((article) => article.q.toLowerCase().includes(trimmedQuery))
  }, [allArticles, trimmedQuery])

  function openArticle(article) {
    setOpenArticleId(article.id)
  }

  return (
    <div>
      <section className="bg-brand-black px-4 py-16 text-center text-brand-white lg:py-24">
        <h1 className="text-2xl font-bold uppercase lg:text-3xl">How Can We Help?</h1>
        <div className="mx-auto mt-6 max-w-xl">
          <label htmlFor="help-search" className="sr-only">
            Search for articles
          </label>
          <div className="relative">
            <SearchIcon size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              id="help-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for articles..."
              className="w-full rounded-sm bg-white/10 py-3.5 pl-12 pr-4 text-sm text-brand-white placeholder:text-white/60 focus:bg-white/15 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
        {searchResults ? (
          <section>
            <h2 className="text-lg font-bold uppercase">
              {searchResults.length ? `Results for “${query.trim()}”` : `No results for “${query.trim()}”`}
            </h2>
            {searchResults.length > 0 && (
              <div className="mt-4 rounded-sm border border-line">
                {searchResults.map((article, i) => (
                  <Link
                    key={article.id}
                    to={`#${article.categoryId}`}
                    onClick={() => openArticle(article)}
                    className={`flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold hover:bg-surface-subtle ${i !== searchResults.length - 1 ? 'border-b border-line' : ''}`}
                  >
                    <span>
                      {article.q}
                      <span className="ml-2 font-normal text-muted">{article.categoryTitle}</span>
                    </span>
                    <ChevronRightIcon size={18} className="shrink-0 text-muted" />
                  </Link>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="rounded-sm border border-line p-6">
              <h2 className="text-lg font-bold uppercase">Popular Articles</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:gap-6">
                {popularArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`#${article.categoryId}`}
                    onClick={() => openArticle(article)}
                    className="flex items-center justify-between gap-2 text-sm font-semibold hover:underline"
                  >
                    {article.q}
                    <ChevronRightIcon size={18} className="shrink-0 text-muted" />
                  </Link>
                ))}
              </div>
            </section>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const CatIcon = cat.icon
                return (
                  <Link
                    key={cat.id}
                    to={`#${cat.id}`}
                    className="flex items-center gap-4 rounded-sm border border-line p-5 hover:bg-surface-subtle"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-brand-black text-brand-white">
                      <CatIcon size={22} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{cat.title}</span>
                      <span className="block text-sm text-muted">{cat.articles.length} articles</span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </>
        )}

        <p className="mt-10 text-sm text-muted">
          Can’t find what you’re looking for? Track an order from{' '}
          <Link to="/account" className="underline">your account</Link>.
        </p>

        {CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id} className="mt-12 scroll-mt-28">
            <h2 className="text-lg font-bold uppercase">{cat.title}</h2>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {cat.articles.map((article) => (
                <details
                  key={article.id}
                  id={`${cat.id}-${article.id}`}
                  open={openArticleId === article.id}
                  onToggle={(e) => setOpenArticleId(e.target.open ? article.id : null)}
                  className="group scroll-mt-28"
                >
                  <summary className="flex items-center justify-between gap-4 py-4 text-sm font-semibold">
                    {article.q}
                    <ChevronDownIcon size={18} className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 pr-8 text-sm text-black/60">{article.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
