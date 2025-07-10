import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Plus, Search, Filter, MoreVertical, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClasses } from '@/contexts/ClassesContext';

export const ClassesPage: React.FC = () => {
  const { classes, updateClass } = useClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todas');

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Todas' || cls.status === filterStatus;
    return matchesSearch && matchesFilter;
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
        <Button className="bg-blue-500 hover:bg-blue-600">
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
                          <h3 className="font-semibold text-gray-900">{cls.studentName}</h3>
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
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1">Estado de la clase</label>
                        <Select 
                          value={cls.status} 
                          onValueChange={(value) => updateClass(cls.id, { status: value })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Programada">Programada</SelectItem>
                            <SelectItem value="Completada">Completada</SelectItem>
                            <SelectItem value="No Realizada">No Realizada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1">Estado de pago</label>
                        <Select 
                          value={cls.paymentStatus} 
                          onValueChange={(value) => updateClass(cls.id, { paymentStatus: value })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pagado">Pagado</SelectItem>
                            <SelectItem value="No Pagado">No Pagado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex gap-2 mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(cls.status)}`}>
                        {cls.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPaymentColor(cls.paymentStatus)}`}>
                        {cls.paymentStatus}
                      </span>
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
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Clase
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};