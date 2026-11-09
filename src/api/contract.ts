/**
 * API contract — every provider (supabase, or any future backend) must
 * implement this exact shape. UI code only ever imports `api` from
 * `src/api/index.ts` and never reaches into a provider directly, so
 * swapping providers later means writing a new file in `providers/`,
 * not touching any component.
 */

export interface ProductVariant {
  id: string
  productId?: string
  size: string
  color: string
  sku: string
  stock: number
  priceOverride?: number | null
}

export interface ColorwayOption {
  name: string
  hex: string
  slug: string
  image: string
  isCurrent: boolean
}

export interface GalleryItem {
  type: 'image' | 'video'
  url?: string
  src?: string
  fallback?: string
  alt?: string
  badge?: string
}

export interface FitFeedback {
  runsSmall: number
  trueToSize: number
  runsLarge: number
  softnessRating: number
  supportRating: string
}

export interface DeliveryInfo {
  freeThreshold: number
  standardDays: string
  expressPrice: number
  expressDays: string
  returnDays: number
}

export type RatingBreakdown = Record<'1' | '2' | '3' | '4' | '5', number>

export interface Product {
  id: string
  /** usually equal to `id`; ColorSelector links to `/products/:slug` */
  slug?: string
  name: string
  subtitle?: string
  category: string
  /** f = women, m = men, u = unisex */
  gender: 'f' | 'm' | 'u'
  /** slug from src/config/productTypes.js (e.g. 'leggings', 'hoodies') */
  type: string
  /** slugs from src/config/activities.js (e.g. 'running', 'yoga') */
  activities: string[]
  /** slug from src/config/fits.js, null if not applicable (e.g. accessories) */
  fit: string | null
  /** PDP copy, e.g. "Model is 5'8\" wearing size S" */
  fitNote?: string | null
  /** slug from src/config/rises.js, null outside bottoms (leggings/shorts/joggers) */
  rise: string | null
  /** slugs from src/config/features.js */
  features: string[]
  /** slug from src/config/collections.js, null if unassigned */
  collection: string | null
  /** display name for `collection` */
  collectionName?: string | null
  price: number
  /** original price when on sale, else null */
  compareAtPrice: number | null
  description: string
  /** bullet points shown in the PDP accordion */
  highlights?: string[]
  materials?: string
  /** care instructions (maps to the `care_instructions` column — note the shortened name) */
  care?: string[]
  variants: ProductVariant[]
  image: string | null
  /** short merchandising label shown on the image (e.g. 'New'), null if none */
  tag?: string | null
  badges?: string[]
  /** the swatch name this product row represents (one product per colorway) */
  color?: string
  colorHex?: string
  colorways?: ColorwayOption[]
  gallery?: GalleryItem[]
  rating?: number
  reviewCount?: number
  ratingBreakdown?: RatingBreakdown
  fitFeedback?: FitFeedback
  /** product ids shown in the "Complete the Look" rail */
  completeTheLookIds?: string[]
  /** local-only static copy, not stored in Supabase — components fall back to defaults when absent */
  deliveryInfo?: DeliveryInfo
}

export interface CartItem {
  id: string
  productId: string
  variantId: string
  quantity: number
}

export interface User {
  id: string
  email: string
  /** full name, derived from firstName + lastName */
  name: string
  firstName: string
  lastName: string
  /** ISO date string (YYYY-MM-DD) */
  dateOfBirth: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone?: string
  line1: string
  line2?: string
  city: string
  state?: string
  postcode: string
  country: string
  shippingMethod: 'standard' | 'express'
}

export interface OrderItem {
  id: string
  productId: string
  variantId: string
  name: string
  size: string
  color: string
  unitPrice: number
  quantity: number
}

export interface Order {
  id: string
  total: number
  subtotal?: number
  status: string
  shippingAddress?: ShippingAddress
  createdAt: string
  items: OrderItem[]
}

/** The guest (non-persisted) fallback returned by ghostCheckout when no user is signed in. */
export interface GuestOrder {
  id: string
  total: number
  status: string
  createdAt: string
}

export interface Address {
  id: string
  /** e.g. "Home", "Work" — user-chosen */
  label: string
  firstName: string
  lastName: string
  line1: string
  line2: string
  city: string
  postcode: string
  country: string
  phone: string
  isDefault: boolean
}

export interface ReturnRequest {
  id: string
  orderId: string
  reason: string
  status: string
  /** ISO datetime string */
  createdAt: string
}

export interface ReferralInfo {
  code: string
  link: string
  /** credit (in store currency) earned per successful referral */
  rewardAmount: number
  referralsCount: number
  creditsEarned: number
}

export interface AccountOffer {
  code: string
  description: string
  /** fraction, e.g. 0.1 = 10% off */
  amountOff: number
  /** ISO date string, or null if it never expires */
  expiresAt: string | null
}

export interface Review {
  id: string
  productId: string
  author: string
  verified: boolean
  rating: number
  date: string
  title?: string
  content: string
  activity?: string
  sizePurchased?: string
  usualSize?: string
  height?: string
  weight?: string
  helpfulCount: number
}

export interface Comment {
  id: string
  parentType: 'review' | 'product' | 'blog'
  parentId: string
  authorName: string
  authorRole: 'customer' | 'staff' | 'admin'
  content: string
  createdAt: string
}

export interface SearchResult {
  /** first `limit` matches */
  products: Product[]
  /** total matches before `limit` */
  total: number
  /** query suggestions for the typed term */
  suggestions: string[]
}

export interface DiscountResult {
  valid: boolean
  amountOff: number
  message: string
}

export interface ProductListOptions {
  category?: string
  search?: string
  sort?: string
  /** includes unisex products */
  gender?: 'f' | 'm'
  /** comma-separated activity slugs; matches if any is in the product's `activities` */
  activity?: string
  /** comma-separated product type slugs (src/config/productTypes.js) */
  type?: string
  /** comma-separated sizes; matches if any variant has that size */
  size?: string
  /** comma-separated colors; matches if any variant has that color */
  color?: string
  /** comma-separated fit slugs (src/config/fits.js) */
  fit?: string
  /** comma-separated rise slugs (src/config/rises.js) */
  rise?: string
  /** comma-separated feature slugs; matches if any is in the product's `features` */
  feature?: string
  /** comma-separated collection slugs (src/config/collections.js) */
  collection?: string
  priceMin?: number
  priceMax?: number
  /** only products with a compareAtPrice */
  onSale?: boolean
  limit?: number
}

export interface AuthStateUpdate {
  user: User | null
  pendingConfirmationEmail: string | null
}

export interface SignUpInput {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
}

export interface UpdateProfileInput {
  firstName: string
  lastName: string
  dateOfBirth: string
  email?: string
  /** required when email is included and differs from the current one */
  currentPassword?: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}

export interface AddReviewInput {
  rating: number
  title?: string
  content: string
  author: string
  email?: string
  sizePurchased?: string
  usualSize?: string
  activity?: string
  height?: string
  weight?: string
}

export interface AddCommentInput {
  content: string
  authorName?: string
}

export interface GhostCheckoutInput {
  shipping: ShippingAddress
  lines: Array<{ productId: string; variantId: string; quantity: number; product?: Product; variant?: ProductVariant }>
  subtotal: number
  discount?: DiscountResult | null
}

export interface ApiProvider {
  products: {
    list: (opts?: ProductListOptions) => Promise<Product[]>
    getById: (id: string) => Promise<Product | null>
    listCategories: () => Promise<string[]>
  }
  search: {
    query: (term: string, opts?: { gender?: 'f' | 'm' | null; limit?: number }) => Promise<SearchResult>
    trendingTerms: (opts?: { gender?: 'f' | 'm' | null }) => Promise<string[]>
    trendingProducts: (opts?: { gender?: 'f' | 'm' | null; limit?: number }) => Promise<Product[]>
  }
  cart: {
    get: () => Promise<CartItem[]>
    add: (input: { productId: string; variantId: string; quantity: number }) => Promise<CartItem[]>
    updateQuantity: (itemId: string, quantity: number) => Promise<CartItem[]>
    remove: (itemId: string) => Promise<CartItem[]>
    clear: () => Promise<void>
  }
  wishlist: {
    get: () => Promise<string[]>
    toggle: (productId: string) => Promise<string[]>
  }
  auth: {
    getCurrentUser: () => Promise<User | null>
    signUp: (input: SignUpInput) => Promise<User>
    signIn: (input: { email: string; password: string }) => Promise<User>
    /** doesn't grant access directly — a confirmation email must be clicked first, see onAuthStateChange */
    signInWithOAuth: (provider: 'google' | 'apple') => Promise<void>
    /** returns an unsubscribe function */
    onAuthStateChange: (callback: (update: AuthStateUpdate) => void) => () => void
    signOut: () => Promise<void>
  }
  orders: {
    list: (userId: string) => Promise<Order[]>
    applyDiscountCode: (code: string) => Promise<DiscountResult>
    ghostCheckout: (input: GhostCheckoutInput) => Promise<Order | GuestOrder>
  }
  account: {
    updateProfile: (userId: string, input: UpdateProfileInput) => Promise<User>
    changePassword: (userId: string, input: ChangePasswordInput) => Promise<void>
    /** rejects if the user has an order that isn't delivered/cancelled yet; past orders are kept as payment/fulfillment records rather than deleted with the account */
    deleteAccount: (userId: string, input: { currentPassword: string }) => Promise<void>
    listAddresses: (userId: string) => Promise<Address[]>
    addAddress: (userId: string, input: Omit<Address, 'id' | 'isDefault'> & { isDefault?: boolean }) => Promise<Address[]>
    updateAddress: (userId: string, addressId: string, input: Partial<Address>) => Promise<Address[]>
    removeAddress: (userId: string, addressId: string) => Promise<Address[]>
    listReturns: (userId: string) => Promise<ReturnRequest[]>
    requestReturn: (userId: string, input: { orderId: string; reason: string }) => Promise<ReturnRequest[]>
    getReferralInfo: (userId: string) => Promise<ReferralInfo>
    getActiveOffer: (userId: string) => Promise<AccountOffer | null>
  }
  reviews: {
    list: (
      productId: string,
      opts?: { sort?: 'recent' | 'highest' | 'lowest' | 'helpful'; rating?: number | null; verified?: boolean },
    ) => Promise<Review[]>
    add: (productId: string, input: AddReviewInput) => Promise<Review>
    voteHelpful: (reviewId: string) => Promise<{ helpfulCount: number }>
  }
  comments: {
    list: (parentType: 'review' | 'product' | 'blog', parentId: string) => Promise<Comment[]>
    add: (parentType: 'review' | 'product' | 'blog', parentId: string, input: AddCommentInput) => Promise<Comment>
  }
  content: {
    getBlock: (key: string) => Promise<unknown>
  }
}
