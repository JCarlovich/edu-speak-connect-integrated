
import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, Calendar, MoreVertical, DollarSign, BookOpen, TrendingUp, Video } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const students = [
  {
    id: 1,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+34 612 345 678',
    level: 'Intermedio',
    joinDate: '2024-01-15',
    classesCompleted: 12,
    classesPaid: 10,
    classesRemaining: 3,
    totalRevenue: 450,
    averageScore: 8.5,
    lastClass: '2024-03-10',
    nextClass: '2024-03-15',
    homeworkCompleted: 8,
    homeworkPending: 2,
    status: 'Activo',
    paymentStatus: 'Al día',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    phone: '+34 623 456 789',
    level: 'Avanzado',
    joinDate: '2023-11-20',
    classesCompleted: 28,
    classesPaid: 30,
    classesRemaining: 2,
    totalRevenue: 1200,
    averageScore: 9.2,
    lastClass: '2024-03-08',
    nextClass: '2024-03-14',
    homeworkCompleted: 25,
    homeworkPending: 1,
    status: 'Activo',
    paymentStatus: 'Al día',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+34 634 567 890',
    level: 'Básico',
    joinDate: '2024-02-01',
    classesCompleted: 8,
    classesPaid: 8,
    classesRemaining: 0,
    totalRevenue: 320,
    averageScore: 7.8,
    lastClass: '2024-03-05',
    nextClass: '2024-03-16',
    homeworkCompleted: 6,
    homeworkPending: 3,
    status: 'Activo',
    paymentStatus: 'Pendiente',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Pedro Ruiz',
    email: 'pedro.ruiz@email.com',
    phone: '+34 645 678 901',
    level: 'Intermedio',
    joinDate: '2023-12-10',
    classesCompleted: 15,
    classesPaid: 12,
    classesRemaining: 5,
    totalRevenue: 480,
    averageScore: 6.9,
    lastClass: '2024-02-28',
    nextClass: null,
    homeworkCompleted: 10,
    homeworkPending: 0,
    status: 'Inactivo',
    paymentStatus: 'Atrasado',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
];

export const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStudent, setShowAddStudent] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Gestión de Estudiantes
          </h1>
          <p className="text-gray-600">
            Administra tu lista de estudiantes y su información
          </p>
        </div>
        <Button 
          onClick={() => setShowAddStudent(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Estudiante
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar estudiantes por nombre o email..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    student.status === 'Activo' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Desde: {new Date(student.joinDate).toLocaleDateString('es-ES')}</span>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Clases Completadas</p>
                  <p className="text-lg font-bold text-gray-900">{student.classesCompleted}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Clases Restantes</p>
                  <p className="text-lg font-bold text-blue-600">{student.classesRemaining}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Promedio</p>
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <p className="text-lg font-bold text-emerald-600">{student.averageScore}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Tareas</p>
                  <p className="text-lg font-bold text-purple-600">{student.homeworkCompleted}/{student.homeworkCompleted + student.homeworkPending}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium text-gray-700">Estado de Pago</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    student.paymentStatus === 'Al día' 
                      ? 'bg-emerald-100 text-emerald-700'
                      : student.paymentStatus === 'Pendiente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {student.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Generado:</span>
                  <span className="font-medium text-gray-900">€{student.totalRevenue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Clases Pagadas:</span>
                  <span className="font-medium text-gray-900">{student.classesPaid}</span>
                </div>
              </div>

              {/* Next Class Info */}
              {student.nextClass && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Próxima Clase</span>
                  </div>
                  <p className="text-sm text-blue-600">{new Date(student.nextClass).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              )}

              {/* Action Button */}
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  // Aquí iría la lógica para crear una nueva clase
                  console.log('Crear clase para:', student.name);
                }}
              >
                <Video className="h-4 w-4 mr-2" />
                Crear Nueva Clase
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Student Modal (Simple version) */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Agregar Nuevo Estudiante</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <Input type="text" placeholder="Ej: Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input type="email" placeholder="juan@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <Input type="tel" placeholder="+34 612 345 678" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowAddStudent(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  // Aquí iría la lógica para agregar el estudiante
                  setShowAddStudent(false);
                }}
              >
                Agregar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
