// Careers hub content — placeholder job postings and copy until the client
// wires up a real ATS/job board (Brief.md #4). Shape mirrors what a real
// careers feed would return, so swapping in a live source later is a data
// change, not a page rewrite.
export const VACANCIES = [
  {
    department: 'Retail',
    roles: [
      { title: 'Store Team Member', location: 'New York, NY', type: 'Part Time' },
      { title: 'Assistant Store Manager', location: 'Los Angeles, CA', type: 'Full Time' },
    ],
  },
  {
    department: 'Product & Design',
    roles: [{ title: 'Apparel Designer, Womens', location: 'Remote (US)', type: 'Full Time' }],
  },
  {
    department: 'Marketing',
    roles: [
      { title: 'Social Media Coordinator', location: 'Remote (US)', type: 'Full Time' },
      { title: 'Content Writer', location: 'Remote (US)', type: 'Full Time' },
    ],
  },
  {
    department: 'Technology',
    roles: [{ title: 'Frontend Engineer', location: 'Remote (US)', type: 'Full Time' }],
  },
]

export const BENEFITS = [
  { title: 'Health Coverage', text: 'Comprehensive medical, dental and vision for you and your family.' },
  { title: 'Generous Time Off', text: 'Paid vacation, your birthday off, and flexible holidays.' },
  { title: 'Product Discount', text: 'A generous employee discount on everything we sell.' },
  { title: 'Wellbeing Support', text: 'Mental health resources and a free gym membership contribution.' },
]

export const CAREERS_FAQ = [
  {
    q: 'Do you offer remote roles?',
    a: 'Many of our head-office roles are remote-first within the US. Retail roles are on-site at the relevant store.',
  },
  {
    q: 'What does your interview process look like?',
    a: 'Most roles involve an initial chat with our talent team, a role-specific interview, and a final conversation with the hiring manager — usually 3 stages in total.',
  },
  {
    q: 'Do you offer internships or graduate programs?',
    a: 'Not yet, but we’re building these out. Keep an eye on this page for updates.',
  },
]
