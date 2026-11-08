import { Link } from 'react-router-dom'
import { formatPrice } from '../../lib/format'
import { productThumb } from '../../lib/images'
import { useCarouselPaging } from '../../hooks/useCarouselPaging'
import CarouselHeader from './CarouselHeader'
import '../home/home.css'

function RankedCard({ product, rank }) {
  const href = `/product/${product.id}`
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price

  return (
    <article className="group relative flex flex-col text-[14px] leading-[1.4]">
      <span className="absolute left-2 top-2 z-[2] flex h-6 w-6 items-center justify-center bg-white font-bold text-ink">
        {rank}
      </span>
      <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/5] overflow-hidden bg-line">
        {product.image && (
          <img src={productThumb(product.image)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )}
        {product.tag && (
          <span className="absolute bottom-2 left-2 max-w-[calc(100%-16px)] truncate bg-surface-subtle px-2 py-[3px] text-[12px] leading-[1.6] text-ink">
            {product.tag}
          </span>
        )}
      </Link>
      <div className="flex flex-col bg-white py-4 pr-2">
        <Link to={href} className="line-clamp-2 capitalize text-ink decoration-1 underline-offset-2 group-hover:underline">
          {product.name}
        </Link>
        <p className="mt-4 flex flex-wrap items-center gap-x-1.5 text-ink">
          <span>{formatPrice(product.price)}</span>
          {onSale && (
            <span className="text-sale line-through">
              <span className="sr-only">Was </span>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </p>
      </div>
    </article>
  )
}

// gymshark.com's "Top 10" product carousel: numbered rank badge top-left,
// merch tag bottom-left of the image, five-up on desktop.
export default function Top10Carousel({ title, products }) {
  const { trackRef, edges, update, page } = useCarouselPaging(products)
  if (products.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-[3000px] lg:px-10" aria-label={title}>
      <CarouselHeader title={title} edges={edges} onPage={page} />
      <ol
        ref={trackRef}
        onScroll={update}
        className="gs-carousel flex items-start gap-2 overflow-x-auto overflow-y-hidden pl-4 lg:pl-0"
      >
        {products.map((product, i) => (
          <li key={product.id} className="shrink-0 basis-[38vw] lg:basis-[calc(20%-3.5px)]">
            <RankedCard product={product} rank={i + 1} />
          </li>
        ))}
        <li aria-hidden="true" className="min-h-px min-w-2 shrink-0 lg:hidden" />
      </ol>
    </section>
  )
}
