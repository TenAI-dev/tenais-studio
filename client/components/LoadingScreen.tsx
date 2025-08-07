// components/LoadingScreen.tsx
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primaryOrange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
})

export default LoadingScreen