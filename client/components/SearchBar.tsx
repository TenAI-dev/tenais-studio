"use client"

import { useState, useRef } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Audio } from "expo-av"
import * as FileSystem from "expo-file-system"
import { Colors } from "../constants/Colors"
import React from "react"

const BACKEND_URL = "http://YOUR_IP:5000/transcribe" // <-- CHANGE THIS

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const recordingRef = useRef<Audio.Recording | null>(null)

  const startRecording = async () => {
    try {
      console.log("Requesting permissions...")
      const permission = await Audio.requestPermissionsAsync()
      if (!permission.granted) {
        Alert.alert("Permission required", "Microphone permission is needed to record audio.")
        return
      }

      console.log("Starting recording...")
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )

      recordingRef.current = recording
      setIsRecording(true)
    } catch (err) {
      console.error("Failed to start recording", err)
    }
  }

  const stopRecording = async () => {
    try {
      console.log("Stopping recording...")
      const recording = recordingRef.current
      if (!recording) return

      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      setIsRecording(false)
      if (uri) {
        await transcribeAudio(uri)
      }
    } catch (err) {
      console.error("Failed to stop recording", err)
      setIsRecording(false)
    }
  }

  const transcribeAudio = async (uri: string) => {
    try {
      setIsLoading(true)
      const fileInfo = await FileSystem.getInfoAsync(uri)
      const formData = new FormData()

      formData.append("file", {
        uri,
        name: "audio.wav",
        type: "audio/wav"
      } as any)

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      const data = await res.json()
      setSearchQuery(data.transcription || "")
    } catch (err) {
      console.error("Transcription failed", err)
      Alert.alert("Error", "Transcription failed.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="arrow-back" size={24} color={Colors.darkText} />
      </TouchableOpacity>
      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color="#6C757D" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {isLoading ? (
          <ActivityIndicator style={styles.micIcon} size="small" color={Colors.primaryOrange} />
        ) : (
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <Ionicons
              name={isRecording ? "mic-off" : "mic"}
              size={22}
              color={isRecording ? Colors.primaryOrange : "#6C757D"}
              style={styles.micIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginLeft: 15,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.darkText,
  },
  micIcon: {
    padding: 10,
  },
})

export default SearchBar
