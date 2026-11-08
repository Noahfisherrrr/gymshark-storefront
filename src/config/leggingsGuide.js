// Content for gymshark.com's /pages/leggings-guide — the editorial guide
// linked from the Explore mega-menu and both gender menus' "Leggings Guide"
// link (src/config/navigation.js). Structure mirrors the live page 1:1:
// hero → bestsellers → top 10 → how do you train → scrunch promo → details
// → perfect fit → find out more. Line/athlete names follow this project's
// placeholder convention (Whitney → Signature, as already used in
// src/config/newUsers.js's family cards) since those are real collab names
// on gymshark.com (Brief.md IP note).

import { asset } from './assetVersion'

export const LEGGINGS_GUIDE_HERO = {
  title: 'The Leggings Guide',
  copy: "Finally find the leggings you've been looking for.",
  image: asset('/media/hero-training-poster.webp'),
}

export const LEGGINGS_GUIDE_BESTSELLERS = {
  title: 'The Bestsellers',
  tabs: [
    {
      label: 'Bestsellers',
      cards: [
        {
          id: 'everyday',
          title: 'Everyday',
          copy: "Best for rest day & light exercise. This one's lightweight seamless material is super comfy & great for every day.",
          image: asset('/media/products/p3.webp'),
          href: '/shop?category=women&collection=everyday-seamless',
        },
        {
          id: 'vital',
          title: 'Vital',
          copy: "Best all-rounder. Vital's stay-put waistband, sweat-wicking tech and seamless design keeps you cool, comfy & confident.",
          image: asset('/media/products/p9.webp'),
          href: '/shop?category=women&collection=vital',
        },
        {
          id: 'signature',
          title: 'Signature',
          copy: 'The gym girls’ fave all-rounder leggings — our softest yet, with an invisible scrunch seam that makes the glutes pop.',
          image: asset('/media/products/p10.webp'),
          href: '/shop?category=women&type=leggings',
        },
        {
          id: 'adapt',
          title: 'Adapt',
          copy: 'Best for lifting. Squat-proof with a glute-popping scrunch seam — look damn good while you put in the work.',
          image: asset('/media/products/p12.webp'),
          href: '/shop?category=women&type=leggings',
        },
        {
          id: 'lift-seamless',
          title: 'Lift Seamless',
          copy: 'Best for lifting. Comfy seamless fabric, a waist-snatching waistband and a unique design to lift and shape your glutes.',
          image: asset('/media/products/p11.webp'),
          href: '/shop?category=women&type=leggings',
        },
      ],
    },
  ],
}

export const LEGGINGS_GUIDE_TOP_10 = {
  title: 'Top 10 Leggings',
  href: '/shop?category=women&type=leggings',
  query: { gender: 'f', type: 'leggings', limit: 10 },
}

export const LEGGINGS_GUIDE_ACTIVITIES = {
  title: 'How do you train?',
  tabs: [
    {
      label: 'Women',
      tiles: [
        { label: 'Lifting', href: '/shop?category=women&activity=weight-lifting', image: asset('/media/products/p9.webp') },
        { label: 'HIIT', href: '/shop?category=women&activity=athleisure', image: asset('/media/products/p4.webp') },
        { label: 'Running', href: '/shop?category=women&activity=running', image: asset('/media/products/p12.webp') },
        { label: 'Pilates', href: '/shop?category=women&activity=pilates', image: asset('/media/products/p10.webp') },
      ],
    },
  ],
}

export const LEGGINGS_GUIDE_SCRUNCH_PROMO = {
  title: 'Scrunch Leggings',
  copy: 'IYKYK. Meet our leggings that lift, sculpt and contour to make your glutes pop.',
  image: asset('/media/products/p9.webp'),
  ctas: [{ label: 'Shop Now', href: '/shop?category=women&type=leggings' }],
}

export const LEGGINGS_GUIDE_DETAILS = {
  title: "It's All In The Details",
  tabs: [
    {
      label: 'Details',
      cards: [
        {
          id: 'mid-rise',
          title: 'Mid-Rise',
          copy: 'Comfy and it sits flush to your body for zero distractions.',
          image: asset('/media/products/p10.webp'),
          href: '/shop?category=women&rise=mid-waisted',
        },
        {
          id: 'seamless',
          title: 'Seamless',
          copy: "Super comfy, feels like a second skin and means zero distractions whether you're training or resting.",
          image: asset('/media/products/p3.webp'),
          href: '/shop?category=women&type=leggings',
        },
        {
          id: 'flares',
          title: 'Flares',
          copy: 'Flared leggings that are comfy AND stylish? Idk, we spoil you.',
          image: asset('/media/products/p10.webp'),
          href: '/shop?category=women&type=leggings',
        },
        {
          id: 'high-waisted',
          title: 'High-Waisted',
          copy: 'Waistbands that cinch and snatch in the right places and actually stay in place while you’re moving.',
          image: asset('/media/products/p9.webp'),
          href: '/shop?category=women&rise=high-waisted',
        },
        {
          id: 'squat-proof',
          title: 'Squat Proof',
          copy: "They're fully squat-proof, zero roll-down, zero wedgie engineering.",
          image: asset('/media/products/p3.webp'),
          href: '/shop?category=women&feature=squat-proof',
        },
      ],
    },
  ],
}

export const LEGGINGS_GUIDE_PERFECT_FIT = {
  title: 'The Perfect Fit',
  copy: "We know this isn't a 'one size fits all' situation. That's why we have bottoms that fit every leg length. See for yourself.",
  cards: [
    {
      id: 'short',
      title: 'Short',
      copy: 'No more rolling up the leggings at the ankles. We have shorter inseam lengths so you can pick up your perfect fit.',
      image: asset('/media/products/p3.webp'),
    },
    {
      id: 'regular',
      title: 'Regular',
      copy: "If you don't need a short length and you don't need additional length, then the regular length will fit you perfectly.",
      image: asset('/media/products/p9.webp'),
    },
    {
      id: 'tall',
      title: 'Tall',
      copy: "Leggings with the additional inseam length needed so you don't need to cover the ankles with your crew socks.",
      image: asset('/media/products/p10.webp'),
    },
  ],
  href: '/shop?category=women&type=leggings',
}

export const LEGGINGS_GUIDE_FIND_OUT_MORE = {
  title: 'Find Out More',
  tabs: [
    {
      label: 'Guides',
      cards: [
        {
          id: 'find-your-fit',
          title: 'Find Your Fit',
          copy: 'Find out how your workout leggings are supposed to fit and what size you should buy with this handy guide.',
          image: asset('/media/products/p9.webp'),
          href: '/help',
        },
        {
          id: 'best-black-leggings',
          title: 'The Best Black Leggings',
          copy: "Name a more versatile piece of clothing than black leggings. We'll wait.",
          image: asset('/media/products/p3.webp'),
          href: '/shop?category=women&type=leggings&color=Black',
        },
        {
          id: 'style-flared-leggings',
          title: 'How To Style Flared Leggings',
          copy: 'Wondering what to wear with your new flared leggings? Come find out with this handy guide.',
          image: asset('/media/products/p10.webp'),
          href: '/shop?category=women&type=leggings',
        },
      ],
    },
  ],
}
