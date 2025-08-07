import { Stack } from "expo-router"
import { Colors } from "../../constants/Colors"

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.darkText,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="auth-options" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ title: "Sign In" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="otp" options={{ title: "OTP Verification" }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  )
}
