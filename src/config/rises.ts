// "Rise" facet for the Shop filter panel (mirrors gymshark.com's Filter &
// Sort → Rise section). Only bottoms (leggings/shorts/joggers) carry a
// `rise` column; everything else is null and drops out of this facet
// entirely.
export const RISES = [
  { slug: 'high-waisted', label: 'High-Waisted' },
  { slug: 'mid-waisted', label: 'Mid-Waisted' },
  { slug: 'low-waisted', label: 'Low-Waisted' },
]
