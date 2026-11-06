/**
 * API contract — every provider (mock, supabase, firebase, ...) must
 * implement this exact shape. UI code only ever imports `api` from
 * `src/api/index.js` and never reaches into a provider directly, so
 * swapping providers later means writing a new file in `providers/`,
 * not touching any component.
 *
 * @typedef {Object} ProductVariant
 * @property {string} id
 * @property {string} size
 * @property {string} color
 * @property {string} sku
 * @property {number} stock
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {'f'|'m'|'u'} gender  f = women, m = men, u = unisex
 * @property {string} type  slug from src/config/productTypes.js (e.g. 'leggings', 'hoodies')
 * @property {string[]} activities  slugs from src/config/activities.js (e.g. 'running', 'yoga')
 * @property {number} price
 * @property {number|null} compareAtPrice  original price when on sale, else null
 * @property {string} description
 * @property {ProductVariant[]} variants
 * @property {string|null} image
 *
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} productId
 * @property {string} variantId
 * @property {number} quantity
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 *
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {CartItem[]} items
 * @property {number} total
 * @property {string} status
 * @property {string} createdAt
 *
 * @typedef {Object} SearchResult
 * @property {Product[]} products   first `limit` matches
 * @property {number} total         total matches before `limit`
 * @property {string[]} suggestions query suggestions for the typed term
 *
 * @typedef {Object} ApiProvider
 * @property {{
 *   list: (opts?: {
 *     category?: string,
 *     search?: string,
 *     sort?: string,
 *     gender?: 'f'|'m',   // includes unisex products
 *     activity?: string,  // comma-separated activity slugs; matches if any is in the product's `activities`
 *     type?: string,      // comma-separated product type slugs (src/config/productTypes.js)
 *     priceMin?: number,
 *     priceMax?: number,
 *     onSale?: boolean,   // only products with a compareAtPrice
 *     limit?: number,
 *   }) => Promise<Product[]>,
 *   getById: (id: string) => Promise<Product|null>,
 *   listCategories: () => Promise<string[]>,
 * }} products
 * @property {{
 *   query: (term: string, opts?: { gender?: 'f'|'m'|null, limit?: number }) => Promise<SearchResult>,
 *   trendingTerms: (opts?: { gender?: 'f'|'m'|null }) => Promise<string[]>,
 *   trendingProducts: (opts?: { gender?: 'f'|'m'|null, limit?: number }) => Promise<Product[]>,
 * }} search
 * @property {{
 *   get: () => Promise<CartItem[]>,
 *   add: (input: { productId: string, variantId: string, quantity: number }) => Promise<CartItem[]>,
 *   updateQuantity: (itemId: string, quantity: number) => Promise<CartItem[]>,
 *   remove: (itemId: string) => Promise<CartItem[]>,
 *   clear: () => Promise<void>,
 * }} cart
 * @property {{
 *   get: () => Promise<string[]>,
 *   toggle: (productId: string) => Promise<string[]>,
 * }} wishlist
 * @property {{
 *   getCurrentUser: () => Promise<User|null>,
 *   signUp: (input: { email: string, password: string, name: string }) => Promise<User>,
 *   signIn: (input: { email: string, password: string }) => Promise<User>,
 *   signOut: () => Promise<void>,
 * }} auth
 * @property {{
 *   list: (userId: string) => Promise<Order[]>,
 *   applyDiscountCode: (code: string) => Promise<{ valid: boolean, amountOff: number, message: string }>,
 * }} orders
 */

export {}
