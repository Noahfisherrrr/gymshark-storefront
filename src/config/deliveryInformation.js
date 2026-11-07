// gymshark.com support article "Delivery Information" — regional shipping
// costs, timeframes and restrictions, copied from the real reference article
// (support.gymshark.com/en/articles/11136898-delivery-information) so the
// Help Centre has one fully-built article page alongside the FAQ accordions.
export const DELIVERY_NOTE = 'All delivery timeframes start from the day after you place your order, unless otherwise stated.'

export const DELIVERY_REGIONS = [
  {
    id: 'uk',
    name: 'United Kingdom',
    groups: [
      {
        name: 'England & Wales',
        rows: [
          { service: 'Standard Delivery', time: '2-3 working days', cost: '£3.99', note: 'Free on orders over £50' },
          { service: 'Pickup Point', time: '3-4 working days', cost: '£2.99', note: 'Delivered to an InPost locker or Evri ParcelShop' },
          { service: 'Next Day Delivery', time: 'Next working day', cost: '£4.99', note: 'Free on orders over £100' },
        ],
      },
      {
        name: 'Scotland',
        rows: [
          { service: 'Standard Delivery', time: '3-5 working days', cost: '£3.99', note: 'Free on orders over £50' },
          { service: 'Pickup Point', time: '3-4 working days', cost: '£3.99' },
          { service: 'Express Delivery', time: '1-2 working days', cost: '£4.99', note: 'Free on orders over £100' },
        ],
      },
      {
        name: 'Northern Ireland',
        rows: [
          { service: 'Standard Delivery', time: '4-5 working days', cost: '£3.99', note: 'Free on orders over £50' },
          { service: 'Express Delivery', time: '3-4 working days', cost: '£4.99', note: 'Free on orders over £100' },
        ],
      },
    ],
  },
  {
    id: 'us',
    name: 'United States',
    groups: [
      {
        name: 'Mainland US',
        rows: [
          { service: 'Standard Delivery', time: '3-6 working days', cost: '$6.00 USD', note: 'Free on orders over $75' },
          { service: 'Express Delivery', time: '3 working days', cost: '$15.00 USD' },
        ],
      },
    ],
    note: 'Non-mainland addresses can take up to 14 working days. Orders to PO boxes, APO/FPO addresses and military bases can take up to 60 working days.',
  },
  {
    id: 'canada',
    name: 'Canada',
    groups: [
      {
        name: 'Standard Delivery — $7.00 CAD',
        note: 'Free on orders over $100 CAD',
        rows: [
          { service: 'Alberta, British Columbia, Newfoundland & Labrador', time: '5-7 working days' },
          { service: 'Northwest Territories, Yukon, Nunavut', time: '4-7 working days' },
          { service: 'All other provinces', time: '3-5 working days' },
        ],
      },
      {
        name: 'Express Delivery — $15.00 CAD',
        note: 'Not available to Alberta, British Columbia or Newfoundland & Labrador',
        rows: [
          { service: 'Northwest Territories, Yukon, Nunavut', time: '4 working days' },
          { service: 'All other provinces', time: '3 working days' },
        ],
      },
    ],
    note: 'GST/HST is charged on all orders.',
  },
  {
    id: 'anz',
    name: 'Australia & New Zealand',
    groups: [
      {
        name: 'Australia',
        rows: [
          { service: 'Parcel Post Standard', time: '4-6 working days', cost: '$10.00 AUD', note: 'Free on orders over $100 AUD' },
          { service: 'Express Post', time: '3-5 working days', cost: '$15.00 AUD', note: 'Free on orders over $200 AUD' },
        ],
      },
      {
        name: 'New Zealand',
        note: 'Restricted postcodes apply for Waiheke Island, Stewart Island, Chatham Island and Great Barrier Island. Orders over $235 NZD may be subject to import duties.',
        rows: [
          { service: 'APG E-Commerce Standard', time: '6-8 working days', cost: '$10.00 AUD', note: 'Free on orders over $100 AUD' },
          { service: 'APG E-Commerce Express', time: '4-6 working days', cost: '$15.00 AUD', note: 'Free on orders over $200 AUD' },
        ],
      },
    ],
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: [
      { name: 'Austria, Germany', detail: 'Standard €4.40 (2-3 days) · Next Day €10.50 — no Packstation deliveries' },
      { name: 'Belgium', detail: 'Standard €5.50 (3-4 days, free over €50) · Express €10.50' },
      { name: 'Bulgaria, Croatia, Cyprus, Czechia', detail: 'Standard €9.50 (3-5 days, free over €75) · Express €19.50' },
      { name: 'Denmark', detail: 'Standard 45 DKK (3-5 days, package boxes only) · Express 125 DKK · Evening home delivery 50 DKK' },
      { name: 'Finland', detail: 'Standard €6.50 (4-7 days) · Express €10.50 · Evening delivery €6' },
      { name: 'France', detail: 'Standard/Relay €5.49 (3-4 days, free over €59) · Next Day €9.95' },
      { name: 'Greece, Hungary, Italy, Latvia', detail: 'Standard €9.50 (3-5 days, free over €75) · Express €19.50' },
      { name: 'Liechtenstein, Lithuania', detail: 'Standard €9.50 · Express €19.50 (2-3 days)' },
      { name: 'Luxembourg', detail: 'Standard €5.50 (3-5 days, free over €75) · Express €10.50' },
      { name: 'Malta', detail: 'Express €19.50 (1-3 days)' },
      { name: 'Netherlands', detail: 'Standard €5.50 (2-3 days) · Budbee Box €5 · Express €10.50 — no customs charges' },
      { name: 'Norway', detail: 'Standard 85 NOK (5-7 days, free over 700 NOK) · Express 255 NOK' },
      { name: 'Poland', detail: 'Standard €9.50 (3-4 days, free over €75) · Pickup €6 · Express €19.50' },
      { name: 'Ireland', detail: 'Standard €5 (3-5 days, free over €50) · Express €10.50' },
      { name: 'Romania', detail: 'Express €19.50 (2-3 days)' },
      { name: 'Spain', detail: 'Standard €9.50 (3-5 days) · Pickup €6 · Next Day €9.50 — special conditions apply for the Balearic and Canary Islands' },
      { name: 'Sweden', detail: 'Standard 65 SEK (3-5 days, free over 700 SEK) · Express 155 SEK · Evening 60 SEK' },
      { name: 'Switzerland', detail: 'Standard 10 CHF (3-5 days, free over 100 CHF) · Express 20.50 CHF' },
    ],
  },
  {
    id: 'row',
    name: 'Rest of World',
    countries: [
      { name: 'China', detail: 'Express $15.50 USD (2-4 days) — resident/tax ID required' },
      { name: 'Brazil', detail: 'Express $15.50 USD (2-4 days)' },
      { name: 'Hong Kong', detail: 'Standard $9.50 USD (7-14 days, free over $100 USD) · Express $17.50 USD' },
      { name: 'Indonesia', detail: 'Standard $9.50 USD (7-14 days) · Express $17.50 USD (free over $150 USD)' },
      { name: 'Israel', detail: 'Standard $10 USD (15-20 days)' },
      { name: 'Japan', detail: 'Standard $9.50 USD (7-14 days) · Express $17.50 USD — orders over $90 USD may be subject to import duties' },
      { name: 'Mexico', detail: "Express $15.50 USD (2-4 days) — requires an Importer's Tax ID; orders over $1,000 need a license and may be returned if documentation is missing" },
      { name: 'Philippines, Singapore, Thailand, Turkey', detail: 'Standard $9.50 USD (7-14 days, free over $100 USD) · Express $17.50 USD' },
      { name: 'Taiwan', detail: 'Express $15.50 USD (2-4 days)' },
    ],
  },
]

export const DELIVERY_RESTRICTED_COUNTRIES = [
  'Afghanistan', 'Belarus', 'Bonaire', 'Burundi', 'Cambodia', 'Central African Republic', 'Cuba',
  'Democratic Republic of Congo', 'Gauteng Province of South Africa', 'Iran', 'Iraq', 'Libya', 'Mali',
  'Myanmar', 'North Korea', 'Russia', 'Somalia', 'South Sudan', 'Sudan', 'Syria', 'Ukraine', 'Venezuela', 'Yemen',
]

export const DELIVERY_RELATED_ARTICLES = [
  { q: 'Can I Exchange My Item?', href: '/help#returns-refunds' },
  { q: 'Track Your Order & Missing Deliveries', href: '/help#orders-delivery-track-my-order' },
  { q: 'How Do I Return My Order?', href: '/help#returns-refunds-how-to-return' },
  { q: 'What To Do If Your Delivery Attempt Fails', href: '/help#orders-delivery' },
]
