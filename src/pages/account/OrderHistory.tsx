import { useEffect, useState } from 'react'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { formatDate, formatPrice } from '../../lib/format'
import { productThumb } from '../../lib/images'
import BackToAccountLink from '../../components/account/BackToAccountLink'
import type { Order } from '../../api/contract'

const SHIPPING_ETA: Record<string, string> = {
  standard: '3–5 business days',
  express: '1–2 business days',
}

const STATUS_LABEL: Record<string, string> = {
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned',
}

interface OrderCardProps {
  order: Order
  productImages: Record<string, string | null>
}

function OrderCard({ order, productImages }: OrderCardProps) {
  const { addItem, openMiniBag } = useCart()
  const [buying, setBuying] = useState(false)

  const address = order.shippingAddress
  const eta = (address && SHIPPING_ETA[address.shippingMethod]) || SHIPPING_ETA.standard

  async function handleBuyAgain() {
    setBuying(true)
    try {
      for (const item of order.items) {
        await addItem({ productId: item.productId, variantId: item.variantId, quantity: item.quantity })
      }
      openMiniBag()
    } finally {
      setBuying(false)
    }
  }

  return (
    <li className="border border-line p-4 text-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Order #{order.id.slice(0, 8).toUpperCase()}</p>
          <p className="text-black/50">{formatDate(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formatPrice(order.total)}</p>
          <p className="text-black/50">{STATUS_LABEL[order.status] || order.status}</p>
        </div>
      </div>

      {/* Item thumbnails */}
      <div className="mt-3 flex flex-wrap gap-2">
        {order.items.map((item, i) => (
          <div
            key={item.id ?? i}
            title={`${item.name} — ${item.size}/${item.color}`}
            className="h-14 w-11 shrink-0 overflow-hidden rounded-xs bg-surface-subtle"
          >
            {productImages[item.productId] && (
              <img
                src={productThumb(productImages[item.productId]) ?? undefined}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Delivery information */}
      {address && (
        <div className="mt-3 border-t border-line pt-3 text-black/70">
          <p className="text-xs font-bold uppercase tracking-wider text-black/50">Delivery</p>
          <p className="mt-1">
            {address.firstName} {address.lastName}
          </p>
          <p>
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ''}
          </p>
          <p>
            {address.city}
            {address.state ? `, ${address.state}` : ''} {address.postcode}
          </p>
          <p>{address.country}</p>
          <p className="mt-1 text-black/50">Est. delivery: {eta}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleBuyAgain}
        disabled={buying}
        className="mt-4 h-10 w-full rounded-xs bg-black text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-black/90 disabled:opacity-50"
      >
        {buying ? 'Adding…' : 'Buy It Again'}
      </button>
    </li>
  )
}

export default function OrderHistory() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [productImages, setProductImages] = useState<Record<string, string | null>>({})

  useEffect(() => {
    if (!user) return
    api.orders.list(user.id).then(setOrders)
    api.products.list().then((products) => {
      setProductImages(Object.fromEntries(products.map((p) => [p.id, p.image])))
    })
  }, [user])

  return (
    <div>
      <BackToAccountLink />
      <h2 className="text-lg font-bold uppercase">Order History</h2>
      {orders.length === 0 ? (
        <p className="mt-2 text-sm text-black/50">No orders yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} productImages={productImages} />
          ))}
        </ul>
      )}
    </div>
  )
}
