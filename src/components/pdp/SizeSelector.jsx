import { RulerIcon } from './pdpIcons'

const DEFAULT_RUN = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function SizeSelector({
  variants = [],
  selectedVariantId,
  onSelectVariant,
  onOpenSizeGuide,
  showError = false,
}) {
  const isOneSize = variants.every((v) => v.size.toLowerCase() === 'one size')
  const selectedVariant = variants.find((v) => v.id === selectedVariantId)

  // Map variants to full standard run if applicable
  const displaySizes = isOneSize
    ? variants.map((v) => ({ size: v.size, variant: v, stock: v.stock }))
    : DEFAULT_RUN.some((s) => variants.some((v) => v.size === s))
    ? DEFAULT_RUN.map((size) => {
        const v = variants.find((item) => item.size.toUpperCase() === size.toUpperCase())
        return {
          size,
          variant: v,
          stock: v ? v.stock : 0,
        }
      })
    : variants.map((v) => ({ size: v.size, variant: v, stock: v.stock }))

  return (
    <div className="flex flex-col gap-2">
      {/* Header with Title and Size Guide trigger */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-black">
            Select Size
          </span>
          {selectedVariant && (
            <span className="text-xs text-black/60 font-medium">
              — {selectedVariant.size}
            </span>
          )}
        </div>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black hover:text-black/70"
          >
            <RulerIcon size={14} className="text-black/70 group-hover:text-black" />
            <span className="underline underline-offset-2">Size Guide</span>
          </button>
        )}
      </div>

      {/* Error message if user tried to add to bag without selecting a size */}
      {showError && (
        <p className="text-xs font-medium text-red-600 animate-shake">
          Please select a size before adding to bag
        </p>
      )}

      {/* Size buttons grid */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {displaySizes.map(({ size, variant, stock }) => {
          const isSelected = variant && variant.id === selectedVariantId
          const isOutOfStock = stock <= 0 || !variant

          return (
            <button
              key={size}
              type="button"
              disabled={isOutOfStock}
              onClick={() => variant && onSelectVariant(variant.id)}
              aria-label={`${size}${isOutOfStock ? ' (Sold out)' : ''}`}
              aria-pressed={isSelected}
              className={`relative flex h-12 items-center justify-center rounded-xs text-xs font-bold uppercase transition-all duration-150 ${
                isSelected
                  ? 'border-2 border-black bg-black text-white shadow-xs'
                  : isOutOfStock
                  ? 'cursor-not-allowed border border-dashed border-black/20 bg-surface-subtle text-black/30'
                  : 'border border-black/25 bg-white text-black hover:border-black active:scale-95'
              }`}
            >
              <span>{size}</span>

              {/* Diagonal strikethrough for out of stock */}
              {isOutOfStock && (
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
                  aria-hidden="true"
                >
                  <span className="h-px w-[120%] rotate-45 bg-black/25" />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Low stock alert badge */}
      {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 3 && (
        <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-amber-700 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span>Only {selectedVariant.stock} left in size {selectedVariant.size} — order soon</span>
        </div>
      )}
    </div>
  )
}

