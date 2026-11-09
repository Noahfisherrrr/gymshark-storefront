// Reviews Policy — copied from the real reference article
// (eu.gymshark.com/pages/reviews-policy) so the Help Centre has a fully-built
// reviews policy page alongside the FAQ accordions. Brand-name mentions and
// the support email are genericized per the client's IP boundaries; the
// substance of the policy (numbered sections, rules) is kept exact.
export const REVIEWS_POLICY_INTRO = [
  'This policy explains how we handle customer reviews, ratings and related information published through our Customer Ratings and Reviews and Questions and Answers service (the "CRR Service"). It should be read alongside our Customer Ratings and Reviews and Questions and Answers Terms of Use.',
  'We aim to make sure reviews on our site are genuine, trustworthy and useful, by preventing and removing fake, concealed-incentivised and misleading reviews.',
]

export const REVIEWS_POLICY_SECTIONS = [
  {
    heading: '1. Fake Reviews Are Not Allowed',
    paragraphs: [
      "1.1. Fake reviews are prohibited. A fake review appears genuine but isn't — for example, one that doesn't reflect the reviewer's actual product experience, or is written by someone without genuine experience.",
      "1.2. All reviewers must confirm that their submission reflects genuine product or service experience. We don't write, commission or publish fake reviews, and we prohibit others from doing so.",
    ],
  },
  {
    heading: '2. Our Approach To Incentivised Reviews',
    paragraphs: [
      '2.1. An incentivised review is written in exchange for a benefit such as money, a discount, a free product, loyalty points, or entry into a prize draw.',
      '2.2. Incentivised reviews are permitted, but any incentive must be clearly and prominently disclosed, and the review must still reflect an honest opinion. A concealed incentive results in the review being removed.',
      "2.3. When we or an approved partner offer an incentive for a review, it's clearly labelled as incentivised. Incentives are offered for honest feedback regardless of rating, and incentivised reviews are moderated identically to any other review.",
    ],
  },
  {
    heading: '3. Our Approach To Ratings And Review Information',
    paragraphs: [
      '3.1. We publish overall star ratings, review counts, summaries and rankings based on genuine, compliant reviews only. To do this, we:',
    ],
    list: [
      'Calculate overall ratings from compliant reviews only',
      'Remove non-compliant reviews and recalculate any ratings they affected',
      'Avoid curating review information in a way that would create a misleading impression',
    ],
    outro:
      '3.2. All compliant reviews, whether positive or negative, are published without removal, suppression or prioritisation that would influence the overall rating.',
  },
  {
    heading: '4. How We Detect And Remove Non-Compliant Content',
    paragraphs: [
      '4.1. We take reasonable and proportionate steps to prevent and remove fake reviews, concealed incentivised reviews and false information, including:',
    ],
    list: [
      'Giving reviews from verified product purchasers a "Verified buyer" badge',
      'Running submission checks and ongoing monitoring to detect non-compliant content',
      'Investigating flagged reviews promptly',
      'Removing non-compliant content, which may be followed by further action such as a warning or account block',
      'Continually evaluating our tools and processes for effectiveness',
    ],
    outro:
      "4.2. A third-party reviews provider assists us with collecting, moderating and displaying reviews, though we remain responsible for complying with this policy.",
  },
  {
    heading: '5. How To Report A Review',
    paragraphs: [
      "5.1. If you think a review is fake, conceals an incentive, or is otherwise misleading, please report it to our Customer Support team. We review reports promptly and take action where appropriate.",
    ],
  },
  {
    heading: '6. Changes To This Policy',
    paragraphs: [
      '6.1. We may update this policy from time to time to reflect changes in our practices or the law. The version published here is the current one.',
    ],
  },
]

export const REVIEWS_POLICY_LAST_UPDATED = '4 November 2026'

export const REVIEWS_POLICY_RELATED_ARTICLES = [
  { q: 'What Is Your Returns Policy?', href: '/help/returns-policy' },
  { q: 'Submit a Fake', href: '/help/submit-a-fake' },
  { q: 'How Do I Contact Customer Service?', href: '/help#general-contact-customer-service' },
]
