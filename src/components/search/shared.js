export const SEARCH_PLACEHOLDER = 'What are you looking for?'

// URL of the search results page for a term (and optional gender tab).
export function searchHref(term, gender) {
  return `/search?q=${encodeURIComponent(term)}${gender ? `&gender=${gender}` : ''}`
}
