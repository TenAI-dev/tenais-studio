"use client"

import { useEffect, useRef } from "react"
import { StyleSheet, Animated, Text } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from "../constants/Colors"

const WelcomeScreen = () => {
  const router = useRouter()
  const welcomeOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(welcomeOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(welcomeOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.delay(500),
    ]).start(() => {
      router.replace("/onboarding")
    })
  }, [router, welcomeOpacity])

  return (
    <LinearGradient
      colors={[Colors.gradientOrangeStart, Colors.gradientOrangeMid, Colors.gradientOrangeEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={{ opacity: welcomeOpacity }}>
          <Text style={styles.welcomeText}>Welcome</Text>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.white,
  },
})

export default WelcomeScreen

