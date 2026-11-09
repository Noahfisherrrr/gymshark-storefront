import { useState, type FormEvent } from 'react'
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
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  }
  const passwordMetCount = Object.values(passwordChecks).filter(Boolean).length
  const passwordStrength =
    password.length === 0
      ? null
      : passwordMetCount <= 1
        ? 'weak'
        : passwordMetCount === 2
          ? 'medium'
          : 'strong'
  const passwordValid = passwordChecks.length && passwordChecks.uppercase && passwordChecks.number
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setError(null)
    if (!passwordValid) {
      setError('Password must be at least 8 characters and include a capital letter and a number')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    try {
      await signUp({ firstName, lastName, dateOfBirth, email, password })
      navigate('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
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
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
          {password.length > 0 && (
            <div className="mt-2 space-y-1.5">
              <div className="flex h-1 gap-1">
                {['weak', 'medium', 'strong'].map((level, i) => {
                  const strengthRank = passwordStrength ? { weak: 1, medium: 2, strong: 3 }[passwordStrength] : 0
                  const filled = i < strengthRank
                  const color =
                    passwordStrength === 'strong'
                      ? 'bg-green-600'
                      : passwordStrength === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  return (
                    <span
                      key={level}
                      className={`h-full flex-1 rounded-full transition-colors ${filled ? color : 'bg-black/10'}`}
                    />
                  )
                })}
              </div>
              <p
                className={`text-xs font-medium capitalize ${
                  passwordStrength === 'strong'
                    ? 'text-green-600'
                    : passwordStrength === 'medium'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}
              >
                {passwordStrength} password
              </p>
              <ul className="space-y-0.5 text-xs text-black/50">
                <li className={passwordChecks.length ? 'text-green-600' : ''}>
                  {passwordChecks.length ? '✓' : '○'} At least 8 characters
                </li>
                <li className={passwordChecks.uppercase ? 'text-green-600' : ''}>
                  {passwordChecks.uppercase ? '✓' : '○'} One capital letter
                </li>
                <li className={passwordChecks.number ? 'text-green-600' : ''}>
                  {passwordChecks.number ? '✓' : '○'} One number
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
          {confirmPassword.length > 0 && (
            <p className={`mt-1.5 text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
              {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
            </p>
          )}
        </div>
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
