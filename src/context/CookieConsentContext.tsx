import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  getAllAcceptedConsent,
  getDefaultConsent,
  readStoredConsent,
  writeStoredConsent,
  type ConsentState,
} from '../lib/cookieConsent'

interface CookieConsentContextValue {
  consent: ConsentState
  hasDecided: boolean
  bannerVisible: boolean
  preferencesOpen: boolean
  acceptAll: () => void
  rejectNonEssential: () => void
  savePreferences: (next: ConsentState) => void
  openPreferences: () => void
  closePreferences: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

// Drives the consent banner, the preferences modal, and the "Manage
// Cookies" trigger in the footer / Cookie Policy page — all three read and
// write through this one place so they can never disagree with each other.
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // Read once, lazily, so the first render already reflects any stored
  // choice instead of flashing the banner before an effect catches up.
  const [stored] = useState(readStoredConsent)
  const [consent, setConsent] = useState<ConsentState>(() => stored ?? getDefaultConsent())
  const [hasDecided, setHasDecided] = useState(() => !!stored)
  const [bannerVisible, setBannerVisible] = useState(() => !stored)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  function persist(next: ConsentState): void {
    const saved = writeStoredConsent(next)
    setConsent(saved)
    setHasDecided(true)
    setBannerVisible(false)
    setPreferencesOpen(false)
  }

  function acceptAll(): void {
    persist(getAllAcceptedConsent())
  }

  function rejectNonEssential(): void {
    persist(getDefaultConsent())
  }

  function savePreferences(next: ConsentState): void {
    persist(next)
  }

  function openPreferences(): void {
    setPreferencesOpen(true)
  }

  function closePreferences(): void {
    // Dismissing without hitting Save/Accept isn't a decision — leave
    // `consent` and the banner (if still undecided) exactly as they were.
    setPreferencesOpen(false)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasDecided,
        bannerVisible,
        preferencesOpen,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider')
  return ctx
}
