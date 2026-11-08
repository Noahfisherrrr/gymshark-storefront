import { useEffect, useState } from 'react'
import { api } from '../api'
import Banner from '../components/home/Banner'
import BannerSlim from '../components/home/BannerSlim'
import BlogCards from '../components/home/BlogCards'
import ProductCarousel from '../components/home/ProductCarousel'
import TabbedProductGrid from '../components/home/TabbedProductGrid'
import {
  HOME_BLOG,
  HOME_CAROUSELS,
  HOME_HERO,
  HOME_POPULAR,
  HOME_PROMO_BANNER,
  HOME_VIDEO_BANNER,
} from '../config/home'
import { getBannerBySlug } from '../lib/contentful'

function useProductList(query) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.products.list(query).then(setProducts)
  }, [query])
  return products
}

// Renders the local config/home.js placeholder immediately, then swaps in
// the Contentful entry for `slug` if one exists — stays on the placeholder
// when Contentful isn't configured yet, or has no matching entry.
function useBanner(slug, fallback) {
  const [banner, setBanner] = useState(fallback)
  useEffect(() => {
    getBannerBySlug(slug).then((entry) => {
      if (entry) setBanner(entry)
    })
  }, [slug])
  return banner
}

// "Up to 40% off", from the deepest discount in the sale list.
function saleTitle(products) {
  const best = Math.max(
    0,
    ...products.map((p) => Math.round((1 - p.price / p.compareAtPrice) * 100)),
  )
  return best > 0 ? `Sale – up to ${best}% off` : 'Sale'
}

function Carousel({ config, title }) {
  const products = useProductList(config.query)
  return <ProductCarousel title={title?.(products) ?? config.title} href={config.href} products={products} />
}

export default function Home() {
  const hero = useBanner('home-hero', HOME_HERO)
  const videoBanner = useBanner('home-video-banner', HOME_VIDEO_BANNER)
  const promoBanner = useBanner('home-promo-banner', HOME_PROMO_BANNER)

  return (
    <div>
      <Banner {...hero} headingLevel="h1" priority />
      <Carousel config={HOME_CAROUSELS.newIn} />
      <Carousel config={HOME_CAROUSELS.women} />
      <Banner {...videoBanner} />
      <Carousel config={HOME_CAROUSELS.men} />
      <Carousel config={HOME_CAROUSELS.accessories} />
      <BannerSlim {...promoBanner} />
      <Carousel config={HOME_CAROUSELS.sale} title={saleTitle} />
      <TabbedProductGrid {...HOME_POPULAR} />
      <BlogCards {...HOME_BLOG} />
    </div>
  )
}
