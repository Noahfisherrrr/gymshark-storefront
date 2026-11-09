import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import type { CartItem, Product, ProductVariant } from '../api/contract'

export interface CartLine extends CartItem {
  product: Product
  variant: ProductVariant
  lineTotal: number
}

interface UseCartLinesResult {
  lines: CartLine[]
  subtotal: number
  loading: boolean
}

// Joins cart items to their product + variant so views can render them.
// Items whose product/variant no longer exists are dropped.
export function useCartLines(): UseCartLinesResult {
  const { items } = useCart()
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    api.products.list().then(setProducts)
  }, [])

  const lines = useMemo<CartLine[]>(() => {
    if (!products) return []
    return items
      .map((item): CartLine | null => {
        const product = products.find((p) => p.id === item.productId)
        const variant = product?.variants.find((v) => v.id === item.variantId)
        if (!product || !variant) return null
        return { ...item, product, variant, lineTotal: product.price * item.quantity }
      })
      .filter((line): line is CartLine => line !== null)
  }, [items, products])

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)

  return { lines, subtotal, loading: products === null }
}
