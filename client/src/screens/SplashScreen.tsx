"use client"

import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated, Text, SafeAreaView } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../navigation/AppNavigator"

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "Splash">

interface Props {
  navigation: SplashScreenNavigationProp
}

const SplashScreen = ({ navigation }: Props) => {
  const fullLogoOpacity = useRef(new Animated.Value(0)).current
  const iconLogoOpacity = useRef(new Animated.Value(0)).current
  const studioTextOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Welcome");
    }, 5000);

    Animated.sequence([
      Animated.timing(fullLogoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(fullLogoOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(iconLogoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(studioTextOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]).start(() => {
      clearTimeout(timeout); // cancel fallback
      navigation.replace("Welcome");
    });

    return () => clearTimeout(timeout); // cleanup if unmounted
  }, [navigation, fullLogoOpacity, iconLogoOpacity, studioTextOpacity]);


  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fullLogoOpacity }]}>
        {/* Replace with your full logo component or image */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.fullLogoText1}>10A</Text>
          <Text style={styles.fullLogoText2}>TenAI's</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.logoContainer, { opacity: iconLogoOpacity, position: "absolute" }]}>
        <View style={styles.studioLogoContainer}>
          {/* Replace with your icon logo component or image */}
          <Text style={styles.iconLogo}>A</Text>
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
    backgroundColor: "#FFFFFF",
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
    color: "#4A00E0", // Purple color
  },
  fullLogoText2: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2c3e50", // Dark blue/black
    marginLeft: 8,
  },
  studioLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLogo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF6B00", // Orange color
  },
  studioText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF6B00", // Orange color
    marginLeft: 8,
  },
})

export default SplashScreen
