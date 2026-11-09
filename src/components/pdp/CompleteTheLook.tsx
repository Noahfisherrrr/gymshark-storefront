import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import { formatPrice } from '../../lib/format'
import { productThumb } from '../../lib/images'
import { useCart } from '../../context/CartContext'
import type { Product } from '../../api/contract'

interface CompleteTheLookProps {
  productIds?: string[]
}

export default function CompleteTheLook({ productIds = [] }: CompleteTheLookProps) {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [addingId, setAddingId] = useState<string | null>(null)
  const { addItem, openMiniBag } = useCart()

  const idsKey = productIds.join(',')

  useEffect(() => {
    if (!productIds || productIds.length === 0) {
      setItems([])
      setLoading(false)
      return
    }

    let active = true
    api.products
      .list()
      .then(() => Promise.all(productIds.map((id) => api.products.getById(id))))
      .then((results) => {
        if (!active) return
        const found = results.filter((item): item is Product => item !== null)
        setItems(found)
        const initialVariants: Record<string, string> = {}
        found.forEach((item) => {
          const firstInStock = item.variants?.find((v) => v.stock > 0) || item.variants?.[0]
          if (firstInStock) {
            initialVariants[item.id] = firstInStock.id
          }
        })
        setSelectedVariants(initialVariants)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [idsKey])

  if (loading || items.length === 0) return null

  async function handleQuickAdd(item: Product) {
    const variantId = selectedVariants[item.id]
    if (!variantId || addingId) return

    setAddingId(item.id)
    try {
      await addItem({
        productId: item.id,
        variantId,
        quantity: 1,
      })
      openMiniBag()
    } finally {
      setAddingId(null)
    }
  }

  return (
    <section className="py-12 border-t border-black/10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-ink sm:text-2xl">
            Wear It With / Complete The Look
          </h2>
          <p className="mt-1 text-xs text-black/60 font-medium">
            Pieces curated to match perfectly
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => {
            const currentVariantId = selectedVariants[item.id]
            const currentVariant = item.variants?.find((v) => v.id === currentVariantId)
            const isOutOfStock = currentVariant ? currentVariant.stock <= 0 : false
            const isAdding = addingId === item.id

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-xs border border-black/10 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex gap-4">
                  {/* Thumbnail link */}
                  <Link
                    to={`/product/${item.id}`}
                    className="aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xs bg-surface-subtle"
                  >
                    {item.image && (
                      <img
                        src={productThumb(item.image)}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="line-clamp-2 text-xs font-bold uppercase tracking-tight text-ink hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs font-semibold text-black/70">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quick Size Dropdown */}
                    {item.variants && item.variants.length > 0 && (
                      <div className="mt-2">
                        <select
                          value={currentVariantId || ''}
                          onChange={(e) =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          className="h-8 w-full rounded-xs border border-black/20 bg-white px-2 text-[11px] font-bold uppercase text-black focus:border-black focus:outline-hidden"
                          aria-label={`Select size for ${item.name}`}
                        >
                          {item.variants.map((v) => (
                            <option key={v.id} value={v.id} disabled={v.stock <= 0}>
                              {v.size} {v.stock <= 0 ? '(Sold out)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Add CTA */}
                <button
                  type="button"
                  onClick={() => handleQuickAdd(item)}
                  disabled={!currentVariant || isOutOfStock || isAdding}
                  className={`mt-4 h-9 w-full rounded-xs text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 ${
                    !currentVariant || isOutOfStock
                      ? 'bg-black/20 text-black/40 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-black/85 active:scale-95'
                  }`}
                >
                  {isAdding && (
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  )}
                  <span>
                    {isOutOfStock ? 'Sold Out' : isAdding ? 'Adding...' : '+ Add to Bag'}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
