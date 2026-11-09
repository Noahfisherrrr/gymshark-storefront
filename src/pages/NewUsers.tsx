import { useEffect, useState } from 'react'
import { api } from '../api'
import ActivityCarousel from '../components/home/ActivityCarousel'
import Banner from '../components/home/Banner'
import CardsCarousel from '../components/home/CardsCarousel'
import ProductCarousel from '../components/home/ProductCarousel'
import TextBlock from '../components/home/TextBlock'
import CategoryGrid from '../components/shop/CategoryGrid'
import {
  NEW_USERS_ACTIVITIES,
  NEW_USERS_FAMILIES,
  NEW_USERS_HERO,
  NEW_USERS_MORE,
  NEW_USERS_SHOP_TILES,
  NEW_USERS_TOP_MEN,
  NEW_USERS_TOP_WOMEN,
} from '../config/newUsers'
import type { Product } from '../api/contract'

function useTrending(query?: { gender?: 'f' | 'm' | null; limit?: number }) {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    api.search.trendingProducts(query).then(setProducts)
  }, [query])
  return products
}

// gymshark.com's /pages/new-users — the "New to Gymshark?" hub linked from
// the Explore nav and both gender menus. Welcome hero → how do you train →
// get to know our families → top 10 bestsellers (women/men) → shop the
// range → wait there's more.
export default function NewUsers() {
  const topWomen = useTrending(NEW_USERS_TOP_WOMEN.query)
  const topMen = useTrending(NEW_USERS_TOP_MEN.query)

  return (
    <div>
      <Banner {...NEW_USERS_HERO} headingLevel="h1" priority />
      <ActivityCarousel {...NEW_USERS_ACTIVITIES} />
      <TextBlock title="Get to know our families" copy="Loved by the Gymshark community, and soon to be loved by you too." />
      <CardsCarousel {...NEW_USERS_FAMILIES} />
      <ProductCarousel title={NEW_USERS_TOP_WOMEN.title} href={NEW_USERS_TOP_WOMEN.href} products={topWomen} />
      <ProductCarousel title={NEW_USERS_TOP_MEN.title} href={NEW_USERS_TOP_MEN.href} products={topMen} />
      <CategoryGrid {...NEW_USERS_SHOP_TILES} />
      <CardsCarousel {...NEW_USERS_MORE} />
    </div>
  )
}
