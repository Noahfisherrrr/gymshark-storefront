import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SocialSignInButtons from '../components/auth/SocialSignInButtons'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    try {
      await signUp({ firstName, lastName, dateOfBirth, email, password })
      navigate('/account')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Create Account</h1>
      <div className="mt-6">
        <SocialSignInButtons onError={setError} />
      </div>
      <div className="my-6 flex items-center gap-3 text-xs uppercase text-black/40">
        <span className="h-px flex-1 bg-black/10" />
        or
        <span className="h-px flex-1 bg-black/10" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-1/2 border border-black/20 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-1/2 border border-black/20 px-3 py-2 text-sm"
          />
        </div>
        <label className="block text-xs uppercase text-black/40">
          Date of birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className="mt-1 w-full border border-black/20 px-3 py-2 text-sm normal-case"
          />
        </label>
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
          minLength={6}
          className="w-full border border-black/20 px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border border-black/20 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-black py-3 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
        >
          {submitting ? 'Creating account…' : 'Create Account'}
        </button>
      </form>
      <p className="mt-4 text-sm text-black/60">
        Already have an account? <Link to="/login" className="underline">Sign in</Link>.
      </p>
    </div>
  )
}
