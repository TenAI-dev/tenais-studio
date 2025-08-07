"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../../../constants/Colors"

interface ContactMethod {
  id: string
  title: string
  description: string
  icon: string
  responseTime: string
  available: boolean
}

const ContactSupportScreen = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("medium")

  const contactMethods: ContactMethod[] = [
    {
      id: "live-chat",
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: "chatbubble-ellipses-outline",
      responseTime: "Usually responds immediately",
      available: true
    },
    {
      id: "email",
      title: "Email Support",
      description: "Send us a detailed message",
      icon: "mail-outline",
      responseTime: "Usually responds within 24 hours",
      available: true
    },
    {
      id: "phone",
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: "call-outline",
      responseTime: "Available Mon-Fri 9AM-6PM",
      available: false
    },
    {
      id: "community",
      title: "Community Forum",
      description: "Get help from other users",
      icon: "people-outline",
      responseTime: "Active community discussions",
      available: true
    }
  ]

  const categories = [
    { id: "account", label: "Account Issues" },
    { id: "technical", label: "Technical Problems" },
    { id: "billing", label: "Billing & Payments" },
    { id: "features", label: "Feature Requests" },
    { id: "security", label: "Security Concerns" },
    { id: "other", label: "Other" }
  ]

  const priorities = [
    { id: "low", label: "Low", color: "#28A745" },
    { id: "medium", label: "Medium", color: "#FFC107" },
    { id: "high", label: "High", color: "#DC3545" },
    { id: "urgent", label: "Urgent", color: "#6F42C1" }
  ]

  const handleContactMethodPress = (method: ContactMethod) => {
    if (!method.available) {
      Alert.alert("Not Available", "This contact method is currently not available.")
      return
    }

    switch (method.id) {
      case "live-chat":
        Alert.alert("Live Chat", "Opening live chat... Please wait while we connect you to a support agent.")
        break
      case "email":
        // Show email form or navigate to email composer
        break
      case "phone":
        Alert.alert("Phone Support", "Calling support at +1-800-STUDIO")
        break
      case "community":
        Alert.alert("Community Forum", "Opening community forum...")
        break
    }
  }

  const handleSubmitTicket = () => {
    if (!selectedCategory || !subject.trim() || !message.trim()) {
      Alert.alert("Missing Information", "Please fill in all required fields.")
      return
    }

    Alert.alert(
      "Support Ticket Submitted",
      `Your support ticket has been submitted successfully.\n\nTicket ID: #ST-${Date.now().toString().slice(-6)}\n\nWe'll respond to you via email within 24 hours.`,
      [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setSelectedCategory("")
            setSubject("")
            setMessage("")
            setPriority("medium")
          }
        }
      ]
    )
  }

  const handleCallSupport = () => {
    Alert.alert(
      "Call Support",
      "Would you like to call our support team?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call Now", onPress: () => Alert.alert("Calling", "Calling +1-800-STUDIO...") }
      ]
    )
  }

  const handleViewTickets = () => {
    Alert.alert(
      "Your Support Tickets",
      "Recent tickets:\n\n• #ST-12345 - Login Issues (Resolved)\n• #ST-12346 - Feature Request (In Progress)\n• #ST-12347 - Billing Question (Open)",
      [{ text: "OK" }]
    )
  }

  return (
    <>
        <Stack.Screen options={{ title: "Help Center" }} />
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* Header */}
                <View style={styles.header}>
                <Text style={styles.headerTitle}>How can we help you?</Text>
                <Text style={styles.headerDescription}>
                    Choose a contact method below or submit a support ticket
                </Text>
                </View>

                {/* Contact Methods */}
                <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Methods</Text>
                
                {contactMethods.map((method) => (
                    <TouchableOpacity
                    key={method.id}
                    style={[
                        styles.contactMethod,
                        !method.available && styles.contactMethodDisabled
                    ]}
                    onPress={() => handleContactMethodPress(method)}
                    disabled={!method.available}
                    >
                    <View style={styles.methodLeft}>
                        <Ionicons 
                        name={method.icon as any} 
                        size={24} 
                        color={method.available ? Colors.primary : Colors.gray} 
                        />
                        <View style={styles.methodInfo}>
                        <Text style={[
                            styles.methodTitle,
                            !method.available && styles.methodTitleDisabled
                        ]}>
                            {method.title}
                        </Text>
                        <Text style={styles.methodDescription}>{method.description}</Text>
                        <Text style={styles.methodResponseTime}>{method.responseTime}</Text>
                        </View>
                    </View>
                    
                    {method.available && (
                        <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
                    )}
                    
                    {!method.available && (
                        <View style={styles.unavailableBadge}>
                        <Text style={styles.unavailableText}>Unavailable</Text>
                        </View>
                    )}
                    </TouchableOpacity>
                ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickActionButton} onPress={handleCallSupport}>
                    <Ionicons name="call-outline" size={20} color={Colors.white} />
                    <Text style={styles.quickActionText}>Call Support</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.quickActionButtonSecondary} onPress={handleViewTickets}>
                    <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
                    <Text style={styles.quickActionTextSecondary}>View Tickets</Text>
                </TouchableOpacity>
                </View>

                {/* Support Ticket Form */}
                <View style={styles.section}>
                <Text style={styles.sectionTitle}>Submit a Support Ticket</Text>
                
                {/* Category Selection */}
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Category *</Text>
                    <View style={styles.categoryContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.id && styles.categoryButtonSelected
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                        >
                        <Text style={[
                            styles.categoryButtonText,
                            selectedCategory === category.id && styles.categoryButtonTextSelected
                        ]}>
                            {category.label}
                        </Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                </View>

                {/* Priority Selection */}
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Priority</Text>
                    <View style={styles.priorityContainer}>
                    {priorities.map((priorityItem) => (
                        <TouchableOpacity
                        key={priorityItem.id}
                        style={[
                            styles.priorityButton,
                            priority === priorityItem.id && styles.priorityButtonSelected,
                            { borderColor: priorityItem.color }
                        ]}
                        onPress={() => setPriority(priorityItem.id)}
                        >
                        <View style={[styles.priorityDot, { backgroundColor: priorityItem.color }]} />
                        <Text style={[
                            styles.priorityButtonText,
                            priority === priorityItem.id && { color: priorityItem.color }
                        ]}>
                            {priorityItem.label}
                        </Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                </View>

                {/* Subject */}
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Subject *</Text>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Brief description of your issue"
                    value={subject}
                    onChangeText={setSubject}
                    />
                </View>

                {/* Message */}
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Message *</Text>
                    <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Please describe your issue in detail..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTicket}>
                    <Ionicons name="send-outline" size={20} color={Colors.white} />
                    <Text style={styles.submitButtonText}>Submit Ticket</Text>
                </TouchableOpacity>
                </View>

                {/* Support Info */}
                <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Support Information</Text>
                <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={16} color={Colors.gray} />
                    <Text style={styles.infoText}>Support Hours: Monday - Friday, 9AM - 6PM EST</Text>
                </View>
                <View style={styles.infoItem}>
                    <Ionicons name="mail-outline" size={16} color={Colors.gray} />
                    <Text style={styles.infoText}>Email: support@studio.com</Text>
                </View>
                <View style={styles.infoItem}>
                    <Ionicons name="call-outline" size={16} color={Colors.gray} />
                    <Text style={styles.infoText}>Phone: +1-800-STUDIO</Text>
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
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  contactMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactMethodDisabled: {
    opacity: 0.6,
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  methodInfo: {
    marginLeft: 12,
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  methodTitleDisabled: {
    color: Colors.gray,
  },
  methodDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  methodResponseTime: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  unavailableBadge: {
    backgroundColor: Colors.gray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unavailableText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  quickActionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  quickActionButtonSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  quickActionTextSecondary: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryButtonSelected: {
    backgroundColor: Colors.primary + "15",
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  categoryButtonTextSelected: {
    color: Colors.primary,
    fontWeight: "600",
  },
  priorityContainer: {
    flexDirection: "row",
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  priorityButtonSelected: {
    backgroundColor: Colors.white,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  priorityButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: "transparent",
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  infoContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
  },
})

export default ContactSupportScreen