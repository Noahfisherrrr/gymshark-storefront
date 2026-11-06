import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import { getProductContent } from '../api/cms'
import { useCart } from '../context/CartContext'
import { addRecentlyViewed } from '../lib/recentlyViewed'

export default function Product() {
  const { productId } = useParams()
  const { addItem, openMiniBag } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariantId, setSelectedVariantId] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.products.getById(productId).then(async (p) => {
      if (!p) {
        setProduct(null)
        setLoading(false)
        return
      }
      addRecentlyViewed(p.id)
      // CMS editorial content (description, extra gallery images) overrides
      // the commerce record's placeholder copy when a client editor has
      // published it; price/stock/variants always stay commerce-authoritative.
      const content = await getProductContent(p.id)
      setProduct(
        content
          ? {
              ...p,
              description: content.description ?? p.description,
              gallery: content.gallery.length ? content.gallery : [p.image].filter(Boolean),
            }
          : p,
      )
      setSelectedVariantId(p.variants[0]?.id ?? null)
      setLoading(false)
    })
  }, [productId])

  if (loading) return <div className="px-4 py-10 text-center text-sm">Loading…</div>
  if (!product) return <div className="px-4 py-10 text-center text-sm">Product not found.</div>

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)

  async function handleAddToCart() {
    setStatus(null)
    try {
      await addItem({ productId: product.id, variantId: selectedVariant.id, quantity: 1 })
      // gymshark.com confirms add-to-bag by sliding the mini bag open.
      openMiniBag()
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden bg-surface-subtle">
          {(product.gallery?.[0] ?? product.image) && (
            <img
              src={product.gallery?.[0] ?? product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
          <p className="mt-2 text-lg">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-sm text-black/60">{product.description}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase">Size / Color</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  disabled={v.stock === 0}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`border px-3 py-2 text-xs font-semibold uppercase transition-colors duration-200 ${
                    v.id === selectedVariantId
                      ? 'border-brand-black bg-brand-black text-brand-white'
                      : 'border-black/20 hover:border-brand-black'
                  } ${v.stock === 0 ? 'cursor-not-allowed opacity-30' : ''}`}
                >
                  {v.size} / {v.color}
                  {v.stock === 0 ? ' (Out of stock)' : ''}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="mt-8 w-full bg-brand-black py-3 text-sm font-semibold uppercase text-brand-white transition-colors duration-200 hover:bg-ink-hover disabled:opacity-40"
          >
            Add to Cart
          </button>

          {status && (
            <p
              className={`mt-3 text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-700'}`}
            >
              {status.message}
            </p>
          )}

          <p className="mt-6 text-xs text-black/50">
            Real product photos, size guide and reviews pending catalog content and
            review feature decision (Brief.md #6, #7).
          </p>
        </div>
      </div>
    </div>
  )
}
