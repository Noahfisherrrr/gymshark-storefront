// Thin localStorage wrapper so the mock provider survives page reloads.
// This is scaffolding only — the Supabase provider won't use localStorage,
// it'll read/write real tables, so none of this leaks into the contract.

const PREFIX = 'mockApi:'

export function readStore(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage unavailable (private mode, quota) — mock state just won't persist.
  }
}

export function makeId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}
