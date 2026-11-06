// Commerce rules the UI needs before the backend owns them. Shipping
// thresholds are pending the client's shipping rules (Brief.md #11) — keep
// this in sync with ADS_MESSAGES in config/navigation.js until then.

export const FREE_STANDARD_SHIPPING_THRESHOLD = 75

// Flat rate shown below the free-shipping threshold. Real rates are pending
// the client's shipping rules (Brief.md #11).
export const STANDARD_SHIPPING_COST = 5

// Gymshark caps per-line quantity in the bag at 10.
export const MAX_LINE_QUANTITY = 10

// Stock at or below this shows a "Last few remaining" nudge on the line item.
export const LOW_STOCK_THRESHOLD = 5

// Generic payment-network badges, not Gymshark's assets. Which of these the
// client actually accepts is pending their verified Stripe account
// (Brief.md #9) — shown as plain text so nothing implies a live integration.
export const PAYMENT_METHODS = [
  'Visa',
  'Mastercard',
  'PayPal',
  'Apple Pay',
  'Klarna',
  'American Express',
  'Afterpay',
  'Sezzle',
]
