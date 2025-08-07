// role-selection.tsx
"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import RoleCard from "../components/RoleCard"
import { Colors } from "../constants/Colors"
import { storage, StorageKeys } from "../lib/storage"
import { useAuth } from "../contexts/AuthContext"
import Participant from "../assets/images/participant.png"
import HackathonCoordinator from "../assets/images/coordinator.png"
import Judge from "../assets/images/judge.png"

const roles = [
  {
    id: "participant",
    title: "Participant",
    description: "Start your journey from taking part into hackathons and inviting friends to innovate great ideas",
    image: Participant,
    colors: ["#6D82E5", "#4A62D4"],
  },
  {
    id: "coordinator",
    title: "Hackathon Coordinator",
    description: "Start your journey from hosting hackathons and invite others to collaborate as well",
    image: HackathonCoordinator,
    colors: ["#FF8C42", "#FF6B00"],
  },
  {
    id: "judge",
    title: "Judge",
    description: "Start your journey from taking part into hackathons and inviting friends to innovate great ideas",
    image: Judge,
    colors: ["#6D82E5", "#4A62D4"],
  },
]

const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setOnboardingCompleted, onboardingCompleted, isAuthenticated } = useAuth()

  // Protection: Check if user should be on this screen
  useEffect(() => {
    const checkAccess = async () => {
      try {
        // If user is authenticated, they shouldn't be here
        if (isAuthenticated) {
          console.log("🚫 Authenticated user trying to access role selection, redirecting to main app")
          router.replace("/(tabs)")
          return
        }

        // If onboarding is already completed, they shouldn't be here
        if (onboardingCompleted) {
          console.log("🚫 User with completed onboarding trying to access role selection, redirecting to signin")
          router.replace("/signin")
          return
        }

        // Double-check storage directly in case context is out of sync
        const storageOnboardingStatus = await storage.getItem(StorageKeys.ONBOARDING_COMPLETED)
        const storageAuthStatus = await storage.getItem(StorageKeys.IS_AUTHENTICATED)
        
        if (storageAuthStatus) {
          console.log("🚫 Storage shows user is authenticated, redirecting to main app")
          router.replace("/(tabs)")
          return
        }

        if (storageOnboardingStatus) {
          console.log("🚫 Storage shows onboarding completed, redirecting to signin")
          router.replace("/signin")
          return
        }

        console.log("✅ Fresh user - allowing access to role selection")
      } catch (error) {
        console.error("Error checking role selection access:", error)
        // If there's an error, allow access (fail safe)
      }
    }

    checkAccess()
  }, [isAuthenticated, onboardingCompleted, router])

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleContinue = async () => {
    if (selectedRole && selectedLanguage && !isLoading) {
      setIsLoading(true)
      try {
        // Store user preferences
        await storage.setItem(StorageKeys.USER_ROLE, selectedRole)
        await storage.setItem(StorageKeys.USER_LANGUAGE, selectedLanguage)
        await storage.setItem(StorageKeys.ONBOARDING_COMPLETED, true)
        
        // Update context
        setOnboardingCompleted(true)
        
        console.log("Role selection completed, navigating to signup...")
        
        // Use requestAnimationFrame to ensure navigation happens outside render cycle
        requestAnimationFrame(() => {
          router.push("/(auth)/auth-options")
        })
      } catch (error) {
        console.error("Error saving user preferences:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's Get Started With Your Role!</Text>
        <View style={styles.cardContainer}>
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              title={role.title}
              description={role.description}
              image={role.image}
              colors={role.colors}
              isSelected={selectedRole === role.id}
              onPress={() => handleSelectRole(role.id)}
            />
          ))}
        </View>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={[styles.languageButton, selectedLanguage === "English" && styles.selectedLanguageButton]}
            onPress={() => setSelectedLanguage("English")}
          >
            <Text style={[styles.languageText, selectedLanguage === "English" && styles.selectedLanguageText]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.languageButton, selectedLanguage === "Marathi" && styles.selectedLanguageButton]}
            onPress={() => setSelectedLanguage("Marathi")}
          >
            <Text style={[styles.languageText, selectedLanguage === "Marathi" && styles.selectedLanguageText]}>
              Marathi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.languageButton, selectedLanguage === "Hindi" && styles.selectedLanguageButton]}
            onPress={() => setSelectedLanguage("Hindi")}
          >
            <Text style={[styles.languageText, selectedLanguage === "Hindi" && styles.selectedLanguageText]}>
              Hindi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.continueButton, 
              (!selectedRole || !selectedLanguage || isLoading) && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={!selectedRole || !selectedLanguage || isLoading}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? "Processing..." : "Continue"}
            </Text>
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
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    color: Colors.darkText,
  },
  cardContainer: {
    // This will now grow naturally
  },
  languageContainer: {
    marginTop: "auto", // Pushes this section to the bottom
    paddingTop: 20, // Ensures space between cards and buttons
    paddingBottom: 20,
  },
  languageButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  selectedLanguageButton: {
    borderColor: Colors.primaryOrange,
    backgroundColor: "#FFF4E6",
  },
  languageText: {
    fontSize: 16,
    color: Colors.darkText,
  },
  selectedLanguageText: {
    color: Colors.primaryOrange,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#FDBA74",
  },
})

export default RoleSelectionScreen