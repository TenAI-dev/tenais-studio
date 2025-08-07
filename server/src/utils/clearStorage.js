// utils/clearStorage.js - For testing/development
import { storage } from '../lib/storage'

export const clearAllStorage = async () => {
  try {
    await storage.clearAll()
    console.log('✅ All storage cleared')
  } catch (error) {
    console.error('Error clearing storage:', error)
  }
}

// You can call this in your app for testing:
// import { clearAllStorage } from './utils/clearStorage'
// clearAllStorage()