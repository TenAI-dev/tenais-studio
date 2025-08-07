import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

interface StatCardProps {
  value: string
  label: string
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.darkText,
  },
  label: {
    fontSize: 14,
    color: "#6C757D",
    marginTop: 5,
  },
})

export default StatCard
