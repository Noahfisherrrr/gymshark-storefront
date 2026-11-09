import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import { useCartLines, type CartLine } from '../hooks/useCartLines'
import { formatPrice } from '../lib/format'
import { productThumb } from '../lib/images'
import type { DiscountResult, GuestOrder, Order, ShippingAddress } from '../api/contract'

// ── Step indicators ─────────────────────────────────────────────────────────
const STEPS = ['Shipping', 'Review', 'Confirmed']

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors ${
                  done
                    ? 'bg-black border-black text-white'
                    : active
                    ? 'border-black bg-white text-black'
                    : 'border-black/20 bg-white text-black/30'
                }`}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${
                  active ? 'text-black' : done ? 'text-black/60' : 'text-black/30'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px flex-1 mx-3 mb-5 transition-colors ${
                  done ? 'bg-black' : 'bg-black/15'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Shipping form ────────────────────────────────────────────────────────────
function ShippingForm({
  onNext,
  initialValues,
}: {
  onNext: (values: ShippingAddress) => void
  initialValues: ShippingAddress | null
}) {
  const [form, setForm] = useState<ShippingAddress>(
    initialValues || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'United States',
      shippingMethod: 'standard',
    },
  )

  function field(name: keyof ShippingAddress) {
    return {
      value: form[name],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [name]: e.target.value })),
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    onNext(form)
  }

  const inputCls =
    'w-full border border-black/20 rounded-xs px-3 py-2.5 text-sm focus:border-black focus:outline-none'
  const labelCls = 'block text-xs font-bold uppercase tracking-wider text-black mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-lg font-extrabold uppercase tracking-tight">Shipping Address</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>First Name *</label>
          <input required className={inputCls} placeholder="John" {...field('firstName')} />
        </div>
        <div>
          <label className={labelCls}>Last Name *</label>
          <input required className={inputCls} placeholder="Smith" {...field('lastName')} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Email *</label>
          <input required type="email" className={inputCls} placeholder="you@example.com" {...field('email')} />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input type="tel" className={inputCls} placeholder="+1 555 000 0000" {...field('phone')} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Address Line 1 *</label>
        <input required className={inputCls} placeholder="123 Main St" {...field('line1')} />
      </div>
      <div>
        <label className={labelCls}>Address Line 2</label>
        <input className={inputCls} placeholder="Apt, suite, unit…" {...field('line2')} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>City *</label>
          <input required className={inputCls} placeholder="New York" {...field('city')} />
        </div>
        <div>
          <label className={labelCls}>State *</label>
          <input required className={inputCls} placeholder="NY" {...field('state')} />
        </div>
        <div>
          <label className={labelCls}>ZIP Code *</label>
          <input required className={inputCls} placeholder="10001" {...field('postcode')} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Country</label>
        <select className={inputCls} {...field('country')}>
          {['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Netherlands', 'Sweden', 'Japan', 'UAE'].map(
            (c) => (
              <option key={c}>{c}</option>
            ),
          )}
        </select>
      </div>

      {/* Shipping method */}
      <div>
        <p className={labelCls}>Shipping Method</p>
        <div className="space-y-2">
          {[
            { id: 'standard' as const, label: 'Standard Shipping', eta: '3–5 business days', price: 0 },
            { id: 'express' as const, label: 'Express Shipping', eta: '1–2 business days', price: 9.99 },
          ].map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center justify-between rounded-xs border p-3.5 text-sm transition ${
                form.shippingMethod === opt.id
                  ? 'border-black bg-black/5'
                  : 'border-black/20 hover:border-black/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shippingMethod"
                  value={opt.id}
                  checked={form.shippingMethod === opt.id}
                  onChange={() => setForm((f) => ({ ...f, shippingMethod: opt.id }))}
                  className="accent-black"
                />
                <div>
                  <p className="font-semibold">{opt.label}</p>
                  <p className="text-xs text-black/50">{opt.eta}</p>
                </div>
              </div>
              <span className="font-bold">{opt.price === 0 ? 'FREE' : formatPrice(opt.price)}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-black text-white text-sm font-extrabold uppercase tracking-wider rounded-xs hover:bg-black/90 transition"
      >
        Continue to Review
      </button>
    </form>
  )
}

// ── Order review ─────────────────────────────────────────────────────────────
function OrderReview({
  shipping,
  lines,
  subtotal,
  discount,
  onBack,
  onPlace,
  placing,
}: {
  shipping: ShippingAddress
  lines: CartLine[]
  subtotal: number
  discount: DiscountResult | null
  onBack: () => void
  onPlace: () => void
  placing: boolean
}) {
  const shippingCost = shipping.shippingMethod === 'express' ? 9.99 : 0
  const discountAmount = discount?.valid ? subtotal * discount.amountOff : 0
  const total = subtotal + shippingCost - discountAmount

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-extrabold uppercase tracking-tight">Review Your Order</h2>

      {/* Items */}
      <div className="divide-y divide-black/10 rounded-xs border border-black/10">
        {lines.map((line) => (
          <div key={line.id} className="flex items-center gap-3 p-4">
            <div className="h-16 w-12 shrink-0 overflow-hidden bg-surface-subtle rounded-xs">
              {line.product.image && (
                <img src={productThumb(line.product.image)} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{line.product.name}</p>
              <p className="text-xs text-black/50">
                {line.variant.size} / {line.variant.color} · Qty {line.quantity}
              </p>
            </div>
            <p className="text-sm font-bold shrink-0">{formatPrice(line.lineTotal)}</p>
          </div>
        ))}
      </div>

      {/* Ship to */}
      <div className="rounded-xs border border-black/10 p-4 text-sm space-y-0.5">
        <p className="text-xs font-bold uppercase tracking-wider text-black/50 mb-2">Ship To</p>
        <p className="font-semibold">
          {shipping.firstName} {shipping.lastName}
        </p>
        <p className="text-black/70">{shipping.line1}{shipping.line2 ? `, ${shipping.line2}` : ''}</p>
        <p className="text-black/70">
          {shipping.city}, {shipping.state} {shipping.postcode}
        </p>
        <p className="text-black/70">{shipping.country}</p>
        <p className="text-black/70 mt-1">{shipping.email}</p>
      </div>

      {/* Totals */}
      <div className="space-y-1.5 text-sm border-t border-black/10 pt-4">
        <div className="flex justify-between">
          <span className="text-black/60">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Discount</span>
            <span>−{formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-black/60">Shipping</span>
          <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
        </div>
        <div className="flex justify-between text-base font-extrabold border-t border-black/10 pt-2 mt-2">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Payment notice */}
      <div className="rounded-xs bg-black/4 border border-black/10 p-4 text-xs text-black/60 leading-relaxed">
        <span className="font-bold text-black">Demo store — no payment is taken.</span> This is a simulated
        checkout. No card details are required and you will not be charged.
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-12 flex-1 border border-black/25 text-sm font-bold uppercase tracking-wider rounded-xs hover:border-black transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onPlace}
          disabled={placing}
          className="h-12 flex-[2] bg-black text-white text-sm font-extrabold uppercase tracking-wider rounded-xs hover:bg-black/90 disabled:opacity-50 transition"
        >
          {placing ? 'Placing order…' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

// ── Confirmation ─────────────────────────────────────────────────────────────
function Confirmation({ order, shipping }: { order: Order | GuestOrder | null; shipping: ShippingAddress }) {
  const navigate = useNavigate()
  return (
    <div className="text-center space-y-6 py-6">
      {/* Tick */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight">Order Confirmed!</h2>
        <p className="mt-1 text-sm text-black/60">
          Thank you, {shipping.firstName}. Your order has been placed.
        </p>
      </div>

      <div className="rounded-xs border border-black/10 bg-surface-subtle p-5 text-sm text-left space-y-2 mx-auto max-w-xs">
        <div className="flex justify-between">
          <span className="text-black/50 font-medium">Order number</span>
          <span className="font-extrabold tracking-wide">{order?.id?.slice(0, 8).toUpperCase() ?? 'GS-' + Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/50 font-medium">Shipping to</span>
          <span className="font-semibold">{shipping.city}, {shipping.country}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/50 font-medium">Est. delivery</span>
          <span className="font-semibold">
            {shipping.shippingMethod === 'express' ? '1–2 business days' : '3–5 business days'}
          </span>
        </div>
      </div>

      <p className="text-xs text-black/50">
        A confirmation email will be sent to <strong>{shipping.email}</strong>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={() => navigate('/account/orders')}
          className="h-11 px-8 border border-black text-sm font-bold uppercase tracking-wider rounded-xs hover:bg-black hover:text-white transition"
        >
          View Orders
        </button>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="h-11 px-8 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-xs hover:bg-black/90 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function Checkout() {
  const location = useLocation()
  const { lines, subtotal } = useCartLines()
  const { clear } = useCart()

  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState<ShippingAddress | null>(null)
  const [order, setOrder] = useState<Order | GuestOrder | null>(null)
  const [placing, setPlacing] = useState(false)
  const [placeError, setPlaceError] = useState<string | null>(null)

  // Discount passed in via location state from Cart (if applied)
  const locationState = location.state as { discount?: DiscountResult | null } | null
  const discount = locationState?.discount ?? null

  if (lines.length === 0 && step < 2) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 lg:px-8 text-center">
        <p className="text-sm text-black/50">
          Your cart is empty.{' '}
          <Link to="/shop" className="underline">
            Continue shopping
          </Link>
        </p>
      </div>
    )
  }

  async function handlePlaceOrder(): Promise<void> {
    if (!shipping) return
    setPlaceError(null)
    setPlacing(true)
    try {
      const result = await api.orders.ghostCheckout({ shipping, lines, subtotal, discount })
      await clear()
      setOrder(result)
      setStep(2)
    } catch (err) {
      setPlaceError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold uppercase tracking-tight">Checkout</h1>
        {step < 2 && (
          <Link to="/cart" className="text-xs text-black/50 underline">
            ← Back to cart
          </Link>
        )}
      </div>

      <StepBar current={step} />

      {step === 0 && (
        <ShippingForm
          initialValues={shipping}
          onNext={(values) => {
            setShipping(values)
            setStep(1)
          }}
        />
      )}

      {step === 1 && shipping && (
        <>
          <OrderReview
            shipping={shipping}
            lines={lines}
            subtotal={subtotal}
            discount={discount}
            placing={placing}
            onBack={() => setStep(0)}
            onPlace={handlePlaceOrder}
          />
          {placeError && (
            <p className="mt-3 text-xs font-semibold text-red-600">{placeError}</p>
          )}
        </>
      )}

      {step === 2 && shipping && <Confirmation order={order} shipping={shipping} />}
    </div>
  )
}

