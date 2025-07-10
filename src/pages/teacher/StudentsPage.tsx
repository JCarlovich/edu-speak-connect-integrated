
import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, Calendar, MoreVertical, DollarSign, BookOpen, TrendingUp, Video, X, Clock } from 'lucide-react';
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
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

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
           <Card 
            key={student.id} 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // Aquí iría el menú de opciones
                }}
              >
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

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-600">Nivel</p>
                  <p className="font-medium text-gray-900">{student.level}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Clases</p>
                  <p className="font-medium text-gray-900">{student.classesCompleted}</p>
                </div>
              </div>

              {/* Next Class Info - Summary */}
              {student.nextClass ? (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Próxima Clase</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    {new Date(student.nextClass).toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Sin clases programadas</span>
                  </div>
                </div>
              )}
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

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-4">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      selectedStudent.status === 'Activo' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedStudent.status}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      selectedStudent.paymentStatus === 'Al día' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : selectedStudent.paymentStatus === 'Pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedStudent.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedStudent(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">
                        Desde: {new Date(selectedStudent.joinDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Próxima Clase</h3>
                  {selectedStudent.nextClass ? (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-blue-700">
                          {new Date(selectedStudent.nextClass).toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => {
                          console.log('Unirse a clase:', selectedStudent.name);
                        }}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Unirse a Clase
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 mb-3">Sin clases programadas</p>
                      <Button 
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Programar Clase
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Clases Completadas</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStudent.classesCompleted}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Clases Restantes</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.classesRemaining}</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Promedio</p>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      <p className="text-2xl font-bold text-emerald-600">{selectedStudent.averageScore}</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Tareas</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedStudent.homeworkCompleted}/{selectedStudent.homeworkCompleted + selectedStudent.homeworkPending}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Pagos</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        <span className="font-medium text-gray-700">Total Generado</span>
                      </div>
                      <p className="text-2xl font-bold text-emerald-600">€{selectedStudent.totalRevenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Clases Pagadas</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedStudent.classesPaid}</p>
                      <p className="text-sm text-gray-500">de {selectedStudent.classesCompleted + selectedStudent.classesRemaining} totales</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Estado</p>
                      <span className={`inline-block px-3 py-2 text-sm font-medium rounded-lg ${
                        selectedStudent.paymentStatus === 'Al día' 
                          ? 'bg-emerald-100 text-emerald-700'
                          : selectedStudent.paymentStatus === 'Pendiente'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedStudent.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    console.log('Crear clase para:', selectedStudent.name);
                  }}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Crear Nueva Clase
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    console.log('Ver historial de:', selectedStudent.name);
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ver Historial
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    console.log('Editar estudiante:', selectedStudent.name);
                  }}
                >
                  Editar Información
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
