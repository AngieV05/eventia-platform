'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api-client'

interface User {
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = apiClient.getAccessToken()
    if (token) {
      // In a real app, you'd verify the token here
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error('[v0] Failed to parse stored user:', e)
        }
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.request<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, username: email, password })
      })

      if (response.success) {
        const userData: User = {
          email: email,
          role: 'usuario'
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        throw new Error(response.message || 'Error en la autenticación')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    apiClient.clearTokens()
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
