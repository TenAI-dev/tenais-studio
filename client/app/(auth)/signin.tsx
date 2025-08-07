// Alternative signin.tsx with choice between OTP and Magic Link
"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import * as Linking from "expo-linking"
import supabase from "@/lib/supabase"
import { storage, StorageKeys } from "../../lib/storage"
import { Colors } from "../../constants/Colors"
import AuthInput from "../../components/AuthInput"

const SignInWithChoiceScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<"otp" | "magic">("otp")

  // Listen for magic link deep links
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      console.log("Deep link received:", event.url)
      
      // Check if it's a magic link authentication
      if (event.url.includes("#access_token=")) {
        try {
          const { data, error } = await supabase.auth.getSession()
          if (data.session && !error) {
            // User authenticated via magic link
            await storage.setItem(StorageKeys.IS_AUTHENTICATED, true)
            router.replace("/(tabs)")
          }
        } catch (error) {
          console.error("Magic link auth error:", error)
        }
      }
    }

    const subscription = Linking.addEventListener("url", handleDeepLink)
    return () => subscription.remove()
  }, [])

  const handleSignIn = async () => {
    if (!email) {
      Alert.alert("Error", "Email is required")
      return
    }

    if (isLoading) return
    setIsLoading(true)

    try {
      if (authMethod === "otp") {
        // Send OTP
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
            emailRedirectTo: undefined, // Prevent magic link
          },
        })

        if (error) {
          Alert.alert("Error", error.message)
          return
        }

        // Navigate to OTP screen
        requestAnimationFrame(() => {
          router.push({
            pathname: "/otp",
            params: { email, isSignup: "false" },
          })
        })
      } else {
        // Send Magic Link
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
            emailRedirectTo: Linking.createURL("/(tabs)"), // Redirect to main app
          },
        })

        if (error) {
          Alert.alert("Error", error.message)
          return
        }

        Alert.alert(
          "Magic Link Sent!",
          "Please check your email and click the magic link to sign in.",
          [{ text: "OK" }]
        )
      }

    } catch (error: any) {
      console.error("Login error:", error)
      Alert.alert("Error", "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your email to log in to your account</Text>

        <AuthInput 
          label="Enter your email" 
          icon="mail-outline" 
          value={email} 
          onChangeText={setEmail} 
        />

        {/* Auth Method Selection */}
        <View style={styles.methodContainer}>
          <TouchableOpacity
            style={[styles.methodButton, authMethod === "otp" && styles.selectedMethod]}
            onPress={() => setAuthMethod("otp")}
          >
            <Ionicons name="shield-checkmark-outline" size={24} color={authMethod === "otp" ? Colors.primaryOrange : "#666"} />
            <View style={styles.methodText}>
              <Text style={[styles.methodTitle, authMethod === "otp" && styles.selectedMethodText]}>
                6-Digit Code
              </Text>
              <Text style={styles.methodDescription}>Enter code sent to your email</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.signInButton, isLoading && styles.disabledButton]} 
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.signInButtonText}>
            {isLoading ? "Sending..." : `Send ${authMethod === "otp" ? "Code" : "Magic Link"}`}
          </Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>New User? </Text>
          <TouchableOpacity onPress={() => {
            requestAnimationFrame(() => {
              router.push("/signup")
            })
          }}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.darkText,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  methodContainer: {
    marginVertical: 20,
  },
  methodButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedMethod: {
    borderColor: Colors.primaryOrange,
    backgroundColor: "#FFF4E6",
  },
  methodText: {
    marginLeft: 12,
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkText,
  },
  selectedMethodText: {
    color: Colors.primaryOrange,
  },
  methodDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  signInButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
  },
  signInButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#FDBA74",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  signUpText: {
    color: Colors.darkText,
  },
  signUpLink: {
    color: Colors.primaryOrange,
    fontWeight: "bold",
  },
})

export default SignInWithChoiceScreen