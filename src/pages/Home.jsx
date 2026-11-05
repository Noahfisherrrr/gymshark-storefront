import { useEffect, useState } from 'react'
import { api } from '../api'
import Banner from '../components/home/Banner'
import ProductCarousel from '../components/home/ProductCarousel'
import TabbedProductGrid from '../components/home/TabbedProductGrid'
import { HOME_CAROUSELS, HOME_HERO, HOME_POPULAR, HOME_VIDEO_BANNER } from '../config/home'

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

export default function Home() {
  return (
    <div>
      <Banner {...HOME_HERO} headingLevel="h1" />
      <Carousel config={HOME_CAROUSELS.women} />
      <Banner {...HOME_VIDEO_BANNER} />
      <Carousel config={HOME_CAROUSELS.men} />
      <Carousel config={HOME_CAROUSELS.accessories} />
      <Carousel config={HOME_CAROUSELS.sale} title={saleTitle} />
      <TabbedProductGrid {...HOME_POPULAR} />
    </div>
  )
}
