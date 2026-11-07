import { Navigate, useParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import FilterSortControls from '../components/shop/FilterSortControls'
import { useProductFilters } from '../hooks/useProductFilters'
import { PRODUCT_TYPES } from '../config/productTypes'
import { SIZE_ORDER } from '../config/sizes'
import { FEATURES } from '../config/features'
import { FITS } from '../config/fits'
import { RISES } from '../config/rises'
import { ACTIVITIES } from '../config/activities'
import { COLLECTIONS } from '../config/collections'
import { COLOR_SWATCHES } from '../config/colorSwatches'
import { PRICE_RANGES } from '../config/priceRanges'
import { NEW_ARRIVALS_COLLECTIONS } from '../config/newArrivals'

// Mirrors gymshark.com's Filter & Sort → Sort By options ("Relevancy" is
// this app's "Featured"); a new-arrivals rail defaults to Newest rather
// than Relevancy, since that's the whole point of the page.
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'featured', label: 'Relevancy' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

const SIZE_OPTIONS = SIZE_ORDER.map((size) => ({ slug: size, label: size }))
const COLOR_OPTIONS = Object.keys(COLOR_SWATCHES).map((color) => ({ slug: color, label: color }))

// gymshark.com's /collections/new-releases/{womens,mens,accessories} — one
// shared PLP template for every gender/category's New Arrivals, so they're
// always the same UI and placement. `:slug` selects the copy and the
// `category` facet (src/config/newArrivals.js); everything else — Filter &
// Sort panel, grid, sort default — is identical across all three.
export default function CollectionNewArrivals() {
  const { slug } = useParams()
  const collection = NEW_ARRIVALS_COLLECTIONS[slug]

  const { products, loading, sort, setSort, selected, toggleFacet, selectedPrice, setPrice, clearAll, activeFilterCount } =
    useProductFilters({ category: collection?.category, sort: 'newest' })

  if (!collection) return <Navigate to="/shop" replace />

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
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">

      <h1 className="font-display text-3xl font-bold uppercase">{collection.title}</h1>
      <p className="mt-1 text-[14px] text-muted">{collection.subtitle}</p>

      <div className="mt-16 flex flex-col gap-6 lg:flex-row lg:gap-8">
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
            <p className="mt-10 text-sm text-muted">No new arrivals match these filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}
