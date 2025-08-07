// lib/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  USER_ROLE: 'user_role',
  USER_LANGUAGE: 'user_language',
  IS_AUTHENTICATED: 'is_authenticated',
  USER_DATA: 'user_data',
  ONBOARDING_COMPLETED: 'onboarding_completed'
};

export const storage = {
  // Set item
  setItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },

  // Get item
  getItem: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  // Remove item
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },

  // Clear all storage
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};