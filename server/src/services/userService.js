// src/services/userService.js
import { supabase } from '../config/supabaseClient.js';

export const fetchUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const fetchUserById = async (id) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
};

export const fetchUserByAuthId = async (authId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') {
      // No user found, return null instead of throwing
      return null;
    }
    throw new Error(error.message);
  }
  return data;
};

export const createOrUpdateUserProfile = async (authId, userData) => {
  try {
    // First try to get existing user
    const existingUser = await fetchUserByAuthId(authId);
    
    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update({
          ...userData,
          updated_at: new Date().toISOString()
        })
        .eq('auth_id', authId)
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert([{
          auth_id: authId,
          ...userData,
          email_verified: true
        }])
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    }
  } catch (error) {
    console.error('Error in createOrUpdateUserProfile:', error);
    throw error;
  }
};

export const updateUserRole = async (authId, role, language) => {
  try {
    // Use the database function for this operation
    const { data, error } = await supabase.rpc('update_user_role_and_language', {
      user_auth_id: authId,
      user_role: role,
      user_language: language
    });

    if (error) throw new Error(error.message);
    
    // Return the updated user
    return await fetchUserByAuthId(authId);
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export const updateLastLogin = async (authId) => {
  const { data, error } = await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('auth_id', authId);
  if (error) throw new Error(error.message);
  return data;
};

export const getUsersByRole = async (role) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', role)
    .eq('is_active', true);
  if (error) throw new Error(error.message);
  return data;
};

export const searchUsers = async (searchTerm, role = null) => {
  let query = supabase
    .from('users')
    .select('id, name, email, role, skills, profile_picture_url, hackathons_participated')
    .eq('is_active', true)
    .ilike('name', `%${searchTerm}%`);
    
  if (role) {
    query = query.eq('role', role);
  }
  
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const deleteUser = async (id) => {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return { success: true };
};