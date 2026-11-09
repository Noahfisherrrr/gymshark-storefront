import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '../header/icons'
import type { Product } from '../../api/contract'
import './home.css'

export const SECTION_HEADING =
  'font-display text-[clamp(18px,17.3px+0.19vw,20px)] font-medium uppercase leading-[0.94] text-ink'

interface ProductCarouselProps {
  title: string
  href: string
  products: Product[]
}

// gymshark.com's product carousel block: title + "View all" link, arrow
// buttons on desktop, and a snap-scrolling row showing ~1.7 cards on mobile
// and 5 on desktop.
export default function ProductCarousel({ title, href, products }: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setEdges({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    })
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [updateEdges, products])

  function page(direction: number) {
    const el = trackRef.current
    el?.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-[3000px] py-8 lg:px-10 lg:py-16" aria-label={title}>
      <div className="mb-4 flex items-center justify-between gap-6 px-4 md:px-[30px] lg:px-0">
        <div className="flex w-full items-end justify-between gap-4 lg:justify-start">
          <h2 className={SECTION_HEADING}>{title}</h2>
          <Link
            to={href}
            className="-mb-0.5 shrink-0 text-[14px] leading-[1.4] capitalize text-muted underline hover:text-ink"
          >
            View all
          </Link>
        </div>
        <div className="hidden shrink-0 lg:flex">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edges.start}
            aria-label={`Previous ${title} products`}
            className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:bg-surface-subtle disabled:cursor-auto disabled:bg-transparent disabled:text-[#bec2c6]"
          >
            <ChevronLeftIcon size={20} />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edges.end}
            aria-label={`Next ${title} products`}
            className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:bg-surface-subtle disabled:cursor-auto disabled:bg-transparent disabled:text-[#bec2c6]"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        className="gs-carousel flex items-start gap-1 overflow-x-auto overflow-y-hidden pl-4 lg:pl-0"
      >
        {products.map((product) => (
          <li key={product.id} className="shrink-0 basis-[60vw] lg:basis-[calc(20%-3.5px)]">
            <ProductCard product={product} infoClassName="py-4 pr-2" />
          </li>
        ))}
        {/* Trailing gutter so the last card can scroll clear of the edge. */}
        <li aria-hidden="true" className="min-h-px min-w-4 shrink-0 md:min-w-10 lg:hidden" />
      </ul>
    </section>
  )
}
