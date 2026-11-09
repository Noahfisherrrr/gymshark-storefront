import { asset } from './assetVersion'

// Blog ("Central") content — mirrors gymshark.com/blog's structure:
// categories → articles built from typed body blocks, plus hand-picked
// Featured and Editor's Picks lists. Every article, author and image below
// is placeholder copy until the client's content team publishes through the
// CMS (Brief.md #4, #5); the block shapes are what the CMS should return.
//
// Inline text supports `[label](/path)` links and `**bold**` — see
// components/blog/RichText.jsx.
//
// Body block types:
//   { type: 'p', text }
//   { type: 'h2', text }
//   { type: 'list', items, ordered? }
//   { type: 'accordion', items: [{ title, text }] }
//   { type: 'takeaway', text }            left-ruled "Key Takeaway" callout
//   { type: 'tip', label, text }           italic aside with a lead-in label
//   { type: 'products', title, ids }       "shop the look" product grid
//   { type: 'buttons', links: [{ label, href }] }

export interface BlogButtonLink {
  label: string
  href: string
}

export type BlogBodyBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'accordion'; items: Array<{ title: string; text: string }> }
  | { type: 'takeaway'; text: string }
  | { type: 'tip'; label: string; text: string }
  | { type: 'products'; title: string; ids: string[] }
  | { type: 'buttons'; links: BlogButtonLink[] }

export interface BlogCategory {
  slug: string
  label: string
  description: string
}

export interface BlogTopic {
  title: string
  tags: string[]
}

export interface BlogAuthor {
  name: string
  role: string
  bio: string
}

export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  image: string
  body: BlogBodyBlock[]
}

export interface BlogTeaser {
  id: string
  title: string
  excerpt: string
  image: string
  href: string
}

export const BLOG_NAME = { title: 'Brand Name', subtitle: 'Central' }

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'news',
    label: 'News',
    description: 'New collections, store openings, events and everything happening in our world.',
  },
  {
    slug: 'product-and-style',
    label: 'Product & Style',
    description: 'Fit guides, fabric deep-dives and what to wear for every kind of session.',
  },
  {
    slug: 'fitness',
    label: 'Fitness',
    description: 'Training tips, workouts and plans to help you get more from every session.',
  },
  {
    slug: 'health',
    label: 'Health',
    description: 'Recovery, nutrition and the everyday habits that keep training sustainable.',
  },
]

export const BLOG_TAGS: Record<string, string> = {
  collections: 'Collections',
  events: 'Events',
  stores: 'Stores',
  community: 'Community',
  guides: 'Style Guides',
  'leggings-guide': 'Leggings Guide',
  'sports-bra-guide': 'Sports Bra Guide',
  'shorts-guide': 'Shorts Guide',
  strength: 'Strength',
  running: 'Running',
  hiit: 'HIIT',
  yoga: 'Yoga & Pilates',
  mobility: 'Mobility',
  'training-plans': 'Training Plans',
  recovery: 'Recovery',
  nutrition: 'Nutrition',
}

// gymshark.com/blog's topic directory above the newsletter sign-up.
export const BLOG_TOPICS: BlogTopic[] = [
  { title: 'News', tags: ['collections', 'events', 'stores', 'community'] },
  { title: 'Product', tags: ['leggings-guide', 'sports-bra-guide', 'shorts-guide', 'guides'] },
  { title: 'Fitness', tags: ['strength', 'running', 'hiit', 'mobility', 'training-plans'] },
  { title: 'Health', tags: ['recovery', 'nutrition'] },
]

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  'alex-rivera': {
    name: 'Alex Rivera',
    role: 'Content Writer',
    bio: 'Alex covers new drops, community events and everything happening at Brand Name. When they’re not writing, you’ll find them halfway through a long run.',
  },
  'jordan-hale': {
    name: 'Jordan Hale',
    role: 'Training Editor',
    bio: 'Jordan is a certified personal trainer who turns coaching-floor know-how into plans you can actually follow.',
  },
  'sam-okafor': {
    name: 'Sam Okafor',
    role: 'Product Editor',
    bio: 'Sam works alongside our design team, so you know exactly what goes into every fabric, fit and finish.',
  },
  'priya-nair': {
    name: 'Priya Nair',
    role: 'Health & Wellbeing Writer',
    bio: 'Priya writes about recovery, nutrition and the habits that make training feel good for the long haul.',
  },
}

const img = (name: string): string => asset(`/media/products/${name}.webp`)

const ARTICLES: BlogArticle[] = [
  {
    slug: 'what-to-wear-for-every-workout',
    title: 'What To Wear For Every Workout: An Activity-By-Activity Guide',
    excerpt: 'Lifting, running, HIIT, yoga or rest day — the fabrics, fits and support levels that work best for each.',
    category: 'product-and-style',
    tags: ['guides', 'strength', 'running', 'yoga'],
    author: 'sam-okafor',
    publishedAt: '2026-11-06',
    image: asset('/media/hero-training-poster.webp'),
    body: [
      { type: 'p', text: 'The right kit won’t do the reps for you, but the wrong kit can absolutely get in the way. Fabric, fit and support all change depending on how you move — so here’s what we’d reach for, session by session.' },
      { type: 'h2', text: 'Weightlifting & Strength Training' },
      { type: 'p', text: 'Prioritize freedom of movement and fabrics that hold up to barbells and benches. A fitted or relaxed tee keeps your shoulders free, and shorts with four-way stretch won’t ride up mid-squat.' },
      {
        type: 'list',
        items: [
          '**Top:** a sweat-wicking tee like the [Seamless Training Tee](/product/p1), or go oversized for a looser feel',
          '**Bottom:** [Flex Training Shorts](/product/p2) or squat-proof leggings',
          '**Extras:** [Lifting Straps](/product/p17) for your heaviest pulls',
        ],
      },
      { type: 'h2', text: 'Running' },
      { type: 'p', text: 'Running is repetitive and high-impact, so chafe-free seams, lightweight fabrics and a secure fit matter most. Look for split hems or shorter inseams for a full stride, and somewhere to stash your keys.' },
      {
        type: 'list',
        items: [
          '**Top:** a lightweight, quick-dry tank or tee — layer the [Compression Base Layer](/product/p8) underneath when it’s cold',
          '**Bottom:** [Running Shorts 5"](/product/p12) for speed work, leggings for colder runs',
          '**Support:** a high-support sports bra for anything high impact',
          '**Extras:** cushioned socks like our [Crew Socks 3 Pack](/product/p15)',
        ],
      },
      { type: 'h2', text: 'HIIT & Conditioning' },
      { type: 'p', text: 'Fast changes of direction and lots of floor work call for a close fit that won’t flip up during burpees or mountain climbers. Breathability is non-negotiable.' },
      {
        type: 'list',
        items: [
          '**Top:** a cropped or fitted tank such as the [Training Cropped Tank](/product/p11)',
          '**Bottom:** high-waisted leggings or fitted shorts',
          '**Support:** a medium-to-high support sports bra',
        ],
      },
      { type: 'h2', text: 'Yoga & Pilates' },
      { type: 'p', text: 'Low impact, but plenty of stretching, twisting and folding. Choose soft, second-skin fabrics with a high waistband that stays put when you bend forward.' },
      {
        type: 'list',
        items: [
          '**Top:** a light-support bra like the [Studio Sports Bra](/product/p4), or a fitted tank',
          '**Bottom:** [Rib Seamless Leggings](/product/p3) or [Flare Leggings](/product/p10)',
          '**Extras:** grip socks for reformer classes',
        ],
      },
      { type: 'h2', text: 'Rest Days' },
      { type: 'p', text: 'Recovery is part of training, and it deserves a comfortable uniform. Go relaxed, soft and warm — the [Everyday Oversized Hoodie](/product/p5) and [Rest Day Joggers](/product/p14) were made for exactly this.' },
      { type: 'h2', text: 'Fabric Terms, Decoded' },
      {
        type: 'accordion',
        items: [
          { title: 'Sweat-Wicking', text: 'Pulls moisture away from your skin to the fabric’s surface so it evaporates faster. Ideal for cardio and anything sweaty.' },
          { title: 'Four-Way Stretch', text: 'Stretches both across and along the fabric, so it moves with you through squats, lunges and stretches.' },
          { title: 'Seamless', text: 'Knitted in one piece to remove the seams that can rub. Great for running and long sessions.' },
          { title: 'Compression', text: 'A snug fit that supports muscles and holds in warmth. Popular for cold-weather runs and as a base layer.' },
        ],
      },
      { type: 'takeaway', text: 'Match your kit to your movement: freedom for lifting, lightweight and chafe-free for running, close-fitting for HIIT, soft and high-waisted for yoga — and something relaxed for rest days.' },
      { type: 'products', title: 'Shop The Guide', ids: ['p1', 'p2', 'p12', 'p11', 'p3', 'p14'] },
    ],
  },
  {
    slug: 'winter-training-edit',
    title: 'New In: The Winter Training Edit, Decoded',
    excerpt: 'Everything landing this season, from brushed midlayers to heavyweight rest day fits.',
    category: 'news',
    tags: ['collections'],
    author: 'alex-rivera',
    publishedAt: '2026-11-04',
    image: img('p5'),
    body: [
      { type: 'p', text: 'The cold months are when consistency gets tested — darker mornings, colder commutes and a gym bag that suddenly needs more layers. The Winter Training Edit is built for exactly that: warm where you need it, breathable where you don’t, and easy to throw on between sessions.' },
      { type: 'p', text: 'Here’s everything landing this season, and how each piece fits into your week.' },
      { type: 'h2', text: 'The Layering Pieces' },
      { type: 'p', text: 'Start with the [Core Half-Zip Pullover](/product/p6) — a brushed-back midlayer that works over a tee for your warm-up and comes straight off when the working sets start. Pair it with the [Legacy Track Jacket](/product/p7) for the walk to the gym.' },
      { type: 'h2', text: 'The Training Staples' },
      { type: 'p', text: 'Underneath, the [Compression Base Layer](/product/p8) holds in warmth on outdoor runs without trapping sweat, while the [Rib Seamless Leggings](/product/p3) return in two new seasonal colors.' },
      { type: 'h2', text: 'The Rest Day Fits' },
      { type: 'p', text: 'Because recovery deserves a uniform too: the [Everyday Oversized Hoodie](/product/p5) and [Rest Day Joggers](/product/p14) are cut relaxed, made heavyweight and designed to be lived in.' },
      { type: 'takeaway', text: 'Build your winter kit in layers: a sweat-wicking base, a light midlayer you can strip off mid-session, and something warm for before and after.' },
      { type: 'products', title: 'Shop The Edit', ids: ['p6', 'p7', 'p8', 'p3', 'p5', 'p14'] },
      { type: 'buttons', links: [{ label: 'Shop New Arrivals', href: '/shop' }] },
    ],
  },
  {
    slug: 'new-york-flagship-now-open',
    title: 'Our First US Flagship Is Now Open In New York',
    excerpt: 'Two floors, the full collection and a community space — here’s what to expect in SoHo.',
    category: 'news',
    tags: ['stores', 'events'],
    author: 'alex-rivera',
    publishedAt: '2026-10-28',
    image: img('p6'),
    body: [
      { type: 'p', text: 'It’s official: our first US flagship has opened its doors on Broadway in SoHo. Two floors, the full collection, and a space built as much for the community as it is for shopping.' },
      { type: 'h2', text: 'What’s Inside' },
      {
        type: 'list',
        items: [
          'The full women’s, men’s and accessories range — including store-exclusive colorways',
          'Fitting rooms designed for movement, so you can squat-test before you buy',
          'A community space hosting run clubs, workshops and athlete meet-ups',
          'In-store returns and exchanges for online orders',
        ],
      },
      { type: 'h2', text: 'Saturday Run Club' },
      { type: 'p', text: 'Every Saturday morning the store hosts a free community run club, leaving at 8am. All paces are welcome — just show up in your trainers.' },
      { type: 'tip', label: 'Planning a visit?', text: 'Opening hours, directions and every other location are on our [Stores page](/pages/stores).' },
      { type: 'buttons', links: [{ label: 'Find A Store', href: '/pages/stores' }] },
    ],
  },
  {
    slug: 'strength-training-for-beginners',
    title: 'Strength Training For Beginners: Your First Four Weeks',
    excerpt: 'Five movements, three sessions a week and a simple plan to build on.',
    category: 'fitness',
    tags: ['strength', 'training-plans'],
    author: 'jordan-hale',
    publishedAt: '2026-11-01',
    image: img('p1'),
    body: [
      { type: 'p', text: 'Starting strength training can feel intimidating, but the fundamentals are simple: learn a handful of movements, train them consistently, and add a little more over time.' },
      { type: 'h2', text: 'The Five Movements To Learn' },
      {
        type: 'accordion',
        items: [
          { title: 'Squat', text: 'Builds your quads, glutes and core. Start with a bodyweight or goblet squat, sitting back and down with your chest tall.' },
          { title: 'Hinge', text: 'The deadlift family trains your hamstrings, glutes and back. Begin with a Romanian deadlift using dumbbells.' },
          { title: 'Push', text: 'Push-ups and presses for your chest, shoulders and triceps. Elevate your hands on a bench if floor push-ups are tough.' },
          { title: 'Pull', text: 'Rows and pulldowns build your back and biceps — important for posture and for balancing out all that pushing.' },
          { title: 'Carry', text: 'Farmer’s carries train grip, core and total-body stability. Pick up something heavy and walk tall.' },
        ],
      },
      { type: 'h2', text: 'Your Four-Week Plan' },
      { type: 'p', text: 'Train three non-consecutive days a week — for example Monday, Wednesday and Friday. Each session, pick one exercise from each movement pattern.' },
      {
        type: 'list',
        items: [
          '**Week 1:** 2 sets of 10 reps — focus purely on technique',
          '**Week 2:** 3 sets of 10 reps at the same weight',
          '**Week 3:** 3 sets of 10 reps, adding a little weight wherever every rep felt solid',
          '**Week 4:** 3 sets of 8 reps with slightly heavier weight',
        ],
      },
      { type: 'takeaway', text: 'Leave one or two reps in the tank on every set while you’re learning. Good form now pays off for years.' },
      { type: 'tip', label: 'Coach’s tip:', text: 'Write every session down. Watching the numbers creep up is the best motivation there is.' },
      {
        type: 'buttons',
        links: [
          { label: 'Progressive Overload, Explained', href: '/blog/article/progressive-overload' },
          { label: 'How To Warm Up', href: '/blog/article/how-to-warm-up' },
        ],
      },
    ],
  },
  {
    slug: 'leggings-guide',
    title: 'The Leggings Guide: Finding Your Fit',
    excerpt: 'Scrunch, flare, seamless or compression — how to pick the pair that works for you.',
    category: 'product-and-style',
    tags: ['leggings-guide', 'guides'],
    author: 'sam-okafor',
    publishedAt: '2026-10-22',
    image: img('p9'),
    body: [
      { type: 'p', text: 'Scrunch, flare, seamless, high-waisted — there’s a pair for every session, but the options can be a lot. Here’s how to narrow it down.' },
      { type: 'h2', text: 'Start With The Activity' },
      {
        type: 'list',
        items: [
          '**Lifting & leg days:** squat-proof, thicker fabric with a high waistband',
          '**Running:** lightweight and sweat-wicking, with a pocket for your phone',
          '**Yoga & Pilates:** soft, seamless and stretchy',
          '**Everyday wear:** flares or relaxed fits that work just as well off the gym floor',
        ],
      },
      { type: 'h2', text: 'Pick Your Style' },
      {
        type: 'accordion',
        items: [
          { title: 'Scrunch', text: 'A ruched seam at the back that adds shape. The [Sculpt Scrunch Leggings](/product/p9) are our most popular pair.' },
          { title: 'Seamless', text: 'Knitted without side seams for a second-skin feel — try the [Rib Seamless Leggings](/product/p3).' },
          { title: 'Flare', text: 'Fitted through the thigh with a kick at the hem. The [Flare Leggings](/product/p10) take you from studio to street.' },
          { title: 'Compression', text: 'Firm, supportive fabric that holds everything in place for high-intensity sessions.' },
        ],
      },
      { type: 'h2', text: 'Get The Length Right' },
      { type: 'p', text: 'Full length should sit at your ankle bone; 7/8 length finishes just above it, which is great for showing off trainers and for shorter legs. If you’re between sizes, size up for comfort or down for more compression.' },
      { type: 'tip', label: 'Fit tip:', text: 'Do the squat test before you remove the tags: bend deep in good light and check the fabric doesn’t go sheer.' },
      { type: 'products', title: 'Shop Leggings', ids: ['p9', 'p3', 'p10'] },
      { type: 'buttons', links: [{ label: 'Shop All Leggings', href: '/shop?category=women&type=leggings' }] },
    ],
  },
  {
    slug: 'new-refer-a-friend-program',
    title: 'Introducing Refer A Friend: Five Friends, 20% Off',
    excerpt: 'Share your link, give your friends 10% off, and unlock a reward for every five who shop.',
    category: 'news',
    tags: ['community'],
    author: 'alex-rivera',
    publishedAt: '2026-10-15',
    image: asset('/media/gym-training-poster.webp'),
    body: [
      { type: 'p', text: 'Training’s better with friends — and now, so is shopping. Our new Refer a Friend program rewards you for bringing your people along.' },
      { type: 'h2', text: 'How It Works' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Grab your personal link from [your account](/account/refer-a-friend).',
          'Share it with friends. They get 10% off their first order.',
          'Once five friends have placed an order, you unlock a reward: 20% off your next order, or $25 in wallet credit.',
        ],
      },
      { type: 'p', text: 'There’s no limit — every five friends who shop unlocks another reward.' },
      { type: 'buttons', links: [{ label: 'Learn More', href: '/pages/refer-a-friend' }] },
    ],
  },
  {
    slug: 'rest-day-recovery',
    title: 'Rest Days: Why Recovery Is Where Progress Happens',
    excerpt: 'Training is the stimulus; recovery is when your body adapts. Here’s how to rest well.',
    category: 'health',
    tags: ['recovery'],
    author: 'priya-nair',
    publishedAt: '2026-10-12',
    image: img('p14'),
    body: [
      { type: 'p', text: 'Training is the stimulus; recovery is when your body actually adapts. Skip it and you’re leaving progress on the table.' },
      { type: 'h2', text: 'Signs You Need More Rest' },
      {
        type: 'list',
        items: [
          'Your performance stalls or drops for more than a week',
          'Persistent soreness or heavy legs',
          'Poor sleep or low motivation',
          'Getting ill more often than usual',
        ],
      },
      { type: 'h2', text: 'What A Good Rest Day Looks Like' },
      {
        type: 'accordion',
        items: [
          { title: 'Sleep', text: 'Aim for 7–9 hours. It’s the most effective recovery tool you have, and it’s free.' },
          { title: 'Active Recovery', text: 'Gentle movement such as walking, easy cycling or mobility work increases blood flow without adding fatigue.' },
          { title: 'Nutrition', text: 'Keep eating well on rest days — your body is busy repairing. Prioritize protein and plenty of plants.' },
          { title: 'Switch Off', text: 'Mental recovery counts too. Spend time on something that has nothing to do with training.' },
        ],
      },
      { type: 'takeaway', text: 'Plan rest days the same way you plan training days. They’re part of the program, not a break from it.' },
      { type: 'products', title: 'Rest Day Essentials', ids: ['p5', 'p14', 'p15'] },
    ],
  },
  {
    slug: 'sports-bra-support-guide',
    title: 'Sports Bra Support, Explained',
    excerpt: 'Light, medium or high support: what each level is actually built for, and how it should fit.',
    category: 'product-and-style',
    tags: ['sports-bra-guide', 'guides'],
    author: 'sam-okafor',
    publishedAt: '2026-10-09',
    image: img('p4'),
    body: [
      { type: 'p', text: 'The right sports bra makes every session more comfortable. Support levels are designed around how much you move, so start with your activity and work back from there.' },
      { type: 'h2', text: 'Light Support' },
      { type: 'p', text: 'Best for yoga, Pilates, stretching and walking. Soft fabric, minimal structure, maximum comfort.' },
      { type: 'h2', text: 'Medium Support' },
      { type: 'p', text: 'Built for weightlifting, cycling and gym classes — a little more structure and wider straps, like our [Studio Sports Bra](/product/p4).' },
      { type: 'h2', text: 'High Support' },
      { type: 'p', text: 'Designed for running, HIIT and anything high impact. Expect a firmer band, adjustable straps and more coverage.' },
      { type: 'h2', text: 'How Should It Fit?' },
      {
        type: 'list',
        items: [
          'The band should sit level all the way around and fit snugly — you should only fit two fingers underneath',
          'Straps shouldn’t dig in or slip off your shoulders',
          'There should be no gaping or spilling at the cups',
          'Jump on the spot: if there’s lots of bounce, size down or go up a support level',
        ],
      },
      { type: 'takeaway', text: 'Most of a sports bra’s support comes from the band, not the straps — if the band is loose, the bra can’t do its job.' },
      { type: 'products', title: 'Shop Sports Bras', ids: ['p4', 'p11'] },
    ],
  },
  {
    slug: 'progressive-overload',
    title: 'Progressive Overload, Explained',
    excerpt: 'The one principle behind getting stronger — and four simple ways to apply it.',
    category: 'fitness',
    tags: ['strength'],
    author: 'jordan-hale',
    publishedAt: '2026-10-02',
    image: img('p13'),
    body: [
      { type: 'p', text: 'If there’s one principle behind getting stronger, it’s this: to keep progressing, you have to gradually ask your body to do a little more than it’s used to.' },
      { type: 'h2', text: 'Four Ways To Progress' },
      {
        type: 'accordion',
        items: [
          { title: 'Add Weight', text: 'The classic. Increase the load in small jumps — 2.5–5 lb on upper-body lifts, 5–10 lb on lower-body lifts.' },
          { title: 'Add Reps', text: 'Stick with the same weight and aim for one or two more reps than last time before moving the weight up.' },
          { title: 'Add Sets', text: 'More total work across the week builds muscle. Add a set to one of your key exercises.' },
          { title: 'Improve Control', text: 'Slow down the lowering phase, pause at the bottom or tighten up your technique. Same weight, harder rep.' },
        ],
      },
      { type: 'h2', text: 'Try Double Progression' },
      { type: 'p', text: 'Pick a rep range — say 8–12. Start with a weight you can lift for 8 good reps. Each session, try to add reps. Once you hit 12 on every set, increase the weight and start back at 8.' },
      { type: 'takeaway', text: 'Progress isn’t linear. Some weeks you’ll add weight, some weeks a single rep — both count.' },
      { type: 'buttons', links: [{ label: 'Strength Training For Beginners', href: '/blog/article/strength-training-for-beginners' }] },
    ],
  },
  {
    slug: 'how-to-warm-up',
    title: 'How To Warm Up Properly (And Why It’s Worth It)',
    excerpt: 'A simple 5–10 minute routine that makes every run and lifting session feel better.',
    category: 'fitness',
    tags: ['mobility', 'running', 'strength'],
    author: 'jordan-hale',
    publishedAt: '2026-09-27',
    image: img('p15'),
    body: [
      { type: 'p', text: 'A good warm-up takes 5–10 minutes and makes the rest of your session feel better — raising your body temperature, waking up your joints and rehearsing the movements to come.' },
      { type: 'h2', text: 'The RAMP Method' },
      { type: 'p', text: 'Most coaches use some version of RAMP:' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**Raise** — light cardio to lift your heart rate: a brisk walk, easy cycle or skipping',
          '**Activate** — wake up key muscles with glute bridges, band pull-aparts or bodyweight squats',
          '**Mobilize** — move through your full range with leg swings, hip openers and arm circles',
          '**Potentiate** — build up to your working weight or pace with lighter sets or a few strides',
        ],
      },
      { type: 'h2', text: 'Before A Run' },
      {
        type: 'list',
        items: [
          'Leg swings — 10 in each direction, each leg',
          'Walking lunges — 10 each leg',
          'High knees and butt kicks — 20 seconds each',
          'Two or three 15-second strides at a faster pace',
        ],
      },
      { type: 'h2', text: 'Before Lifting' },
      { type: 'p', text: 'Run through the RAMP sequence above, then do 2–3 lighter warm-up sets of your first exercise, building toward your working weight.' },
      { type: 'takeaway', text: 'Save static stretching (holding a stretch) for after your session — before training, keep everything moving.' },
    ],
  },
  {
    slug: 'shorts-guide',
    title: 'The Shorts Guide: Finding Your Length',
    excerpt: 'From 5" to 9" inseams — how to pick the pair that works for your session.',
    category: 'product-and-style',
    tags: ['shorts-guide', 'guides'],
    author: 'sam-okafor',
    publishedAt: '2026-09-30',
    image: img('p2'),
    body: [
      { type: 'p', text: 'From 5" to 9" inseams, the right length depends on how you train — and how much leg you want to show.' },
      { type: 'h2', text: 'Choose Your Inseam' },
      {
        type: 'accordion',
        items: [
          { title: '5" Inseam', text: 'Short and light. Perfect for running, sprints and conditioning where you need a full range of motion — see the [Running Shorts 5"](/product/p12).' },
          { title: '7" Inseam', text: 'The all-rounder. Long enough for leg day, short enough for cardio. The [Flex Training Shorts](/product/p2) sit here.' },
          { title: '9" Inseam', text: 'More coverage and a relaxed look. Good for lifting, court sports and rest days.' },
        ],
      },
      { type: 'h2', text: 'Liners Or No Liners?' },
      { type: 'p', text: 'Built-in liners add support and stop chafing on runs, so they’re great for cardio. For lifting or casual wear, linerless shorts give you the freedom to wear your own base layer.' },
      { type: 'tip', label: 'Rule of thumb:', text: 'The more you run, the shorter the inseam. The more you lift, the more stretch you need.' },
      { type: 'products', title: 'Shop Shorts', ids: ['p2', 'p12'] },
    ],
  },
  {
    slug: 'hiit-vs-steady-state-cardio',
    title: 'HIIT vs Steady-State Cardio: Which Should You Do?',
    excerpt: 'Short and intense, or long and steady? Both work — they just get there differently.',
    category: 'fitness',
    tags: ['hiit', 'running'],
    author: 'jordan-hale',
    publishedAt: '2026-09-24',
    image: img('p8'),
    body: [
      { type: 'p', text: 'Short and intense, or long and steady? Both improve your fitness — they just get there in different ways.' },
      { type: 'h2', text: 'What Is HIIT?' },
      { type: 'p', text: 'High-intensity interval training alternates short bursts of hard effort with recovery. Think 30 seconds of sprinting followed by 60 seconds of walking, repeated 8–10 times.' },
      { type: 'h2', text: 'What Is Steady-State Cardio?' },
      { type: 'p', text: 'Longer sessions at a consistent, conversational pace — a 40-minute jog, bike ride or incline walk.' },
      { type: 'h2', text: 'The Pros And Cons' },
      {
        type: 'accordion',
        items: [
          { title: 'Pros Of HIIT', text: 'Time-efficient, builds top-end fitness and keeps things varied.' },
          { title: 'Cons Of HIIT', text: 'Demanding to recover from — doing it every day can leave you run down and affect your strength sessions.' },
          { title: 'Pros Of Steady State', text: 'Builds your aerobic base, is easier to recover from and can be done more often.' },
          { title: 'Cons Of Steady State', text: 'Takes longer, and some people find it repetitive.' },
        ],
      },
      { type: 'h2', text: 'The Verdict' },
      { type: 'p', text: 'Most people do best with a mix: one or two HIIT sessions a week alongside two or three easier, steady sessions. Above all, pick the one you’ll actually stick to.' },
      { type: 'tip', label: 'What to wear:', text: 'HIIT is all floor work and fast movement — see our [activity-by-activity kit guide](/blog/article/what-to-wear-for-every-workout).' },
    ],
  },
  {
    slug: 'capsule-training-wardrobe',
    title: 'Building A Capsule Training Wardrobe',
    excerpt: 'A handful of pieces that cover every session on your calendar.',
    category: 'product-and-style',
    tags: ['guides'],
    author: 'sam-okafor',
    publishedAt: '2026-09-18',
    image: img('p11'),
    body: [
      { type: 'p', text: 'You don’t need a drawer full of kit to train consistently. A handful of versatile pieces covers every session on your calendar — and makes getting dressed for the gym one less decision.' },
      { type: 'h2', text: 'The Core Ten' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Two sweat-wicking tees or tanks',
          'One supportive sports bra (or two, in different support levels)',
          'Two pairs of leggings or shorts',
          'One midlayer you can train in',
          'One relaxed hoodie for before and after',
          'One pair of joggers for rest days',
          'A pack of good training socks',
          'One gym bag that fits it all',
        ],
      },
      { type: 'h2', text: 'Stick To A Palette' },
      { type: 'p', text: 'Neutrals — black, grey, navy — mix and match with everything. Add one or two seasonal colors to keep things interesting.' },
      { type: 'h2', text: 'Buy For Your Most Common Session' },
      { type: 'p', text: 'If you run three times a week and lift once, prioritize running kit. Your capsule should mirror your schedule, not someone else’s.' },
      { type: 'takeaway', text: 'Fewer, better pieces that match how you actually train get worn more — and last longer.' },
      { type: 'products', title: 'Shop The Capsule', ids: ['p1', 'p3', 'p5', 'p13', 'p14', 'p16'] },
    ],
  },
  {
    slug: 'workout-nutrition-basics',
    title: 'Pre- And Post-Workout Nutrition, Simplified',
    excerpt: 'What to eat before and after training, without the complicated meal plans.',
    category: 'health',
    tags: ['nutrition'],
    author: 'priya-nair',
    publishedAt: '2026-09-12',
    image: img('p19'),
    body: [
      { type: 'p', text: 'You don’t need a complicated plan to fuel your training well. Get the basics right and most of the work is done.' },
      { type: 'h2', text: 'Before You Train' },
      { type: 'p', text: 'Eat a balanced meal 2–3 hours before, or a lighter carb-based snack 30–60 minutes before — a banana, toast or yogurt. Carbohydrates are your body’s preferred fuel for hard sessions.' },
      { type: 'h2', text: 'After You Train' },
      { type: 'p', text: 'Aim to eat a meal containing protein and carbohydrates within a couple of hours. Protein supports muscle repair; carbohydrates replenish your energy stores.' },
      {
        type: 'list',
        items: [
          'Chicken, rice and vegetables',
          'Greek yogurt with oats and berries',
          'Eggs on toast',
          'A protein shake and a piece of fruit when you’re on the go',
        ],
      },
      { type: 'h2', text: 'Don’t Forget Hydration' },
      { type: 'p', text: 'Start your session hydrated and sip throughout. Keeping a [Shaker Bottle](/product/p19) in your gym bag makes it easy.' },
      { type: 'takeaway', text: 'Consistency beats perfection: your overall daily diet matters far more than exact timing.' },
      { type: 'p', text: 'This article is general information, not medical advice. If you have specific dietary needs, speak to a registered dietitian.' },
    ],
  },
  {
    slug: 'running-gear-guide',
    title: 'Running Gear, Explained: What Actually Matters',
    excerpt: 'From socks to layers — the kit that makes the miles more comfortable in any weather.',
    category: 'product-and-style',
    tags: ['running', 'guides'],
    author: 'jordan-hale',
    publishedAt: '2026-09-05',
    image: img('p12'),
    body: [
      { type: 'p', text: 'Running is simple: you need shoes and somewhere to go. But a few well-chosen pieces of kit make the miles more comfortable — especially as the weather turns.' },
      { type: 'h2', text: 'Start From The Feet Up' },
      { type: 'p', text: 'Shoes are the one thing worth getting properly fitted for. After that, cushioned, moisture-wicking socks like our [Crew Socks 3 Pack](/product/p15) help prevent blisters.' },
      { type: 'h2', text: 'Avoid Cotton' },
      { type: 'p', text: 'Cotton holds onto sweat, gets heavy and can chafe. Look for technical, quick-dry fabrics in everything that touches your skin.' },
      { type: 'h2', text: 'Dressing For The Cold' },
      { type: 'p', text: 'Dress as if it’s 10°F warmer than it is — you’ll heat up within the first mile.' },
      {
        type: 'list',
        items: [
          '**Base:** a fitted long-sleeve layer like the [Compression Base Layer](/product/p8)',
          '**Mid:** a light half-zip you can open up as you warm up',
          '**Extras:** a cap or headband, plus gloves on frosty mornings — try the [Training Cap](/product/p18)',
        ],
      },
      { type: 'h2', text: 'Dressing For The Heat' },
      { type: 'p', text: 'Go light, loose and bright: short-inseam shorts like the [Running Shorts 5"](/product/p12), a breathable tank and a cap to keep the sun off.' },
      { type: 'tip', label: 'Safety tip:', text: 'Running in the dark? Wear something reflective and let someone know your route.' },
      { type: 'products', title: 'Shop Running', ids: ['p12', 'p8', 'p15', 'p18'] },
    ],
  },
  {
    slug: 'gym-bag-essentials',
    title: 'What’s In Our Gym Bag: 8 Essentials',
    excerpt: 'The things the team never leaves home without.',
    category: 'product-and-style',
    tags: ['guides'],
    author: 'alex-rivera',
    publishedAt: '2026-08-28',
    image: img('p16'),
    body: [
      { type: 'p', text: 'Forget something important and the whole session can fall apart. Here’s what the team never leaves home without.' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**A water bottle** — the [Shaker Bottle 700ml](/product/p19) doubles as a protein shaker',
          '**A spare pair of socks** — your feet will thank you',
          '**Lifting straps** — our [Lifting Straps](/product/p17) for heavy pulls',
          '**Headphones** — fully charged',
          '**A small towel**',
          '**A post-workout snack**',
          '**A fresh layer** for the journey home',
          '**A bag that keeps it all organized** — the [Everyday Gym Bag](/product/p16) has a separate shoe compartment',
        ],
      },
      { type: 'products', title: 'Shop Bags & Accessories', ids: ['p16', 'p20', 'p17', 'p19'] },
    ],
  },
]

export const BLOG_ARTICLES = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const BLOG_FEATURED_SLUGS = [
  'what-to-wear-for-every-workout',
  'strength-training-for-beginners',
  'leggings-guide',
  'hiit-vs-steady-state-cardio',
  'new-york-flagship-now-open',
]

export const BLOG_EDITORS_PICKS_SLUGS = ['running-gear-guide', 'rest-day-recovery', 'workout-nutrition-basics']

export function getArticle(slug: string): BlogArticle | null {
  return BLOG_ARTICLES.find((article) => article.slug === slug) ?? null
}

export function getCategory(slug: string): BlogCategory | null {
  return BLOG_CATEGORIES.find((category) => category.slug === slug) ?? null
}

export const articleHref = (article: BlogArticle): string => `/blog/article/${article.slug}`

// Shape the homepage / shop-landing BlogCards teasers expect.
export function blogTeasers(slugs: string[]): BlogTeaser[] {
  return slugs
    .map(getArticle)
    .filter((article): article is BlogArticle => article !== null)
    .map((article) => ({
      id: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      image: article.image,
      href: articleHref(article),
    }))
}
