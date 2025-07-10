
import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, Calendar, MoreVertical, DollarSign, BookOpen, TrendingUp, Video, X, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    homework: [
      {
        id: 1,
        title: 'Conjugación de verbos irregulares',
        assigned: '2024-03-12',
        dueDate: '2024-03-15',
        status: 'Completado',
        score: 9.0,
        type: 'Ejercicios'
      },
      {
        id: 2,
        title: 'Redacción: Mi rutina diaria',
        assigned: '2024-03-10',
        dueDate: '2024-03-14',
        status: 'Pendiente',
        score: null,
        type: 'Ensayo'
      }
    ],
    summaries: [
      {
        id: 1,
        classDate: '2024-03-10',
        topic: 'Pretérito perfecto vs imperfecto',
        duration: '60 min',
        achievements: ['Dominio de conjugaciones básicas', 'Mejora en pronunciación'],
        weaknesses: ['Confusión en usos específicos', 'Velocidad de habla'],
        nextFocus: 'Práctica conversacional con tiempos pasados'
      }
    ]
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
    homework: [
      {
        id: 1,
        title: 'Análisis de texto literario',
        assigned: '2024-03-08',
        dueDate: '2024-03-14',
        status: 'En progreso',
        score: null,
        type: 'Análisis'
      }
    ],
    summaries: [
      {
        id: 1,
        classDate: '2024-03-08',
        topic: 'Subjuntivo en cláusulas nominales',
        duration: '60 min',
        achievements: ['Excelente comprensión teórica', 'Aplicación correcta en ejercicios'],
        weaknesses: ['Dudas en expresiones idiomáticas'],
        nextFocus: 'Subjuntivo en cláusulas adverbiales'
      }
    ]
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
    homework: [
      {
        id: 1,
        title: 'Vocabulario: La familia',
        assigned: '2024-03-05',
        dueDate: '2024-03-12',
        status: 'Completado',
        score: 7.5,
        type: 'Vocabulario'
      },
      {
        id: 2,
        title: 'Diálogo en presente simple',
        assigned: '2024-03-03',
        dueDate: '2024-03-10',
        status: 'Pendiente',
        score: null,
        type: 'Conversación'
      }
    ],
    summaries: [
      {
        id: 1,
        classDate: '2024-03-05',
        topic: 'Presente simple - tercera persona',
        duration: '45 min',
        achievements: ['Comprende la estructura básica', 'Buena pronunciación'],
        weaknesses: ['Olvida la -s en tercera persona', 'Vocabulario limitado'],
        nextFocus: 'Práctica intensiva de tercera persona'
      }
    ]
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
    homework: [],
    summaries: [
      {
        id: 1,
        classDate: '2024-02-28',
        topic: 'Repaso general - condicionales',
        duration: '60 min',
        achievements: ['Entiende la teoría de condicionales'],
        weaknesses: ['Dificultad en aplicación práctica', 'Falta de práctica'],
        nextFocus: 'Retomar clases regularmente'
      }
    ]
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

            {/* Content with Tabs */}
            <div className="p-6">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">Información General</TabsTrigger>
                  <TabsTrigger value="payments">Pagos</TabsTrigger>
                  <TabsTrigger value="homework">Deberes y Resúmenes</TabsTrigger>
                </TabsList>

                {/* General Information Tab */}
                <TabsContent value="general" className="mt-6">
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
                            Desde: {new Date(selectedStudent.joinDate).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-700">Nivel: {selectedStudent.level}</span>
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
                              {new Date(selectedStudent.nextClass).toLocaleDateString("es-ES", { 
                                weekday: "long", 
                                year: "numeric", 
                                month: "long", 
                                day: "numeric" 
                              })}
                            </span>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600"
                            onClick={() => {
                              console.log("Unirse a clase:", selectedStudent.name);
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

                  {/* Action Button */}
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      console.log("Crear clase para:", selectedStudent.name);
                    }}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Crear Nueva Clase
                  </Button>
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Información de Pagos</h3>
                    
                    {/* Payment Overview */}
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
                            selectedStudent.paymentStatus === "Al día" 
                              ? "bg-emerald-100 text-emerald-700"
                              : selectedStudent.paymentStatus === "Pendiente"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {selectedStudent.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment History */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Historial de Pagos</h4>
                      <div className="space-y-3">
                        {Array.from({ length: 3 }, (_, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">Pago por 4 clases</p>
                              <p className="text-sm text-gray-600">{new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES")}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-emerald-600">€{120 - i * 10}</p>
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                Completado
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Homework & Summaries Tab */}
                <TabsContent value="homework" className="mt-6">
                  <div className="space-y-8">
                    {/* Homework Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Deberes</h3>
                      {selectedStudent.homework && selectedStudent.homework.length > 0 ? (
                        <div className="space-y-4">
                          {selectedStudent.homework.map((hw: any) => (
                            <div key={hw.id} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-900">{hw.title}</h4>
                                  <p className="text-sm text-gray-600">{hw.type}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  hw.status === "Completado" 
                                    ? "bg-emerald-100 text-emerald-700"
                                    : hw.status === "En progreso"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}>
                                  {hw.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Asignado: {new Date(hw.assigned).toLocaleDateString("es-ES")}</p>
                                  <p className="text-gray-600">Fecha límite: {new Date(hw.dueDate).toLocaleDateString("es-ES")}</p>
                                </div>
                                <div className="text-right">
                                  {hw.score && (
                                    <div className="flex items-center justify-end gap-1">
                                      {hw.score >= 8 ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                      ) : (
                                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                                      )}
                                      <span className="font-medium">Nota: {hw.score}/10</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-center py-8">No hay deberes asignados</p>
                      )}
                    </div>

                    {/* Class Summaries Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resúmenes de Clases</h3>
                      {selectedStudent.summaries && selectedStudent.summaries.length > 0 ? (
                        <div className="space-y-6">
                          {selectedStudent.summaries.map((summary: any) => (
                            <div key={summary.id} className="p-6 border border-gray-200 rounded-lg">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 text-lg">{summary.topic}</h4>
                                  <p className="text-sm text-gray-600">
                                    {new Date(summary.classDate).toLocaleDateString("es-ES")} • {summary.duration}
                                  </p>
                                </div>
                                <FileText className="h-5 w-5 text-gray-400" />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h5 className="font-medium text-emerald-700 mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Logros
                                  </h5>
                                  <ul className="space-y-1">
                                    {summary.achievements.map((achievement: string, index: number) => (
                                      <li key={index} className="text-sm text-gray-700">• {achievement}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Áreas de Mejora
                                  </h5>
                                  <ul className="space-y-1">
                                    {summary.weaknesses.map((weakness: string, index: number) => (
                                      <li key={index} className="text-sm text-gray-700">• {weakness}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <h5 className="font-medium text-blue-700 mb-1">Próximo Enfoque</h5>
                                <p className="text-sm text-blue-600">{summary.nextFocus}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-center py-8">No hay resúmenes de clases disponibles</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
