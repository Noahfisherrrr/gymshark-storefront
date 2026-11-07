import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import FilterSortControls from '../components/shop/FilterSortControls'
import { useProductFilters } from '../hooks/useProductFilters'
import { ACTIVITIES } from '../config/activities'
import { PRODUCT_TYPES } from '../config/productTypes'
import { PRICE_RANGES } from '../config/priceRanges'
import { SIZE_ORDER } from '../config/sizes'
import { FEATURES } from '../config/features'
import { FITS } from '../config/fits'
import { RISES } from '../config/rises'
import { COLLECTIONS } from '../config/collections'
import { COLOR_SWATCHES } from '../config/colorSwatches'

// Mirrors gymshark.com's Filter & Sort → Sort By options (its "Relevancy" is
// our "Featured", everything else matches 1:1).
const SORT_OPTIONS = [
  { value: 'featured', label: 'Relevancy' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

const SIZE_OPTIONS = SIZE_ORDER.map((size) => ({ slug: size, label: size }))
const COLOR_OPTIONS = Object.keys(COLOR_SWATCHES).map((color) => ({ slug: color, label: color }))

// Women/men are gendered (unisex included) and sale means "discounted", so
// these pages match the homepage carousels that link to them.
function listQuery(category) {
  if (category === 'women') return { gender: 'f' }
  if (category === 'men') return { gender: 'm' }
  if (category === 'sale') return { onSale: true }
  return { category }
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'

  const { products, loading, sort, setSort, selected, toggleFacet, selectedPrice, setPrice, clearAll, activeFilterCount } =
    useProductFilters(listQuery(category))

  const sections = [
    {
      key: 'type',
      title: 'Product Type',
      type: 'checkbox',
      options: PRODUCT_TYPES,
      selected: selected.type,
      onChange: (slug) => toggleFacet('type', slug),
    },
    {
      key: 'size',
      title: 'Size',
      type: 'checkbox',
      options: SIZE_OPTIONS,
      selected: selected.size,
      onChange: (slug) => toggleFacet('size', slug),
    },
    {
      key: 'feature',
      title: 'Features',
      type: 'checkbox',
      options: FEATURES,
      selected: selected.feature,
      onChange: (slug) => toggleFacet('feature', slug),
    },
    {
      key: 'fit',
      title: 'Fit',
      type: 'checkbox',
      options: FITS,
      selected: selected.fit,
      onChange: (slug) => toggleFacet('fit', slug),
    },
    {
      key: 'rise',
      title: 'Rise',
      type: 'checkbox',
      options: RISES,
      selected: selected.rise,
      onChange: (slug) => toggleFacet('rise', slug),
    },
    {
      key: 'activity',
      title: 'Activity',
      type: 'checkbox',
      options: ACTIVITIES,
      selected: selected.activity,
      onChange: (slug) => toggleFacet('activity', slug),
    },
    {
      key: 'collection',
      title: 'Collection',
      type: 'checkbox',
      options: COLLECTIONS,
      selected: selected.collection,
      onChange: (slug) => toggleFacet('collection', slug),
    },
    {
      key: 'color',
      title: 'Color',
      type: 'checkbox',
      options: COLOR_OPTIONS,
      selected: selected.color,
      onChange: (slug) => toggleFacet('color', slug),
      swatches: COLOR_SWATCHES,
    },
    {
      key: 'price',
      title: 'Price',
      type: 'radio',
      options: PRICE_RANGES,
      selected: selectedPrice,
      onChange: setPrice,
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="font-display text-2xl font-bold uppercase">Shop All</h1>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:gap-8">
        <FilterSortControls
          sort={sort}
          sortOptions={SORT_OPTIONS}
          onSortChange={setSort}
          sections={sections}
          activeCount={activeFilterCount}
          onClearAll={clearAll}
          productCount={products.length}
          loading={loading}
        />

        <div className="flex-1">
          <p className="hidden text-[14px] text-muted lg:block">
            {loading ? 'Loading…' : `${products.length} products`}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!loading && products.length === 0 && (
            <p className="mt-10 text-sm text-muted">No products match these filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}
