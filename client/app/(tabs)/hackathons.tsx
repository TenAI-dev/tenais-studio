"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors } from "../../constants/Colors"
import HackathonCard from "../../components/HackathonCard"

const TABS = ["Saved", "Ongoing", "Recent"]

const HACKATHONS_DATA = {
  Saved: [
    {
      id: "1",
      title: "InnovateRural 2025 - Solving Challenges for Rural India",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
      image: "/placeholder.svg?height=200&width=350",
      tag: "AI/ML",
      tagColor: "#FFDDC1",
    },
    {
      id: "2",
      title: "DesignVerse 2025 - Shaping the Future of User Experience",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
      image: "/placeholder.svg?height=200&width=350",
      tag: "UI/UX",
      tagColor: "#D4EDDA",
    },
  ],
  Ongoing: [],
  Recent: [],
}

const HackathonsScreen = () => {
  const [activeTab, setActiveTab] = useState("Saved")

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hackathons</Text>
      </View>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {HACKATHONS_DATA[activeTab as keyof typeof HACKATHONS_DATA].length > 0 ? (
          HACKATHONS_DATA[activeTab as keyof typeof HACKATHONS_DATA].map((hackathon) => (
            <HackathonCard key={hackathon.id} {...hackathon} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hackathons found in this category.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.darkText,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 15,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#6C757D",
  },
  activeTabText: {
    color: "#4A00E0", // Purple color for active tab
    fontWeight: "bold",
  },
  activeTabIndicator: {
    height: 3,
    width: "100%",
    backgroundColor: "#4A00E0",
    marginTop: 5,
    borderRadius: 2,
  },
  scrollContainer: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#6C757D",
  },
})

export default HackathonsScreen
