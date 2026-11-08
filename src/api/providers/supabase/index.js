import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'

// Implements the contract in src/api/contract.js. The schema itself
// (supabase/schema.sql) and seed data (supabase/seed.sql, SUPABASE_SETUP_GUIDE.md)
// live alongside this provider.
//
// Tables: profiles, products, product_variants, reviews, comments,
// review_helpful_votes, cart_items, wishlist_items, addresses, orders,
// order_items, discount_codes, content_blocks (see schema.sql for exact
// columns/RLS). snake_case column names are mapped to the contract's
// camelCase shapes below — see mapProductRow for the product-specific ones.

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
      'in Brief.md (see plan.md → Phase 3/4).',
  )
}

// ---- products (real queries once the `products` table exists) --------

const PRODUCT_COLUMNS = '*, variants:product_variants(*)'

// The `products`/`product_variants` tables use snake_case columns, but the
// contract (src/api/contract.js) and every component under src/components/pdp
// and src/pages/Product.jsx read camelCase fields — e.g. `fitNote`,
// `collectionName`, `colorHex`, `ratingBreakdown`, `reviewCount`,
// `completeTheLookIds`, `fitFeedback`, and (note the name) `care` for
// `care_instructions`. Without this mapping, those fields silently come back
// `undefined` and the PDP falls back to placeholder copy instead of the real
// product data.
function mapProductRow(row) {
  if (!row) return row
  const {
    compare_at_price,
    collection_name,
    fit_note,
    color_hex,
    rating_breakdown,
    review_count,
    complete_the_look_ids,
    fit_feedback,
    care_instructions,
    variants,
    ...rest
  } = row
  return {
    ...rest,
    compareAtPrice: compare_at_price,
    collectionName: collection_name,
    fitNote: fit_note,
    colorHex: color_hex,
    ratingBreakdown: rating_breakdown,
    reviewCount: review_count,
    completeTheLookIds: complete_the_look_ids,
    fitFeedback: fit_feedback,
    care: care_instructions,
    variants: (variants || []).map(mapVariantRow),
  }
}

function mapVariantRow(variant) {
  const { product_id, price_override, ...rest } = variant
  return { ...rest, productId: product_id, priceOverride: price_override }
}

async function listProducts({
  category,
  search,
  sort,
  gender,
  activity,
  type,
  size,
  color,
  fit,
  rise,
  feature,
  collection,
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
  if (fit) query = query.in('fit', fit.split(',').filter(Boolean))
  if (rise) query = query.in('rise', rise.split(',').filter(Boolean))
  if (feature) query = query.overlaps('features', feature.split(',').filter(Boolean))
  if (collection) query = query.in('collection', collection.split(',').filter(Boolean))
  // size/color live on `product_variants`, a joined table, so they can't be
  // a plain column filter on `products` here. A `!inner` embed filter would
  // also prune the returned `variants` array down to only the matching rows,
  // which breaks the PDP's size/colorway selectors — so instead this looks
  // up the matching product_ids first and filters `products.id` by that,
  // which still returns every variant per the contract ("matches if any
  // variant has that size/color").
  if (size || color) {
    let variantQuery = supabase.from('product_variants').select('product_id')
    if (size) variantQuery = variantQuery.in('size', size.split(',').filter(Boolean))
    if (color) variantQuery = variantQuery.in('color', color.split(',').filter(Boolean))
    const { data: variantRows, error: variantError } = await variantQuery
    if (variantError) throw variantError
    const matchingIds = [...new Set((variantRows || []).map((row) => row.product_id))]
    if (matchingIds.length === 0) return []
    query = query.in('id', matchingIds)
  }
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
  return (data || []).map(mapProductRow)
}

async function getProductById(id) {
  assertConfigured()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return mapProductRow(data)
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
  const products = (data || []).map(mapProductRow)
  const suggestions = [...new Set(products.map((p) => p.name.toLowerCase()))].slice(0, 4)
  return { products, total: count ?? products.length, suggestions }
}

// `gender` isn't used yet — trending terms are the same curated list for
// everyone until there's a real ranking source (see comment above).
async function trendingTerms({ gender: _gender = null } = {}) {
  return [
    'leggings',
    'black leggings',
    'sports bra',
    'shorts',
    'oversized t-shirt',
    'hoodie',
    'joggers',
    'seamless',
  ]
}

async function trendingProducts({ gender = null, limit = 8 } = {}) {
  assertConfigured()
  let query = supabase.from('products').select(PRODUCT_COLUMNS).order('review_count', { ascending: false })
  if (gender) query = query.in('gender', [gender, 'u'])
  const { data, error } = await query.limit(limit)
  if (error) throw error
  return (data || []).map(mapProductRow)
}

// ---- guest cart (localStorage) ----------------------------------------
// When the user is not signed in, cart operations run entirely in
// localStorage so the site works for every visitor — not just logged-in
// ones.  On sign-in, mergeGuestCartOnLogin() pushes the local items into
// Supabase and clears the local copy so the two never diverge.

const GUEST_CART_KEY = 'gymshark:guest_cart'

function readGuestCart() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]')
  } catch {
    return []
  }
}

function writeGuestCart(items) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items))
}

function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY)
}

function guestGetCart() {
  return Promise.resolve(readGuestCart())
}

function guestAddToCart({ productId, variantId, quantity }) {
  const items = readGuestCart()
  const existing = items.find((i) => i.variantId === variantId)
  let next
  if (existing) {
    next = items.map((i) =>
      i.variantId === variantId ? { ...i, quantity: i.quantity + quantity } : i,
    )
  } else {
    next = [
      ...items,
      {
        // Use a stable local id so CartContext can reference items by id.
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        productId,
        variantId,
        quantity,
      },
    ]
  }
  writeGuestCart(next)
  return Promise.resolve(next)
}

function guestUpdateCartQuantity(itemId, quantity) {
  if (quantity <= 0) return guestRemoveFromCart(itemId)
  const next = readGuestCart().map((i) => (i.id === itemId ? { ...i, quantity } : i))
  writeGuestCart(next)
  return Promise.resolve(next)
}

function guestRemoveFromCart(itemId) {
  const next = readGuestCart().filter((i) => i.id !== itemId)
  writeGuestCart(next)
  return Promise.resolve(next)
}

function guestClearCart() {
  clearGuestCart()
  return Promise.resolve()
}

// Called by onAuthStateChange when a user signs in.  Pushes every local item
// into Supabase (accumulating quantity, same as a normal add) and then wipes
// the local copy.
async function mergeGuestCartOnLogin(userId) {
  const local = readGuestCart()
  if (local.length === 0) return
  await Promise.all(
    local.map(({ productId, variantId, quantity }) =>
      upsertCartItem(userId, productId, variantId, quantity).catch(() => {}),
    ),
  )
  clearGuestCart()
}

// Adds `quantity` units of a variant to the user's Supabase cart row,
// accumulating on top of any existing quantity.  Uses a read-then-write
// approach so it works without an `add_to_cart` database function.
async function upsertCartItem(userId, productId, variantId, quantity) {
  // Check for an existing row for this user + variant.
  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .match({ user_id: userId, variant_id: variantId })
    .maybeSingle()

  if (existing) {
    // Accumulate quantity on top of whatever is already there.
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('cart_items').insert({
      user_id: userId,
      product_id: productId,
      variant_id: variantId,
      quantity,
    })
    if (error) throw error
  }
}

// ---- cart / wishlist / orders -----------------------------------------

async function getCart() {
  // Guest path — no Supabase needed
  if (!isSupabaseConfigured) return readGuestCart()
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) return readGuestCart()

  const { data, error } = await supabase
    .from('cart_items')
    .select('id, productId:product_id, variantId:variant_id, quantity')
    .eq('user_id', authData.user.id)
  if (error) throw error
  return data || []
}

async function addToCart({ productId, variantId, quantity }) {
  // Guest path
  if (!isSupabaseConfigured) return guestAddToCart({ productId, variantId, quantity })
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) return guestAddToCart({ productId, variantId, quantity })

  await upsertCartItem(authData.user.id, productId, variantId, quantity)
  return getCart()
}

async function updateCartQuantity(itemId, quantity) {
  if (!isSupabaseConfigured) return guestUpdateCartQuantity(itemId, quantity)
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) return guestUpdateCartQuantity(itemId, quantity)

  if (quantity <= 0) return removeFromCart(itemId)
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity, updated_at: new Date().toISOString() })
    .match({ id: itemId, user_id: authData.user.id })
  if (error) throw error
  return getCart()
}

async function removeFromCart(itemId) {
  if (!isSupabaseConfigured) return guestRemoveFromCart(itemId)
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) return guestRemoveFromCart(itemId)

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .match({ id: itemId, user_id: authData.user.id })
  if (error) throw error
  return getCart()
}

async function clearCart() {
  if (!isSupabaseConfigured) return guestClearCart()
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) return guestClearCart()

  const { error } = await supabase.from('cart_items').delete().eq('user_id', authData.user.id)
  if (error) throw error
}

async function getWishlist() {
  assertConfigured()
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) return []
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('product_id')
    .eq('user_id', authData.user.id)
  if (error) throw error
  return (data || []).map((row) => row.product_id)
}

async function toggleWishlist(productId) {
  assertConfigured()
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) throw new Error('Must be logged in to modify wishlist')
  const userId = authData.user.id
  const { data: existing } = await supabase
    .from('wishlist_items')
    .select('id')
    .match({ user_id: userId, product_id: productId })
    .maybeSingle()

  if (existing) {
    await supabase.from('wishlist_items').delete().eq('id', existing.id)
  } else {
    await supabase.from('wishlist_items').insert({ user_id: userId, product_id: productId })
  }
  return getWishlist()
}

// Maps a `orders` row (+ joined `order_items`) from snake_case Supabase
// columns to the camelCase shape the UI (OrderHistory, Confirmation) reads.
function toOrder(row) {
  return {
    id: row.id,
    total: Number(row.total),
    subtotal: row.subtotal != null ? Number(row.subtotal) : undefined,
    status: row.status,
    shippingAddress: row.shipping_address,
    createdAt: row.created_at,
    items: (row.items || []).map((item) => ({
      id: item.id,
      productId: item.product_id,
      variantId: item.variant_id,
      name: item.name,
      size: item.size,
      color: item.color,
      unitPrice: Number(item.unit_price),
      quantity: item.quantity,
    })),
  }
}

async function listOrders(userId) {
  assertConfigured()
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toOrder)
}

// Ghost checkout — simulates a completed purchase without payment.
// Saves a real `orders` + `order_items` row in Supabase (or creates a
// local-only object when the user is a guest) so the confirmation page
// and order history both work.
async function ghostCheckout({ shipping, lines, subtotal, discount }) {
  const shippingCost = shipping?.shippingMethod === 'express' ? 9.99 : 0
  const discountAmount = discount?.valid ? subtotal * discount.amountOff : 0
  const total = subtotal + shippingCost - discountAmount

  // Try to persist to Supabase if configured and user is signed in.
  if (isSupabaseConfigured) {
    const { data: authData } = await supabase.auth.getUser()
    if (authData?.user) {
      // Insert order header. `orders.id` has no DB default, so we have to
      // generate it ourselves; `subtotal` is NOT NULL too.
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          id: crypto.randomUUID(),
          user_id: authData.user.id,
          total,
          subtotal,
          discount_amount: discountAmount,
          status: 'processing',
          shipping_address: shipping,
        })
        .select()
        .single()

      if (!orderError && order) {
        // Insert order line items (best-effort — don't block confirmation)
        const orderItems = lines.map((line) => ({
          order_id: order.id,
          product_id: line.productId,
          variant_id: line.variantId,
          name: line.product?.name ?? '',
          size: line.variant?.size ?? '',
          color: line.variant?.color ?? '',
          unit_price: line.product?.price ?? 0,
          quantity: line.quantity,
        }))
        await supabase.from('order_items').insert(orderItems)
        return toOrder({ ...order, items: orderItems })
      }
    }
  }

  // Guest fallback — return a local object so the confirmation page renders.
  return {
    id: `ghost-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    total,
    status: 'processing',
    createdAt: new Date().toISOString(),
  }
}

async function applyDiscountCode(code) {
  assertConfigured()
  const cleanCode = (code || '').trim().toUpperCase()
  const { data, error } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('code', cleanCode)
    .eq('is_active', true)
    .maybeSingle()
  if (error || !data) {
    return { valid: false, amountOff: 0, message: 'Invalid or expired promo code.' }
  }
  return {
    valid: true,
    amountOff: Number(data.amount_off),
    message: `${Math.round(Number(data.amount_off) * 100)}% off applied!`,
  }
}

// ---- account: profile, address book, returns, referrals, offers ----------

// Profile fields live in Supabase Auth user_metadata, so this works today —
// no `profiles` table needed, unlike address book/returns/referrals below.
async function updateProfile(userId, { firstName, lastName, dateOfBirth, email, currentPassword }) {
  assertConfigured()
  const { data: current, error: getError } = await supabase.auth.getUser()
  if (getError) throw getError

  const emailChanged = email != null && email !== current.user.email
  if (emailChanged) {
    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: current.user.email,
      password: currentPassword,
    })
    if (reauthError) throw new Error('Current password is incorrect')
  }

  const name = `${firstName} ${lastName}`.trim()
  const { data, error } = await supabase.auth.updateUser({
    ...(emailChanged ? { email } : {}),
    data: { name, firstName, lastName, dateOfBirth },
  })
  if (error) throw error
  return toUser(data.user)
}

async function changePassword(userId, { currentPassword, newPassword }) {
  assertConfigured()
  const { data: current, error: getError } = await supabase.auth.getUser()
  if (getError) throw getError

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: current.user.email,
    password: currentPassword,
  })
  if (reauthError) throw new Error('Current password is incorrect')

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

async function deleteAccount(userId, { currentPassword }) {
  assertConfigured()
  const { data: current, error: getError } = await supabase.auth.getUser()
  if (getError) throw getError

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: current.user.email,
    password: currentPassword,
  })
  if (reauthError) throw new Error('Current password is incorrect')

  // TODO once the `orders` table exists (plan.md → Phase 3): block this when
  // the user has an order that isn't delivered/cancelled yet, and never
  // delete order rows — they're payment/fulfillment records that must
  // outlive the account.

  // The Supabase client SDK can't delete the current user itself (that's an
  // admin/service-role call) — this needs a server-side function (e.g. a
  // Supabase Edge Function calling auth.admin.deleteUser) once Brief.md #14's
  // project exists. Until then this fails after confirming the password is
  // correct, rather than silently doing nothing.
  notImplemented('Account deletion (needs a server-side admin call)')
}
async function listAddresses(userId) {
  assertConfigured()
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false })
  if (error) throw error
  return (data || []).map((a) => ({
    id: a.id,
    label: a.label,
    firstName: a.first_name,
    lastName: a.last_name,
    line1: a.line1,
    line2: a.line2,
    city: a.city,
    postcode: a.postcode,
    country: a.country,
    phone: a.phone,
    isDefault: a.is_default,
  }))
}

async function addAddress(userId, input) {
  assertConfigured()
  const { error } = await supabase.from('addresses').insert({
    user_id: userId,
    label: input.label || 'Home',
    first_name: input.firstName,
    last_name: input.lastName,
    line1: input.line1,
    line2: input.line2 || '',
    city: input.city,
    postcode: input.postcode,
    country: input.country,
    phone: input.phone || '',
    is_default: Boolean(input.isDefault),
  })
  if (error) throw error
  return listAddresses(userId)
}

async function updateAddress(userId, addressId, input) {
  assertConfigured()
  const updates = {}
  if (input.label !== undefined) updates.label = input.label
  if (input.firstName !== undefined) updates.first_name = input.firstName
  if (input.lastName !== undefined) updates.last_name = input.lastName
  if (input.line1 !== undefined) updates.line1 = input.line1
  if (input.line2 !== undefined) updates.line2 = input.line2
  if (input.city !== undefined) updates.city = input.city
  if (input.postcode !== undefined) updates.postcode = input.postcode
  if (input.country !== undefined) updates.country = input.country
  if (input.phone !== undefined) updates.phone = input.phone
  if (input.isDefault !== undefined) updates.is_default = input.isDefault

  const { error } = await supabase
    .from('addresses')
    .update(updates)
    .match({ id: addressId, user_id: userId })
  if (error) throw error
  return listAddresses(userId)
}

async function removeAddress(userId, addressId) {
  assertConfigured()
  const { error } = await supabase.from('addresses').delete().match({ id: addressId, user_id: userId })
  if (error) throw error
  return listAddresses(userId)
}

// No `returns` table yet (see requestReturn below) — nothing to list per user.
async function listReturns(_userId) {
  assertConfigured()
  return []
}

async function requestReturn(userId, input) {
  assertConfigured()
  return [{ id: 'ret-1', orderId: input.orderId, reason: input.reason, status: 'Requested', createdAt: new Date().toISOString() }]
}

async function getReferralInfo(userId) {
  assertConfigured()
  const code = `GS-${userId.slice(-6).toUpperCase()}`
  return { code, link: `https://www.gymshark.com/refer/${code}`, rewardAmount: 10, referralsCount: 0, creditsEarned: 0 }
}

async function getActiveOffer() {
  assertConfigured()
  const { data } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('code', 'WELCOME10')
    .maybeSingle()
  if (!data) return null
  return {
    code: data.code,
    description: data.description,
    amountOff: Number(data.amount_off),
    expiresAt: data.expires_at,
  }
}

// ---- reviews, comments & content (backend server content) -------------

async function listReviews(productId, { sort = 'recent', rating = null, verified = false } = {}) {
  assertConfigured()
  let query = supabase.from('reviews').select('*').eq('product_id', productId).eq('status', 'approved')

  if (rating !== null) query = query.eq('rating', rating)
  if (verified) query = query.eq('verified', true)

  if (sort === 'highest') query = query.order('rating', { ascending: false })
  else if (sort === 'lowest') query = query.order('rating', { ascending: true })
  else if (sort === 'helpful') query = query.order('helpful_count', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  const { data, error } = await query
  if (error) throw error

  return (data || []).map((r) => ({
    id: r.id,
    productId: r.product_id,
    author: r.author,
    verified: r.verified,
    rating: r.rating,
    date: (r.created_at || '').split('T')[0],
    title: r.title,
    content: r.content,
    activity: r.activity,
    sizePurchased: r.size_purchased,
    usualSize: r.usual_size,
    height: r.height,
    weight: r.weight,
    helpfulCount: r.helpful_count,
  }))
}

async function addReview(productId, input) {
  assertConfigured()
  const { data: authData } = await supabase.auth.getUser()
  const user = authData?.user

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      product_id: productId,
      user_id: user?.id || null,
      author: input.author || 'Anonymous',
      verified: Boolean(user || input.email),
      rating: Number(input.rating) || 5,
      title: input.title || '',
      content: input.content || '',
      activity: input.activity || 'Training',
      size_purchased: input.sizePurchased || 'M',
      usual_size: input.usualSize || 'M',
      height: input.height || '',
      weight: input.weight || '',
      status: 'approved',
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    productId: data.product_id,
    author: data.author,
    verified: data.verified,
    rating: data.rating,
    date: (data.created_at || '').split('T')[0],
    title: data.title,
    content: data.content,
    activity: data.activity,
    sizePurchased: data.size_purchased,
    usualSize: data.usual_size,
    height: data.height,
    weight: data.weight,
    helpfulCount: data.helpful_count,
  }
}

async function voteHelpfulReview(reviewId) {
  assertConfigured()
  const { data: authData } = await supabase.auth.getUser()
  if (authData?.user) {
    await supabase.from('review_helpful_votes').insert({ review_id: reviewId, user_id: authData.user.id }).catch(() => {})
  }
  // A plain client-side `update` here would need the reviews UPDATE policy
  // ("Users can update own reviews") to pass, which only lets the review's
  // author or an admin through — so anyone else marking a review helpful
  // got a permission-denied error. increment_review_helpful (schema.sql) is
  // a SECURITY DEFINER function that does the +1 atomically in the database
  // and bypasses that ownership check for this one counter.
  const { data, error } = await supabase.rpc('increment_review_helpful', { p_review_id: reviewId })
  if (error) throw error
  return { helpfulCount: data }
}

async function listComments(parentType, parentId) {
  assertConfigured()
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .match({ parent_type: parentType, parent_id: parentId, status: 'approved' })
    .order('created_at', { ascending: false })
  if (error) throw error

  return (data || []).map((c) => ({
    id: c.id,
    parentType: c.parent_type,
    parentId: c.parent_id,
    authorName: c.author_name,
    authorRole: c.author_role,
    content: c.content,
    createdAt: c.created_at,
  }))
}

async function addComment(parentType, parentId, { content, authorName = 'Customer' }) {
  assertConfigured()
  const { data: authData } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('comments')
    .insert({
      parent_type: parentType,
      parent_id: parentId,
      user_id: authData?.user?.id || null,
      author_name: authorName,
      content,
      status: 'approved',
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    parentType: data.parent_type,
    parentId: data.parent_id,
    authorName: data.author_name,
    authorRole: data.author_role,
    content: data.content,
    createdAt: data.created_at,
  }
}

async function getContentBlock(key) {
  assertConfigured()
  const { data, error } = await supabase.from('content_blocks').select('content').eq('key', key).maybeSingle()
  if (error || !data) return null
  return data.content
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
      mergeGuestCartOnLogin(user.id).catch(() => {})
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

    // Normal sign-in: merge any guest cart items the user built up while browsing.
    mergeGuestCartOnLogin(user.id).catch(() => {})
    callback({ user: toUser(user), pendingConfirmationEmail: null })
  })
  return () => data.subscription.unsubscribe()
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
  auth: { getCurrentUser, signUp, signIn, signInWithOAuth, onAuthStateChange, signOut },
  orders: { list: listOrders, applyDiscountCode, ghostCheckout },
  account: {
    updateProfile,
    changePassword,
    deleteAccount,
    listAddresses,
    addAddress,
    updateAddress,
    removeAddress,
    listReturns,
    requestReturn,
    getReferralInfo,
    getActiveOffer,
  },
  reviews: {
    list: listReviews,
    add: addReview,
    voteHelpful: voteHelpfulReview,
  },
  comments: {
    list: listComments,
    add: addComment,
  },
  content: {
    getBlock: getContentBlock,
  },
}
