import { Stack } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { TouchableOpacity, Text } from "react-native"

export default function ProfileStackLayout() {
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
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: Colors.primaryOrange, fontWeight: "bold", marginRight: 12 }}>
                Save
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
    </Stack>
  )
}
