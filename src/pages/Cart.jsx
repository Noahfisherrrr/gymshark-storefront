import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import { useCartLines } from '../hooks/useCartLines'

export default function Cart() {
  const { updateQuantity, removeItem } = useCart()
  const { lines, subtotal } = useCartLines()
  const [discountCode, setDiscountCode] = useState('')
  const [discount, setDiscount] = useState(null)
  const [discountError, setDiscountError] = useState(null)

  const discountAmount = discount?.valid ? subtotal * discount.amountOff : 0
  const total = subtotal - discountAmount

  async function handleApplyDiscount(e) {
    e.preventDefault()
    setDiscountError(null)
    const result = await api.orders.applyDiscountCode(discountCode)
    if (!result.valid) {
      setDiscount(null)
      setDiscountError(result.message)
    } else {
      setDiscount(result)
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <h1 className="text-2xl font-bold uppercase">Your Cart</h1>
        <p className="mt-4 text-sm text-black/50">
          Your cart is empty. <Link to="/shop" className="underline">Continue shopping</Link>.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Your Cart</h1>

      <div className="mt-6 divide-y divide-black/10">
        {lines.map((line) => (
          <div key={line.id} className="flex items-center gap-4 py-4">
            <div className="h-20 w-16 shrink-0 bg-black/5" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{line.product.name}</p>
              <p className="text-xs text-black/50">
                {line.variant.size} / {line.variant.color}
              </p>
              <button
                type="button"
                onClick={() => removeItem(line.id)}
                className="mt-1 text-xs text-black/50 underline"
              >
                Remove
              </button>
            </div>
            <input
              type="number"
              min="1"
              max={line.variant.stock}
              value={line.quantity}
              onChange={(e) => updateQuantity(line.id, Number(e.target.value))}
              className="w-16 border border-black/20 px-2 py-1 text-sm"
            />
            <p className="w-20 text-right text-sm font-semibold">
              ${line.lineTotal.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleApplyDiscount} className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-1 border border-black/20 px-3 py-2 text-sm"
        />
        <button type="submit" className="border border-black/20 px-4 py-2 text-sm font-semibold">
          Apply
        </button>
      </form>
      {discountError && <p className="mt-1 text-xs text-red-600">{discountError}</p>}
      {discount?.valid && <p className="mt-1 text-xs text-green-700">{discount.message}</p>}

      <div className="mt-6 space-y-1 border-t border-black/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Discount</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        disabled
        className="mt-6 w-full bg-brand-black py-3 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
      >
        Checkout (pending client Stripe account — Brief.md #9)
      </button>
    </div>
  )
}
