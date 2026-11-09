import { FLAGSHIP_STORES, OTHER_STORES } from '../config/stores'

// gymshark.com's /pages/stores — two large flagship cards followed by a
// grid of the rest. Locations and hours are placeholder content until the
// client supplies their real US store list (Brief.md #4); swap
// `config/stores.js` once they do, nothing else here should need to change.
export default function Stores() {
  return (
    <div>
      <section className="px-4 py-16 text-center lg:py-20">
        <h1 className="font-display text-3xl font-extrabold uppercase text-ink">Our Stores</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">Find a store near you for fittings, exclusives and in-person returns.</p>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {FLAGSHIP_STORES.map((store) => (
            <div key={store.id}>
              <div className="aspect-[4/5] w-full overflow-hidden bg-surface-subtle">
                <img src={store.image} alt="" className="h-full w-full object-cover" />
              </div>
              <h2 className="mt-4 text-lg font-bold">{store.name}</h2>
              <p className="mt-1 text-sm text-black/60">{store.description}</p>
              <p className="mt-3 text-sm font-semibold">{store.address}</p>
              <p className="text-sm text-muted">{store.hours}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-lg font-bold uppercase">More Locations</h2>
        <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_STORES.map((store) => (
            <div key={store.id} className="border-t border-line pt-4">
              <h3 className="text-sm font-bold">{store.name}</h3>
              <p className="mt-1 text-sm text-black/60">{store.address}</p>
              <p className="mt-1 text-sm text-muted">{store.hours}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Don't see a store near you? Shop the full range online, with free returns on every order.
        </p>
      </div>
    </div>
  )
}
