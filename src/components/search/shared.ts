export const SEARCH_PLACEHOLDER = 'What are you looking for?'

export type Gender = 'f' | 'm'

export interface GenderTab {
  label: string
  value: Gender | null
}

export const GENDER_TABS: GenderTab[] = [
  { label: 'All', value: null },
  { label: 'Women', value: 'f' },
  { label: 'Men', value: 'm' },
]

// URL of the search results page for a term (and optional gender tab).
export function searchHref(term: string, gender?: Gender | null): string {
  return `/search?q=${encodeURIComponent(term)}${gender ? `&gender=${gender}` : ''}`
}
