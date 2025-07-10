import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertCircle, Target, Check, X, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data for homework and summaries
const initialHomework = [
  {
    id: 1,
    classId: 1,
    title: 'Conjugación de verbos irregulares',
    assigned: '2024-03-12',
    dueDate: '2024-03-15',
    status: 'Completado',
    score: 9.0,
    type: 'Ejercicios'
  },
  {
    id: 2,
    classId: 1,
    title: 'Redacción: Mi rutina diaria',
    assigned: '2024-03-10',
    dueDate: '2024-03-14',
    status: 'Pendiente',
    score: null,
    type: 'Ensayo'
  },
  {
    id: 3,
    classId: 2,
    title: 'Ejercicios de listening',
    assigned: '2024-03-08',
    dueDate: '2024-03-16',
    status: 'Pendiente',
    score: null,
    type: 'Audio'
  },
  {
    id: 4,
    classId: 3,
    title: 'Práctica de conversación',
    assigned: '2024-03-05',
    dueDate: '2024-03-12',
    status: 'Completado',
    score: 8.5,
    type: 'Oral'
  }
];

const summaries = [
  {
    id: 1,
    classId: 1,
    classDate: '2024-03-10',
    topic: 'Pretérito perfecto vs imperfecto',
    duration: '60 min',
    achievements: ['Dominio de conjugaciones básicas', 'Mejora en pronunciación'],
    weaknesses: ['Confusión en usos específicos', 'Velocidad de habla'],
    nextFocus: 'Práctica conversacional con tiempos pasados'
  },
  {
    id: 2,
    classId: 2,
    classDate: '2024-03-05',
    topic: 'Conversación libre',
    duration: '45 min',
    achievements: ['Fluidez mejorada', 'Vocabulario más rico'],
    weaknesses: ['Algunos errores de concordancia'],
    nextFocus: 'Práctica de concordancia de género y número'
  },
  {
    id: 3,
    classId: 3,
    classDate: '2024-03-01',
    topic: 'Gramática: ser vs estar',
    duration: '60 min',
    achievements: ['Comprende la diferencia conceptual', 'Aplicación correcta en ejercicios'],
    weaknesses: ['Dudas en contextos específicos', 'Velocidad de decisión'],
    nextFocus: 'Práctica contextual intensiva'
  }
];

export const StudentHomeworkPage: React.FC = () => {
  const [homework, setHomework] = useState(initialHomework);
  const { toast } = useToast();

  const toggleHomeworkStatus = (homeworkId: number) => {
    setHomework(prev => prev.map(hw => {
      if (hw.id === homeworkId) {
        const newStatus = hw.status === 'Completado' ? 'Pendiente' : 'Completado';
        const newScore = newStatus === 'Completado' ? (hw.score || 8.0) : null;
        
        toast({
          title: newStatus === 'Completado' ? "¡Deber completado!" : "Deber marcado como pendiente",
          description: `${hw.title} ha sido marcado como ${newStatus.toLowerCase()}`,
        });
        
        return {
          ...hw,
          status: newStatus,
          score: newScore
        };
      }
      return hw;
    }));
  };

  const completedHomework = homework.filter(hw => hw.status === 'Completado').length;
  const pendingHomework = homework.filter(hw => hw.status === 'Pendiente').length;
  const totalHomework = homework.length;
  const completionRate = Math.round((completedHomework / totalHomework) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Deberes y Resúmenes</h1>
        <p className="text-gray-600">Gestiona tus tareas y revisa tu progreso académico</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deberes Completados</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{completedHomework}</p>
              <p className="text-sm text-gray-500 mt-1">de {totalHomework} total</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deberes Pendientes</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{pendingHomework}</p>
              <p className="text-sm text-gray-500 mt-1">por completar</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa de Completado</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{completionRate}%</p>
              <p className="text-sm text-gray-500 mt-1">progreso general</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="homework" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="homework">Mis Deberes</TabsTrigger>
          <TabsTrigger value="summaries">Resúmenes de Progreso</TabsTrigger>
        </TabsList>

        {/* Homework Tab */}
        <TabsContent value="homework">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                Deberes Asignados
              </h3>
              <div className="text-sm text-gray-500">
                {completedHomework} de {totalHomework} completados
              </div>
            </div>
            
            <div className="space-y-4">
              {homework.map((hw) => (
                <div key={hw.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{hw.title}</h4>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={hw.status === 'Completado' ? "default" : "destructive"}
                        className={hw.status === 'Completado' ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}
                      >
                        {hw.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant={hw.status === 'Completado' ? "outline" : "default"}
                        onClick={() => toggleHomeworkStatus(hw.id)}
                        className={`transition-all duration-200 animate-fade-in ${
                          hw.status === 'Completado' 
                            ? 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200' 
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                      >
                        {hw.status === 'Completado' ? (
                          <>
                            <X className="h-4 w-4 mr-1" />
                            Marcar Pendiente
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Marcar Completado
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Tipo:</span>
                      <Badge variant="outline" className="text-xs">{hw.type}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Asignado:</span> {new Date(hw.assigned).toLocaleDateString('es-ES')}
                    </div>
                    <div>
                      <span className="font-medium">Vence:</span> {new Date(hw.dueDate).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Calificación:</span>
                      {hw.score ? (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {hw.score}/10
                        </Badge>
                      ) : (
                        <span className="text-gray-400">Pendiente</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Summaries Tab */}
        <TabsContent value="summaries">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              Resúmenes de Progreso
            </h3>
            
            <div className="space-y-6">
              {summaries.map((summary) => (
                <div key={summary.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{summary.topic}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(summary.classDate).toLocaleDateString('es-ES')} • {summary.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="flex items-center gap-2 font-medium text-emerald-700 mb-3">
                        <CheckCircle2 className="h-4 w-4" />
                        Logros Alcanzados
                      </h5>
                      <ul className="space-y-2">
                        {summary.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="flex items-center gap-2 font-medium text-orange-700 mb-3">
                        <AlertCircle className="h-4 w-4" />
                        Áreas de Mejora
                      </h5>
                      <ul className="space-y-2">
                        {summary.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h5 className="flex items-center gap-2 font-medium text-blue-700 mb-2">
                      <Target className="h-4 w-4" />
                      Próximo Enfoque
                    </h5>
                    <p className="text-sm text-blue-600">{summary.nextFocus}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};