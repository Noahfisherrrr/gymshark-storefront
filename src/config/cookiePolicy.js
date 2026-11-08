// Cookie Policy — standard e-commerce cookie language, cross-referenced
// with the categories in ../lib/cookieConsent.js so the policy text and the
// consent banner/modal can never describe different categories. Brand
// mentions are genericized per the client's IP boundaries (see plan.md);
// the client's own legal counsel should review and approve this text
// before public launch (Brief.md #10).
export const COOKIE_POLICY_INTRO = [
  'This Cookie Policy explains what cookies are, which ones Brand Name ("we", "us", "our") uses on this website (the "Site"), and how you can manage your preferences.',
  'It should be read alongside our Privacy Notice, which explains more broadly how we handle your personal data.',
]

export const COOKIE_POLICY_SECTIONS = [
  {
    heading: '1. What Are Cookies?',
    paragraphs: [
      '1.1. Cookies are small text files placed on your device when you visit a website. They let the site recognise your device on return visits, and are widely used to make websites work, or work better.',
      '1.2. We also use similar technologies, such as local storage and pixels, which we refer to collectively as "cookies" in this policy.',
    ],
  },
  {
    heading: '2. The Cookies We Use',
    paragraphs: [
      '2.1. We group our cookies into the categories below. You can accept or reject each non-essential category at any time using the "Manage Cookie Preferences" button on this page, or the "Manage Cookies" link in the footer.',
    ],
  },
  {
    heading: '3. First- and Third-Party Cookies',
    paragraphs: [
      '3.1. Some cookies are set by us directly ("first-party"). Others are set by the third parties we work with — such as our analytics and advertising partners — to provide the features described above ("third-party"). Those third parties are responsible for their own cookies under their own privacy and cookie policies.',
    ],
  },
  {
    heading: '4. How Long Cookies Last',
    paragraphs: [
      '4.1. Session cookies are deleted automatically when you close your browser. Persistent cookies remain on your device for a set period, or until you delete them, so the Site can remember you on a later visit.',
    ],
  },
  {
    heading: '5. Managing Cookies',
    paragraphs: [
      '5.1. You can change your cookie choices for this Site at any time via the "Manage Cookie Preferences" button on this page or the "Manage Cookies" link in the footer.',
      '5.2. Most browsers also let you control cookies through their settings, including blocking or deleting them. Because strictly necessary cookies are required for the Site to function, blocking them may mean parts of the Site — such as your shopping bag — don’t work properly.',
      '5.3. Where we rely on your consent for a cookie category, we won’t set those cookies until you’ve given it, and you can withdraw it at any time with the same effect going forward.',
    ],
  },
  {
    heading: '6. Changes To This Policy',
    paragraphs: [
      '6.1. We may update this policy from time to time to reflect changes in the cookies we use or legal requirements. The version published on this page is the current one.',
    ],
  },
]

export const COOKIE_POLICY_LAST_UPDATED = '8 November 2026'

// Illustrative examples for each category — named for the role they play,
// not tied to a specific real vendor, since no analytics/ads tooling is
// actually wired in yet (Brief.md #12 / futurePlans.md).
export const COOKIE_EXAMPLES = [
  {
    category: 'necessary',
    name: 'gs_session / cart_id',
    purpose: 'Keeps your bag and session together as you move between pages.',
    duration: 'Session',
  },
  {
    category: 'necessary',
    name: 'auth_token',
    purpose: 'Keeps you signed in to your account.',
    duration: 'Persistent — 30 days',
  },
  {
    category: 'functional',
    name: 'store_region / store_lang',
    purpose: 'Remembers your chosen store region and language.',
    duration: 'Persistent — 1 year',
  },
  {
    category: 'functional',
    name: 'recentlyViewed',
    purpose: 'Remembers products you’ve recently looked at.',
    duration: 'Persistent — 1 year',
  },
  {
    category: 'analytics',
    name: 'analytics_id',
    purpose: 'Groups your page views together to help us measure Site performance.',
    duration: 'Persistent — 2 years',
  },
  {
    category: 'marketing',
    name: 'ad_id',
    purpose: 'Used to show you more relevant ads and measure campaign performance.',
    duration: 'Persistent — 90 days',
  },
]

export const COOKIE_POLICY_RELATED_ARTICLES = [
  { q: 'Privacy Notice', href: '/pages/privacy-notice' },
  { q: 'Terms & Conditions', href: '/pages/terms-conditions' },
  { q: 'Terms of Use', href: '/pages/terms-of-use' },
]
