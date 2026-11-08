import { asset } from './assetVersion'

// US store locations — placeholder data until the client confirms their
// real retail footprint (Brief.md #4). Addresses/hours are invented
// stand-ins; swap for the real list once supplied. No real storefront
// photography exists yet, so flagship cards reuse the gym training stills.
export const FLAGSHIP_STORES = [
  {
    id: 'new-york-soho',
    name: 'New York, SoHo',
    description: 'Our first US flagship — two floors, the full collection, and a community space that hosts a free Saturday morning run club.',
    address: '145 Spring Street, New York, NY 10012',
    hours: 'Mon–Sat 10am–8pm, Sun 11am–7pm',
    image: asset('/media/gym-training-poster.webp'),
  },
  {
    id: 'los-angeles-melrose',
    name: 'Los Angeles, Melrose',
    description: 'Our West Coast home. Drop in for fittings, in-store exclusives, and a rotating calendar of community workouts.',
    address: '8430 Melrose Avenue, Los Angeles, CA 90069',
    hours: 'Mon–Sat 10am–9pm, Sun 11am–7pm',
    image: asset('/media/hero-training-poster.webp'),
  },
]

export const OTHER_STORES = [
  {
    id: 'chicago-river-north',
    name: 'Chicago, River North',
    address: '440 N Clark Street, Chicago, IL 60654',
    hours: 'Mon–Sat 10am–8pm, Sun 11am–6pm',
  },
  {
    id: 'miami-wynwood',
    name: 'Miami, Wynwood',
    address: '250 NW 24th Street, Miami, FL 33127',
    hours: 'Mon–Sun 10am–8pm',
  },
  {
    id: 'austin-south-congress',
    name: 'Austin, South Congress',
    address: '1500 S Congress Avenue, Austin, TX 78704',
    hours: 'Mon–Sat 10am–8pm, Sun 11am–6pm',
  },
  {
    id: 'seattle-capitol-hill',
    name: 'Seattle, Capitol Hill',
    address: '420 Broadway E, Seattle, WA 98102',
    hours: 'Mon–Sat 10am–7pm, Sun 11am–6pm',
  },
  {
    id: 'denver-rino',
    name: 'Denver, RiNo',
    address: '3501 Wazee Street, Denver, CO 80216',
    hours: 'Mon–Sat 10am–7pm, Sun 11am–6pm',
  },
  {
    id: 'boston-back-bay',
    name: 'Boston, Back Bay',
    address: '800 Boylston Street, Boston, MA 02199',
    hours: 'Mon–Sat 10am–8pm, Sun 11am–6pm',
  },
]
