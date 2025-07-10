
import React from 'react';
import { Calendar, BookOpen, BarChart3, Clock, Play, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const nextClass = {
  id: 1,
  teacher: 'Prof. García',
  subject: 'Conversación en Inglés',
  time: '2:00 PM',
  date: 'Hoy',
  duration: '1 hora',
  room: 'Sala Virtual A',
};

const stats = [
  {
    title: 'Horas de Estudio',
    value: '45h',
    change: '+5h esta semana',
    icon: Clock,
    color: 'bg-blue-500',
  },
  {
    title: 'Clases Tomadas',
    value: '32',
    change: '4 esta semana',
    icon: Calendar,
    color: 'bg-emerald-500',
  },
  {
    title: 'Deberes Completados',
    value: '18',
    change: '3 pendientes',
    icon: BookOpen,
    color: 'bg-purple-500',
  },
  {
    title: 'Progreso General',
    value: '78%',
    change: '+8% este mes',
    icon: BarChart3,
    color: 'bg-orange-500',
  },
];

const recentHomework = [
  {
    id: 1,
    title: 'Ejercicios de Gramática - Past Tense',
    due: 'Vence mañana',
    status: 'pending',
    progress: 60,
  },
  {
    id: 2,
    title: 'Práctica de Conversación',
    due: 'Completado',
    status: 'completed',
    progress: 100,
  },
  {
    id: 3,
    title: 'Vocabulario - Unidad 5',
    due: 'Vence en 3 días',
    status: 'pending',
    progress: 30,
  },
];

const upcomingClasses = [
  {
    id: 1,
    subject: 'Gramática Avanzada',
    time: 'Mañana 10:00 AM',
    teacher: 'Prof. García',
  },
  {
    id: 2,
    subject: 'Práctica de Escritura',
    time: 'Viernes 3:00 PM',
    teacher: 'Prof. García',
  },
];

export const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Hola Ana! Continúa tu aprendizaje
        </h1>
        <p className="text-gray-600">
          Aquí tienes tu progreso y próximas actividades
        </p>
      </div>

      {/* Next Class Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Próxima Clase</h2>
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{nextClass.subject}</p>
              <p className="text-sm text-gray-600">
                {nextClass.teacher} • {nextClass.date} a las {nextClass.time}
              </p>
              <p className="text-sm text-gray-600">
                Duración: {nextClass.duration} • {nextClass.room}
              </p>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="text-2xl font-bold text-blue-600">2:00 PM</div>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Play className="h-4 w-4 mr-2" />
              Unirse a Clase
            </Button>
          </div>
        </div>
      </Card>

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
        {/* Recent Homework */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">Deberes Recientes</h2>
            </div>
            <Button variant="outline" size="sm">Ver Todos</Button>
          </div>
          <div className="space-y-4">
            {recentHomework.map((homework) => (
              <div key={homework.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{homework.title}</h3>
                  {homework.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      Pendiente
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{homework.due}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          homework.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${homework.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{homework.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Classes */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900">Próximas Clases</h2>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{cls.subject}</p>
                  <p className="text-sm text-gray-600">{cls.teacher}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-600">{cls.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
