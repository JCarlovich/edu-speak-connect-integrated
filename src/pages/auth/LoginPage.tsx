
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoginLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await handleRegister();
      }
    } catch (err: any) {
      setError(err.message || (isLogin ? 'Error al iniciar sesión. Verifica tus credenciales.' : 'Error en el registro. Inténtalo de nuevo.'));
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async () => {
    // Validaciones
    if (!email || !password || !fullName) {
      throw new Error('Todos los campos obligatorios deben estar completos');
    }

    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (role === 'student' && !studentId) {
      throw new Error('El ID de estudiante es obligatorio');
    }

    // Llamada a la API de registro
    const registerData: any = {
      email,
      password,
      role,
      full_name: fullName
    };

    if (role === 'student') {
      registerData.student_id = studentId;
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
    setIsLogin(true);
    // Limpiar formulario
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setStudentId('');
  };

  const demoAccounts = [
    { email: 'teacher@demo.com', password: 'demo123', role: 'Profesor' },
    { email: 'student@demo.com', password: 'demo123', role: 'Estudiante' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white">
              <GraduationCap className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduTranscribe</h1>
          <p className="text-gray-600">Plataforma para profesores de idiomas</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre completo (solo registro) */}
            {!isLogin && (
              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre completo"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Rol (solo registro) */}
            {!isLogin && (
              <div>
                <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Usuario *
                </Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required={!isLogin}
                >
                  <option value="student">Estudiante</option>
                  <option value="teacher">Profesor</option>
                </select>
              </div>
            )}

            {/* ID de Estudiante (solo registro de estudiantes) */}
            {!isLogin && role === 'student' && (
              <div>
                <Label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                  ID de Estudiante *
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                  placeholder="STU-XXXXXX-XXX"
                  className="font-mono"
                  required={!isLogin && role === 'student'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Solicita este ID a tu profesor
                </p>
              </div>
            )}

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 6 caracteres
                </p>
              )}
            </div>

            {/* Confirm Password (solo registro) */}
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Messages */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
              disabled={loginLoading || isLoading}
            >
              {loginLoading 
                ? (isLogin ? 'Iniciando sesión...' : 'Registrando...') 
                : (isLogin ? 'Iniciar Sesión' : 'Registrarse')
              }
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Cuentas de demostración:</p>
            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                  className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{account.role}</p>
                      <p className="text-xs text-gray-500">{account.email}</p>
                    </div>
                    <p className="text-xs text-gray-400">Clic para usar</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
