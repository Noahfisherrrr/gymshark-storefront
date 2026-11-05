export default function Shop() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Shop All</h1>

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <p className="text-sm font-semibold uppercase">Filters</p>
          <p className="mt-2 text-xs text-black/50">
            Category, size, color, price filters pending catalog + taxonomy (Brief.md #6, #7).
          </p>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between text-sm">
            <span>0 products</span>
            <span>Sort: Featured</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-black/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
