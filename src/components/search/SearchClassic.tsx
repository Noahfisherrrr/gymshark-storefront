import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { getRecentlyViewed } from '../../lib/recentlyViewed'
import Modal from '../ui/Modal'
import { ChevronLeftIcon, CloseIcon, SearchIcon } from '../header/icons'
import ProductCard from '../product/ProductCard'
import { SEARCH_PLACEHOLDER, searchHref } from './shared'
import type { Product, SearchResult } from '../../api/contract'
import './search.css'

const DEBOUNCE_MS = 500
const PRODUCT_LIMIT = 4
const SUGGESTION_LIMIT = 3
const HEADING = 'font-display text-[clamp(18px,17.3px+0.19vw,20px)] font-medium leading-[0.94] text-ink'
// Same centred column the reference uses for every block under the input.
const COLUMN =
  'lg:mx-[30px] lg:w-[calc(100%-60px)] lg:max-w-[1440px] min-[1200px]:mx-auto min-[1200px]:w-4/5'

// Bolds the parts of a suggestion that match what was typed.
function Highlight({ text, highlight }: { text: string; highlight: string }) {
  const escaped = highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi')).filter(Boolean)
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={i} className="font-bold text-ink">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function TrendingSearches({ onPickTerm }: { onPickTerm: (term: string) => void }) {
  const [terms, setTerms] = useState<string[]>([])

  useEffect(() => {
    api.search
      .trendingTerms()
      .then((t) => setTerms(t.slice(0, 5)))
      .catch(() => setTerms([]))
  }, [])

  if (terms.length === 0) return null

  return (
    <div>
      <h2 className={`${HEADING} pl-4 pt-6 lg:p-0`}>Trending Searches</h2>
      <ul className="mt-4 flex flex-col">
        {terms.map((term) => (
          <li key={term} className="pl-4 text-[14px] leading-[1.4] capitalize text-muted lg:p-0">
            <Link to={searchHref(term)} onClick={() => onPickTerm(term)} className="block py-2 hover:text-ink">
              {term}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BestSellers() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    api.search
      .trendingProducts({ limit: PRODUCT_LIMIT })
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [])

  if (products.length === 0) return null

  return (
    <section>
      <div className="flex items-baseline justify-between px-4 lg:px-0">
        <h2 className={`${HEADING} uppercase`}>Best Sellers</h2>
        <Link to="/shop" className="shrink-0 text-[14px] leading-[1.4] capitalize underline hover:text-muted">
          View all
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 px-4 lg:grid-cols-4 lg:px-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function RecentlyViewed({ products }: { products: Product[] }) {
  return (
    <section>
      <h2 className={`${HEADING} mb-4 px-4 lg:px-0`}>Recently Viewed</h2>
      <div className="gs-drag-row flex gap-2 overflow-x-auto px-4 lg:px-0">
        {products.map((product) => (
          <div key={product.id} className="w-[42vw] shrink-0 lg:w-[calc(25%-6px)]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

// "Keep shopping": recently viewed products when there are any, otherwise
// the best sellers (gymshark.com's "must-have" collection).
function KeepShopping({ showBestSellers = true }: { showBestSellers?: boolean }) {
  const [recent, setRecent] = useState<Product[] | null>(() => (getRecentlyViewed().length ? null : []))

  useEffect(() => {
    const ids = getRecentlyViewed()
    if (ids.length === 0) return
    api.products.list().then((all) => {
      setRecent(
        ids
          .map((id) => all.find((p) => p.id === id))
          .filter((p): p is Product => Boolean(p)),
      )
    })
  }, [])

  if (recent === null) return null
  if (recent.length > 0) return <RecentlyViewed products={recent} />
  return showBestSellers ? <BestSellers /> : null
}

function Suggestions({
  terms,
  term,
  onPickTerm,
}: {
  terms: string[]
  term: string
  onPickTerm: (term: string) => void
}) {
  return (
    <div className="w-full p-4 lg:w-[250px] lg:shrink-0 lg:pt-5">
      <h5 className={`${HEADING} border-b-[0.5px] border-line pb-2`}>suggestions</h5>
      <ul>
        {terms.map((suggestion) => (
          <li key={suggestion} className="py-2 text-[14px] leading-[1.4] capitalize text-muted">
            <Link to={searchHref(suggestion)} onClick={() => onPickTerm(suggestion)}>
              <Highlight text={suggestion} highlight={term} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NoResults({ term, onPickTerm }: { term: string; onPickTerm: (term: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-y-6 lg:mx-auto lg:my-10 lg:max-w-[840px] lg:gap-y-10 min-[1440px]:max-w-[1096px]">
      <p className="py-4 text-center text-[14px] leading-[1.4]">
        No results found for <strong>&ldquo;{term}&rdquo;</strong>
      </p>
      <TrendingSearches onPickTerm={onPickTerm} />
      <KeepShopping showBestSellers={false} />
      <BestSellers />
    </div>
  )
}

interface SearchPanelProps {
  inputRef: RefObject<HTMLInputElement | null>
  term: string
  onTermChange: (value: string) => void
  onClose: () => void
  onPickTerm: (term: string) => void
}

function SearchPanel({ inputRef, term, onTermChange, onClose, onPickTerm }: SearchPanelProps) {
  const navigate = useNavigate()
  // Last results that arrived. They stay on screen while the next query is
  // in flight, as on gymshark.com, rather than blanking on every keystroke.
  const [shown, setShown] = useState<SearchResult & { term: string }>({ term: '', products: [], total: 0, suggestions: [] })

  const trimmed = term.trim()
  const debounced = useDebouncedValue(trimmed, DEBOUNCE_MS)

  useEffect(() => {
    if (!debounced) return
    let current = true
    api.search
      .query(debounced, { limit: PRODUCT_LIMIT })
      .catch(() => ({ products: [], total: 0, suggestions: [] }))
      .then((r) => {
        if (current) setShown({ term: debounced, ...r })
      })
    return () => {
      current = false
    }
  }, [debounced])

  const loading = trimmed !== '' && shown.term !== trimmed
  const hasResults = shown.products.length > 0

  function clear() {
    onTermChange('')
    setShown({ term: '', products: [], total: 0, suggestions: [] })
    inputRef.current?.focus()
  }

  function submit() {
    if (!trimmed) return
    navigate(searchHref(trimmed))
  }

  let announcement = ''
  if (trimmed && !loading) announcement = hasResults ? `${shown.total} results found` : 'No results found'

  return (
    <>
      <section className="gs-classic-content" aria-label="Search through our products">
        <p className="sr-only">The following text field filters the results that follow as you type.</p>
        <div className="sr-only" aria-live="assertive">
          {announcement}
        </div>

        <div className="sticky top-0 z-[1] flex items-center justify-center bg-white p-4 lg:static lg:flex-row-reverse lg:border-b lg:border-line">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center transition-opacity duration-200 hover:opacity-60 lg:hidden"
          >
            <ChevronLeftIcon size={24} />
          </button>

          <div className="relative w-full lg:w-[350px]">
            <label htmlFor="search-overlay-input" className="sr-only">
              {SEARCH_PLACEHOLDER}
            </label>
            <input
              id="search-overlay-input"
              ref={inputRef}
              value={term}
              onChange={(e) => onTermChange(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') submit()
              }}
              placeholder={SEARCH_PLACEHOLDER}
              autoComplete="off"
              enterKeyHint="search"
              className="gs-classic-input h-11 w-full border border-transparent bg-surface-subtle pl-[43px] pr-9 text-[14px] leading-[1.4] outline-none"
            />
            <SearchIcon size={20} className="pointer-events-none absolute left-4 top-3" />
            {term && (
              <button
                type="button"
                onClick={clear}
                aria-label="Clear your search"
                className="absolute right-3.5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center"
              >
                <CloseIcon size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-[30px] top-5 hidden h-11 w-11 items-center justify-center transition-opacity duration-200 hover:opacity-60 lg:flex min-[1440px]:right-[60px]"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        {loading && !hasResults && <div className="h-[300px] bg-white" />}

        {!trimmed && (
          <div
            className={`flex flex-col items-start gap-6 py-10 lg:flex-row lg:justify-between min-[1200px]:justify-evenly ${COLUMN}`}
          >
            <div className="flex flex-col">
              <TrendingSearches onPickTerm={onPickTerm} />
            </div>
            <div className="w-full lg:w-3/4">
              <KeepShopping />
            </div>
          </div>
        )}

        {trimmed && !loading && !hasResults && <NoResults term={trimmed} onPickTerm={onPickTerm} />}

        {trimmed && hasResults && (
          <div className={COLUMN}>
            <div className="lg:flex lg:flex-row">
              {shown.suggestions.length > 0 && (
                <Suggestions
                  terms={shown.suggestions.slice(0, SUGGESTION_LIMIT)}
                  term={trimmed}
                  onPickTerm={onPickTerm}
                />
              )}
              <div className="w-full">
                <h5
                  className={`${HEADING} px-4 pt-4 lg:border-b lg:border-line lg:pb-2 lg:pl-0 lg:pr-4 lg:pt-5`}
                >
                  Products
                </h5>
                <div className="grid grid-cols-2 gap-2 p-4 lg:grid-cols-3 lg:px-0 lg:pb-0 lg:[&>*:nth-child(4)]:hidden min-[1200px]:grid-cols-4 min-[1200px]:[&>*:nth-child(4)]:flex">
                  {shown.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
            <div className="m-4 border-t border-line py-4 text-right lg:mt-0">
              <Link
                to={searchHref(trimmed)}
                onClick={() => onPickTerm(trimmed)}
                className="p-3 text-[14px] leading-[1.4]"
              >
                View all &ldquo;<span className="capitalize underline">{trimmed}</span>&rdquo;
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* The dimmed area under the panel (desktop) closes search. */}
      <div className="hidden flex-1 lg:block" onClick={onClose} aria-hidden="true" />
    </>
  )
}

interface SearchClassicProps {
  open: boolean
  onClose: () => void
  term: string
  onTermChange: (value: string) => void
  onPickTerm: () => void
}

// gymshark.com's control search (A/B variant t140.0): a full-width panel
// over a dimmed page on desktop, a full-screen sheet on mobile.
export default function SearchClassic({ open, onClose, term, onTermChange, onPickTerm }: SearchClassicProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      label="search modal"
      overlayClassName="gs-classic-overlay"
      className="gs-classic-modal"
      initialFocusRef={inputRef}
    >
      <SearchPanel
        inputRef={inputRef}
        term={term}
        onTermChange={onTermChange}
        onClose={onClose}
        onPickTerm={onPickTerm}
      />
    </Modal>
  )
}
