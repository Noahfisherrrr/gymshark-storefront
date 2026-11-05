import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.wishlist
      .get()
      .then(setProductIds)
      .finally(() => setLoading(false))
  }, [])

  async function toggle(productId) {
    const next = await api.wishlist.toggle(productId)
    setProductIds(next)
    return next
  }

  function isWishlisted(productId) {
    return productIds.includes(productId)
  }

  return (
    <WishlistContext.Provider value={{ productIds, loading, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
