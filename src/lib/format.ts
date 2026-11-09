// Currency is pending client confirmation (Brief.md #9); USD matches the
// ads copy in config/navigation.js for now.
const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatPrice(amount: number): string {
  return priceFormat.format(amount)
}

const dateFormat = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

export function formatDate(isoDate: string): string {
  return dateFormat.format(new Date(isoDate))
}
