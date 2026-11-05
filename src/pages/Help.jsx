import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Target for the header's Help / Returns / Student Discount links. Copy and
// policies are pending the client (Brief.md #10, #11) — gymshark.com sends
// these to an external support hub; swap the links if the client has one.
const SECTIONS = [
  { id: 'returns', title: 'Returns', body: 'Returns policy pending client approval.' },
  { id: 'shipping', title: 'Shipping', body: 'Shipping countries, rates and timelines pending client input.' },
  { id: 'student-discount', title: 'Student Discount', body: 'Student discount details pending client input.' },
]

export default function Help() {
  const { hash } = useLocation()

  // The router doesn't jump to #anchors on its own.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Help</h1>
      <p className="mt-2 text-sm text-black/60">
        Track an order from <Link to="/account" className="underline">your account</Link>.
      </p>

      {SECTIONS.map((section) => (
        <section key={section.id} id={section.id} className="mt-8 scroll-mt-32">
          <h2 className="text-lg font-bold uppercase">{section.title}</h2>
          <p className="mt-1 text-sm text-black/50">{section.body}</p>
        </section>
      ))}
    </div>
  )
}
