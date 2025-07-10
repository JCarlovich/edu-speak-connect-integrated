import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, Calendar, MapPin, BookOpen, Save, Edit, Camera } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    bio: 'Profesor de español con más de 5 años de experiencia enseñando a estudiantes internacionales.',
    experience: '5 años',
    specialties: 'Conversación, Gramática, Preparación DELE',
    hourlyRate: '25',
    languages: 'Español (Nativo), Inglés (Avanzado), Francés (Intermedio)'
  });

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos
    setIsEditing(false);
    console.log('Guardando perfil:', profileData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información personal y profesional</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Photo & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full mx-auto ring-4 ring-blue-200 shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
              <p className="text-gray-600 mb-1">{profileData.email}</p>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-full">
                Profesor Activo
              </span>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Estadísticas Rápidas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-emerald-100">Estudiantes:</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Clases Completadas:</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Calificación:</span>
                  <span className="font-semibold">4.9/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Experiencia:</span>
                  <span className="font-semibold">{profileData.experience}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Información Personal
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">Ubicación</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Biografía</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                  className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all resize-none"
                  placeholder="Cuéntanos sobre ti y tu experiencia como profesor..."
                />
              </div>
            </div>
          </Card>

          {/* Professional Information */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 border-b">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Información Profesional
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700">Años de Experiencia</Label>
                  <Input
                    id="experience"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                    disabled={!isEditing}
                    className="h-12 rounded-xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700">Tarifa por Hora (€)</Label>
                  <Input
                    id="hourlyRate"
                    value={profileData.hourlyRate}
                    onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                    disabled={!isEditing}
                    className="h-12 rounded-xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialties" className="text-sm font-medium text-gray-700">Especialidades</Label>
                <Input
                  id="specialties"
                  value={profileData.specialties}
                  onChange={(e) => setProfileData({...profileData, specialties: e.target.value})}
                  disabled={!isEditing}
                  className="h-12 rounded-xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all"
                  placeholder="Ej: Conversación, Gramática, Preparación DELE"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages" className="text-sm font-medium text-gray-700">Idiomas</Label>
                <Input
                  id="languages"
                  value={profileData.languages}
                  onChange={(e) => setProfileData({...profileData, languages: e.target.value})}
                  disabled={!isEditing}
                  className="h-12 rounded-xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all"
                  placeholder="Ej: Español (Nativo), Inglés (Avanzado)"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};