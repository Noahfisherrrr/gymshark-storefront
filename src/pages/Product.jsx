import { useParams } from 'react-router-dom'

export default function Product() {
  const { productId } = useParams()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square bg-black/5" />

        <div>
          <h1 className="text-2xl font-bold uppercase">Product {productId}</h1>
          <p className="mt-2 text-lg">$0.00</p>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase">Size</p>
            <p className="mt-2 text-xs text-black/50">
              Size options come from product variants in Supabase (Brief.md #6).
            </p>
          </div>

          <button className="mt-8 w-full bg-brand-black py-3 text-sm font-semibold uppercase text-brand-white">
            Add to Cart
          </button>

          <p className="mt-6 text-xs text-black/50">
            Description, size guide, photos and reviews pending catalog content and
            review feature decision (Brief.md #6, #7).
          </p>
        </div>
      </div>
    </div>
  )
}
