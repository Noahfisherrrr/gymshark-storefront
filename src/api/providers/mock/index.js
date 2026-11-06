import {
  MOCK_PRODUCTS,
  MOCK_DISCOUNT_CODES,
  MOCK_SEARCH_TERMS,
  MOCK_TRENDING_PRODUCT_IDS,
  MOCK_ACTIVE_OFFER,
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

async function listProducts({
  category,
  search,
  sort,
  gender,
  activity,
  type,
  priceMin,
  priceMax,
  onSale,
  limit,
} = {}) {
  await delay()
  let items = [...MOCK_PRODUCTS]

  if (category && category !== 'all') {
    items = items.filter((p) => p.category === category)
  }
  if (gender) items = items.filter((p) => matchesGender(gender, p.gender))
  if (activity) {
    const slugs = activity.split(',').filter(Boolean)
    items = items.filter((p) => p.activities.some((a) => slugs.includes(a)))
  }
  if (type) {
    const slugs = type.split(',').filter(Boolean)
    items = items.filter((p) => slugs.includes(p.type))
  }
  if (priceMin != null) items = items.filter((p) => p.price >= priceMin)
  if (priceMax != null) items = items.filter((p) => p.price <= priceMax)
  if (onSale) items = items.filter((p) => p.compareAtPrice !== null)

  if (search) {
    const q = search.toLowerCase()
    items = items.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }

  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
  if (sort === 'newest') items.reverse()

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

async function signUp({ email, password, firstName, lastName, dateOfBirth }) {
  await delay()
  const users = getUsersDb()
  if (users.some((u) => u.email === email)) {
    throw new Error('An account with that email already exists')
  }
  const name = `${firstName} ${lastName}`.trim()
  const user = { id: makeId('user'), email, firstName, lastName, dateOfBirth, name, password }
  writeStore('users', [...users, user])
  const session = toSession(user)
  writeStore('session', session)
  return session
}

async function signIn({ email, password }) {
  await delay()
  const user = getUsersDb().find((u) => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  const session = toSession(user)
  writeStore('session', session)
  return session
}

function toSession(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
  }
}

// Google/Apple verify the email on their end, but the client still wants a
// confirmation email as the final authorization step before access is
// granted. There's no real mailbox in mock mode, so this just records a
// pending confirmation and notifies listeners — `confirmPendingOAuth` below
// stands in for "the user clicked the link in their email."
let oauthListeners = []

function notifyOAuthListeners(update) {
  oauthListeners.forEach((listener) => listener(update))
}

async function signInWithOAuth(provider) {
  await delay()
  const email = `${provider}-user@example.com`
  const name = provider === 'google' ? 'Google User' : 'Apple User'
  writeStore('pendingOAuthConfirmation', { provider, email, name })
  console.info(`[mock auth] Confirmation email "sent" to ${email}. Use the dev button to simulate clicking it.`)
  notifyOAuthListeners({ user: null, pendingConfirmationEmail: email })
}

async function confirmPendingOAuth() {
  await delay()
  const pending = readStore('pendingOAuthConfirmation', null)
  if (!pending) throw new Error('No pending confirmation to complete')

  const users = getUsersDb()
  let user = users.find((u) => u.email === pending.email)
  if (!user) {
    user = { id: makeId('user'), email: pending.email, name: pending.name, password: null }
    writeStore('users', [...users, user])
  }
  const session = { id: user.id, email: user.email, name: user.name }
  writeStore('session', session)
  writeStore('pendingOAuthConfirmation', null)
  notifyOAuthListeners({ user: session, pendingConfirmationEmail: null })
  return session
}

// Mock auth has no real redirect round-trip; state only changes via the
// listeners notified above (sign-up/sign-in/sign-out all go through these too).
function onAuthStateChange(callback) {
  oauthListeners.push(callback)
  return () => {
    oauthListeners = oauthListeners.filter((listener) => listener !== callback)
  }
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

// ---- account: profile, address book, returns, referrals, offers ----------

async function updateProfile(userId, { firstName, lastName, dateOfBirth }) {
  await delay()
  const users = getUsersDb()
  const next = users.map((u) =>
    u.id === userId ? { ...u, firstName, lastName, dateOfBirth, name: `${firstName} ${lastName}`.trim() } : u,
  )
  writeStore('users', next)
  const session = toSession(next.find((u) => u.id === userId))
  writeStore('session', session)
  return session
}

function getAddressesDb() {
  return readStore('addresses', [])
}

async function listAddresses() {
  await delay()
  return getAddressesDb()
}

async function addAddress(userId, input) {
  await delay()
  const addresses = getAddressesDb()
  const address = { id: makeId('addr'), isDefault: addresses.length === 0, ...input }
  const next = [...addresses, address]
  writeStore('addresses', next)
  return next
}

async function updateAddress(userId, addressId, input) {
  await delay()
  let addresses = getAddressesDb().map((a) => (a.id === addressId ? { ...a, ...input } : a))
  // Only one address can be the default — clear it on every other one.
  if (input.isDefault) {
    addresses = addresses.map((a) => (a.id === addressId ? a : { ...a, isDefault: false }))
  }
  writeStore('addresses', addresses)
  return addresses
}

async function removeAddress(userId, addressId) {
  await delay()
  const next = getAddressesDb().filter((a) => a.id !== addressId)
  writeStore('addresses', next)
  return next
}

async function listReturns() {
  await delay()
  return readStore('returns', [])
}

async function requestReturn(userId, { orderId, reason }) {
  await delay()
  const returns = readStore('returns', [])
  const next = [
    ...returns,
    { id: makeId('return'), orderId, reason, status: 'Requested', createdAt: new Date().toISOString() },
  ]
  writeStore('returns', next)
  return next
}

async function getReferralInfo(userId) {
  await delay()
  const code = `GS-${userId.slice(-6).toUpperCase()}`
  const stats = readStore('referralStats', { referralsCount: 0, creditsEarned: 0 })
  return { code, link: `https://www.gymshark.com/refer/${code}`, rewardAmount: 10, ...stats }
}

async function getActiveOffer() {
  await delay()
  return MOCK_ACTIVE_OFFER
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
  auth: { getCurrentUser, signUp, signIn, signInWithOAuth, confirmPendingOAuth, onAuthStateChange, signOut },
  orders: { list: listOrders, applyDiscountCode },
  account: {
    updateProfile,
    listAddresses,
    addAddress,
    updateAddress,
    removeAddress,
    listReturns,
    requestReturn,
    getReferralInfo,
    getActiveOffer,
  },
}
