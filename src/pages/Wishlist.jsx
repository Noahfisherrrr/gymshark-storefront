import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/product/ProductCard'

export default function Wishlist() {
  const { productIds } = useWishlist()
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.products.list().then(setProducts)
  }, [])

  const wishlisted = products.filter((p) => productIds.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Wishlist</h1>

      {wishlisted.length === 0 ? (
        <p className="mt-4 text-sm text-black/50">
          Nothing saved yet. <Link to="/shop" className="underline">Browse products</Link>.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {wishlisted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-black/50">
        Persisted to this browser only for now — moves to per-account storage once Supabase
        auth + wishlist table are live.
      </p>
    </div>
  )
}
