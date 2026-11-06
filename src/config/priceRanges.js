// Price buckets for the Shop filter panel (mirrors gymshark.com's Filter &
// Sort → Price section). Bounds are tuned to this catalog's $12–$65 range
// rather than copying gymshark.com's buckets verbatim.
export const PRICE_RANGES = [
  { slug: 'under-20', label: 'Under $20', min: 0, max: 20 },
  { slug: '20-30', label: '$20 - $30', min: 20, max: 30 },
  { slug: '30-50', label: '$30 - $50', min: 30, max: 50 },
  { slug: 'over-50', label: 'Over $50', min: 50, max: Infinity },
]
