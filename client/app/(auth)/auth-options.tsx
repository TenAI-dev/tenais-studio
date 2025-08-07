"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import LinearGradient from "react-native-linear-gradient"
import { useAuth } from "@/contexts/AuthContext"
import supabase from "@/lib/supabase"

const AuthOptionsScreen = () => {
const [loading, setLoading] = useState(true)
const router = useRouter()
const { setAsUser } = useAuth()

useEffect(() => {
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      setAsUser()
      router.replace("/(tabs)")
    } else {
      setLoading(false)
    }
  }

  checkSession()
}, [router, setAsUser])

const handleSignUp = () => {
  setAsUser()
  router.push("/(auth)/signup")
}

const handleSignIn = () => {
  setAsUser()
  router.push("/(auth)/signin")
}

if (loading) {
  return (
    <LinearGradient colors={["#4F81C7", "#153D77"]} style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="white" />
    </LinearGradient>
  )
}

return (
  <LinearGradient colors={["#4F81C7", "#153D77"]} style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Studio</Text>
        <Text style={styles.subtitle}>Finding and connecting with trusted local professionals around you.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
          <Text style={styles.primaryButtonText}>Sign up to Studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignIn}>
          <Text style={styles.secondaryButtonText}>Sign in to Studio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </LinearGradient>
)
}

const styles = StyleSheet.create({
loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
container: {
  flex: 1,
},
safeArea: {
  flex: 1,
  justifyContent: "center", // Center the content vertically
},
contentContainer: {
  alignItems: "center",
  paddingHorizontal: 40,
  marginBottom: 60, // Add space between text and buttons
},
title: {
  fontSize: 56,
  fontWeight: "bold",
  color: "white",
},
subtitle: {
  fontSize: 18,
  color: "rgba(255, 255, 255, 0.9)",
  textAlign: "center",
  marginTop: 16,
  lineHeight: 26,
},
buttonContainer: {
  paddingHorizontal: 24,
  paddingBottom: 40, // Adjust bottom padding
},
primaryButton: {
  backgroundColor: "white",
  borderRadius: 50,
  paddingVertical: 20,
  alignItems: "center",
  marginBottom: 16,
},
primaryButtonText: {
  color: "#2563EB",
  fontSize: 16,
  fontWeight: "600",
},
secondaryButton: {
  borderColor: "rgba(255, 255, 255, 0.8)",
  borderWidth: 1,
  borderRadius: 50,
  paddingVertical: 20,
  alignItems: "center",
},
secondaryButtonText: {
  color: "white",
  fontSize: 16,
  fontWeight: "600",
},
})

export default AuthOptionsScreen
