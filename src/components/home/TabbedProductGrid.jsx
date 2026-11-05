import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import ProductCard from '../product/ProductCard'
import { SECTION_HEADING } from './ProductCarousel'
import './home.css'

// Product grid with Women / Men tabs, modelled on gymshark.com's
// "Popular right now" tabbed block and its 2→4 column product grid.
export default function TabbedProductGrid({ title, tabs, limit = 8 }) {
  const [active, setActive] = useState(tabs[0])
  const [products, setProducts] = useState({})

  useEffect(() => {
    let current = true
    api.products.list({ gender: active.gender, limit }).then((items) => {
      if (current) setProducts((prev) => ({ ...prev, [active.label]: items }))
    })
    return () => {
      current = false
    }
  }, [active, limit])

  const items = products[active.label] ?? []

  return (
    <section className="mx-auto w-full max-w-[3000px] py-8 lg:py-16" aria-label={title}>
      <div className="mb-6 flex flex-col gap-4 px-4 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <h2 className={SECTION_HEADING}>{title}</h2>
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
      </div>

      <div
        key={active.label}
        className="gs-fade-swap grid grid-cols-2 gap-x-0.5 gap-y-6 px-2 lg:grid-cols-4 lg:px-10"
      >
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 flex justify-center px-4">
        <Link
          to={active.href}
          className="flex h-[51px] items-center justify-center border border-ink px-6 text-[14px] leading-[1.4] text-ink transition-colors hover:bg-ink hover:text-white"
        >
          View all {active.label.toLowerCase()}
        </Link>
      </div>
    </section>
  )
}
