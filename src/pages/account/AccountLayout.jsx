import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { formatDate } from '../../lib/format'

export default function AccountLayout() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [offer, setOffer] = useState(null)

  useEffect(() => {
    if (user) api.account.getActiveOffer(user.id).then(setOffer)
  }, [user])

  if (loading) return <div className="px-4 py-10 text-center text-sm">Loading…</div>

  // Signed-out visitors go straight to login, as gymshark.com's /account does.
  if (!user) return <Navigate to="/login" replace />

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold uppercase">My Account</h1>
        <button type="button" onClick={handleSignOut} className="text-sm uppercase underline">
          Sign Out
        </button>
      </div>

      {offer && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border border-brand-black bg-surface-subtle px-4 py-3">
          <div>
            <p className="text-sm font-semibold uppercase">{offer.description}</p>
            <p className="text-xs text-black/50">
              Code <span className="font-semibold tracking-wide">{offer.code}</span>
              {offer.expiresAt && <> — expires {formatDate(offer.expiresAt)}</>}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  )
}
