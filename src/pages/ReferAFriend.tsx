import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STEPS = [
  { title: 'Share your link', text: 'Grab your personal referral link from your account and send it to friends however you like.' },
  { title: 'They get 10% off', text: 'Your friend gets 10% off their first order when they shop through your link.' },
  { title: 'You earn a reward', text: 'For every 5 friends who place an order, you unlock 20% off your next order, or $25 in wallet credit — your choice.' },
]

// gymshark.com's /pages/refer-a-friend. Program terms (10% for friends, a
// reward every 5 referrals) match the brief the client gave for this page —
// everything else (hero imagery, exact reward mechanics/fraud rules) is
// placeholder pending their referral provider (Brief.md #5).
export default function ReferAFriend() {
  const { user } = useAuth()

  return (
    <div>
      <section className="bg-brand-black px-4 py-20 text-center text-brand-white lg:py-28">
        <h1 className="font-display text-3xl font-extrabold uppercase lg:text-4xl">Give 10%, Earn Rewards</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
          Share Brand Name with your friends. They get 10% off their first order — and for every 5 friends who shop, you get 20% off or
          $25 in wallet credit.
        </p>
        <div className="mt-8">
          {user ? (
            <Link
              to="/account/refer-a-friend"
              className="inline-flex items-center bg-white px-8 py-4 text-sm font-semibold uppercase text-brand-black transition-opacity duration-200 hover:opacity-85"
            >
              Get Your Link
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center bg-white px-8 py-4 text-sm font-semibold uppercase text-brand-black transition-opacity duration-200 hover:opacity-85"
            >
              Sign Up / Log In
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h2 className="text-center text-lg font-bold uppercase">How It Works</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center sm:text-left">
              <p className="font-display text-3xl font-extrabold text-ink">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-sm font-bold uppercase">{step.title}</h3>
              <p className="mt-2 text-sm text-black/60">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <h2 className="text-lg font-bold uppercase">Terms</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/60">
            <li>Referral discounts apply to a friend's first order of $50 or more.</li>
            <li>Rewards are credited once your friend's order has been delivered and isn't returned in full.</li>
            <li>Referral rewards can't be combined with other promo or discount codes.</li>
            <li>We reserve the right to withhold rewards earned through fraudulent or abusive referral activity.</li>
          </ul>
        </div>

        <p className="mt-10 text-sm text-muted">
          Questions about your referrals? Visit the{' '}
          <Link to="/help" className="underline">
            Help Centre
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
