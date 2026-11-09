import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { PRICE_RANGES } from '../config/priceRanges'
import type { Product, ProductListOptions } from '../api/contract'

// Facets that are comma-separated multi-select lists, both in the URL and
// in the `api.products.list` query (src/api/contract.ts). Order here is
// arbitrary — display order is up to whoever builds the `sections` passed
// to FilterSortPanel.
const MULTI_FACETS = ['type', 'size', 'color', 'fit', 'rise', 'feature', 'activity', 'collection'] as const

type MultiFacet = (typeof MULTI_FACETS)[number]

function parseList(param: string | null): string[] {
  return param ? param.split(',').filter(Boolean) : []
}

export interface UseProductFiltersBaseQuery extends Partial<ProductListOptions> {}

interface UseProductFiltersResult {
  products: Product[]
  loading: boolean
  sort: string
  setSort: (value: string) => void
  selected: Record<MultiFacet, string[]>
  toggleFacet: (key: MultiFacet, slug: string) => void
  selectedPrice: string
  setPrice: (slug: string) => void
  clearAll: () => void
  activeFilterCount: number
}

// Filter & Sort state + data fetching behind gymshark.com's Filter & Sort
// panel (src/components/shop/FilterSortPanel.jsx). Shared by /shop and the
// /collections/* landing pages so neither re-implements the facet wiring.
// `baseQuery` is for constraints the page itself owns (e.g. `{ category:
// 'women', sort: 'newest' }` for a women's new-in collection) — it's merged
// under the user's own facet/sort picks, which always win.
export function useProductFilters(baseQuery: UseProductFiltersBaseQuery = {}): UseProductFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSort = baseQuery.sort ?? 'featured'
  const sort = searchParams.get('sort') ?? defaultSort
  const search = searchParams.get('q') ?? ''
  const selectedPrice = searchParams.get('price') ?? ''

  const selected = useMemo<Record<MultiFacet, string[]>>(
    () =>
      Object.fromEntries(MULTI_FACETS.map((key) => [key, parseList(searchParams.get(key))])) as Record<
        MultiFacet,
        string[]
      >,
    [searchParams],
  )

  const [products, setProducts] = useState<Product[]>([])
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

  function setSort(value: string): void {
    const next = new URLSearchParams(searchParams)
    if (value && value !== defaultSort) next.set('sort', value)
    else next.delete('sort')
    setSearchParams(next)
  }

  function toggleFacet(key: MultiFacet, slug: string): void {
    const next = new URLSearchParams(searchParams)
    const current = selected[key]
    const nextList = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    if (nextList.length) next.set(key, nextList.join(','))
    else next.delete(key)
    setSearchParams(next)
  }

  function setPrice(slug: string): void {
    const next = new URLSearchParams(searchParams)
    if (slug && slug !== selectedPrice) next.set('price', slug)
    else next.delete('price')
    setSearchParams(next)
  }

  function clearAll(): void {
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
