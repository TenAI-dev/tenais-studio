// signup.tsx
"use client"

import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import axios from "axios"
import supabase from "@/lib/supabase"
import { Colors } from "../../constants/Colors"
import AuthInput from "../../components/AuthInput"
import SocialButton from "../../components/SocialButton"

const googleLogo = require("../../assets/images/google-logo.png")
const facebookLogo = require("../../assets/images/facebook-logo.png")
const githubLogo = require("../../assets/images/github-logo.png")

const SignUpScreen = () => {
  const router = useRouter()
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      if (event.url) {
        console.log("🔁 Deep link URL received:", event.url)
      }
    }

    const subscription = Linking.addEventListener("url", handleDeepLink)
    return () => subscription.remove()
  }, [])

  const handleCreateAccount = async () => {
    if (!email || !name) {
      Alert.alert("Error", "Please enter both name and email")
      return
    }

    if (isLoading) return

    setIsLoading(true)
    try {
      console.log("Starting signup process for:", email)
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { 
            name: name.trim(),
            full_name: name.trim()
          },
        },
      })

      if (error) {
        console.error("Signup error:", error.message)
        if (error.message.includes("User already registered")) {
          Alert.alert("Account exists", "This email is already registered. Please sign in instead.")
        } else {
          Alert.alert("Error", error.message)
        }
        return
      }

      console.log("✅ OTP sent successfully")
      
      // Use requestAnimationFrame to ensure navigation happens outside render cycle
      requestAnimationFrame(() => {
        router.push({ 
          pathname: "/otp", 
          params: { 
            email: email.trim(), 
            name: name.trim(), 
            isSignup: "true" 
          } 
        })
      })

    } catch (error: any) {
      console.error("Signup error:", error)
      Alert.alert("Error", "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: string) => {
    try {
      const redirectTo = Linking.createURL("/auth/callback")
      const response = await axios.get(`${API_BASE_URL}/auth/oauth`, { 
        params: { provider, redirectTo } 
      })
      
      const { url } = response.data
      if (url && (await Linking.canOpenURL(url))) {
        await Linking.openURL(url)
      }
    } catch (error: any) {
      console.error("OAuth error:", error)
      Alert.alert("Error", "OAuth login failed. Please try again.")
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <AuthInput 
          label="Enter your name" 
          icon="person-outline" 
          value={name} 
          onChangeText={setName} 
        />
        <AuthInput 
          label="Enter your email" 
          icon="mail-outline" 
          value={email} 
          onChangeText={setEmail} 
        />

        <TouchableOpacity 
          style={[styles.createAccountButton, isLoading && styles.disabledButton]} 
          onPress={handleCreateAccount}
          disabled={isLoading}
        >
          <Text style={styles.createAccountButtonText}>
            {isLoading ? "Creating Account..." : "Continue with Email"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <SocialButton 
          logo={googleLogo} 
          text="Continue with Google" 
          onPress={() => handleOAuthLogin("google")} 
        />
        <SocialButton 
          logo={facebookLogo} 
          text="Continue with Facebook" 
          onPress={() => handleOAuthLogin("facebook")} 
        />
        <SocialButton 
          logo={githubLogo} 
          text="Continue with GitHub" 
          onPress={() => handleOAuthLogin("github")} 
        />

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.white 
  },
  scrollContainer: { 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 30 
  },
  createAccountButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 20,
  },
  createAccountButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#FDBA74",
  },
  orText: { 
    textAlign: "center", 
    color: "#9E9E9E", 
    marginVertical: 20 
  },
  signInContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 30 
  },
  signInText: { 
    color: Colors.darkText 
  },
  signInLink: { 
    color: Colors.primaryOrange, 
    fontWeight: "bold" 
  },
})

export default SignUpScreen