import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import Banner from '../components/home/Banner'
import CardsCarousel from '../components/home/CardsCarousel'
import ActivityCarousel from '../components/home/ActivityCarousel'
import ProductCarousel from '../components/home/ProductCarousel'
import { productThumb } from '../lib/images'
import {
  LEGGINGS_GUIDE_ACTIVITIES,
  LEGGINGS_GUIDE_BESTSELLERS,
  LEGGINGS_GUIDE_DETAILS,
  LEGGINGS_GUIDE_FIND_OUT_MORE,
  LEGGINGS_GUIDE_HERO,
  LEGGINGS_GUIDE_PERFECT_FIT,
  LEGGINGS_GUIDE_SCRUNCH_PROMO,
  LEGGINGS_GUIDE_TOP_10,
} from '../config/leggingsGuide'

function useProductList(query) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.products.list(query).then(setProducts)
  }, [query])
  return products
}

// "The perfect fit": a heading + copy followed by three plain (non-tabbed,
// non-linking) cards — gymshark.com doesn't route these anywhere, they're
// pure sizing guidance, unlike every other card row on this page.
function PerfectFitSection({ title, copy, cards }) {
  return (
    <section className="mx-auto w-full max-w-[3000px] py-8 lg:px-10 lg:py-16">
      <div className="mx-auto mb-10 flex max-w-[680px] flex-col gap-2 px-4 text-center">
        <h2 className="font-display text-[clamp(24px,20.8px+0.8vw,32px)] font-bold uppercase leading-[1] tracking-[-0.01em] text-ink">
          {title}
        </h2>
        {copy && <p className="text-[14px] leading-[1.5] text-muted">{copy}</p>}
      </div>
      <ul className="gs-carousel flex items-start gap-4 overflow-x-auto overflow-y-hidden px-4 md:px-[30px] lg:justify-center lg:overflow-visible lg:px-0">
        {cards.map((card) => (
          <li key={card.id} className="shrink-0 basis-[75vw] md:basis-[320px]">
            <div className="aspect-[4/3] w-full overflow-hidden bg-surface-subtle">
              <img src={productThumb(card.image)} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 text-[16px] font-bold uppercase leading-[1.3] text-ink">{card.title}</h3>
            {card.copy && <p className="mt-1 text-[14px] leading-[1.4] text-muted">{card.copy}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

// gymshark.com's /pages/leggings-guide — the editorial "find your leggings"
// hub linked from the Explore mega-menu and the women's nav (Brief.md #6:
// Whitney → Signature per the athlete-collab placeholder rule, same as
// src/config/newUsers.js's family cards).
export default function LeggingsGuide() {
  const topLeggings = useProductList(LEGGINGS_GUIDE_TOP_10.query)

  return (
    <div>
      <Banner {...LEGGINGS_GUIDE_HERO} headingLevel="h1" priority />
      <CardsCarousel {...LEGGINGS_GUIDE_BESTSELLERS} />
      <ProductCarousel title={LEGGINGS_GUIDE_TOP_10.title} href={LEGGINGS_GUIDE_TOP_10.href} products={topLeggings} />
      <ActivityCarousel {...LEGGINGS_GUIDE_ACTIVITIES} />
      <Banner {...LEGGINGS_GUIDE_SCRUNCH_PROMO} />
      <CardsCarousel {...LEGGINGS_GUIDE_DETAILS} />
      <PerfectFitSection {...LEGGINGS_GUIDE_PERFECT_FIT} />
      <CardsCarousel {...LEGGINGS_GUIDE_FIND_OUT_MORE} />

      <div className="mx-auto w-full max-w-[3000px] px-4 pb-12 text-center md:px-[30px] lg:px-10">
        <Link
          to={LEGGINGS_GUIDE_PERFECT_FIT.href}
          className="gs-underline-cta inline-flex h-8 items-center whitespace-nowrap text-[14px] uppercase leading-[1.4] text-ink"
        >
          Shop All Leggings
        </Link>
      </div>
    </div>
  )
}
