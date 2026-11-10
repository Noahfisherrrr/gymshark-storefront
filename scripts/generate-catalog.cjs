// Generator script for 100 10X Sports products (40 Women, 40 Men, 20 Accessories)
// Generates:
// 1. supabase/data/products.json
// 2. supabase/seed.sql + supabase/01_seed_products.sql + supabase/02_seed_reviews.sql
// 3. supabase/schema.sql

const fs = require('fs')
const path = require('path')

// Helper for variants. Every variant's priceOverride is null (no per-variant
// pricing in this catalog) — callers still pass the product's price in case
// that changes, so it's accepted but intentionally unused here.
function generateVariants(productId, sizes, color, _price) {
  return sizes.map((size, idx) => {
    const cleanSize = size.toLowerCase().replace(/[^a-z0-9]/g, '')
    const id = `${productId}-${cleanSize}`
    // realistic stock distribution
    const stockPatterns = [14, 22, 18, 5, 2, 0, 11]
    const stock = stockPatterns[(productId.length + idx) % stockPatterns.length]
    return {
      id,
      size,
      color,
      sku: `GS-${id.toUpperCase().replace(/[^A-Z0-9]/g, '-')}`,
      stock,
      priceOverride: null,
    }
  })
}

// Helper for fallback image cycle
const mediaImages = [
  '/media/products/p1.webp',
  '/media/products/p2.webp',
  '/media/products/p3.webp',
  '/media/products/p4.webp',
  '/media/products/p5.webp',
  '/media/products/p6.webp',
  '/media/products/p7.webp',
  '/media/products/p8.webp',
  '/media/products/p9.webp',
  '/media/products/p10.webp',
  '/media/products/p11.webp',
  '/media/products/p12.webp',
  '/media/products/p13.webp',
  '/media/products/p14.webp',
  '/media/products/p15.webp',
  '/media/products/p16.webp',
  '/media/products/p17.webp',
  '/media/products/p18.webp',
  '/media/products/p19.webp',
  '/media/products/p20.webp',
]

function getProductImage(index) {
  return mediaImages[index % mediaImages.length]
}

const standardSizes = ['XS', 'S', 'M', 'L', 'XL']
const accessorySizes = ['One Size']
const beltSizes = ['S', 'M', 'L', 'XL']

// 40 WOMEN PRODUCTS
const rawWomenProducts = [
  {
    name: '10X Sports SoftSense™ Longline Sports Bra',
    subtitle: 'Medium Support',
    type: 'sports-bras',
    activities: ['yoga', 'pilates', 'athleisure'],
    price: 42,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['four-way-stretch', 'sweat-wicking'],
    collection: 'softsense',
    collectionName: 'SoftSense™',
    color: 'Cherry Red',
    colorHex: '#8B1E2E',
    tag: 'Trending',
    badges: ['NEW RELEASE', 'SOFTSENSE™'],
    description: 'Softness you can genuinely sense. The SoftSense™ Longline Sports Bra is engineered with revolutionary LYCRA® ADAPTIV fiber that personalizes its hold to your unique shape. Designed with an extended underbust band for confident coverage during studio sessions and all-day athleisure comfort.',
  },
  {
    name: 'Vital Seamless 2.0 High-Waisted Leggings',
    subtitle: 'Full Length (28" Inseam)',
    type: 'leggings',
    activities: ['weight-lifting', 'running', 'athleisure'],
    price: 54,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Vital Seamless',
    color: 'Black Marl',
    colorHex: '#222225',
    tag: 'Bestseller',
    badges: ['ICONIC', 'SQUAT-PROOF'],
    description: 'The legend that built 10X Sports. Vital Seamless 2.0 Leggings are crafted with sweat-wicking tech and compressive marl knit to support your heavy compound lifts and high-mileage runs with complete zero-distraction squat-proof security.',
  },
  {
    name: 'Everyday Seamless Short Sleeve Crop Top',
    subtitle: 'Breathable Contour Knit',
    type: 't-shirts',
    activities: ['pilates', 'athleisure', 'yoga'],
    price: 38,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['four-way-stretch', 'sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Everyday Seamless',
    color: 'Sage Green',
    colorHex: '#7D9D8B',
    tag: 'New',
    badges: ['BESTSELLER', 'SEAMLESS'],
    description: 'Effortless minimalism meets gym-ready performance. The Everyday Seamless Crop Top features targeted micro-mesh ribbing for cooling airflow, a flattering round crew neckline, and unrestrictive four-way stretch.',
  },
  {
    name: 'Power Cropped Full-Zip Fleece Hoodie',
    subtitle: 'Heavyweight Lifting Layer',
    type: 'hoodies',
    activities: ['weight-lifting', 'athleisure'],
    price: 58,
    compareAtPrice: 68,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Washed Black',
    colorHex: '#333333',
    tag: 'Sale',
    badges: ['HEAVYWEIGHT', 'PUMP COVER'],
    description: 'Your ultimate squat-rack warm-up companion. Heavyweight 380gsm brushed loopback cotton fleece with a boxy cropped silhouette, chunky industrial zipper, and double-lined hood for cold morning gym sessions.',
  },
  {
    name: 'Adapt Camo Seamless 5" Shorts',
    subtitle: 'High Support Lifting Shorts',
    type: 'shorts',
    activities: ['weight-lifting', 'athleisure'],
    price: 46,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Adapt Seamless',
    color: 'Berry Pink',
    colorHex: '#A23B72',
    tag: 'Trending',
    badges: ['CAMO JACQUARD', 'SQUAT-PROOF'],
    description: 'Engineered for PRs. Featuring a custom jacquard camo weave, compressive ribbed waistband that holds without digging in, and subtle scrunch contour detailing that highlights your glute shape.',
  },
  {
    name: 'Geo Seamless High-Waisted Leggings',
    subtitle: 'Architectural Rib Knit',
    type: 'leggings',
    activities: ['running', 'pilates', 'weight-lifting'],
    price: 56,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'four-way-stretch', 'sweat-wicking'],
    collection: 'geo-seamless',
    collectionName: 'Geo Seamless',
    color: 'Slate Blue',
    colorHex: '#4A6572',
    tag: 'New',
    badges: ['ENGINEERED RIB', 'HIGH SUPPORT'],
    description: 'Precision contouring meets high-gauge seamless jacquard. Geometric shading accentuates quadriceps and calves while the supportive compression band stays pinned in place during explosive plyometrics.',
  },
  {
    name: 'GS Power Heavyweight Oversized T-Shirt',
    subtitle: 'Drop-Shoulder Boxy Tee',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 36,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Pure White',
    colorHex: '#F8F9FA',
    tag: null,
    badges: ['100% ORGANIC COTTON', 'DROP SHOULDER'],
    description: 'The heavyweight gym staple reimagined. Crafted from 240gsm premium combed organic cotton with relaxed drop shoulders, a thick ribbed collar, and archival 10X Sports weightlifting graphic print on the back.',
  },
  {
    name: 'Minimal Strappy Cross-Back Sports Bra',
    subtitle: 'Light Support Studio Bralette',
    type: 'sports-bras',
    activities: ['yoga', 'pilates', 'athleisure'],
    price: 35,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['four-way-stretch', 'sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Minimalist Studio',
    color: 'Espresso Brown',
    colorHex: '#3D2817',
    tag: 'Trending',
    badges: ['REMOVABLE CUPS', 'LIGHT SUPPORT'],
    description: 'Zero hardware, barely-there freedom. Fine cross-back micro straps create a delicate aesthetic while delivering enough support for gentle vinyasa flows, mat pilates, and lounging.',
  },
  {
    name: 'Apex Seamless Waterproof Running Jacket',
    subtitle: 'Stormproof Packable Outerwear',
    type: 'jackets',
    activities: ['running', 'hiking'],
    price: 90,
    compareAtPrice: 110,
    fit: 'slim',
    rise: null,
    features: ['reflective', 'sweat-wicking', 'pockets'],
    collection: 'vital',
    collectionName: 'Apex Performance',
    color: 'Stealth Black',
    colorHex: '#18181A',
    tag: 'Sale',
    badges: ['WATER REPELLENT', 'REFLECTIVE 360°'],
    description: 'Don’t let weather cancel your road mileage. Ultra-lightweight DWR-coated ripstop fabric with laser-cut underarm ventilation panels, waterproof zipper garages, and 360-degree reflective piping.',
  },
  {
    name: 'Vital Seamless 2.0 Long Sleeve Crop Top',
    subtitle: 'Sweat-Wicking Thumbhole Top',
    type: 't-shirts',
    activities: ['running', 'weight-lifting', 'pilates'],
    price: 44,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Vital Seamless',
    color: 'Smokey Grey',
    colorHex: '#5C5E62',
    tag: 'Bestseller',
    badges: ['THUMBHOLES', 'SEAMLESS MARL'],
    description: 'Form-accentuating seamless marl knit with body-mapped ventilation zones and comfortable ergonomic thumbholes to keep sleeves securely locked during high-intensity intervals.',
  },
  {
    name: 'Training Oversized Fleece Pullover Hoodie',
    subtitle: 'Plush Brushed Cotton Interior',
    type: 'hoodies',
    activities: ['athleisure', 'weight-lifting'],
    price: 55,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch', 'pockets'],
    collection: 'power',
    collectionName: 'Training Essentials',
    color: 'Light Grey Marl',
    colorHex: '#D1D3D4',
    tag: null,
    badges: ['KANGAROO POCKET', 'FLEECE LINED'],
    description: 'Your go-to lazy Sunday or post-leg-day companion. Made with ultra-soft fleece, deep kangaroo pocket, and roomy drop-shoulder cut for ultimate cozy insulation.',
  },
  {
    name: 'Sweat Seamless High-Waisted Leggings',
    subtitle: 'Compressive Rib & Breathable Eyelets',
    type: 'leggings',
    activities: ['running', 'weight-lifting'],
    price: 52,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'sweat-wicking', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Sweat Seamless',
    color: 'Deep Teal',
    colorHex: '#184E59',
    tag: 'New',
    badges: ['SWEAT-WICKING', 'SQUAT-PROOF'],
    description: 'Engineered for your sweatiest sessions. Features targeted eyelet detailing along the thighs for thermoregulation and a 3-tiered compressive ribbed waistband that never budges.',
  },
  {
    name: 'Rest Day Lounge Straight Leg Joggers',
    subtitle: 'Ultra-Soft Heavyweight Terry',
    type: 'joggers',
    activities: ['athleisure'],
    price: 54,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: 'high-waisted',
    features: ['pockets', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Rest Day',
    color: 'Oatmeal Marl',
    colorHex: '#D8CFC4',
    tag: 'Trending',
    badges: ['STRAIGHT LEG', 'ORGANIC TERRY'],
    description: 'Because recovery is where progress happens. Crafted from heavy French terry cotton with relaxed straight legs, an elasticated waistband, and deep slant side pockets.',
  },
  {
    name: 'Training Midi High-Neck Sports Bra',
    subtitle: 'High Support Cardio & HIIT Bra',
    type: 'sports-bras',
    activities: ['running', 'weight-lifting'],
    price: 40,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Training Core',
    color: 'Navy Blue',
    colorHex: '#1B263B',
    tag: null,
    badges: ['HIGH SUPPORT', 'HIGH NECK'],
    description: 'Maximum coverage and locked-in bounce control. High neckline protects against unintended exposure during burpees and box jumps, supported by a heavy-duty underband.',
  },
  {
    name: 'Elevate Flared Crossover Leggings',
    subtitle: 'Buttery Soft V-Front Flare',
    type: 'leggings',
    activities: ['pilates', 'yoga', 'athleisure'],
    price: 58,
    compareAtPrice: null,
    fit: 'regular',
    rise: 'high-waisted',
    features: ['four-way-stretch', 'sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Elevate Studio',
    color: 'Pitch Black',
    colorHex: '#111112',
    tag: 'Bestseller',
    badges: ['V-FRONT WAISTBAND', 'FLARED LEG'],
    description: 'A studio icon. Flattering crossover waistband sculpts your core without pinching, flowing into a graceful flare at the ankle that looks just as chic paired with trainers or platform boots.',
  },
  {
    name: 'GS LC Ribbed Racerback Tank',
    subtitle: 'Body-Contouring Cotton Rib',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 30,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Lifting Club',
    color: 'Forest Green',
    colorHex: '#1E3F20',
    tag: null,
    badges: ['LIFTING CLUB', 'STRETCH RIB'],
    description: 'Classic collegiate lifting style. Deep scoop neck, narrow racerback cut that showcases upper back muscularity, and archival 10X Sports Lifting Club crest embroidered at center chest.',
  },
  {
    name: 'Everyday Seamless 7" Bike Shorts',
    subtitle: 'Chafe-Free Inseam Shorts',
    type: 'shorts',
    activities: ['running', 'pilates', 'athleisure'],
    price: 42,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'four-way-stretch', 'sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Everyday Seamless',
    color: 'Mocha Brown',
    colorHex: '#5C4033',
    tag: 'New',
    badges: ['CHAFE-FREE', '7" INSEAM'],
    description: 'The golden length for comfort and coverage. 7-inch seamless inseam prevents inner thigh chafing on long summer walks and sprint intervals.',
  },
  {
    name: 'Speed Reflective Windbreaker Jacket',
    subtitle: 'Ultralight Half-Zip Shell',
    type: 'jackets',
    activities: ['running', 'hiking'],
    price: 68,
    compareAtPrice: 80,
    fit: 'regular',
    rise: null,
    features: ['reflective', 'sweat-wicking', 'pockets'],
    collection: 'vital',
    collectionName: 'Speed Outdoor',
    color: 'Neon Lime / Black',
    colorHex: '#C6FF00',
    tag: 'Sale',
    badges: ['HIGH VISIBILITY', 'PACKABLE'],
    description: 'Early dawn and twilight safety. High-visibility neon contrast with reflective strips on sleeves and back yolk. Packs down into its own front kangaroo zip pouch.',
  },
  {
    name: 'Vital Seamless 2.0 Long Sleeve Top',
    subtitle: 'Breathable Training Baselayer',
    type: 't-shirts',
    activities: ['running', 'weight-lifting'],
    price: 45,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Vital Seamless',
    color: 'Blush Pink',
    colorHex: '#DE9EAF',
    tag: null,
    badges: ['SEAMLESS', 'THUMBHOLES'],
    description: 'Second-skin performance feel. Woven with subtle marl knit and micro-perforations across the spine and underarms for continuous cooling during strenuous lifts.',
  },
  {
    name: 'Adapt Animal Seamless Leggings',
    subtitle: 'Subtle Jacquard Animal Pattern',
    type: 'leggings',
    activities: ['weight-lifting', 'pilates'],
    price: 58,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'four-way-stretch', 'sweat-wicking'],
    collection: 'vital',
    collectionName: 'Adapt Seamless',
    color: 'Charcoal Grey',
    colorHex: '#383838',
    tag: 'Trending',
    badges: ['SQUAT-PROOF', 'TEXTURED KNIT'],
    description: 'Subtle tone-on-tone jacquard animal pattern knit directly into compressive yarn. Squat-tested to withstand the heaviest barbell work without sheer transparency.',
  },
  {
    name: 'Fraction Low-Back Sports Bra',
    subtitle: 'Medium Support Asymmetric Strap',
    type: 'sports-bras',
    activities: ['pilates', 'yoga'],
    price: 36,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['four-way-stretch', 'sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Fraction Collection',
    color: 'Lilac Dusk',
    colorHex: '#B695C0',
    tag: null,
    badges: ['OPEN BACK', 'MEDIUM HOLD'],
    description: 'Clean geometry meets delicate detailing. An open low-back design lets your lats breathe freely while a supportive double-layered front keeps everything comfortably secure.',
  },
  {
    name: 'Power Muscle Tank Top',
    subtitle: 'Deep Cut Armholes for Lifting',
    type: 't-shirts',
    activities: ['weight-lifting'],
    price: 28,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Deep Plum',
    colorHex: '#4A154B',
    tag: null,
    badges: ['BREATHABLE', 'COTTON BLEND'],
    description: 'Designed so you can monitor upper back and deltoid engagement in the mirrors. Dropped armholes and a curved drop-tail hem for full mobility.',
  },
  {
    name: 'Hyper Amplified High-Waisted Leggings',
    subtitle: 'Maximum Glute Contouring Rib',
    type: 'leggings',
    activities: ['weight-lifting'],
    price: 62,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'four-way-stretch', 'sweat-wicking'],
    collection: 'power',
    collectionName: 'Hyper Amplified',
    color: 'Crimson Red',
    colorHex: '#990000',
    tag: 'Bestseller',
    badges: ['CONTOUR RIB', 'MAX COMPRESSION'],
    description: 'Our most supportive compression yet. Targeted under-glute structural knitting and ultra-dense high-twist yarn provide unmatched shaping and squat-proof reliability.',
  },
  {
    name: 'Heavyweight Fleece Crewneck Sweatshirt',
    subtitle: 'Brushed Cotton Heritage Pullover',
    type: 'hoodies',
    activities: ['athleisure'],
    price: 52,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Heritage Lounge',
    color: 'Sand Dunes',
    colorHex: '#C2B280',
    tag: null,
    badges: ['HEAVYWEIGHT', 'ORGANIC COTTON'],
    description: 'Thick, plush, and effortlessly boxy. Made from 360gsm organic fleece with ribbed side panels and a subtle tone-on-tone embroidered 10X Sports script.',
  },
  {
    name: 'Apex Seamless 2-in-1 Running Shorts',
    subtitle: 'Built-in Compression Liner',
    type: 'shorts',
    activities: ['running', 'hiking'],
    price: 48,
    compareAtPrice: null,
    fit: 'slim',
    rise: 'mid-waisted',
    features: ['pockets', 'reflective', 'sweat-wicking'],
    collection: 'vital',
    collectionName: 'Apex Performance',
    color: 'Pitch Black',
    colorHex: '#151515',
    tag: 'New',
    badges: ['2-IN-1 LINER', 'PHONE POCKET'],
    description: 'Zero chafing, full storage. A featherweight 3" woven shell over a supportive 5" compression liner equipped with a secure bounce-free phone pocket.',
  },
  {
    name: 'Sport Contour Scoop Neck Sports Bra',
    subtitle: 'Sweat-Defeating Medium Support',
    type: 'sports-bras',
    activities: ['running', 'weight-lifting', 'pilates'],
    price: 38,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Sport Contour',
    color: 'Electric Blue',
    colorHex: '#0055FF',
    tag: 'Trending',
    badges: ['COOL TOUCH', 'ANTI-ODOR'],
    description: 'Engineered with quick-dry cooling microfibers that pull sweat away in seconds. Wide supportive shoulder straps distribute pressure evenly across traps.',
  },
  {
    name: 'Training Lightweight Woven Track Pants',
    subtitle: 'Elastic Cuffs & Zipper Pockets',
    type: 'joggers',
    activities: ['running', 'athleisure', 'hiking'],
    price: 55,
    compareAtPrice: 65,
    fit: 'regular',
    rise: 'mid-waisted',
    features: ['pockets', 'sweat-wicking', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Training Essentials',
    color: 'Olive Green',
    colorHex: '#556B2F',
    tag: 'Sale',
    badges: ['ZIP POCKETS', 'WATER RESISTANT'],
    description: 'Crisp, lightweight stretch woven fabric with water-resistant coating. Ankle zips allow you to easily pull them on and off over your training shoes.',
  },
  {
    name: 'SoftSense Ribbed Cami Tank',
    subtitle: 'Built-in Shelf Bra Studio Tank',
    type: 't-shirts',
    activities: ['pilates', 'yoga', 'athleisure'],
    price: 40,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['four-way-stretch', 'sweat-wicking'],
    collection: 'softsense',
    collectionName: 'SoftSense™',
    color: 'Chalk White',
    colorHex: '#F5F5F0',
    tag: 'New',
    badges: ['SHELF BRA', 'SOFTSENSE™'],
    description: 'All-in-one studio elegance. Featuring a built-in shelf bra with removable cups and a fine micro-ribbed modal blend that hugs like a second skin.',
  },
  {
    name: 'Vital Seamless 2.0 4" Shorts',
    subtitle: 'Squat-Proof Lifting Shorts',
    type: 'shorts',
    activities: ['weight-lifting', 'running'],
    price: 40,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Vital Seamless',
    color: 'Emerald Green',
    colorHex: '#097969',
    tag: 'Bestseller',
    badges: ['BESTSELLER', 'SQUAT-PROOF'],
    description: 'The world’s most popular lifting short. 4-inch inseam showcases quad definition without riding up during deep barbell back squats or hip thrusts.',
  },
  {
    name: 'GS Power Multi-Strap Lifting Bra',
    subtitle: 'Reinforced High Support Bra',
    type: 'sports-bras',
    activities: ['weight-lifting'],
    price: 44,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Terracotta Rust',
    colorHex: '#E2725B',
    tag: null,
    badges: ['MULTI-STRAP', 'HEAVY SUPPORT'],
    description: 'Built specifically for heavy lifters. Multiple criss-crossing back tension bands distribute barbell contact evenly across the upper traps during squats.',
  },
  {
    name: 'Rest Day Seamless All-In-One Unitard',
    subtitle: 'Sculpting Bodysuit with Open Back',
    type: 'leggings',
    activities: ['pilates', 'yoga', 'athleisure'],
    price: 68,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Studio Bodysuits',
    color: 'Obsidian Black',
    colorHex: '#1B1B1B',
    tag: 'Trending',
    badges: ['ONE-PIECE', 'SCULPTING'],
    description: 'One piece, zero fuss. Ribbed midsection contours the waist while a low scooped back adds studio sophistication. Pairs effortlessly under an oversized boyfriend blazer.',
  },
  {
    name: 'Studio High-Rise Flared Ribbed Pants',
    subtitle: 'Split Hem Bootcut Silhouette',
    type: 'joggers',
    activities: ['yoga', 'pilates', 'athleisure'],
    price: 52,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: 'high-waisted',
    features: ['four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Studio Lounge',
    color: 'Charcoal Heather',
    colorHex: '#424242',
    tag: null,
    badges: ['SPLIT HEM', 'BUTTERY SOFT'],
    description: 'The viral split-hem silhouette. Extra-long legs flare over sneakers with side ankle slits that create a slimming, elongated leg line.',
  },
  {
    name: 'Legacy Graphic Oversized Heavyweight Tee',
    subtitle: 'Vintage 10X Sports Gold Era Graphic',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 38,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Legacy Archive',
    color: 'Faded Navy',
    colorHex: '#2B3A42',
    tag: 'New',
    badges: ['ARCHIVAL GRAPHIC', 'VINTAGE WASH'],
    description: 'An ode to where we began. Distressed screenprint graphic of the original 2012 10X Sports gym badge on 100% heavy mineral-washed cotton.',
  },
  {
    name: 'Elevate Packable Windbreaker Anorak',
    subtitle: 'Water-Resistant Outdoor Half-Zip',
    type: 'jackets',
    activities: ['hiking', 'running'],
    price: 72,
    compareAtPrice: 85,
    fit: 'relaxed',
    rise: null,
    features: ['reflective', 'pockets', 'sweat-wicking'],
    collection: 'vital',
    collectionName: 'Elevate Studio',
    color: 'Pale Taupe',
    colorHex: '#B38B6D',
    tag: 'Sale',
    badges: ['PACKABLE', 'WATER RESISTANT'],
    description: 'Versatile outdoor anorak with an adjustable bungee hem and storm flap hood. Made with recycled polyester and sealed seams.',
  },
  {
    name: 'Adapt Fleck Seamless High-Waisted Leggings',
    subtitle: 'Multi-Color Fleck Marl Compression',
    type: 'leggings',
    activities: ['weight-lifting', 'athleisure'],
    price: 60,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Adapt Seamless',
    color: 'Lavender Blue Fleck',
    colorHex: '#7B88B2',
    tag: 'Trending',
    badges: ['FLECK KNIT', 'SQUAT-PROOF'],
    description: 'Engineered with vibrant contrasting fleck yarns woven into high-compression seamless fabric. Glute-accentuating back contour panels deliver shape and security.',
  },
  {
    name: 'Minimal Clean-Cut Cross-Back Bralette',
    subtitle: 'Seamless Wireless Comfort Bra',
    type: 'sports-bras',
    activities: ['yoga', 'pilates', 'athleisure'],
    price: 32,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Minimalist Studio',
    color: 'Dusty Rose',
    colorHex: '#DCAE96',
    tag: null,
    badges: ['WIRELESS', 'SECOND SKIN'],
    description: 'No wires, no pressure points. Seamless circular knit wraps around your ribs smoothly with removable padding and anti-dig flat shoulder straps.',
  },
  {
    name: 'Training Loose Fit Breathable Tank',
    subtitle: 'Featherweight Dropped Armhole Tank',
    type: 't-shirts',
    activities: ['running', 'weight-lifting'],
    price: 26,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Training Core',
    color: 'Sunburst Yellow',
    colorHex: '#F4C430',
    tag: null,
    badges: ['BREATHABLE', 'ULTRA LIGHT'],
    description: 'A pop of summer energy for hot gym sessions. Ultra-lightweight polyester mesh wicks away moisture in record time.',
  },
  {
    name: 'Vital Seamless Half-Zip Pullover',
    subtitle: 'High Collar Form-Fitting Top',
    type: 'hoodies',
    activities: ['running', 'weight-lifting'],
    price: 48,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Vital Seamless',
    color: 'Steel Blue',
    colorHex: '#4682B4',
    tag: 'Bestseller',
    badges: ['HALF-ZIP', 'SEAMLESS'],
    description: 'The perfect transition layer. A quarter-zip front lets you dump heat quickly mid-workout, paired with signature Vital marl compression.',
  },
  {
    name: 'Power Ribbed Cycle Shorts 8"',
    subtitle: 'Thick Sculpting Barbell Shorts',
    type: 'shorts',
    activities: ['weight-lifting', 'athleisure'],
    price: 44,
    compareAtPrice: null,
    fit: 'compression',
    rise: 'high-waisted',
    features: ['squat-proof', 'four-way-stretch', 'pockets'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Dark Cherry',
    colorHex: '#58111A',
    tag: null,
    badges: ['BARBELL TESTED', 'SIDE POCKET'],
    description: 'Built for heavy knurled barbell contact. Abrasion-resistant heavy rib fabric shields your quads from scrape marks during heavy deadlifts.',
  },
  {
    name: 'Essential Boxy Cropped T-Shirt',
    subtitle: 'Heavy Cotton Everyday Silhouette',
    type: 't-shirts',
    activities: ['athleisure'],
    price: 32,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Everyday Essentials',
    color: 'Chalk White',
    colorHex: '#FFFFFF',
    tag: null,
    badges: ['100% COTTON', 'BOXY FIT'],
    description: 'Simple, timeless, premium. 100% thick jersey cotton cut into a modern wide-boxy cropped cut that pairs cleanly with high-waisted bottoms.',
  },
]

// 40 MEN PRODUCTS
const rawMenProducts = [
  {
    name: 'Power Heavyweight Oversized T-Shirt',
    subtitle: 'Heavy Cotton Lifting Pump Cover',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 38,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Washed Black',
    colorHex: '#252525',
    tag: 'Bestseller',
    badges: ['PUMP COVER', '250 GSM COTTON'],
    description: 'The heavyweight king of the gym floor. Thick 250gsm vintage-washed cotton with exaggerated drop shoulders, reinforced rib crewneck, and iconic raw lifting presence.',
  },
  {
    name: 'Apex Hybrid 5" Performance Running Shorts',
    subtitle: 'Split-Hem Ultra-Lightweight Shorts',
    type: 'shorts',
    activities: ['running', 'hiking'],
    price: 48,
    compareAtPrice: null,
    fit: 'slim',
    rise: 'mid-waisted',
    features: ['reflective', 'sweat-wicking', 'pockets', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Apex Performance',
    color: 'Stealth Black',
    colorHex: '#121212',
    tag: 'Trending',
    badges: ['SPLIT HEM', 'ZIP PHONE POCKET'],
    description: 'Engineered for unrestricted cadence. Featherweight 4-way stretch fabric with side split hems, laser ventilation holes, and an internal zippered bounce-proof phone pocket.',
  },
  {
    name: 'Crest Heavyweight Pullover Hoodie',
    subtitle: 'Brushed Interior Fleece Hood',
    type: 'hoodies',
    activities: ['athleisure', 'weight-lifting'],
    price: 55,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['four-way-stretch', 'pockets'],
    collection: 'power',
    collectionName: 'Crest Collection',
    color: 'Navy Blue Marl',
    colorHex: '#1D2A44',
    tag: 'Bestseller',
    badges: ['EMBROIDERED LOGO', 'KANGAROO POCKET'],
    description: 'A genuine 10X Sports essential since day one. Soft brushed fleece lining, tonal embroidered chest crest, double-layered drawstring hood, and durable ribbed hems.',
  },
  {
    name: 'Critical 2.0 Drop Arm Stringer Vest',
    subtitle: 'Classic Bodybuilder Cut Tank',
    type: 't-shirts',
    activities: ['weight-lifting'],
    price: 25,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Critical 2.0',
    color: 'Charcoal Marl',
    colorHex: '#3A3D40',
    tag: null,
    badges: ['STRINGER CUT', 'Y-BACK'],
    description: 'Unapologetic old-school bodybuilding. Deep drop-armholes and a thin Y-back design provide completely unobstructed shoulder and lat mobility under heavy bench presses.',
  },
  {
    name: 'Arrival 7" Slim Fit Training Shorts',
    subtitle: 'Breathable Lightweight Gym Shorts',
    type: 'shorts',
    activities: ['weight-lifting', 'running'],
    price: 32,
    compareAtPrice: null,
    fit: 'slim',
    rise: 'mid-waisted',
    features: ['sweat-wicking', 'four-way-stretch', 'pockets'],
    collection: 'everyday-seamless',
    collectionName: 'Arrival Series',
    color: 'Graphite Grey',
    colorHex: '#48494B',
    tag: 'Bestseller',
    badges: ['7" INSEAM', 'QUICK DRY'],
    description: 'The shorts that handle any workout thrown at them. Lightweight sweat-wicking poly-elastane blend with an elastic drawstring waistband and two deep side pockets.',
  },
  {
    name: 'Legacy Heavyweight Graphic T-Shirt',
    subtitle: 'Distressed Vintage Archival Print',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 36,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Legacy Archive',
    color: 'Dark Olive Green',
    colorHex: '#3B4D3C',
    tag: 'New',
    badges: ['VINTAGE WASH', 'HEAVYWEIGHT'],
    description: 'Inspired by the garage gym roots. Mineral-washed heavyweight cotton tee featuring the original 10X Sports lifting logo printed with distressed, crackled inks.',
  },
  {
    name: 'Geo Seamless Muscle Fit T-Shirt',
    subtitle: 'Body-Mapping Compression Jacquard',
    type: 't-shirts',
    activities: ['running', 'weight-lifting'],
    price: 42,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'geo-seamless',
    collectionName: 'Geo Seamless',
    color: 'Slate Grey',
    colorHex: '#525B62',
    tag: 'Trending',
    badges: ['SEAMLESS JACQUARD', 'MUSCLE FIT'],
    description: 'Hugs the delts, chest, and arms while tapering sharply at the waist. Geometric breathability knit patterns follow muscle groups to dump heat efficiently.',
  },
  {
    name: 'Sport Seamless Full-Zip Track Jacket',
    subtitle: 'Athletic Fitted High Collar Jacket',
    type: 'jackets',
    activities: ['running', 'athleisure', 'hiking'],
    price: 65,
    compareAtPrice: 78,
    fit: 'slim',
    rise: null,
    features: ['sweat-wicking', 'reflective', 'pockets', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Sport Performance',
    color: 'Pitch Black',
    colorHex: '#141416',
    tag: 'Sale',
    badges: ['FULL-ZIP', 'REFLECTIVE DETAILS'],
    description: 'Clean athletic silhouette. Seamless engineered knit offers high flexibility with zero chafing seams, dual concealed zipper pockets, and reflective arm details.',
  },
  {
    name: 'Power Heavyweight Lifting Joggers',
    subtitle: 'Tapered Cuffed Barbell Sweatpants',
    type: 'joggers',
    activities: ['weight-lifting', 'athleisure'],
    price: 52,
    compareAtPrice: null,
    fit: 'regular',
    rise: 'mid-waisted',
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Washed Charcoal',
    colorHex: '#2F3136',
    tag: 'Bestseller',
    badges: ['REINFORCED KNEES', 'ZIP POCKETS'],
    description: 'Built for the iron paradise. Gusseted crotch and room in the quads that tapers into a snug ribbed ankle cuff that stays clear of barbell knurling.',
  },
  {
    name: 'Arrival Slim Fit Performance Tank',
    subtitle: 'Featherweight Breathable Gym Tank',
    type: 't-shirts',
    activities: ['weight-lifting', 'running'],
    price: 24,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Arrival Series',
    color: 'Pure White',
    colorHex: '#FFFFFF',
    tag: null,
    badges: ['QUICK DRY', 'LIGHTWEIGHT'],
    description: 'Light as air. High-performance polyester with anti-static finish and subtle reflective heat-seal 10X Sports sharkhead logo.',
  },
  {
    name: 'Apex Breathable Seamless Long Sleeve Top',
    subtitle: 'Targeted Laser-Cut Mesh Zones',
    type: 't-shirts',
    activities: ['running', 'hiking'],
    price: 48,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch', 'reflective'],
    collection: 'vital',
    collectionName: 'Apex Performance',
    color: 'Reflective Silver / Black',
    colorHex: '#23272A',
    tag: 'New',
    badges: ['LASER PERFORATED', 'THUMBHOLES'],
    description: 'Next-generation running technical wear. Targeted micro-mesh perforations along the thoracic spine and armpits provide maximum heat dispersal during marathon training.',
  },
  {
    name: 'Crest Slim Fit Fleece Sweatpants',
    subtitle: 'Everyday Tapered Joggers',
    type: 'joggers',
    activities: ['athleisure'],
    price: 45,
    compareAtPrice: null,
    fit: 'slim',
    rise: 'mid-waisted',
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Crest Collection',
    color: 'Black Marl',
    colorHex: '#1F1F21',
    tag: 'Bestseller',
    badges: ['SLIM TAPER', 'EMBROIDERED LOGO'],
    description: 'The go-to pants you put on the minute you get home. Tailored slim leg profile that looks sharp enough for coffee runs and casual travel.',
  },
  {
    name: 'Heavyweight Heritage Pump Cover Hoodie',
    subtitle: '400gsm Heavy French Terry Pullover',
    type: 'hoodies',
    activities: ['weight-lifting', 'athleisure'],
    price: 68,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch', 'pockets'],
    collection: 'power',
    collectionName: 'Heritage Power',
    color: 'Deep Burgundy',
    colorHex: '#581825',
    tag: 'Trending',
    badges: ['400 GSM', 'HEAVYWEIGHT TERRY'],
    description: 'Maximum density cotton fleece designed to lock in heat until your pump is fully primed. Exaggerated hood fits easily over over-ear lifting headphones.',
  },
  {
    name: 'Critical Full-Zip Training Hoodie',
    subtitle: 'Versatile Cotton Blend Warm-Up Zip',
    type: 'hoodies',
    activities: ['weight-lifting', 'athleisure'],
    price: 48,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Critical 2.0',
    color: 'Light Grey Marl',
    colorHex: '#C8CACD',
    tag: null,
    badges: ['FULL-ZIP', 'ADJUSTABLE HOOD'],
    description: 'Easy layering piece for early mornings. Smooth exterior fabric with a light brushed fleece backing and split kangaroo front pouch.',
  },
  {
    name: 'Sport 5" Lined Training Shorts',
    subtitle: 'Built-in Compression Boxer Brief',
    type: 'shorts',
    activities: ['running', 'weight-lifting'],
    price: 44,
    compareAtPrice: null,
    fit: 'regular',
    rise: 'mid-waisted',
    features: ['pockets', 'sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Sport Performance',
    color: 'Cobalt Blue',
    colorHex: '#0047AB',
    tag: 'New',
    badges: ['5" INSEAM', 'INTERNAL LINER'],
    description: 'Ultimate support without separate compression underwear. Soft anti-odor liner stops inner thigh friction while the outer shell flexes during deep squats.',
  },
  {
    name: 'Legacy Oversized Boxy T-Shirt',
    subtitle: 'Heavy Cotton Drop-Shoulder Tee',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 35,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Legacy Archive',
    color: 'Chalk White',
    colorHex: '#F6F6F4',
    tag: null,
    badges: ['BOXY CUT', '100% COTTON'],
    description: 'Relaxed streetwear meets serious powerlifting. Wide cut sleeves land just above the elbow for a bold silhouette.',
  },
  {
    name: 'Arrival Seamless Short Sleeve T-Shirt',
    subtitle: 'Zero-Chafe Lightweight Training Top',
    type: 't-shirts',
    activities: ['running', 'weight-lifting'],
    price: 34,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Arrival Series',
    color: 'Army Green',
    colorHex: '#4B5320',
    tag: null,
    badges: ['SEAMLESS', 'ANTI-CHAFE'],
    description: 'Engineered without side seams to eradicate skin irritation when you’re pushing through high-rep kettlebell or barbell workouts.',
  },
  {
    name: 'Retake Water-Repellent Bomber Jacket',
    subtitle: 'Commuter Windbreaker Jacket',
    type: 'jackets',
    activities: ['athleisure', 'hiking'],
    price: 75,
    compareAtPrice: 90,
    fit: 'relaxed',
    rise: null,
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Retake Collection',
    color: 'Olive Drab',
    colorHex: '#485335',
    tag: 'Sale',
    badges: ['DWR COATING', 'ZIP POCKETS'],
    description: 'Elevated streetwear aesthetics with training practicality. Ribbed bomber collar, heavy matte black double zipper, and water-repellent shell.',
  },
  {
    name: 'Power Ribbed Stringer Vest',
    subtitle: 'High Stretch Y-Back Lifting Tank',
    type: 't-shirts',
    activities: ['weight-lifting'],
    price: 26,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Onyx Black',
    colorHex: '#101010',
    tag: null,
    badges: ['RIBBED COTTON', 'Y-BACK'],
    description: 'Heavy stretch cotton rib knit hugs the chest while the deep cut sides let you flex with complete freedom of movement.',
  },
  {
    name: 'Crest Crew Neck Fleece Sweatshirt',
    subtitle: 'Classic Raglan Sleeve Pullover',
    type: 'hoodies',
    activities: ['athleisure'],
    price: 48,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Crest Collection',
    color: 'Heather Oatmeal',
    colorHex: '#D5CBBB',
    tag: null,
    badges: ['RAGLAN SLEEVE', 'CREST LOGO'],
    description: 'Timeless athletic heritage. Raglan sleeve construction allows full shoulder mobility with zero shoulder seam bulk.',
  },
  {
    name: '315 Heavyweight Lifting Shorts 5"',
    subtitle: 'Raw Hem Barbell Training Shorts',
    type: 'shorts',
    activities: ['weight-lifting'],
    price: 42,
    compareAtPrice: null,
    fit: 'regular',
    rise: 'mid-waisted',
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: '315 Collection',
    color: 'Washed Olive',
    colorHex: '#525B44',
    tag: 'Trending',
    badges: ['5" INSEAM', 'RAW HEM'],
    description: 'Named after three 45-pound plates on each side of the bar. Thick French terry with raw edge hems and extra deep zippered phone pockets.',
  },
  {
    name: 'Apex Running Windbreaker Jacket',
    subtitle: 'Ultralight Packable Trail Jacket',
    type: 'jackets',
    activities: ['running', 'hiking'],
    price: 85,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['reflective', 'sweat-wicking', 'pockets'],
    collection: 'vital',
    collectionName: 'Apex Performance',
    color: 'Midnight Black',
    colorHex: '#18191B',
    tag: 'New',
    badges: ['PACKABLE', '360 REFLECTIVE'],
    description: 'Weighing under 140 grams, this trail and road windbreaker cuts through head winds and packs neatly into its chest zip pocket.',
  },
  {
    name: 'Sport Muscle Fit Long Sleeve Top',
    subtitle: 'Raglan Sleeve Compression Top',
    type: 't-shirts',
    activities: ['running', 'weight-lifting'],
    price: 38,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Sport Performance',
    color: 'Crimson Red',
    colorHex: '#A31D1D',
    tag: null,
    badges: ['COMPRESSION', 'SWEAT WICKING'],
    description: 'Keeps blood flowing and muscles warm. Ergonomic flatlock seam placement contours around the biceps and pecs.',
  },
  {
    name: 'Arrival 2-in-1 Compression Shorts 7"',
    subtitle: 'Integrated Phone Pocket Shorts',
    type: 'shorts',
    activities: ['running', 'weight-lifting'],
    price: 46,
    compareAtPrice: null,
    fit: 'slim',
    rise: 'mid-waisted',
    features: ['pockets', 'sweat-wicking', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Arrival Series',
    color: 'Smoke Grey',
    colorHex: '#4E5359',
    tag: 'Bestseller',
    badges: ['2-IN-1', 'PHONE POCKET'],
    description: 'A 7" lightweight shell with an integrated compression under-layer designed with a secure compression phone sleeve on the right thigh.',
  },
  {
    name: 'Legacy Raw Edge Drop Tank',
    subtitle: 'Vintage Washed Armhole Tank',
    type: 't-shirts',
    activities: ['weight-lifting'],
    price: 28,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Legacy Archive',
    color: 'Desert Sand',
    colorHex: '#C5A987',
    tag: null,
    badges: ['RAW EDGE', 'VINTAGE WASH'],
    description: 'Raw cut armholes and neckline give this heavy cotton tank an authentic hardcore lifter aesthetic.',
  },
  {
    name: 'Critical 2.0 Regular Fit T-Shirt',
    subtitle: 'Everyday Gym & Street T-Shirt',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 28,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Critical 2.0',
    color: 'Atlantic Blue',
    colorHex: '#1F4E79',
    tag: null,
    badges: ['COTTON BLEND', 'EVERYDAY'],
    description: 'The standard issue training shirt. Cut with enough taper to show your shape without squeezing your arms.',
  },
  {
    name: 'Power Cut-Off Sleeveless Hoodie',
    subtitle: 'Heavy Cotton French Terry Cut-Off',
    type: 'hoodies',
    activities: ['weight-lifting'],
    price: 45,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: null,
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Jet Black',
    colorHex: '#161616',
    tag: 'Trending',
    badges: ['RAW SLEEVES', 'KANGAROO POCKET'],
    description: 'Keep your core and head warm while giving your arms full freedom to press and row without fabric bunching.',
  },
  {
    name: 'Crest Regular Fit Shorts 7"',
    subtitle: 'Soft Cotton Fleece Lounge Shorts',
    type: 'shorts',
    activities: ['athleisure'],
    price: 35,
    compareAtPrice: null,
    fit: 'regular',
    rise: 'mid-waisted',
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Crest Collection',
    color: 'Navy Marl',
    colorHex: '#253551',
    tag: null,
    badges: ['COTTON FLEECE', '7" INSEAM'],
    description: 'Relaxed comfort for post-workout protein shakes and weekend errands. Deep pockets hold keys and wallet securely.',
  },
  {
    name: 'Apex Seamless Short Sleeve Top',
    subtitle: 'High Ventilation Running Tee',
    type: 't-shirts',
    activities: ['running', 'hiking'],
    price: 44,
    compareAtPrice: null,
    fit: 'slim',
    rise: null,
    features: ['sweat-wicking', 'reflective', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Apex Performance',
    color: 'Cyber Lime / Charcoal',
    colorHex: '#99CC00',
    tag: 'New',
    badges: ['SEAMLESS', 'MAX BREATHABLE'],
    description: 'Engineered gradient mesh increases porosity over chest and back sweat points for unmatched cooling.',
  },
  {
    name: 'Heavyweight Oversized Acid Wash Tee',
    subtitle: 'Vintage Distressed Boxy T-Shirt',
    type: 't-shirts',
    activities: ['weight-lifting', 'athleisure'],
    price: 40,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Acid Wash',
    color: 'Vintage Steel',
    colorHex: '#4C5158',
    tag: 'Trending',
    badges: ['ACID WASH', '260 GSM COTTON'],
    description: 'Each tee undergoes a specialized acid-wash treatment making every piece unique. Heavy 260gsm jersey cotton.',
  },
  {
    name: 'Bold Seamless Long Sleeve Top',
    subtitle: 'Sculpting Compression Base Layer',
    type: 't-shirts',
    activities: ['weight-lifting', 'running'],
    price: 46,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'geo-seamless',
    collectionName: 'Bold Seamless',
    color: 'Charcoal Grey',
    colorHex: '#3A3A3C',
    tag: null,
    badges: ['COMPRESSION', 'SEAMLESS'],
    description: 'Firm muscular support that reduces muscle oscillation during sprints and heavy deadlifts.',
  },
  {
    name: 'Arrival Lightweight Track Jacket',
    subtitle: 'Full-Zip Mesh Lined Jacket',
    type: 'jackets',
    activities: ['running', 'athleisure'],
    price: 58,
    compareAtPrice: 70,
    fit: 'regular',
    rise: null,
    features: ['sweat-wicking', 'pockets', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Arrival Series',
    color: 'Stealth Black',
    colorHex: '#1A1A1A',
    tag: 'Sale',
    badges: ['MESH LINED', 'ZIP POCKETS'],
    description: 'Crisp woven shell with breathable mesh interior lining. Raglan cut shoulders make warm-ups and throwing punches fluid.',
  },
  {
    name: 'Sport 7" Unlined Training Shorts',
    subtitle: 'Lightweight Four-Way Stretch Shorts',
    type: 'shorts',
    activities: ['running', 'weight-lifting'],
    price: 36,
    compareAtPrice: null,
    fit: 'regular',
    rise: 'mid-waisted',
    features: ['sweat-wicking', 'four-way-stretch', 'pockets'],
    collection: 'vital',
    collectionName: 'Sport Performance',
    color: 'Rust Orange',
    colorHex: '#C04000',
    tag: null,
    badges: ['7" INSEAM', '4-WAY STRETCH'],
    description: 'Unlined construction leaves base-layer selection completely up to you. Breathable micro-stretch fabric.',
  },
  {
    name: 'Legacy Heavyweight Fleece Joggers',
    subtitle: 'Barbell Friendly French Terry Joggers',
    type: 'joggers',
    activities: ['weight-lifting', 'athleisure'],
    price: 56,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: 'mid-waisted',
    features: ['pockets', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Legacy Archive',
    color: 'Dark Forest Green',
    colorHex: '#223824',
    tag: 'New',
    badges: ['HEAVY FLEECE', 'ARCHIVE EMBROIDERY'],
    description: 'Old-school collegiate fit. Thick ribbed waistband with heavy cotton drawcords and elasticated cuffs.',
  },
  {
    name: 'Geo Seamless Compression Tank Top',
    subtitle: 'Breathable Y-Back Gym Tank',
    type: 't-shirts',
    activities: ['weight-lifting'],
    price: 32,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'geo-seamless',
    collectionName: 'Geo Seamless',
    color: 'Ice Blue',
    colorHex: '#7BA4C4',
    tag: null,
    badges: ['SEAMLESS', 'SWEAT REPELLING'],
    description: 'Engineered rib knit locks around the torso without restricting rib cage expansion on max effort lifts.',
  },
  {
    name: 'Power Heavyweight Warm-Up Pullover',
    subtitle: 'Mock Neck Thermal Training Top',
    type: 'hoodies',
    activities: ['weight-lifting'],
    price: 60,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Power',
    color: 'Washed Earth Brown',
    colorHex: '#4A3B32',
    tag: null,
    badges: ['MOCK NECK', 'THERMAL WARMTH'],
    description: 'High mock collar keeps heat trapped around the neck and traps during frigid garage gym winters.',
  },
  {
    name: 'Sport Breathable Performance T-Shirt',
    subtitle: 'Ultralight Running & HIIT Tee',
    type: 't-shirts',
    activities: ['running', 'hiking'],
    price: 32,
    compareAtPrice: null,
    fit: 'regular',
    rise: null,
    features: ['sweat-wicking', 'reflective', 'four-way-stretch'],
    collection: 'vital',
    collectionName: 'Sport Performance',
    color: 'Optic White',
    colorHex: '#FFFFFF',
    tag: null,
    badges: ['REFLECTIVE', 'FAST DRYING'],
    description: 'Stay seen and dry. Laser cut underarm vents and micro-flatlock seams that never irritate.',
  },
  {
    name: 'Essential Relaxed Fit Cargo Joggers',
    subtitle: 'Multi-Pocket Technical Pants',
    type: 'joggers',
    activities: ['athleisure', 'hiking'],
    price: 62,
    compareAtPrice: null,
    fit: 'relaxed',
    rise: 'mid-waisted',
    features: ['pockets', 'four-way-stretch'],
    collection: 'everyday-seamless',
    collectionName: 'Everyday Essentials',
    color: 'Stealth Black',
    colorHex: '#1A1A1A',
    tag: 'Trending',
    badges: ['CARGO POCKETS', 'STRETCH TWILL'],
    description: 'Dual low-profile cargo flap pockets and articulated knee darts give you rugged utility for hiking trails and city days.',
  },
  {
    name: 'Critical Short Sleeve Compression Baselayer',
    subtitle: 'Second-Skin Muscle Lock Top',
    type: 't-shirts',
    activities: ['weight-lifting', 'running'],
    price: 30,
    compareAtPrice: null,
    fit: 'compression',
    rise: null,
    features: ['sweat-wicking', 'four-way-stretch'],
    collection: 'power',
    collectionName: 'Critical 2.0',
    color: 'Dark Navy',
    colorHex: '#14213D',
    tag: null,
    badges: ['COMPRESSION', 'FLATLOCK SEAMS'],
    description: 'Tight compression hold promotes venous return and reduces post-workout muscle soreness.',
  },
  {
    name: 'Heritage 10X Sports Barbell Club Tee',
    subtitle: 'Archival Heavy Weightlifting Graphic',
    type: 't-shirts',
    activities: ['weight-lifting'],
    price: 36,
    compareAtPrice: null,
    fit: 'oversized',
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Barbell Club',
    color: 'Washed Maroon',
    colorHex: '#661D2B',
    tag: 'New',
    badges: ['BARBELL CLUB', 'ORGANIC COTTON'],
    description: 'Commemorating our history of iron. Heavy mineral-washed 240gsm cotton with collegiate 10X Sports Barbell Club graphics.',
  },
]

// 20 ACCESSORIES
const rawAccessories = [
  {
    name: 'Heavy Duty Padded Lifting Straps (Pair)',
    subtitle: 'Neoprene Padded Barbell Straps',
    type: 'accessories',
    activities: ['weight-lifting'],
    price: 18,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'power',
    collectionName: 'Lifting Accessories',
    color: 'Stealth Black',
    colorHex: '#111111',
    tag: 'Bestseller',
    badges: ['NEOPRENE PADDED', 'HEAVY DUTY'],
    description: 'Take your grip out of the equation. Heavy-duty woven cotton webbing with 5mm thick neoprene wrist cushioning stops straps from cutting into your wrists on 500lb deadlifts.',
  },
  {
    name: 'Everyday Crew Training Socks (3-Pack)',
    subtitle: 'Cushioned Arch Support Crew Socks',
    type: 'accessories',
    activities: ['weight-lifting', 'running', 'athleisure'],
    price: 16,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Everyday Essentials',
    color: 'White / Black / Grey',
    colorHex: '#FFFFFF',
    tag: 'Bestseller',
    badges: ['3-PACK', 'CUSHIONED SOLE'],
    description: 'Thick terry cushioning along the heel and forefoot protects against high impacts. Ribbed calf hold prevents socks from sliding down your leg.',
  },
  {
    name: 'Stainless Steel Insulated Shaker Bottle 750ml',
    subtitle: 'Double-Wall Vacuum Sealed Shaker',
    type: 'accessories',
    activities: ['weight-lifting', 'athleisure'],
    price: 28,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'power',
    collectionName: 'Gym Essentials',
    color: 'Matte Stealth Black',
    colorHex: '#1B1B1B',
    tag: 'Trending',
    badges: ['ODOR RESISTANT', '24HR COLD'],
    description: 'Say goodbye to smelly plastic shakers. Surgical grade 18/8 stainless steel keeps protein shakes ice cold for 24 hours with a leak-proof twist lock cap and silent mixing grid.',
  },
  {
    name: 'Everyday Gym Duffle Bag 35L',
    subtitle: 'Dedicated Shoe Tunnel & Wet Pocket',
    type: 'accessories',
    activities: ['weight-lifting', 'athleisure'],
    price: 45,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['pockets'],
    collection: 'everyday-seamless',
    collectionName: 'Bags & Packs',
    color: 'Jet Black',
    colorHex: '#151515',
    tag: 'Bestseller',
    badges: ['35L CAPACITY', 'SHOE COMPARTMENT'],
    description: 'Engineered for gym commuters. Heavy duty water-resistant base, ventilated side shoe compartment that fits up to size 13 lifting shoes, and padded shoulder strap.',
  },
  {
    name: 'Resistance Loop Band Set (3-Pack)',
    subtitle: 'Light, Medium & Heavy Latex Bands',
    type: 'accessories',
    activities: ['pilates', 'yoga', 'weight-lifting'],
    price: 20,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'everyday-seamless',
    collectionName: 'Mobility & Recovery',
    color: 'Tonal Pink & Grey',
    colorHex: '#D6A2B8',
    tag: null,
    badges: ['3 RESISTANCE LEVELS', 'CARRY POUCH'],
    description: 'Perfect for glute warmups, rotator cuff prehab, and mobility work. Includes breathable mesh carrying travel pouch.',
  },
  {
    name: '10mm Leather Weightlifting Belt',
    subtitle: 'Steel Quick-Release Lever Buckle',
    type: 'accessories',
    activities: ['weight-lifting'],
    price: 85,
    compareAtPrice: 100,
    fit: null,
    rise: null,
    features: [],
    collection: 'power',
    collectionName: 'Powerlifting Core',
    color: 'Matte Black Leather',
    colorHex: '#1A1A1A',
    tag: 'Sale',
    badges: ['IPF LEGAL SPEC', 'STEEL LEVER'],
    description: 'Uncompromising intra-abdominal bracing support. 10mm genuine top-grain cowhide leather with a chrome-plated cast-steel quick release lever.',
  },
  {
    name: 'Legacy Curved Brim Trucker Cap',
    subtitle: 'Breathable Mesh Back Snapback',
    type: 'accessories',
    activities: ['weight-lifting', 'athleisure'],
    price: 22,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['sweat-wicking'],
    collection: 'power',
    collectionName: 'Headwear',
    color: 'Vintage Black',
    colorHex: '#222222',
    tag: null,
    badges: ['SNAPBACK', 'BREATHABLE MESH'],
    description: 'Classic trucker profile with structured front cotton panel, moisture-absorbing internal sweatband, and adjustable snapback closure.',
  },
  {
    name: 'Ribbed Knit Slouch Beanie',
    subtitle: 'Warm Acrylic Ribbed Winter Beanie',
    type: 'accessories',
    activities: ['athleisure', 'hiking'],
    price: 18,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'everyday-seamless',
    collectionName: 'Headwear',
    color: 'Heather Grey',
    colorHex: '#8E8E93',
    tag: null,
    badges: ['RIBBED KNIT', 'TONAL LOGO'],
    description: 'Cozy warmth for chilly outdoor workouts and rest days. Subtle silicone 10X Sports logo badge folded on the brim.',
  },
  {
    name: '10X Sports Liquid Chalk 250ml',
    subtitle: 'Fast-Drying Dust-Free Grip Formula',
    type: 'accessories',
    activities: ['weight-lifting', 'hiking'],
    price: 14,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'power',
    collectionName: 'Lifting Accessories',
    color: 'Chalk White',
    colorHex: '#FFFFFF',
    tag: 'Bestseller',
    badges: ['MESS FREE', 'FAST DRYING'],
    description: 'Maximum barbell friction without the powdery mess. Pure magnesium carbonate liquid base dries within 15 seconds to form an impenetrable sweat barrier.',
  },
  {
    name: '7mm Neoprene Knee Sleeves (Pair)',
    subtitle: 'Ergonomic Compression Powerlifting Sleeves',
    type: 'accessories',
    activities: ['weight-lifting'],
    price: 60,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['four-way-stretch'],
    collection: 'power',
    collectionName: 'Powerlifting Core',
    color: 'Stealth Black / White',
    colorHex: '#181818',
    tag: 'Trending',
    badges: ['7MM THICKNESS', 'ERGONOMIC STITCH'],
    description: 'High joint compression and rebound warmth for heavy squats and clean-and-jerks. Reinforced quad-stitch seams resist blowout.',
  },
  {
    name: 'Heavy Duty Elastic Wrist Wraps (Pair)',
    subtitle: 'Thumb Loop Barbell Pressing Wraps',
    type: 'accessories',
    activities: ['weight-lifting'],
    price: 20,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'power',
    collectionName: 'Lifting Accessories',
    color: 'Black / Red Line',
    colorHex: '#1F1F1F',
    tag: null,
    badges: ['18" LENGTH', 'HOOK & LOOP'],
    description: 'Cast-iron wrist rigidity for overhead presses and heavy bench work. Heavy duty rubberized elastane with wide industrial Velcro fastener.',
  },
  {
    name: 'Microfiber Gym Sweat Towel',
    subtitle: 'Compact Ultra-Absorbent Quick-Dry Towel',
    type: 'accessories',
    activities: ['weight-lifting', 'running', 'pilates'],
    price: 15,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Gym Essentials',
    color: 'Charcoal Grey',
    colorHex: '#3A3A3C',
    tag: null,
    badges: ['ANTI-BACTERIAL', 'QUICK DRY'],
    description: 'Absorbs 4x its weight in moisture and dries 3x faster than traditional cotton towels. Features a corner zip key pocket and hanging loop.',
  },
  {
    name: 'Heavyweight Canvas Shopper Tote 25L',
    subtitle: 'Reinforced Shoulder Straps Gym Tote',
    type: 'accessories',
    activities: ['athleisure'],
    price: 25,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['pockets'],
    collection: 'everyday-seamless',
    collectionName: 'Bags & Packs',
    color: 'Raw Cotton Ecru',
    colorHex: '#E8E4DA',
    tag: 'New',
    badges: ['100% ORGANIC COTTON', 'INTERNAL ZIP POCKET'],
    description: 'Built to haul lifting shoes, change of clothes, and groceries. Heavyweight 16oz cotton canvas with reinforced box-stitched handles.',
  },
  {
    name: 'Insulated Half-Gallon Water Jug 1.9L',
    subtitle: 'Triple-Layer Vacuum Hydration Jug',
    type: 'accessories',
    activities: ['weight-lifting', 'hiking'],
    price: 38,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'power',
    collectionName: 'Hydration',
    color: 'Desert Sand',
    colorHex: '#C2B280',
    tag: 'Bestseller',
    badges: ['1.9L (64 OZ)', 'CARRY HANDLE'],
    description: 'Never run out of water during marathon 2-hour lifting sessions. Built-in sturdy silicone carry handle and wide spout for easy ice loading.',
  },
  {
    name: 'Seamless Non-Slip Hair Headbands (3-Pack)',
    subtitle: 'Silicone Grip Line Sport Headbands',
    type: 'accessories',
    activities: ['running', 'pilates', 'yoga'],
    price: 12,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Headwear',
    color: 'Multi Neutral Pack',
    colorHex: '#8C8C8C',
    tag: null,
    badges: ['SILICONE GRIP', 'SWEAT-WICKING'],
    description: 'Internal silicone wavy track keeps unruly flyaway hairs out of your eyes during intense cardio and inverted yoga poses.',
  },
  {
    name: 'Heavy Fabric Glute Resistance Band',
    subtitle: 'Anti-Slip Woven Hip Band',
    type: 'accessories',
    activities: ['weight-lifting', 'pilates'],
    price: 18,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'vital',
    collectionName: 'Mobility & Recovery',
    color: 'Blush Marl',
    colorHex: '#C89D9C',
    tag: 'Bestseller',
    badges: ['NO ROLLING', 'HEAVY FABRIC'],
    description: 'Will never pinch skin or roll up like cheap rubber bands. Woven with rubberized grip threading for intense hip thrust and squat warmups.',
  },
  {
    name: 'Laser-Cut Ultralight Performance Running Cap',
    subtitle: 'Bungee Adjustable Breathable Cap',
    type: 'accessories',
    activities: ['running', 'hiking'],
    price: 24,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['reflective', 'sweat-wicking'],
    collection: 'vital',
    collectionName: 'Apex Performance',
    color: 'Optic White / Silver',
    colorHex: '#F0F0F0',
    tag: 'New',
    badges: ['FEATHERWEIGHT', 'LASER PERFORATED'],
    description: 'Constructed from featherweight water-repellent ripstop with laser cut cooling holes on both side panels and an adjustable bungee cord at back.',
  },
  {
    name: 'Micro Duffle Crossbody Bag 5L',
    subtitle: 'Compact Water-Resistant Crossbody',
    type: 'accessories',
    activities: ['athleisure', 'hiking'],
    price: 32,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['pockets'],
    collection: 'everyday-seamless',
    collectionName: 'Bags & Packs',
    color: 'Olive Green',
    colorHex: '#4E5A44',
    tag: 'Trending',
    badges: ['COMPACT 5L', 'CROSSBODY STRAP'],
    description: 'Miniature duffle form factor designed to carry your phone, keys, lifting straps, and wallet with a detachable adjustable jacquard shoulder strap.',
  },
  {
    name: 'Cushioned Ankle Sport Socks (5-Pack)',
    subtitle: 'Low-Cut Anti-Blister Tab Socks',
    type: 'accessories',
    activities: ['running', 'weight-lifting', 'athleisure'],
    price: 18,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: ['sweat-wicking'],
    collection: 'everyday-seamless',
    collectionName: 'Everyday Essentials',
    color: 'Triple White',
    colorHex: '#FFFFFF',
    tag: 'Bestseller',
    badges: ['5-PACK', 'ACHILLES TAB'],
    description: 'Engineered with an elevated achilles heel tab to shield against running shoe friction and prevent blistering.',
  },
  {
    name: 'No-Pull Elastic Hair Ties (6-Pack)',
    subtitle: 'Crease-Free High Hold Scrunchies',
    type: 'accessories',
    activities: ['running', 'weight-lifting', 'yoga'],
    price: 10,
    compareAtPrice: null,
    fit: null,
    rise: null,
    features: [],
    collection: 'everyday-seamless',
    collectionName: 'Gym Essentials',
    color: 'Neutral Earth Tones',
    colorHex: '#7C6853',
    tag: null,
    badges: ['6-PACK', 'CREASE FREE'],
    description: 'Super soft seamless microfiber ties hold thick ponytails through intense sprints without pulling or leaving annoying ponytail dents.',
  },
]

// Assemble full 100 products
function slugify(name, color) {
  return `${name} ${color}`
    .toLowerCase()
    .replace(/[™®()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const allProducts = []

// Process Women (40)
rawWomenProducts.forEach((item, idx) => {
  const id = slugify(item.name, item.color)
  const image = getProductImage(idx)
  const sizes = item.type === 'accessories' ? accessorySizes : standardSizes
  const rating = Number((4.5 + ((idx * 7) % 5) * 0.1).toFixed(1))
  const reviewCount = 45 + ((idx * 19) % 200)

  allProducts.push({
    id,
    slug: id,
    name: item.name,
    subtitle: item.subtitle,
    category: 'women',
    gender: 'f',
    type: item.type,
    activities: item.activities,
    price: item.price,
    compareAtPrice: item.compareAtPrice,
    fit: item.fit,
    fitNote: item.fit ? `Model is 5'8" (173cm) wearing size S in ${item.fit} fit.` : null,
    rise: item.rise,
    features: item.features,
    collection: item.collection,
    collectionName: item.collectionName,
    rating,
    reviewCount,
    ratingBreakdown: { 5: Math.floor(reviewCount * 0.78), 4: Math.floor(reviewCount * 0.16), 3: Math.floor(reviewCount * 0.04), 2: 1, 1: 1 },
    fitFeedback: {
      runsSmall: 8,
      trueToSize: 84,
      runsLarge: 8,
      softnessRating: 95,
      supportRating: item.subtitle,
    },
    color: item.color,
    colorHex: item.colorHex,
    colorways: [
      { name: item.color, hex: item.colorHex, slug: id, image, isCurrent: true },
      { name: 'Black', hex: '#1C1C1E', slug: `${id}-black`, image, isCurrent: false },
      { name: 'Stone Grey', hex: '#8E8E93', slug: `${id}-grey`, image, isCurrent: false },
    ],
    gallery: [
      { type: 'image', url: image, fallback: image, alt: `${item.name} front view` },
      { type: 'image', url: image, fallback: image, alt: `${item.name} side profile view` },
      { type: 'image', url: image, fallback: image, alt: `${item.name} back fabric detail` },
    ],
    image,
    tag: item.tag,
    badges: item.badges,
    variants: generateVariants(id, sizes, item.color, item.price),
    description: item.description,
    highlights: [
      'Engineered for premium comfort and high durability',
      'Sweat-wicking technical fabric maintains cool core temperature',
      'Tested by elite 10X Sports athletes and powerlifters',
    ],
    materials: '82% Nylon, 18% Elastane / Lycra Adaptiv',
    careInstructions: ['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low'],
    completeTheLookIds: [],
    reviews: [
      {
        id: `rev-${id}-1`,
        author: 'Chloe M.',
        verified: true,
        rating: 5,
        date: '2026-10-18',
        title: 'Absolutely incredible quality and fit',
        content: `I've bought dozens of gym items over the years, and this ${item.name} is by far one of my favorite purchases. Holds its shape wash after wash!`,
        activity: item.activities[0] || 'Gym & Training',
        helpfulCount: 16,
      },
      {
        id: `rev-${id}-2`,
        author: 'Jessica L.',
        verified: true,
        rating: 5,
        date: '2026-09-24',
        title: 'Squat proof and buttery soft',
        content: 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.',
        activity: 'Pilates',
        helpfulCount: 9,
      },
    ],
  })
})

// Process Men (40)
rawMenProducts.forEach((item, idx) => {
  const id = slugify(item.name, item.color)
  const image = getProductImage((idx + 40) % mediaImages.length)
  const sizes = item.type === 'accessories' ? accessorySizes : standardSizes
  const rating = Number((4.6 + ((idx * 3) % 4) * 0.1).toFixed(1))
  const reviewCount = 38 + ((idx * 23) % 180)

  allProducts.push({
    id,
    slug: id,
    name: item.name,
    subtitle: item.subtitle,
    category: 'men',
    gender: 'm',
    type: item.type,
    activities: item.activities,
    price: item.price,
    compareAtPrice: item.compareAtPrice,
    fit: item.fit,
    fitNote: item.fit ? `Model is 6'1" (185cm) wearing size L in ${item.fit} fit.` : null,
    rise: item.rise,
    features: item.features,
    collection: item.collection,
    collectionName: item.collectionName,
    rating,
    reviewCount,
    ratingBreakdown: { 5: Math.floor(reviewCount * 0.82), 4: Math.floor(reviewCount * 0.14), 3: Math.floor(reviewCount * 0.03), 2: 1, 1: 0 },
    fitFeedback: {
      runsSmall: 5,
      trueToSize: 89,
      runsLarge: 6,
      softnessRating: 92,
      supportRating: item.subtitle,
    },
    color: item.color,
    colorHex: item.colorHex,
    colorways: [
      { name: item.color, hex: item.colorHex, slug: id, image, isCurrent: true },
      { name: 'Pitch Black', hex: '#111111', slug: `${id}-black`, image, isCurrent: false },
      { name: 'Charcoal Grey', hex: '#404040', slug: `${id}-charcoal`, image, isCurrent: false },
    ],
    gallery: [
      { type: 'image', url: image, fallback: image, alt: `${item.name} studio front view` },
      { type: 'image', url: image, fallback: image, alt: `${item.name} muscle taper profile` },
      { type: 'image', url: image, fallback: image, alt: `${item.name} movement rear view` },
    ],
    image,
    tag: item.tag,
    badges: item.badges,
    variants: generateVariants(id, sizes, item.color, item.price),
    description: item.description,
    highlights: [
      'Heavy-duty construction built for compound barbell training',
      'Reinforced seams engineered to resist wear and tear',
      'Athlete-tested tapered fit highlights physique',
    ],
    materials: '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)',
    careInstructions: ['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat'],
    completeTheLookIds: [],
    reviews: [
      {
        id: `rev-${id}-1`,
        author: 'Marcus B.',
        verified: true,
        rating: 5,
        date: '2026-10-14',
        title: 'Best lifting gear on the market',
        content: `The taper on this ${item.name} is spot on. Doesn't hug the stomach but shows off chest and shoulders perfectly.`,
        activity: 'Weight Lifting',
        helpfulCount: 22,
      },
      {
        id: `rev-${id}-2`,
        author: 'Dave R.',
        verified: true,
        rating: 4,
        date: '2026-09-08',
        title: 'Super comfortable pump cover',
        content: 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.',
        activity: 'Powerlifting',
        helpfulCount: 14,
      },
    ],
  })
})

// Process Accessories (20)
rawAccessories.forEach((item, idx) => {
  const id = slugify(item.name, item.color)
  const image = getProductImage((idx + 80) % mediaImages.length)
  const sizes = item.name.includes('Belt') || item.name.includes('Knee Sleeves') ? beltSizes : accessorySizes
  const rating = Number((4.7 + ((idx * 2) % 3) * 0.1).toFixed(1))
  const reviewCount = 65 + ((idx * 31) % 250)

  allProducts.push({
    id,
    slug: id,
    name: item.name,
    subtitle: item.subtitle,
    category: 'accessories',
    gender: 'u',
    type: item.type,
    activities: item.activities,
    price: item.price,
    compareAtPrice: item.compareAtPrice,
    fit: null,
    fitNote: 'One size fits most athletes or select from standard sizing chart.',
    rise: null,
    features: item.features,
    collection: item.collection,
    collectionName: item.collectionName,
    rating,
    reviewCount,
    ratingBreakdown: { 5: Math.floor(reviewCount * 0.85), 4: Math.floor(reviewCount * 0.12), 3: Math.floor(reviewCount * 0.02), 2: 1, 1: 0 },
    fitFeedback: {
      runsSmall: 3,
      trueToSize: 94,
      runsLarge: 3,
      softnessRating: 88,
      supportRating: 'Universal Fit',
    },
    color: item.color,
    colorHex: item.colorHex,
    colorways: [
      { name: item.color, hex: item.colorHex, slug: id, image, isCurrent: true },
      { name: 'Stealth Black', hex: '#111111', slug: `${id}-stealth`, image, isCurrent: false },
    ],
    gallery: [
      { type: 'image', url: image, fallback: image, alt: `${item.name} hero product shot` },
      { type: 'image', url: image, fallback: image, alt: `${item.name} detail craftsmanship` },
    ],
    image,
    tag: item.tag,
    badges: item.badges,
    variants: generateVariants(id, sizes, item.color, item.price),
    description: item.description,
    highlights: [
      'Commercial grade materials built for heavy daily gym punishment',
      'Designed in collaboration with world-record powerlifters',
      'Compact, ergonomic, and gym bag friendly',
    ],
    materials: 'Heavy duty woven nylon / surgical grade stainless steel / neoprene',
    careInstructions: ['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water'],
    completeTheLookIds: [],
    reviews: [
      {
        id: `rev-${id}-1`,
        author: 'Liam T.',
        verified: true,
        rating: 5,
        date: '2026-10-05',
        title: 'Essential gym bag item',
        content: `Honestly wouldn't train without this ${item.name} anymore. The durability is far superior to cheap amazon clones.`,
        activity: 'Weight Lifting',
        helpfulCount: 31,
      },
    ],
  })
})

console.log(`Generated ${allProducts.length} total products:`)
console.log(`- Women: ${allProducts.filter(p => p.category === 'women').length}`)
console.log(`- Men: ${allProducts.filter(p => p.category === 'men').length}`)
console.log(`- Accessories: ${allProducts.filter(p => p.category === 'accessories').length}`)

// 1. Output supabase/data/products.json
const jsonPath = path.resolve(__dirname, '../supabase/data/products.json')
fs.writeFileSync(jsonPath, JSON.stringify(allProducts, null, 2), 'utf-8')
console.log(`Written ${jsonPath}`)

// 2. Generate supabase/seed.sql
// Helper functions for safe SQL generation
function sqlText(val) {
  if (val === null || val === undefined) return 'NULL'
  return `'${String(val).replace(/'/g, "''")}'`
}

function sqlNum(val) {
  if (val === null || val === undefined || isNaN(val)) return 'NULL'
  return Number(val)
}

function sqlBool(val) {
  return val ? 'TRUE' : 'FALSE'
}

function sqlTextArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return "'{}'::text[]"
  return `ARRAY[${arr.map(v => `'${String(v).replace(/'/g, "''")}'`).join(', ')}]::text[]`
}

function sqlJson(val) {
  if (val === null || val === undefined) return "'{}'::jsonb"
  return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`
}

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

let seedSql = `-- ============================================================
-- 10X SPORTS - SUPABASE SEED DATA (PRODUCTION READY)
-- 100 Products (40 Women, 40 Men, 20 Accessories)
-- Includes Variants, Reviews, and Sample Discount Codes
-- ============================================================

-- 1. CLEANUP (Safe delete of dependent rows to prevent constraint collisions from prior runs)
DELETE FROM public.reviews;
DELETE FROM public.comments;
DELETE FROM public.product_variants;

-- 2. DISCOUNT CODES
INSERT INTO public.discount_codes (code, description, amount_off, is_active, expires_at) VALUES
('WELCOME10', 'Welcome 10% discount for first order', 0.10, true, NULL),
('10XSPORTS15', 'Athlete exclusive 15% discount', 0.15, true, NULL),
('SUMMER20', 'Seasonal 20% off summer collection', 0.20, true, NULL)
ON CONFLICT (code) DO NOTHING;

-- 2. PRODUCTS
`

const productBatches = chunkArray(allProducts, 20)
productBatches.forEach(batch => {
  seedSql += `INSERT INTO public.products (
  id, slug, name, subtitle, category, gender, type, activities,
  fit, fit_note, rise, features, collection, collection_name,
  price, compare_at_price, image, tag, badges, color, color_hex,
  colorways, gallery, description, highlights, materials, care_instructions,
  fit_feedback, rating, review_count, rating_breakdown, complete_the_look_ids
) VALUES\n`
  seedSql += batch.map(p => `(
  ${sqlText(p.id)}, ${sqlText(p.slug)}, ${sqlText(p.name)}, ${sqlText(p.subtitle)},
  ${sqlText(p.category)}, ${sqlText(p.gender)}, ${sqlText(p.type)}, ${sqlTextArray(p.activities)},
  ${sqlText(p.fit)}, ${sqlText(p.fitNote)}, ${sqlText(p.rise)}, ${sqlTextArray(p.features)},
  ${sqlText(p.collection)}, ${sqlText(p.collectionName)}, ${sqlNum(p.price)}, ${sqlNum(p.compareAtPrice)},
  ${sqlText(p.image)}, ${sqlText(p.tag)}, ${sqlTextArray(p.badges)}, ${sqlText(p.color)}, ${sqlText(p.colorHex)},
  ${sqlJson(p.colorways)}, ${sqlJson(p.gallery)}, ${sqlText(p.description)}, ${sqlTextArray(p.highlights)},
  ${sqlText(p.materials)}, ${sqlTextArray(p.careInstructions)}, ${sqlJson(p.fitFeedback)},
  ${sqlNum(p.rating)}, ${sqlNum(p.reviewCount)}, ${sqlJson(p.ratingBreakdown)}, ${sqlTextArray(p.completeTheLookIds)}
)`).join(',\n')
  seedSql += `\nON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;\n\n`
})

seedSql += `-- 3. PRODUCT VARIANTS\n`

const allVariants = allProducts.flatMap(p => p.variants.map(v => ({ ...v, productId: p.id })))
const variantBatches = chunkArray(allVariants, 50)
variantBatches.forEach(batch => {
  seedSql += `INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES\n`
  seedSql += batch.map(v => `(
  ${sqlText(v.id)}, ${sqlText(v.productId)}, ${sqlText(v.size)}, ${sqlText(v.color)}, ${sqlText(v.sku)}, ${sqlNum(v.stock)}, NULL
)`).join(',\n')
  seedSql += `\nON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;\n\n`
})

seedSql += `-- 4. REVIEWS\n`

const allReviews = allProducts.flatMap(p => p.reviews.map(r => ({ ...r, productId: p.id })))
const reviewBatches = chunkArray(allReviews, 50)
reviewBatches.forEach(batch => {
  seedSql += `INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES\n`
  seedSql += batch.map(r => `(
  ${sqlText(r.productId)}, ${sqlText(r.author)}, ${sqlBool(r.verified)}, ${sqlNum(r.rating)},
  ${sqlText(r.title)}, ${sqlText(r.content)}, ${sqlText(r.activity)}, ${sqlNum(r.helpfulCount)}, 'approved', NOW() - INTERVAL '${Math.floor(Math.random() * 30)} days'
)`).join(',\n')
  seedSql += `;\n\n`
})

seedSql += `-- 5. REFRESH PRODUCT RATING STATS
UPDATE public.products p
SET 
  rating = COALESCE(sub.avg_r, 5.0),
  review_count = COALESCE(sub.cnt, 0)
FROM (
  SELECT product_id, ROUND(AVG(rating)::numeric, 1) as avg_r, COUNT(*) as cnt
  FROM public.reviews
  WHERE status = 'approved'
  GROUP BY product_id
) sub
WHERE p.id = sub.product_id;\n`

const seedPath = path.resolve(__dirname, '../supabase/seed.sql')
fs.writeFileSync(seedPath, seedSql, 'utf-8')
console.log(`Written ${seedPath}`)

// Also write modular seed files for users who prefer smaller queries
const seedProductsSql = `-- ============================================================
-- 10X SPORTS - SEED PART 1: PRODUCTS & VARIANTS
-- ============================================================

-- Safe cleanup of variants from prior runs
DELETE FROM public.product_variants;

-- 1. DISCOUNT CODES
INSERT INTO public.discount_codes (code, description, amount_off, is_active, expires_at) VALUES
('WELCOME10', 'Welcome 10% discount for first order', 0.10, true, NULL),
('10XSPORTS15', 'Athlete exclusive 15% discount', 0.15, true, NULL),
('SUMMER20', 'Seasonal 20% off summer collection', 0.20, true, NULL)
ON CONFLICT (code) DO NOTHING;

-- 2. PRODUCTS
` + productBatches.map(batch => `INSERT INTO public.products (
  id, slug, name, subtitle, category, gender, type, activities,
  fit, fit_note, rise, features, collection, collection_name,
  price, compare_at_price, image, tag, badges, color, color_hex,
  colorways, gallery, description, highlights, materials, care_instructions,
  fit_feedback, rating, review_count, rating_breakdown, complete_the_look_ids
) VALUES\n` + batch.map(p => `(
  ${sqlText(p.id)}, ${sqlText(p.slug)}, ${sqlText(p.name)}, ${sqlText(p.subtitle)},
  ${sqlText(p.category)}, ${sqlText(p.gender)}, ${sqlText(p.type)}, ${sqlTextArray(p.activities)},
  ${sqlText(p.fit)}, ${sqlText(p.fitNote)}, ${sqlText(p.rise)}, ${sqlTextArray(p.features)},
  ${sqlText(p.collection)}, ${sqlText(p.collectionName)}, ${sqlNum(p.price)}, ${sqlNum(p.compareAtPrice)},
  ${sqlText(p.image)}, ${sqlText(p.tag)}, ${sqlTextArray(p.badges)}, ${sqlText(p.color)}, ${sqlText(p.colorHex)},
  ${sqlJson(p.colorways)}, ${sqlJson(p.gallery)}, ${sqlText(p.description)}, ${sqlTextArray(p.highlights)},
  ${sqlText(p.materials)}, ${sqlTextArray(p.careInstructions)}, ${sqlJson(p.fitFeedback)},
  ${sqlNum(p.rating)}, ${sqlNum(p.reviewCount)}, ${sqlJson(p.ratingBreakdown)}, ${sqlTextArray(p.completeTheLookIds)}
)`).join(',\n') + `\nON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;\n`).join('\n') + `\n-- 3. PRODUCT VARIANTS\n` + variantBatches.map(batch => `INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES\n` + batch.map(v => `(
  ${sqlText(v.id)}, ${sqlText(v.productId)}, ${sqlText(v.size)}, ${sqlText(v.color)}, ${sqlText(v.sku)}, ${sqlNum(v.stock)}, NULL
)`).join(',\n') + `\nON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;\n`).join('\n')

const seedReviewsSql = `-- ============================================================
-- 10X SPORTS - SEED PART 2: REVIEWS & STATS
-- ============================================================

-- REVIEWS\n` + reviewBatches.map(batch => `INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES\n` + batch.map(r => `(
  ${sqlText(r.productId)}, ${sqlText(r.author)}, ${sqlBool(r.verified)}, ${sqlNum(r.rating)},
  ${sqlText(r.title)}, ${sqlText(r.content)}, ${sqlText(r.activity)}, ${sqlNum(r.helpfulCount)}, 'approved', NOW() - INTERVAL '${Math.floor(Math.random() * 30)} days'
)`).join(',\n') + `;\n`).join('\n') + `\n-- REFRESH PRODUCT RATING STATS
UPDATE public.products p
SET 
  rating = COALESCE(sub.avg_r, 5.0),
  review_count = COALESCE(sub.cnt, 0)
FROM (
  SELECT product_id, ROUND(AVG(rating)::numeric, 1) as avg_r, COUNT(*) as cnt
  FROM public.reviews
  WHERE status = 'approved'
  GROUP BY product_id
) sub
WHERE p.id = sub.product_id;\n`

fs.writeFileSync(path.resolve(__dirname, '../supabase/01_seed_products.sql'), seedProductsSql, 'utf-8')
fs.writeFileSync(path.resolve(__dirname, '../supabase/02_seed_reviews.sql'), seedReviewsSql, 'utf-8')
console.log('Written modular seed files 01_seed_products.sql and 02_seed_reviews.sql')

// 3. Generate supabase/schema.sql
const schemaSql = `-- ============================================================
-- 10X SPORTS - PRODUCTION POSTGRESQL SCHEMA FOR SUPABASE
-- Fully relational with Row Level Security (RLS) & Triggers
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fast fuzzy text search

-- ------------------------------------------------------------
-- 1. PROFILES (Extends Supabase auth.users)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  date_of_birth DATE,
  avatar_url TEXT,
  phone TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger to automatically create profile row when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, date_of_birth)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'firstName', ''),
    COALESCE(NEW.raw_user_meta_data->>'lastName', ''),
    CASE 
      WHEN NEW.raw_user_meta_data->>'dateOfBirth' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'dateOfBirth')::DATE 
      ELSE NULL 
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    date_of_birth = EXCLUDED.date_of_birth,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ------------------------------------------------------------
-- 2. PRODUCTS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL CHECK (category IN ('women', 'men', 'accessories')),
  gender TEXT NOT NULL CHECK (gender IN ('f', 'm', 'u')),
  type TEXT NOT NULL,
  activities TEXT[] NOT NULL DEFAULT '{}',
  fit TEXT,
  fit_note TEXT,
  rise TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  collection TEXT,
  collection_name TEXT,
  price NUMERIC(10, 2) NOT NULL,
  compare_at_price NUMERIC(10, 2),
  image TEXT NOT NULL,
  tag TEXT,
  badges TEXT[] NOT NULL DEFAULT '{}',
  color TEXT,
  color_hex TEXT,
  colorways JSONB NOT NULL DEFAULT '[]'::jsonb,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT NOT NULL DEFAULT '',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  materials TEXT,
  care_instructions TEXT[] NOT NULL DEFAULT '{}',
  fit_feedback JSONB NOT NULL DEFAULT '{}'::jsonb,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
  review_count INTEGER NOT NULL DEFAULT 0,
  rating_breakdown JSONB NOT NULL DEFAULT '{"1":0,"2":0,"3":0,"4":0,"5":0}'::jsonb,
  complete_the_look_ids TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_gender ON public.products(gender);
CREATE INDEX IF NOT EXISTS idx_products_type ON public.products(type);
CREATE INDEX IF NOT EXISTS idx_products_collection ON public.products(collection);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON public.products USING gin (name gin_trgm_ops);

-- ------------------------------------------------------------
-- 3. PRODUCT VARIANTS (SKUs, Sizes, Colors & Inventory)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  price_override NUMERIC(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variants_size ON public.product_variants(size);
CREATE INDEX IF NOT EXISTS idx_variants_color ON public.product_variants(color);

-- ------------------------------------------------------------
-- 4. REVIEWS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  content TEXT NOT NULL,
  size_purchased TEXT,
  usual_size TEXT,
  activity TEXT,
  height TEXT,
  weight TEXT,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);

-- ------------------------------------------------------------
-- 5. COMMENTS (Customer discussions, Q&A, and staff replies)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_type TEXT NOT NULL CHECK (parent_type IN ('review', 'product', 'blog')),
  parent_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL DEFAULT 'customer' CHECK (author_role IN ('customer', 'staff', 'admin')),
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'flagged')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_parent ON public.comments(parent_type, parent_id);

-- ------------------------------------------------------------
-- 6. REVIEW HELPFUL VOTES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.review_helpful_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_ip TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_review_user_vote UNIQUE(review_id, user_id)
);

-- ------------------------------------------------------------
-- 7. CART ITEMS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id TEXT NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_variant UNIQUE(user_id, variant_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_user ON public.cart_items(user_id);

-- ------------------------------------------------------------
-- 8. WISHLIST ITEMS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_product UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist_items(user_id);

-- ------------------------------------------------------------
-- 9. ADDRESSES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT 'Home',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_addresses_user ON public.addresses(user_id);

-- ------------------------------------------------------------
-- 10. ORDERS & ORDER ITEMS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total NUMERIC(10, 2) NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount_code TEXT,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'shipped', 'delivered', 'cancelled', 'returned')),
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'card',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id),
  variant_id TEXT NOT NULL REFERENCES public.product_variants(id),
  name TEXT NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- ------------------------------------------------------------
-- 11. DISCOUNT CODES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.discount_codes (
  code TEXT PRIMARY KEY,
  description TEXT,
  amount_off NUMERIC(4, 2) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  expires_at TIMESTAMPTZ
);

-- ------------------------------------------------------------
-- 12. DYNAMIC CONTENT & BANNERS (Headless CMS sync)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_blocks (
  key TEXT PRIMARY KEY,
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_helpful_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    FALSE
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Products & Variants: Public read, Admin write
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Products admin write" ON public.products FOR ALL USING (public.is_admin());

CREATE POLICY "Variants are viewable by everyone" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Variants admin write" ON public.product_variants FOR ALL USING (public.is_admin());

-- Content Blocks: Public read, Admin write
CREATE POLICY "Content blocks are viewable by everyone" ON public.content_blocks FOR SELECT USING (true);
CREATE POLICY "Content blocks admin write" ON public.content_blocks FOR ALL USING (public.is_admin());

-- Profiles: Public can view basic profile info, user can update their own
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Reviews: Approved reviews are public; authenticated users can insert; owners/admins can update/delete
CREATE POLICY "Approved reviews are viewable by everyone" ON public.reviews FOR SELECT USING (status = 'approved' OR auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Authenticated users can submit reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Comments: Approved comments are public; authenticated users can comment
CREATE POLICY "Approved comments viewable by everyone" ON public.comments FOR SELECT USING (status = 'approved' OR auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Authenticated users can submit comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Helpful Votes
CREATE POLICY "Helpful votes viewable by all" ON public.review_helpful_votes FOR SELECT USING (true);
CREATE POLICY "Users can vote once" ON public.review_helpful_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their vote" ON public.review_helpful_votes FOR DELETE USING (auth.uid() = user_id);

-- Cart: Strictly user scoped
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from own cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Wishlist: Strictly user scoped
CREATE POLICY "Users can view own wishlist" ON public.wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own wishlist" ON public.wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete from own wishlist" ON public.wishlist_items FOR DELETE USING (auth.uid() = user_id);

-- Addresses: Strictly user scoped
CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- Orders: User can view own orders, Admins can view/update all
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (public.is_admin());

CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Users can insert order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Discount Codes: Public read active codes
CREATE POLICY "Active discount codes viewable by all" ON public.discount_codes FOR SELECT USING (is_active = true);
`

const schemaPath = path.resolve(__dirname, '../supabase/schema.sql')
fs.writeFileSync(schemaPath, schemaSql, 'utf-8')
console.log(`Written ${schemaPath}`)

