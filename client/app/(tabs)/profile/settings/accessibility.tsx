"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Text, Switch, Alert, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../../../constants/Colors"
import SettingsToggleItem from "../../../../components/SettingsToggleItem"

const AccessibilityScreen = () => {
  const router = useRouter()
  
  // Text & Display
  const [largeText, setLargeText] = useState(false)
  const [boldText, setBoldText] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [textSize, setTextSize] = useState("medium")
  
  // Audio & Haptics
  const [soundEffects, setSoundEffects] = useState(true)
  const [hapticFeedback, setHapticFeedback] = useState(true)
  const [audioDescriptions, setAudioDescriptions] = useState(false)
  const [monoAudio, setMonoAudio] = useState(false)
  
  // Navigation & Interaction
  const [voiceOver, setVoiceOver] = useState(false)
  const [assistiveTouch, setAssistiveTouch] = useState(false)
  const [switchControl, setSwitchControl] = useState(false)
  const [speechRate, setSpeechRate] = useState("normal")
  
  // Content & Media
  const [autoPlay, setAutoPlay] = useState(true)
  const [captions, setCaptions] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const handleTextSizeChange = () => {
    Alert.alert(
      "Text Size",
      "Choose your preferred text size",
      [
        { text: "Small", onPress: () => setTextSize("small") },
        { text: "Medium", onPress: () => setTextSize("medium") },
        { text: "Large", onPress: () => setTextSize("large") },
        { text: "Extra Large", onPress: () => setTextSize("xl") },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const handleSpeechRateChange = () => {
    Alert.alert(
      "Speech Rate",
      "Choose speech rate for voice features",
      [
        { text: "Slow", onPress: () => setSpeechRate("slow") },
        { text: "Normal", onPress: () => setSpeechRate("normal") },
        { text: "Fast", onPress: () => setSpeechRate("fast") },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const handleResetSettings = () => {
    Alert.alert(
      "Reset Accessibility Settings",
      "Are you sure you want to reset all accessibility settings to default?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            // Reset all settings
            setLargeText(false)
            setBoldText(false)
            setHighContrast(false)
            setReduceMotion(false)
            setTextSize("medium")
            setSoundEffects(true)
            setHapticFeedback(true)
            setAudioDescriptions(false)
            setMonoAudio(false)
            setVoiceOver(false)
            setAssistiveTouch(false)
            setSwitchControl(false)
            setSpeechRate("normal")
            setAutoPlay(true)
            setCaptions(false)
            setReducedMotion(false)
            
            Alert.alert("Success", "Accessibility settings reset to default")
          }
        }
      ]
    )
  }

  const getTextSizeDisplay = (size: string) => {
    switch (size) {
      case "small": return "Small"
      case "medium": return "Medium"
      case "large": return "Large"
      case "xl": return "Extra Large"
      default: return "Medium"
    }
  }

  const getSpeechRateDisplay = (rate: string) => {
    switch (rate) {
      case "slow": return "Slow"
      case "normal": return "Normal"
      case "fast": return "Fast"
      default: return "Normal"
    }
  }

  return (
    <>
        <Stack.Screen options={{ title: "Accessibility" }} />
        <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            {/* Text & Display */}
            <Text style={styles.sectionTitle}>Text & Display</Text>
            
            <SettingsToggleItem
            icon="text-outline"
            text="Large Text"
            description="Increase text size throughout the app"
            value={largeText}
            onValueChange={setLargeText}
            />
            
            <SettingsToggleItem
            icon="text-outline"
            text="Bold Text"
            description="Make text bold for better readability"
            value={boldText}
            onValueChange={setBoldText}
            />
            
            <TouchableOpacity style={styles.settingItem} onPress={handleTextSizeChange}>
            <View style={styles.settingLeft}>
                <Ionicons name="resize-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Text Size</Text>
                <Text style={styles.settingDescription}>Adjust text size preference</Text>
                </View>
            </View>
            <View style={styles.settingRight}>
                <Text style={styles.settingValue}>{getTextSizeDisplay(textSize)}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </View>
            </TouchableOpacity>

            <SettingsToggleItem
            icon="contrast-outline"
            text="High Contrast"
            description="Increase contrast for better visibility"
            value={highContrast}
            onValueChange={setHighContrast}
            />

            <SettingsToggleItem
            icon="pause-outline"
            text="Reduce Motion"
            description="Minimize animations and transitions"
            value={reduceMotion}
            onValueChange={setReduceMotion}
            />

            <View style={styles.divider} />

            {/* Audio & Haptics */}
            <Text style={styles.sectionTitle}>Audio & Haptics</Text>
            
            <SettingsToggleItem
            icon="volume-high-outline"
            text="Sound Effects"
            description="Play audio feedback for interactions"
            value={soundEffects}
            onValueChange={setSoundEffects}
            />
            
            <SettingsToggleItem
            icon="phone-portrait-outline"
            text="Haptic Feedback"
            description="Vibrate for touch interactions"
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
            />
            
            <SettingsToggleItem
            icon="headset-outline"
            text="Audio Descriptions"
            description="Enable audio descriptions for media"
            value={audioDescriptions}
            onValueChange={setAudioDescriptions}
            />
            
            <SettingsToggleItem
            icon="volume-medium-outline"
            text="Mono Audio"
            description="Play audio in mono for hearing aids"
            value={monoAudio}
            onValueChange={setMonoAudio}
            />

            <View style={styles.divider} />

            {/* Navigation & Interaction */}
            <Text style={styles.sectionTitle}>Navigation & Interaction</Text>
            
            <SettingsToggleItem
            icon="accessibility-outline"
            text="VoiceOver"
            description="Screen reader for navigation"
            value={voiceOver}
            onValueChange={setVoiceOver}
            />
            
            <SettingsToggleItem
            icon="finger-print-outline"
            text="Assistive Touch"
            description="On-screen touch assistance"
            value={assistiveTouch}
            onValueChange={setAssistiveTouch}
            />
            
            <SettingsToggleItem
            icon="toggle-outline"
            text="Switch Control"
            description="Control app with external switches"
            value={switchControl}
            onValueChange={setSwitchControl}
            />

            <TouchableOpacity style={styles.settingItem} onPress={handleSpeechRateChange}>
            <View style={styles.settingLeft}>
                <Ionicons name="speedometer-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                <Text style={styles.settingName}>Speech Rate</Text>
                <Text style={styles.settingDescription}>Speed of voice feedback</Text>
                </View>
            </View>
            <View style={styles.settingRight}>
                <Text style={styles.settingValue}>{getSpeechRateDisplay(speechRate)}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Content & Media */}
            <Text style={styles.sectionTitle}>Content & Media</Text>
            
            <SettingsToggleItem
            icon="play-outline"
            text="Auto-Play Media"
            description="Automatically play videos and audio"
            value={autoPlay}
            onValueChange={setAutoPlay}
            />
            
            <SettingsToggleItem
            icon="chatbox-outline"
            text="Captions"
            description="Show captions for media content"
            value={captions}
            onValueChange={setCaptions}
            />
            
            <SettingsToggleItem
            icon="move-outline"
            text="Reduced Motion"
            description="Minimize motion in media content"
            value={reducedMotion}
            onValueChange={setReducedMotion}
            />

            <View style={styles.divider} />

            {/* Reset Option */}
            <TouchableOpacity style={styles.resetButton} onPress={handleResetSettings}>
            <Ionicons name="refresh-outline" size={20} color="#DC3545" />
            <Text style={styles.resetButtonText}>Reset All Settings</Text>
            </TouchableOpacity>

            {/* Help Text */}
            <View style={styles.helpContainer}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
                These settings help make the app more accessible. If you need additional assistance, 
                please contact our support team.
            </Text>
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
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC354515",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DC3545",
    marginBottom: 24,
  },
  resetButtonText: {
    color: "#DC3545",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  helpContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
})

export default AccessibilityScreen