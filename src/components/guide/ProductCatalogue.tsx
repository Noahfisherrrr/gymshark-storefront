import { useState } from 'react'
import type { Ref } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { productThumb } from '../../lib/images'
import type { Product } from '../../api/contract'

const GridIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" aria-hidden="true" focusable="false">
    <rect x="0" y="0" width="9" height="7" />
    <rect x="11" y="0" width="9" height="7" />
    <rect x="0" y="9" width="9" height="7" />
    <rect x="11" y="9" width="9" height="7" />
  </svg>
)

const CompactIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" aria-hidden="true" focusable="false">
    <rect x="0" y="0" width="9" height="16" />
    <rect x="11" y="0" width="9" height="16" />
  </svg>
)

interface ProductCatalogueProps {
  ref?: Ref<HTMLElement>
  products: Product[]
  label?: string
}

// gymshark.com's in-page product catalogue: count + view toggle, then
// either an edge-to-edge image-only grid (default) or bigger padded cards
// with wishlist + details (compact).
export default function ProductCatalogue({ ref, products, label }: ProductCatalogueProps) {
  const [compact, setCompact] = useState(false)

  return (
    <section ref={ref} aria-label={label} className="scroll-mt-[76px]">
      <div className="flex items-center justify-between px-2 pb-2 md:px-10 md:pb-4">
        <span className="text-[14px] leading-[1.4] text-muted">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </span>
        <button
          type="button"
          onClick={() => setCompact((c) => !c)}
          aria-label={compact ? 'Switch to default grid view' : 'Switch to compact grid view'}
          className="flex items-center gap-4 p-1 text-[14px] leading-[1.4] text-ink"
        >
          View
          <span className={compact ? 'text-muted' : 'text-ink'}>
            <GridIcon />
          </span>
          <span className={compact ? 'text-ink' : 'text-muted'}>
            <CompactIcon />
          </span>
        </button>
      </div>

      {compact ? (
        <ul className="grid grid-cols-2 gap-0.5 px-2 lg:grid-cols-3 lg:px-10">
          {products.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-3 gap-0.5 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`/product/${product.id}`}
                aria-label={product.name}
                title={product.name}
                className="relative block aspect-[4/5] overflow-hidden bg-line"
              >
                {product.image && (
                  <img src={productThumb(product.image)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
