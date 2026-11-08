// "Fit" facet for the Shop filter panel (mirrors gymshark.com's Filter &
// Sort → Fit section). Products tag themselves with one slug via the `fit`
// column; accessories leave it null and drop out of this facet entirely.
export const FITS = [
  { slug: 'slim', label: 'Slim' },
  { slug: 'compression', label: 'Compression' },
  { slug: 'regular', label: 'Regular' },
  { slug: 'relaxed', label: 'Relaxed' },
  { slug: 'oversized', label: 'Oversized' },
]
