"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../../../constants/Colors"

interface LegalDocument {
  id: string
  title: string
  description: string
  icon: string
  lastUpdated: string
  version: string
}

const LegalSupportScreen = () => {
  const router = useRouter()
  const [acceptedTerms, setAcceptedTerms] = useState(true)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(true)

  const legalDocuments: LegalDocument[] = [
    {
      id: "terms",
      title: "Terms of Service",
      description: "Legal terms and conditions for using our service",
      icon: "document-text-outline",
      lastUpdated: "December 1, 2024",
      version: "v3.2"
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      icon: "shield-checkmark-outline",
      lastUpdated: "November 15, 2024",
      version: "v2.8"
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      description: "Information about our use of cookies and tracking",
      icon: "browsers-outline",
      lastUpdated: "October 30, 2024",
      version: "v1.5"
    },
    {
      id: "data-processing",
      title: "Data Processing Agreement",
      description: "How we process and handle your data",
      icon: "server-outline",
      lastUpdated: "October 15, 2024",
      version: "v2.1"
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      description: "Rights and restrictions regarding our content and services",
      icon: "bulb-outline",
      lastUpdated: "September 20, 2024",
      version: "v1.3"
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      description: "Guidelines for appropriate use of our services",
      icon: "checkmark-circle-outline",
      lastUpdated: "September 10, 2024",
      version: "v2.0"
    }
  ]

  const handleDocumentPress = (document: LegalDocument) => {
    Alert.alert(
      document.title,
      `${document.description}\n\nLast Updated: ${document.lastUpdated}\nVersion: ${document.version}`,
      [
        { text: "View Full Document", onPress: () => showDocumentContent(document) },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const showDocumentContent = (document: LegalDocument) => {
    let content = ""
    
    switch (document.id) {
      case "terms":
        content = "TERMS OF SERVICE\n\n1. ACCEPTANCE OF TERMS\nBy accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.\n\n2. USE LICENSE\nPermission is granted to temporarily download one copy of the materials on Studio's website for personal, non-commercial transitory viewing only.\n\n3. DISCLAIMER\nThe materials on Studio's website are provided on an 'as is' basis. Studio makes no warranties, expressed or implied..."
        break
      case "privacy":
        content = "PRIVACY POLICY\n\n1. INFORMATION WE COLLECT\nWe collect information you provide directly to us, information we obtain automatically when you use our services, and information from other sources.\n\n2. HOW WE USE YOUR INFORMATION\nWe use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.\n\n3. INFORMATION SHARING\nWe do not sell, trade, or otherwise transfer your personal information to outside parties without your consent..."
        break
      default:
        content = `${document.title.toUpperCase()}\n\nThis document outlines the ${document.description.toLowerCase()}.\n\nLast Updated: ${document.lastUpdated}\nVersion: ${document.version}\n\nFor the complete document, please visit our website or contact legal support.`
    }
    
    Alert.alert(document.title, content, [{ text: "Close" }])
  }

  const handleDataRequest = () => {
    Alert.alert(
      "Data Request",
      "What type of data request would you like to make?",
      [
        { text: "Download My Data", onPress: () => handleDownloadData() },
        { text: "Delete My Data", onPress: () => handleDeleteData() },
        { text: "Data Portability", onPress: () => handleDataPortability() },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const handleDownloadData = () => {
    Alert.alert(
      "Download Your Data",
      "We'll prepare a copy of your data and send it to your email address within 7 business days.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Request", onPress: () => Alert.alert("Success", "Data download request submitted.") }
      ]
    )
  }

  const handleDeleteData = () => {
    Alert.alert(
      "Delete Your Data",
      "This will permanently delete all your data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => Alert.alert("Success", "Data deletion request submitted.")
        }
      ]
    )
  }

  const handleDataPortability = () => {
    Alert.alert(
      "Data Portability",
      "We'll prepare your data in a machine-readable format for transfer to another service.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Request", onPress: () => Alert.alert("Success", "Data portability request submitted.") }
      ]
    )
  }

  const handleReportViolation = () => {
    Alert.alert(
      "Report Legal Violation",
      "Please describe the legal violation you'd like to report:",
      [
        { text: "Copyright Infringement", onPress: () => showReportForm("copyright") },
        { text: "Privacy Violation", onPress: () => showReportForm("privacy") },
        { text: "Terms Violation", onPress: () => showReportForm("terms") },
        { text: "Other", onPress: () => showReportForm("other") },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const showReportForm = (type: string) => {
    Alert.alert(
      "Report Submitted",
      `Your ${type} violation report has been submitted to our legal team. We'll review it within 48 hours.`,
      [{ text: "OK" }]
    )
  }

  const handleLegalContact = () => {
    Alert.alert(
      "Legal Contact",
      "For legal inquiries, please contact:\n\nEmail: legal@studio.com\nPhone: +1-800-STUDIO-LEG\nAddress: 123 Legal St, Law City, LC 12345",
      [{ text: "OK" }]
    )
  }

  const handleComplianceInfo = () => {
    Alert.alert(
      "Compliance Information",
      "Studio complies with:\n\n• GDPR (General Data Protection Regulation)\n• CCPA (California Consumer Privacy Act)\n• COPPA (Children's Online Privacy Protection Act)\n• SOC 2 Type II\n• ISO 27001",
      [{ text: "OK" }]
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Legal Support</Text>
          <Text style={styles.headerDescription}>
            Legal documents, data rights, and compliance information
          </Text>
        </View>

        {/* Legal Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Documents</Text>
          
          {legalDocuments.map((document) => (
            <TouchableOpacity
              key={document.id}
              style={styles.documentItem}
              onPress={() => handleDocumentPress(document)}
            >
              <View style={styles.documentLeft}>
                <Ionicons name={document.icon as any} size={24} color={Colors.primary} />
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{document.title}</Text>
                  <Text style={styles.documentDescription}>{document.description}</Text>
                  <Text style={styles.documentMeta}>
                    Updated: {document.lastUpdated} • {document.version}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Data Rights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data Rights</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleDataRequest}>
            <View style={styles.actionLeft}>
              <Ionicons name="download-outline" size={24} color={Colors.primary} />
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Data Requests</Text>
                <Text style={styles.actionDescription}>Download, delete, or transfer your data</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleComplianceInfo}>
            <View style={styles.actionLeft}>
              <Ionicons name="shield-checkmark-outline" size={24} color={Colors.primary} />
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Compliance Information</Text>
                <Text style={styles.actionDescription}>View our compliance certifications</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Legal Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Actions</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleReportViolation}>
            <View style={styles.actionLeft}>
              <Ionicons name="flag-outline" size={24} color="#DC3545" />
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Report Legal Violation</Text>
                <Text style={styles.actionDescription}>Report copyright, privacy, or terms violations</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleLegalContact}>
            <View style={styles.actionLeft}>
              <Ionicons name="mail-outline" size={24} color={Colors.primary} />
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Legal Contact</Text>
                <Text style={styles.actionDescription}>Contact our legal team directly</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton} onPress={handleDataRequest}>
            <Ionicons name="document-text-outline" size={20} color={Colors.white} />
            <Text style={styles.quickActionText}>Data Request</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButtonSecondary} onPress={handleReportViolation}>
            <Ionicons name="flag-outline" size={20} color="#DC3545" />
            <Text style={styles.quickActionTextSecondary}>Report Issue</Text>
          </TouchableOpacity>
        </View>

        {/* Important Notice */}
        <View style={styles.noticeContainer}>
          <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Important Notice</Text>
            <Text style={styles.noticeText}>
              Our legal documents are regularly updated to reflect changes in laws and our services. 
              Please review them periodically to stay informed about your rights and obligations.
            </Text>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Legal Department</Text>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={16} color={Colors.gray} />
            <Text style={styles.contactText}>legal@studio.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={16} color={Colors.gray} />
            <Text style={styles.contactText}>+1-800-STUDIO-LEG</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={16} color={Colors.gray} />
            <Text style={styles.contactText}>123 Legal Street, Law City, LC 12345</Text>
          </View>
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
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  documentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  documentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  documentDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  documentMeta: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  actionDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
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
    backgroundColor: "#DC354515",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DC3545",
  },
  quickActionTextSecondary: {
    color: "#DC3545",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  noticeContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary + "15",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  contactContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
  },
})

export default LegalSupportScreen