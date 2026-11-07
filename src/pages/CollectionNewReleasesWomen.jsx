import { Link } from 'react-router-dom'
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

// gymshark.com's /collections/new-releases/womens — the inner page the New
// In rail's "View all" (src/config/shopWomen.js) and the Women's nav
// (src/config/navigation.js) both route into. Unlike /pages/shop-women
// (pure curation) this is a filterable PLP scoped to women's new arrivals,
// using the same Filter & Sort panel as /shop.
export default function CollectionNewReleasesWomen() {
  const { products, loading, sort, setSort, selected, toggleFacet, selectedPrice, setPrice, clearAll, activeFilterCount } =
    useProductFilters({ category: 'women', sort: 'newest' })

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
      <nav aria-label="Breadcrumb" className="mb-4 flex gap-2 text-[12px] text-muted">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/pages/shop-women" className="hover:text-ink">
          Women
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">New Releases</span>
      </nav>

      <h1 className="font-display text-2xl font-bold uppercase">New Releases</h1>
      <p className="mt-1 text-[14px] text-muted">The latest women's drops, newest first.</p>

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
            <p className="mt-10 text-sm text-muted">No new arrivals match these filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}
