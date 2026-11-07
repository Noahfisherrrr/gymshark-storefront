// "Collection" facet for the Shop filter panel (mirrors gymshark.com's
// Filter & Sort → Collection section). Slugs match the "Shop by collection"
// tiles already linking here (src/config/shopWomen.js); products opt in via
// `collection` (src/api/data/products.mock.js), null if unassigned.
export const COLLECTIONS = [
  { slug: 'everyday-seamless', label: 'Everyday Seamless' },
  { slug: 'vital', label: 'Vital' },
  { slug: 'matching-sets', label: 'Matching Sets' },
  { slug: 'power', label: 'Power' },
  { slug: 'geo-seamless', label: 'Geo Seamless' },
]
