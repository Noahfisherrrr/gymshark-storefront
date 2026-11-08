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
 * @property {string|null} fit  slug from src/config/fits.js, null if not applicable (e.g. accessories)
 * @property {string|null} rise  slug from src/config/rises.js, null outside bottoms (leggings/shorts/joggers)
 * @property {string[]} features  slugs from src/config/features.js
 * @property {string|null} collection  slug from src/config/collections.js, null if unassigned
 * @property {number} price
 * @property {number|null} compareAtPrice  original price when on sale, else null
 * @property {string} description
 * @property {ProductVariant[]} variants
 * @property {string|null} image
 * @property {string|null} [tag]  short merchandising label shown on the image (e.g. 'New'), null if none
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
 * @property {string} name  full name, derived from firstName + lastName
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} dateOfBirth  ISO date string (YYYY-MM-DD)
 *
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {CartItem[]} items
 * @property {number} total
 * @property {string} status
 * @property {string} createdAt
 *
 * @typedef {Object} Address
 * @property {string} id
 * @property {string} label  e.g. "Home", "Work" — user-chosen
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} line1
 * @property {string} line2
 * @property {string} city
 * @property {string} postcode
 * @property {string} country
 * @property {string} phone
 * @property {boolean} isDefault
 *
 * @typedef {Object} ReturnRequest
 * @property {string} id
 * @property {string} orderId
 * @property {string} reason
 * @property {string} status
 * @property {string} createdAt  ISO datetime string
 *
 * @typedef {Object} ReferralInfo
 * @property {string} code
 * @property {string} link
 * @property {number} rewardAmount  credit (in store currency) earned per successful referral
 * @property {number} referralsCount
 * @property {number} creditsEarned
 *
 * @typedef {Object} AccountOffer
 * @property {string} code
 * @property {string} description
 * @property {number} amountOff  fraction, e.g. 0.1 = 10% off
 * @property {string|null} expiresAt  ISO date string, or null if it never expires
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
 *     size?: string,      // comma-separated sizes; matches if any variant has that size
 *     color?: string,     // comma-separated colors; matches if any variant has that color
 *     fit?: string,       // comma-separated fit slugs (src/config/fits.js)
 *     rise?: string,      // comma-separated rise slugs (src/config/rises.js)
 *     feature?: string,   // comma-separated feature slugs; matches if any is in the product's `features`
 *     collection?: string, // comma-separated collection slugs (src/config/collections.js)
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
 *   signUp: (input: { email: string, password: string, firstName: string, lastName: string, dateOfBirth: string }) => Promise<User>,
 *   signIn: (input: { email: string, password: string }) => Promise<User>,
 *   signInWithOAuth: (provider: 'google'|'apple') => Promise<void>,  // doesn't grant access directly — a confirmation email must be clicked first, see onAuthStateChange
 *   confirmPendingOAuth: () => Promise<User>,  // dev-only: completes the mock provider's simulated confirmation email. Supabase sends a real email instead and confirms automatically when its link is clicked, so its implementation is unused in practice.
 *   onAuthStateChange: (callback: (update: { user: User|null, pendingConfirmationEmail: string|null }) => void) => (() => void),  // returns an unsubscribe function
 *   signOut: () => Promise<void>,
 * }} auth
 * @property {{
 *   list: (userId: string) => Promise<Order[]>,
 *   applyDiscountCode: (code: string) => Promise<{ valid: boolean, amountOff: number, message: string }>,
 * }} orders
 * @property {{
 *   updateProfile: (userId: string, input: { firstName: string, lastName: string, dateOfBirth: string, email?: string, currentPassword?: string }) => Promise<User>,  // currentPassword is required when email is included and differs from the current one
 *   changePassword: (userId: string, input: { currentPassword: string, newPassword: string }) => Promise<void>,
 *   deleteAccount: (userId: string, input: { currentPassword: string }) => Promise<void>,  // rejects if the user has an order that isn't delivered/cancelled yet; past orders are kept as payment/fulfillment records rather than deleted with the account
 *   listAddresses: (userId: string) => Promise<Address[]>,
 *   addAddress: (userId: string, input: Omit<Address, 'id'|'isDefault'>) => Promise<Address[]>,
 *   updateAddress: (userId: string, addressId: string, input: Partial<Address>) => Promise<Address[]>,
 *   removeAddress: (userId: string, addressId: string) => Promise<Address[]>,
 *   listReturns: (userId: string) => Promise<ReturnRequest[]>,
 *   requestReturn: (userId: string, input: { orderId: string, reason: string }) => Promise<ReturnRequest[]>,
 *   getReferralInfo: (userId: string) => Promise<ReferralInfo>,
 *   getActiveOffer: (userId: string) => Promise<AccountOffer|null>,
 * }} account
 */

export {}
