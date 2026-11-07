import { useEffect, useState } from 'react'
import { api } from '../api'
import ActivityCarousel from '../components/home/ActivityCarousel'
import Banner from '../components/home/Banner'
import CardsCarousel from '../components/home/CardsCarousel'
import ProductCarousel from '../components/home/ProductCarousel'
import CategoryGrid from '../components/shop/CategoryGrid'
import {
  NEW_USERS_MEN_ACTIVITIES,
  NEW_USERS_MEN_FAMILIES,
  NEW_USERS_MEN_HERO,
  NEW_USERS_MEN_TOP_RATED,
  NEW_USERS_MORE,
  NEW_USERS_SHOP_TILES,
} from '../config/newUsers'

function useTrending(query) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.search.trendingProducts(query).then(setProducts)
  }, [query])
  return products
}

// gymshark.com's /pages/new-users/men. Welcome hero (no CTAs) → get to
// know our families → how do you train → our top rated fits → shop the
// range → wait there's more.
export default function NewUsersMen() {
  const topRated = useTrending(NEW_USERS_MEN_TOP_RATED.query)

  return (
    <div>
      <Banner {...NEW_USERS_MEN_HERO} headingLevel="h1" priority />
      <CardsCarousel {...NEW_USERS_MEN_FAMILIES} />
      <ActivityCarousel {...NEW_USERS_MEN_ACTIVITIES} />
      <ProductCarousel title={NEW_USERS_MEN_TOP_RATED.title} href={NEW_USERS_MEN_TOP_RATED.href} products={topRated} />
      <CategoryGrid {...NEW_USERS_SHOP_TILES} />
      <CardsCarousel {...NEW_USERS_MORE} />
    </div>
  )
}
