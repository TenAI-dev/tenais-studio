// contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { storage, StorageKeys } from '../lib/storage'
import supabase from '../lib/supabase'

interface AuthContextType {
  isAuthenticated: boolean
  onboardingCompleted: boolean
  isLoading: boolean
  setOnboardingCompleted: (v: boolean) => void
  setIsAuthenticated: (v: boolean) => void
  logout: () => Promise<void>
  resetOnboarding: () => Promise<void>
  /** bump this number whenever auth-relevant state changes */
  authStateChanged: number
  isGuest: boolean
  setAsGuest: () => void
  setAsUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authStateChanged, setAuthStateChanged] = useState(0)
  const [isGuest, setIsGuest] = useState(false)

  const setAsGuest = () => setIsGuest(true)
  const setAsUser = () => setIsGuest(false)

  /** 1⃣  initial boot‐time check */
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        const authFlag = await storage.getItem(StorageKeys.IS_AUTHENTICATED)
        const onboardingFlag = await storage.getItem(
          StorageKeys.ONBOARDING_COMPLETED,
        )

        // ✨ optional extra: verify the user row exists
        if (session?.user) {
          const { data: userProfile, error } = await supabase
            .from('users')
            .select('id')
            .eq('auth_id', session.user.id)
            .single()

          if (error || !userProfile) {
            await storage.clearAll()
            setIsAuthenticated(false)
            setOnboardingCompleted(false)
            setAuthStateChanged((n) => n + 1)
            return
          }
        }

        setIsAuthenticated(!!session && !!authFlag)
        setOnboardingCompleted(!!onboardingFlag)
      } catch (err) {
        console.error('Auth boot-check failed:', err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  /** helpers that also tick the counter */
  const bump = () => setAuthStateChanged((n) => n + 1)
  const setIsAuthenticatedWithUpdate = (v: boolean) => {
    setIsAuthenticated(v)
    bump()
  }
  const setOnboardingCompletedWithUpdate = (v: boolean) => {
    setOnboardingCompleted(v)
    bump()
  }

  /** 2⃣  the missing implementation */
  const resetOnboarding = async () => {
    try {
      console.log('🔄 Resetting onboarding…')
      await storage.clearAll()
      setIsAuthenticated(false)
      setOnboardingCompleted(false)
      bump()
      console.log('✅ Onboarding reset done')
    } catch (err) {
      console.error('resetOnboarding error:', err)
    }
  }

  /** 3⃣  logout */
  const logout = async () => {
    try {
      console.log('🔓 Logging out…')
      await supabase.auth.signOut()
      await storage.clearAll()
      setIsAuthenticated(false)
      setOnboardingCompleted(false)
      bump()
      console.log('✅ Logout done')
    } catch (err) {
      console.error('logout error:', err)
    }
  }

  /** 4⃣  live auth change listener — no navigation side-effects */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)
      if (event === 'SIGNED_OUT') {
        await storage.clearAll()
        setIsAuthenticated(false)
        setOnboardingCompleted(false)
        bump()
      }
      if (event === 'SIGNED_IN' && session) {
        const authFlag = await storage.getItem(StorageKeys.IS_AUTHENTICATED)
        const onboardingFlag = await storage.getItem(
          StorageKeys.ONBOARDING_COMPLETED,
        )
        setIsAuthenticated(!!authFlag)
        setOnboardingCompleted(!!onboardingFlag)
        bump()
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  /** 5⃣  final context value */
  const value: AuthContextType = {
    isAuthenticated,
    onboardingCompleted,
    isLoading,
    setOnboardingCompleted: setOnboardingCompletedWithUpdate,
    setIsAuthenticated: setIsAuthenticatedWithUpdate,
    logout,
    resetOnboarding,
    authStateChanged,
    isGuest,
    setAsGuest,
    setAsUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
