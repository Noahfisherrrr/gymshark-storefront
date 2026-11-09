// Product photos are stored at their full 800x1000 size for the product
// detail page's gallery, but every card/thumbnail context (carousels,
// search results, cart/mini-bag line items) renders them at a few hundred
// px wide — a `-sm` (480px) variant lives alongside each original
// specifically for those. See scripts that generated them: sharp,
// resize({ width: 480 }), webp quality 75.
export function productThumb(url: string | null | undefined): string | undefined {
  return url ? url.replace(/(\.\w+)$/, '-sm$1') : undefined
}
