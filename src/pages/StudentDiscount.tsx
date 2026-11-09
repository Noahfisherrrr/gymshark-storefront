import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import { useAuth } from '../context/AuthContext'
import { asset } from '../config/assetVersion'

const STEPS = [
  'Create a free account with our student verification partner.',
  'Verify your student status — takes about 2 minutes.',
  'Reveal your code and enter it at checkout.',
]

function TermsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      label="Student discount terms and conditions"
      className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-6 text-ink"
    >
      <h2 className="font-display text-lg font-extrabold uppercase">Terms &amp; Conditions</h2>
      <h3 className="mt-4 text-sm font-bold uppercase">About This Discount</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/60">
        <li>12% off applies to full-price items on our US website only.</li>
        <li>Can't be combined with other promo or discount codes.</li>
        <li>One active code per verified student, re-verified every 12 months.</li>
        <li>We reserve the right to withdraw the discount in cases of suspected misuse.</li>
      </ul>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 text-xs uppercase text-muted underline transition-colors duration-200 hover:text-ink"
      >
        Close
      </button>
    </Modal>
  )
}

// gymshark.com's /pages/studentbeans. We don't have a student-verification
// integration yet (Brief.md #5), so "Sign Up / Log In" routes into our own
// auth flow rather than a real third-party verifier — swap once the client
// picks a provider. Discount rate (12%) matches the ads bar/nav copy
// elsewhere in the site (config/navigation.js).
export default function StudentDiscount() {
  const { user } = useAuth()
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <div className="relative">
      <div className="relative min-h-[560px] w-full overflow-hidden bg-brand-black">
        <img src={asset('/media/hero-training-poster.webp')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="relative mx-auto flex max-w-7xl px-4 py-16 lg:px-8">
          <div className="w-full max-w-sm bg-white/95 p-8">
            <h1 className="text-2xl font-extrabold uppercase leading-[1.1]">12% Student Discount</h1>
            <button type="button" onClick={() => setTermsOpen(true)} className="mt-3 text-sm underline">
              See discount Terms &amp; Conditions
            </button>

            <h2 className="mt-8 text-base font-semibold">How to get your code</h2>
            <ol className="mt-4 space-y-4">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-black text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>

            <Link
              to={user ? '/account' : '/register'}
              className="mt-8 block bg-brand-black px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition-opacity duration-200 hover:opacity-85"
            >
              Sign Up / Log In
            </Link>
            <p className="mt-3 text-center text-xs text-muted">About 2 mins to verify</p>

            <p className="mt-6 text-center text-xs text-muted">
              Need help? Visit our{' '}
              <Link to="/help" className="underline">
                help center
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 text-center lg:px-8">
        <p className="text-sm text-black/60">
          This discount is available to current students 16+ at an accredited college or university. Already have a code? Enter it at
          checkout in the promo code field.
        </p>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  )
}
