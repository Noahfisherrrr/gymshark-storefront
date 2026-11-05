// Currency is pending client confirmation (Brief.md #9); USD matches the
// USP copy in config/navigation.js for now.
const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatPrice(amount) {
  return priceFormat.format(amount)
}
