import { useState } from 'react'
import { ChevronDownIcon, CloseIcon } from '../header/icons'

// Custom circle radio: gymshark.com's Filter & Sort → Sort By uses a plain
// black-ring-with-filled-dot control rather than the native browser radio.
function RadioRow({ name, checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px] leading-[1.4]">
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <span className="h-2.5 w-2.5 rounded-full bg-ink opacity-0 peer-checked:opacity-100" />
      </span>
      {label}
    </label>
  )
}

// Square checkbox counterpart, same "ring + filled center" language. An
// optional `swatch` hex renders a small colour dot before the label (used
// by the Color facet).
function CheckboxRow({ checked, onChange, label, swatch }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px] leading-[1.4]">
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center border border-ink">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <span className="h-2.5 w-2.5 bg-ink opacity-0 peer-checked:opacity-100" />
      </span>
      {swatch && (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 rounded-full border border-line"
          style={{ backgroundColor: swatch }}
        />
      )}
      {label}
    </label>
  )
}

// Collapsible section matching gymshark.com's Filter & Sort accordion: bold
// title, chevron that flips on open, thin top divider between sections.
function FilterAccordion({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-line py-4 first:border-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-[15px] font-bold"
      >
        {title}
        <ChevronDownIcon size={18} className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  )
}

// gymshark.com's Filter & Sort panel: bold "FILTER & SORT" header with
// "Clear All", an always-open "Sort By" (radio), then one collapsed
// accordion per facet (checkboxes, except Price which is also radio —
// a shopper picks one bucket, not several overlapping ranges).
//
// `sections` is `{ key, title, type: 'checkbox' | 'radio', options: {slug,
// label}[], selected, onChange, swatches? }[]` — `selected` is a string for
// radio sections, an array for checkbox sections.
export default function FilterSortPanel({
  sort,
  sortOptions,
  onSortChange,
  sections,
  activeCount,
  onClearAll,
  onClose,
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 pb-4">
        <h2 className="font-display text-[20px] font-bold uppercase leading-none">Filter &amp; Sort</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClearAll}
            disabled={activeCount === 0}
            className="text-[13px] underline underline-offset-2 disabled:cursor-not-allowed disabled:text-faint disabled:no-underline"
          >
            Clear All
          </button>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Close filter and sort">
              <CloseIcon size={20} />
            </button>
          )}
        </div>
      </div>

      <FilterAccordion title="Sort By" defaultOpen>
        {sortOptions.map(({ value, label }) => (
          <RadioRow key={value} name="sort" checked={sort === value} onChange={() => onSortChange(value)} label={label} />
        ))}
      </FilterAccordion>

      {sections.map((section) => (
        <FilterAccordion key={section.key} title={section.title}>
          {section.type === 'radio'
            ? section.options.map((opt) => (
                <RadioRow
                  key={opt.slug}
                  name={section.key}
                  checked={section.selected === opt.slug}
                  onChange={() => section.onChange(opt.slug)}
                  label={opt.label}
                />
              ))
            : section.options.map((opt) => (
                <CheckboxRow
                  key={opt.slug}
                  checked={section.selected.includes(opt.slug)}
                  onChange={() => section.onChange(opt.slug)}
                  label={opt.label}
                  swatch={section.swatches?.[opt.slug]}
                />
              ))}
        </FilterAccordion>
      ))}
    </div>
  )
}
