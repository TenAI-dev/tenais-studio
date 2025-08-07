"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter, useNavigation } from "expo-router"
import { Colors } from "../../../../constants/Colors"

const NotificationToggle = ({ title, description, value, onValueChange }: any) => (
  <View style={styles.toggleContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.toggleTitle}>{title}</Text>
      <Text style={styles.toggleDescription}>{description}</Text>
    </View>
    <Switch
      trackColor={{ false: "#767577", true: Colors.primaryOrange }}
      thumbColor={value ? Colors.white : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
    />
  </View>
)

const NotificationsScreen = () => {
  const [appNotifications, setAppNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const router = useRouter()
  const navigation = useNavigation()

  const handleSave = () => {
    console.log("🔔 Saved preferences:", {
      app: appNotifications,
      email: emailNotifications,
    })
    // Optional: Save to backend or local storage
    router.back() // Go back after saving
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={{ marginRight: 16 }}>
          <Text style={{ color: Colors.primaryOrange, fontWeight: "bold" }}>
            Save
          </Text>
        </TouchableOpacity>
      ),
      title: "Notifications",
    })
  }, [navigation, appNotifications, emailNotifications])

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Notifications</Text>
        <NotificationToggle
          title="Enable App Notifications"
          description="Receive notifications from the app when there are updates or announcements."
          value={appNotifications}
          onValueChange={setAppNotifications}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Notifications</Text>
        <NotificationToggle
          title="Enable Email Notifications"
          description="Get important updates and announcements via email."
          value={emailNotifications}
          onValueChange={setEmailNotifications}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#6C757D",
    marginBottom: 10,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkText,
  },
  toggleDescription: {
    fontSize: 14,
    color: "#6C757D",
    marginTop: 4,
  },
})

export default NotificationsScreen
