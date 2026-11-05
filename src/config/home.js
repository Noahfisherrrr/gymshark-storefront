// Homepage content, in the order gymshark.com stacks its blocks: hero
// banner → women's carousel → video banner → men's carousel → … Copy,
// imagery and which products feature are placeholders until the client
// supplies them (Brief.md #5, #6); eventually this comes from the CMS.

// Placeholder footage: "Woman doing lunges with dumbbells at the gym"
// (Mixkit #52110, free under the Mixkit License).
export const HOME_HERO = {
  title: 'New season, new standard',
  copy: 'Performance essentials built for the work you put in.',
  video: '/media/hero-training.mp4',
  poster: '/media/hero-training-poster.jpg',
  ctas: [
    { label: 'Shop women', href: '/shop?category=women' },
    { label: 'Shop men', href: '/shop?category=men' },
  ],
}

// Placeholder footage: "Fitness man lifting weights at the gym" from
// Mixkit (mixkit.co, free under the Mixkit License). Swap for the
// client's own campaign video.
export const HOME_VIDEO_BANNER = {
  title: 'Train with intent',
  copy: 'Every rep counts. Gear up for your next session.',
  video: '/media/gym-training.mp4',
  poster: '/media/gym-training-poster.jpg',
  ctas: [
    { label: 'Shop new in', href: '/shop?category=new' },
    { label: 'Shop lifting', href: '/shop?category=men' },
  ],
}

// `query` is passed straight to api.products.list().
export const HOME_CAROUSELS = {
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
