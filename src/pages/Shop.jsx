import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/product/ProductCard'

const CATEGORIES = ['all', 'men', 'women', 'new', 'sale']

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'
  const sort = searchParams.get('sort') ?? 'featured'
  const search = searchParams.get('q') ?? ''

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.products
      .list({ category, sort, search })
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [category, sort, search])

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value && value !== 'all' && value !== 'featured') next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Shop All</h1>

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <p className="text-sm font-semibold uppercase">Category</p>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => updateParam('category', cat)}
                  className={cat === category ? 'font-bold' : 'text-black/60'}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-black/50">
            Size/color/price filters pending catalog taxonomy (Brief.md #6, #7).
          </p>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between text-sm">
            <span>{loading ? 'Loading…' : `${products.length} products`}</span>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="border border-black/20 px-2 py-1 text-sm"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!loading && products.length === 0 && (
            <p className="mt-10 text-sm text-black/50">No products match these filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}
