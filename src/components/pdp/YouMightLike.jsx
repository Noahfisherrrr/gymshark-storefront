import { useState, useEffect } from 'react'
import { api } from '../../api'
import ProductCard from '../product/ProductCard'

export default function YouMightLike({ currentProductId, category, gender }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.products
      .list({
        category: category || undefined,
        gender: gender || undefined,
        limit: 8,
      })
      .then((list) => {
        const filtered = list.filter((p) => p.id !== currentProductId)
        setProducts(filtered.slice(0, 4))
      })
      .finally(() => setLoading(false))
  }, [currentProductId, category, gender])

  if (loading || products.length === 0) return null

  return (
    <section className="py-12 border-t border-black/10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-ink sm:text-2xl">
              You Might Also Like
            </h2>
            <p className="mt-1 text-xs text-black/60 font-medium">
              Trending styles in the community
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

