// _layout.tsx
import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useEffect, useState, useRef } from "react"
import { useRouter, useSegments } from "expo-router"
import { AuthProvider, useAuth } from "../contexts/AuthContext"
import LoadingScreen from "../components/LoadingScreen"

function RootNavigator() {
  const { isAuthenticated, onboardingCompleted, isLoading, authStateChanged } = useAuth()
  const router = useRouter()
  const segments = useSegments()
  const [navigationReady, setNavigationReady] = useState(false)
  const hasNavigated = useRef(false)

  // Wait for initial load to complete before allowing navigation
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setNavigationReady(true)
      }, 500) // Give extra time for everything to settle
      
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  // Handle navigation when state changes
  useEffect(() => {
    if (!navigationReady || isLoading) return

    const performNavigation = async () => {
      const inAuthGroup = segments[0] === '(auth)'
      const inTabsGroup = segments[0] === '(tabs)'
      const currentRoute = segments[segments.length - 1] || segments[0]
      
      console.log('Navigation evaluation:', { 
        currentRoute, 
        isAuthenticated, 
        onboardingCompleted,
        segments,
        navigationReady,
        hasNavigated: hasNavigated.current,
        authStateChanged
      })

      // Determine target route
      let targetRoute = null
      
      if (isAuthenticated) {
        // User is fully authenticated - should only be in main app
        if (!inTabsGroup) {
          console.log('Authenticated user not in tabs, redirecting to main app')
          targetRoute = "/(tabs)"
        }
      } else if (onboardingCompleted) {
        // User has completed onboarding but not authenticated
        // They should only access auth flow, NOT onboarding flow
        const authFlowRoutes = ['signin', 'signup', 'otp', 'success']
        const onboardingRoutes = ['index', 'welcome', 'onboarding', 'role-selection']
        
        if (onboardingRoutes.includes(currentRoute)) {
          // User trying to access onboarding when already completed - redirect to signin
          console.log('User with completed onboarding trying to access onboarding flow, redirecting to signin')
          targetRoute = "/signin"
        } else if (!inAuthGroup && !authFlowRoutes.includes(currentRoute)) {
          // User not in auth flow and not in allowed routes
          console.log('User with completed onboarding not in auth flow, redirecting to signin')
          targetRoute = "/signin"
        }
      } else {
        // Fresh user - allow onboarding flow only
        const onboardingRoutes = ['index', 'welcome', 'onboarding', 'role-selection']
        if (inTabsGroup) {
          // Fresh user trying to access main app - send to start
          console.log('Fresh user trying to access main app, redirecting to onboarding start')
          targetRoute = "/"
        } else if (inAuthGroup && !onboardingRoutes.includes(currentRoute)) {
          // Fresh user in auth flow without completing onboarding
          console.log('Fresh user in auth flow without onboarding, redirecting to start')
          targetRoute = "/"
        }
      }

      // Navigate if needed and prevent unnecessary navigation
      if (targetRoute && targetRoute !== currentRoute && !hasNavigated.current) {
        console.log(`🔄 Navigating from ${currentRoute} to ${targetRoute}`)
        hasNavigated.current = true
        
        // Use requestAnimationFrame to ensure navigation happens outside render
        requestAnimationFrame(() => {
          router.replace(targetRoute as any)
        })
      }
    }

    performNavigation()
  }, [navigationReady, isAuthenticated, onboardingCompleted, segments, authStateChanged])

  // Reset navigation flag when route actually changes
  useEffect(() => {
    hasNavigated.current = false
  }, [segments])

  if (isLoading || !navigationReady) {
    return <LoadingScreen />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  )
}