import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { useCart } from '../context/CartContext'

// Joins cart items to their product + variant so views can render them.
// Items whose product/variant no longer exists are dropped.
export function useCartLines() {
  const { items } = useCart()
  const [products, setProducts] = useState(null)

  useEffect(() => {
    api.products.list().then(setProducts)
  }, [])

  const lines = useMemo(() => {
    if (!products) return []
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId)
        const variant = product?.variants.find((v) => v.id === item.variantId)
        if (!product || !variant) return null
        return { ...item, product, variant, lineTotal: product.price * item.quantity }
      })
      .filter(Boolean)
  }, [items, products])

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)

  return { lines, subtotal, loading: products === null }
}
