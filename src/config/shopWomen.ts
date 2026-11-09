// Content for /pages/shop-women, gymshark.com's women's landing page.
// Unlike /shop (the filterable PLP), this page is pure curation: hero →
// new in → shop by category → promo → shop by activity → best sellers →
// shop by collection → editorial, every block routing back into /shop with
// the matching filter. Copy and imagery are placeholders until the client
// supplies their own (Brief.md #5, #6).

import { asset } from './assetVersion'
import { blogTeasers } from './blog'

// Reuses the homepage hero's footage (Mixkit #52110, "Woman doing lunges
// with dumbbells at the gym" — see public/media/CREDITS.md) with
// women's-specific copy and CTAs.
export const SHOP_WOMEN_HERO = {
  title: "Women's",
  copy: 'Leggings, sports bras and everyday essentials built to move with you.',
  video: asset('/media/hero-training.mp4'),
  mobileVideo: asset('/media/hero-training-mobile.mp4'),
  poster: asset('/media/hero-training-poster.webp'),
  ctas: [
    { label: 'Shop new in', href: '/collections/new-releases/womens' },
    { label: 'Shop best sellers', href: '/shop?category=women' },
  ],
}

// `category: 'women'` (the product's own catalog tag) rather than
// `gender: 'f'` (which also matches unisex accessories) — a women's New In
// rail should lead with apparel, not gym bags and shaker bottles. "View
// all" routes into /collections/new-releases/womens, gymshark.com's
// dedicated new-arrivals PLP, rather than generic /shop?sort=newest.
export const SHOP_WOMEN_NEW_IN = {
  title: 'New in',
  href: '/collections/new-releases/womens',
  query: { category: 'women', sort: 'newest', limit: 10 },
}

export const SHOP_WOMEN_CATEGORIES = {
  title: 'Shop by category',
  columns: 4,
  tiles: [
    { label: 'Leggings', href: '/shop?category=women&type=leggings', image: asset('/media/products/p9.webp') },
    { label: 'Sports Bras', href: '/shop?category=women&type=sports-bras', image: asset('/media/products/p4.webp') },
    { label: 'T-Shirts & Tops', href: '/shop?category=women&type=t-shirts', image: asset('/media/products/p11.webp') },
    { label: 'Shorts', href: '/shop?category=women&type=shorts', image: asset('/media/products/p12.webp') },
    { label: 'Hoodies & Sweatshirts', href: '/shop?category=women&type=hoodies', image: asset('/media/products/p5.webp') },
    { label: 'Joggers & Sweatpants', href: '/shop?category=women&type=joggers', image: asset('/media/products/p14.webp') },
    { label: 'Matching Sets', href: '/shop?category=women&collection=matching-sets', image: asset('/media/products/p3.webp') },
    { label: 'Accessories', href: '/shop?category=accessories', image: asset('/media/products/p16.webp') },
  ],
}

// Solid-black discount strip (gymshark.com's "Banner-slim"), same offer as
// the homepage's.
export const SHOP_WOMEN_PROMO = {
  title: 'NEW HERE?\nWANT AN EXTRA 15% OFF?',
  copy: 'Sign up to get an extra 15% off your first order.',
  cta: { label: 'Sign up', href: '/register' },
}

export const SHOP_WOMEN_ACTIVITIES = {
  title: 'Shop by activity',
  columns: 4,
  tiles: [
    { label: 'Running', href: '/shop?category=women&activity=running', image: asset('/media/products/p12.webp') },
    { label: 'Weight Lifting', href: '/shop?category=women&activity=weight-lifting', image: asset('/media/products/p9.webp') },
    { label: 'Yoga', href: '/shop?category=women&activity=yoga', image: asset('/media/products/p10.webp') },
    { label: 'Pilates', href: '/shop?category=women&activity=pilates', image: asset('/media/products/p4.webp') },
  ],
}

export const SHOP_WOMEN_BEST_SELLERS = {
  title: 'Best sellers',
  href: '/shop?category=women',
  query: { gender: 'f' as const, limit: 10 },
}

export const SHOP_WOMEN_COLLECTIONS = {
  title: 'Shop by collection',
  columns: 2,
  aspect: 'aspect-[16/9]',
  tiles: [
    {
      label: 'Everyday Seamless',
      href: '/shop?category=women&collection=everyday-seamless',
      image: asset('/media/products/p3.webp'),
    },
    { label: 'Vital', href: '/shop?category=women&collection=vital', image: asset('/media/products/p9.webp') },
  ],
}

export const SHOP_WOMEN_EDITORIAL = {
  title: 'Guides & edits',
  href: '/blog',
  posts: blogTeasers(['leggings-guide', 'sports-bra-support-guide', 'capsule-training-wardrobe']),
}
