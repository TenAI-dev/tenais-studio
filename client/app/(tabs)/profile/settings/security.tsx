"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../../../constants/Colors"
import SettingsToggleItem from "../../../../components/SettingsToggleItem"

const SecurityScreen = () => {
  const router = useRouter()
  
  // Authentication
  const [biometricAuth, setBiometricAuth] = useState(false)
  const [passcodeRequired, setPasscodeRequired] = useState(true)
  const [autoLock, setAutoLock] = useState(true)
  const [autoLockTime, setAutoLockTime] = useState("5 minutes")
  
  // Privacy
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [showLoginHistory, setShowLoginHistory] = useState(true)
  
  // Data Protection
  const [dataEncryption, setDataEncryption] = useState(true)
  const [secureBackup, setSecureBackup] = useState(true)
  const [remoteWipe, setRemoteWipe] = useState(false)

  const handleChangePassword = () => {
    Alert.alert(
      "Change Password",
      "You will be redirected to change your password",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () => {
            // Navigate to change password screen or open modal
            Alert.alert("Success", "Password change process initiated")
          }
        }
      ]
    )
  }

  const handleSetupBiometric = () => {
    Alert.alert(
      "Biometric Authentication",
      "Would you like to enable biometric authentication?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Enable",
          onPress: () => {
            setBiometricAuth(true)
            Alert.alert("Success", "Biometric authentication enabled")
          }
        }
      ]
    )
  }

  const handleTwoFactorSetup = () => {
    Alert.alert(
      "Two-Factor Authentication",
      "Setting up 2FA will add an extra layer of security to your account",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Setup",
          onPress: () => {
            setTwoFactorAuth(true)
            Alert.alert("Success", "Two-factor authentication setup completed")
          }
        }
      ]
    )
  }

  const handleAutoLockTimeChange = () => {
    Alert.alert(
      "Auto-Lock Time",
      "Choose when the app should automatically lock",
      [
        { text: "1 minute", onPress: () => setAutoLockTime("1 minute") },
        { text: "5 minutes", onPress: () => setAutoLockTime("5 minutes") },
        { text: "15 minutes", onPress: () => setAutoLockTime("15 minutes") },
        { text: "30 minutes", onPress: () => setAutoLockTime("30 minutes") },
        { text: "1 hour", onPress: () => setAutoLockTime("1 hour") },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const handleViewLoginHistory = () => {
    Alert.alert(
      "Login History",
      "Recent login attempts:\n\n• Today, 2:30 PM - iPhone (Current)\n• Yesterday, 9:15 AM - iPhone\n• Dec 10, 4:45 PM - Web Browser\n• Dec 9, 11:20 AM - iPhone",
      [{ text: "OK" }]
    )
  }

  const handleManageDevices = () => {
    Alert.alert(
      "Manage Devices",
      "Devices with access to your account:\n\n• iPhone 15 Pro (Current)\n• MacBook Pro (Last used: 2 days ago)\n• iPad Air (Last used: 1 week ago)",
      [
        { text: "OK" },
        { text: "Remove Device", style: "destructive" }
      ]
    )
  }

  const handlePrivacyCheckup = () => {
    Alert.alert(
      "Privacy Checkup",
      "Your privacy settings are up to date. All security features are properly configured.",
      [{ text: "OK" }]
    )
  }

  const handleSecurityScan = () => {
    Alert.alert(
      "Security Scan",
      "Scanning your account security...",
      [{ text: "OK" }]
    )
    
    // Simulate scan
    setTimeout(() => {
      Alert.alert(
        "Security Scan Complete",
        "✅ Password: Strong\n✅ Two-factor auth: Enabled\n✅ Recent activity: Normal\n✅ Device security: Good",
        [{ text: "OK" }]
      )
    }, 2000)
  }

  return (
    <>
        <Stack.Screen options={{ title: "Accessibility" }} />

        <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            {/* Authentication */}
            <Text style={styles.sectionTitle}>Authentication</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
            <View style={styles.settingLeft}>
                <Ionicons name="key-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Change Password</Text>
                <Text style={styles.settingDescription}>Update your account password</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.settingItem} 
            onPress={biometricAuth ? () => setBiometricAuth(false) : handleSetupBiometric}
            >
            <View style={styles.settingLeft}>
                <Ionicons name="finger-print-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Biometric Authentication</Text>
                <Text style={styles.settingDescription}>
                    {biometricAuth ? "Enabled" : "Use Face ID or Touch ID"}
                </Text>
                </View>
            </View>
            <Ionicons 
                name={biometricAuth ? "checkmark-circle" : "chevron-forward"} 
                size={20} 
                color={biometricAuth ? "#28A745" : Colors.gray} 
            />
            </TouchableOpacity>

            <SettingsToggleItem
            icon="lock-closed-outline"
            text="Passcode Required"
            description="Require passcode to access app"
            value={passcodeRequired}
            onValueChange={setPasscodeRequired}
            />

            <SettingsToggleItem
            icon="time-outline"
            text="Auto-Lock"
            description="Automatically lock app after inactivity"
            value={autoLock}
            onValueChange={setAutoLock}
            />

            {autoLock && (
            <TouchableOpacity style={styles.settingItem} onPress={handleAutoLockTimeChange}>
                <View style={styles.settingLeft}>
                <Ionicons name="timer-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                    <Text style={styles.settingName}>Auto-Lock Time</Text>
                    <Text style={styles.settingDescription}>Time before auto-lock</Text>
                </View>
                </View>
                <View style={styles.settingRight}>
                <Text style={styles.settingValue}>{autoLockTime}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
                </View>
            </TouchableOpacity>
            )}

            <View style={styles.divider} />

            {/* Privacy & Account */}
            <Text style={styles.sectionTitle}>Privacy & Account</Text>
            
            <TouchableOpacity 
            style={styles.settingItem} 
            onPress={twoFactorAuth ? () => setTwoFactorAuth(false) : handleTwoFactorSetup}
            >
            <View style={styles.settingLeft}>
                <Ionicons name="shield-checkmark-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Two-Factor Authentication</Text>
                <Text style={styles.settingDescription}>
                    {twoFactorAuth ? "Enabled" : "Add extra security layer"}
                </Text>
                </View>
            </View>
            <Ionicons 
                name={twoFactorAuth ? "checkmark-circle" : "chevron-forward"} 
                size={20} 
                color={twoFactorAuth ? "#28A745" : Colors.gray} 
            />
            </TouchableOpacity>

            <SettingsToggleItem
            icon="notifications-outline"
            text="Login Alerts"
            description="Get notified of new login attempts"
            value={loginAlerts}
            onValueChange={setLoginAlerts}
            />

            <TouchableOpacity style={styles.settingItem} onPress={handleViewLoginHistory}>
            <View style={styles.settingLeft}>
                <Ionicons name="time-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Login History</Text>
                <Text style={styles.settingDescription}>View recent login activity</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleManageDevices}>
            <View style={styles.settingLeft}>
                <Ionicons name="phone-portrait-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Manage Devices</Text>
                <Text style={styles.settingDescription}>See devices with account access</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Data Protection */}
            <Text style={styles.sectionTitle}>Data Protection</Text>
            
            <SettingsToggleItem
            icon="lock-closed-outline"
            text="Data Encryption"
            description="Encrypt all app data"
            value={dataEncryption}
            onValueChange={setDataEncryption}
            />
            
            <SettingsToggleItem
            icon="cloud-outline"
            text="Secure Backup"
            description="Encrypt backups in cloud storage"
            value={secureBackup}
            onValueChange={setSecureBackup}
            />
            
            <SettingsToggleItem
            icon="trash-outline"
            text="Remote Wipe"
            description="Allow remote data deletion if device is lost"
            value={remoteWipe}
            onValueChange={setRemoteWipe}
            />

            <View style={styles.divider} />

            {/* Security Tools */}
            <Text style={styles.sectionTitle}>Security Tools</Text>
            
            <TouchableOpacity style={styles.securityButton} onPress={handlePrivacyCheckup}>
            <Ionicons name="shield-checkmark-outline" size={20} color={Colors.primary} />
            <Text style={styles.securityButtonText}>Privacy Checkup</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.securityButton} onPress={handleSecurityScan}>
            <Ionicons name="scan-outline" size={20} color={Colors.primary} />
            <Text style={styles.securityButtonText}>Security Scan</Text>
            </TouchableOpacity>

            {/* Security Tips */}
            <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Security Tips</Text>
            
            <View style={styles.tip}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#28A745" />
                <Text style={styles.tipText}>
                Use a strong, unique password for your account
                </Text>
            </View>
            
            <View style={styles.tip}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#28A745" />
                <Text style={styles.tipText}>
                Enable two-factor authentication for extra security
                </Text>
            </View>
            
            <View style={styles.tip}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#28A745" />
                <Text style={styles.tipText}>
                Keep your app updated to the latest version
                </Text>
            </View>
            
            <View style={styles.tip}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#28A745" />
                <Text style={styles.tipText}>
                Be cautious when using public Wi-Fi networks
                </Text>
            </View>
            </View>

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
    marginRight: 8,
  },
  securityButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary + "15",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 12,
  },
  securityButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  tipsContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  tip: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    flex: 1,
  },
})

export default SecurityScreen