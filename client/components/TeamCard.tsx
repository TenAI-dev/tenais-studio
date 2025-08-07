import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native"
import { Colors } from "../constants/Colors"
import { useAuth } from "@/contexts/AuthContext"

interface TeamCardProps {
  hackathonTitle: string
  description: string
  image: string
  status: string
  category: string
  members: string[]
}

const TeamCard = ({ hackathonTitle, description, image, status, category, members }: TeamCardProps) => {
  const { isGuest } = useAuth()

  const handleViewTeam = () => {
    if (isGuest) {
      Alert.alert("Authentication Required", "Please sign in or sign up to view team details.")
    } else {
      // Navigate to team details screen
      console.log("Navigate to team details")
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.statusTag}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        </View>
        <Text style={styles.title}>{hackathonTitle}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <View style={styles.membersContainer}>
            {members.map((memberUri, index) => (
              <Image
                key={index}
                source={{ uri: memberUri }}
                style={[styles.memberAvatar, { marginLeft: index > 0 ? -10 : 0 }]}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.viewTeamButton} onPress={handleViewTeam}>
          <Text style={styles.viewTeamButtonText}>View Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusTag: {
    backgroundColor: "#FFE0E0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    color: "#DC3545",
    fontWeight: "bold",
    fontSize: 12,
  },
  categoryTag: {
    backgroundColor: "#E0E7FF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryText: {
    color: "#4A00E0",
    fontWeight: "bold",
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.darkText,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#6C757D",
    lineHeight: 20,
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  membersContainer: {
    flexDirection: "row",
  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  viewTeamButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  viewTeamButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default TeamCard
