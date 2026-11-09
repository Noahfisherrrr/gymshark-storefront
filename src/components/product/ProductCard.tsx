import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/format'
import { productThumb } from '../../lib/images'
import { HeartFilledIcon, HeartIcon } from '../header/icons'
import type { Product, ProductVariant } from '../../api/contract'

// gymshark.com's product card: 4:5 image with the wishlist heart in the
// corner, then title (2 lines max), colour, and price — sale items show the
// original price struck through in red after the current one. Hovering the
// card eases the image in (their banner hover: .25s ease-in-out) and, on
// desktop, raises their quick-add tray over the image bottom: a 4-column size
// grid whose cells invert on hover. Picking a size adds it and opens the mini bag.
const SIZE_RUN = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

interface SizeSlot {
  size: string
  variant: ProductVariant | null
}

// Apparel always shows the full run (like theirs); sizes we don't carry in this
// colour render as sold out. Anything off-run (e.g. "One Size") lists as-is.
function quickAddSizes(variants: ProductVariant[]): SizeSlot[] {
  if (!variants.every((v) => SIZE_RUN.includes(v.size))) {
    return variants.map((v) => ({ size: v.size, variant: v.stock > 0 ? v : null }))
  }
  return SIZE_RUN.map((size) => {
    const variant = variants.find((v) => v.size === size && v.stock > 0) ?? null
    return { size, variant }
  })
}

// One Size products have nothing to pick between, so the size-hover tray
// (which exists purely to let shoppers choose a size) doesn't apply to them.
function isOneSize(variants: ProductVariant[]): boolean {
  return variants.every((v) => v.size.toLowerCase() === 'one size')
}

interface ProductCardProps {
  product: Product
  onNavigate?: () => void
  infoClassName?: string
}

export default function ProductCard({ product, onNavigate, infoClassName = 'p-2 min-[1440px]:p-4' }: ProductCardProps) {
  const { isWishlisted, toggle } = useWishlist()
  const { addItem, openMiniBag } = useCart()
  const [addingVariantId, setAddingVariantId] = useState<string | null>(null)
  const saved = isWishlisted(product.id)
  const href = `/product/${product.id}`
  const colour = product.variants[0]?.color
  const colourVariants = product.variants.filter((v) => v.color === colour)
  const sizes = isOneSize(colourVariants) ? [] : quickAddSizes(colourVariants)
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price

  async function handlePickSize(variant: ProductVariant) {
    if (addingVariantId) return
    setAddingVariantId(variant.id)
    try {
      await addItem({ productId: product.id, variantId: variant.id, quantity: 1 })
      openMiniBag()
    } finally {
      setAddingVariantId(null)
    }
  }

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
              src={productThumb(product.image)}
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

        {/* Desktop-only like theirs; unlike theirs, opens the instant you hover — no 500ms delay. */}
        {sizes.length > 0 && (
          <div
            role="region"
            aria-label={`Quick add ${product.name} sizes`}
            className="invisible absolute inset-x-0 bottom-0 z-[1] flex items-center justify-center overflow-hidden bg-white p-4 opacity-0 max-lg:hidden group-hover/card:visible group-hover/card:opacity-100"
          >
            <ul className="flex w-full flex-wrap [&>li:nth-child(-n+4)>button]:mt-0 [&>li:nth-child(4n+1)>button]:ml-0 [&>li:only-child>button]:basis-auto [&>li:only-child>button]:grow">
              {sizes.map(({ size, variant }) => {
                const soldOut = !variant
                const adding = Boolean(variant && addingVariantId === variant.id)
                return (
                  <li key={size} className="contents">
                    <button
                      type="button"
                      disabled={soldOut || adding}
                      onClick={() => variant && handlePickSize(variant)}
                      aria-label={soldOut ? `${product.name}, size ${size}, sold out` : `Add ${product.name}, size ${size}, to bag`}
                      className={`relative -ml-px -mt-px flex min-h-[52px] shrink-0 grow-0 basis-1/4 flex-col items-start justify-end overflow-hidden border px-2 py-1 text-left text-[12px] leading-[1.3] uppercase ${
                        soldOut
                          ? 'cursor-not-allowed border-line bg-white text-[#bec2c6] hover:bg-line hover:text-faint'
                          : adding
                            ? 'cursor-progress border-ink bg-ink text-white'
                            : 'border-line bg-white text-ink hover:z-[1] hover:border-ink hover:bg-ink hover:text-white'
                      }`}
                    >
                      <span>{size}</span>
                      {soldOut && (
                        <svg aria-hidden="true" className="absolute left-[10%] top-[11%] z-[1] h-[79%] w-[80%]">
                          <line x1="0" y1="100%" x2="100%" y2="0" className="stroke-line" strokeWidth="1" />
                        </svg>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
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
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </p>
      </div>
    </article>
  )
}
