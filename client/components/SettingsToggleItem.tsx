// components/SettingsToggleItem.tsx
import React from 'react'
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

interface SettingsToggleItemProps {
  icon: string
  text: string
  description?: string
  value: boolean
  onValueChange: (value: boolean) => void
}

const SettingsToggleItem: React.FC<SettingsToggleItemProps> = ({
  icon,
  text,
  description,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Ionicons name={icon as any} size={24} color={Colors.primary} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E9ECEF', true: Colors.primary }}
        thumbColor={value ? Colors.white : '#f4f3f4'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
  },
})

export default SettingsToggleItem