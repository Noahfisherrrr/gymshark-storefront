import { useState } from 'react'
import Modal from '../ui/Modal'
import FilterSortPanel, { type FilterSortPanelProps } from './FilterSortPanel'
import './filterSort.css'

interface FilterSortControlsProps extends Omit<FilterSortPanelProps, 'onClose'> {
  productCount: number
  loading: boolean
}

// Desktop: the panel sits inline as a sidebar (gymshark.com keeps Filter &
// Sort visible alongside the grid above ~1024px). Mobile/tablet: a "Filter &
// Sort" bar opens the same panel as a full-screen takeover (same slide-up
// sheet the mini bag uses), with a sticky "Show N results" CTA since there's
// no grid visible underneath to glance at while filtering.
export default function FilterSortControls({ productCount, loading, ...panelProps }: FilterSortControlsProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <FilterSortPanel {...panelProps} />
      </aside>

      <div className="flex items-center justify-between border-b border-line py-3 text-[14px] lg:hidden">
        <button type="button" onClick={() => setOpen(true)} className="flex items-center gap-2 font-bold">
          Filter &amp; Sort
          {panelProps.activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] text-white">
              {panelProps.activeCount}
            </span>
          )}
        </button>
        <span className="text-muted">{loading ? 'Loading…' : `${productCount} products`}</span>
      </div>

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        closeTimeoutMs={400}
        label="Filter & Sort"
        className="gs-filtersort-panel"
        closingClassName="gs-filtersort-panel--closing"
      >
        <div className="flex-1 overflow-y-auto px-4 pb-24 pt-6">
          <FilterSortPanel {...panelProps} onClose={() => setOpen(false)} />
        </div>
        <div className="sticky bottom-0 border-t border-line bg-white p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-[51px] w-full items-center justify-center bg-ink text-[14px] font-bold text-white hover:bg-ink-hover"
          >
            {loading ? 'Loading…' : `Show ${productCount} results`}
          </button>
        </div>
      </Modal>
    </>
  )
}
