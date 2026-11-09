import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from '../api'
import type { AuthStateUpdate, SignUpInput, User } from '../api/contract'

interface AuthContextValue {
  user: User | null
  loading: boolean
  pendingConfirmationEmail: string | null
  signIn: (credentials: { email: string; password: string }) => Promise<User>
  signUp: (input: SignUpInput) => Promise<User>
  signInWithOAuth: (provider: 'google' | 'apple') => Promise<void>
  signOut: () => Promise<void>
  updateUser: (nextUser: User | null) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // Set while a Google/Apple sign-in is waiting on the confirmation email
  // being clicked — see onAuthStateChange in providers/supabase/index.js.
  const [pendingConfirmationEmail, setPendingConfirmationEmail] = useState<string | null>(null)

  useEffect(() => {
    api.auth
      .getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false))

    // Picks up both the OAuth confirmation state and the real session once
    // the confirmation email's link is used.
    return api.auth.onAuthStateChange(({ user: nextUser, pendingConfirmationEmail: pending }: AuthStateUpdate) => {
      setUser(nextUser)
      setPendingConfirmationEmail(pending ?? null)
    })
  }, [])

  async function signIn(credentials: { email: string; password: string }): Promise<User> {
    const signedInUser = await api.auth.signIn(credentials)
    setUser(signedInUser)
    return signedInUser
  }

  async function signUp(input: SignUpInput): Promise<User> {
    const newUser = await api.auth.signUp(input)
    setUser(newUser)
    return newUser
  }

  // Never resolves a signed-in user directly — Google/Apple sign-in always
  // holds for the confirmation email; onAuthStateChange above reports the
  // pending state and, later, the real session.
  async function signInWithOAuth(provider: 'google' | 'apple'): Promise<void> {
    await api.auth.signInWithOAuth(provider)
  }

  async function signOut(): Promise<void> {
    await api.auth.signOut()
    setUser(null)
    setPendingConfirmationEmail(null)
  }

  // Lets pages like Account Details apply an updated session (e.g. after
  // changing name/email) without a full getCurrentUser() round trip.
  function updateUser(nextUser: User | null): void {
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

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
