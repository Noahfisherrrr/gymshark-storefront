import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn({ email, password })
      navigate('/account')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Sign In</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-black/20 px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-black/20 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-black py-3 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <p className="mt-4 text-sm text-black/60">
        No account? <Link to="/register" className="underline">Create one</Link>.
      </p>
      <p className="mt-6 text-xs text-black/40">
        Mock auth today, stored only in this browser. Switches to real Supabase Auth
        once VITE_API_PROVIDER=supabase is set.
      </p>
    </div>
  )
}
