import { useState } from 'react'
import Modal from '../ui/Modal'
import { useCookieConsent } from '../../context/CookieConsentContext'
import { COOKIE_CATEGORIES, getAllAcceptedConsent, getDefaultConsent } from '../../lib/cookieConsent'

function CategoryToggle({ category, checked, onChange }) {
  const { key, label, locked, description } = category
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-5 last:border-b-0">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide">{label}</h3>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
        {locked && <p className="mt-1.5 text-xs font-semibold uppercase text-muted">Always Active</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label} cookies`}
        disabled={locked}
        onClick={() => onChange(key, !checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-ink' : 'bg-line'
        } ${locked ? 'opacity-50' : ''}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

export default function CookiePreferencesModal() {
  const { consent, preferencesOpen, closePreferences, savePreferences, acceptAll, rejectNonEssential } =
    useCookieConsent()
  const [draft, setDraft] = useState(consent)

  // Re-seed the draft from the current saved consent each time the modal
  // opens, so a cancelled edit never leaks into the next open. Adjusting
  // state during render (React's documented pattern for this) instead of
  // in an effect avoids an extra commit where the modal briefly shows
  // stale toggles.
  const [wasOpen, setWasOpen] = useState(preferencesOpen)
  if (preferencesOpen !== wasOpen) {
    setWasOpen(preferencesOpen)
    if (preferencesOpen) setDraft(consent)
  }

  function handleToggle(key, value) {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Modal
      isOpen={preferencesOpen}
      onRequestClose={closePreferences}
      closeTimeoutMs={300}
      label="Cookie preferences"
      overlayClassName="gs-overlay--fade flex flex-col justify-end lg:items-center lg:justify-center lg:p-4"
      closingClassName="gs-cookie-prefs--closing"
      className="gs-cookie-prefs flex max-h-[85vh] w-full flex-col bg-white text-ink lg:w-[90vw] lg:max-w-[560px]"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5">
        <h2 className="font-display text-lg font-extrabold uppercase">Cookie Preferences</h2>
        <button
          type="button"
          onClick={closePreferences}
          aria-label="Close"
          className="text-2xl leading-none text-muted transition-colors duration-200 hover:text-ink"
        >
          &times;
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6">
        <p className="pt-5 text-sm text-muted">
          Choose which cookies you're happy for us to use. You can change this at any time from the "Cookie
          Settings" link in the footer — see our{' '}
          <a href="/pages/cookie-policy" className="underline">
            Cookie Policy
          </a>{' '}
          for what each category does.
        </p>
        {COOKIE_CATEGORIES.map((category) => (
          <CategoryToggle
            key={category.key}
            category={category}
            checked={!!draft[category.key]}
            onChange={handleToggle}
          />
        ))}
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-line px-6 py-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => {
            setDraft(getDefaultConsent())
            rejectNonEssential()
          }}
          className="border border-ink px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-surface-subtle"
        >
          Reject Non-Essential
        </button>
        <button
          type="button"
          onClick={() => savePreferences(draft)}
          className="border border-ink px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-surface-subtle"
        >
          Save Preferences
        </button>
        <button
          type="button"
          onClick={() => {
            setDraft(getAllAcceptedConsent())
            acceptAll()
          }}
          className="bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-opacity duration-200 hover:opacity-80"
        >
          Accept All
        </button>
      </div>
    </Modal>
  )
}
