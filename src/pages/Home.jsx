export default function Home() {
  return (
    <div>
      <section className="flex h-[80vh] items-center justify-center bg-brand-black text-brand-white">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-white/60">
            Hero banner / video placeholder
          </p>
          <h1 className="mt-2 text-4xl font-extrabold uppercase lg:text-6xl">
            New Collection
          </h1>
          <p className="mt-4 text-white/70">
            Awaiting hero imagery/video and copy from the client (Brief.md #5).
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold uppercase">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {['Men', 'Women', 'New Arrivals', 'Sale'].map((cat) => (
            <div
              key={cat}
              className="flex aspect-[3/4] items-center justify-center bg-black/5 text-sm font-semibold uppercase"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold uppercase">Best Sellers</h2>
        <p className="mt-2 text-sm text-black/60">
          Product grid wires up once Supabase products table + catalog data are available
          (Brief.md #6).
        </p>
      </section>
    </div>
  )
}
