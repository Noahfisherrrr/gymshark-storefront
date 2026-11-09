// Cookie consent: category definitions + localStorage persistence, shared by
// the consent banner, the preferences modal, and the Cookie Policy page so
// all three agree on what a "category" is and how consent is stored.
const STORAGE_KEY = 'cookieConsent'
const STORAGE_VERSION = 1

export interface CookieCategory {
  key: string
  label: string
  locked: boolean
  description: string
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    key: 'necessary',
    label: 'Strictly Necessary',
    locked: true,
    description:
      'Required for the Site to work — things like keeping items in your bag, remembering you’re logged in, and balancing load across our servers. These can’t be switched off.',
  },
  {
    key: 'functional',
    label: 'Functional',
    locked: false,
    description:
      'Remember choices you make — region, language, recently viewed items — so the Site feels tailored without you re-entering them.',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    locked: false,
    description:
      'Help us understand how visitors use the Site, so we can measure performance and improve it. Data is aggregated and does not directly identify you.',
  },
  {
    key: 'marketing',
    label: 'Marketing',
    locked: false,
    description:
      'Used by us and our advertising partners to show you more relevant ads on this Site and others, and to measure how well our campaigns work.',
  },
]

export type ConsentState = Record<string, boolean>

export const DEFAULT_CONSENT: ConsentState = COOKIE_CATEGORIES.reduce(
  (acc, { key, locked }) => ({ ...acc, [key]: locked }),
  {} as ConsentState,
)

const ALL_ACCEPTED: ConsentState = COOKIE_CATEGORIES.reduce(
  (acc, { key }) => ({ ...acc, [key]: true }),
  {} as ConsentState,
)

export function getAllAcceptedConsent(): ConsentState {
  return { ...ALL_ACCEPTED }
}

export function getDefaultConsent(): ConsentState {
  return { ...DEFAULT_CONSENT }
}

// Returns null when the visitor hasn't made a choice yet (banner should show).
export function readStoredConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.version !== STORAGE_VERSION || !parsed.consent) return null
    return { ...DEFAULT_CONSENT, ...parsed.consent, necessary: true }
  } catch {
    return null
  }
}

export function writeStoredConsent(consent: ConsentState): ConsentState {
  const normalized = { ...consent, necessary: true }
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, consent: normalized, updatedAt: new Date().toISOString() }),
    )
  } catch {
    // Storage unavailable (private mode, quota) — consent just won't persist across visits.
  }
  return normalized
}
