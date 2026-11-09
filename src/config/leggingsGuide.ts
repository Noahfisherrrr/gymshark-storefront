// Content for gymshark.com's /pages/leggings-guide, linked from the Explore
// mega-menu and both gender menus (src/config/navigation.js). Section order
// mirrors the live page: hero → bestsellers → top 10 → how do you train →
// scrunch promo → details → perfect fit → find out more → leggings catalogue.
// Athlete-collab names follow the placeholder convention used in
// src/config/newUsers.js (Whitney → Signature; Brief.md IP note).

import { asset } from './assetVersion'

const LEGGINGS = '/shop?category=women&type=leggings'

export const LEGGINGS_GUIDE_HERO = {
  title: 'The Leggings Guide',
  copy: 'Finally find the leggings you’ve been looking for.',
  image: asset('/media/hero-training-poster.webp'),
}

export const LEGGINGS_GUIDE_BESTSELLERS = {
  title: 'The Bestsellers',
  cards: [
    {
      id: 'everyday',
      title: 'EVERYDAY',
      copy: 'Best for rest day & light exercise. This one’s lightweight seamless material is super comfy & great for every day.',
      image: asset('/media/products/p3.webp'),
      href: '/shop?category=women&type=leggings&collection=everyday-seamless',
    },
    {
      id: 'vital',
      title: 'VITAL',
      copy: 'Best all-rounder. Vital’s stay-put waistband, sweat-wicking tech and seamless design keeps you cool, comfy & confident.',
      image: asset('/media/products/p9.webp'),
      href: '/shop?category=women&type=leggings&collection=vital',
    },
    {
      id: 'signature',
      title: 'SIGNATURE',
      copy: 'The gym girls’ fave all rounder leggings, the Signature leggings are our softest yet, with an invisible bum scrunch that makes the glutes pop.',
      image: asset('/media/products/p10.webp'),
      href: LEGGINGS,
    },
    {
      id: 'adapt',
      title: 'ADAPT',
      copy: 'Best for lifting. Squat-proof with a glute-popping bum scrunch, look damn good while you put in the work in Adapt Camo, Fleck & more.',
      image: asset('/media/products/p12.webp'),
      href: `${LEGGINGS}&feature=squat-proof`,
    },
    {
      id: 'lift-seamless',
      title: 'LIFT SEAMLESS',
      copy: 'Best for lifting. Comfy seamless fabric, a waist-snatching waistband and a unique design to lift and shape your glutes.',
      image: asset('/media/products/p11.webp'),
      href: LEGGINGS,
    },
  ],
}

export const LEGGINGS_GUIDE_TOP_10 = {
  title: 'Top 10 Leggings',
  query: { gender: 'f' as const, type: 'leggings', limit: 10 },
}

export const LEGGINGS_GUIDE_ACTIVITIES = {
  title: 'How do you train?',
  cards: [
    { id: 'lifting', title: 'LIFTING', image: asset('/media/products/p9.webp'), href: '/shop?category=women&activity=weight-lifting' },
    { id: 'hiit', title: 'HIIT', image: asset('/media/products/p4.webp'), href: '/shop?category=women&activity=athleisure' },
    { id: 'running', title: 'RUNNING', image: asset('/media/products/p12.webp'), href: '/shop?category=women&activity=running' },
    { id: 'pilates', title: 'PILATES', image: asset('/media/products/p10.webp'), href: '/shop?category=women&activity=pilates&type=leggings' },
  ],
}

export const LEGGINGS_GUIDE_SCRUNCH_PROMO = {
  title: 'Butt Scrunch Leggings',
  copy: 'IYKYK. Meet our leggings that lift, sculpt and contour to make your glutes pop.',
  image: asset('/media/products/p9.webp'),
  cta: { label: 'Shop Now', href: `${LEGGINGS}&feature=squat-proof` },
}

export const LEGGINGS_GUIDE_DETAILS = {
  title: 'It’s All In The Details',
  cards: [
    {
      id: 'mid-rise',
      title: 'MID-RISE',
      copy: 'Comfy and it sits flush to your body for zero distractions',
      image: asset('/media/products/p10.webp'),
      href: `${LEGGINGS}&rise=mid-waisted`,
    },
    {
      id: 'seamless',
      title: 'SEAMLESS',
      copy: 'Super comfy, feels like a second skin and means zero distractions whether you’re training or resting.',
      image: asset('/media/products/p3.webp'),
      href: `${LEGGINGS}&collection=everyday-seamless`,
    },
    {
      id: 'flares',
      title: 'FLARES',
      copy: 'Flared leggings that are comfy AND stylish? Idk, we spoil you.',
      image: asset('/media/products/p10.webp'),
      href: `${LEGGINGS}&fit=relaxed`,
    },
    {
      id: 'high-waisted',
      title: 'HIGH-WAISTED',
      copy: 'Waistbands that cinch and snatch in the right places and actually stay in place while you’re moving.',
      image: asset('/media/products/p9.webp'),
      href: `${LEGGINGS}&rise=high-waisted`,
    },
    {
      id: 'squat-proof',
      title: 'Squat Proof',
      copy: 'They’re fully squat-proof, zero roll-down, zero wedgie engineering.',
      image: asset('/media/products/p3.webp'),
      href: `${LEGGINGS}&feature=squat-proof`,
    },
  ],
}

export const LEGGINGS_GUIDE_PERFECT_FIT = {
  title: 'The Perfect Fit',
  copy: 'We know this isn’t a ‘one size fits all’ situation. That’s why we have bottoms that fit every leg length. See for yourself.',
  cards: [
    {
      id: 'short',
      title: 'SHORT',
      copy: 'No more rolling up the leggings at the ankles. We have shorter inseam lengths so you can pick up your perfect fit.',
      image: asset('/media/products/p3.webp'),
      href: LEGGINGS,
    },
    {
      id: 'regular',
      title: 'REGULAR',
      copy: 'If you don’t need a short length and you don’t need additional length, then the regular length will fit you perfectly.',
      image: asset('/media/products/p9.webp'),
      href: LEGGINGS,
    },
    {
      id: 'tall',
      title: 'TALL',
      copy: 'Leggings with the additional inseam length needed so you don’t need to cover the ankles with your crew socks (unless you want to ofc)..',
      image: asset('/media/products/p10.webp'),
      href: LEGGINGS,
    },
  ],
}

export const LEGGINGS_GUIDE_FIND_OUT_MORE = {
  title: 'Find Out More',
  cards: [
    {
      id: 'find-your-fit',
      title: 'FIND YOUR FIT',
      copy: 'Find out how your workout leggings are supposed to fit and what size you should buy with this handy guide.',
      image: asset('/media/products/p10.webp'),
      href: '/blog/article/leggings-guide',
    },
    {
      id: 'best-black-leggings',
      title: 'THE BEST BLACK LEGGINGS',
      copy: 'Name a more versatile piece of clothing than black leggings. We’ll wait.',
      image: asset('/media/products/p3.webp'),
      href: `${LEGGINGS}&color=Black`,
    },
    {
      id: 'style-flared-leggings',
      title: 'HOW TO STYLE FLARED LEGGINGS',
      copy: 'Wondering what to wear with your new flared leggings? Come find out with this handy guide.',
      image: asset('/media/products/p9.webp'),
      href: '/blog/article/what-to-wear-for-every-workout',
    },
  ],
}

export const LEGGINGS_GUIDE_CATALOGUE = {
  label: 'Shop leggings',
  query: { gender: 'f' as const, type: 'leggings' },
}
