
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  BookOpen,
  BarChart3,
  User,
  LogOut,
  GraduationCap
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
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Estudiantes', url: '/students', icon: Users },
  { title: 'Clases', url: '/classes', icon: Calendar },
  { title: 'Transcripciones', url: '/transcripts', icon: FileText },
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
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
