import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../../api'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCartLines } from '../../hooks/useCartLines'
import { formatPrice } from '../../lib/format'
import { FREE_STANDARD_SHIPPING_THRESHOLD, MAX_LINE_QUANTITY } from '../../config/store'
import Modal from '../ui/Modal'
import {
  BagFilledIcon,
  BagIcon,
  CloseIcon,
  HeartFilledIcon,
  HeartIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
} from '../header/icons'
import './minibag.css'

const PRIMARY_BUTTON =
  'flex h-[51px] w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-[14px] leading-[1.4] text-white hover:bg-ink-hover'
const HEADING = 'font-display text-[clamp(18px,17.3px+0.19vw,20px)] font-medium uppercase leading-[0.94]'
const SNACKBOX_MS = 5000

function Thumb({ src }) {
  return src ? (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-[250ms] ease-in-out hover:scale-[1.04]"
    />
  ) : null
}

function ShippingProgress({ subtotal }) {
  const progress = Math.min(subtotal / FREE_STANDARD_SHIPPING_THRESHOLD, 1)
  const remaining = FREE_STANDARD_SHIPPING_THRESHOLD - subtotal
  // Starts empty and eases to the real value once the bag is open.
  const [filled, setFilled] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setFilled(progress), 300)
    return () => clearTimeout(id)
  }, [progress])

  return (
    <div className="mb-6">
      <div className="mb-2 flex min-h-6 items-center px-4 text-[12px] leading-[1.3] text-ink lg:px-6">
        {remaining > 0 ? (
          <p>
            You&rsquo;re {formatPrice(remaining)} away from <span>Free Standard Shipping</span>
          </p>
        ) : (
          <p>You&rsquo;ve qualified for Free Standard Shipping</p>
        )}
      </div>
      <div className="mx-4 h-1.5 overflow-hidden bg-line md:mx-6" role="presentation">
        <div className="gs-shipping-fill h-full bg-accent-blue" style={{ transform: `scaleX(${filled})` }} />
      </div>
    </div>
  )
}

function QuantitySelector({ quantity, max, busy, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center text-[12px] leading-[1.3]">
      <button
        type="button"
        onClick={onDecrease}
        disabled={busy}
        aria-label={quantity === 1 ? 'Remove item' : 'Decrease quantity'}
        className="flex h-8 w-8 items-center justify-center hover:text-muted disabled:cursor-auto disabled:text-[#bec2c6]"
      >
        <MinusIcon size={20} />
      </button>
      <span className="flex h-6 w-6 items-center justify-center" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={busy || quantity >= max}
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center hover:text-muted disabled:cursor-auto disabled:text-[#bec2c6]"
      >
        <PlusIcon size={20} />
      </button>
    </div>
  )
}

function WishlistButton({ productId }) {
  const { isWishlisted, toggle } = useWishlist()
  const saved = isWishlisted(productId)
  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      className="flex h-8 w-8 items-center justify-center"
    >
      {saved ? <HeartFilledIcon size={20} /> : <HeartIcon size={20} />}
    </button>
  )
}

function LineItem({ line, onRemoved, onNavigate }) {
  const { updateQuantity, removeItem } = useCart()
  const [busy, setBusy] = useState(false)
  const max = Math.min(line.variant.stock, MAX_LINE_QUANTITY)
  const href = `/product/${line.product.id}`

  async function change(delta) {
    setBusy(true)
    try {
      const next = line.quantity + delta
      if (next <= 0) {
        await removeItem(line.id)
        onRemoved(line)
      } else {
        await updateQuantity(line.id, next)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <li className="mx-4 py-2 first:pt-0 md:mx-6">
      <article className="flex gap-4">
        <Link
          to={href}
          onClick={onNavigate}
          tabIndex={-1}
          aria-hidden="true"
          className="block aspect-[4/5] w-[100px] shrink-0 overflow-hidden bg-surface-subtle"
        >
          <Thumb src={line.product.image} />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col text-[14px] leading-[1.4]">
          <Link to={href} onClick={onNavigate} className="capitalize text-ink">
            {line.product.name}
          </Link>
          <p className="capitalize text-muted">
            {line.variant.color} | {line.variant.size}
          </p>
          <p className="font-bold">{formatPrice(line.product.price)}</p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <QuantitySelector
              quantity={line.quantity}
              max={max}
              busy={busy}
              onDecrease={() => change(-1)}
              onIncrease={() => change(1)}
            />
            <WishlistButton productId={line.product.id} />
          </div>
        </div>
      </article>
    </li>
  )
}

function RemovedSnackbox({ line, onUndo, className }) {
  return (
    <div
      role="alertdialog"
      aria-label="Item removed"
      className={`gs-snackbox flex min-h-16 items-center justify-between gap-2 bg-ink p-3 text-white ${className}`}
    >
      <p className="text-[14px] leading-[1.4]">You removed an item from your bag.</p>
      {line && (
        <button type="button" onClick={onUndo} className="px-2 text-[14px] font-bold leading-[1.4]">
          Undo
        </button>
      )}
    </div>
  )
}

function EmptyBag({ onNavigate }) {
  return (
    <div className="absolute top-1/2 flex max-w-[230px] -translate-y-1/2 flex-col items-center self-center text-center">
      {/* Stand-in for Gymshark's empty-bag illustration — client art pending (Brief.md #3). */}
      <BagIcon size={135} strokeWidth={0.6} className="mb-6 text-faint" />
      <h2 className={`${HEADING} mb-2`}>Your bag is empty</h2>
      <p className="mb-4 text-[14px] leading-[1.4] text-faint">There are no products in your bag</p>
      <div className="flex w-full flex-col gap-2">
        <Link to="/shop?category=men" onClick={onNavigate} className={PRIMARY_BUTTON}>
          Shop Mens
        </Link>
        <Link to="/shop?category=women" onClick={onNavigate} className={PRIMARY_BUTTON}>
          Shop Womens
        </Link>
      </div>
    </div>
  )
}

function WishlistView({ onNavigate }) {
  const { productIds, toggle } = useWishlist()
  const [products, setProducts] = useState(null)

  useEffect(() => {
    api.products.list().then(setProducts)
  }, [])

  if (!products) return null
  const saved = productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center px-4 pt-10 text-center md:px-10">
        <h2 className={`${HEADING} mb-2`}>Your wishlist is empty</h2>
        <p className="mb-6 max-w-[320px] text-[14px] leading-[1.4] text-faint">
          Tap the heart next to anything you like the look of and we&rsquo;ll save it here.
        </p>
        <Link to="/shop" onClick={onNavigate} className={`${PRIMARY_BUTTON} max-w-[256px]`}>
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <ul className="flex flex-col">
        {saved.map((product) => (
          <li key={product.id} className="mx-4 py-2 first:pt-0 md:mx-6">
            <article className="flex gap-4">
              <Link
                to={`/product/${product.id}`}
                onClick={onNavigate}
                tabIndex={-1}
                aria-hidden="true"
                className="block aspect-[4/5] w-[100px] shrink-0 overflow-hidden bg-surface-subtle"
              >
                <Thumb src={product.image} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col text-[14px] leading-[1.4]">
                <Link to={`/product/${product.id}`} onClick={onNavigate} className="capitalize text-ink">
                  {product.name}
                </Link>
                <p className="capitalize text-muted">{product.variants[0]?.color}</p>
                <p className="font-bold">{formatPrice(product.price)}</p>
                <div className="mt-auto flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => toggle(product.id)}
                    aria-label="Remove from wishlist"
                    className="flex h-8 w-8 items-center justify-center"
                  >
                    <HeartFilledIcon size={20} />
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Link
        to="/wishlist"
        onClick={onNavigate}
        className="mx-auto mt-10 flex w-fit pb-10 text-[14px] leading-[1.4] text-muted underline"
      >
        View full wishlist
      </Link>
    </div>
  )
}

function MiniBagPanel({ onClose }) {
  const { addItem } = useCart()
  const { lines, subtotal, loading } = useCartLines()
  const [view, setView] = useState('bag')
  const [scroll, setScroll] = useState({ scrolled: false, atBottom: false })
  const [removed, setRemoved] = useState(null)

  useEffect(() => {
    if (!removed) return
    const id = setTimeout(() => setRemoved(null), SNACKBOX_MS)
    return () => clearTimeout(id)
  }, [removed])

  function handleScroll(e) {
    const el = e.currentTarget
    setScroll({
      scrolled: el.scrollTop > 0,
      atBottom: el.scrollHeight - el.scrollTop <= el.clientHeight + 1,
    })
  }

  async function undoRemove() {
    const line = removed
    setRemoved(null)
    await addItem({ productId: line.productId, variantId: line.variantId, quantity: line.quantity })
  }

  const empty = !loading && lines.length === 0
  const showingWishlist = view === 'wishlist'

  return (
    <div className="gs-minibag-panel" onScroll={handleScroll}>
      <div className="sticky top-0 z-[110] flex items-center gap-4 bg-white px-4 py-6 md:px-6">
        <h2 className={`${HEADING} flex-1 text-left`}>{showingWishlist ? 'Wishlist' : 'Your bag'}</h2>
        <button
          type="button"
          role="switch"
          aria-checked={showingWishlist}
          aria-label="Show wishlist"
          onClick={() => setView(showingWishlist ? 'bag' : 'wishlist')}
          className="gs-icon-toggle flex min-w-[120px] items-center gap-2"
        >
          <span data-active={!showingWishlist} className="flex items-center justify-center px-4 py-2">
            <BagIcon size={20} />
          </span>
          <span data-active={showingWishlist} className="flex items-center justify-center px-4 py-2">
            <HeartIcon size={20} />
          </span>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex items-center transition-opacity duration-200 hover:opacity-60"
        >
          <CloseIcon size={22} />
        </button>
      </div>

      {showingWishlist && <WishlistView onNavigate={onClose} />}

      {!showingWishlist && empty && (
        <>
          <EmptyBag onNavigate={onClose} />
          {removed && (
            <RemovedSnackbox
              line={removed}
              onUndo={undoRemove}
              className="absolute inset-x-0 bottom-10 mx-4 md:mx-auto md:w-full md:max-w-[452px]"
            />
          )}
        </>
      )}

      {!showingWishlist && !empty && !loading && (
        <>
          <ShippingProgress subtotal={subtotal} />
          {lines.some((line) => line.variant.stock > 0) && (
            <p className="mx-4 mb-6 flex gap-2 text-[14px] leading-[1.4] md:mx-6">
              <InfoIcon size={16} className="mt-0.5 shrink-0" />
              <span>
                <b>Your items aren&rsquo;t reserved</b>, checkout quickly to make sure you don&rsquo;t miss
                out.
              </span>
            </p>
          )}
          <ul className="flex flex-col">
            {lines.map((line) => (
              <LineItem key={line.id} line={line} onRemoved={setRemoved} onNavigate={onClose} />
            ))}
          </ul>

          <div className="gs-minibag-actions">
            {removed && (
              <RemovedSnackbox
                line={removed}
                onUndo={undoRemove}
                className="absolute inset-x-0 -top-[72px] mx-4 md:mx-auto md:w-full md:max-w-[452px]"
              />
            )}
            <div
              className="gs-minibag-cta flex flex-col bg-white p-4 md:px-4 md:py-6 lg:p-6"
              data-scrolling={scroll.scrolled && !scroll.atBottom}
            >
              {/* The bag page stands in for checkout until Stripe is wired (Brief.md #9). */}
              <Link to="/cart" onClick={onClose} className={PRIMARY_BUTTON}>
                <BagFilledIcon size={20} />
                Checkout securely
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function MiniBag() {
  const { miniBagOpen, closeMiniBag } = useCart()
  const location = useLocation()

  // Any navigation (links, back/forward) closes the bag.
  useEffect(() => {
    closeMiniBag()
  }, [location, closeMiniBag])

  return (
    <Modal
      isOpen={miniBagOpen}
      onRequestClose={closeMiniBag}
      closeTimeoutMs={400}
      label="Your bag"
      className="gs-minibag"
      closingClassName="gs-minibag--closing"
    >
      <div className="gs-minibag-away" onClick={closeMiniBag} aria-hidden="true" />
      <MiniBagPanel onClose={closeMiniBag} />
    </Modal>
  )
}
