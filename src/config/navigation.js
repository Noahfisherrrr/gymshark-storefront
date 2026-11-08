import { ACTIVITIES } from './activities'

// Header content. Structure mirrors gymshark.com's mega-menu one-to-one;
// labels are generic placeholders until the client supplies their own
// taxonomy and collection names (Brief.md #4, #6). Eventually this should
// be served from the CMS/admin panel instead of hard-coded.

// Search overlay style. gymshark.com A/B tests both: 'classic' is their
// control (full-width panel), 'glow-up' the challenger (600px side panel).
export const SEARCH_OVERLAY = 'classic'

// The revolving ads bar above the header (gymshark.com's USP banner).
// Hidden for now; flip to true to bring it back.
export const SHOW_ADS_BAR = false

export const ADS_MESSAGES = [
  'Free standard shipping on orders over $75',
  'Get $10 off when you refer a friend',
  'Get 15% off when you sign up for emails',
  'Students get an extra 12% off',
]

// Placeholder sub-nav links (Brief.md #4, #6) land on the gendered Shop page
// without a facet filter — there's no real per-item taxonomy to filter by
// yet, and tagging the URL with an arbitrary slug would collide with the
// real `collection` facet (src/hooks/useProductFilters.js) and filter the
// page down to zero products.
function shop(category, label) {
  return { label, href: `/shop?category=${category}` }
}

function group(category, label, links) {
  return { label, links: links.map((l) => shop(category, l)) }
}

// Activity links filter by the product's `activities` tags (src/api/data/
// products.mock.js), unlike `shop()`'s placeholder links above.
function activityGroup(category) {
  return {
    label: 'Shop By Activity',
    links: ACTIVITIES.map(({ slug, label }) => ({
      label,
      href: `/shop?category=${category}&activity=${slug}`,
    })),
  }
}

export const NAV_CATEGORIES = [
  {
    id: 'women',
    label: 'Women',
    href: '/pages/shop-women',
    groups: [
      {
        label: 'Trending',
        links: [
          { label: 'New Arrivals', href: '/collections/new-releases/womens' },
          ...['Best Sellers', 'Soft Touch', 'Edge', 'Signature Collab', 'Loungewear'].map((l) => shop('women', l)),
        ],
      },
      group('women', 'Leggings', ['All Leggings', 'Straight Leg Leggings', 'Scrunch Leggings', 'High-Waisted Leggings', 'Flare Leggings', 'Leggings With Pockets', 'Seamless Leggings', 'Short Leggings', 'Tall Leggings']),
      group('women', 'Products', ['All Products', 'Leggings', 'Sports Bras', 'T-Shirts & Tops', 'Shorts', 'Hoodies & Sweatshirts', 'Joggers & Sweatpants', 'Matching Sets', 'Tracksuits', 'Jackets', 'Outerwear', 'Modest Workout Clothes', 'One Piece Bodysuits']),
      group('women', 'Shop By Collection', ['Vital', 'Everyday Seamless', 'Lift Seamless', 'Training', 'Soft Touch']),
      activityGroup('women'),
      group('women', 'Accessories', ['All Accessories', 'All Socks', 'Gym Bags', 'All Equipment', "Women's Underwear & Basics"]),
      group('women', 'Last Chance', ['Last Chance']),
      {
        label: 'Explore',
        links: [
          ...['Leggings Guide', 'Leggings Size Guide', 'Sports Bra Guide', 'Running Guide'].map((l) => shop('women', l)),
          { label: 'New Here?', href: '/pages/new-users/women' },
          ...['Your Edit', 'Loyalty'].map((l) => shop('women', l)),
        ],
      },
    ],
    featured: [
      { title: 'Soft Touch', href: '/shop?category=women' },
      { title: 'Dipped Waistband', href: '/shop?category=women' },
    ],
  },
  {
    id: 'men',
    label: 'Men',
    href: '/pages/shop-men',
    groups: [
      {
        label: 'Trending',
        links: [
          { label: 'New Arrivals', href: '/collections/new-releases/mens' },
          ...['Best Sellers', 'Power Series', 'Signature Collab', 'Muscle Fit Shirts', 'Hybrid Training', 'Back In Stock'].map((l) => shop('men', l)),
        ],
      },
      group('men', 'T-Shirts & Tops', ['T-Shirts & Tops', 'Tank Tops', 'Muscle Fit Shirts', 'Short Sleeve', 'Long Sleeve Tops', 'Oversized T-Shirts', 'Compression Fit T-Shirts', 'Black T-Shirts']),
      group('men', 'Products', ['All Products', 'T-Shirts & Tops', 'Shorts', 'Hoodies & Sweatshirts', 'Joggers & Sweatpants', 'Pants', 'Tracksuits', 'Long Sleeve Tops', 'Jackets', 'Outerwear', "Men's Underwear & Basics", 'Base Layers']),
      group('men', 'Shop By Collection', ['Power', 'Conditioning Club', 'Arrival', 'Crest', 'Vital Seamless', 'Geo Seamless']),
      activityGroup('men'),
      group('men', 'Accessories', ['All Accessories', 'All Socks', 'Gym Bags', 'All Equipment', "Men's Underwear & Basics"]),
      group('men', 'Last Chance', ['Last Chance Styles']),
      {
        label: 'Explore',
        links: [
          ...['Shorts Guide', 'Shorts Length Guide', 'Running Guide', 'Your Edit'].map((l) => shop('men', l)),
          { label: 'New Here?', href: '/pages/new-users/men' },
          ...['Loyalty'].map((l) => shop('men', l)),
        ],
      },
    ],
    featured: [
      { title: 'Power Series', href: '/shop?category=men' },
      { title: 'Signature Collab', href: '/shop?category=men' },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    href: '/shop?category=accessories',
    groups: [
      {
        label: 'Trending',
        links: [
          { label: 'New Arrivals', href: '/collections/new-releases/accessories' },
          ...['All Accessories', 'Best Sellers', 'Seasonal Accessories', 'Running Accessories', 'Back In Stock'].map((l) => shop('accessories', l)),
        ],
      },
      group('accessories', 'Bags', ['All Bags', 'Backpacks', 'Duffle Bags', 'Holdalls', 'Small Bags']),
      group('accessories', 'Equipment', ['All Equipment', 'Bottles', 'Lifting Equipment', 'Resistance Bands']),
      group('accessories', 'Socks', ['All Socks', 'Crew Socks', 'Ankle Socks', 'No Show Socks']),
      group('accessories', 'Underwear', ["Women's Underwear", "Men's Underwear"]),
      group('accessories', 'Headwear', ['All Headwear', 'Caps', 'Beanies']),
      group('accessories', 'Last Chance', ['Last Chance Accessories']),
    ],
    featured: [],
  },
  {
    id: 'explore',
    label: 'Explore',
    href: '/pages/new-users',
    groups: [
      group('explore', "Women's Guides", ['Leggings Guide', 'Sports Bra Guide', 'Running Guide']),
      group('explore', "Men's Guides", ['Shorts Guide', 'Running Guide']),
      group('explore', "Women's Clothing", ['Leggings', 'Sports Bras', 'Shorts']),
      group('explore', "Men's Clothing", ['T-Shirts', 'Shorts', 'Joggers']),
      {
        label: 'Find Out More',
        links: [
          { label: 'New Here? (Women)', href: '/pages/new-users/women' },
          { label: 'New Here? (Men)', href: '/pages/new-users/men' },
          { label: 'About Us', href: '/pages/about-us' },
          shop('explore', 'Loyalty'),
          { label: 'Student Discount', href: '/pages/student-discount' },
        ],
      },
    ],
    featured: [],
  },
]

export const SECONDARY_LINKS = [
  { label: 'Help', href: '/help' },
  { label: 'Order Tracking', href: '/account' },
  { label: 'Returns', href: '/help/returns-policy' },
  { label: 'Student Discount', href: '/pages/student-discount' },
]
