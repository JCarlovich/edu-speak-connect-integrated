import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Plus, Search, Filter, MoreVertical, User, CheckCircle, AlertCircle, XCircle, CreditCard, CircleDollarSign, X, CalendarIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClasses } from '@/contexts/ClassesContext';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const ClassesPage: React.FC = () => {
  const { classes, updateClass, addClass } = useClasses();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todas');
  const [showNewClassModal, setShowNewClassModal] = useState(false);
  const [newClassData, setNewClassData] = useState({
    studentName: '',
    studentEmail: '',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    studentLevel: 'Básico',
    topic: '',
    date: '',
    time: '',
    duration: '60',
    status: 'Programada',
    paymentStatus: 'No Pagado',
    meetingLink: '',
    notes: ''
  });

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Todas' || cls.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddClass = () => {
    const generatedLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`;
    const newClass = {
      ...newClassData,
      meetingLink: newClassData.meetingLink || generatedLink
    };
    
    console.log('Creando clase con enlace:', newClass.meetingLink);
    addClass(newClass);
    
    // Reset form
    setNewClassData({
      studentName: '',
      studentEmail: '',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      studentLevel: 'Básico',
      topic: '',
      date: '',
      time: '',
      duration: '60',
      status: 'Programada',
      paymentStatus: 'No Pagado',
      meetingLink: '',
      notes: ''
    });
    
    setShowNewClassModal(false);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Programada':
        return 'bg-emerald-100 text-emerald-700';
      case 'Completada':
        return 'bg-blue-100 text-blue-700';
      case 'No Realizada':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'Pagado':
        return 'bg-green-100 text-green-700';
      case 'No Pagado':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const groupClassesByDate = (classesArray: any[]) => {
    const grouped = classesArray.reduce((acc, cls) => {
      const date = cls.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(cls);
      return acc;
    }, {} as Record<string, any[]>);

    // Sort by date
    const sortedDates = Object.keys(grouped).sort();
    return sortedDates.map(date => ({
      date,
      classes: grouped[date].sort((a, b) => a.time.localeCompare(b.time))
    }));
  };

  const groupedClasses = groupClassesByDate(filteredClasses);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Clases Programadas
          </h1>
          <p className="text-gray-600">
            Gestiona todas tus clases programadas y próximas sesiones
          </p>
        </div>
        <Button 
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => setShowNewClassModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Clase
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar por estudiante o tema..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select 
            className="p-2 border border-gray-300 rounded-md bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Programada">Programadas</option>
            <option value="Completada">Completadas</option>
            <option value="No Realizada">No Realizadas</option>
          </select>
        </div>
      </div>

      {/* Classes by Date */}
      <div className="space-y-8">
        {groupedClasses.length > 0 ? (
          groupedClasses.map(({ date, classes }) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                {formatDate(date)}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {classes.map((cls) => (
                  <Card key={cls.id} className="p-6 hover:shadow-lg transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cls.studentAvatar}
                          alt={cls.studentName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 
                            className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                            onClick={() => navigate(`/students?student=${encodeURIComponent(cls.studentName)}`)}
                          >
                            {cls.studentName}
                          </h3>
                          <span className="text-sm text-gray-600">{cls.studentLevel}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Class Info */}
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{cls.topic}</h4>
                        <p className="text-sm text-gray-600 mt-1">{cls.notes}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{cls.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{cls.duration} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Controls */}
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => {
                          const statuses = ['Programada', 'Completada', 'No Realizada'];
                          const currentIndex = statuses.indexOf(cls.status);
                          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                          updateClass(cls.id, { status: nextStatus });
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all hover:scale-105 cursor-pointer ${getStatusColor(cls.status)} hover:shadow-sm`}
                      >
                        <div className="flex items-center gap-1.5">
                          {cls.status === 'Programada' && <Clock className="h-3 w-3" />}
                          {cls.status === 'Completada' && <CheckCircle className="h-3 w-3" />}
                          {cls.status === 'No Realizada' && <XCircle className="h-3 w-3" />}
                          {cls.status}
                        </div>
                      </button>
                      
                      <button
                        onClick={() => {
                          const paymentStatuses = ['No Pagado', 'Pagado'];
                          const currentIndex = paymentStatuses.indexOf(cls.paymentStatus);
                          const nextStatus = paymentStatuses[(currentIndex + 1) % paymentStatuses.length];
                          updateClass(cls.id, { paymentStatus: nextStatus });
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all hover:scale-105 cursor-pointer ${getPaymentColor(cls.paymentStatus)} hover:shadow-sm`}
                      >
                        <div className="flex items-center gap-1.5">
                          {cls.paymentStatus === 'Pagado' && <CircleDollarSign className="h-3 w-3" />}
                          {cls.paymentStatus === 'No Pagado' && <CreditCard className="h-3 w-3" />}
                          {cls.paymentStatus}
                        </div>
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {cls.meetingLink ? (
                        <Button 
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                          onClick={() => window.open(cls.meetingLink, '_blank')}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Unirse
                        </Button>
                      ) : (
                        <Button 
                          className="flex-1 bg-blue-500 hover:bg-blue-600"
                          onClick={() => {
                            console.log('Confirmar clase:', cls.id);
                          }}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Confirmar
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clases programadas</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'Todas' 
                ? 'No se encontraron clases con los filtros aplicados'
                : 'Comienza programando tu primera clase'
              }
            </p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setShowNewClassModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Clase
            </Button>
          </div>
        )}
      </div>

      {/* New Class Modal */}
      {showNewClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Nueva Clase</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNewClassModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Student Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentName">Nombre del Estudiante</Label>
                    <Input
                      id="studentName"
                      value={newClassData.studentName}
                      onChange={(e) => setNewClassData({...newClassData, studentName: e.target.value})}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentEmail">Email del Estudiante</Label>
                    <Input
                      id="studentEmail"
                      type="email"
                      value={newClassData.studentEmail}
                      onChange={(e) => setNewClassData({...newClassData, studentEmail: e.target.value})}
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="studentLevel">Nivel</Label>
                  <Select 
                    value={newClassData.studentLevel} 
                    onValueChange={(value) => setNewClassData({...newClassData, studentLevel: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Class Details */}
                <div>
                  <Label htmlFor="topic">Tema de la Clase</Label>
                  <Input
                    id="topic"
                    value={newClassData.topic}
                    onChange={(e) => setNewClassData({...newClassData, topic: e.target.value})}
                    placeholder="Ej: Conversación Avanzada, Gramática, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newClassData.date}
                      onChange={(e) => setNewClassData({...newClassData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Hora</Label>
                    <Select 
                      value={newClassData.time} 
                      onValueChange={(value) => setNewClassData({...newClassData, time: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duración (min)</Label>
                    <Select 
                      value={newClassData.duration} 
                      onValueChange={(value) => setNewClassData({...newClassData, duration: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="meetingLink">Enlace de Reunión (opcional)</Label>
                  <Input
                    id="meetingLink"
                    value={newClassData.meetingLink}
                    onChange={(e) => setNewClassData({...newClassData, meetingLink: e.target.value})}
                    placeholder="https://meet.google.com/..."
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={newClassData.notes}
                    onChange={(e) => setNewClassData({...newClassData, notes: e.target.value})}
                    placeholder="Notas adicionales sobre la clase..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowNewClassModal(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={handleAddClass}
                  disabled={!newClassData.studentName || !newClassData.topic || !newClassData.date || !newClassData.time}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Clase
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};