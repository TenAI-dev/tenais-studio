// components/AuthInput.tsx
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"

interface AuthInputProps {
  label: string
  icon: keyof typeof Ionicons.glyphMap
  secureTextEntry?: boolean
  value: string
  onChangeText: (text: string) => void
}

const AuthInput = ({ label, icon, secureTextEntry = false, value, onChangeText }: AuthInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={22} color="#BDBDBD" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={label}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: Colors.darkText,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  icon: {
    padding: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingRight: 15,
    fontSize: 16,
    color: Colors.darkText,
  },
})

export default AuthInput