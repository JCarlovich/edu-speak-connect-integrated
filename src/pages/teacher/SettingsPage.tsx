import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Clock, 
  Mail, 
  Smartphone, 
  Eye, 
  EyeOff,
  Save,
  Trash2
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    classReminders: true,
    marketingEmails: false,
    
    // Privacy
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    
    // Preferences
    language: 'es',
    timezone: 'Europe/Madrid',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveSettings = () => {
    console.log('Guardando configuraciones:', settings);
    // Aquí iría la lógica para guardar las configuraciones
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Cambiando contraseña');
    // Aquí iría la lógica para cambiar la contraseña
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Eliminando cuenta');
      // Aquí iría la lógica para eliminar la cuenta
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p className="text-gray-600">Gestiona tus preferencias y configuración de la cuenta</p>
        </div>
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3"
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              Notificaciones
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Notificaciones por Email</Label>
                <p className="text-xs text-gray-500 mt-1">Recibe notificaciones importantes por correo</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Notificaciones Push</Label>
                <p className="text-xs text-gray-500 mt-1">Recibe notificaciones en tiempo real</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Recordatorios de Clases</Label>
                <p className="text-xs text-gray-500 mt-1">Recordatorios 15 min antes de las clases</p>
              </div>
              <Switch
                checked={settings.classReminders}
                onCheckedChange={(checked) => setSettings({...settings, classReminders: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Emails de Marketing</Label>
                <p className="text-xs text-gray-500 mt-1">Recibe consejos y novedades de la plataforma</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings({...settings, marketingEmails: checked})}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 border-b">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-500" />
              Privacidad
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Perfil Público</Label>
                <p className="text-xs text-gray-500 mt-1">Tu perfil es visible para otros usuarios</p>
              </div>
              <Switch
                checked={settings.profileVisibility}
                onCheckedChange={(checked) => setSettings({...settings, profileVisibility: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Mostrar Email</Label>
                <p className="text-xs text-gray-500 mt-1">Tu email es visible en tu perfil público</p>
              </div>
              <Switch
                checked={settings.showEmail}
                onCheckedChange={(checked) => setSettings({...settings, showEmail: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Mostrar Teléfono</Label>
                <p className="text-xs text-gray-500 mt-1">Tu teléfono es visible en tu perfil público</p>
              </div>
              <Switch
                checked={settings.showPhone}
                onCheckedChange={(checked) => setSettings({...settings, showPhone: checked})}
              />
            </div>
          </div>
        </Card>

        {/* Appearance & Language */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-500" />
              Preferencias
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Modo Oscuro</Label>
                <p className="text-xs text-gray-500 mt-1">Usa el tema oscuro para la interfaz</p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Moon className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Idioma</Label>
              <select 
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-400/20 focus:border-purple-400 transition-all"
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Zona Horaria</Label>
              <select 
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-400/20 focus:border-purple-400 transition-all"
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              >
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
                <option value="Europe/London">London (GMT+0)</option>
                <option value="America/New_York">New York (GMT-5)</option>
                <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Seguridad
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Change Password */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Cambiar Contraseña</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Contraseña Actual</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-400/20 transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Nueva Contraseña</Label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-400/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</Label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-400/20 transition-all"
                  />
                </div>
                <Button
                  onClick={handleChangePassword}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl h-12"
                  disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  Cambiar Contraseña
                </Button>
              </div>
            </div>

            {/* Two Factor Auth */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700">Autenticación de Dos Factores</Label>
                <p className="text-xs text-gray-500 mt-1">Aumenta la seguridad de tu cuenta</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
              />
            </div>

            {/* Delete Account */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Zona de Peligro</h4>
              <p className="text-sm text-gray-600 mb-4">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten certeza.
              </p>
              <Button
                onClick={handleDeleteAccount}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl h-12"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Cuenta
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};