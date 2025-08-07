// utils/sessionUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage'
import supabase from '../lib/supabase'

export const sessionUtils = {
  // Check current session status
  checkSessionStatus: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session check error:', error)
        return { isValid: false, error: error.message }
      }

      if (!session) {
        return { isValid: false, reason: 'No session found' }
      }

      // Check if session is expired
      const now = Math.floor(Date.now() / 1000)
      const isExpired = session.expires_at && session.expires_at < now

      return {
        isValid: !isExpired,
        session,
        isExpired,
        expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : null,
        userId: session.user?.id,
        email: session.user?.email
      }
    } catch (error) {
      console.error('Error checking session:', error)
      return { isValid: false, error: error.message }
    }
  },

  // Refresh session if needed
  refreshSessionIfNeeded: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      
      if (error) {
        console.error('Session refresh error:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ Session refreshed successfully')
      return { success: true, session }
    } catch (error) {
      console.error('Error refreshing session:', error)
      return { success: false, error: error.message }
    }
  },

  // Get all Supabase-related storage keys
  getSupabaseStorageKeys: async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      const supabaseKeys = allKeys.filter(key => 
        key.includes('supabase') || 
        key.includes('auth') ||
        key.includes('sb-')
      )
      
      const values = {}
      for (const key of supabaseKeys) {
        values[key] = await AsyncStorage.getItem(key)
      }
      
      return values
    } catch (error) {
      console.error('Error getting storage keys:', error)
      return {}
    }
  },

  // Clear all authentication-related storage
  clearAuthStorage: async () => {
    try {
      // Get all keys first
      const allKeys = await AsyncStorage.getAllKeys()
      
      // Find auth-related keys
      const authKeys = allKeys.filter(key => 
        key.includes('supabase') || 
        key.includes('auth') ||
        key.includes('sb-') ||
        key.includes('onboarding') ||
        key.includes('user')
      )
      
      // Remove all auth keys
      await AsyncStorage.multiRemove(authKeys)
      
      console.log('🧹 Cleared auth storage keys:', authKeys)
      return { success: true, clearedKeys: authKeys }
    } catch (error) {
      console.error('Error clearing auth storage:', error)
      return { success: false, error: error.message }
    }
  },

  // Debug session information
  debugSessionInfo: async () => {
    try {
      console.log('🔍 === SESSION DEBUG INFO ===')
      
      // Current session
      const sessionStatus = await sessionUtils.checkSessionStatus()
      console.log('📱 Session Status:', sessionStatus)
      
      // Storage keys
      const storageKeys = await sessionUtils.getSupabaseStorageKeys()
      console.log('💾 Supabase Storage:', storageKeys)
      
      // User info
      const { data: { user } } = await supabase.auth.getUser()
      console.log('👤 Current User:', {
        id: user?.id,
        email: user?.email,
        metadata: user?.user_metadata
      })
      
      return {
        sessionStatus,
        storageKeys,
        user
      }
    } catch (error) {
      console.error('Error debugging session:', error)
      return { error: error.message }
    }
  }
}

// Make available globally for console debugging
if (typeof global !== 'undefined') {
  global.sessionUtils = sessionUtils
}

export default sessionUtils