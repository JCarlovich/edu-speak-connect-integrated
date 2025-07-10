import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CreditCard, 
  Download, 
  Eye, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  FileText,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Datos de ejemplo - en una implementación real vendrían de la API
  const billingStats = {
    totalEarnings: 2850,
    thisMonth: 890,
    pendingPayouts: 156,
    paidInvoices: 12,
    pendingInvoices: 3
  };

  const invoices = [
    {
      id: 'INV-001',
      date: '2025-01-08',
      amount: 450,
      status: 'paid',
      description: 'Clases de Enero - Semana 1',
      student: 'Ana Martínez'
    },
    {
      id: 'INV-002',
      date: '2025-01-05',
      amount: 280,
      status: 'paid',
      description: 'Clases de Diciembre - Semana 4',
      student: 'Carlos López'
    },
    {
      id: 'INV-003',
      date: '2025-01-03',
      amount: 160,
      status: 'pending',
      description: 'Clases de Enero - Semana 1',
      student: 'María González'
    },
    {
      id: 'INV-004',
      date: '2024-12-28',
      amount: 320,
      status: 'paid',
      description: 'Clases de Diciembre - Semana 3',
      student: 'Pedro Ruiz'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
      expiryMonth: 12,
      expiryYear: 2026
    },
    {
      id: 2,
      type: 'bank',
      bank: 'Banco Santander',
      last4: '1234',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Facturación</h1>
          <p className="text-gray-600">Gestiona tus ingresos, facturas y métodos de pago</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Factura
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-4 right-4 opacity-20">
              <DollarSign className="h-8 w-8" />
            </div>
            <div className="relative z-10">
              <p className="text-emerald-100 text-sm font-medium mb-1">Ingresos Totales</p>
              <p className="text-3xl font-bold">€{billingStats.totalEarnings.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-200" />
                <span className="text-emerald-100 text-xs">+12% este mes</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-4 right-4 opacity-20">
              <Calendar className="h-8 w-8" />
            </div>
            <div className="relative z-10">
              <p className="text-blue-100 text-sm font-medium mb-1">Este Mes</p>
              <p className="text-3xl font-bold">€{billingStats.thisMonth}</p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-blue-200" />
                <span className="text-blue-100 text-xs">Enero 2025</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-4 right-4 opacity-20">
              <FileText className="h-8 w-8" />
            </div>
            <div className="relative z-10">
              <p className="text-purple-100 text-sm font-medium mb-1">Facturas Pagadas</p>
              <p className="text-3xl font-bold">{billingStats.paidInvoices}</p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="h-4 w-4 text-purple-200" />
                <span className="text-purple-100 text-xs">{billingStats.pendingInvoices} pendientes</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-4 right-4 opacity-20">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div className="relative z-10">
              <p className="text-orange-100 text-sm font-medium mb-1">Pendiente de Cobro</p>
              <p className="text-3xl font-bold">€{billingStats.pendingPayouts}</p>
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle className="h-4 w-4 text-orange-200" />
                <span className="text-orange-100 text-xs">Próximo pago: 15 Enero</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoices List */}
        <div className="lg:col-span-2">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Facturas Recientes
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod('week')}
                    className="rounded-lg"
                  >
                    Semana
                  </Button>
                  <Button
                    variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod('month')}
                    className="rounded-lg"
                  >
                    Mes
                  </Button>
                  <Button
                    variant={selectedPeriod === 'year' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod('year')}
                    className="rounded-lg"
                  >
                    Año
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{invoice.id}</h4>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                        <p className="text-xs text-gray-500">{invoice.student}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">€{invoice.amount}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{new Date(invoice.date).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="rounded-xl">
                  Ver Todas las Facturas
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Methods & Quick Actions */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 border-b">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-500" />
                Métodos de Pago
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {method.type === 'card' ? method.brand : method.bank}
                      </p>
                      <p className="text-sm text-gray-500">
                        **** {method.last4}
                        {method.type === 'card' && ` • ${method.expiryMonth}/${method.expiryYear}`}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                      Por defecto
                    </span>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Método de Pago
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b">
              <h3 className="text-lg font-bold text-gray-900">Acciones Rápidas</h3>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-xl h-12">
                <Download className="h-4 w-4 mr-3" />
                Descargar Informe Fiscal
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl h-12">
                <FileText className="h-4 w-4 mr-3" />
                Generar Factura
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl h-12">
                <ExternalLink className="h-4 w-4 mr-3" />
                Portal de Stripe
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};