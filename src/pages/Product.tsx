import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api'
import { addRecentlyViewed } from '../lib/recentlyViewed'
import type { Product as ProductType } from '../api/contract'

// PDP components
import Breadcrumbs from '../components/pdp/Breadcrumbs'
import ProductGallery from '../components/pdp/ProductGallery'
import ProductHeader from '../components/pdp/ProductHeader'
import ColorSelector from '../components/pdp/ColorSelector'
import SizeSelector from '../components/pdp/SizeSelector'
import SizeGuideModal from '../components/pdp/SizeGuideModal'
import PaymentInfoModal from '../components/pdp/PaymentInfoModal'
import ProductActions from '../components/pdp/ProductActions'
import StickyAddToCartBar from '../components/pdp/StickyAddToCartBar'
import ProductAccordions from '../components/pdp/ProductAccordions'
import CompleteTheLook from '../components/pdp/CompleteTheLook'
import ProductReviews from '../components/pdp/ProductReviews'
import YouMightLike from '../components/pdp/YouMightLike'

export default function Product() {
  const { productId } = useParams<{ productId: string }>()

  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [showSizeError, setShowSizeError] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const buyBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!productId) return
    setLoading(true)
    setShowSizeError(false)

    api.products.getById(productId).then((p) => {
      if (!p) {
        setProduct(null)
        setLoading(false)
        return
      }

      addRecentlyViewed(p.id)
      setProduct(p)

      // Default to first in-stock variant if available
      const defaultVariant = p.variants.find((v) => v.stock > 0) || p.variants[0]
      setSelectedVariantId(defaultVariant?.id ?? null)
      setLoading(false)
    })
  }, [productId])

  // Sticky Add to Cart observer: show sticky bar when buy box scrolls off-screen
  useEffect(() => {
    if (!buyBoxRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the buy button is NOT visible and user scrolled past it
        const isPast = entry.boundingClientRect.top < 0
        setShowStickyBar(!entry.isIntersecting && isPast)
      },
      { threshold: 0.1 }
    )

    observer.observe(buyBoxRef.current)
    return () => observer.disconnect()
  }, [product])

  function handleShare() {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: product?.name || '10X Sports',
        url,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url)
      setToastMessage('Link copied to clipboard!')
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  function handleScrollToReviews() {
    const el = document.getElementById('reviews')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function handlePromptSelectSize() {
    setShowSizeError(true)
    const el = document.getElementById('size-selector-area')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 text-center animate-pulse">
        <div className="mx-auto h-4 w-48 rounded-xs bg-black/10 mb-8" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/5] rounded-xs bg-surface-subtle" />
          <div className="space-y-4 text-left">
            <div className="h-4 w-32 bg-black/10 rounded-xs" />
            <div className="h-8 w-3/4 bg-black/10 rounded-xs" />
            <div className="h-6 w-24 bg-black/10 rounded-xs" />
            <div className="h-20 w-full bg-black/10 rounded-xs" />
            <div className="h-12 w-full bg-black/20 rounded-xs" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-ink">
          Product Not Found
        </h1>
        <p className="mt-3 text-sm text-black/60">
          The product you are looking for may have been removed or is temporarily unavailable.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-block rounded-xs bg-black px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/80"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    )
  }

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Alert for link copy or feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 rounded-xs bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs product={product} />

        {/* ----------------- MAIN PDP 2-COLUMN VIEW ----------------- */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT COLUMN: Gallery & Media (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery product={product} onShare={handleShare} />
          </div>

          {/* RIGHT COLUMN: Sticky Buy Box & Details (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              {/* Product Header */}
              <ProductHeader
                product={product}
                onOpenKlarna={() => setPaymentModalOpen(true)}
                onScrollToReviews={handleScrollToReviews}
              />

              {/* Colorways Selector */}
              <ColorSelector
                colorways={product.colorways}
                currentColor={product.color || selectedVariant?.color}
              />

              {/* Size Selector */}
              <div id="size-selector-area">
                <SizeSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariantId}
                  onSelectVariant={(id) => {
                    setSelectedVariantId(id)
                    setShowSizeError(false)
                  }}
                  onOpenSizeGuide={() => setSizeGuideOpen(true)}
                  showError={showSizeError}
                />
              </div>

              {/* Main Actions (Add to Bag, Wishlist, Perks) */}
              <div ref={buyBoxRef}>
                <ProductActions
                  product={product}
                  selectedVariant={selectedVariant}
                  onPromptSelectSize={handlePromptSelectSize}
                  deliveryInfo={product.deliveryInfo}
                />
              </div>

              {/* Collapsible Accordions (Description, Features & Fit, Materials & Care, Delivery & Returns) */}
              <div className="mt-2">
                <ProductAccordions product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- COMPLETE THE LOOK ----------------- */}
        {product.completeTheLookIds && product.completeTheLookIds.length > 0 && (
          <div className="mt-12">
            <CompleteTheLook productIds={product.completeTheLookIds} />
          </div>
        )}

        {/* ----------------- PRODUCT REVIEWS & RATINGS ----------------- */}
        <div className="mt-12">
          <ProductReviews product={product} />
        </div>

        {/* ----------------- YOU MIGHT ALSO LIKE ----------------- */}
        <div className="mt-12 mb-12">
          <YouMightLike
            currentProductId={product.id}
            category={product.category}
            gender={product.gender}
          />
        </div>
      </div>

      {/* ----------------- STICKY BOTTOM ADD TO CART BAR ----------------- */}
      <StickyAddToCartBar
        product={product}
        variants={product.variants}
        selectedVariantId={selectedVariantId}
        onSelectVariant={setSelectedVariantId}
        visible={showStickyBar}
      />

      {/* ----------------- SIZE GUIDE MODAL ----------------- */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* ----------------- PAYMENT INFORMATION MODAL ----------------- */}
      <PaymentInfoModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        price={product.price}
      />
    </div>
  )
}
