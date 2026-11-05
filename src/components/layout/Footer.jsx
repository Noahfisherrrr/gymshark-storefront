const FOOTER_COLUMNS = [
  {
    title: 'Help',
    links: ['Contact Us', 'Order Tracking', 'Shipping & Delivery', 'Returns'],
  },
  {
    title: 'About',
    links: ['Our Story', 'Sustainability', 'Careers'],
  },
  {
    title: 'Legal',
    links: ['Terms & Conditions', 'Privacy Policy', 'Accessibility'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-brand-black text-brand-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-extrabold uppercase">Brand Name</p>
          <p className="mt-2 text-sm text-white/60">
            Legal name, address and support contact pending client details (Brief.md #1).
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold uppercase tracking-wide">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {col.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-4 text-xs text-white/50 lg:px-8">
        © {new Date().getFullYear()} Brand Name. All rights reserved.
      </div>
    </footer>
  )
}
