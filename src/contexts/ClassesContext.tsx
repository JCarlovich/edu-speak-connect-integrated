import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Class {
  id: number;
  studentName: string;
  studentAvatar: string;
  studentEmail: string;
  studentLevel: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  paymentStatus: string;
  meetingLink: string;
  notes: string;
}

interface ClassesContextType {
  classes: Class[];
  addClass: (classData: Omit<Class, 'id'>) => void;
  updateClass: (id: number, updates: Partial<Class>) => void;
  deleteClass: (id: number) => void;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const useClasses = () => {
  const context = useContext(ClassesContext);
  if (!context) {
    throw new Error('useClasses must be used within a ClassesProvider');
  }
  return context;
};

const defaultClasses: Class[] = [
  {
    id: 1,
    studentName: 'Ana Martínez',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    studentEmail: 'ana.martinez@email.com',
    studentLevel: 'Intermedio',
    topic: 'Conversación Avanzada',
    date: '2025-07-20',
    time: '10:00',
    duration: '60',
    status: 'Programada',
    paymentStatus: 'Pagado',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Practicar tiempo pasado y vocabulario de viajes'
  },
  {
    id: 2,
    studentName: 'Carlos López',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    studentEmail: 'carlos.lopez@email.com',
    studentLevel: 'Avanzado',
    topic: 'Gramática: Subjuntivo',
    date: '2025-07-16',
    time: '14:00',
    duration: '45',
    status: 'Programada',
    paymentStatus: 'No Pagado',
    meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    notes: 'Continuar con cláusulas adverbiales'
  },
  {
    id: 3,
    studentName: 'María González',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    studentEmail: 'maria.gonzalez@email.com',
    studentLevel: 'Básico',
    topic: 'Vocabulario Básico',
    date: '2025-06-12',
    time: '09:30',
    duration: '30',
    status: 'Completada',
    paymentStatus: 'Pagado',
    meetingLink: 'https://meet.google.com/hij-klmn-opq',
    notes: 'Repasar números y colores'
  },
  {
    id: 4,
    studentName: 'Ana Martínez',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    studentEmail: 'ana.martinez@email.com',
    studentLevel: 'Intermedio',
    topic: 'Práctica de Pronunciación',
    date: '2025-07-18',
    time: '11:00',
    duration: '45',
    status: 'Programada',
    paymentStatus: 'No Pagado',
    meetingLink: 'https://meet.google.com/rst-uvwx-yz1',
    notes: 'Enfocarse en sonidos difíciles'
  },
  {
    id: 5,
    studentName: 'Pedro Ruiz',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    studentEmail: 'pedro.ruiz@email.com',
    studentLevel: 'Intermedio',
    topic: 'Clase de Repaso',
    date: '2025-08-20',
    time: '16:00',
    duration: '60',
    status: 'Programada',
    paymentStatus: 'Pagado',
    meetingLink: '',
    notes: 'Evaluación general del progreso'
  }
];

export const ClassesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<Class[]>(defaultClasses);

  const addClass = (classData: Omit<Class, 'id'>) => {
    const newClass: Class = {
      ...classData,
      id: Math.max(...classes.map(c => c.id), 0) + 1
    };
    setClasses(prev => [...prev, newClass]);
  };

  const updateClass = (id: number, updates: Partial<Class>) => {
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, ...updates } : cls
    ));
  };

  const deleteClass = (id: number) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
  };

  return (
    <ClassesContext.Provider value={{ classes, addClass, updateClass, deleteClass }}>
      {children}
    </ClassesContext.Provider>
  );
};