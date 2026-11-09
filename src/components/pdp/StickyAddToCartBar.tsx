import { useState } from 'react'
import { formatPrice } from '../../lib/format'
import { productThumb } from '../../lib/images'
import { useCart } from '../../context/CartContext'
import type { Product, ProductVariant } from '../../api/contract'

interface StickyAddToCartBarProps {
  product: Product
  variants?: ProductVariant[]
  selectedVariantId?: string | null
  onSelectVariant?: (variantId: string) => void
  visible?: boolean
}

export default function StickyAddToCartBar({
  product,
  variants = [],
  selectedVariantId,
  onSelectVariant,
  visible = false,
}: StickyAddToCartBarProps) {
  const { addItem, openMiniBag } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const selectedVariant = variants.find((v) => v.id === selectedVariantId)
  const isOutOfStock = selectedVariant ? selectedVariant.stock <= 0 : false

  async function handleAdd() {
    if (!selectedVariant || isOutOfStock || loading) return

    setLoading(true)
    try {
      await addItem({
        productId: product.id,
        variantId: selectedVariant.id,
        quantity: 1,
      })
      setSuccess(true)
      openMiniBag()
      setTimeout(() => setSuccess(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur-md px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 animate-slide-up">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Product thumb & details */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-10 shrink-0 overflow-hidden rounded-xs bg-surface-subtle">
            {product.image && (
              <img
                src={productThumb(product.image)}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-xs font-extrabold uppercase tracking-tight text-ink">
              {product.name}
            </h4>
            <p className="text-xs font-semibold text-black/70">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        {/* Size selection & Add button */}
        <div className="flex items-center gap-2 shrink-0">
          {variants.length > 1 && (
            <select
              value={selectedVariantId || ''}
              onChange={(e) => onSelectVariant && onSelectVariant(e.target.value)}
              className="h-11 rounded-xs border border-black/25 bg-white px-3 text-xs font-bold uppercase text-black focus:border-black focus:outline-hidden"
              aria-label="Select size"
            >
              <option value="" disabled>Size</option>
              {variants.map((v) => (
                <option key={v.id} value={v.id} disabled={v.stock <= 0}>
                  {v.size} {v.stock <= 0 ? '(Sold out)' : ''}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedVariant || isOutOfStock || loading}
            className={`h-11 px-5 rounded-xs text-xs font-extrabold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 ${
              !selectedVariant || isOutOfStock
                ? 'bg-black/20 text-black/40 cursor-not-allowed'
                : success
                ? 'bg-emerald-700 text-white'
                : 'bg-black text-white hover:bg-black/90 active:scale-95'
            }`}
          >
            {loading && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            )}
            <span>
              {!selectedVariant
                ? 'Choose Size'
                : isOutOfStock
                ? 'Sold Out'
                : success
                ? 'Added ✓'
                : 'Add to Bag'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
