import { useState } from 'react'
import { HeartIcon, HeartFilledIcon } from '../header/icons'
import { TruckIcon, RefreshIcon, CheckCircleIcon } from './pdpIcons'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

export default function ProductActions({
  product,
  selectedVariant,
  onPromptSelectSize,
  deliveryInfo = {},
}) {
  const { addItem, openMiniBag } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const saved = isWishlisted(product.id)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const isOutOfStock = selectedVariant ? selectedVariant.stock <= 0 : false
  const buttonText = !selectedVariant
    ? 'Select a Size'
    : isOutOfStock
    ? 'Sold Out'
    : success
    ? 'Added to Bag ✓'
    : loading
    ? 'Adding...'
    : 'Add to Bag'

  async function handleAdd() {
    if (!selectedVariant) {
      if (onPromptSelectSize) onPromptSelectSize()
      return
    }
    if (isOutOfStock || loading) return

    setLoading(true)
    setErrorMessage(null)

    try {
      await addItem({
        productId: product.id,
        variantId: selectedVariant.id,
        quantity: 1,
      })
      setSuccess(true)
      openMiniBag()
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setErrorMessage(err.message || 'Unable to add item to bag.')
    } finally {
      setLoading(false)
    }
  }

  const freeThreshold = deliveryInfo.freeThreshold || 75
  const standardDays = deliveryInfo.standardDays || '3-5 business days'
  const returnDays = deliveryInfo.returnDays || 30

  return (
    <div className="flex flex-col gap-4">
      {/* Primary CTA and Wishlist buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock || loading}
          className={`flex-1 h-13 py-3.5 px-6 rounded-xs text-sm font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-black/20 text-black/40 cursor-not-allowed'
              : !selectedVariant
              ? 'border-2 border-black bg-white text-black hover:bg-black hover:text-white'
              : success
              ? 'bg-emerald-700 text-white'
              : 'bg-black text-white hover:bg-black/90 active:scale-[0.99] shadow-sm'
          }`}
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          )}
          {success && <CheckCircleIcon size={16} />}
          <span>{buttonText}</span>
        </button>

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          title={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-xs border transition-all duration-200 ${
            saved
              ? 'border-black bg-black text-white'
              : 'border-black/25 bg-white text-black hover:border-black'
          }`}
        >
          {saved ? <HeartFilledIcon size={22} /> : <HeartIcon size={22} />}
        </button>
      </div>

      {/* Error notification if add fails */}
      {errorMessage && (
        <p className="text-xs font-semibold text-red-600 animate-shake">
          {errorMessage}
        </p>
      )}

      {/* Delivery & Returns Perks Strip */}
      <div className="mt-2 divide-y divide-black/10 rounded-xs border border-black/10 bg-surface-subtle p-3.5 text-xs text-black/80">
        <div className="flex items-center gap-3 pb-2.5">
          <TruckIcon size={18} className="text-black shrink-0" />
          <div>
            <p className="font-bold text-black">
              Free standard delivery over ${freeThreshold}
            </p>
            <p className="text-[11px] text-black/60">
              Delivered in {standardDays} • Express delivery available at checkout
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2.5">
          <RefreshIcon size={18} className="text-black shrink-0" />
          <div>
            <p className="font-bold text-black">
              Free {returnDays}-day returns
            </p>
            <p className="text-[11px] text-black/60">
              Fast and hassle-free returns via our online returns portal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

