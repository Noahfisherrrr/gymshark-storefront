// Content for /pages/shop-men, gymshark.com's men's landing page. Mirrors
// shopWomen.js's structure: hero → new in → shop by category → promo →
// shop by activity → best sellers → shop by collection → editorial, every
// block routing back into /shop with the matching filter. Copy and imagery
// are placeholders until the client supplies their own (Brief.md #5, #6).

import { asset } from './assetVersion'

// Reuses the homepage video banner's footage (Mixkit, "Fitness man lifting
// weights at the gym" — see public/media/CREDITS.md) with men's-specific
// copy and CTAs.
export const SHOP_MEN_HERO = {
  title: "Men's",
  copy: 'Tees, shorts and training essentials built for the weight room.',
  video: asset('/media/gym-training.mp4'),
  mobileVideo: asset('/media/gym-training-mobile.mp4'),
  poster: asset('/media/gym-training-poster.webp'),
  ctas: [
    { label: 'Shop new in', href: '/collections/new-releases/mens' },
    { label: 'Shop best sellers', href: '/shop?category=men' },
  ],
}

// `category: 'men'` (the product's own catalog tag) rather than
// `gender: 'm'` (which also matches unisex accessories) — a men's New In
// rail should lead with apparel, not gym bags and shaker bottles. "View
// all" routes into /collections/new-releases/mens, the same New Arrivals
// PLP template women's and accessories' New In rails use.
export const SHOP_MEN_NEW_IN = {
  title: 'New in',
  href: '/collections/new-releases/mens',
  query: { category: 'men', sort: 'newest', limit: 10 },
}

export const SHOP_MEN_CATEGORIES = {
  title: 'Shop by category',
  columns: 4,
  tiles: [
    { label: 'T-Shirts & Tops', href: '/shop?category=men&type=t-shirts', image: asset('/media/products/p1.webp') },
    { label: 'Shorts', href: '/shop?category=men&type=shorts', image: asset('/media/products/p2.webp') },
    { label: 'Hoodies & Sweatshirts', href: '/shop?category=men&type=hoodies', image: asset('/media/products/p6.webp') },
    { label: 'Joggers & Sweatpants', href: '/shop?category=men&type=joggers', image: asset('/media/products/p14.webp') },
    { label: 'Jackets', href: '/shop?category=men&type=jackets', image: asset('/media/products/p7.webp') },
    { label: 'Accessories', href: '/shop?category=accessories', image: asset('/media/products/p17.webp') },
  ],
}

// Solid-black discount strip (gymshark.com's "Banner-slim"), same offer as
// the homepage's.
export const SHOP_MEN_PROMO = {
  title: 'NEW HERE?\nWANT AN EXTRA 15% OFF?',
  copy: 'Sign up to get an extra 15% off your first order.',
  cta: { label: 'Sign up', href: '/register' },
}

export const SHOP_MEN_ACTIVITIES = {
  title: 'Shop by activity',
  columns: 4,
  tiles: [
    { label: 'Weight Lifting', href: '/shop?category=men&activity=weight-lifting', image: asset('/media/products/p1.webp') },
    { label: 'Running', href: '/shop?category=men&activity=running', image: asset('/media/products/p2.webp') },
    { label: 'Hiking', href: '/shop?category=men&activity=hiking', image: asset('/media/products/p14.webp') },
    { label: 'Athleisure', href: '/shop?category=men&activity=athleisure', image: asset('/media/products/p13.webp') },
  ],
}

export const SHOP_MEN_BEST_SELLERS = {
  title: 'Best sellers',
  href: '/shop?category=men',
  query: { gender: 'm', limit: 10 },
}

export const SHOP_MEN_COLLECTIONS = {
  title: 'Shop by collection',
  columns: 2,
  aspect: 'aspect-[16/9]',
  tiles: [
    { label: 'Power', href: '/shop?category=men&collection=power', image: asset('/media/products/p13.webp') },
    { label: 'Geo Seamless', href: '/shop?category=men&collection=geo-seamless', image: asset('/media/products/p1.webp') },
  ],
}

export const SHOP_MEN_EDITORIAL = {
  title: 'Guides & edits',
  href: '/help',
  posts: [
    {
      id: 'men-guide-1',
      title: 'The shorts guide: finding your length',
      excerpt: 'From 5" to 9" inseams — how to pick the pair that works for your session.',
      image: asset('/media/products/p2.webp'),
      href: '/help',
    },
    {
      id: 'men-guide-2',
      title: 'Running gear, explained',
      excerpt: 'What actually matters in a running kit, from fabric to fit.',
      image: asset('/media/products/p14.webp'),
      href: '/help',
    },
    {
      id: 'men-guide-3',
      title: 'Building a capsule training wardrobe',
      excerpt: 'A handful of pieces that cover every session on your calendar.',
      image: asset('/media/products/p13.webp'),
      href: '/help',
    },
  ],
}
