// Header content. Structure mirrors gymshark.com's mega-menu one-to-one;
// labels are generic placeholders until the client supplies their own
// taxonomy and collection names (Brief.md #4, #6). Eventually this should
// be served from the CMS/admin panel instead of hard-coded.

export const USP_MESSAGES = [
  'Free standard shipping on orders over $75',
  'Get $10 off when you refer a friend',
  'Get 15% off when you sign up for emails',
  'Students get an extra 12% off',
]

function shop(category, label) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return { label, href: `/shop?category=${category}&collection=${slug}` }
}

function group(category, label, links) {
  return { label, links: links.map((l) => shop(category, l)) }
}

export const NAV_CATEGORIES = [
  {
    id: 'women',
    label: 'Women',
    href: '/shop?category=women',
    groups: [
      group('women', 'Trending', ['New Arrivals', 'Best Sellers', 'Soft Touch', 'Edge', 'Signature Collab', 'Loungewear']),
      group('women', 'Leggings', ['All Leggings', 'Straight Leg Leggings', 'Scrunch Leggings', 'High-Waisted Leggings', 'Flare Leggings', 'Leggings With Pockets', 'Seamless Leggings', 'Short Leggings', 'Tall Leggings']),
      group('women', 'Products', ['All Products', 'Leggings', 'Sports Bras', 'T-Shirts & Tops', 'Shorts', 'Hoodies & Sweatshirts', 'Joggers & Sweatpants', 'Matching Sets', 'Tracksuits', 'Jackets', 'Outerwear', 'Modest Workout Clothes', 'One Piece Bodysuits']),
      group('women', 'Shop By Collection', ['Vital', 'Everyday Seamless', 'Lift Seamless', 'Training', 'Soft Touch']),
      group('women', 'Shop By Activity', ['Running', 'Lifting', 'Hybrid Training', 'Pilates', 'Athleisure']),
      group('women', 'Accessories', ['All Accessories', 'All Socks', 'Gym Bags', 'All Equipment', "Women's Underwear & Basics"]),
      group('women', 'Last Chance', ['Last Chance']),
      group('women', 'Explore', ['Leggings Guide', 'Leggings Size Guide', 'Sports Bra Guide', 'Running Guide', 'New Here?', 'Your Edit', 'Loyalty']),
    ],
    featured: [
      { title: 'Soft Touch', href: '/shop?category=women' },
      { title: 'Dipped Waistband', href: '/shop?category=women' },
    ],
  },
  {
    id: 'men',
    label: 'Men',
    href: '/shop?category=men',
    groups: [
      group('men', 'Trending', ['New Arrivals', 'Best Sellers', 'Power Series', 'Signature Collab', 'Muscle Fit Shirts', 'Hybrid Training', 'Back In Stock']),
      group('men', 'T-Shirts & Tops', ['T-Shirts & Tops', 'Tank Tops', 'Muscle Fit Shirts', 'Short Sleeve', 'Long Sleeve Tops', 'Oversized T-Shirts', 'Compression Fit T-Shirts', 'Black T-Shirts']),
      group('men', 'Products', ['All Products', 'T-Shirts & Tops', 'Shorts', 'Hoodies & Sweatshirts', 'Joggers & Sweatpants', 'Pants', 'Tracksuits', 'Long Sleeve Tops', 'Jackets', 'Outerwear', "Men's Underwear & Basics", 'Base Layers']),
      group('men', 'Shop By Collection', ['Power', 'Conditioning Club', 'Arrival', 'Crest', 'Vital Seamless', 'Geo Seamless']),
      group('men', 'Shop By Activity', ['Running', 'Hybrid Training', 'Lifting', 'Rest Day']),
      group('men', 'Accessories', ['All Accessories', 'All Socks', 'Gym Bags', 'All Equipment', "Men's Underwear & Basics"]),
      group('men', 'Last Chance', ['Last Chance Styles']),
      group('men', 'Explore', ['Shorts Guide', 'Shorts Length Guide', 'Running Guide', 'Your Edit', 'New Here?', 'Loyalty']),
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
      group('accessories', 'Trending', ['All Accessories', 'New Arrivals', 'Best Sellers', 'Seasonal Accessories', 'Running Accessories', 'Back In Stock']),
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
    href: '/',
    groups: [
      group('explore', "Women's Guides", ['Leggings Guide', 'Sports Bra Guide', 'Running Guide']),
      group('explore', "Men's Guides", ['Shorts Guide', 'Running Guide']),
      group('explore', "Women's Clothing", ['Leggings', 'Sports Bras', 'Shorts']),
      group('explore', "Men's Clothing", ['T-Shirts', 'Shorts', 'Joggers']),
      group('explore', 'Find Out More', ['About Us', 'Loyalty', 'Student Discount']),
    ],
    featured: [],
  },
]

export const SECONDARY_LINKS = [
  { label: 'Help', href: '/help' },
  { label: 'Order Tracking', href: '/account' },
  { label: 'Returns', href: '/help' },
  { label: 'Student Discount', href: '/help' },
]
