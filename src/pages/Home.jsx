import { useEffect, useState } from 'react'
import { api } from '../api'
import { getHomepage } from '../api/cms'
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

function useProductList(query) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.products.list(query).then(setProducts)
  }, [query])
  return products
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

// CMS-managed hero (Strapi Homepage single type) overrides the hardcoded
// fallback once a client editor publishes one — see
// Strapi_CMS_Setup_Guide.md's milestone: "edit a hero in Strapi, publish
// it, and see the existing React hero update."
function useHero() {
  const [hero, setHero] = useState(HOME_HERO)
  useEffect(() => {
    getHomepage().then((content) => {
      if (content?.hero) setHero(content.hero)
    })
  }, [])
  return hero
}

export default function Home() {
  const hero = useHero()
  return (
    <div>
      <Banner {...hero} headingLevel="h1" />
      <Carousel config={HOME_CAROUSELS.newIn} />
      <Carousel config={HOME_CAROUSELS.women} />
      <Banner {...HOME_VIDEO_BANNER} />
      <Carousel config={HOME_CAROUSELS.men} />
      <Carousel config={HOME_CAROUSELS.accessories} />
      <BannerSlim {...HOME_PROMO_BANNER} />
      <Carousel config={HOME_CAROUSELS.sale} title={saleTitle} />
      <TabbedProductGrid {...HOME_POPULAR} />
      <BlogCards {...HOME_BLOG} />
    </div>
  )
}
