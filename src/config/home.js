// Homepage content, in the order gymshark.com stacks its blocks: hero
// banner → women's carousel → video banner → men's carousel → … Copy,
// imagery and which products feature are placeholders until the client
// supplies them (Brief.md #5, #6); eventually this comes from the CMS.

import { asset } from './assetVersion'
import { blogTeasers } from './blog'

// Placeholder footage: "Woman doing lunges with dumbbells at the gym"
// (Mixkit #52110, free under the Mixkit License).
export const HOME_HERO = {
  title: 'New season, new standard',
  copy: 'Performance essentials built for the work you put in.',
  video: asset('/media/hero-training.mp4'),
  mobileVideo: asset('/media/hero-training-mobile.mp4'),
  poster: asset('/media/hero-training-poster.webp'),
  ctas: [
    { label: 'Shop women', href: '/pages/shop-women' },
    { label: 'Shop men', href: '/shop?category=men' },
  ],
}

// First-order discount promo — gymshark.com's "Banner-slim" block (solid
// black, no media). Rate is a placeholder; swap for whatever offer the
// client is actually running (Brief.md #7).
export const HOME_PROMO_BANNER = {
  title: 'NEW HERE?\nWANT AN EXTRA 15% OFF?',
  copy: 'Sign up to get an extra 15% off your first order.',
  cta: { label: 'Sign up', href: '/register' },
}

// Placeholder footage: "Fitness man lifting weights at the gym" from
// Mixkit (mixkit.co, free under the Mixkit License). Swap for the
// client's own campaign video.
export const HOME_VIDEO_BANNER = {
  title: 'Train with intent',
  copy: 'Every rep counts. Gear up for your next session.',
  video: asset('/media/gym-training.mp4'),
  mobileVideo: asset('/media/gym-training-mobile.mp4'),
  poster: asset('/media/gym-training-poster.webp'),
  ctas: [
    { label: 'Shop new in', href: '/shop?category=new' },
    { label: 'Shop lifting', href: '/shop?category=men' },
  ],
}

// `query` is passed straight to api.products.list().
export const HOME_CAROUSELS = {
  newIn: { title: 'New in for 2026', href: '/shop?category=new', query: { category: 'new', limit: 10 } },
  women: { title: 'Women', href: '/shop?category=women', query: { gender: 'f', limit: 10 } },
  men: { title: 'Men', href: '/shop?category=men', query: { gender: 'm', limit: 10 } },
  accessories: {
    title: 'Accessories',
    href: '/shop?category=accessories',
    query: { category: 'accessories', limit: 10 },
  },
  sale: { title: 'Sale', href: '/shop?category=sale', query: { onSale: true, limit: 10 } },
}

export const HOME_POPULAR = {
  title: 'Popular right now',
  tabs: [
    { label: 'Women', gender: 'f', href: '/shop?category=women' },
    { label: 'Men', gender: 'm', href: '/shop?category=men' },
  ],
}

// Editorial/news cards (gymshark.com's "Conditioning" blog). Pulls real
// teasers from config/blog.js now that /blog is built — the client's
// content manager will publish real posts through the CMS later, but the
// shape (and the live blog behind it) is already real.
export const HOME_BLOG = {
  title: 'From the blog',
  href: '/blog',
  posts: blogTeasers(['winter-training-edit', 'what-to-wear-for-every-workout', 'strength-training-for-beginners']),
}
