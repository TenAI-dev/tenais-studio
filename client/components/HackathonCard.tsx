import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Colors } from "../constants/Colors"

interface HackathonCardProps {
  title: string
  description: string
  image: string
  tag: string
  tagColor: string
}

const HackathonCard = ({ title, description, image, tag, tagColor }: HackathonCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.tag, { backgroundColor: tagColor }]}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity>
          <Text style={styles.detailsLink}>View details &gt;&gt;</Text>
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.darkText,
    marginRight: 10,
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
  },
  description: {
    fontSize: 14,
    color: "#6C757D",
    lineHeight: 20,
    marginBottom: 15,
  },
  detailsLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primaryOrange,
  },
})

export default HackathonCard
