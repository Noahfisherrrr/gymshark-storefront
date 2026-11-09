import { useEffect, useState } from 'react'
import { api } from '../api'
import Banner from '../components/home/Banner'
import BannerSlim from '../components/home/BannerSlim'
import BlogCards from '../components/home/BlogCards'
import ProductCarousel from '../components/home/ProductCarousel'
import CategoryGrid from '../components/shop/CategoryGrid'
import {
  SHOP_MEN_ACTIVITIES,
  SHOP_MEN_BEST_SELLERS,
  SHOP_MEN_CATEGORIES,
  SHOP_MEN_COLLECTIONS,
  SHOP_MEN_EDITORIAL,
  SHOP_MEN_HERO,
  SHOP_MEN_NEW_IN,
  SHOP_MEN_PROMO,
} from '../config/shopMen'
import type { Product, ProductListOptions } from '../api/contract'

function useProductList(query?: ProductListOptions) {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    api.products.list(query).then(setProducts)
  }, [query])
  return products
}

function useTrending(query?: { gender?: 'f' | 'm' | null; limit?: number }) {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    api.search.trendingProducts(query).then(setProducts)
  }, [query])
  return products
}

// gymshark.com's /pages/shop-men landing page. Unlike /shop (the
// filterable PLP it ultimately routes into), this is pure curation — no
// filter/sort controls of its own, just hero → new in → shop by category →
// promo → shop by activity → best sellers → shop by collection → editorial.
export default function ShopMen() {
  const newIn = useProductList(SHOP_MEN_NEW_IN.query)
  const bestSellers = useTrending(SHOP_MEN_BEST_SELLERS.query)

  return (
    <div>
      <Banner {...SHOP_MEN_HERO} headingLevel="h1" priority />
      <ProductCarousel title={SHOP_MEN_NEW_IN.title} href={SHOP_MEN_NEW_IN.href} products={newIn} />
      <CategoryGrid {...SHOP_MEN_CATEGORIES} />
      <BannerSlim {...SHOP_MEN_PROMO} />
      <CategoryGrid {...SHOP_MEN_ACTIVITIES} />
      <ProductCarousel title={SHOP_MEN_BEST_SELLERS.title} href={SHOP_MEN_BEST_SELLERS.href} products={bestSellers} />
      <CategoryGrid {...SHOP_MEN_COLLECTIONS} />
      <BlogCards {...SHOP_MEN_EDITORIAL} />
    </div>
  )
}
