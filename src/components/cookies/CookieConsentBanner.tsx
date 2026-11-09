import { Link } from 'react-router-dom'
import { useCookieConsent } from '../../context/CookieConsentContext'
import './cookies.css'

// Bottom bar shown until the visitor makes a choice. Deliberately not built
// on the shared `Modal` — it shouldn't trap focus or block interaction with
// the rest of the Site the way the search/mini-bag overlays do.
export default function CookieConsentBanner() {
  const { bannerVisible, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent()

  if (!bannerVisible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="gs-cookie-banner fixed inset-x-0 bottom-0 z-[300] border-t border-white/10 bg-brand-black text-brand-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="text-sm text-white/80">
          We use cookies to run the Site, remember your preferences, and (with your consent) measure performance
          and personalise marketing. See our{' '}
          <Link to="/pages/cookie-policy" className="underline hover:text-white">
            Cookie Policy
          </Link>{' '}
          for details.
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={openPreferences}
            className="border border-white/30 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:border-white"
          >
            Manage Preferences
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="border border-white/30 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:border-white"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="bg-brand-white px-4 py-3 text-xs font-semibold uppercase tracking-wide text-brand-black transition-opacity duration-200 hover:opacity-80"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
