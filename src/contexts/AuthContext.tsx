
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://64.226.116.132';

export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Check if we have a token
      const token = localStorage.getItem('auth_token');
      if (!token) {
        // Try to load from old storage as fallback
        const storedUser = localStorage.getItem('eduTranscribe_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
        return;
      }

      console.log('🔍 Checking authentication with backend...');
      
      // Verify token with backend
      const data = await api.auth.me();
      
      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          name: data.user.full_name || data.user.email.split('@')[0],
          avatar: data.user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${data.user.email}`
        };
        
        setUser(userData);
        localStorage.setItem('eduTranscribe_user', JSON.stringify(userData));
        console.log('✅ User authenticated:', userData);
      }
    } catch (error: any) {
      console.error('❌ Auth check failed:', error);
      // Clear invalid token and try fallback
      localStorage.removeItem('auth_token');
      
      // Fallback to stored user
      const storedUser = localStorage.getItem('eduTranscribe_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log('🔄 Using stored user as fallback');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log('🔐 Attempting login with backend...');
      
      const data = await api.auth.login({ email, password });
      
      if (data.session?.user) {
        // Backend login successful
        const userData: User = {
          id: data.session.user.id,
          email: data.session.user.email,
          role: data.session.user.user_metadata?.role || (email.includes('teacher') ? 'teacher' : 'student'),
          name: data.session.user.user_metadata?.name || data.session.user.email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.session.user.email}`
        };
        
        setUser(userData);
        localStorage.setItem('auth_token', data.session.access_token);
        localStorage.setItem('eduTranscribe_user', JSON.stringify(userData));
        console.log('✅ Backend login successful:', userData);
        
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      console.error('❌ Backend login failed:', error);
      setAuthError(error.message || 'Login failed');
      
      // Fallback to mock authentication
      console.log('🔄 Falling back to mock authentication...');
      await mockLogin(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock authentication as fallback (mantiene tu lógica original)
  const mockLogin = async (email: string, password: string) => {
    try {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role: email.includes('teacher') ? 'teacher' : 'student',
        name: email.includes('teacher') ? 'Prof. García' : 'Ana Martínez',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
      };

      setUser(mockUser);
      localStorage.setItem('eduTranscribe_user', JSON.stringify(mockUser));
      console.log('🎭 Mock login successful:', mockUser);
      setAuthError(null);
    } catch (error) {
      setAuthError('Authentication failed');
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('eduTranscribe_user');
    console.log('👋 User logged out');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    authError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
