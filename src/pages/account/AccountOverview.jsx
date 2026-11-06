import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { formatDate, formatPrice } from '../../lib/format'
import { ChevronRightIcon } from '../../components/header/icons'

function OrdersIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="h-36 w-36" aria-hidden="true">
      <circle cx="80" cy="80" r="56" className="fill-black/5" />
      <circle cx="46" cy="44" r="2" className="fill-black/20" />
      <circle cx="30" cy="92" r="2" className="fill-black/20" />
      <circle cx="128" cy="100" r="2" className="fill-black/20" />
      <path d="M118 50l2.5 5.5 5.5 2.5-5.5 2.5-2.5 5.5-2.5-5.5-5.5-2.5 5.5-2.5z" className="fill-black/25" />
      <path d="M38 64l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z" className="fill-black/25" />
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/60">
        <line x1="40" y1="54" x2="120" y2="54" />
        <path d="M58 54v14l-7 42h10l5-32 5 32h10l-7-42V54" />
        <path d="M70 54h-9l-6 7 5 6 6-5v38h18V62l6 5 5-6-6-7h-9a5 5 0 0 1-10 0z" />
        <path d="M94 56h26v6l-5 4v30H99V66l-5-4z" />
      </g>
    </svg>
  )
}

function SectionCard({ to, title, description, children }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-4 bg-surface-subtle p-6 transition-colors hover:bg-black/5"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-wide">{title}</p>
        {description && <p className="mt-1 max-w-sm text-sm text-black/60">{description}</p>}
        {children}
      </div>
      <ChevronRightIcon size={20} className="shrink-0 text-black/60" />
    </Link>
  )
}

export default function AccountOverview() {
  const { user } = useAuth()
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    api.orders.list(user.id).then(setOrders)
  }, [user])

  const recentOrders = orders?.slice(0, 3) ?? []

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="bg-surface-subtle p-6">
        <p className="text-sm font-bold uppercase tracking-wide">Orders</p>

        {orders === null ? null : orders.length === 0 ? (
          <div className="mt-2 flex flex-col items-center text-center">
            <OrdersIllustration />
            <p className="mt-2 max-w-xs text-sm text-black/60">
              You haven't made any orders yet. When you make an order it'll show it up here.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/shop?category=women"
                className="bg-brand-black px-6 py-3 text-sm font-semibold uppercase text-brand-white"
              >
                Shop Womens
              </Link>
              <Link
                to="/shop?category=men"
                className="bg-brand-black px-6 py-3 text-sm font-semibold uppercase text-brand-white"
              >
                Shop Mens
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-4 divide-y divide-line">
              {recentOrders.map((order) => (
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
            <Link
              to="/account/orders"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase underline"
            >
              View Order History
              <ChevronRightIcon size={16} />
            </Link>
          </>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <SectionCard to="/account/returns" title="Returns" description="Quick, easy and simple returns with Loop Returns." />
        <SectionCard to="/account/addresses" title="Address Book" />
        <SectionCard
          to="/account/refer-a-friend"
          title="Refer a Friend"
          description="Introduce your friends and give them £10 off, and to say thanks we'll give you £10 off your next order too."
        />
        <SectionCard to="/account/details" title="Account Details" />
      </div>
    </div>
  )
}
