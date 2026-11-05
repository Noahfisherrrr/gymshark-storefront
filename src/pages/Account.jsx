import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) api.orders.list(user.id).then(setOrders)
  }, [user])

  if (loading) return <div className="px-4 py-10 text-center text-sm">Loading…</div>

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center lg:px-8">
        <h1 className="text-2xl font-bold uppercase">My Account</h1>
        <p className="mt-4 text-sm text-black/50">
          <Link to="/login" className="underline">Sign in</Link> to view your account.
        </p>
      </div>
    )
  }

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase">My Account</h1>
        <button type="button" onClick={handleSignOut} className="text-sm underline">
          Sign Out
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase">Profile</p>
        <p className="mt-1 text-sm">{user.name}</p>
        <p className="text-sm text-black/60">{user.email}</p>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase">Order History</p>
        {orders.length === 0 ? (
          <p className="mt-1 text-sm text-black/50">No orders yet.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {orders.map((order) => (
              <li key={order.id}>
                #{order.id} — ${order.total.toFixed(2)} — {order.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-8 text-xs text-black/50">
        Saved addresses and return requests pending client confirmation of shipping/
        returns approach (Brief.md #8).
      </p>
    </div>
  )
}
