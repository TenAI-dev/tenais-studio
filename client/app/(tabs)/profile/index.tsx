"use client"

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useLayoutEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image } from "react-native"
import { useNavigation, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../../constants/Colors"
import { useAuth } from "../../../contexts/AuthContext"
import { profileService } from "../../../lib/profileService"
import LogoutModal from "../../../components/LogoutModal"
import SettingsItem from "../../../components/SettingsItem"
import StatCard from "../../../components/StatCard"

const ProfileScreen = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const { logout } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch user profile data
  useEffect(() => {
    fetchProfile()
  }, [])

   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}          // push it away from the edge
          onPress={() => router.push('/profile/settings')}
          hitSlop={8}                          // easier to tap
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={Colors.darkText}            // or any colour you prefer
          />
        </TouchableOpacity>
      ),
    })
  }, [navigation, router])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const userProfile = await profileService.getCurrentUserProfile()
      setProfile(userProfile)
      console.log('✅ Profile loaded:', userProfile)
    } catch (error) {
      console.error('❌ Error loading profile:', error)
      setError(error.message)
      Alert.alert(
        'Error Loading Profile',
        'Unable to load your profile data. Please try again.',
        [
          { text: 'Retry', onPress: fetchProfile },
          { text: 'Cancel', style: 'cancel' }
        ]
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    if (isLoggingOut) return
    
    try {
      setIsLoggingOut(true)
      console.log('🔓 Starting logout process...')
      
      // Perform logout which clears storage and updates context
      await logout()
      setShowLogoutModal(false)
      
      console.log('🔄 Logout completed, navigating to signin')
      
      // Simple navigation without stack manipulation
      setTimeout(() => {
        router.replace("/signin")
      }, 200)
      
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const formatRole = (role: string) => {
    if (!role) return 'User'
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primaryOrange} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error && !profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#DC3545" />
          <Text style={styles.errorText}>Failed to load profile</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProfile}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            {profile?.profile_picture_url ? (
              <Image 
                source={{ uri: profile.profile_picture_url }} 
                style={styles.profileImage}
              />
            ) : (
              <Ionicons name="person-circle" size={100} color={Colors.primaryOrange} />
            )}
          </View>
          <Text style={styles.name}>{profile?.name || 'Unknown User'}</Text>
          <Text style={styles.email}>{profile?.email || 'No email'}</Text>
          <Text style={styles.role}>{formatRole(profile?.role)}</Text>
          
          {profile?.bio && (
            <Text style={styles.bio}>{profile.bio}</Text>
          )}
          
          {(profile?.city || profile?.state || profile?.country) && (
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#6C757D" />
              <Text style={styles.location}>
                {[profile?.city, profile?.state, profile?.country]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </View>
          )}
          
          <Text style={styles.memberSince}>
            Member since {formatDate(profile?.created_at)}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatCard 
            value={profile?.hackathons_participated?.toString() || "0"} 
            label="Hackathons" 
          />
          <StatCard 
            value={profile?.hackathons_won?.toString() || "0"} 
            label="Wins" 
          />
          <StatCard 
            value={
              profile?.role === 'coordinator' 
                ? profile?.hackathons_organized?.toString() || "0"
                : profile?.role === 'judge'
                ? profile?.hackathons_judged?.toString() || "0" 
                : "0"
            } 
            label={
              profile?.role === 'coordinator' 
                ? "Organized"
                : profile?.role === 'judge'
                ? "Judged"
                : "Teams"
            } 
          />
        </View>

        {/* Skills & Interests (for participants) */}
        {profile?.role === 'participant' && (profile?.skills || profile?.interests) && (
          <View style={styles.skillsContainer}>
            {profile?.skills && (
              <View style={styles.skillsSection}>
                <Text style={styles.skillsTitle}>Skills</Text>
                <View style={styles.tagsContainer}>
                  {profile.skills.slice(0, 6).map((skill: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{skill}</Text>
                    </View>
                  ))}
                  {profile.skills.length > 6 && (
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>+{profile.skills.length - 6} more</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <LogoutModal
        isVisible={showLogoutModal}
        onClose={() => !isLoggingOut && setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6C757D",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#DC3545",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: Colors.primaryOrange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.darkText,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#6C757D",
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: Colors.primaryOrange,
    fontWeight: "bold",
    backgroundColor: "#FFF4E6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#6C757D",
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 12,
    color: "#9E9E9E",
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  skillsContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  skillsSection: {
    marginBottom: 15,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkText,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
  },
  settingsContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.darkText,
    marginBottom: 10,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 10,
  },
})

export default ProfileScreen