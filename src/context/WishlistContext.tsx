import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from '../api'

interface WishlistContextValue {
  productIds: string[]
  loading: boolean
  toggle: (productId: string) => Promise<string[]>
  isWishlisted: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.wishlist
      .get()
      .then(setProductIds)
      .finally(() => setLoading(false))
  }, [])

  async function toggle(productId: string): Promise<string[]> {
    const next = await api.wishlist.toggle(productId)
    setProductIds(next)
    return next
  }

  function isWishlisted(productId: string): boolean {
    return productIds.includes(productId)
  }

  return (
    <WishlistContext.Provider value={{ productIds, loading, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
