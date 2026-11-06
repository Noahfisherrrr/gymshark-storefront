import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/product/ProductCard'
import { ACTIVITIES } from '../config/activities'
import { PRODUCT_TYPES } from '../config/productTypes'
import { PRICE_RANGES } from '../config/priceRanges'

const CATEGORIES = ['all', 'men', 'women', 'accessories', 'new', 'sale']

// Mirrors gymshark.com's Filter & Sort → Sort By options (its "Relevancy" is
// our "Featured", everything else matches 1:1).
const SORT_OPTIONS = [
  { value: 'featured', label: 'Relevancy' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

// Women/men are gendered (unisex included) and sale means "discounted", so
// these pages match the homepage carousels that link to them.
function listQuery(category) {
  if (category === 'women') return { gender: 'f' }
  if (category === 'men') return { gender: 'm' }
  if (category === 'sale') return { onSale: true }
  return { category }
}

function parseList(param) {
  return param ? param.split(',').filter(Boolean) : []
}

// Collapsible section matching gymshark.com's Filter & Sort accordion.
function FilterSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="mt-6 border-t border-black/10 pt-4 first:mt-0 first:border-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold uppercase"
      >
        {title}
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="mt-3 space-y-2 text-sm">{children}</div>}
    </div>
  )
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'
  const sort = searchParams.get('sort') ?? 'featured'
  const search = searchParams.get('q') ?? ''
  const selectedActivities = parseList(searchParams.get('activity'))
  const selectedTypes = parseList(searchParams.get('type'))
  const selectedPrice = searchParams.get('price') ?? ''

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const priceRange = PRICE_RANGES.find((r) => r.slug === selectedPrice)

  useEffect(() => {
    setLoading(true)
    api.products
      .list({
        ...listQuery(category),
        activity: selectedActivities.join(',') || undefined,
        type: selectedTypes.join(',') || undefined,
        priceMin: priceRange?.min,
        priceMax: priceRange && priceRange.max !== Infinity ? priceRange.max : undefined,
        sort,
        search,
      })
      .then(setProducts)
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, search, selectedActivities.join(','), selectedTypes.join(','), selectedPrice])

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value && value !== 'all' && value !== 'featured') next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  function toggleListParam(key, slug, current) {
    const next = new URLSearchParams(searchParams)
    const nextList = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    if (nextList.length) next.set(key, nextList.join(','))
    else next.delete(key)
    setSearchParams(next)
  }

  function clearFilters() {
    const next = new URLSearchParams(searchParams)
    ;['activity', 'type', 'price', 'sort'].forEach((key) => next.delete(key))
    setSearchParams(next)
  }

  const activeFilterCount = selectedActivities.length + selectedTypes.length + (selectedPrice ? 1 : 0)

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

          <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
            <p className="text-sm font-semibold uppercase">Filter &amp; Sort</p>
            {activeFilterCount > 0 && (
              <button type="button" onClick={clearFilters} className="text-xs underline">
                Clear All
              </button>
            )}
          </div>

          <FilterSection title="Sort By" defaultOpen>
            {SORT_OPTIONS.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  checked={sort === value}
                  onChange={() => updateParam('sort', value)}
                />
                {label}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Product Type">
            {PRODUCT_TYPES.map(({ slug, label }) => (
              <label key={slug} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(slug)}
                  onChange={() => toggleListParam('type', slug, selectedTypes)}
                />
                {label}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Activity">
            {ACTIVITIES.map(({ slug, label }) => (
              <label key={slug} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(slug)}
                  onChange={() => toggleListParam('activity', slug, selectedActivities)}
                />
                {label}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Price">
            {PRICE_RANGES.map(({ slug, label }) => (
              <label key={slug} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === slug}
                  onChange={() => updateParam('price', selectedPrice === slug ? '' : slug)}
                />
                {label}
              </label>
            ))}
          </FilterSection>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between text-sm">
            <span>{loading ? 'Loading…' : `${products.length} products`}</span>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="border border-black/20 px-2 py-1 text-sm lg:hidden"
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  Sort: {label}
                </option>
              ))}
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
