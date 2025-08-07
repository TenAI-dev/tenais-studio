// components/SocialButton.tsx
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"

interface SocialButtonProps {
  text: string
  icon?: keyof typeof Ionicons.glyphMap
  logo?: any // image file via require()
  onPress?: () => void
}

const SocialButton = ({ icon, text, logo, onPress }: SocialButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        {logo ? (
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        ) : icon ? (
          <Ionicons name={icon} size={24} color={Colors.darkText} style={styles.icon} />
        ) : null}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    color: Colors.darkText,
    flex: 1,
  },
})

export default SocialButton