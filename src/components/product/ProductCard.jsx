import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice } from '../../lib/format'
import { HeartFilledIcon, HeartIcon } from '../header/icons'

// gymshark.com's product card: 4:5 image with the wishlist heart in the
// corner, then title (2 lines max), colour, and price — sale items show the
// original price struck through in red after the current one. Hovering the
// card eases the image in (their banner hover: .25s ease-in-out) and
// underlines the title.
export default function ProductCard({ product, onNavigate, infoClassName = 'p-2 min-[1440px]:p-4' }) {
  const { isWishlisted, toggle } = useWishlist()
  const saved = isWishlisted(product.id)
  const href = `/product/${product.id}`
  const colour = product.variants[0]?.color
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price

  return (
    <article className="group/card relative flex min-w-0 flex-col text-left">
      <div className="relative">
        {/* Placeholder stock photography until the client catalog lands (Brief.md #6). */}
        <Link
          to={href}
          onClick={onNavigate}
          tabIndex={-1}
          aria-hidden="true"
          draggable={false}
          className="block aspect-[4/5] overflow-hidden bg-surface-subtle"
        >
          {product.image && (
            <img
              src={product.image}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-[250ms] ease-in-out group-hover/card:scale-[1.04]"
            />
          )}
        </Link>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center p-1.5 text-ink transition-transform duration-200 hover:scale-110"
        >
          {saved ? <HeartFilledIcon size={22} /> : <HeartIcon size={22} />}
        </button>
      </div>

      <div className={`flex flex-col bg-white text-[14px] leading-[1.4] ${infoClassName}`}>
        <Link
          to={href}
          onClick={onNavigate}
          draggable={false}
          className="line-clamp-2 capitalize text-ink decoration-1 underline-offset-2 group-hover/card:underline"
        >
          {product.name}
        </Link>
        {colour && <p className="mt-1 truncate capitalize text-muted">{colour}</p>}
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-ink">
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
