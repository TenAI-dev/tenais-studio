"use client"

import { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import DateTimePickerModal from "react-native-modal-datetime-picker"
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown"
import { Country, State } from "country-state-city"

import AuthInput from "../../../../components/AuthInput"
import { Colors } from "../../../../constants/Colors"
import { profileService } from "../../../../lib/profileService"

export default function PersonalInfoScreen() {
  const navigation = useNavigation()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [birthday, setBirthday] = useState("")

  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [countryOptions, setCountryOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])

  useEffect(() => {
    navigation.setOptions({ title: "Personal Info" })
    loadUserProfile()
    loadCountries()
  }, [])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      const profile = await profileService.getCurrentUserProfile()
      setName(profile?.name || "")
      setEmail(profile?.email || "")
      setPhone(profile?.phone || "")
      setCity(profile?.city || "")
      setCountry(profile?.country || "")
      setState(profile?.state || "")
      setBirthday(profile?.birthday || "")
    } catch {
      Alert.alert("Error", "Failed to load profile.")
    } finally {
      setLoading(false)
    }
  }

  const loadCountries = () => {
    const all = Country.getAllCountries().map((c) => ({
      id: c.isoCode,
      title: c.name,
    }))
    setCountryOptions(all)
  }

  const handleCountrySelect = (item: { id: string; title: string }) => {
    if (!item) return
    setCountry(item.title)
    setState("") // reset state
    const statesList = State.getStatesOfCountry(item.id).map((s) => ({
      id: s.isoCode,
      title: s.name,
    }))
    setStateOptions(statesList)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      await profileService.updateUserProfile({
        name,
        phone,
        city,
        state,
        country,
        birthday,
      })
      Alert.alert("Success", "Profile updated.")
    } catch {
      Alert.alert("Error", "Could not update profile.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#6C757D" />
          <Text style={styles.noteText}>
            Keep your information up to date to simplify participation.
          </Text>
        </View>

        <AuthInput label="Full Name" icon="person-outline" value={name} onChangeText={setName} />
        <AuthInput label="Email" icon="mail-outline" value={email} editable={false} />
        <AuthInput label="Phone" icon="call-outline" value={phone} onChangeText={setPhone} />
        <AuthInput label="City" icon="location-outline" value={city} onChangeText={setCity} />
        <AuthInput label="State" icon="location-outline" value={city} onChangeText={setCity} />
        <AuthInput label="Country" icon="location-outline" value={city} onChangeText={setCity} />


        {/* <Text style={styles.label}>State</Text>
        <AutocompleteDropdown
          dataSet={stateOptions}
          onSelectItem={(item) => item && setState(item.title)}
          initialValue={stateOptions.find((s) => s.title === state)?.id}
          textInputProps={{
            placeholder: "Select state",
            style: styles.input,
          }}
          inputContainerStyle={styles.inputContainer}
          rightButtonsContainerStyle={styles.icon}
          ClearIconComponent={null}
          RightComponent={() => null}
        />

        <Text style={styles.label}>Country</Text>
        <AutocompleteDropdown
          dataSet={countryOptions}
          onSelectItem={handleCountrySelect}
          initialValue={countryOptions.find((c) => c.title === country)?.id}
          textInputProps={{
            placeholder: "Select country",
            style: styles.input,
          }}
          inputContainerStyle={styles.inputContainer}
          rightButtonsContainerStyle={styles.icon}
          ClearIconComponent={null}        // remove default clear icon
          RightComponent={() => null}      // remove default right icon
        /> */}

        <Text style={styles.label}>Birthday</Text>
        <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.dateField}>
          <Ionicons name="calendar-outline" size={20} color="#6C757D" />
          <Text style={styles.dateText}>
            {birthday || "Select date"}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={birthday ? new Date(birthday) : new Date()}
          onConfirm={(date) => {
            setBirthday(date.toISOString().split("T")[0])
            setDatePickerVisible(false)
          }}
          onCancel={() => setDatePickerVisible(false)}
        />

        <View style={styles.saveButton}>
          <Text onPress={handleSave} style={styles.saveButtonText}>
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, marginBottom: 20, },
  scrollContainer: { padding: 20 },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  noteText: {
    marginLeft: 8,
    color: "#6C757D",
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  label: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkText,
  },
  dropdownInput: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.darkText,
  },
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.darkText,
  },
  saveButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 30,
  },
  saveButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingLeft: 10,
    marginBottom: 10,
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
