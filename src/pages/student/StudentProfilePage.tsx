import React, { useState } from 'react';
import { Calendar, Mail, Phone, BookOpen, BarChart3, Clock, Euro, TrendingUp, CheckCircle2, AlertCircle, Award, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for the current student (this would come from auth context in real app)
const currentStudent = {
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
  classes: [
    {
      id: 1,
      date: '2024-03-10',
      topic: 'Pretérito perfecto vs imperfecto',
      duration: '60 min',
      paid: true,
      amount: 40
    },
    {
      id: 2,
      date: '2024-03-05',
      topic: 'Conversación libre',
      duration: '45 min',
      paid: true,
      amount: 35
    },
    {
      id: 3,
      date: '2024-03-01',
      topic: 'Gramática: ser vs estar',
      duration: '60 min',
      paid: false,
      amount: 40
    }
  ],
  homework: [
    {
      id: 1,
      classId: 1,
      title: 'Conjugación de verbos irregulares',
      assigned: '2024-03-12',
      dueDate: '2024-03-15',
      status: 'Completado',
      score: 9.0,
      type: 'Ejercicios'
    },
    {
      id: 2,
      classId: 1,
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
      classId: 1,
      classDate: '2024-03-10',
      topic: 'Pretérito perfecto vs imperfecto',
      duration: '60 min',
      achievements: ['Dominio de conjugaciones básicas', 'Mejora en pronunciación'],
      weaknesses: ['Confusión en usos específicos', 'Velocidad de habla'],
      nextFocus: 'Práctica conversacional con tiempos pasados'
    },
    {
      id: 2,
      classId: 2,
      classDate: '2024-03-05',
      topic: 'Conversación libre',
      duration: '45 min',
      achievements: ['Fluidez mejorada', 'Vocabulario más rico'],
      weaknesses: ['Algunos errores de concordancia'],
      nextFocus: 'Práctica de concordancia de género y número'
    }
  ]
};

export const StudentProfilePage: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const StudentAvatar = ({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16', 
      lg: 'w-24 h-24'
    };
    
    const textSizes = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-2xl'
    };
    
    if (!currentStudent.avatar || imageError) {
      const initials = getInitials(currentStudent.name);
      return (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-white shadow-md`}>
          <span className={`text-white font-bold ${textSizes[size]}`}>{initials}</span>
        </div>
      );
    }

    return (
      <img
        src={currentStudent.avatar}
        alt={currentStudent.name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white shadow-md`}
        onError={() => setImageError(true)}
      />
    );
  };

  const completedHomework = currentStudent.homework.filter(hw => hw.status === 'Completado').length;
  const pendingHomework = currentStudent.homework.filter(hw => hw.status === 'Pendiente').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Información personal y progreso académico</p>
      </div>

      {/* Student Info Card */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-4">
            <StudentAvatar />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentStudent.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {currentStudent.level}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={currentStudent.status === 'Activo' ? 'border-emerald-200 text-emerald-700' : 'border-red-200 text-red-700'}
                >
                  {currentStudent.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{currentStudent.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium text-gray-900">{currentStudent.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Fecha de inicio</p>
                <p className="font-medium text-gray-900">{new Date(currentStudent.joinDate).toLocaleDateString('es-ES')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Promedio general</p>
                <p className="font-medium text-gray-900">{currentStudent.averageScore}/10</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clases Completadas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{currentStudent.classesCompleted}</p>
              <p className="text-sm text-emerald-600 mt-1">En total</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clases Restantes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{currentStudent.classesRemaining}</p>
              <p className="text-sm text-blue-600 mt-1">Programadas</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deberes Completados</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{completedHomework}</p>
              <p className="text-sm text-purple-600 mt-1">{pendingHomework} pendientes</p>
            </div>
            <div className="p-3 rounded-full bg-purple-500">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promedio</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{currentStudent.averageScore}/10</p>
              <p className="text-sm text-orange-600 mt-1">Puntuación media</p>
            </div>
            <div className="p-3 rounded-full bg-orange-500">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="classes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="classes">Historial de Clases</TabsTrigger>
          <TabsTrigger value="homework">Deberes</TabsTrigger>
          <TabsTrigger value="progress">Progreso</TabsTrigger>
        </TabsList>

        {/* Classes Tab */}
        <TabsContent value="classes">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Historial de Clases
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tema</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado de Pago</TableHead>
                  <TableHead>Importe</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudent.classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>{new Date(classItem.date).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell className="font-medium">{classItem.topic}</TableCell>
                    <TableCell>{classItem.duration}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={classItem.paid ? "default" : "destructive"}
                        className={classItem.paid ? "bg-emerald-100 text-emerald-800" : ""}
                      >
                        {classItem.paid ? 'Pagado' : 'Pendiente'}
                      </Badge>
                    </TableCell>
                    <TableCell>{classItem.amount}€</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Homework Tab */}
        <TabsContent value="homework">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              Deberes Asignados
            </h3>
            <div className="space-y-4">
              {currentStudent.homework.map((hw) => (
                <div key={hw.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{hw.title}</h4>
                    <Badge 
                      variant={hw.status === 'Completado' ? "default" : "destructive"}
                      className={hw.status === 'Completado' ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}
                    >
                      {hw.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Tipo:</span> {hw.type}
                    </div>
                    <div>
                      <span className="font-medium">Asignado:</span> {new Date(hw.assigned).toLocaleDateString('es-ES')}
                    </div>
                    <div>
                      <span className="font-medium">Vence:</span> {new Date(hw.dueDate).toLocaleDateString('es-ES')}
                    </div>
                    <div>
                      <span className="font-medium">Calificación:</span> {hw.score ? `${hw.score}/10` : 'Pendiente'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              Resúmenes de Progreso
            </h3>
            <div className="space-y-6">
              {currentStudent.summaries.map((summary) => (
                <div key={summary.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{summary.topic}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(summary.classDate).toLocaleDateString('es-ES')} • {summary.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="flex items-center gap-2 font-medium text-emerald-700 mb-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Logros
                      </h5>
                      <ul className="space-y-1">
                        {summary.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="flex items-center gap-2 font-medium text-orange-700 mb-2">
                        <AlertCircle className="h-4 w-4" />
                        Áreas de Mejora
                      </h5>
                      <ul className="space-y-1">
                        {summary.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="flex items-center gap-2 font-medium text-blue-700 mb-1">
                      <Target className="h-4 w-4" />
                      Próximo Enfoque
                    </h5>
                    <p className="text-sm text-blue-600">{summary.nextFocus}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};