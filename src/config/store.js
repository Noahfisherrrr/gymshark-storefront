// Commerce rules the UI needs before the backend owns them. Shipping
// thresholds are pending the client's shipping rules (Brief.md #11) — keep
// this in sync with the USP copy in config/navigation.js until then.

export const FREE_STANDARD_SHIPPING_THRESHOLD = 75

// Gymshark caps per-line quantity in the bag at 10.
export const MAX_LINE_QUANTITY = 10
