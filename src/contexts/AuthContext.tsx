
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Simulate auth check - replace with Supabase auth later
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('eduTranscribe_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication - replace with Supabase auth
    const mockUser: User = {
      id: '1',
      email,
      role: email.includes('teacher') ? 'teacher' : 'student',
      name: email.includes('teacher') ? 'Prof. García' : 'Ana Martínez',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
    };

    localStorage.setItem('eduTranscribe_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('eduTranscribe_user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
