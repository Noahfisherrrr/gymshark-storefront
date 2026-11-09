import { useState, type ComponentType, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PAYMENT_METHODS } from '../../config/store'
import { useCookieConsent } from '../../context/CookieConsentContext'
import {
  AfterpayIcon,
  AmexIcon,
  ApplePayIcon,
  KlarnaIcon,
  MastercardIcon,
  PaypalIcon,
  SezzleIcon,
  VisaIcon,
} from '../footer/PaymentIcons'
import Modal from '../ui/Modal'
import {
  ChevronDownIcon,
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../header/icons'

// Ported from gymshark.com's footer structure (nav columns → featured tiles
// → socials → legal row → region/language → payment badges → copyright).
// The "Pages" column mirrors gymshark.com's, minus items we don't have
// content/rights for: Loyalty Program (no program defined yet), Military &
// Government Discount (no verification provider), and Accessibility
// Statement / Factory List / Sustainability (no real commitments to
// describe) — see brief notes in plan.md. What's left all routes to real
// pages (Brief.md #4, #5).

const CURRENT_YEAR = new Date().getFullYear()

const NAV_COLUMNS = [
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '/help' },
      { label: 'Track Your Order', href: '/account' },
      { label: 'Delivery Information', href: '/help/delivery-information' },
      { label: 'Returns Policy', href: '/help/returns-policy' },
      { label: 'Make A Return', href: '/account/returns' },
      { label: 'Orders', href: '/account' },
      { label: 'Submit a Fake', href: '/help/submit-a-fake' },
      { label: 'Reviews Policy', href: '/help/reviews-policy' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
    ],
  },
  {
    title: 'Pages',
    links: [
      { label: 'Stores', href: '/pages/stores' },
      { label: 'Refer a Friend', href: '/pages/refer-a-friend' },
      { label: 'Our Blog', href: '/blog' },
      { label: 'About Us', href: '/pages/about-us' },
      { label: 'Careers', href: '/pages/careers' },
      { label: 'Student Discount', href: '/pages/student-discount' },
    ],
  },
]

const FEATURED_TILES = [
  { label: 'Our Blog', href: '/blog' },
  { label: 'Students get an extra 12% off', href: '/pages/student-discount' },
]

const SOCIAL_LINKS = [
  { label: 'Discord', Icon: DiscordIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Pinterest', Icon: PinterestIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Twitter', Icon: TwitterIcon },
  { label: 'TikTok', Icon: TiktokIcon },
]

const PAYMENT_ICON_MAP: Record<string, ComponentType> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  paypal: PaypalIcon,
  applePay: ApplePayIcon,
  amex: AmexIcon,
  klarna: KlarnaIcon,
  afterpay: AfterpayIcon,
  sezzle: SezzleIcon,
}

const LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: '/pages/terms-conditions' },
  { label: 'Terms of Use', href: '/pages/terms-of-use' },
  { label: 'Privacy Notice', href: '/pages/privacy-notice' },
  { label: 'Cookie Policy', href: '/pages/cookie-policy' },
  { label: 'Modern Slavery Statement', href: '/pages/modern-slavery-statement' },
]

function FooterLink({
  href,
  children,
  mobile = false,
}: {
  href: string
  children: ReactNode
  mobile?: boolean
}) {
  return (
    <Link
      to={href}
      data-testid={mobile ? 'footer-navigationPanelLinkMobile' : 'footer-navigationPanelLink'}
      className="block py-1.5 text-sm text-white/70 transition-colors duration-200 hover:text-white hover:underline lg:py-1"
    >
      {children}
    </Link>
  )
}

interface FooterNavLink {
  label: string
  href: string
}

function NavColumn({ title, links }: { title: string; links: FooterNavLink[] }) {
  return (
    <div>
      {/* Desktop: static column. */}
      <h2 className="hidden text-xs font-semibold uppercase tracking-wide text-white lg:block">{title}</h2>
      <div className="mt-3 hidden lg:block">
        {links.map((link) => (
          <FooterLink key={link.label} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </div>

      {/* Mobile: native accordion — gets cursor:pointer from the global
          `summary` rule in index.css. */}
      <details className="group border-b border-white/10 lg:hidden">
        <summary className="flex items-center justify-between py-4 text-sm font-semibold uppercase tracking-wide text-white">
          {title}
          <ChevronDownIcon size={18} className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="pb-3">
          {links.map((link) => (
            <FooterLink key={link.label} href={link.href} mobile>
              {link.label}
            </FooterLink>
          ))}
        </div>
      </details>
    </div>
  )
}

function NewsletterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // No real newsletter integration yet (Brief.md #12) — just acknowledge.
    setSent(true)
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => {
        onClose()
        setSent(false)
        setEmail('')
      }}
      label="Email sign up"
      className="fixed left-1/2 top-1/2 w-[90vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 text-ink"
    >
      <h2 className="font-display text-lg font-extrabold uppercase">Email Sign Up</h2>
      {sent ? (
        <p className="mt-3 text-sm text-muted">Thanks — we'll be in touch once sign-ups go live.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted" htmlFor="footer-newsletter-email">
            Email address
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
          <button type="submit" className="w-full bg-ink px-4 py-3 text-sm font-semibold uppercase text-white transition-opacity duration-200 hover:opacity-80">
            Subscribe
          </button>
        </form>
      )}
      <button
        type="button"
        onClick={onClose}
        className="mt-4 text-xs uppercase text-muted underline transition-colors duration-200 hover:text-ink"
      >
        Close
      </button>
    </Modal>
  )
}

export default function Footer() {
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const { openPreferences } = useCookieConsent()

  return (
    <footer className="border-t border-black/10 bg-brand-black text-brand-white">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <nav aria-label="Footer" className="grid grid-cols-1 gap-x-8 lg:grid-cols-3">
          {NAV_COLUMNS.map((col) => (
            <NavColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </nav>

        <div className="mt-10 border-t border-white/10 pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-white/60">More About Brand Name</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {FEATURED_TILES.map((tile) => (
              <Link
                key={tile.label}
                to={tile.href}
                className="flex items-center justify-between border border-white/15 px-4 py-3 text-sm text-white/80 transition-colors duration-200 hover:border-white hover:text-white"
              >
                {tile.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setNewsletterOpen(true)}
              className="flex items-center justify-between border border-white/15 px-4 py-3 text-left text-sm text-white/80 transition-colors duration-200 hover:border-white hover:text-white"
            >
              Email Sign Up
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-8">
          {SOCIAL_LINKS.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              title="Pending the client's social accounts (Brief.md #5)"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-white hover:text-white"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs text-white/60 transition-colors duration-200 hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openPreferences}
              className="text-xs text-white/60 transition-colors duration-200 hover:text-white hover:underline"
            >
              Cookie Settings
            </button>
          </div>

          <div className="flex gap-3">
            {/* Multi-market support is pending the client's shipping countries
                (Brief.md #11) — a single-market placeholder for now. */}
            <label className="sr-only" htmlFor="footer-store-select">
              Store
            </label>
            <select id="footer-store-select" defaultValue="us" className="border border-white/15 bg-transparent px-3 py-2 text-xs text-white/80">
              <option value="us">United States</option>
            </select>
            <label className="sr-only" htmlFor="footer-language-select">
              Language
            </label>
            <select id="footer-language-select" defaultValue="en" className="border border-white/15 bg-transparent px-3 py-2 text-xs text-white/80">
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-8">
          {PAYMENT_METHODS.map(({ label, icon }) => {
            const Icon = PAYMENT_ICON_MAP[icon]
            return (
              <span key={label} className="inline-flex">
                <span className="sr-only">{label}</span>
                <Icon />
              </span>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-4 text-xs text-white/50 lg:px-8">
        © {CURRENT_YEAR} | Brand Name | All Rights Reserved.
      </div>

      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </footer>
  )
}
