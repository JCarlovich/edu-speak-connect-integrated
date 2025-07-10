
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  BookOpen,
  BarChart3,
  User,
  LogOut,
  GraduationCap,
  Settings,
  HelpCircle,
  CreditCard,
  UserCircle,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

const teacherNavItems = [
  { title: 'Clases', url: '/', icon: Calendar },
  { title: 'Estudiantes', url: '/students', icon: Users },
];

const studentNavItems = [
  { title: 'Dashboard', url: '/student', icon: LayoutDashboard },
  { title: 'Mis Clases', url: '/student/classes', icon: Calendar },
  { title: 'Deberes', url: '/student/homework', icon: BookOpen },
  { title: 'Progreso', url: '/student/progress', icon: BarChart3 },
  { title: 'Materiales', url: '/student/materials', icon: FileText },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsProfileOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (!user) return null;

  const navItems = user.role === 'teacher' ? teacherNavItems : studentNavItems;
  
  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-blue-100 text-blue-900 font-medium' : 'hover:bg-gray-100';

  return (
    <Sidebar className="w-64 border-r bg-white">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-bold">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">EduTranscribe</h2>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClassName}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button - Clickeable */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
          >
            <img 
              src={user.avatar} 
              alt={user.name}
              className="h-10 w-10 rounded-full ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
              {isProfileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
              {/* User Info Header */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-12 w-12 rounded-full ring-2 ring-blue-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full mt-1">
                      {user.role === 'teacher' ? 'Profesor' : 'Estudiante'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Options */}
              <div className="py-2">
                <button 
                  onClick={() => handleNavigate('/profile')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserCircle className="h-4 w-4 text-gray-500" />
                  <span>Mi Perfil</span>
                </button>
                
                <button 
                  onClick={() => handleNavigate('/settings')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span>Configuración</span>
                </button>
                
                {user.role === 'teacher' && (
                  <button 
                    onClick={() => handleNavigate('/billing')}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span>Facturación</span>
                  </button>
                )}
                
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                  <span>Ayuda</span>
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
