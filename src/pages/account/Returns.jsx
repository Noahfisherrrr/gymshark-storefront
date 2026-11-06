import { useEffect, useState } from 'react'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { formatDate } from '../../lib/format'

export default function Returns() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [returns, setReturns] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderId, setOrderId] = useState('')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([api.orders.list(user.id), api.account.listReturns(user.id)]).then(([orderList, returnList]) => {
      setOrders(orderList)
      setReturns(returnList)
      setLoading(false)
    })
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const next = await api.account.requestReturn(user.id, { orderId, reason })
      setReturns(next)
      setOrderId('')
      setReason('')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return null

  return (
    <div>
      <h2 className="text-lg font-bold uppercase">Returns</h2>

      {returns.length === 0 ? (
        <p className="mt-2 text-sm text-black/50">No return requests yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {returns.map((ret) => (
            <li key={ret.id} className="py-3 text-sm">
              <p className="font-semibold">
                Order #{ret.orderId} — {ret.status}
              </p>
              <p className="text-black/50">{ret.reason}</p>
              <p className="text-black/40">{formatDate(ret.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}

      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-black/50">You need a past order before you can start a return.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
          <label className="block text-xs uppercase text-black/40">
            Order
            <select
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              className="mt-1 w-full border border-black/20 bg-brand-white px-3 py-2 text-sm normal-case"
            >
              <option value="" disabled>
                Select an order
              </option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  #{order.id} — {formatDate(order.createdAt)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs uppercase text-black/40">
            Reason
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={3}
              className="mt-1 w-full border border-black/20 px-3 py-2 text-sm normal-case"
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="bg-brand-black px-6 py-3 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
          >
            {submitting ? 'Submitting…' : 'Start Return'}
          </button>
        </form>
      )}
    </div>
  )
}
