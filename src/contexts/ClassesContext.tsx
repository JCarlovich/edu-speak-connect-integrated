import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

interface Class {
  id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  room_id?: string;
  teacher: {
    id: string;
    full_name: string;
    email: string;
  };
  student: {
    id: string;
    full_name: string;
    email: string;
  };
  // Legacy fields for compatibility
  studentName?: string;
  studentAvatar?: string;
  studentEmail?: string;
  studentLevel?: string;
  topic?: string;
  date?: string;
  time?: string;
  duration?: string;
  paymentStatus?: string;
  meetingLink?: string;
  notes?: string;
}

interface CreateClassData {
  student_id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes?: number;
}

interface ClassesContextType {
  classes: Class[];
  isLoading: boolean;
  error: string | null;
  addClass: (classData: CreateClassData) => Promise<void>;
  updateClass: (id: string, updates: Partial<Class>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  refreshClasses: () => Promise<void>;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const useClasses = () => {
  const context = useContext(ClassesContext);
  if (!context) {
    throw new Error('useClasses must be used within a ClassesProvider');
  }
  return context;
};

// Mock data for fallback
const defaultClasses: Class[] = [
  {
    id: 'mock-1',
    title: 'Conversación Avanzada',
    description: 'Practicar tiempo pasado y vocabulario de viajes',
    scheduled_at: '2025-07-20T10:00:00Z',
    duration_minutes: 60,
    status: 'scheduled',
    teacher: {
      id: 'teacher-1',
      full_name: 'Prof. García',
      email: 'teacher@example.com'
    },
    student: {
      id: 'student-1',
      full_name: 'Ana Martínez',
      email: 'ana.martinez@email.com'
    },
    // Legacy fields for compatibility
    studentName: 'Ana Martínez',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    studentEmail: 'ana.martinez@email.com',
    studentLevel: 'Intermedio',
    topic: 'Conversación Avanzada',
    date: '2025-07-20',
    time: '10:00',
    duration: '60',
    paymentStatus: 'Pagado',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Practicar tiempo pasado y vocabulario de viajes'
  },
  {
    id: 'mock-2',
    title: 'Gramática: Subjuntivo',
    description: 'Continuar con cláusulas adverbiales',
    scheduled_at: '2025-07-16T14:00:00Z',
    duration_minutes: 45,
    status: 'scheduled',
    teacher: {
      id: 'teacher-1',
      full_name: 'Prof. García',
      email: 'teacher@example.com'
    },
    student: {
      id: 'student-2',
      full_name: 'Carlos López',
      email: 'carlos.lopez@email.com'
    },
    // Legacy fields for compatibility
    studentName: 'Carlos López',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    studentEmail: 'carlos.lopez@email.com',
    studentLevel: 'Avanzado',
    topic: 'Gramática: Subjuntivo',
    date: '2025-07-16',
    time: '14:00',
    duration: '45',
    paymentStatus: 'No Pagado',
    meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    notes: 'Continuar con cláusulas adverbiales'
  }
];

export const ClassesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshClasses();
    } else {
      // Use mock data when not authenticated
      setClasses(defaultClasses);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const refreshClasses = async () => {
    if (!isAuthenticated) {
      setClasses(defaultClasses);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('📚 Fetching classes from backend...');
      
      const data = await api.classes.getAll();
      
      if (data.classes) {
        // Transform backend data to match our interface and add legacy fields
        const transformedClasses = data.classes.map((cls: any) => ({
          ...cls,
          // Add legacy fields for compatibility with existing UI
          studentName: cls.student?.full_name || 'Unknown Student',
          studentAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${cls.student?.email || 'student'}`,
          studentEmail: cls.student?.email || '',
          studentLevel: 'Intermedio', // Default level
          topic: cls.title,
          date: new Date(cls.scheduled_at).toISOString().split('T')[0],
          time: new Date(cls.scheduled_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          duration: cls.duration_minutes.toString(),
          paymentStatus: 'Pagado', // Default status
          meetingLink: cls.room_id ? `https://meet.google.com/${cls.room_id}` : '',
          notes: cls.description || ''
        }));
        
        setClasses(transformedClasses);
        console.log('✅ Classes loaded successfully:', transformedClasses.length);
      }
    } catch (error: any) {
      console.error('❌ Failed to fetch classes:', error);
      setError(error.message || 'Failed to load classes');
      
      // Fallback to mock data
      console.log('🔄 Falling back to mock data...');
      setClasses(defaultClasses);
    } finally {
      setIsLoading(false);
    }
  };

  const addClass = async (classData: CreateClassData) => {
    if (!isAuthenticated) {
      // Mock add for demo purposes
      const mockClass: Class = {
        id: `mock-${Date.now()}`,
        title: classData.title,
        description: classData.description,
        scheduled_at: classData.scheduled_at,
        duration_minutes: classData.duration_minutes || 60,
        status: 'scheduled',
        teacher: {
          id: 'teacher-1',
          full_name: 'Prof. García',
          email: 'teacher@example.com'
        },
        student: {
          id: classData.student_id,
          full_name: 'Student Name',
          email: 'student@example.com'
        },
        studentName: 'Student Name',
        studentAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=student',
        studentEmail: 'student@example.com',
        studentLevel: 'Intermedio',
        topic: classData.title,
        date: new Date(classData.scheduled_at).toISOString().split('T')[0],
        time: new Date(classData.scheduled_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        duration: (classData.duration_minutes || 60).toString(),
        paymentStatus: 'Pagado',
        meetingLink: '',
        notes: classData.description || ''
      };
      setClasses(prev => [...prev, mockClass]);
      return;
    }

    setError(null);
    
    try {
      console.log('➕ Creating class:', classData);
      
      const data = await api.classes.create(classData);
      
      if (data.class) {
        // Refresh classes to get the updated list
        await refreshClasses();
        console.log('✅ Class created successfully');
      }
    } catch (error: any) {
      console.error('❌ Failed to create class:', error);
      setError(error.message || 'Failed to create class');
      throw error;
    }
  };

  const updateClass = async (id: string, updates: Partial<Class>) => {
    if (!isAuthenticated) {
      // Mock update for demo purposes
      setClasses(prev => prev.map(cls => 
        cls.id === id ? { ...cls, ...updates } : cls
      ));
      return;
    }

    setError(null);
    
    try {
      console.log('📝 Updating class:', id, updates);
      
      // Transform updates to backend format
      const backendUpdates: any = {};
      if (updates.title) backendUpdates.title = updates.title;
      if (updates.description) backendUpdates.description = updates.description;
      if (updates.scheduled_at) backendUpdates.scheduled_at = updates.scheduled_at;
      if (updates.duration_minutes) backendUpdates.duration_minutes = updates.duration_minutes;
      if (updates.status) backendUpdates.status = updates.status;
      
      const data = await api.classes.update(id, backendUpdates);
      
      if (data.class) {
        // Refresh classes to get the updated list
        await refreshClasses();
        console.log('✅ Class updated successfully');
      }
    } catch (error: any) {
      console.error('❌ Failed to update class:', error);
      setError(error.message || 'Failed to update class');
      throw error;
    }
  };

  const deleteClass = async (id: string) => {
    if (!isAuthenticated) {
      // Mock delete for demo purposes
      setClasses(prev => prev.filter(cls => cls.id !== id));
      return;
    }

    setError(null);
    
    try {
      console.log('🗑️ Deleting class:', id);
      
      await api.classes.delete(id);
      
      // Refresh classes to get the updated list
      await refreshClasses();
      console.log('✅ Class deleted successfully');
    } catch (error: any) {
      console.error('❌ Failed to delete class:', error);
      setError(error.message || 'Failed to delete class');
      throw error;
    }
  };

  const value = {
    classes,
    isLoading,
    error,
    addClass,
    updateClass,
    deleteClass,
    refreshClasses,
  };

  return (
    <ClassesContext.Provider value={value}>
      {children}
    </ClassesContext.Provider>
  );
};