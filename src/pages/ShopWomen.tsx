import { useEffect, useState } from 'react'
import { api } from '../api'
import Banner from '../components/home/Banner'
import BannerSlim from '../components/home/BannerSlim'
import BlogCards from '../components/home/BlogCards'
import ProductCarousel from '../components/home/ProductCarousel'
import CategoryGrid from '../components/shop/CategoryGrid'
import {
  SHOP_WOMEN_ACTIVITIES,
  SHOP_WOMEN_BEST_SELLERS,
  SHOP_WOMEN_CATEGORIES,
  SHOP_WOMEN_COLLECTIONS,
  SHOP_WOMEN_EDITORIAL,
  SHOP_WOMEN_HERO,
  SHOP_WOMEN_NEW_IN,
  SHOP_WOMEN_PROMO,
} from '../config/shopWomen'
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

// gymshark.com's /pages/shop-women landing page. Unlike /shop (the
// filterable PLP it ultimately routes into), this is pure curation — no
// filter/sort controls of its own, just hero → new in → shop by category →
// promo → shop by activity → best sellers → shop by collection → editorial.
export default function ShopWomen() {
  const newIn = useProductList(SHOP_WOMEN_NEW_IN.query)
  const bestSellers = useTrending(SHOP_WOMEN_BEST_SELLERS.query)

  return (
    <div>
      <Banner {...SHOP_WOMEN_HERO} headingLevel="h1" priority />
      <ProductCarousel title={SHOP_WOMEN_NEW_IN.title} href={SHOP_WOMEN_NEW_IN.href} products={newIn} />
      <CategoryGrid {...SHOP_WOMEN_CATEGORIES} />
      <BannerSlim {...SHOP_WOMEN_PROMO} />
      <CategoryGrid {...SHOP_WOMEN_ACTIVITIES} />
      <ProductCarousel title={SHOP_WOMEN_BEST_SELLERS.title} href={SHOP_WOMEN_BEST_SELLERS.href} products={bestSellers} />
      <CategoryGrid {...SHOP_WOMEN_COLLECTIONS} />
      <BlogCards {...SHOP_WOMEN_EDITORIAL} />
    </div>
  )
}
