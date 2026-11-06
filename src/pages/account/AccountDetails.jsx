import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import Modal from '../../components/ui/Modal'

const RESOLVED_ORDER_STATUSES = new Set(['delivered', 'cancelled'])

export default function AccountDetails() {
  const { user, updateUser, signOut } = useAuth()
  const navigate = useNavigate()
  const [hasPendingOrders, setHasPendingOrders] = useState(false)

  useEffect(() => {
    api.orders.list(user.id).then((orders) => {
      setHasPendingOrders(orders.some((o) => !RESOLVED_ORDER_STATUSES.has(o.status?.toLowerCase())))
    })
  }, [user])
  const [firstName, setFirstName] = useState(user.firstName ?? '')
  const [lastName, setLastName] = useState(user.lastName ?? '')
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ?? '')
  const [email, setEmail] = useState(user.email ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [confirming, setConfirming] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [deleting, setDeleting] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState(null)
  const [deleteSubmitting, setDeleteSubmitting] = useState(false)

  const emailChanged = email !== user.email
  const wantsPasswordChange = newPassword.length > 0
  const needsConfirmation = emailChanged || wantsPasswordChange

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSaved(false)

    if (wantsPasswordChange && newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }
    if (needsConfirmation && !currentPassword) {
      setError('Enter your current password to confirm this change')
      return
    }

    if (needsConfirmation) {
      setConfirming(true)
      return
    }
    applyChanges()
  }

  async function applyChanges() {
    setConfirming(false)
    setSubmitting(true)
    try {
      const nextUser = await api.account.updateProfile(user.id, {
        firstName,
        lastName,
        dateOfBirth,
        email,
        currentPassword,
      })
      if (wantsPasswordChange) {
        await api.account.changePassword(user.id, { currentPassword, newPassword })
      }
      updateUser(nextUser)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setSaved(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteAccount() {
    setDeleteError(null)
    setDeleteSubmitting(true)
    try {
      await api.account.deleteAccount(user.id, { currentPassword: deletePassword })
      await signOut()
      navigate('/')
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleteSubmitting(false)
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border border-black/20 px-3 py-2 text-sm normal-case"
          />
        </label>

        <div className="border-t border-line pt-4">
          <p className="text-xs uppercase text-black/40">Change Password</p>
          <div className="mt-2 space-y-3">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full border border-black/20 px-3 py-2 text-sm"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full border border-black/20 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {needsConfirmation && (
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
        )}

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

      <Modal isOpen={confirming} onRequestClose={() => setConfirming(false)} label="Confirm account changes">
        <div className="w-80 bg-brand-white p-6">
          <h3 className="text-sm font-bold uppercase">Confirm Changes</h3>
          <ul className="mt-3 space-y-1 text-sm text-black/70">
            {emailChanged && <li>Change email to {email}</li>}
            {wantsPasswordChange && <li>Change your password</li>}
          </ul>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={applyChanges}
              disabled={submitting}
              className="bg-brand-black px-4 py-2 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
            >
              {submitting ? 'Confirming…' : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="px-4 py-2 text-sm font-semibold uppercase underline"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <div className="mt-10 max-w-md border-t border-line pt-6">
        <p className="text-xs uppercase text-red-600">Danger Zone</p>
        <p className="mt-2 text-sm text-black/60">
          Permanently delete your account and all associated data. This can't be undone.
        </p>
        {hasPendingOrders ? (
          <p className="mt-3 max-w-md text-sm text-black/60">
            You have an order that hasn't been delivered yet. You can delete your account once every order is
            delivered or cancelled — your order history is kept as a payment record either way.
          </p>
        ) : (
          <button
            type="button"
            onClick={() => {
              setDeleteError(null)
              setDeletePassword('')
              setDeleting(true)
            }}
            className="mt-3 border border-red-600 px-6 py-3 text-sm font-semibold uppercase text-red-600"
          >
            Delete Account
          </button>
        )}
      </div>

      <Modal isOpen={deleting} onRequestClose={() => setDeleting(false)} label="Confirm account deletion">
        <div className="w-80 bg-brand-white p-6">
          <h3 className="text-sm font-bold uppercase text-red-600">Delete Account</h3>
          <p className="mt-2 text-sm text-black/70">
            This permanently deletes your account, addresses, orders, and referral history. This can't be undone.
          </p>
          <input
            type="password"
            placeholder="Current password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            autoComplete="current-password"
            required
            className="mt-4 w-full border border-black/20 px-3 py-2 text-sm"
          />
          {deleteError && <p className="mt-2 text-sm text-red-600">{deleteError}</p>}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleteSubmitting || !deletePassword}
              className="bg-red-600 px-4 py-2 text-sm font-semibold uppercase text-white disabled:opacity-40"
            >
              {deleteSubmitting ? 'Deleting…' : 'Delete Account'}
            </button>
            <button
              type="button"
              onClick={() => setDeleting(false)}
              className="px-4 py-2 text-sm font-semibold uppercase underline"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
