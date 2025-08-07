import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from "../constants/Colors"
import { ImageSourcePropType } from "react-native"

interface RoleCardProps {
  title: string
  description: string
  image: ImageSourcePropType
  colors: string[]
  isSelected: boolean
  onPress: () => void
}

const RoleCard = ({ title, description, image, colors, isSelected, onPress }: RoleCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, isSelected && styles.selectedContainer]}>
      <LinearGradient colors={colors} style={styles.gradient}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedContainer: {
    borderColor: Colors.primaryOrange,
  },
  gradient: {
    borderRadius: 18,
    flexDirection: "row",
    height: 140,
    overflow: "hidden",
  },
  textContainer: {
    flex: 0.65, // Assign 65% of the space to text
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.white,
    lineHeight: 20,
  },
  imageContainer: {
    flex: 0.35, // Assign 35% of the space to the image
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: "120%",
    height: "100%",
  },
})

export default RoleCard
