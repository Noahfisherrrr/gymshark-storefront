import { MOCK_PRODUCTS, MOCK_DISCOUNT_CODES } from '../../data/products.mock'
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

async function listProducts({ category, search, sort } = {}) {
  await delay()
  let items = [...MOCK_PRODUCTS]

  if (category && category !== 'all') {
    items = items.filter((p) => p.category === category)
  }

  if (search) {
    const q = search.toLowerCase()
    items = items.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }

  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)

  return items
}

async function getProductById(id) {
  await delay()
  return findProduct(id)
}

async function listCategories() {
  await delay()
  return [...new Set(MOCK_PRODUCTS.map((p) => p.category))]
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
