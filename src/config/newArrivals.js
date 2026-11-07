// Config for the generic /collections/new-releases/:slug page
// (src/pages/CollectionNewArrivals.jsx). One page, one layout — only the
// copy and the `category` facet passed into useProductFilters change per
// slug. Keeps women/men/accessories New Arrivals visually identical, which
// is the whole point: gymshark.com uses the same PLP template for all three.
export const NEW_ARRIVALS_COLLECTIONS = {
  womens: {
    category: 'women',
    title: 'New Arrivals',
    subtitle: "The latest women's drops, newest first.",
  },
  mens: {
    category: 'men',
    title: 'New Arrivals',
    subtitle: "The latest men's drops, newest first.",
  },
  accessories: {
    category: 'accessories',
    title: 'New Arrivals',
    subtitle: 'The latest accessories drops, newest first.',
  },
}
