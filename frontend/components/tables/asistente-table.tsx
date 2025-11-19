'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'
import { AlertCircle, Loader } from 'lucide-react'

interface Asistente {
  id: string
  name: string
  email: string
  phone: string
  registration_date: string
  attended_events: number
}

export default function AsistenteTable() {
  const [data, setData] = useState<Asistente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiClient.request('/asistente/listar')
        setData(response.data || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar asistentes'
        setError(errorMessage)
        console.error('[v0] Error fetching asistentes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = data.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const itemsPerPage = 10
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  if (loading) {
    return (
      <div className="glass-card p-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-amber-200/30 mb-4">
            <Loader className="h-6 w-6 text-amber-600 animate-spin" />
          </div>
          <p className="text-foreground font-medium">Cargando asistentes...</p>
          <p className="text-muted-foreground text-sm mt-1">Por favor espera</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-6 border-l-4 border-destructive">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Error al cargar datos</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPage(1)
          }}
          className="w-full px-4 py-3 pl-4 bg-card/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-card/70">
                <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Teléfono</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Fecha Registro</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Eventos</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-card/40 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{item.name || '—'}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.email || '—'}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.phone || '—'}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.registration_date ? new Date(item.registration_date).toLocaleDateString('es-ES') : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        {item.attended_events || 0}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-muted-foreground">No hay datos disponibles</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-card/30">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-200 transition-all"
            >
              Anterior
            </button>
            <span className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-200 transition-all"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Mostrando {paginatedData.length} de {filteredData.length} asistentes
      </p>
    </div>
  )
}
