import { useState } from 'react'
import { Link } from 'react-router-dom'
import { productThumb } from '../../lib/images'
import { SECTION_HEADING } from './ProductCarousel'
import './home.css'

// gymshark.com's "Get to know our families" / "Wait there's more…" blocks:
// title + optional tabs (e.g. Guides/Apps), each switching a horizontal row
// of editorial cards (image, heading, copy, full-card link). When there's
// only one tab the switcher is skipped, same as ActivityCarousel.
export default function CardsCarousel({ title, tabs }) {
  const [active, setActive] = useState(tabs?.[0])
  if (!tabs || tabs.length === 0 || !active) return null

  return (
    <section className="mx-auto w-full max-w-[3000px] py-8 lg:px-10 lg:py-16" aria-label={title}>
      <div className="mb-6 flex flex-col gap-4 px-4 md:px-[30px] lg:flex-row lg:items-end lg:justify-between lg:px-0">
        <h2 className={SECTION_HEADING}>{title}</h2>
        {tabs.length > 1 && (
          <div role="tablist" aria-label={`${title} categories`} className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={tab === active}
                onClick={() => setActive(tab)}
                className="gs-tab shrink-0 text-[14px] leading-[1.4]"
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <ul
        key={active.label}
        className="gs-carousel gs-fade-swap flex items-start gap-4 overflow-x-auto overflow-y-hidden pl-4 md:pl-[30px] lg:pl-0"
      >
        {active.cards.map((card) => (
          <li key={card.id} className="shrink-0 basis-[75vw] md:basis-[320px]">
            <Link to={card.href} className="group block">
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface-subtle">
                <img
                  src={productThumb(card.image)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-[16px] font-bold uppercase leading-[1.3] text-ink">{card.title}</h3>
              {card.copy && <p className="mt-1 text-[14px] leading-[1.4] text-muted">{card.copy}</p>}
            </Link>
          </li>
        ))}
        <li aria-hidden="true" className="min-h-px min-w-4 shrink-0 md:min-w-10 lg:hidden" />
      </ul>
    </section>
  )
}
