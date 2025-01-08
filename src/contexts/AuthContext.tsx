import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Import Supabase client

interface User {
  id: string;
  email: string;
  name: string; // Ensure name is always a string
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name ?? 'Unknown', // Use nullish coalescing for default value
          role: user.user_metadata?.role ?? 'user' // Use nullish coalescing for default value
        });
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(`Login failed: ${error.message}`);
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name ?? 'Unknown', // Ensure name is always a string
        role: data.user.user_metadata?.role ?? 'user' // Ensure role is always a string
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (typeof name !== 'string' || !email || !password) {
      throw new Error("Name, email, and password are required.");
    }
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name } // Include user_metadata with the name
      }
    });
    
    if (signUpError) {
      throw new Error(`Registration failed: ${signUpError.message}`);
    }
    
    if (signUpData.user) {
      setUser({
        id: signUpData.user.id,
        email: signUpData.user.email,
        name: name ?? 'Unknown', // Use the name directly since it's passed as an argument, default to 'Unknown'
        role: 'user'
      });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}