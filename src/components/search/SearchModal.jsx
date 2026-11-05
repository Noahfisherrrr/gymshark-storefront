import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import Modal from '../ui/Modal'
import { CloseIcon } from '../header/icons'
import { NoResults, RecentActivity, ResultsGrid, SuggestedTerms, TrendingPages } from './SearchSections'
import { searchHref } from './searchHref'
import './search.css'

export const SEARCH_PLACEHOLDER = 'What are you looking for?'

const GENDER_TABS = [
  { label: 'All', value: null },
  { label: 'Women', value: 'f' },
  { label: 'Men', value: 'm' },
]
const GENDER_KEY = 'gs-search-gender-preference'
const DEBOUNCE_MS = 500
const RESULT_LIMIT = 20

// Opening search from a women's/men's page pre-selects that tab;
// otherwise the shopper's last choice is remembered.
function genderFromLocation({ pathname, search }) {
  const path = `${pathname}${search}`.toLowerCase()
  if (/[/=]womens?\b/.test(path)) return 'f'
  if (/[/=]mens?\b/.test(path)) return 'm'
  return undefined
}

function readStoredGender() {
  try {
    const stored = window.localStorage.getItem(GENDER_KEY)
    return stored === 'f' || stored === 'm' ? stored : null
  } catch {
    return null
  }
}

const resultKey = (gender, term) => `${gender ?? 'all'}:${term}`

function SearchPanel({ inputRef, term, onTermChange, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [gender, setGender] = useState(() => genderFromLocation(location) ?? readStoredGender())
  const [results, setResults] = useState({})

  const trimmed = term.trim()
  const debounced = useDebouncedValue(trimmed, DEBOUNCE_MS)

  useEffect(() => {
    if (!debounced) return
    api.search
      .query(debounced, { gender, limit: RESULT_LIMIT })
      .catch(() => ({ products: [], total: 0, suggestions: [] }))
      .then((r) => setResults((prev) => ({ ...prev, [resultKey(gender, debounced)]: r })))
  }, [debounced, gender])

  // While typing, the body blanks out until the debounced query lands (as
  // on gymshark.com). Switching tabs keeps the current term's results up
  // until the new gender's results arrive.
  const current =
    results[resultKey(gender, trimmed)] ??
    Object.entries(results).find(([key]) => key.endsWith(`:${trimmed}`))?.[1]
  const loading = trimmed !== '' && !current

  function changeGender(value) {
    setGender(value)
    try {
      window.localStorage.setItem(GENDER_KEY, value ?? 'all')
    } catch {
      // Preference just won't persist.
    }
  }

  function clear() {
    onTermChange('')
    inputRef.current?.focus()
  }

  function submit() {
    if (!trimmed) return
    navigate(searchHref(trimmed, gender))
    onClose()
  }

  let announcement = ''
  if (trimmed && current) {
    announcement = current.total ? `${current.total} results found` : 'No results found'
  }

  return (
    <section className="gs-search-content" aria-label={SEARCH_PLACEHOLDER}>
      <p className="sr-only">The following text field filters the results that follow as you type.</p>
      <div className="sr-only" aria-live="assertive">
        {announcement}
      </div>

      <div className="flex items-center justify-between bg-white px-4 pb-4 pt-10 lg:px-6 lg:pb-6 lg:pt-[66px]">
        <div role="tablist" aria-label="Filter By Gender" className="flex gap-4">
          {GENDER_TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={gender === tab.value}
              onClick={() => changeGender(tab.value)}
              className="gs-gender-tab shrink-0 text-[14px] leading-[1.4] capitalize"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 flex h-11 w-11 items-center justify-center lg:left-2 lg:right-auto lg:top-2"
        >
          <CloseIcon size={24} />
        </button>
      </div>

      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <label htmlFor="search-overlay-input" className="sr-only">
            {SEARCH_PLACEHOLDER}
          </label>
          <input
            id="search-overlay-input"
            ref={inputRef}
            type="text"
            value={term}
            onChange={(e) => onTermChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
            placeholder={SEARCH_PLACEHOLDER}
            autoComplete="off"
            enterKeyHint="search"
            className="gs-search-input min-w-0 flex-1 bg-transparent py-4 text-[18px] leading-[1.4] text-ink outline-none"
          />
          {term && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear search"
              className="whitespace-nowrap text-[14px] leading-[1.4] text-muted"
            >
              Clear
            </button>
          )}
        </div>
        <div className="h-px bg-ink" />
      </div>

      <div className="gs-search-body" onScroll={() => inputRef.current?.blur()}>
        {loading && <div className="h-[300px]" />}

        {!trimmed && (
          <>
            <RecentActivity onNavigate={onClose} />
            <TrendingPages gender={gender} onNavigate={onClose} />
          </>
        )}

        {!loading && trimmed && current.products.length > 0 && (
          <>
            <SuggestedTerms
              key={`suggestions-${gender}`}
              terms={current.suggestions}
              onNavigate={onClose}
            />
            <ResultsGrid
              key={`results-${gender}`}
              products={current.products}
              total={current.total}
              term={trimmed}
              gender={gender}
              onNavigate={onClose}
            />
          </>
        )}

        {!loading && trimmed && current.products.length === 0 && (
          <NoResults term={trimmed} gender={gender} onClear={clear} onNavigate={onClose} />
        )}
      </div>
    </section>
  )
}

export default function SearchModal({ open, onClose, term, onTermChange }) {
  const inputRef = useRef(null)

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      closeTimeoutMs={400}
      label="Search"
      className="gs-search-modal"
      closingClassName="gs-search-modal--closing"
      initialFocusRef={inputRef}
    >
      <SearchPanel inputRef={inputRef} term={term} onTermChange={onTermChange} onClose={onClose} />
    </Modal>
  )
}
