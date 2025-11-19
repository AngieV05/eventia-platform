'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { Card } from '@/components/ui/card'
import { AlertCircle, Calendar, Loader2 } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  description?: string
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.request<{ data: Event[] }>('/events')
      setEvents(response.data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar eventos'
      setError(message)
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground">Cargando eventos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-destructive mb-1">Error al cargar eventos</h3>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      </Card>
    )
  }

  if (events.length === 0) {
    return (
      <Card className="border border-border bg-card/50 p-12">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-semibold text-foreground mb-1">No hay eventos</h3>
          <p className="text-sm text-muted-foreground">
            Crea tu primer evento haciendo clic en el botón "Crear Evento"
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card
          key={event.id}
          className="border border-border bg-card hover:bg-card/80 transition-colors p-6 flex flex-col"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-foreground text-lg line-clamp-2">{event.title}</h3>
          </div>

          {event.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
            <Calendar className="h-4 w-4" />
            <time>{new Date(event.date).toLocaleDateString('es-ES')}</time>
          </div>
        </Card>
      ))}
    </div>
  )
}
