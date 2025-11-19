interface TokenData {
  access_token: string
  refresh_token: string
  expires_in: number
}

const API_BASE_URL = 'http://localhost:8000'

class ApiClient {
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private tokenExpiration: number | null = null

  constructor() {
    this.loadTokensFromStorage()
  }

  private loadTokensFromStorage() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token')
      this.refreshToken = localStorage.getItem('refresh_token')
      const expiration = localStorage.getItem('token_expiration')
      this.tokenExpiration = expiration ? parseInt(expiration) : null
    }
  }

  private saveTokensToStorage(data: TokenData) {
    this.accessToken = data.access_token
    this.refreshToken = data.refresh_token
    this.tokenExpiration = Date.now() + data.expires_in * 1000

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('token_expiration', this.tokenExpiration.toString())
    }
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      })

      if (!response.ok) {
        this.clearTokens()
        return false
      }

      const data = await response.json()
      this.accessToken = data.access_token
      this.tokenExpiration = Date.now() + data.expires_in * 1000

      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('token_expiration', this.tokenExpiration.toString())
      }

      return true
    } catch (error) {
      console.error('Token refresh failed:', error)
      this.clearTokens()
      return false
    }
  }

  private isTokenExpired(): boolean {
    if (!this.tokenExpiration) return true
    return Date.now() > this.tokenExpiration - 60000 // Refresh 1 minute before expiration
  }

  private async getValidToken(): Promise<string | null> {
    if (this.isTokenExpired()) {
      const refreshed = await this.refreshAccessToken()
      if (!refreshed) return null
    }
    return this.accessToken
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getValidToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      this.clearTokens()
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  setTokens(data: TokenData) {
    this.saveTokensToStorage(data)
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  hasToken(): boolean {
    return !!this.accessToken
  }

  clearTokens() {
    this.accessToken = null
    this.refreshToken = null
    this.tokenExpiration = null

    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('token_expiration')
    }
  }
}

export const apiClient = new ApiClient()
