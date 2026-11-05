import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.auth
      .getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false))
  }, [])

  async function signIn(credentials) {
    const signedInUser = await api.auth.signIn(credentials)
    setUser(signedInUser)
    return signedInUser
  }

  async function signUp(input) {
    const newUser = await api.auth.signUp(input)
    setUser(newUser)
    return newUser
  }

  async function signOut() {
    await api.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
