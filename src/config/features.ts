// "Features" facet for the Shop filter panel (mirrors gymshark.com's
// Filter & Sort → Features section). Products tag themselves with zero or
// more slugs via the `features` column (text[], see supabase/schema.sql).
export const FEATURES = [
  { slug: 'squat-proof', label: 'Squat-Proof' },
  { slug: 'four-way-stretch', label: 'Four-Way Stretch' },
  { slug: 'sweat-wicking', label: 'Sweat-Wicking' },
  { slug: 'pockets', label: 'Pockets' },
  { slug: 'reflective', label: 'Reflective Details' },
]
