import supabase from './supabase'

export const profileService = {
  // Get current user profile from database
  getCurrentUserProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('No authenticated user found')
      }

      const { data: profile, error } = await supabase
        .from('users')
        .select(`
          id,
          name,
          email,
          role,
          language,
          profile_picture_url,
          phone,
          bio,
          country,
          state,
          city,
          github_url,
          linkedin_url,
          twitter_url,
          portfolio_url,
          skills,
          interests,
          experience_level,
          hackathons_participated,
          hackathons_won,
          hackathons_organized,
          hackathons_judged,
          notifications_enabled,
          email_notifications,
          push_notifications,
          created_at,
          last_login
        `)
        .eq('auth_id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        throw error
      }

      return profile
    } catch (error) {
      console.error('Error in getCurrentUserProfile:', error)
      throw error
    }
  },

  // Update user profile
  updateUserProfile: async (updates) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('No authenticated user found')
      }

      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('auth_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user profile:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in updateUserProfile:', error)
      throw error
    }
  },

  // Update user stats (for hackathons, wins, etc.)
  updateUserStats: async (stats) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('No authenticated user found')
      }

      const { data, error } = await supabase
        .from('users')
        .update({
          ...stats,
          updated_at: new Date().toISOString()
        })
        .eq('auth_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user stats:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in updateUserStats:', error)
      throw error
    }
  },

  // Get user notification preferences
  getNotificationPreferences: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('No authenticated user found')
      }

      const { data, error } = await supabase
        .from('users')
        .select('notifications_enabled, email_notifications, push_notifications')
        .eq('auth_id', user.id)
        .single()

      if (error) {
        console.error('Error fetching notification preferences:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in getNotificationPreferences:', error)
      throw error
    }
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('No authenticated user found')
      }

      const { data, error } = await supabase
        .from('users')
        .update({
          ...preferences,
          updated_at: new Date().toISOString()
        })
        .eq('auth_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating notification preferences:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error in updateNotificationPreferences:', error)
      throw error
    }
  }
}