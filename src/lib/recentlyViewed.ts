// Product ids the shopper has opened, newest first. Feeds the "recent
// activity" row in the search overlay. Browser-local by design — Gymshark
// keeps this client-side too.
const KEY = 'recentlyViewed'
const MAX = 12

export function getRecentlyViewed(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? 'null') ?? []
  } catch {
    return []
  }
}

export function addRecentlyViewed(productId: string): void {
  const next = [productId, ...getRecentlyViewed().filter((id) => id !== productId)].slice(0, MAX)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage unavailable — the row just won't show.
  }
}
