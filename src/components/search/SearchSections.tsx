import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import { formatPrice } from '../../lib/format'
import { getRecentlyViewed } from '../../lib/recentlyViewed'
import { productThumb } from '../../lib/images'
import ProductCard from '../product/ProductCard'
import { searchHref, type Gender } from './shared'
import type { Product } from '../../api/contract'

// Click-and-drag horizontal scrolling for desktop rows (Trending Pages,
// recent activity). A drag of more than 3px swallows the click so letting
// go over a link doesn't navigate.
function useDragScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const drag = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = useCallback((e: MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    drag.current = { active: true, moved: false, startX: e.pageX, scrollLeft: el.scrollLeft }
    el.style.cursor = 'grabbing'
  }, [])
  const onMouseMove = useCallback((e: MouseEvent<T>) => {
    if (!drag.current.active || !ref.current) return
    e.preventDefault()
    const dx = e.pageX - drag.current.startX
    if (Math.abs(dx) > 3) drag.current.moved = true
    ref.current.scrollLeft = drag.current.scrollLeft - dx
  }, [])
  const end = useCallback(() => {
    drag.current.active = false
    if (ref.current) ref.current.style.cursor = ''
  }, [])
  const onClickCapture = useCallback((e: MouseEvent<T>) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

  return { ref, onMouseDown, onMouseMove, onMouseUp: end, onMouseLeave: end, onClickCapture }
}

// Recently viewed products, shown once there are at least 3 (as on
// gymshark.com) so the row never looks half-empty.
export function RecentActivity({ onNavigate }: { onNavigate: () => void }) {
  const [products, setProducts] = useState<Product[]>([])
  const drag = useDragScroll()

  useEffect(() => {
    const ids = getRecentlyViewed()
    if (ids.length < 3) return
    api.products.list().then((all) => {
      setProducts(
        ids
          .map((id) => all.find((p) => p.id === id))
          .filter((p): p is Product => Boolean(p)),
      )
    })
  }, [])

  if (products.length < 3) return null

  return (
    <div className="pt-10">
      <div className="gs-drag-row flex gap-4 overflow-x-auto px-4 lg:px-6" {...drag}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={onNavigate}
            draggable={false}
            className="flex w-60 shrink-0 overflow-hidden border border-line hover:border-ink"
          >
            <span className="aspect-[3/4] h-20 shrink-0 overflow-hidden bg-surface-subtle">
              {product.image && (
                <img
                  src={productThumb(product.image)}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              )}
            </span>
            <span className="flex min-w-0 flex-col justify-center p-4 text-[14px] leading-[1.4] text-ink">
              <span className="truncate capitalize">{product.name}</span>
              <span className="truncate">{formatPrice(product.price)}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function TrendingPages({ gender, onNavigate }: { gender: Gender | null | undefined; onNavigate: () => void }) {
  const [terms, setTerms] = useState<string[]>([])
  const drag = useDragScroll<HTMLUListElement>()

  useEffect(() => {
    let cancelled = false
    api.search
      .trendingTerms({ gender })
      .then((t) => !cancelled && setTerms(t.slice(0, 5)))
      .catch(() => !cancelled && setTerms([]))
    return () => {
      cancelled = true
    }
  }, [gender])

  if (terms.length === 0) return null

  return (
    <div className="px-4 pt-10 lg:px-0">
      <h3 className="mb-2 font-sans text-[14px] leading-[1.4] text-faint lg:ml-6">Trending Pages</h3>
      <ul
        className="gs-drag-row flex flex-col lg:flex-row lg:gap-6 lg:overflow-x-auto lg:pr-6"
        {...drag}
      >
        {terms.map((term) => (
          <li key={term} className="lg:shrink-0 lg:whitespace-nowrap lg:first:ml-6">
            <Link
              to={searchHref(term)}
              onClick={onNavigate}
              draggable={false}
              className="flex h-10 items-center text-[14px] leading-[1.4] capitalize text-ink"
            >
              {term}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SuggestedTerms({ terms, onNavigate }: { terms: string[]; onNavigate: () => void }) {
  if (terms.length === 0) return null
  return (
    <ul className="gs-search-fade flex flex-col px-4 py-10 lg:px-6">
      {terms.slice(0, 4).map((term) => (
        <li key={term}>
          <Link
            to={searchHref(term)}
            onClick={onNavigate}
            className="flex h-10 items-center text-[14px] leading-[1.4] capitalize text-ink"
          >
            {term}
          </Link>
        </li>
      ))}
    </ul>
  )
}

interface ResultsGridProps {
  products: Product[]
  total: number
  term: string
  gender: Gender | null | undefined
  onNavigate: () => void
}

export function ResultsGrid({ products, total, term, gender, onNavigate }: ResultsGridProps) {
  return (
    <div className="gs-search-fade">
      <div className="grid grid-cols-2 gap-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
        ))}
      </div>
      {total >= 20 && (
        <div className="px-4 pt-4 lg:px-6 lg:pb-6">
          <Link
            to={searchHref(term, gender)}
            onClick={onNavigate}
            className="block w-full bg-ink p-4 text-center text-[14px] leading-[1.4] text-white hover:bg-ink-hover"
          >
            See all results for &ldquo;{term}&rdquo;
          </Link>
        </div>
      )}
    </div>
  )
}

interface NoResultsProps {
  term: string
  gender: Gender | null | undefined
  onClear: () => void
  onNavigate: () => void
}

export function NoResults({ term, gender, onClear, onNavigate }: NoResultsProps) {
  const [trending, setTrending] = useState<Product[]>([])

  useEffect(() => {
    let cancelled = false
    api.search
      .trendingProducts({ gender, limit: 20 })
      .then((p) => !cancelled && setTrending(p))
      .catch(() => !cancelled && setTrending([]))
    return () => {
      cancelled = true
    }
  }, [gender])

  return (
    <div className="gs-search-fade pb-10">
      <div className="flex flex-col items-center gap-2 px-4 py-20 text-center text-[14px] leading-[1.4] text-ink">
        <p>No results found for &ldquo;{term}&rdquo;</p>
        <button type="button" onClick={onClear} className="underline">
          Clear Search
        </button>
      </div>
      {trending.length > 0 && (
        <div>
          <h3 className="px-4 pb-4 font-sans text-[14px] leading-[1.4] text-faint">Trending</h3>
          <div className="grid grid-cols-2 gap-1">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
