// Placeholder catalog so the UI has something real to filter/sort/render
// against. Replace entirely once the client supplies the real catalog
// (Brief.md #6) — the shape here is what the Supabase `products` /
// `product_variants` tables should match.

function variant(id, size, color, stock) {
  return { id, size, color, sku: `SKU-${id.toUpperCase()}`, stock }
}

export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Seamless Training Tee',
    category: 'men',
    price: 32,
    description: 'Lightweight seamless tee built for high-rep training days.',
    image: null,
    variants: [
      variant('p1-s-blk', 'S', 'Black', 8),
      variant('p1-m-blk', 'M', 'Black', 12),
      variant('p1-l-blk', 'L', 'Black', 0),
      variant('p1-m-grey', 'M', 'Grey', 5),
    ],
  },
  {
    id: 'p2',
    name: 'Flex Training Shorts',
    category: 'men',
    price: 28,
    description: '4-way stretch shorts with a zip pocket for essentials.',
    image: null,
    variants: [
      variant('p2-s-blk', 'S', 'Black', 10),
      variant('p2-m-blk', 'M', 'Black', 10),
      variant('p2-l-navy', 'L', 'Navy', 6),
    ],
  },
  {
    id: 'p3',
    name: 'Rib Seamless Leggings',
    category: 'women',
    price: 48,
    description: 'Second-skin ribbed leggings with a high waistband.',
    image: null,
    variants: [
      variant('p3-xs-blk', 'XS', 'Black', 7),
      variant('p3-s-blk', 'S', 'Black', 9),
      variant('p3-m-plum', 'M', 'Plum', 4),
    ],
  },
  {
    id: 'p4',
    name: 'Studio Sports Bra',
    category: 'women',
    price: 26,
    description: 'Medium-support sports bra with a racerback cut.',
    image: null,
    variants: [
      variant('p4-xs-blk', 'XS', 'Black', 6),
      variant('p4-s-sage', 'S', 'Sage', 8),
      variant('p4-m-sage', 'M', 'Sage', 0),
    ],
  },
  {
    id: 'p5',
    name: 'Everyday Oversized Hoodie',
    category: 'new',
    price: 54,
    description: 'Heavyweight cotton hoodie, relaxed oversized fit.',
    image: null,
    variants: [
      variant('p5-s-grey', 'S', 'Grey', 5),
      variant('p5-m-grey', 'M', 'Grey', 11),
      variant('p5-l-black', 'L', 'Black', 9),
    ],
  },
  {
    id: 'p6',
    name: 'Core Half-Zip Pullover',
    category: 'new',
    price: 46,
    description: 'Brushed-back half-zip for warm-ups and rest days.',
    image: null,
    variants: [
      variant('p6-m-black', 'M', 'Black', 3),
      variant('p6-l-black', 'L', 'Black', 4),
    ],
  },
  {
    id: 'p7',
    name: 'Legacy Track Jacket',
    category: 'sale',
    price: 39,
    description: 'Retro track jacket, final-sale colorway.',
    image: null,
    variants: [variant('p7-m-red', 'M', 'Red', 2), variant('p7-l-red', 'L', 'Red', 0)],
  },
  {
    id: 'p8',
    name: 'Compression Base Layer',
    category: 'sale',
    price: 18,
    description: 'Moisture-wicking base layer, clearance pricing.',
    image: null,
    variants: [variant('p8-s-black', 'S', 'Black', 6), variant('p8-m-black', 'M', 'Black', 6)],
  },
]

export const MOCK_DISCOUNT_CODES = {
  WELCOME10: 0.1,
  LAUNCH20: 0.2,
}
