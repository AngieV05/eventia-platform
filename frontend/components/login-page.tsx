'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { AlertCircle, Calendar, Users, Briefcase, Mail, Lock, LogIn } from 'lucide-react'

type UserRole = 'organizador' | 'proveedor' | 'asistente'

export default function LoginPage() {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [userRole, setUserRole] = useState<UserRole>('organizador')
  const [validationErrors, setValidationErrors] = useState<{
    email?: string
    password?: string
    username?: string
  }>({})

  const validateForm = () => {
    const errors: { email?: string; password?: string; username?: string } = {}

    if (!email) {
      errors.email = 'El correo es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Por favor ingresa un correo válido'
    }

    if (!username) {
      errors.username = 'El usuario es requerido'
    } else if (username.length < 3) {
      errors.username = 'El usuario debe tener al menos 3 caracteres'
    }

    if (!password) {
      errors.password = 'La contraseña es requerida'
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await login(email, password)
    } catch (err) {
      // Error is already handled and displayed
    }
  }

  const roleTitles: Record<UserRole, string> = {
    organizador: 'Organizador',
    proveedor: 'Proveedor',
    asistente: 'Asistente'
  }

  const roleDescriptions: Record<UserRole, string> = {
    organizador: 'Gestiona eventos y coordinadores',
    proveedor: 'Ofrece servicios para eventos',
    asistente: 'Participa en eventos'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-green-700 flex relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-400/30 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-sky-500/25 to-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-b from-cyan-400/15 to-green-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Left Column - Platform Info */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative z-10">
        <div>
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-sky-500/40 animate-bounce">
              <span className="text-white text-3xl font-bold">EP</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 text-balance drop-shadow-lg">Eventía Platform</h1>
            <p className="text-xl text-green-100 leading-relaxed max-w-md font-medium drop-shadow">
              Sistema integral para la planificación y ejecución de eventos, coordinando organizadores, proveedores y participantes.
            </p>
          </div>

          {/* Features with vibrant styling */}
          <div className="space-y-6">
            <div className="flex gap-4 glass-card p-6 hover-lift">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-sky-300/30 to-sky-200/20 border-2 border-sky-400/60">
                  <Calendar className="h-7 w-7 text-sky-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Gestión de Eventos</h3>
                <p className="text-gray-600">Organiza conferencias, talleres y agendas</p>
              </div>
            </div>

            <div className="flex gap-4 glass-card p-6 hover-lift">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-300/30 to-cyan-200/20 border-2 border-cyan-400/60">
                  <Briefcase className="h-7 w-7 text-cyan-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Coordinación de Proveedores</h3>
                <p className="text-gray-600">Gestiona catering, logística y equipamiento</p>
              </div>
            </div>

            <div className="flex gap-4 glass-card p-6 hover-lift">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-300/30 to-blue-200/20 border-2 border-blue-400/60">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Registro de Participantes</h3>
                <p className="text-gray-600">Suscripciones y emisión de credenciales</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-green-100 text-sm font-medium drop-shadow">
          © 2025 Eventía Platform. Todos los derechos reservados.
        </p>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Iniciar Sesión</h2>
            <p className="text-green-50 text-lg text-balance font-medium">Seleccione su tipo de perfil para acceder a la plataforma</p>
          </div>

          <div className="flex gap-3 mb-8 bg-white/80 p-2 rounded-2xl border-2 border-sky-300/40 backdrop-blur-sm shadow-lg">
            {(['organizador', 'proveedor', 'asistente'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                  userRole === role
                    ? 'bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white shadow-lg shadow-black/40 scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                {roleTitles[role]}
              </button>
            ))}
          </div>

          <p className="text-xs text-green-100 mb-6 flex items-center gap-2 font-semibold drop-shadow">
            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"></span>
            {roleDescriptions[userRole]}
          </p>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 border-2 border-red-200 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white mb-2 flex items-center gap-2 drop-shadow">
                <Mail className="h-4 w-4 text-sky-300" />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined })
                }}
                placeholder="tu@empresa.com"
                className="w-full px-4 py-3 bg-white/90 border-2 border-sky-300/40 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all backdrop-blur-sm"
              />
              {validationErrors.email && (
                <p className="mt-2 text-sm text-red-300 flex items-center gap-1 font-semibold drop-shadow">
                  <AlertCircle className="h-3 w-3" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-bold text-white mb-2 flex items-center gap-2 drop-shadow">
                <Users className="h-4 w-4 text-cyan-300" />
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (validationErrors.username) setValidationErrors({ ...validationErrors, username: undefined })
                }}
                placeholder="tu_usuario"
                className="w-full px-4 py-3 bg-white/90 border-2 border-cyan-300/40 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all backdrop-blur-sm"
              />
              {validationErrors.username && (
                <p className="mt-2 text-sm text-red-300 flex items-center gap-1 font-semibold drop-shadow">
                  <AlertCircle className="h-3 w-3" />
                  {validationErrors.username}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-white mb-2 flex items-center gap-2 drop-shadow">
                <Lock className="h-4 w-4 text-blue-300" />
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (validationErrors.password) setValidationErrors({ ...validationErrors, password: undefined })
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/90 border-2 border-blue-300/40 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm"
              />
              {validationErrors.password && (
                <p className="mt-2 text-sm text-red-300 flex items-center gap-1 font-semibold drop-shadow">
                  <AlertCircle className="h-3 w-3" />
                  {validationErrors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-xl"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Entrar como {roleTitles[userRole]}
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-green-100 font-semibold drop-shadow">
            Para testing, usa cualquier email y contraseña válidos
          </p>
        </div>
      </div>
    </div>
  )
}
