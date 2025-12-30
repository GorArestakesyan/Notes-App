import { supabase } from '@config/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DELAY_MS = 100;

export const authService = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase!.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase!.auth.signOut();

    if (!error) {
      await new Promise<void>(resolve => setTimeout(resolve, DELAY_MS));

      const {
        data: { session },
      } = await supabase!.auth.getSession();
      if (session) {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const supabaseKeys = allKeys.filter(
            key => key.startsWith('sb-') || key.includes('supabase.auth'),
          );
          if (supabaseKeys.length > 0) {
            await AsyncStorage.multiRemove(supabaseKeys);
          }
        } catch (storageError) {
          console.error('Error clearing storage:', storageError);
        }
      }
    }

    return { error };
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase!.auth.getUser();
    return user;
  },

  async getSession() {
    const {
      data: { session },
    } = await supabase!.auth.getSession();
    return session;
  },
};
