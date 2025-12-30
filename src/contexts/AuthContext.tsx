import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { authService } from '@services/authService';
import { supabase } from '@config/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user ?? null);
    } catch (error) {
      console.error('Error checking session:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setUser(user);
      } else {
        const session = await authService.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      try {
        const session = await authService.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (sessionError) {
        console.error('Error getting session:', sessionError);
      }
    }
  };

  useEffect(() => {
    checkSession();

    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (session?.user) {
          setUser(session.user);
        } else if (
          event === 'SIGNED_IN' ||
          event === 'TOKEN_REFRESHED' ||
          event === 'USER_UPDATED'
        ) {
          await refreshUser();
        } else if (!session) {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const refreshSession = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setUser(user);
        return;
      }
    } catch (error) {
      console.error('Error in refreshSession getCurrentUser:', error);
    }

    try {
      const session = await authService.getSession();
      if (session?.user) {
        setUser(session.user);
        return;
      }
    } catch (error) {
      console.error('Error in refreshSession getSession:', error);
    }

    await refreshUser();
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await authService.signUp(email, password);
    if (data?.user) {
      setUser(data.user);
    }
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await authService.signIn(email, password);
    if (data?.user) {
      setUser(data.user);
    }
    return { error };
  };

  const signOut = async () => {
    try {
      const { error } = await authService.signOut();
      setUser(null);
      return { error };
    } catch (error) {
      setUser(null);
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshSession,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
