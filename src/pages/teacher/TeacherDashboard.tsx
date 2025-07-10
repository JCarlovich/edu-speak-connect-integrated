import React, { useState } from 'react';
import { Users, Calendar, DollarSign, CheckCircle, Clock, BookOpen, FileText, Plus, X, Video, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClasses } from '@/contexts/ClassesContext';

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

const students = [
  {
    id: 1,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    level: 'Intermedio',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    level: 'Avanzado',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    level: 'Básico',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Pedro Ruiz',
    email: 'pedro.ruiz@email.com',
    level: 'Intermedio',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export const TeacherDashboard: React.FC = () => {
  const { addClass } = useClasses();
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [classData, setClassData] = useState({
    topic: '',
    date: '',
    time: '',
    duration: '60',
    notes: ''
  });

  const generateMeetingLink = () => {
    // Simular generación de link de videollamada
    const randomId = Math.random().toString(36).substring(2, 15);
    return `https://meet.google.com/${randomId}`;
  };

  const handleCreateClass = () => {
    const selectedStudentData = students.find(s => s.id === parseInt(selectedStudent));
    if (!selectedStudentData) return;
    
    const meetingLink = generateMeetingLink();
    
    // Agregar la clase al contexto
    addClass({
      studentName: selectedStudentData.name,
      studentAvatar: selectedStudentData.avatar,
      studentEmail: selectedStudentData.email,
      studentLevel: selectedStudentData.level,
      topic: classData.topic,
      date: classData.date,
      time: classData.time,
      duration: classData.duration,
      status: 'Programada',
      meetingLink: meetingLink,
      notes: classData.notes || ''
    });
    
    // Resetear formulario
    setSelectedStudent('');
    setClassData({
      topic: '',
      date: '',
      time: '',
      duration: '60',
      notes: ''
    });
    setShowCreateClass(false);
    
    // Mensaje de éxito
    alert(`Clase creada exitosamente para ${selectedStudentData.name}!\nLink de reunión: ${meetingLink}`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta, Prof. García!
          </h1>
          <p className="text-gray-600">
            Aquí tienes un resumen de tu actividad docente
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateClass(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir Clase
        </Button>
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

      {/* Create Class Modal */}
      {showCreateClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Crear Nueva Clase</h2>
                  <p className="text-sm text-gray-600">Programa una nueva sesión con un estudiante</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCreateClass(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Student Selection */}
              <div>
                <Label htmlFor="student" className="text-sm font-medium text-gray-700 mb-2 block">
                  Seleccionar Estudiante *
                </Label>
                <select 
                  id="student"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">-- Selecciona un estudiante --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Student Preview */}
              {selectedStudent && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={students.find(s => s.id === parseInt(selectedStudent))?.avatar}
                      alt="Student"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-blue-900">
                        {students.find(s => s.id === parseInt(selectedStudent))?.name}
                      </p>
                      <p className="text-sm text-blue-700">
                        Nivel: {students.find(s => s.id === parseInt(selectedStudent))?.level}
                      </p>
                      <p className="text-sm text-blue-600">
                        {students.find(s => s.id === parseInt(selectedStudent))?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2 block">
                    Fecha *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={classData.date}
                    onChange={(e) => setClassData({...classData, date: e.target.value})}
                    className="w-full"
                  />
                </div>

                {/* Time */}
                <div>
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2 block">
                    Hora *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={classData.time}
                    onChange={(e) => setClassData({...classData, time: e.target.value})}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <Label htmlFor="topic" className="text-sm font-medium text-gray-700 mb-2 block">
                  Tema de la Clase *
                </Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="Ej: Conversación sobre viajes, Gramática: presente perfecto"
                  value={classData.topic}
                  onChange={(e) => setClassData({...classData, topic: e.target.value})}
                  className="w-full"
                />
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 block">
                  Duración (minutos) *
                </Label>
                <select 
                  id="duration"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={classData.duration}
                  onChange={(e) => setClassData({...classData, duration: e.target.value})}
                >
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="90">90 minutos</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
                  Notas Adicionales
                </Label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Objetivos específicos, material necesario, etc."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={classData.notes}
                  onChange={(e) => setClassData({...classData, notes: e.target.value})}
                />
              </div>

              {/* Info Box */}
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Link de Videollamada</p>
                    <p className="text-sm text-emerald-700">
                      Se generará automáticamente un enlace de Google Meet cuando creates la clase.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowCreateClass(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                onClick={handleCreateClass}
                disabled={!selectedStudent || !classData.topic || !classData.date || !classData.time}
              >
                <Video className="h-4 w-4 mr-2" />
                Crear Clase
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
