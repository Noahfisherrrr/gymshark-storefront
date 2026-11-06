import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/product/ProductCard'

function EmptyWishlistIllustration() {
  return (
    <svg
      viewBox="0 0 220 180"
      className="mx-auto h-40 w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* scribble + sparkle decorations */}
      <path d="M44 28c4 0 6 2 6 2" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M190 48c4 0 6 2 6 2" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M180 148c4 0 6 2 6 2" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="100" r="2.5" fill="#E0E0E0" />
      <circle cx="200" cy="110" r="2.5" fill="#E0E0E0" />
      <path d="M108 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill="#E0E0E0" />
      <path d="M58 150l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z" fill="#E0E0E0" />
      <path d="M150 40l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4z" fill="#E0E0E0" />

      {/* back polaroid */}
      <g transform="translate(96 24) rotate(8)">
        <rect x="0" y="0" width="64" height="76" rx="2" fill="#fff" stroke="#DADADA" />
        <rect x="6" y="6" width="52" height="48" fill="#E7E7E7" />
      </g>

      {/* front polaroid */}
      <g transform="translate(62 30) rotate(-6)">
        <rect x="0" y="0" width="64" height="76" rx="2" fill="#fff" stroke="#DADADA" />
        <rect x="6" y="6" width="52" height="48" fill="#CFCFCF" />
        <circle cx="32" cy="30" r="16" fill="#fff" />
        <path
          d="M32 24c-3-4-10-3-10 3 0 4 4 7 10 11 3-2 5-4 7-6M34 20c2-3 7-2 8 1"
          stroke="#D0021B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

export default function Wishlist() {
  const { productIds } = useWishlist()
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.products.list().then(setProducts)
  }, [])

  const wishlisted = products.filter((p) => productIds.includes(p.id))
  const isEmpty = wishlisted.length === 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 mb-20">
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl font-medium uppercase tracking-tight">Your Wishlist</h1>
        <span className="text-xs text-black/50">{wishlisted.length} Products</span>
      </div>

      {isEmpty ? (
        <div className="mx-auto mt-10 max-w-sm text-center">
          <EmptyWishlistIllustration />

          <h2 className="mt-4 text-base font-medium uppercase tracking-tight">
            Your Wishlist is Empty
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-black/60">
            Tap the heart next to anything you like the look of and we&apos;ll save it here. Then
            when you&apos;re ready, add it to your bag, check out, put it on, and then let&apos;s go gym.
          </p>

          <div className="mt-6 flex flex-col gap-3 ">
            <Link
              to="/shop?category=men"
              className="bg-black py-3 text-sm font-medium uppercase text-white"
            >
              Shop Mens
            </Link>
            <Link
              to="/shop?category=women"
              className="bg-black/10 py-3 text-sm font-medium uppercase text-black"
            >
              Shop Womens
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {wishlisted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
