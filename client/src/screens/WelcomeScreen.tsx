"use client"

import { useEffect, useRef } from "react"
import { StyleSheet, Animated, Text, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../navigation/AppNavigator"

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Welcome">

interface Props {
  navigation: WelcomeScreenNavigationProp
}

const WelcomeScreen = ({ navigation }: Props) => {
  const welcomeOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      // Fade in "Welcome"
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(1500),
      // Fade out "Welcome"
      Animated.timing(welcomeOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(500),
    ]).start(() => {
      navigation.replace("Home")
    })
  }, [navigation, welcomeOpacity])

  return (
    <LinearGradient colors={["#FF6B00", "#FF8C00", "#FFA500"]} style={styles.container}>
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
    color: "#FFFFFF",
  },
})

export default WelcomeScreen
