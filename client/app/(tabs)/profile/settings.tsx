"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"

import { supabase } from "../../../lib/supabase"
import { Colors } from "../../../constants/Colors"
import SettingsItem from "../../../components/SettingsItem"
import LogoutModal from "../../../components/LogoutModal"

const SettingsScreen = () => {
  const router = useRouter()
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert("Logout Error", error.message)
    } else {
      // Redirect to the very first screen of the app
      router.replace("/")
    }
    setLogoutModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SettingsItem icon="person-outline" text="Personal Information" onPress={() => router.push("/profile/settings/personal-info")} />
        <SettingsItem
          icon="notifications-outline"
          text="Notifications"
          onPress={() => router.push("/profile/settings/notifications")}

        />
        <SettingsItem icon="options-outline" text="General" onPress={() => router.push("/profile/settings/general")} />
        <SettingsItem icon="body-outline" text="Accessibility" onPress={() => router.push("/profile/settings/accessibility")} />
        <SettingsItem icon="shield-checkmark-outline" text="Security" onPress={() => router.push("/profile/settings/security")} />

        <View style={styles.divider} />

        <SettingsItem icon="help-circle-outline" text="Help Center" onPress={() => router.push("/profile/settings/help-center")} />
        <SettingsItem icon="chatbubble-ellipses-outline" text="Contact Support" onPress={() => router.push("/profile/settings/contact")} />
        <SettingsItem icon="document-text-outline" text="Legal Support" onPress={() => router.push("/profile/settings/legal-support")} />

        <View style={styles.divider} />

        <SettingsItem icon="color-palette-outline" text="Themes" onPress={() => {}} />
        <SettingsItem icon="information-circle-outline" text="About Studio" onPress={() => {}} />
        <SettingsItem icon="log-out-outline" text="Logout" onPress={() => setLogoutModalVisible(true)} isLogout />
      </ScrollView>
      <LogoutModal
        isVisible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 15,
  },
})

export default SettingsScreen
