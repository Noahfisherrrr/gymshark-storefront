import { Link } from 'react-router-dom'

export default function ColorSelector({ colorways = [], currentColor, onSelectColorway }) {
  if (!colorways || colorways.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black">
        <span>
          Colour: <span className="font-normal text-black/70">{currentColor || colorways[0]?.name}</span>
        </span>
        <span className="text-black/50">{colorways.length} Colours</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {colorways.map((swatch, idx) => {
          const isActive = swatch.isCurrent || swatch.name === currentColor
          const content = (
            <div
              className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xs border transition-all ${
                isActive
                  ? 'border-2 border-black p-0.5'
                  : 'border-black/20 hover:border-black/50'
              }`}
            >
              {swatch.image ? (
                <img
                  src={swatch.image}
                  alt={swatch.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className="h-full w-full"
                  style={{ backgroundColor: swatch.hex || '#333' }}
                />
              )}
            </div>
          )

          if (swatch.slug) {
            return (
              <Link
                key={swatch.slug || idx}
                to={`/products/${swatch.slug}`}
                title={swatch.name}
                aria-label={`View ${swatch.name} colorway`}
                aria-current={isActive ? 'true' : undefined}
                className="focus:outline-hidden"
              >
                {content}
              </Link>
            )
          }

          return (
            <button
              key={swatch.name || idx}
              type="button"
              onClick={() => onSelectColorway && onSelectColorway(swatch)}
              title={swatch.name}
              aria-label={`Select ${swatch.name}`}
              aria-pressed={isActive}
              className="focus:outline-hidden"
            >
              {content}
            </button>
          )
        })}
      </div>
    </div>
  )
}

