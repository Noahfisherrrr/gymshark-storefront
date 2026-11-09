// Activity taxonomy for "Shop By Activity" (women/men nav + Shop filters).
// Products tag themselves with one or more of these slugs via the
// `activities` column (text[], see supabase/schema.sql). Shared across both
// genders since the sport doesn't change, only which products carry it.
export const ACTIVITIES = [
  { slug: 'running', label: 'Running' },
  { slug: 'weight-lifting', label: 'Weight Lifting' },
  { slug: 'hiking', label: 'Hiking' },
  { slug: 'pilates', label: 'Pilates' },
  { slug: 'yoga', label: 'Yoga' },
  { slug: 'athleisure', label: 'Athleisure' },
]
