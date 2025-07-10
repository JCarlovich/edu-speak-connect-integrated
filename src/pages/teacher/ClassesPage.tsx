import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Plus, Search, Filter, MoreVertical, User, CheckCircle, AlertCircle, XCircle, CreditCard, CircleDollarSign, X, CalendarIcon, BookOpen, Copy, Link } from 'lucide-react';
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Aquí podrías agregar una notificación toast si quieres
      console.log('Enlace copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Clases Programadas
          </h1>
          <p className="text-gray-600">
            Gestiona todas tus clases programadas y próximas sesiones
          </p>
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3"
          onClick={() => setShowNewClassModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Clase
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por estudiante o tema..."
              className="pl-12 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <select 
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white/90 hover:border-blue-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all min-w-[140px]"
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
                  <Card key={cls.id} className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/90">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={cls.studentAvatar}
                              alt={cls.studentName}
                              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-md"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 
                              className="font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors text-lg"
                              onClick={() => navigate(`/students?student=${encodeURIComponent(cls.studentName)}`)}
                            >
                              {cls.studentName}
                            </h3>
                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{cls.studentLevel}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-full hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Class Info */}
                      <div className="space-y-4 mb-6">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-4">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">{cls.topic}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{cls.notes}</p>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-xl">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{cls.time}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-xl">
                            <Calendar className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">{cls.duration} min</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Controls */}
                      <div className="flex gap-3 mb-6">
                        <button
                          onClick={() => {
                            const statuses = ['Programada', 'Completada', 'No Realizada'];
                            const currentIndex = statuses.indexOf(cls.status);
                            const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                            updateClass(cls.id, { status: nextStatus });
                          }}
                          className={`flex-1 px-4 py-2.5 text-xs rounded-2xl font-bold transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm hover:shadow-md ${getStatusColor(cls.status)}`}
                        >
                          <div className="flex items-center justify-center gap-2">
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
                          className={`flex-1 px-4 py-2.5 text-xs rounded-2xl font-bold transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm hover:shadow-md ${getPaymentColor(cls.paymentStatus)}`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {cls.paymentStatus === 'Pagado' && <CircleDollarSign className="h-3 w-3" />}
                            {cls.paymentStatus === 'No Pagado' && <CreditCard className="h-3 w-3" />}
                            {cls.paymentStatus}
                          </div>
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        {cls.meetingLink ? (
                          <>
                            <Button 
                              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl h-12 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                              onClick={() => window.open(cls.meetingLink, '_blank')}
                            >
                              <Video className="h-5 w-5 mr-2" />
                              Unirse
                            </Button>
                            <Button 
                              variant="outline"
                              className="px-4 bg-white/90 hover:bg-white border-emerald-200 hover:border-emerald-300 text-emerald-600 rounded-2xl h-12 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                              onClick={() => copyToClipboard(cls.meetingLink)}
                            >
                              <Copy className="h-5 w-5" />
                            </Button>
                          </>
                        ) : (
                          <Button 
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl h-12 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => {
                              console.log('Confirmar clase:', cls.id);
                            }}
                          >
                            <Calendar className="h-5 w-5 mr-2" />
                            Confirmar
                          </Button>
                        )}
                      </div>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[95vh] overflow-y-auto bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
            <div className="relative">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">✨ Nueva Clase</h2>
                    <p className="text-blue-100">Programa una nueva sesión con tu estudiante</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowNewClassModal(false)}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <div className="space-y-8">
                  {/* Student Info Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" />
                      Información del Estudiante
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentName" className="text-sm font-medium text-gray-700">Nombre del Estudiante</Label>
                        <Input
                          id="studentName"
                          value={newClassData.studentName}
                          onChange={(e) => setNewClassData({...newClassData, studentName: e.target.value})}
                          placeholder="Nombre completo"
                          className="h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentEmail" className="text-sm font-medium text-gray-700">Email del Estudiante</Label>
                        <Input
                          id="studentEmail"
                          type="email"
                          value={newClassData.studentEmail}
                          onChange={(e) => setNewClassData({...newClassData, studentEmail: e.target.value})}
                          placeholder="email@ejemplo.com"
                          className="h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label htmlFor="studentLevel" className="text-sm font-medium text-gray-700">Nivel</Label>
                      <Select 
                        value={newClassData.studentLevel} 
                        onValueChange={(value) => setNewClassData({...newClassData, studentLevel: value})}
                      >
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="Básico">🟢 Básico</SelectItem>
                          <SelectItem value="Intermedio">🟡 Intermedio</SelectItem>
                          <SelectItem value="Avanzado">🔴 Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Class Details Section */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      Detalles de la Clase
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="topic" className="text-sm font-medium text-gray-700">Tema de la Clase</Label>
                        <Input
                          id="topic"
                          value={newClassData.topic}
                          onChange={(e) => setNewClassData({...newClassData, topic: e.target.value})}
                          placeholder="Ej: Conversación Avanzada, Gramática, etc."
                          className="h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Fecha
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={newClassData.date}
                            onChange={(e) => setNewClassData({...newClassData, date: e.target.value})}
                            className="h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Hora
                          </Label>
                          <Select 
                            value={newClassData.time} 
                            onValueChange={(value) => setNewClassData({...newClassData, time: value})}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-green-400">
                              <SelectValue placeholder="Seleccionar hora" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl max-h-40">
                              {timeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Duración</Label>
                          <Select 
                            value={newClassData.duration} 
                            onValueChange={(value) => setNewClassData({...newClassData, duration: value})}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-green-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="30">⏱️ 30 minutos</SelectItem>
                              <SelectItem value="45">⏰ 45 minutos</SelectItem>
                              <SelectItem value="60">🕐 60 minutos</SelectItem>
                              <SelectItem value="90">⏳ 90 minutos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info Section */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Video className="h-5 w-5 text-purple-500" />
                      Información Adicional
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="meetingLink" className="text-sm font-medium text-gray-700">Enlace de Reunión (opcional)</Label>
                        <Input
                          id="meetingLink"
                          value={newClassData.meetingLink}
                          onChange={(e) => setNewClassData({...newClassData, meetingLink: e.target.value})}
                          placeholder="https://meet.google.com/... (se generará automáticamente si se deja vacío)"
                          className="h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notas</Label>
                        <Textarea
                          id="notes"
                          value={newClassData.notes}
                          onChange={(e) => setNewClassData({...newClassData, notes: e.target.value})}
                          placeholder="Notas adicionales sobre la clase..."
                          rows={3}
                          className="rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-all"
                    onClick={() => setShowNewClassModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleAddClass}
                    disabled={!newClassData.studentName || !newClassData.topic || !newClassData.date || !newClassData.time}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Crear Clase
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};