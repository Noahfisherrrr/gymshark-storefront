import { useEffect, useState } from 'react'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { formatDate } from '../../lib/format'

const NAV_ITEMS = [
  { to: '/account', label: 'Account Details', end: true },
  { to: '/account/addresses', label: 'Address Book' },
  { to: '/account/orders', label: 'Order History' },
  { to: '/account/returns', label: 'Returns' },
  { to: '/account/refer-a-friend', label: 'Refer a Friend' },
]

function navLinkClass({ isActive }) {
  return `block py-2 text-sm uppercase ${isActive ? 'font-semibold text-brand-black' : 'text-black/60 hover:text-brand-black'}`
}

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
      <h1 className="text-2xl font-bold uppercase">My Account</h1>

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

      <div className="mt-8 flex flex-col gap-10 lg:flex-row">
        <nav className="shrink-0 lg:w-56">
          <ul className="divide-y divide-line border-y border-line lg:divide-y-0 lg:border-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 lg:mt-4 lg:border-t lg:border-line lg:pt-4">
              <button type="button" onClick={handleSignOut} className="py-2 text-sm uppercase underline">
                Sign Out
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
