import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/product/ProductCard'
import '../components/search/search.css'

const GENDER_TABS = [
  { label: 'All', value: null },
  { label: 'Women', value: 'f' },
  { label: 'Men', value: 'm' },
]

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const term = (searchParams.get('q') ?? '').trim()
  const genderParam = searchParams.get('gender')
  const gender = genderParam === 'f' || genderParam === 'm' ? genderParam : null

  // Keyed by query so a slow, stale response can never overwrite a newer one.
  const [results, setResults] = useState({})
  const [trending, setTrending] = useState([])
  const key = `${gender ?? 'all'}:${term}`
  const result = results[key]

  useEffect(() => {
    api.search
      .query(term, { gender, limit: 200 })
      .catch(() => ({ products: [], total: 0, suggestions: [] }))
      .then((r) => setResults((prev) => ({ ...prev, [`${gender ?? 'all'}:${term}`]: r })))
  }, [term, gender])

  const noResults = result && result.products.length === 0

  useEffect(() => {
    if (!noResults) return
    api.search
      .trendingProducts({ gender, limit: 8 })
      .then(setTrending)
      .catch(() => setTrending([]))
  }, [noResults, gender])

  function changeGender(value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('gender', value)
    else next.delete('gender')
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <p className="text-[14px] leading-[1.4] text-faint">Results for</p>
      <h1 className="mt-1 text-[clamp(24px,21.2px+0.75vw,32px)] font-extrabold uppercase leading-[0.9]">
        {term ? `“${term}”` : 'Search'}
      </h1>

      <div className="mt-6 flex items-center justify-between">
        <div role="tablist" aria-label="Filter By Gender" className="flex gap-4">
          {GENDER_TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={gender === tab.value}
              onClick={() => changeGender(tab.value)}
              className="gs-gender-tab shrink-0 text-[14px] leading-[1.4]"
            >
              {tab.label}
            </button>
          ))}
        </div>
        {result && !noResults && (
          <span className="text-[14px] leading-[1.4] text-muted">{result.total} products</span>
        )}
      </div>

      {result && !noResults && (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {result.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {noResults && (
        <div className="mt-6">
          <div className="flex flex-col items-center gap-2 py-20 text-center text-[14px] leading-[1.4]">
            <p>{term ? `No results found for “${term}”` : 'Type something to search our products.'}</p>
            <Link to="/shop" className="underline">
              Shop all products
            </Link>
          </div>
          {trending.length > 0 && (
            <>
              <h2 className="pb-4 font-sans text-[14px] leading-[1.4] text-faint">Trending</h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {trending.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
