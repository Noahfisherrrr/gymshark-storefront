import { useEffect, useRef, useState } from 'react'
import { api } from '../api'
import GuideHero from '../components/guide/GuideHero'
import CardCarousel from '../components/guide/CardCarousel'
import Top10Carousel from '../components/guide/Top10Carousel'
import GuideTextBlock from '../components/guide/GuideTextBlock'
import ContentBlock from '../components/guide/ContentBlock'
import ProductCatalogue from '../components/guide/ProductCatalogue'
import FloatingShopBar from '../components/guide/FloatingShopBar'
import {
  LEGGINGS_GUIDE_ACTIVITIES,
  LEGGINGS_GUIDE_BESTSELLERS,
  LEGGINGS_GUIDE_CATALOGUE,
  LEGGINGS_GUIDE_DETAILS,
  LEGGINGS_GUIDE_FIND_OUT_MORE,
  LEGGINGS_GUIDE_HERO,
  LEGGINGS_GUIDE_PERFECT_FIT,
  LEGGINGS_GUIDE_SCRUNCH_PROMO,
  LEGGINGS_GUIDE_TOP_10,
} from '../config/leggingsGuide'
import type { RefObject } from 'react'
import type { Product, ProductListOptions } from '../api/contract'

function useProductList(query?: ProductListOptions) {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    api.products.list(query).then(setProducts)
  }, [query])
  return products
}

// Ignores whatever sits under the 76px sticky header (+1px so a section
// parked exactly against it, e.g. after the hero's scroll button, is out).
function useInView(ref: RefObject<HTMLElement | null>, initial: boolean) {
  const [inView, setInView] = useState(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '-77px 0px 0px 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

// gymshark.com's /pages/leggings-guide.
export default function LeggingsGuide() {
  const topLeggings = useProductList(LEGGINGS_GUIDE_TOP_10.query)
  const catalogue = useProductList(LEGGINGS_GUIDE_CATALOGUE.query)
  const heroRef = useRef<HTMLDivElement>(null)
  const catalogueRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, true)
  const catalogueInView = useInView(catalogueRef, false)

  return (
    <>
      <div className="grid grid-cols-1 gap-20">
        <GuideHero ref={heroRef} {...LEGGINGS_GUIDE_HERO} headingLevel="h1" priority />
        <CardCarousel {...LEGGINGS_GUIDE_BESTSELLERS} />
        <Top10Carousel title={LEGGINGS_GUIDE_TOP_10.title} products={topLeggings} />
        <CardCarousel {...LEGGINGS_GUIDE_ACTIVITIES} />
        <GuideHero {...LEGGINGS_GUIDE_SCRUNCH_PROMO} variant="left-bottom" />
        <CardCarousel {...LEGGINGS_GUIDE_DETAILS} />
        <GuideTextBlock title={LEGGINGS_GUIDE_PERFECT_FIT.title} copy={LEGGINGS_GUIDE_PERFECT_FIT.copy} />
        <ContentBlock cards={LEGGINGS_GUIDE_PERFECT_FIT.cards} label={LEGGINGS_GUIDE_PERFECT_FIT.title} />
        <GuideTextBlock title={LEGGINGS_GUIDE_FIND_OUT_MORE.title} />
        <ContentBlock cards={LEGGINGS_GUIDE_FIND_OUT_MORE.cards} label={LEGGINGS_GUIDE_FIND_OUT_MORE.title} />
        <ProductCatalogue ref={catalogueRef} products={catalogue} label={LEGGINGS_GUIDE_CATALOGUE.label} />
      </div>

      <FloatingShopBar
        label={LEGGINGS_GUIDE_CATALOGUE.label}
        count={catalogue.length}
        visible={!heroInView && !catalogueInView && catalogue.length > 0}
        onShop={() => catalogueRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />
    </>
  )
}
