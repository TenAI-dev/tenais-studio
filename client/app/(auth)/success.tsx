// success.tsx
"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../constants/Colors"
import { storage, StorageKeys } from "../../lib/storage"
import { useAuth } from "../../contexts/AuthContext"
import supabase from "@/lib/supabase"

const SuccessScreen = () => {
  const router = useRouter()
  const { setIsAuthenticated } = useAuth()

  const handleProceed = async () => {
    try {
      // Mark user as authenticated in storage
      await storage.setItem(StorageKeys.IS_AUTHENTICATED, true)
      
      // Get user data from Supabase and store locally
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await storage.setItem(StorageKeys.USER_DATA, {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || ''
        })
      }
      
      // Update auth context
      setIsAuthenticated(true)
      
      console.log("✅ User fully authenticated, proceeding to main app")
      
      // Navigate to main app
      router.replace("/(tabs)")
    } catch (error) {
      console.error("Error in success screen:", error)
      // Still proceed to main app even if there's an error
      router.replace("/(tabs)")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={120} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Your Account has Created Successfully</Text>
        <Text style={styles.subtitle}>Your account is verified, let's get started!</Text>
      </View>
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.darkText,
  },
  subtitle: {
    fontSize: 16,
    color: "#616161",
    textAlign: "center",
    marginTop: 10,
  },
  proceedButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default SuccessScreen