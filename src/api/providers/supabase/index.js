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
  return user ? { id: user.id, email: user.email, name: user.user_metadata?.name ?? '' } : null
}

async function signUp({ email, password, name }) {
  assertConfigured()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
  if (error) throw error
  return { id: data.user.id, email: data.user.email, name }
}

async function signIn({ email, password }) {
  assertConfigured()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.user_metadata?.name ?? '',
  }
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
  auth: { getCurrentUser, signUp, signIn, signOut },
  orders: { list: listOrders, applyDiscountCode },
}
