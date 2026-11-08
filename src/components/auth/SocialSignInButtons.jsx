import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.55-1.84.87-3.06.87-2.36 0-4.37-1.6-5.08-3.75H.9v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.92 10.68A5.4 5.4 0 0 1 3.64 9c0-.58.1-1.15.28-1.68V4.99H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.01l3.02-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .9 4.99l3.02 2.33C4.63 5.17 6.64 3.58 9 3.58z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 814 1000" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M788 759c-14 33-30 63-50 92-27 39-49 66-65 81-26 25-54 38-83 39-21 0-47-6-77-18-30-12-57-18-82-18-26 0-54 6-85 18-31 12-56 19-75 20-28 1-56-12-84-39-17-16-40-44-68-84-30-43-55-93-74-151-21-62-32-122-32-180 0-66 14-123 43-171 22-39 52-69 89-92 37-23 77-35 120-36 23 0 54 7 92 21 38 14 62 21 73 21 8 0 34-8 77-24 41-15 75-21 103-19 76 6 133 36 171 90-68 41-102 99-101 174 0 58 21 107 63 146 20 19 42 34 67 44-5 15-11 29-17 43zM603 25c0 49-18 95-54 137-43 51-96 80-154 75a151 151 0 0 1-1-19c0-47 20-96 56-136 18-20 41-37 68-50 27-13 53-20 77-21 1 5 1 10 1 14z" />
    </svg>
  )
}

// Google/Apple verify the email themselves, but the client wants our own
// confirmation email as the final authorization step too (see AuthContext
// and onAuthStateChange in providers/supabase/index.js). Supabase sends a
// real email and confirms automatically when its link is clicked.
export default function SocialSignInButtons({ onError }) {
  const { signInWithOAuth, pendingConfirmationEmail } = useAuth()
  const [pending, setPending] = useState(null)

  async function handleClick(provider) {
    onError?.(null)
    setPending(provider)
    try {
      await signInWithOAuth(provider)
    } catch (err) {
      onError?.(err.message)
    } finally {
      setPending(null)
    }
  }

  if (pendingConfirmationEmail) {
    return (
      <div className="border border-black/20 p-4 text-sm">
        <p>
          We sent a confirmation link to <strong>{pendingConfirmationEmail}</strong>. Click it to
          finish signing in and authorize this account.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => handleClick('google')}
        disabled={pending !== null}
        className="flex w-full items-center justify-center gap-2 border border-black/20 py-3 text-sm font-semibold disabled:opacity-40"
      >
        <GoogleIcon />
        {pending === 'google' ? 'Connecting…' : 'Continue with Google'}
      </button>
      <button
        type="button"
        onClick={() => handleClick('apple')}
        disabled={pending !== null}
        className="flex w-full items-center justify-center gap-2 border border-black/20 py-3 text-sm font-semibold disabled:opacity-40"
      >
        <AppleIcon />
        {pending === 'apple' ? 'Connecting…' : 'Continue with Apple'}
      </button>
    </div>
  )
}
