// Content for gymshark.com's /pages/new-users hub and its two gendered
// sub-pages (/pages/new-users/women, /pages/new-users/men) — the "New to
// Gymshark?" landing experience linked from the Explore nav and both
// gender menus. Copy and imagery are placeholders until the client
// supplies their own (Brief.md #5, #6); gymshark.com's "Whitney" leggings
// card (an athlete collab name) is renamed to a generic "Signature" per
// the athlete-name placeholder line in project notes.

import { asset } from './assetVersion'

export const NEW_USERS_HERO = {
  title: 'Welcome to the fam',
  copy: "New here? Let's get you sorted — shop by gender or see how we can help you train.",
  video: asset('/media/hero-training.mp4'),
  mobileVideo: asset('/media/hero-training-mobile.mp4'),
  poster: asset('/media/hero-training-poster.webp'),
  ctas: [
    { label: 'Shop women', href: '/pages/new-users/women' },
    { label: 'Shop men', href: '/pages/new-users/men' },
  ],
}

export const NEW_USERS_WOMEN_HERO = {
  title: 'Welcome to the fam',
  copy: 'Everything you need to find your fit, your activity and your new favourites.',
  video: asset('/media/hero-training.mp4'),
  mobileVideo: asset('/media/hero-training-mobile.mp4'),
  poster: asset('/media/hero-training-poster.webp'),
  ctas: [],
}

export const NEW_USERS_MEN_HERO = {
  title: 'Welcome to the fam',
  copy: 'Everything you need to find your fit, your activity and your new favourites.',
  video: asset('/media/gym-training.mp4'),
  mobileVideo: asset('/media/gym-training-mobile.mp4'),
  poster: asset('/media/gym-training-poster.webp'),
  ctas: [],
}

// "How do you train?" activity tiles. Labels keep gymshark.com's generic
// fitness terms (not trademarked); hrefs map onto our existing activity
// taxonomy (src/config/activities.js), which has no dedicated HIIT or
// rest-day slug, so those fall back to the nearest fit (athleisure).
const WOMEN_ACTIVITY_TILES = [
  { label: 'Lifting', href: '/shop?category=women&activity=weight-lifting', image: asset('/media/products/p9.webp') },
  { label: 'HIIT', href: '/shop?category=women&activity=athleisure', image: asset('/media/products/p4.webp') },
  { label: 'Running', href: '/shop?category=women&activity=running', image: asset('/media/products/p12.webp') },
  { label: 'Pilates', href: '/shop?category=women&activity=pilates', image: asset('/media/products/p10.webp') },
]

const MEN_ACTIVITY_TILES = [
  { label: 'Lifting', href: '/shop?category=men&activity=weight-lifting', image: asset('/media/products/p1.webp') },
  { label: 'Running', href: '/shop?category=men&activity=running', image: asset('/media/products/p2.webp') },
  { label: 'HIIT', href: '/shop?category=men&activity=athleisure', image: asset('/media/products/p13.webp') },
  { label: 'Rest day', href: '/shop?category=men&activity=athleisure', image: asset('/media/products/p14.webp') },
]

export const NEW_USERS_ACTIVITIES = {
  title: 'How do you train?',
  tabs: [
    { label: 'Women', tiles: WOMEN_ACTIVITY_TILES },
    { label: 'Men', tiles: MEN_ACTIVITY_TILES },
  ],
}

export const NEW_USERS_WOMEN_ACTIVITIES = {
  title: 'How do you train?',
  tabs: [{ label: 'Women', tiles: WOMEN_ACTIVITY_TILES }],
}

export const NEW_USERS_MEN_ACTIVITIES = {
  title: 'How do you train?',
  tabs: [{ label: 'Men', tiles: MEN_ACTIVITY_TILES }],
}

// "Get to know our families" — product-line cards. These line names
// (Everyday, Vital, Lift Seamless, Adapt, Power, Geo Seamless,
// Conditioning Club, Arrival) already appear as collection labels
// elsewhere in this app's config (collections.js, shopWomen.js,
// shopMen.js, navigation.js), so they're kept as-is.
const WOMEN_FAMILY_CARDS = [
  {
    id: 'everyday',
    title: 'Everyday',
    copy: "Best for rest day & light exercise — lightweight seamless fabric that moves with you.",
    image: asset('/media/products/p9.webp'),
    href: '/shop?category=women&collection=everyday-seamless',
  },
  {
    id: 'vital',
    title: 'Vital',
    copy: "Best all-rounder. A stay-put waistband, sweat-wicking tech and a seamless design.",
    image: asset('/media/products/p4.webp'),
    href: '/shop?category=women&collection=vital',
  },
  {
    id: 'signature',
    title: 'Signature',
    copy: "Our softest yet — the fan-favourite all-rounder leggings.",
    image: asset('/media/products/p10.webp'),
    href: '/shop?category=women&type=leggings',
  },
  {
    id: 'adapt',
    title: 'Adapt',
    copy: "Best for lifting. Squat-proof with a sculpting fit that looks as good as it feels.",
    image: asset('/media/products/p12.webp'),
    href: '/shop?category=women&type=leggings',
  },
  {
    id: 'lift-seamless',
    title: 'Lift Seamless',
    copy: "Best for lifting. Comfy seamless fabric with a waist-snatching waistband.",
    image: asset('/media/products/p11.webp'),
    href: '/shop?category=women&type=leggings',
  },
]

const MEN_FAMILY_CARDS = [
  {
    id: 'arrival',
    title: 'Arrival',
    copy: 'Keeps you cool and dry, so you can keep your focus where you need it.',
    image: asset('/media/products/p2.webp'),
    href: '/shop?category=men&type=shorts',
  },
  {
    id: 'power',
    title: 'Power',
    copy: "Timeless, tireless design built to work just as hard as you do.",
    image: asset('/media/products/p13.webp'),
    href: '/shop?category=men&collection=power',
  },
  {
    id: 'geo-seamless',
    title: 'Geo Seamless',
    copy: "Freedom 'til the finish with sweat-wicking tech and a lightweight feel.",
    image: asset('/media/products/p1.webp'),
    href: '/shop?category=men&collection=geo-seamless',
  },
  {
    id: 'conditioning-club',
    title: 'Conditioning Club',
    copy: "The hybrid athlete's uniform — built for everything from long runs to heavy lifts.",
    image: asset('/media/products/p14.webp'),
    href: '/shop?category=men',
  },
]

export const NEW_USERS_FAMILIES = {
  title: 'Get to know our families',
  tabs: [
    { label: 'Women', cards: WOMEN_FAMILY_CARDS },
    { label: 'Men', cards: MEN_FAMILY_CARDS },
  ],
}

export const NEW_USERS_WOMEN_FAMILIES = {
  title: 'Get to know our families',
  tabs: [{ label: 'Women', cards: WOMEN_FAMILY_CARDS }],
}

export const NEW_USERS_MEN_FAMILIES = {
  title: 'Get to know our families',
  tabs: [{ label: 'Men', cards: MEN_FAMILY_CARDS }],
}

// "Top 10" / "top rated" product rails — reuse trendingProducts, same as
// the existing Best Sellers rails elsewhere (there's no rating field to
// sort a real "top rated" query by).
export const NEW_USERS_TOP_WOMEN = {
  title: "Top 10 women's bestsellers",
  href: '/shop?category=women',
  query: { gender: 'f', limit: 10 },
}

export const NEW_USERS_TOP_MEN = {
  title: "Top 10 men's bestsellers",
  href: '/shop?category=men',
  query: { gender: 'm', limit: 10 },
}

export const NEW_USERS_WOMEN_TOP_RATED = {
  title: 'Our top rated fits',
  href: '/shop?category=women',
  query: { gender: 'f', limit: 10 },
}

export const NEW_USERS_MEN_TOP_RATED = {
  title: 'Our top rated fits',
  href: '/shop?category=men',
  query: { gender: 'm', limit: 10 },
}

export const NEW_USERS_SHOP_TILES = {
  title: 'Shop the range',
  columns: 3,
  tiles: [
    { label: 'Shop women', href: '/shop?category=women', image: asset('/media/products/p9.webp') },
    { label: 'Shop men', href: '/shop?category=men', image: asset('/media/products/p1.webp') },
    { label: 'Shop accessories', href: '/shop?category=accessories', image: asset('/media/products/p17.webp') },
  ],
}

// "Wait there's more…" — guide cards route into the real blog articles
// (config/blog.js); "Join the club" stays on /help since there's no
// loyalty program to describe yet.
export const NEW_USERS_MORE = {
  title: "Wait, there's more…",
  tabs: [
    {
      label: 'Guides',
      cards: [
        {
          id: 'leggings-guide',
          title: 'Leggings guide',
          copy: "Stop looking; start finding the leggings you've been looking for.",
          image: asset('/media/products/p9.webp'),
          href: '/blog/article/leggings-guide',
        },
        {
          id: 'sports-bra-guide',
          title: 'Sports bra guide',
          copy: 'Find the support level that works for your training.',
          image: asset('/media/products/p4.webp'),
          href: '/blog/article/sports-bra-support-guide',
        },
        {
          id: 'shorts-guide',
          title: "Men's shorts guide",
          copy: 'Everything you need to know about finding the right length.',
          image: asset('/media/products/p2.webp'),
          href: '/blog/article/shorts-guide',
        },
        {
          id: 'loyalty',
          title: 'Join the club',
          copy: 'The programme that turns the work you put in into rewards.',
          image: asset('/media/products/p13.webp'),
          href: '/help',
        },
      ],
    },
    {
      label: 'Apps',
      cards: [
        {
          id: 'app',
          title: 'Anytime, anywhere',
          copy: 'Shop on the go, get exclusive drops, and more from the app.',
          image: asset('/media/products/p16.webp'),
          href: '/help',
        },
      ],
    },
  ],
}

export const NEW_USERS_WOMEN_PERFECT_FIT = {
  title: 'The perfect fit',
}

export const NEW_USERS_WOMEN_FIND_FIT = {
  title: 'Find your fit',
  tabs: [
    {
      label: 'Guides',
      cards: [
        {
          id: 'size-guide',
          title: 'Find your fit',
          copy: 'Find out how your workout leggings are supposed to fit and what size to pick.',
          image: asset('/media/products/p9.webp'),
          href: '/help',
        },
        {
          id: 'leggings-guide',
          title: 'Leggings guide',
          copy: "Stop looking; start finding the leggings you've been looking for.",
          image: asset('/media/products/p10.webp'),
          href: '/blog/article/leggings-guide',
        },
        {
          id: 'sports-bra-guide',
          title: 'Sports bra guide',
          copy: 'Find the support level that works for your training.',
          image: asset('/media/products/p4.webp'),
          href: '/blog/article/sports-bra-support-guide',
        },
      ],
    },
  ],
}
