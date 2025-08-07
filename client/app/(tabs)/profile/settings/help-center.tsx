"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../../../constants/Colors"

interface HelpTopic {
  id: string
  title: string
  description: string
  icon: string
  articles: number
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const HelpCenterScreen = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const helpTopics: HelpTopic[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of using the app",
      icon: "rocket-outline",
      articles: 12
    },
    {
      id: "account-management",
      title: "Account Management",
      description: "Manage your profile and settings",
      icon: "person-outline",
      articles: 8
    },
    {
      id: "features",
      title: "Features & Tools",
      description: "Discover all available features",
      icon: "star-outline",
      articles: 15
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Fix common issues and problems",
      icon: "build-outline",
      articles: 10
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      description: "Keep your data safe and secure",
      icon: "shield-checkmark-outline",
      articles: 6
    },
    {
      id: "billing",
      title: "Billing & Subscriptions",
      description: "Manage payments and subscriptions",
      icon: "card-outline",
      articles: 9
    }
  ]

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I reset my password?",
      answer: "Go to Settings > Security > Change Password. You can also use the 'Forgot Password' option on the login screen.",
      category: "account"
    },
    {
      id: "2",
      question: "Why is my app running slowly?",
      answer: "Try clearing the app cache in Settings > General > Storage > Clear Cache. Also ensure you have the latest app version installed.",
      category: "troubleshooting"
    },
    {
      id: "3",
      question: "How do I enable notifications?",
      answer: "Go to Settings > Notifications and toggle on the types of notifications you want to receive. Make sure notifications are enabled in your device settings.",
      category: "features"
    },
    {
      id: "4",
      question: "Can I use the app offline?",
      answer: "Yes, many features work offline. Enable offline mode in Settings > General > Offline Mode to download content for offline use.",
      category: "features"
    },
    {
      id: "5",
      question: "How do I contact support?",
      answer: "You can reach our support team through Settings > Contact Support or by emailing support@studio.com. We typically respond within 24 hours.",
      category: "support"
    },
    {
      id: "6",
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption to protect your data. You can learn more about our security measures in Settings > Security.",
      category: "privacy"
    }
  ]

  const handleTopicPress = (topic: HelpTopic) => {
    Alert.alert(
      topic.title,
      `This section contains ${topic.articles} helpful articles about ${topic.description.toLowerCase()}`,
      [
        { text: "Browse Articles", onPress: () => {} },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const handleFAQPress = (faq: FAQ) => {
    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
  }

  const handleSearchPress = () => {
    if (searchQuery.trim()) {
      Alert.alert(
        "Search Results",
        `Searching for "${searchQuery}"...\n\nFound 3 articles and 2 FAQs matching your query.`,
        [{ text: "OK" }]
      )
    }
  }

  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "How would you like to contact our support team?",
      [
        { text: "Email", onPress: () => Alert.alert("Email", "Opening email app...") },
        { text: "Live Chat", onPress: () => Alert.alert("Live Chat", "Connecting to chat...") },
        { text: "Phone", onPress: () => Alert.alert("Phone", "Calling support...") },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const handleReportIssue = () => {
    Alert.alert(
      "Report Issue",
      "Describe the issue you're experiencing and we'll help you resolve it.",
      [
        { text: "Report Bug", onPress: () => Alert.alert("Bug Report", "Opening bug report form...") },
        { text: "Feature Request", onPress: () => Alert.alert("Feature Request", "Opening feature request form...") },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
        <Stack.Screen options={{ title: "Help Center" }} />
        <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            {/* Search */}
            <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color={Colors.gray} />
                <TextInput
                style={styles.searchInput}
                placeholder="Search help articles..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearchPress}
                />
                {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Ionicons name="close-circle" size={20} color={Colors.gray} />
                </TouchableOpacity>
                )}
            </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickAction} onPress={handleContactSupport}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color={Colors.primary} />
                <Text style={styles.quickActionText}>Contact Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction} onPress={handleReportIssue}>
                <Ionicons name="bug-outline" size={24} color={Colors.primary} />
                <Text style={styles.quickActionText}>Report Issue</Text>
            </TouchableOpacity>
            </View>

            {/* Help Topics */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Help Topics</Text>
            <View style={styles.topicsGrid}>
                {helpTopics.map((topic) => (
                <TouchableOpacity
                    key={topic.id}
                    style={styles.topicCard}
                    onPress={() => handleTopicPress(topic)}
                >
                    <Ionicons name={topic.icon as any} size={32} color={Colors.primary} />
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicDescription}>{topic.description}</Text>
                    <Text style={styles.topicArticles}>{topic.articles} articles</Text>
                </TouchableOpacity>
                ))}
            </View>
            </View>

            {/* FAQ Section */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            
            {filteredFAQs.map((faq) => (
                <TouchableOpacity
                key={faq.id}
                style={styles.faqItem}
                onPress={() => handleFAQPress(faq)}
                >
                <View style={styles.faqHeader}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Ionicons 
                    name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={Colors.gray} 
                    />
                </View>
                {expandedFAQ === faq.id && (
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
                </TouchableOpacity>
            ))}
            </View>

            {/* Popular Articles */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Articles</Text>
            
            <TouchableOpacity style={styles.articleItem}>
                <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
                <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>Getting Started with Studio</Text>
                <Text style={styles.articleDescription}>Complete beginner's guide to using all features</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.articleItem}>
                <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
                <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>Setting Up Your Profile</Text>
                <Text style={styles.articleDescription}>Customize your account and preferences</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.articleItem}>
                <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
                <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>Troubleshooting Common Issues</Text>
                <Text style={styles.articleDescription}>Solutions to frequently encountered problems</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>
            </View>

            {/* Contact Options */}
            <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>Still need help?</Text>
            <Text style={styles.contactDescription}>
                Our support team is here to help you with any questions or issues.
            </Text>
            
            <View style={styles.contactButtons}>
                <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
                <Ionicons name="mail-outline" size={20} color={Colors.white} />
                <Text style={styles.contactButtonText}>Email Support</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.contactButtonSecondary} onPress={handleContactSupport}>
                <Ionicons name="chatbubble-outline" size={20} color={Colors.primary} />
                <Text style={styles.contactButtonSecondaryText}>Live Chat</Text>
                </TouchableOpacity>
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
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  quickActionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primary + "15",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  quickActionText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
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
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  topicCard: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 12,
    textAlign: "center",
  },
  topicDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
    textAlign: "center",
  },
  topicArticles: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: "600",
  },
  faqItem: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.gray,
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: 20,
  },
  articleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  articleContent: {
    flex: 1,
    marginLeft: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  articleDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  contactContainer: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  contactButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  contactButtonSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  contactButtonSecondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})

export default HelpCenterScreen