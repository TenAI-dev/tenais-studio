// components/DebugScreen.tsx - For development only
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../contexts/AuthContext'
import { storage, StorageKeys } from '../lib/storage'
import { Colors } from '../constants/Colors'
import supabase from '../lib/supabase'

const DebugScreen = () => {
  const { 
    isAuthenticated, 
    onboardingCompleted, 
    resetOnboarding,
    logout 
  } = useAuth()

  const showStorageState = async () => {
    try {
      const authStatus = await storage.getItem(StorageKeys.IS_AUTHENTICATED)
      const onboardingStatus = await storage.getItem(StorageKeys.ONBOARDING_COMPLETED)
      const userRole = await storage.getItem(StorageKeys.USER_ROLE)
      const userLanguage = await storage.getItem(StorageKeys.USER_LANGUAGE)
      const userData = await storage.getItem(StorageKeys.USER_DATA)
      
      const { data: { session } } = await supabase.auth.getSession()
      
      Alert.alert(
        "Current State",
        `
Auth Context:
- isAuthenticated: ${isAuthenticated}
- onboardingCompleted: ${onboardingCompleted}

AsyncStorage:
- IS_AUTHENTICATED: ${authStatus}
- ONBOARDING_COMPLETED: ${onboardingStatus}
- USER_ROLE: ${userRole}
- USER_LANGUAGE: ${userLanguage}
- USER_DATA: ${userData ? 'Set' : 'Not Set'}

Supabase:
- Has Session: ${!!session}
- User ID: ${session?.user?.id || 'None'}
        `,
        [{ text: "OK" }]
      )
    } catch (error) {
      Alert.alert("Error", `Failed to get state: ${error}`)
    }
  }

  const clearStorage = async () => {
    try {
      await storage.clearAll()
      Alert.alert("Success", "All storage cleared!")
    } catch (error) {
      Alert.alert("Error", `Failed to clear storage: ${error}`)
    }
  }

  const resetToFreshUser = async () => {
    Alert.alert(
      "Reset to Fresh User",
      "This will sign out and clear all data. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: async () => {
            await resetOnboarding()
            Alert.alert("Reset Complete", "App will restart as fresh user")
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🔧 Debug Tools</Text>
        <Text style={styles.warning}>⚠️ Development Only</Text>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Current Status:</Text>
          <Text style={styles.statusText}>
            • Authenticated: {isAuthenticated ? '✅' : '❌'}
          </Text>
          <Text style={styles.statusText}>
            • Onboarding Complete: {onboardingCompleted ? '✅' : '❌'}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={showStorageState}>
          <Text style={styles.buttonText}>📊 Show Full State</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={clearStorage}>
          <Text style={styles.buttonText}>🗑️ Clear AsyncStorage Only</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetToFreshUser}>
          <Text style={styles.buttonText}>🔄 Reset to Fresh User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
          <Text style={[styles.buttonText, styles.logoutText]}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  warning: {
    fontSize: 14,
    color: '#FF6B00',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  statusContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.primaryOrange,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
  },
})

export default DebugScreen