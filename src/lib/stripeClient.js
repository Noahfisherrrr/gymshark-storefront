import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

// Pending: client-owned, verified Stripe account (Brief.md #9, #14).
// stripePromise resolves to null until a real publishable key is set.
export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

export const isStripeConfigured = Boolean(stripePublishableKey)
