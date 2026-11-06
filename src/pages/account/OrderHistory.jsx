import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { formatDate, formatPrice } from '../../lib/format'
import { ChevronLeftIcon } from '../../components/header/icons'

export default function OrderHistory() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    api.orders.list(user.id).then(setOrders)
  }, [user])

  return (
    <div>
      <Link to="/account" className="mb-4 inline-flex items-center gap-1 text-sm uppercase text-black/60 hover:text-brand-black">
        <ChevronLeftIcon size={16} />
        Account
      </Link>
      <h2 className="text-lg font-bold uppercase">Order History</h2>
      {orders.length === 0 ? (
        <p className="mt-2 text-sm text-black/50">No orders yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {orders.map((order) => (
            <li key={order.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-black/50">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p>{formatPrice(order.total)}</p>
                <p className="text-black/50">{order.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
