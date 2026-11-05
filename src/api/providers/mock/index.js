import {
  MOCK_PRODUCTS,
  MOCK_DISCOUNT_CODES,
  MOCK_SEARCH_TERMS,
  MOCK_TRENDING_PRODUCT_IDS,
} from '../../data/products.mock'
import { readStore, writeStore, makeId } from './storage'

// Simulates network latency so loading states in the UI get exercised
// even against the mock provider.
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms))

function findProduct(productId) {
  return MOCK_PRODUCTS.find((p) => p.id === productId) ?? null
}

function findVariant(productId, variantId) {
  const product = findProduct(productId)
  return product?.variants.find((v) => v.id === variantId) ?? null
}

// ---- products ---------------------------------------------------------

async function listProducts({ category, search, sort, gender, onSale, limit } = {}) {
  await delay()
  let items = [...MOCK_PRODUCTS]

  if (category && category !== 'all') {
    items = items.filter((p) => p.category === category)
  }
  if (gender) items = items.filter((p) => matchesGender(gender, p.gender))
  if (onSale) items = items.filter((p) => p.compareAtPrice !== null)

  if (search) {
    const q = search.toLowerCase()
    items = items.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }

  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)

  return limit ? items.slice(0, limit) : items
}

async function getProductById(id) {
  await delay()
  return findProduct(id)
}

async function listCategories() {
  await delay()
  return [...new Set(MOCK_PRODUCTS.map((p) => p.category))]
}

// ---- search (stand-in for a hosted index like Algolia) -------------------

function tokenize(term) {
  return term.toLowerCase().split(/\s+/).filter(Boolean)
}

// Every token must appear somewhere in the product; a trailing "s" is
// optional so "hoodies" still finds "hoodie".
function matchesTokens(product, tokens) {
  const haystack = [
    product.name,
    product.description,
    product.category,
    ...product.variants.map((v) => v.color),
  ]
    .join(' ')
    .toLowerCase()
  return tokens.every(
    (t) => haystack.includes(t) || (t.length > 3 && t.endsWith('s') && haystack.includes(t.slice(0, -1))),
  )
}

// Unisex products show under both the Women and Men tabs.
function matchesGender(gender, itemGender) {
  return !gender || itemGender === gender || itemGender === 'u'
}

async function searchProducts(term, { gender = null, limit = 20 } = {}) {
  await delay()
  const tokens = tokenize(term ?? '')
  if (tokens.length === 0) return { products: [], total: 0, suggestions: [] }

  const matches = MOCK_PRODUCTS.filter(
    (p) => matchesGender(gender, p.gender) && matchesTokens(p, tokens),
  )

  const q = tokens.join(' ')
  const suggestions = MOCK_SEARCH_TERMS.filter(
    (s) => matchesGender(gender, s.gender) && tokens.every((t) => s.query.includes(t)),
  )
    .sort((a, b) => b.popularity - a.popularity)
    .map((s) => s.query)
  // Top up with matching product names so suggestions never run dry.
  for (const p of matches) {
    const name = p.name.toLowerCase()
    if (suggestions.length >= 4) break
    if (name.includes(q) && !suggestions.includes(name)) suggestions.push(name)
  }

  return { products: matches.slice(0, limit), total: matches.length, suggestions: suggestions.slice(0, 4) }
}

async function trendingTerms({ gender = null } = {}) {
  await delay()
  return MOCK_SEARCH_TERMS.filter((s) => matchesGender(gender, s.gender))
    .sort((a, b) => b.popularity - a.popularity)
    .map((s) => s.query)
}

async function trendingProducts({ gender = null, limit = 20 } = {}) {
  await delay()
  return MOCK_TRENDING_PRODUCT_IDS.map(findProduct)
    .filter((p) => p && matchesGender(gender, p.gender))
    .slice(0, limit)
}

// ---- cart (persisted in localStorage, per-browser) ---------------------

function getCartItems() {
  return readStore('cart', [])
}

async function getCart() {
  await delay()
  return getCartItems()
}

async function addToCart({ productId, variantId, quantity }) {
  await delay()
  const variant = findVariant(productId, variantId)
  if (!variant) throw new Error('Unknown product variant')
  if (variant.stock < quantity) throw new Error('Not enough stock')

  const items = getCartItems()
  const existing = items.find((i) => i.productId === productId && i.variantId === variantId)

  if (existing) {
    existing.quantity += quantity
  } else {
    items.push({ id: makeId('cart'), productId, variantId, quantity })
  }

  writeStore('cart', items)
  return items
}

async function updateCartQuantity(itemId, quantity) {
  await delay()
  let items = getCartItems()
  if (quantity <= 0) {
    items = items.filter((i) => i.id !== itemId)
  } else {
    items = items.map((i) => (i.id === itemId ? { ...i, quantity } : i))
  }
  writeStore('cart', items)
  return items
}

async function removeFromCart(itemId) {
  return updateCartQuantity(itemId, 0)
}

async function clearCart() {
  await delay()
  writeStore('cart', [])
}

// ---- wishlist (list of product ids) ------------------------------------

async function getWishlist() {
  await delay()
  return readStore('wishlist', [])
}

async function toggleWishlist(productId) {
  await delay()
  const current = readStore('wishlist', [])
  const next = current.includes(productId)
    ? current.filter((id) => id !== productId)
    : [...current, productId]
  writeStore('wishlist', next)
  return next
}

// ---- auth (fake session, local only) -----------------------------------

function getUsersDb() {
  return readStore('users', [])
}

async function getCurrentUser() {
  await delay()
  return readStore('session', null)
}

async function signUp({ email, password, name }) {
  await delay()
  const users = getUsersDb()
  if (users.some((u) => u.email === email)) {
    throw new Error('An account with that email already exists')
  }
  const user = { id: makeId('user'), email, name, password }
  writeStore('users', [...users, user])
  const session = { id: user.id, email: user.email, name: user.name }
  writeStore('session', session)
  return session
}

async function signIn({ email, password }) {
  await delay()
  const user = getUsersDb().find((u) => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  const session = { id: user.id, email: user.email, name: user.name }
  writeStore('session', session)
  return session
}

async function signOut() {
  await delay()
  writeStore('session', null)
}

// ---- orders --------------------------------------------------------------

async function listOrders() {
  await delay()
  return readStore('orders', [])
}

async function applyDiscountCode(code) {
  await delay()
  const amountOff = MOCK_DISCOUNT_CODES[code?.toUpperCase()]
  if (!amountOff) {
    return { valid: false, amountOff: 0, message: 'Invalid or expired code' }
  }
  return { valid: true, amountOff, message: `${Math.round(amountOff * 100)}% off applied` }
}

/** @type {import('../../contract').ApiProvider} */
export const mockApi = {
  products: { list: listProducts, getById: getProductById, listCategories },
  search: { query: searchProducts, trendingTerms, trendingProducts },
  cart: {
    get: getCart,
    add: addToCart,
    updateQuantity: updateCartQuantity,
    remove: removeFromCart,
    clear: clearCart,
  },
  wishlist: { get: getWishlist, toggle: toggleWishlist },
  auth: { getCurrentUser, signUp, signIn, signOut },
  orders: { list: listOrders, applyDiscountCode },
}
