import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap
  text: string
  onPress: () => void
  isLogout?: boolean
}

const SettingsItem = ({ icon, text, onPress, isLogout = false }: SettingsItemProps) => {
  const textColor = isLogout ? "#DC3545" : Colors.darkText
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={22} color={textColor} style={styles.icon} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      {!isLogout && <Ionicons name="chevron-forward-outline" size={22} color="#6C757D" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
})

export default SettingsItem
