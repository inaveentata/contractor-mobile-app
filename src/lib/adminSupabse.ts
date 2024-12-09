import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      // Use localStorage on the web
      return Promise.resolve(window.localStorage.getItem(key));
    } else {
      // Use SecureStore or AsyncStorage on mobile
      return await SecureStore.getItemAsync(key);
    }
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      // Use localStorage on the web
      return Promise.resolve(window.localStorage.setItem(key, value));
    } else {
      // Use SecureStore or AsyncStorage on mobile
      return await SecureStore.setItemAsync(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      // Use localStorage on the web
      return Promise.resolve(window.localStorage.removeItem(key));
    } else {
      // Use SecureStore or AsyncStorage on mobile
      return await SecureStore.deleteItemAsync(key);
    }
  },
};

// Your Supabase credentials
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
