"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Stack } from "expo-router"
import { Colors } from "../../../../constants/Colors"
import SettingsItem from "../../../../components/SettingsItem"
import SettingsToggleItem from "../../../../components/SettingsToggleItem"

const GeneralSettingsScreen = () => {
  const router = useRouter()
  
  // State for toggle settings
  const [autoSave, setAutoSave] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [crashReporting, setCrashReporting] = useState(true)
  const [backgroundRefresh, setBackgroundRefresh] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [hapticFeedback, setHapticFeedback] = useState(true)

  const handleLanguagePress = () => {
    // Navigate to language selection screen
    router.push("/profile/settings/general/language")
  }

  const handleStoragePress = () => {
    // Navigate to storage management screen
    router.push("/profile/settings/general/storage")
  }

  const handleDataUsagePress = () => {
    // Navigate to data usage screen
    router.push("/profile/settings/general/data-usage")
  }

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear the app cache? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: () => {
            // Implement cache clearing logic
            Alert.alert("Success", "Cache cleared successfully")
          }
        }
      ]
    )
  }

  const handleResetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "Are you sure you want to reset all settings to default? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: () => {
            // Reset all settings to default
            setAutoSave(true)
            setOfflineMode(false)
            setAnalytics(true)
            setCrashReporting(true)
            setBackgroundRefresh(true)
            setSoundEffects(true)
            setHapticFeedback(true)
            Alert.alert("Success", "Settings reset to default")
          }
        }
      ]
    )
  }

  return (
    <>
        <Stack.Screen options={{ title: "General Settings" }} />
        <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            {/* App Behavior */}
            <SettingsToggleItem
            icon="save-outline"
            text="Auto-save"
            description="Automatically save your work"
            value={autoSave}
            onValueChange={setAutoSave}
            />
            
            <SettingsToggleItem
            icon="cloud-offline-outline"
            text="Offline Mode"
            description="Enable offline functionality"
            value={offlineMode}
            onValueChange={setOfflineMode}
            />

            <SettingsToggleItem
            icon="refresh-outline"
            text="Background Refresh"
            description="Allow app to refresh in background"
            value={backgroundRefresh}
            onValueChange={setBackgroundRefresh}
            />

            <View style={styles.divider} />

            {/* Language & Region */}
            <SettingsItem 
            icon="language-outline" 
            text="Language" 
            onPress={handleLanguagePress}
            showArrow 
            />

            <View style={styles.divider} />

            {/* Data & Storage */}
            <SettingsItem 
            icon="server-outline" 
            text="Storage Management" 
            onPress={handleStoragePress}
            showArrow 
            />

            <SettingsItem 
            icon="bar-chart-outline" 
            text="Data Usage" 
            onPress={handleDataUsagePress}
            showArrow 
            />

            <SettingsItem 
            icon="trash-outline" 
            text="Clear Cache" 
            onPress={handleClearCache}
            />

            <View style={styles.divider} />

            {/* Privacy & Analytics */}
            <SettingsToggleItem
            icon="analytics-outline"
            text="Usage Analytics"
            description="Help improve the app by sharing usage data"
            value={analytics}
            onValueChange={setAnalytics}
            />

            <SettingsToggleItem
            icon="bug-outline"
            text="Crash Reporting"
            description="Automatically send crash reports"
            value={crashReporting}
            onValueChange={setCrashReporting}
            />

            <View style={styles.divider} />

            {/* User Experience */}
            <SettingsToggleItem
            icon="volume-high-outline"
            text="Sound Effects"
            description="Play sounds for app interactions"
            value={soundEffects}
            onValueChange={setSoundEffects}
            />

            <SettingsToggleItem
            icon="phone-portrait-outline"
            text="Haptic Feedback"
            description="Vibrate on touch interactions"
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
            />

            <View style={styles.divider} />

            {/* Reset Options */}
            <SettingsItem 
            icon="refresh-circle-outline" 
            text="Reset All Settings" 
            onPress={handleResetSettings}
            isDestructive
            />

        </ScrollView>
        </SafeAreaView>
    </>
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

export default GeneralSettingsScreen