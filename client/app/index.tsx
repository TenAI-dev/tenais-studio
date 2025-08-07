"use client"

import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated, Text } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors } from "../constants/Colors"
import TenAILogo from "../components/TenAILogo";
import MicroscopeLogo from "@/components/MicroscopeLogo"

const SplashScreen = () => {
  const router = useRouter()
  const fullLogoOpacity = useRef(new Animated.Value(0)).current
  const iconLogoOpacity = useRef(new Animated.Value(0)).current
  const studioTextOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fullLogoOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(fullLogoOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(iconLogoOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ]),
      Animated.timing(studioTextOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.delay(1500),
    ]).start(() => {
      router.replace("/welcome")
    })
  }, [router, fullLogoOpacity, iconLogoOpacity, studioTextOpacity])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fullLogoOpacity, position: "absolute" }]}>
        <View style={styles.logoPlaceholder}>
          <TenAILogo width={200} height={60} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.logoContainer, { opacity: iconLogoOpacity, position: "absolute" }]}>
        <View style={styles.studioLogoContainer}>
          <MicroscopeLogo width={48} height={48} />
          <Animated.View style={{ opacity: studioTextOpacity }}>
            <Text style={styles.studioText}>Studio</Text>
          </Animated.View>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullLogoText1: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.primaryPurple,
  },
  fullLogoText2: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.darkText,
    marginLeft: 8,
  },
  studioLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLogo: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.primaryOrange,
  },
  studioText: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.primaryOrange,
    marginLeft: 8,
  },
})

export default SplashScreen
