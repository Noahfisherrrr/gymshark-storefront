import { useState } from 'react'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'

export default function AccountDetails() {
  const { user } = useAuth()
  const [firstName, setFirstName] = useState(user.firstName ?? '')
  const [lastName, setLastName] = useState(user.lastName ?? '')
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ?? '')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSaved(false)
    setSubmitting(true)
    try {
      await api.account.updateProfile(user.id, { firstName, lastName, dateOfBirth })
      setSaved(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold uppercase">Account Details</h2>
      <form onSubmit={handleSubmit} className="mt-4 max-w-md space-y-4">
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
            className="mt-1 w-full border border-black/20 px-3 py-2 text-sm normal-case"
          />
        </label>
        <label className="block text-xs uppercase text-black/40">
          Email
          <input
            type="email"
            value={user.email}
            disabled
            className="mt-1 w-full border border-black/10 bg-surface-subtle px-3 py-2 text-sm normal-case text-black/50"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-black/60">Saved.</p>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-brand-black px-6 py-3 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
        >
          {submitting ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
