'use client'

import { useState } from 'react'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, X } from 'lucide-react'

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onEventCreated: () => void
}

export default function CreateEventModal({
  isOpen,
  onClose,
  onEventCreated,
}: CreateEventModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<{
    title?: string
    date?: string
  }>({})

  const validateForm = () => {
    const errors: { title?: string; date?: string } = {}

    if (!title.trim()) {
      errors.title = 'El título es requerido'
    }

    if (!date) {
      errors.date = 'La fecha es requerida'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) return

    setLoading(true)

    try {
      await apiClient.request('/events', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          date,
        }),
      })

      // Reset form
      setTitle('')
      setDescription('')
      setDate('')
      onEventCreated()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear el evento'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Crear Evento</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4 border border-destructive/30">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="font-medium text-destructive text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Título del Evento
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (validationErrors.title) setValidationErrors({ ...validationErrors, title: undefined })
              }}
              placeholder="Nombre del evento"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {validationErrors.title && (
              <p className="mt-2 text-sm text-destructive">{validationErrors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles del evento..."
              rows={3}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
              Fecha del Evento
            </label>
            <input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                if (validationErrors.date) setValidationErrors({ ...validationErrors, date: undefined })
              }}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {validationErrors.date && (
              <p className="mt-2 text-sm text-destructive">{validationErrors.date}</p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-border">
          <Button
            type="button"
            onClick={onClose}
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? 'Creando...' : 'Crear Evento'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
