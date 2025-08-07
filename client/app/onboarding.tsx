"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import TenAILogo from "../components/TenAILogo";
import OnboardingSlide from "../components/OnboardingSlide"
import Paginator from "../components/Paginator"
import slides from "../constants/OnboardingSlides"
import { Colors } from "../constants/Colors"

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef<FlatList>(null)
  const router = useRouter()

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = (index: number) => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({ index })
    }
  }

  const navigateToRoleSelection = () => {
    router.replace("/role-selection")
  }

  return (
    <LinearGradient
      colors={[Colors.gradientOrangeStart, Colors.gradientOrangeMid, Colors.gradientOrangeEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TenAILogo width={200} height={60} />
        </View>
        <View style={{ flex: 3 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <OnboardingSlide item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <View style={{ alignItems: "center", position: "absolute", bottom: 100, width: "100%" }}>
          <Paginator data={slides} scrollX={scrollX} />
        </View>

        <View style={styles.footer}>
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity onPress={currentIndex > 0 ? () => scrollTo(currentIndex - 1) : navigateToRoleSelection}>
                <Text style={styles.buttonText}>{currentIndex > 0 ? "Back" : "Skip"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={() => scrollTo(currentIndex + 1)}>
                <Ionicons name="arrow-forward" size={24} color={Colors.primaryOrange} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={navigateToRoleSelection}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color={Colors.primaryOrange} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 30,
  },
  getStartedButtonText: {
    color: Colors.primaryOrange,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
})

export default OnboardingScreen
