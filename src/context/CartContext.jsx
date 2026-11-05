import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.cart
      .get()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  async function addItem(input) {
    const next = await api.cart.add(input)
    setItems(next)
    return next
  }

  async function updateQuantity(itemId, quantity) {
    const next = await api.cart.updateQuantity(itemId, quantity)
    setItems(next)
    return next
  }

  async function removeItem(itemId) {
    const next = await api.cart.remove(itemId)
    setItems(next)
    return next
  }

  async function clear() {
    await api.cart.clear()
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, loading, itemCount, addItem, updateQuantity, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
