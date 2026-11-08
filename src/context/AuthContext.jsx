import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // Set while a Google/Apple sign-in is waiting on the confirmation email
  // being clicked — see onAuthStateChange in providers/supabase/index.js.
  const [pendingConfirmationEmail, setPendingConfirmationEmail] = useState(null)

  useEffect(() => {
    api.auth
      .getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false))

    // Picks up both the OAuth confirmation state and the real session once
    // the confirmation email's link is used.
    return api.auth.onAuthStateChange(({ user: nextUser, pendingConfirmationEmail: pending }) => {
      setUser(nextUser)
      setPendingConfirmationEmail(pending ?? null)
    })
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

  // Never resolves a signed-in user directly — Google/Apple sign-in always
  // holds for the confirmation email; onAuthStateChange above reports the
  // pending state and, later, the real session.
  async function signInWithOAuth(provider) {
    await api.auth.signInWithOAuth(provider)
  }

  async function signOut() {
    await api.auth.signOut()
    setUser(null)
    setPendingConfirmationEmail(null)
  }

  // Lets pages like Account Details apply an updated session (e.g. after
  // changing name/email) without a full getCurrentUser() round trip.
  function updateUser(nextUser) {
    setUser(nextUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        pendingConfirmationEmail,
        signIn,
        signUp,
        signInWithOAuth,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
