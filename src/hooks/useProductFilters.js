import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { PRICE_RANGES } from '../config/priceRanges'

// Facets that are comma-separated multi-select lists, both in the URL and
// in the `api.products.list` query (src/api/contract.js). Order here is
// arbitrary — display order is up to whoever builds the `sections` passed
// to FilterSortPanel.
const MULTI_FACETS = ['type', 'size', 'color', 'fit', 'rise', 'feature', 'activity', 'collection']

function parseList(param) {
  return param ? param.split(',').filter(Boolean) : []
}

// Filter & Sort state + data fetching behind gymshark.com's Filter & Sort
// panel (src/components/shop/FilterSortPanel.jsx). Shared by /shop and the
// /collections/* landing pages so neither re-implements the facet wiring.
// `baseQuery` is for constraints the page itself owns (e.g. `{ category:
// 'women', sort: 'newest' }` for a women's new-in collection) — it's merged
// under the user's own facet/sort picks, which always win.
export function useProductFilters(baseQuery = {}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSort = baseQuery.sort ?? 'featured'
  const sort = searchParams.get('sort') ?? defaultSort
  const search = searchParams.get('q') ?? ''
  const selectedPrice = searchParams.get('price') ?? ''

  const selected = useMemo(
    () => Object.fromEntries(MULTI_FACETS.map((key) => [key, parseList(searchParams.get(key))])),
    [searchParams],
  )

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const priceRange = PRICE_RANGES.find((r) => r.slug === selectedPrice)
  const baseKey = JSON.stringify(baseQuery)

  useEffect(() => {
    setLoading(true)
    const facetQuery = Object.fromEntries(
      MULTI_FACETS.map((key) => [key, selected[key].join(',') || undefined]),
    )
    api.products
      .list({
        ...baseQuery,
        ...facetQuery,
        priceMin: priceRange?.min,
        priceMax: priceRange && priceRange.max !== Infinity ? priceRange.max : undefined,
        sort,
        search,
      })
      .then(setProducts)
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseKey, sort, search, selectedPrice, ...MULTI_FACETS.map((key) => selected[key].join(','))])

  function setSort(value) {
    const next = new URLSearchParams(searchParams)
    if (value && value !== defaultSort) next.set('sort', value)
    else next.delete('sort')
    setSearchParams(next)
  }

  function toggleFacet(key, slug) {
    const next = new URLSearchParams(searchParams)
    const current = selected[key]
    const nextList = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    if (nextList.length) next.set(key, nextList.join(','))
    else next.delete(key)
    setSearchParams(next)
  }

  function setPrice(slug) {
    const next = new URLSearchParams(searchParams)
    if (slug && slug !== selectedPrice) next.set('price', slug)
    else next.delete('price')
    setSearchParams(next)
  }

  function clearAll() {
    const next = new URLSearchParams(searchParams)
    ;[...MULTI_FACETS, 'price', 'sort'].forEach((key) => next.delete(key))
    setSearchParams(next)
  }

  const activeFilterCount =
    MULTI_FACETS.reduce((count, key) => count + selected[key].length, 0) + (selectedPrice ? 1 : 0)

  return {
    products,
    loading,
    sort,
    setSort,
    selected,
    toggleFacet,
    selectedPrice,
    setPrice,
    clearAll,
    activeFilterCount,
  }
}
