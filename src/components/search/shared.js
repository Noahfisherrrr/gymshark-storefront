export const SEARCH_PLACEHOLDER = 'What are you looking for?'

export const GENDER_TABS = [
  { label: 'All', value: null },
  { label: 'Women', value: 'f' },
  { label: 'Men', value: 'm' },
]

// URL of the search results page for a term (and optional gender tab).
export function searchHref(term, gender) {
  return `/search?q=${encodeURIComponent(term)}${gender ? `&gender=${gender}` : ''}`
}
