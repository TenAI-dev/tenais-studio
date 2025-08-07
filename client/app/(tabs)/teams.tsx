"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors } from "../../constants/Colors"
import SearchBar from "../../components/SearchBar"
import TeamCard from "../../components/TeamCard"
import React from "react"

const TABS = ["View Teams", "View Submissions"]

const TEAMS_DATA = {
  "View Teams": [
    {
      id: "1",
      hackathonTitle: "AI Hackathon",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh...",
      image: "/placeholder.svg?height=200&width=350",
      status: "Ongoing",
      category: "AI/ML",
      members: [
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704e",
        "https://i.pravatar.cc/150?u=a042581f4e29026704f",
      ],
    },
    // Add more team data here
  ],
  "View Submissions": [],
}

const TeamsScreen = () => {
  const [activeTab, setActiveTab] = useState("View Teams")

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <SearchBar />

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {TEAMS_DATA[activeTab as keyof typeof TEAMS_DATA].length > 0 ? (
          TEAMS_DATA[activeTab as keyof typeof TEAMS_DATA].map((team) => <TeamCard key={team.id} {...team} />)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No content found in this category.</Text>
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
    color: "#4A00E0",
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

export default TeamsScreen
