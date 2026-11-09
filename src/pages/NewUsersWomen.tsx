import { useEffect, useState } from 'react'
import { api } from '../api'
import ActivityCarousel from '../components/home/ActivityCarousel'
import Banner from '../components/home/Banner'
import CardsCarousel from '../components/home/CardsCarousel'
import ProductCarousel from '../components/home/ProductCarousel'
import TextBlock from '../components/home/TextBlock'
import CategoryGrid from '../components/shop/CategoryGrid'
import {
  NEW_USERS_SHOP_TILES,
  NEW_USERS_WOMEN_ACTIVITIES,
  NEW_USERS_WOMEN_FAMILIES,
  NEW_USERS_WOMEN_FIND_FIT,
  NEW_USERS_WOMEN_HERO,
  NEW_USERS_WOMEN_PERFECT_FIT,
  NEW_USERS_WOMEN_TOP_RATED,
} from '../config/newUsers'
import type { Product } from '../api/contract'

function useTrending(query?: { gender?: 'f' | 'm' | null; limit?: number }) {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    api.search.trendingProducts(query).then(setProducts)
  }, [query])
  return products
}

// gymshark.com's /pages/new-users/women. Same "New to Gymshark?" hub as
// NewUsers, narrowed to a single gender: welcome hero (no CTAs) → get to
// know our families → our top rated fits → how do you train → shop the
// range → the perfect fit → find your fit.
export default function NewUsersWomen() {
  const topRated = useTrending(NEW_USERS_WOMEN_TOP_RATED.query)

  return (
    <div>
      <Banner {...NEW_USERS_WOMEN_HERO} headingLevel="h1" priority />
      <CardsCarousel {...NEW_USERS_WOMEN_FAMILIES} />
      <ProductCarousel title={NEW_USERS_WOMEN_TOP_RATED.title} href={NEW_USERS_WOMEN_TOP_RATED.href} products={topRated} />
      <ActivityCarousel {...NEW_USERS_WOMEN_ACTIVITIES} />
      <CategoryGrid {...NEW_USERS_SHOP_TILES} />
      <TextBlock {...NEW_USERS_WOMEN_PERFECT_FIT} />
      <CardsCarousel {...NEW_USERS_WOMEN_FIND_FIT} />
    </div>
  )
}
