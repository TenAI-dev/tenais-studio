// otp.tsx
"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useRef, useState } from "react"
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field"
import supabase from "@/lib/supabase"
import { storage, StorageKeys } from "../../lib/storage"
import { useAuth } from "../../contexts/AuthContext"
import { Colors } from "../../constants/Colors"

const CELL_COUNT = 6
const OTP_EXPIRY = 60 

const OTPScreen = () => {
  const router = useRouter()
  const { email, name, isSignup } = useLocalSearchParams()
  const isSignupFlow = isSignup === "true"
  const { setIsAuthenticated } = useAuth()

  const [value, setValue] = useState("")
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue })

  const [errorMessage, setErrorMessage] = useState("")
  const [infoMessage, setInfoMessage] = useState("")
  const [timer, setTimer] = useState(OTP_EXPIRY)
  const [isVerifying, setIsVerifying] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | number | null>(null)

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current as NodeJS.Timeout)
  }, [])

  const startTimer = () => {
    setTimer(OTP_EXPIRY)
    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const createUserProfile = async (user: any) => {
    try {
      // Get stored role and language from local storage
      const userRole = await storage.getItem(StorageKeys.USER_ROLE)
      const userLanguage = await storage.getItem(StorageKeys.USER_LANGUAGE)
      
      console.log("Creating user profile with:", { 
        authId: user.id, 
        email: user.email, 
        name: name?.toString() || user.user_metadata?.name || user.email,
        role: userRole,
        language: userLanguage 
      })

      // Use the database function to create user profile
      const { data, error } = await supabase.rpc('create_user_profile', {
        p_auth_id: user.id,
        p_email: user.email,
        p_name: name?.toString() || user.user_metadata?.name || user.email,
        p_role: userRole,
        p_language: userLanguage || 'English'
      })

      if (error) {
        console.error("❌ Database function error:", error)
        throw error
      }

      if (data && data.error) {
        console.error("❌ User creation function returned error:", data.error)
        throw new Error(data.error)
      }

      console.log("✅ User profile created successfully:", data)
      return data

    } catch (error) {
      console.error("❌ User profile creation failed:", error)
      
      // Try direct insert as fallback
      try {
        console.log("Trying direct insert as fallback...")
        const userRole = await storage.getItem(StorageKeys.USER_ROLE)
        const userLanguage = await storage.getItem(StorageKeys.USER_LANGUAGE)
        
        const { data: directData, error: directError } = await supabase
          .from('users')
          .insert([{
            auth_id: user.id,
            email: user.email,
            name: name?.toString() || user.user_metadata?.name || user.email,
            role: userRole,
            language: userLanguage || 'English',
            email_verified: true
          }])
          .select()
          .single()

        if (directError) {
          console.error("❌ Direct insert also failed:", directError)
          // Don't throw here - let the user proceed
          return null
        }

        console.log("✅ Direct insert succeeded:", directData)
        return directData
      } catch (fallbackError) {
        console.error("❌ Fallback insert failed:", fallbackError)
        return null
      }
    }
  }

  const handleVerifyOTP = async (code: string) => {
    if (!email || code.length !== 6 || isVerifying) {
      setErrorMessage("Please enter the full 6-digit code.")
      return
    }

    setIsVerifying(true)
    setErrorMessage("")

    try {
      console.log("Verifying OTP for:", isSignupFlow ? "signup" : "signin")

      const { data, error } = await supabase.auth.verifyOtp({
        email: email.toString(),
        token: code,
        type: isSignupFlow ? "signup" : "email", // Use 'email' for signin, 'signup' for signup
      })

      if (error) {
        console.log("❌ OTP Verification Error:", error.message)
        setErrorMessage("Invalid or expired OTP. Please try again.")
        return
      }

      console.log("✅ OTP Verified", data)

      // For signup flow, create user profile
      if (isSignupFlow && data.user) {
        await createUserProfile(data.user)
        // For signup, navigate to success page
        requestAnimationFrame(() => {
          router.push("/success")
        })
      } else if (!isSignupFlow && data.user) {
        // For signin flow, mark as authenticated and go to main app
        try {
          console.log("📝 Updating user authentication state...")
          
          // Update last login in user profile
          await supabase
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('auth_id', data.user.id)
          
          // Mark as authenticated in storage
          await storage.setItem(StorageKeys.IS_AUTHENTICATED, true)
          
          // Store user data in storage
          await storage.setItem(StorageKeys.USER_DATA, {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || ''
          })
          
          // Update auth context - THIS IS CRUCIAL
          setIsAuthenticated(true)
          
          console.log("✅ Authentication state updated, forcing navigation to main app")
          
          // Force navigation by clearing stack and replacing
          // This prevents the root layout from interfering
          setTimeout(() => {
            console.log("🔄 Force navigating to main app")
            try {
              router.dismissAll?.() // Clear navigation stack if method exists
            } catch (e) {
              console.log("dismissAll not available, using replace")
            }
            router.replace("/(tabs)")
          }, 300) // Shorter delay but still let context update
          
        } catch (updateError) {
          console.error("Error updating authentication state:", updateError)
          // Still proceed to main app even if some updates fail
          await storage.setItem(StorageKeys.IS_AUTHENTICATED, true)
          setIsAuthenticated(true)
          
          setTimeout(() => {
            router.replace("/(tabs)")
          }, 300)
        }
      }

    } catch (error: any) {
      console.error("Verification error:", error)
      setErrorMessage("Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    if (timer > 0 || !email) return
    setInfoMessage("")
    setErrorMessage("")

    try {
      if (isSignupFlow) {
        // For signup, resend with user creation option
        const { error } = await supabase.auth.signInWithOtp({
          email: email.toString(),
          options: {
            shouldCreateUser: true,
            data: { name: name?.toString() || "" },
          },
        })

        if (error) {
          setErrorMessage("Failed to resend code.")
        } else {
          setInfoMessage("OTP resent to your email.")
          startTimer()
        }
      } else {
        // For signin, resend for existing user
        const { error } = await supabase.auth.signInWithOtp({
          email: email.toString(),
          options: {
            shouldCreateUser: false,
            emailRedirectTo: undefined, // Prevent magic link
          },
        })

        if (error) {
          setErrorMessage("Failed to resend code.")
        } else {
          setInfoMessage("OTP resent to your email.")
          startTimer()
        }
      }
    } catch (error) {
      setErrorMessage("Failed to resend code.")
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.content}>
        <Text style={styles.heading}>
          {isSignupFlow ? "Verify Your Account" : "Sign In Verification"}
        </Text>
        <Text style={styles.subText}>
          Please enter the 6–digit code sent to {email}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={(code) => {
            setValue(code)
            if (code.length === 6) {
              handleVerifyOTP(code) 
            }
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          editable={!isVerifying}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        {errorMessage !== "" && <Text style={styles.errorText}>{errorMessage}</Text>}
        {infoMessage !== "" && <Text style={styles.infoText}>{infoMessage}</Text>}
        {isVerifying && <Text style={styles.infoText}>Verifying...</Text>}

        <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
          <Text style={[styles.resendText, timer > 0 && styles.disabledResend]}>
            {timer > 0 ? `Resend code in ${timer}s` : "Resend Code?"}
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.darkText,
    marginBottom: 10,
    textAlign: "center",
  },
  subText: {
    color: "#616161",
    textAlign: "center",
    marginBottom: 30,
  },
  codeFieldRoot: {
    width: "100%",
    marginBottom: 20,
    justifyContent: "center",
  },
  cell: {
    width: 50,
    height: 60,
    lineHeight: 60,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 6,
  },
  focusCell: {
    borderColor: Colors.primaryOrange,
  },
  resendText: {
    marginTop: 20,
    fontWeight: "bold",
    color: Colors.primaryOrange,
  },
  disabledResend: {
    color: "#bcbcbc",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  infoText: {
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
})

export default OTPScreen