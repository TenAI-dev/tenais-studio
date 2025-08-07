"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../../../../constants/Colors"

const { width } = Dimensions.get("window")

interface StorageItem {
  id: string
  name: string
  size: number
  icon: string
  description: string
  canClear: boolean
}

const StorageScreen = () => {
  const router = useRouter()
  const [storageData, setStorageData] = useState<StorageItem[]>([
    {
      id: "cache",
      name: "App Cache",
      size: 45.2,
      icon: "layers-outline",
      description: "Temporary files and cached data",
      canClear: true
    },
    {
      id: "documents",
      name: "Documents",
      size: 123.7,
      icon: "document-text-outline",
      description: "User created documents and files",
      canClear: false
    },
    {
      id: "images",
      name: "Images & Media",
      size: 87.3,
      icon: "image-outline",
      description: "Photos, videos, and other media files",
      canClear: false
    },
    {
      id: "downloads",
      name: "Downloads",
      size: 34.8,
      icon: "download-outline",
      description: "Downloaded files and resources",
      canClear: true
    },
    {
      id: "offline",
      name: "Offline Data",
      size: 12.5,
      icon: "cloud-offline-outline",
      description: "Data available when offline",
      canClear: true
    },
    {
      id: "backup",
      name: "Backup Files",
      size: 67.9,
      icon: "archive-outline",
      description: "Local backup and sync data",
      canClear: false
    }
  ])

  const totalUsed = storageData.reduce((sum, item) => sum + item.size, 0)
  const totalAvailable = 500 // MB - example total storage
  const usagePercentage = (totalUsed / totalAvailable) * 100

  const formatSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`
    }
    return `${sizeInMB.toFixed(1)} MB`
  }

  const handleClearItem = (item: StorageItem) => {
    Alert.alert(
      `Clear ${item.name}`,
      `Are you sure you want to clear ${item.name}? This will free up ${formatSize(item.size)} of storage.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            // Simulate clearing storage
            setStorageData(prev => 
              prev.map(storageItem => 
                storageItem.id === item.id 
                  ? { ...storageItem, size: 0 }
                  : storageItem
              )
            )
            Alert.alert("Success", `${item.name} cleared successfully`)
          }
        }
      ]
    )
  }

  const handleClearAll = () => {
    const clearableItems = storageData.filter(item => item.canClear)
    const totalClearable = clearableItems.reduce((sum, item) => sum + item.size, 0)
    
    if (totalClearable === 0) {
      Alert.alert("Nothing to Clear", "There are no clearable items at the moment.")
      return
    }

    Alert.alert(
      "Clear All Cache",
      `This will clear all temporary files and free up ${formatSize(totalClearable)} of storage.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            setStorageData(prev => 
              prev.map(item => 
                item.canClear ? { ...item, size: 0 } : item
              )
            )
            Alert.alert("Success", "All cache cleared successfully")
          }
        }
      ]
    )
  }

  const getStorageBarColor = (percentage: number) => {
    if (percentage < 50) return "#28A745"
    if (percentage < 80) return "#FFC107"
    return "#DC3545"
  }

  return (
    <>
      <Stack.Screen options={{ title: "Storage" }} />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Storage Overview */}
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>Storage Usage</Text>
            <View style={styles.storageInfo}>
              <Text style={styles.storageText}>
                {formatSize(totalUsed)} of {formatSize(totalAvailable)} used
              </Text>
              <Text style={styles.storagePercentage}>
                {usagePercentage.toFixed(1)}% full
              </Text>
            </View>
            
            <View style={styles.storageBarContainer}>
              <View style={styles.storageBarBackground}>
                <View 
                  style={[
                    styles.storageBarFill,
                    { 
                      width: `${usagePercentage}%`,
                      backgroundColor: getStorageBarColor(usagePercentage)
                    }
                  ]} 
                />
              </View>
            </View>
          </View>

          {/* Storage Items */}
          <View style={styles.itemsContainer}>
            <Text style={styles.sectionTitle}>Storage Breakdown</Text>
            
            {storageData.map((item) => (
              <View key={item.id} style={styles.storageItem}>
                <View style={styles.itemLeft}>
                  <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
                
                <View style={styles.itemRight}>
                  <Text style={styles.itemSize}>{formatSize(item.size)}</Text>
                  {item.canClear && item.size > 0 && (
                    <TouchableOpacity 
                      style={styles.clearButton}
                      onPress={() => handleClearItem(item)}
                    >
                      <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
              <Ionicons name="trash-outline" size={20} color={Colors.white} />
              <Text style={styles.clearAllButtonText}>Clear All Cache</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optimizeButton}>
              <Ionicons name="flash-outline" size={20} color={Colors.primary} />
              <Text style={styles.optimizeButtonText}>Optimize Storage</Text>
            </TouchableOpacity>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Storage Tips</Text>
            <View style={styles.tip}>
              <Ionicons name="bulb-outline" size={16} color={Colors.gray} />
              <Text style={styles.tipText}>
                Regularly clear cache to free up space and improve performance
              </Text>
            </View>
            <View style={styles.tip}>
              <Ionicons name="bulb-outline" size={16} color={Colors.gray} />
              <Text style={styles.tipText}>
                Enable auto-cleanup to automatically manage storage
              </Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    padding: 20,
  },
  overviewCard: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  storageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  storageText: {
    fontSize: 16,
    color: Colors.text,
  },
  storagePercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  storageBarContainer: {
    marginBottom: 8,
  },
  storageBarBackground: {
    height: 8,
    backgroundColor: "#E9ECEF",
    borderRadius: 4,
    overflow: "hidden",
  },
  storageBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  itemsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  storageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 12,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  itemRight: {
    alignItems: "flex-end",
  },
  itemSize: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  clearButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  actionsContainer: {
    marginBottom: 24,
  },
  clearAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC3545",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  clearAllButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  optimizeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary + "15",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  optimizeButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  tipsContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  tip: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
    flex: 1,
  },
})

export default StorageScreen