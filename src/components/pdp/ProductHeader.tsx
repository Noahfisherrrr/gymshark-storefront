import { StarIcon, InfoIcon } from './pdpIcons'
import { formatPrice } from '../../lib/format'
import type { Product } from '../../api/contract'

interface ProductHeaderProps {
  product: Product
  onOpenKlarna?: () => void
  onScrollToReviews?: () => void
}

export default function ProductHeader({ product, onOpenKlarna, onScrollToReviews }: ProductHeaderProps) {
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price
  const discountPercent = onSale
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  const installmentAmount = (product.price / 4).toFixed(2)

  return (
    <header className="flex flex-col gap-2">
      {/* Category / Collection Tag & Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/60">
        {product.collectionName && (
          <span className="text-black font-semibold">{product.collectionName}</span>
        )}
        {product.subtitle && (
          <>
            <span>•</span>
            <span>{product.subtitle}</span>
          </>
        )}
        {product.tag && (
          <span className="rounded-xs bg-black px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Title */}
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
        {product.name}
      </h1>

      {/* Ratings & Reviews summary */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onScrollToReviews}
          className="group flex items-center gap-1.5 text-xs text-black/80 hover:text-black"
          aria-label={`Rated ${product.rating || 4.8} out of 5 stars based on ${product.reviewCount || 0} reviews`}
        >
          <div className="flex items-center text-black">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                size={14}
                filled={star <= Math.round(product.rating || 4.8)}
                className="text-black fill-black"
              />
            ))}
          </div>
          <span className="font-semibold text-black">{product.rating ? product.rating.toFixed(1) : '4.8'}</span>
          <span className="text-black/60 group-hover:underline">({product.reviewCount || 142} reviews)</span>
        </button>
      </div>

      {/* Pricing row */}
      <div className="mt-1 flex items-baseline gap-3">
        <span className={`text-2xl font-extrabold tracking-tight ${onSale ? 'text-red-600' : 'text-black'}`}>
          {formatPrice(product.price)}
        </span>
        {onSale && (
          <>
            <span className="text-base text-black/40 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
            <span className="rounded-xs bg-red-100 px-2 py-0.5 text-xs font-bold uppercase text-red-700">
              {discountPercent}% OFF
            </span>
          </>
        )}
      </div>

      {/* Installments info (Klarna / Afterpay) */}
      <div className="mt-1 flex items-center gap-1 text-xs text-black/70">
        <span>or 4 interest-free payments of <strong>${installmentAmount}</strong> with</span>
        <span className="font-bold tracking-tight text-black">Klarna</span>
        <button
          type="button"
          onClick={onOpenKlarna}
          aria-label="More information about Klarna payment plans"
          className="ml-1 text-black/50 hover:text-black"
        >
          <InfoIcon size={14} />
        </button>
      </div>
    </header>
  )
}
