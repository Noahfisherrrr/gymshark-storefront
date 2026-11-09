import { Link } from 'react-router-dom'
import { ChevronDownIcon, ChevronRightIcon } from '../../components/header/icons'
import {
  DELIVERY_NOTE,
  DELIVERY_REGIONS,
  DELIVERY_RELATED_ARTICLES,
  DELIVERY_RESTRICTED_COUNTRIES,
} from '../../config/deliveryInformation'

// gymshark.com support article "Delivery Information"
// (support.gymshark.com/en/articles/11136898-delivery-information), linked
// from the "Delivery Information" entry under Help > Orders & Delivery.
export default function DeliveryInformation() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/help" className="hover:underline">Help</Link>
        <ChevronRightIcon size={12} />
        <Link to="/help#orders-delivery" className="hover:underline">Orders & Delivery</Link>
        <ChevronRightIcon size={12} />
        <span className="text-black/80">Delivery Information</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold uppercase lg:text-3xl">Delivery Information</h1>
      <p className="mt-3 text-sm text-black/60">
        Find Gymshark shipping times, costs, delivery options and how to track your order.
      </p>

      <p className="mt-6 rounded-sm border border-line bg-surface-subtle p-4 text-sm font-semibold">
        {DELIVERY_NOTE}
      </p>

      <div className="mt-8 divide-y divide-line border-y border-line">
        {DELIVERY_REGIONS.map((region) => (
          <details key={region.id} className="group scroll-mt-28">
            <summary className="flex items-center justify-between gap-4 py-4 text-sm font-bold uppercase">
              {region.name}
              <ChevronDownIcon size={18} className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div className="pb-6 pr-2">
              {region.note && <p className="mb-4 text-sm text-black/60">{region.note}</p>}

              {region.groups?.map((g) => (
                <div key={g.name} className="mt-4 first:mt-0">
                  <h3 className="text-sm font-semibold">{g.name}</h3>
                  {g.note && <p className="mt-0.5 text-xs text-black/50">{g.note}</p>}
                  <ul className="mt-2 divide-y divide-line">
                    {g.rows.map((row) => (
                      <li key={row.service} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2 text-sm">
                        <span>
                          {row.service}
                          {row.note && <span className="block text-xs text-black/50">{row.note}</span>}
                        </span>
                        <span className="shrink-0 whitespace-nowrap text-black/70">
                          {row.time}
                          {row.cost && <span className="ml-2 font-semibold text-black">{row.cost}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {region.countries && (
                <ul className="divide-y divide-line">
                  {region.countries.map((c) => (
                    <li key={c.name} className="py-2.5 text-sm">
                      <p className="font-semibold">{c.name}</p>
                      <p className="mt-0.5 text-black/60">{c.detail}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Shipping & Billing Address Restrictions</h2>
        <p className="mt-3 text-sm text-black/60">We're unable to ship to the following countries:</p>
        <p className="mt-2 text-sm text-black/60">{DELIVERY_RESTRICTED_COUNTRIES.join(', ')}.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold uppercase">Related Articles</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {DELIVERY_RELATED_ARTICLES.map((article) => (
            <li key={article.q}>
              <Link
                to={article.href}
                className="flex items-center justify-between gap-4 py-4 text-sm font-semibold hover:bg-surface-subtle"
              >
                {article.q}
                <ChevronRightIcon size={18} className="shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">
        Can't find what you're looking for? Visit the{' '}
        <Link to="/help" className="underline">Help Centre</Link>.
      </p>
    </div>
  )
}
