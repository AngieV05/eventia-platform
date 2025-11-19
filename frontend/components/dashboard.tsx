'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import ProveedorTable from './tables/proveedor-table'
import OrganizadorTable from './tables/organizador-table'
import AsistenteTable from './tables/asistente-table'
import { Button } from '@/components/ui/button'
import { LogOut, Grid, BarChart3, Zap } from 'lucide-react'

type TabType = 'proveedor' | 'organizador' | 'asistente'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('proveedor')

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'proveedor', label: 'Proveedores', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'organizador', label: 'Organizadores', icon: <Grid className="h-4 w-4" /> },
    { id: 'asistente', label: 'Asistentes', icon: <Grid className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-green-700">
      <header className="border-b-2 border-sky-300/30 bg-gradient-to-r from-green-700/80 via-green-600/80 to-green-700/80 backdrop-blur-xl sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-400/40">
                <Zap className="text-white font-bold text-xl" />
              </div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Eventía Platform</h1>
            </div>
            <p className="text-sm text-green-100 font-semibold drop-shadow">Bienvenido, <span className="text-sky-200 font-bold">{user?.email}</span></p>
          </div>
          <Button
            onClick={logout}
            className="gap-2 border-2 border-sky-300/50 bg-gradient-to-r from-gray-900 to-black hover:bg-gray-900/80 text-white font-bold rounded-xl"
            variant="outline"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-8 border-l-4 border-sky-400 hover-lift">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Sección Activa</p>
            <h3 className="text-3xl font-bold text-green-600 capitalize drop-shadow">{activeTab}s</h3>
            <p className="text-xs text-sky-600 mt-3 font-bold">Gestiona tu información</p>
          </div>
          <div className="glass-card p-8 border-l-4 border-cyan-400 hover-lift">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Total de Registros</p>
            <h3 className="text-3xl font-bold text-cyan-600 drop-shadow">—</h3>
            <p className="text-xs text-cyan-600 mt-3 font-bold">Cargando datos...</p>
          </div>
          <div className="glass-card p-8 border-l-4 border-blue-400 hover-lift">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Estado</p>
            <h3 className="text-3xl font-bold text-blue-600 drop-shadow">Activo</h3>
            <p className="text-xs text-blue-600 mt-3 font-bold">Sistema operacional</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-3 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 shadow-md ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white shadow-lg shadow-black/40 scale-105'
                    : 'bg-white text-gray-600 hover:text-gray-900 border-2 border-sky-300/40 hover:border-sky-400/60'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in">
          {activeTab === 'proveedor' && <ProveedorTable />}
          {activeTab === 'organizador' && <OrganizadorTable />}
          {activeTab === 'asistente' && <AsistenteTable />}
        </div>
      </main>
    </div>
  )
}
