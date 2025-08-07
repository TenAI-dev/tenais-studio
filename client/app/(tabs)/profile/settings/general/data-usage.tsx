"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../../../../constants/Colors"

interface DataUsageItem {
  id: string
  name: string
  usage: number
  icon: string
  description: string
  percentage: number
}

interface DataPeriod {
  id: string
  name: string
  startDate: string
  endDate: string
}

const DataUsageScreen = () => {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [dataLimit, setDataLimit] = useState(2048) // 2GB in MB
  const [dataWarning, setDataWarning] = useState(true)
  const [backgroundDataRestricted, setBackgroundDataRestricted] = useState(false)
  const [wifiOnlySync, setWifiOnlySync] = useState(false)
  
  const periods: DataPeriod[] = [
    { id: "current", name: "Current Cycle", startDate: "Dec 1", endDate: "Dec 31" },
    { id: "last", name: "Last Cycle", startDate: "Nov 1", endDate: "Nov 30" },
    { id: "week", name: "This Week", startDate: "Dec 8", endDate: "Dec 14" },
  ]

  const [dataUsageItems] = useState<DataUsageItem[]>([
    {
      id: "sync",
      name: "Sync & Backup",
      usage: 345.2,
      icon: "cloud-outline",
      description: "Cloud synchronization and backup",
      percentage: 42.3
    },
    {
      id: "media",
      name: "Media Downloads",
      usage: 198.7,
      icon: "download-outline",
      description: "Images, videos, and file downloads",
      percentage: 24.4
    },
    {
      id: "updates",
      name: "App Updates",
      usage: 156.3,
      icon: "refresh-outline",
      description: "Application and content updates",
      percentage: 19.2
    },
    {
      id: "streaming",
      name: "Streaming",
      usage: 87.9,
      icon: "play-outline",
      description: "Video and audio streaming",
      percentage: 10.8
    },
    {
      id: "background",
      name: "Background Activity",
      usage: 23.4,
      icon: "layers-outline",
      description: "Background app activity",
      percentage: 2.9
    },
    {
      id: "other",
      name: "Other",
      usage: 3.5,
      icon: "ellipsis-horizontal-outline",
      description: "Miscellaneous data usage",
      percentage: 0.4
    }
  ])

  const totalUsage = dataUsageItems.reduce((sum, item) => sum + item.usage, 0)
  const usagePercentage = (totalUsage / dataLimit) * 100

  const formatData = (dataInMB: number) => {
    if (dataInMB >= 1024) {
      return `${(dataInMB / 1024).toFixed(1)} GB`
    }
    return `${dataInMB.toFixed(0)} MB`
  }

  const handleSetDataLimit = () => {
    Alert.alert(
      "Set Data Limit",
      "Enter your monthly data limit in GB",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "1GB",
          onPress: () => setDataLimit(1024)
        },
        {
          text: "2GB",
          onPress: () => setDataLimit(2048)
        },
        {
          text: "5GB",
          onPress: () => setDataLimit(5120)
        },
        {
          text: "Unlimited",
          onPress: () => setDataLimit(0)
        }
      ]
    )
  }

  const handleResetStats = () => {
    Alert.alert(
      "Reset Statistics",
      "Are you sure you want to reset all data usage statistics?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Data usage statistics have been reset")
          }
        }
      ]
    )
  }

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return "#28A745"
    if (percentage < 80) return "#FFC107"
    return "#DC3545"
  }

  return (
    <>
      <Stack.Screen options={{ title: "Storage" }} />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Period Selection */}
          <View style={styles.periodContainer}>
            <Text style={styles.sectionTitle}>Data Usage Period</Text>
            <View style={styles.periodButtons}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period.id && styles.selectedPeriodButton
                  ]}
                  onPress={() => setSelectedPeriod(period.id)}
                >
                  <Text style={[
                    styles.periodButtonText,
                    selectedPeriod === period.id && styles.selectedPeriodButtonText
                  ]}>
                    {period.name}
                  </Text>
                  <Text style={[
                    styles.periodDates,
                    selectedPeriod === period.id && styles.selectedPeriodDates
                  ]}>
                    {period.startDate} - {period.endDate}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Usage Overview */}
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>Data Usage Overview</Text>
            
            <View style={styles.usageStats}>
              <View style={styles.usageStat}>
                <Text style={styles.usageAmount}>{formatData(totalUsage)}</Text>
                <Text style={styles.usageLabel}>Used</Text>
              </View>
              
              {dataLimit > 0 && (
                <>
                  <View style={styles.usageStat}>
                    <Text style={styles.usageAmount}>{formatData(dataLimit - totalUsage)}</Text>
                    <Text style={styles.usageLabel}>Remaining</Text>
                  </View>
                  
                  <View style={styles.usageStat}>
                    <Text style={styles.usageAmount}>{formatData(dataLimit)}</Text>
                    <Text style={styles.usageLabel}>Limit</Text>
                  </View>
                </>
              )}
            </View>

            {dataLimit > 0 && (
              <View style={styles.usageBarContainer}>
                <View style={styles.usageBarBackground}>
                  <View 
                    style={[
                      styles.usageBarFill,
                      { 
                        width: `${Math.min(usagePercentage, 100)}%`,
                        backgroundColor: getUsageColor(usagePercentage)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.usagePercentage}>
                  {usagePercentage.toFixed(1)}% of limit used
                </Text>
              </View>
            )}
          </View>

          {/* App Usage Breakdown */}
          <View style={styles.breakdownContainer}>
            <Text style={styles.sectionTitle}>Usage Breakdown</Text>
            
            {dataUsageItems.map((item) => (
              <View key={item.id} style={styles.usageItem}>
                <View style={styles.itemLeft}>
                  <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
                
                <View style={styles.itemRight}>
                  <Text style={styles.itemUsage}>{formatData(item.usage)}</Text>
                  <Text style={styles.itemPercentage}>{item.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Data Settings */}
          <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Data Settings</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="warning-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingName}>Data Warning</Text>
                  <Text style={styles.settingDescription}>Alert when approaching limit</Text>
                </View>
              </View>
              <Switch
                value={dataWarning}
                onValueChange={setDataWarning}
                trackColor={{ false: '#E9ECEF', true: Colors.primary }}
                thumbColor={dataWarning ? Colors.white : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="pause-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingName}>Restrict Background Data</Text>
                  <Text style={styles.settingDescription}>Limit background app usage</Text>
                </View>
              </View>
              <Switch
                value={backgroundDataRestricted}
                onValueChange={setBackgroundDataRestricted}
                trackColor={{ false: '#E9ECEF', true: Colors.primary }}
                thumbColor={backgroundDataRestricted ? Colors.white : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="wifi-outline" size={24} color={Colors.primary} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingName}>Wi-Fi Only Sync</Text>
                  <Text style={styles.settingDescription}>Sync only when connected to Wi-Fi</Text>
                </View>
              </View>
              <Switch
                value={wifiOnlySync}
                onValueChange={setWifiOnlySync}
                trackColor={{ false: '#E9ECEF', true: Colors.primary }}
                thumbColor={wifiOnlySync ? Colors.white : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.limitButton} onPress={handleSetDataLimit}>
              <Ionicons name="speedometer-outline" size={20} color={Colors.primary} />
              <Text style={styles.limitButtonText}>Set Data Limit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resetButton} onPress={handleResetStats}>
              <Ionicons name="refresh-outline" size={20} color="#DC3545" />
              <Text style={styles.resetButtonText}>Reset Statistics</Text>
            </TouchableOpacity>
          </View>

          {/* Data Saving Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Data Saving Tips</Text>
            
            <View style={styles.tip}>
              <Ionicons name="wifi-outline" size={16} color={Colors.gray} />
              <Text style={styles.tipText}>
                Use Wi-Fi whenever possible to save cellular data
              </Text>
            </View>
            
            <View style={styles.tip}>
              <Ionicons name="pause-outline" size={16} color={Colors.gray} />
              <Text style={styles.tipText}>
                Disable background app refresh for apps you don't need
              </Text>
            </View>
            
            <View style={styles.tip}>
              <Ionicons name="download-outline" size={16} color={Colors.gray} />
              <Text style={styles.tipText}>
                Download content for offline use when on Wi-Fi
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
  periodContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  periodButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  periodButton: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
    minWidth: 100,
  },
  selectedPeriodButton: {
    backgroundColor: Colors.primary + "15",
    borderColor: Colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  selectedPeriodButtonText: {
    color: Colors.primary,
  },
  periodDates: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 2,
  },
  selectedPeriodDates: {
    color: Colors.primary,
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
    marginBottom: 16,
  },
  usageStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  usageStat: {
    alignItems: "center",
  },
  usageAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  usageLabel: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  usageBarContainer: {
    marginBottom: 8,
  },
  usageBarBackground: {
    height: 8,
    backgroundColor: "#E9ECEF",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  usageBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  usagePercentage: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
  },
  breakdownContainer: {
    marginBottom: 24,
  },
  usageItem: {
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
  itemUsage: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  itemPercentage: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  settingsContainer: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  limitButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary + "15",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  limitButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  resetButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC354515",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DC3545",
  },
  resetButtonText: {
    color: "#DC3545",
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

export default DataUsageScreen
