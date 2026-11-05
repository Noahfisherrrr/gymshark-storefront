import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/product/ProductCard'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    api.products.list().then((items) => setFeatured(items.slice(0, 4)))
  }, [])

  return (
    <div>
      <section className="flex h-[80vh] items-center justify-center bg-brand-black text-brand-white">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-white/60">
            Hero banner / video placeholder
          </p>
          <h1 className="mt-2 text-4xl font-extrabold uppercase lg:text-6xl">New Collection</h1>
          <p className="mt-4 text-white/70">
            Awaiting hero imagery/video and copy from the client (Brief.md #5).
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-brand-white px-8 py-3 text-sm font-semibold uppercase text-brand-black"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold uppercase">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {['men', 'women', 'new', 'sale'].map((cat) => (
            <Link
              key={cat}
              to={`/shop?category=${cat}`}
              className="flex aspect-[3/4] items-center justify-center bg-black/5 text-sm font-semibold uppercase"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold uppercase">Best Sellers</h2>
        <p className="mt-2 text-sm text-black/60">
          Pulled from the mock API for now — swaps to real Supabase data once the catalog
          is seeded (Brief.md #6).
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
