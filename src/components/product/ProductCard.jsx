import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductCard({ product }) {
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[3/4] bg-black/5" />
        <p className="mt-3 text-sm font-semibold">{product.name}</p>
        <p className="text-sm text-black/60">${product.price.toFixed(2)}</p>
      </Link>

      <button
        type="button"
        onClick={() => toggle(product.id)}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm"
      >
        {wishlisted ? '♥' : '♡'}
      </button>
    </div>
  )
}
