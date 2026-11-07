import { Link } from 'react-router-dom'
import { SECTION_HEADING } from '../home/ProductCarousel'

// gymshark.com's "Shop by category" / "Shop by activity" / "Shop by
// collection" blocks: a heading followed by image tiles with a bottom-left
// uppercase label, each routing back into /shop with the matching filter.
export default function CategoryGrid({ title, tiles, columns = 4, aspect = 'aspect-[3/4]' }) {
  if (!tiles || tiles.length === 0) return null
  const colsClass =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 3
        ? 'grid-cols-1 md:grid-cols-3'
        : 'grid-cols-2 lg:grid-cols-4'

  return (
    <section className="mx-auto w-full max-w-[3000px] py-8 lg:px-10 lg:py-16" aria-label={title}>
      <h2 className={`mb-6 px-4 md:px-[30px] lg:px-0 ${SECTION_HEADING}`}>{title}</h2>
      <ul className={`grid ${colsClass} gap-2 px-4 md:px-[30px] lg:gap-3 lg:px-0`}>
        {tiles.map((tile) => (
          <li key={tile.label}>
            <Link to={tile.href} className="group relative block overflow-hidden bg-surface-subtle">
              <div className={`${aspect} w-full`}>
                {tile.image && (
                  <img
                    src={tile.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-[16px] font-bold uppercase leading-[1.2] text-white">
                {tile.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
