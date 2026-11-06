import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'

// Same contract as the mock provider (src/api/contract.js). Switch to this
// provider by setting VITE_API_PROVIDER=supabase once the client's Supabase
// project exists (Brief.md #14) and the schema below is created (see
// plan.md → Phase 3).
//
// Expected tables: products, product_variants, cart_items, wishlist_items,
// orders, order_items. Column names below are a best guess based on the
// contract shapes — adjust the `.select()` mappings if the real schema
// differs once it's created.

function assertConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured yet (VITE_SUPABASE_URL/ANON_KEY missing). ' +
        'This is expected until the client provisions the project — see plan.md.',
    )
  }
}

function notImplemented(feature) {
  throw new Error(
    `${feature} is not implemented against Supabase yet — pending schema/scope decisions ` +
      'in Brief.md (see plan.md → Phase 3/4). Use VITE_API_PROVIDER=mock in the meantime.',
  )
}

// ---- products (real queries once the `products` table exists) --------

// Aliases snake_case columns to the contract's camelCase field names.
const PRODUCT_COLUMNS = '*, compareAtPrice:compare_at_price, variants:product_variants(*)'

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
  assertConfigured()
  let query = supabase.from('products').select(PRODUCT_COLUMNS)

  if (category && category !== 'all') query = query.eq('category', category)
  if (gender) query = query.in('gender', [gender, 'u'])
  // Assumes `activities` is a text[] column (see src/config/activities.js for slugs);
  // `overlaps` matches rows where any of the given activities is present.
  if (activity) query = query.overlaps('activities', activity.split(',').filter(Boolean))
  if (type) query = query.in('type', type.split(',').filter(Boolean))
  if (priceMin != null) query = query.gte('price', priceMin)
  if (priceMax != null) query = query.lte('price', priceMax)
  if (onSale) query = query.not('compare_at_price', 'is', null)
  if (search) query = query.ilike('name', `%${search}%`)
  if (sort === 'price-asc') query = query.order('price', { ascending: true })
  if (sort === 'price-desc') query = query.order('price', { ascending: false })
  if (sort === 'newest') query = query.order('created_at', { ascending: false })
  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) throw error
  return data
}

async function getProductById(id) {
  assertConfigured()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data
}

async function listCategories() {
  assertConfigured()
  const { data, error } = await supabase.from('products').select('category')
  if (error) throw error
  return [...new Set(data.map((row) => row.category))]
}

// ---- search -----------------------------------------------------------
// Plain ILIKE matching for now. Trending terms/products need a ranking
// source (search analytics or a curated table) — pending Brief.md #7.

async function searchProducts(term, { gender = null, limit = 20 } = {}) {
  assertConfigured()
  const tokens = (term ?? '').toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return { products: [], total: 0, suggestions: [] }

  let query = supabase
    .from('products')
    .select(PRODUCT_COLUMNS, { count: 'exact' })
  for (const token of tokens) query = query.ilike('name', `%${token}%`)
  if (gender) query = query.in('gender', [gender, 'u'])

  const { data, count, error } = await query.limit(limit)
  if (error) throw error
  const suggestions = [...new Set(data.map((p) => p.name.toLowerCase()))].slice(0, 4)
  return { products: data, total: count ?? data.length, suggestions }
}

async function trendingTerms() {
  notImplemented('Trending search terms')
}
async function trendingProducts() {
  notImplemented('Trending products')
}

// ---- cart / wishlist / orders — blocked on scope decisions -------------

async function getCart() {
  notImplemented('Cart persistence')
}
async function addToCart() {
  notImplemented('Cart persistence')
}
async function updateCartQuantity() {
  notImplemented('Cart persistence')
}
async function removeFromCart() {
  notImplemented('Cart persistence')
}
async function clearCart() {
  notImplemented('Cart persistence')
}

async function getWishlist() {
  notImplemented('Wishlist persistence')
}
async function toggleWishlist() {
  notImplemented('Wishlist persistence')
}

async function listOrders() {
  notImplemented('Order history')
}
async function applyDiscountCode() {
  notImplemented('Discount codes')
}

// ---- auth (real Supabase Auth calls — this part is stable today) -------

async function getCurrentUser() {
  assertConfigured()
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  const user = data.user
  if (!user) return null
  // An OAuth session that hasn't cleared the confirmation-email gate yet
  // (see onAuthStateChange) shouldn't count as a signed-in user on reload.
  if (hasOAuthIdentity(user) && user.user_metadata?.oauth_authorized !== true) return null
  return toUser(user)
}

async function signUp({ email, password, firstName, lastName, dateOfBirth }) {
  assertConfigured()
  const name = `${firstName} ${lastName}`.trim()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, firstName, lastName, dateOfBirth } },
  })
  if (error) throw error
  return { id: data.user.id, email: data.user.email, name, firstName, lastName, dateOfBirth }
}

async function signIn({ email, password }) {
  assertConfigured()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return toUser(data.user)
}

// Redirects the browser to Google/Apple; Supabase needs that provider
// enabled (with its OAuth client id/secret) in the client's Supabase project
// dashboard — pending Brief.md #14, same as the rest of Supabase Auth.
async function signInWithOAuth(provider) {
  assertConfigured()
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/account` },
  })
  if (error) throw error
}

function toUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name ?? '',
    firstName: user.user_metadata?.firstName ?? '',
    lastName: user.user_metadata?.lastName ?? '',
    dateOfBirth: user.user_metadata?.dateOfBirth ?? '',
  }
}

// localStorage (not state) because the confirmation email reopens the site in
// a fresh page load — a plain variable wouldn't survive that round trip.
const PENDING_OAUTH_KEY = 'gymshark:pendingOAuthEmail'

// Google/Apple already verify the email, but the client wants an extra
// authorization step: the OAuth sign-in above establishes a real Supabase
// session immediately, so we sign it straight back out and fire off
// Supabase's own magic-link email to the same address as the "confirm this
// sign-in" step. Clicking that link re-authenticates (a second SIGNED_IN
// event below), at which point we flag the account authorized for good.
async function demoteUnauthorizedOAuthSession(session, callback) {
  const email = session.user.email
  await supabase.auth.signOut()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/account` },
  })
  if (error) throw error
  window.localStorage.setItem(PENDING_OAUTH_KEY, email)
  callback({ user: null, pendingConfirmationEmail: email })
}

// `identities` lists every provider ever linked to the account, which is a
// more reliable signal than `app_metadata.provider` (not guaranteed to still
// read "google"/"apple" once the user has also signed in by email/OTP).
function hasOAuthIdentity(user) {
  return Boolean(user.identities?.some((identity) => identity.provider === 'google' || identity.provider === 'apple'))
}

function onAuthStateChange(callback) {
  if (!isSupabaseConfigured) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!session?.user) {
      callback({ user: null, pendingConfirmationEmail: null })
      return
    }

    const { user } = session
    const alreadyAuthorized = user.user_metadata?.oauth_authorized === true
    const awaitingThisEmail = window.localStorage.getItem(PENDING_OAUTH_KEY) === user.email

    // Checked first, regardless of provider: this is the session created by
    // clicking the confirmation email's link, so it's the real sign-in.
    if (awaitingThisEmail && !alreadyAuthorized) {
      window.localStorage.removeItem(PENDING_OAUTH_KEY)
      supabase.auth.updateUser({ data: { oauth_authorized: true } }).catch(() => {})
      callback({ user: toUser(user), pendingConfirmationEmail: null })
      return
    }

    if (hasOAuthIdentity(user) && !alreadyAuthorized) {
      // First time this Google/Apple account has signed in — hold access and
      // send the confirmation email instead of calling back with a user.
      demoteUnauthorizedOAuthSession(session, callback).catch(() =>
        callback({ user: null, pendingConfirmationEmail: null }),
      )
      return
    }

    callback({ user: toUser(user), pendingConfirmationEmail: null })
  })
  return () => data.subscription.unsubscribe()
}

// Real confirmation happens by clicking the emailed link (handled above);
// nothing for the UI to call directly against Supabase.
async function confirmPendingOAuth() {
  throw new Error('Click the confirmation link in your email to finish signing in.')
}

async function signOut() {
  assertConfigured()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/** @type {import('../../contract').ApiProvider} */
export const supabaseApi = {
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
}
