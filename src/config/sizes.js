// Canonical display order for the Shop filter panel's Size facet. Available
// sizes are derived from product variants at runtime (src/hooks/useProductFilters.js);
// this just fixes the order they're shown in, since variant insertion order
// isn't meaningful.
export const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'One Size']
