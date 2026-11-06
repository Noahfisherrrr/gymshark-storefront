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

    // Picks up the session Supabase creates once a Google/Apple OAuth
    // redirect lands back on the site; a no-op under the mock provider.
    return api.auth.onAuthStateChange(setUser)
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

  // Resolves to a User under the mock provider (instant fake sign-in); under
  // Supabase it redirects the browser away, so there's nothing useful to
  // return — onAuthStateChange above picks up the session on return.
  async function signInWithOAuth(provider) {
    const signedInUser = await api.auth.signInWithOAuth(provider)
    if (signedInUser) setUser(signedInUser)
    return signedInUser
  }

  async function signOut() {
    await api.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithOAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
