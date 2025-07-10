import React from 'react';
import { Users, Calendar, DollarSign, CheckCircle, Clock, BookOpen, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

const stats = [
  {
    title: 'Estudiantes Activos',
    value: '24',
    change: '+3 este mes',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Clases Programadas',
    value: '12',
    change: '4 esta semana',
    icon: Calendar,
    color: 'bg-emerald-500',
  },
  {
    title: 'Clases Pagadas',
    value: '8',
    change: '67% del total',
    icon: DollarSign,
    color: 'bg-purple-500',
  },
  {
    title: 'Clases Completadas',
    value: '156',
    change: '+18 este mes',
    icon: CheckCircle,
    color: 'bg-orange-500',
  },
];

const upcomingClasses = [
  {
    id: 1,
    student: 'Ana Martínez',
    time: '10:00 AM',
    duration: '1h',
    level: 'Intermedio',
    subject: 'Conversación',
  },
  {
    id: 2,
    student: 'Carlos López',
    time: '2:00 PM',
    duration: '45m',
    level: 'Avanzado',
    subject: 'Gramática',
  },
  {
    id: 3,
    student: 'María González',
    time: '4:00 PM',
    duration: '1h',
    level: 'Básico',
    subject: 'Vocabulario',
  },
];

const recentActivities = [
  {
    id: 1,
    action: 'Nueva transcripción generada',
    student: 'Ana Martínez',
    time: 'Hace 30 min',
    type: 'transcription',
  },
  {
    id: 2,
    action: 'Tarea completada',
    student: 'Carlos López',
    time: 'Hace 1 hora',
    type: 'homework',
  },
  {
    id: 3,
    action: 'Clase programada',
    student: 'María González',
    time: 'Hace 2 horas',
    type: 'class',
  },
];

export const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Bienvenido de vuelta, Prof. García!
        </h1>
        <p className="text-gray-600">
          Aquí tienes un resumen de tu actividad docente
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-emerald-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Clases de Hoy</h2>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{cls.student}</p>
                  <p className="text-sm text-gray-600">{cls.subject} • {cls.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{cls.time}</p>
                  <p className="text-sm text-gray-500">{cls.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900">Actividad Reciente</h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'transcription' ? 'bg-purple-100' :
                  activity.type === 'homework' ? 'bg-emerald-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'transcription' && <FileText className="h-4 w-4 text-purple-600" />}
                  {activity.type === 'homework' && <BookOpen className="h-4 w-4 text-emerald-600" />}
                  {activity.type === 'class' && <Calendar className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.student}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
