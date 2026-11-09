import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactElement, UIEvent, WheelEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../../api'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCartLines, type CartLine } from '../../hooks/useCartLines'
import { formatPrice } from '../../lib/format'
import { productThumb } from '../../lib/images'
import {
  FREE_STANDARD_SHIPPING_THRESHOLD,
  LOW_STOCK_THRESHOLD,
  MAX_LINE_QUANTITY,
  PAYMENT_METHODS,
  STANDARD_SHIPPING_COST,
} from '../../config/store'
import {
  AfterpayIcon,
  AmexIcon,
  ApplePayIcon,
  KlarnaIcon,
  MastercardIcon,
  PaypalIcon,
  SezzleIcon,
  VisaIcon,
} from '../footer/PaymentIcons'
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
import type { CartItem, DiscountResult, Product } from '../../api/contract'

const PRIMARY_BUTTON =
  'flex h-[51px] w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-[14px] leading-[1.4] text-white hover:bg-ink-hover'
const HEADING = 'font-display text-[clamp(18px,17.3px+0.19vw,20px)] font-medium uppercase leading-[0.94]'
const SNACKBOX_MS = 5000

function Thumb({ src }: { src?: string | null }) {
  return src ? (
    <img
      src={productThumb(src)}
      alt=""
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-[250ms] ease-in-out hover:scale-[1.04]"
    />
  ) : null
}

function ShippingProgress({ subtotal }: { subtotal: number }) {
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

interface QuantitySelectorProps {
  quantity: number
  max: number
  busy: boolean
  onDecrease: () => void
  onIncrease: () => void
}

function QuantitySelector({ quantity, max, busy, onDecrease, onIncrease }: QuantitySelectorProps) {
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

function WishlistButton({ productId }: { productId: string }) {
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

interface LineItemProps {
  line: CartLine
  onRemoved: (line: CartLine) => void
  onNavigate: () => void
}

function LineItem({ line, onRemoved, onNavigate }: LineItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const [busy, setBusy] = useState(false)
  const max = Math.min(line.variant.stock, MAX_LINE_QUANTITY)
  const href = `/product/${line.product.id}`

  async function change(delta: number) {
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
          <div className="flex items-start justify-between gap-2">
            <Link to={href} onClick={onNavigate} className="capitalize text-ink">
              {line.product.name}
            </Link>
            <WishlistButton productId={line.product.id} />
          </div>
          <p className="capitalize text-muted">
            {line.variant.color} | {line.variant.size}
          </p>
          <p className="font-bold">{formatPrice(line.product.price)}</p>
          {line.variant.stock <= LOW_STOCK_THRESHOLD && (
            <p className="mt-1 text-[12px] font-bold text-sale">Last Few Remaining</p>
          )}
          <div className="mt-auto pt-2">
            <QuantitySelector
              quantity={line.quantity}
              max={max}
              busy={busy}
              onDecrease={() => change(-1)}
              onIncrease={() => change(1)}
            />
          </div>
        </div>
      </article>
    </li>
  )
}

interface RemovedSnackboxProps {
  line: CartLine | null
  onUndo: () => void
  className?: string
}

function RemovedSnackbox({ line, onUndo, className }: RemovedSnackboxProps) {
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

function EmptyBag({ onNavigate }: { onNavigate: () => void }) {
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

function WishlistView({ onNavigate }: { onNavigate: () => void }) {
  const { productIds, toggle } = useWishlist()
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    api.products.list().then(setProducts)
  }, [])

  if (!products) return null
  const saved = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)

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

interface CrossSellProps {
  exclude: string[]
  onAdd: (product: Product) => void
}

function CrossSell({ exclude, onAdd }: CrossSellProps) {
  const [products, setProducts] = useState<Product[] | null>(null)
  const scrollerRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    api.products.list({ category: 'accessories' }).then(setProducts)
  }, [])

  function handleWheel(e: WheelEvent<HTMLUListElement>) {
    const el = scrollerRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
    e.preventDefault()
    el.scrollLeft += e.deltaY
  }

  const candidates = useMemo(() => {
    if (!products) return []
    const pool = products.filter((p) => !exclude.includes(p.id))
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, 4)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, exclude])

  if (!products || candidates.length === 0) return null

  return (
    <div className="mb-6 bg-surface-subtle py-4">
      <div className="px-4 md:px-6">
        <h3 className={`${HEADING} text-[14px]`}>Add a little extra</h3>
        <p className="mt-1 text-[12px] leading-[1.4] text-muted">
          Add one or more of these items to get free delivery
        </p>
      </div>
      <ul
        ref={scrollerRef}
        onWheel={handleWheel}
        className="gs-crosssell-scroller mt-3 flex gap-3 overflow-x-auto px-4 pb-1 md:px-6"
      >
        {candidates.map((product) => (
          <li
            key={product.id}
            className="flex w-[200px] shrink-0 items-center gap-2 bg-white p-2 text-[12px] leading-[1.3]"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden bg-surface-subtle">
              <Thumb src={product.image} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate">{product.name}</p>
              <p className="font-bold">{formatPrice(product.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="flex shrink-0 items-center gap-1 whitespace-nowrap font-bold"
            >
              <PlusIcon size={14} />
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface DiscountCodeProps {
  discount: DiscountResult | null
  onApplied: (result: DiscountResult | null) => void
}

function DiscountCode({ discount, onApplied }: DiscountCodeProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const result = await api.orders.applyDiscountCode(code)
      if (!result.valid) {
        onApplied(null)
        setError(result.message)
      } else {
        onApplied(result)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-4 mb-6 md:mx-6">
      <h3 className={`${HEADING} mb-3 text-[14px]`}>Discount Code</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="h-12 min-w-0 flex-1 border border-line px-3 text-[14px]"
        />
        <button
          type="submit"
          disabled={busy || !code}
          className="h-12 shrink-0 bg-ink px-6 text-[14px] font-bold text-white disabled:opacity-40"
        >
          Apply
        </button>
      </form>
      {error && <p className="mt-2 text-[12px] leading-[1.4] text-sale">{error}</p>}
      {discount?.valid && <p className="mt-2 text-[12px] leading-[1.4] text-ink">{discount.message}</p>}
      <p className="mt-3 flex gap-2 text-[12px] leading-[1.4] text-faint">
        <InfoIcon size={14} className="mt-0.5 shrink-0" />
        Gift card codes can be applied at checkout.
      </p>
    </div>
  )
}

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  discountAmount: number
  total: number
}

function OrderSummary({ subtotal, shipping, discountAmount, total }: OrderSummaryProps) {
  return (
    <div className="mx-4 mb-6 md:mx-6">
      <h3 className={`${HEADING} mb-3 text-[14px]`}>Order Summary</h3>
      <div className="space-y-2 text-[14px] leading-[1.4]">
        <div className="flex justify-between">
          <span className="text-muted">Sub Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Estimated Shipping</span>
          <span>{shipping > 0 ? formatPrice(shipping) : 'Free'}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted">Discount</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-line pt-2 font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}

const PAYMENT_ICON_MAP: Record<string, () => ReactElement> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  paypal: PaypalIcon,
  applePay: ApplePayIcon,
  amex: AmexIcon,
  klarna: KlarnaIcon,
  afterpay: AfterpayIcon,
  sezzle: SezzleIcon,
}

function PaymentBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 bg-ink px-4 pb-4">
      {PAYMENT_METHODS.map(({ label, icon }) => {
        const Icon = PAYMENT_ICON_MAP[icon]
        return (
          <span key={label} className="inline-flex">
            <span className="sr-only">{label}</span>
            <Icon />
          </span>
        )
      })}
    </div>
  )
}

interface VariantPickerModalProps {
  product: Product | null
  onClose: () => void
  onAdd: (input: { productId: string; variantId: string; quantity: number }) => Promise<CartItem[]>
}

function VariantPickerModal({ product, onClose, onAdd }: VariantPickerModalProps) {
  const [variantId, setVariantId] = useState<string | null>(product?.variants[0]?.id ?? null)
  const [busy, setBusy] = useState(false)
  const [trackedProduct, setTrackedProduct] = useState(product)

  if (product && product !== trackedProduct) {
    setTrackedProduct(product)
    setVariantId(product.variants[0]?.id ?? null)
  }

  async function handleAdd() {
    if (!product || !variantId) return
    setBusy(true)
    try {
      await onAdd({ productId: product.id, variantId, quantity: 1 })
      onClose()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal
      isOpen={!!product}
      onRequestClose={onClose}
      label="Choose options"
      overlayClassName="gs-overlay--fade flex items-center justify-center p-4"
      className="w-full max-w-sm bg-white"
    >
      {product && (
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-2">
            <h2 className={`${HEADING} text-[16px]`}>{product.name}</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="shrink-0">
              <CloseIcon size={20} />
            </button>
          </div>
          <div className="flex gap-4">
            <div className="h-24 w-24 shrink-0 overflow-hidden bg-surface-subtle">
              <Thumb src={product.image} />
            </div>
            <p className="self-center font-bold">{formatPrice(product.price)}</p>
          </div>
          <div>
            <p className="mb-2 text-[12px] font-bold uppercase text-muted">Size / Color</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  disabled={v.stock === 0}
                  onClick={() => setVariantId(v.id)}
                  className={`border px-3 py-2 text-[12px] font-bold uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-30 ${
                    v.id === variantId ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'
                  }`}
                >
                  {v.size} / {v.color}
                  {v.stock === 0 ? ' (Out of stock)' : ''}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={handleAdd} disabled={!variantId || busy} className={PRIMARY_BUTTON}>
            {busy ? 'Adding…' : 'Add to bag'}
          </button>
        </div>
      )}
    </Modal>
  )
}

function MiniBagPanel({ onClose }: { onClose: () => void }) {
  const { addItem } = useCart()
  const { lines, subtotal, loading } = useCartLines()
  const [view, setView] = useState<'bag' | 'wishlist'>('bag')
  const [scroll, setScroll] = useState({ scrolled: false, atBottom: false })
  const [removed, setRemoved] = useState<CartLine | null>(null)
  const [discount, setDiscount] = useState<DiscountResult | null>(null)
  const [pickerProduct, setPickerProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!removed) return
    const id = setTimeout(() => setRemoved(null), SNACKBOX_MS)
    return () => clearTimeout(id)
  }, [removed])

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    setScroll({
      scrolled: el.scrollTop > 0,
      atBottom: el.scrollHeight - el.scrollTop <= el.clientHeight + 1,
    })
  }

  async function undoRemove() {
    const line = removed
    if (!line) return
    setRemoved(null)
    await addItem({ productId: line.productId, variantId: line.variantId, quantity: line.quantity })
  }

  const empty = !loading && lines.length === 0
  const showingWishlist = view === 'wishlist'
  const shipping = subtotal > 0 && subtotal < FREE_STANDARD_SHIPPING_THRESHOLD ? STANDARD_SHIPPING_COST : 0
  const discountAmount = discount?.valid ? subtotal * discount.amountOff : 0
  const total = subtotal + shipping - discountAmount

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

          {shipping > 0 && (
            <CrossSell exclude={lines.map((line) => line.product.id)} onAdd={setPickerProduct} />
          )}

          <DiscountCode discount={discount} onApplied={setDiscount} />

          <OrderSummary subtotal={subtotal} shipping={shipping} discountAmount={discountAmount} total={total} />

          <div className="gs-minibag-actions">
            {removed && (
              <RemovedSnackbox
                line={removed}
                onUndo={undoRemove}
                className="absolute inset-x-0 -top-[72px] mx-4 md:mx-auto md:w-full md:max-w-[452px]"
              />
            )}
            <div
              className="gs-minibag-cta flex flex-col bg-white"
              data-scrolling={scroll.scrolled && !scroll.atBottom}
            >
              {/* The bag page stands in for checkout until Stripe is wired (Brief.md #9). */}
              <div className="p-4 md:px-4 md:py-6 lg:p-6">
                <Link to="/cart" onClick={onClose} className={PRIMARY_BUTTON}>
                  <BagFilledIcon size={20} />
                  Checkout securely
                </Link>
              </div>
              <PaymentBadges />
            </div>
          </div>
        </>
      )}

      <VariantPickerModal product={pickerProduct} onClose={() => setPickerProduct(null)} onAdd={addItem} />
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
