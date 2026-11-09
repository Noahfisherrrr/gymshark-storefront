import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from '../api'
import type { CartItem } from '../api/contract'

interface CartContextValue {
  items: CartItem[]
  loading: boolean
  itemCount: number
  addItem: (input: { productId: string; variantId: string; quantity: number }) => Promise<CartItem[]>
  updateQuantity: (itemId: string, quantity: number) => Promise<CartItem[]>
  removeItem: (itemId: string) => Promise<CartItem[]>
  clear: () => Promise<void>
  miniBagOpen: boolean
  openMiniBag: () => void
  closeMiniBag: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  // The header's mini bag; lives here so add-to-cart anywhere can open it.
  const [miniBagOpen, setMiniBagOpen] = useState(false)
  const openMiniBag = useCallback(() => setMiniBagOpen(true), [])
  const closeMiniBag = useCallback(() => setMiniBagOpen(false), [])

  // Load cart on mount — works for guests (localStorage) and signed-in users (Supabase).
  useEffect(() => {
    api.cart
      .get()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  // When auth state changes (sign-in / sign-out), reload the cart so the UI
  // immediately reflects the merged Supabase cart (after login) or resets to
  // the localStorage guest cart (after logout).
  useEffect(() => {
    const unsubscribe = api.auth.onAuthStateChange(() => {
      api.cart.get().then(setItems).catch(() => setItems([]))
    })
    return unsubscribe
  }, [])

  async function addItem(input: { productId: string; variantId: string; quantity: number }): Promise<CartItem[]> {
    const next = await api.cart.add(input)
    setItems(next)
    return next
  }

  async function updateQuantity(itemId: string, quantity: number): Promise<CartItem[]> {
    const next = await api.cart.updateQuantity(itemId, quantity)
    setItems(next)
    return next
  }

  async function removeItem(itemId: string): Promise<CartItem[]> {
    const next = await api.cart.remove(itemId)
    setItems(next)
    return next
  }

  async function clear(): Promise<void> {
    await api.cart.clear()
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        itemCount,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        miniBagOpen,
        openMiniBag,
        closeMiniBag,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
