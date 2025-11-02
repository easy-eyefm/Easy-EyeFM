import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/api/auth'

// Token management helpers
const TOKEN_KEY = 'auth_token'
const TOKEN_EXPIRY_KEY = 'auth_token_expiry'
const USER_KEY = 'auth_user'

const tokenManager = {
  // Persist token and expiration timestamp
  setToken(token, expiresInSeconds = 24 * 60 * 60) { // Default: 24 hours
    const expiryTime = Date.now() + (expiresInSeconds * 1000)
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
  },

  // Retrieve token
  getToken() {
    const token = localStorage.getItem(TOKEN_KEY)
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
    
    if (!token || !expiry) {
      return null
    }

    // Check for expiration
    if (Date.now() > parseInt(expiry)) {
      this.clearToken()
      return null
    }

    return token
  },

  // Determine whether the token will expire within an hour
  isTokenExpiringSoon() {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
    if (!expiry) return false
    
    const oneHour = 60 * 60 * 1000
    return Date.now() > (parseInt(expiry) - oneHour)
  },

  // Clear token data
  clearToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRY_KEY)
    localStorage.removeItem(USER_KEY)
  },

  // Persist user info
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  // Retrieve user info
  getUser() {
    const userStr = localStorage.getItem(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(tokenManager.getUser())
  const token = ref(tokenManager.getToken())
  const loading = ref(false)
  const autoRefreshTimer = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  // Start the background refresh timer
  const startAutoRefresh = () => {
    // Clear any existing timer
    if (autoRefreshTimer.value) {
      clearInterval(autoRefreshTimer.value)
    }

    // Re-check token status every 30 minutes
    autoRefreshTimer.value = setInterval(async () => {
      if (token.value && tokenManager.isTokenExpiringSoon()) {
        await refreshToken()
      }
    }, 30 * 60 * 1000) // 30 minutes
  }

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken()
      if (response.success && response.access_token) {
        token.value = response.access_token
        tokenManager.setToken(response.access_token)
        return true
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      await logout()
    }
    return false
  }

  const login = async (credentials) => {
    loading.value = true
    try {
      // Prepare payload in the format expected by the backend
      const loginData = {
        username: credentials.username,
        invite_code: credentials.invite_code
      }
      
      const response = await authService.login(loginData)
      if (response.success) {
        user.value = response.user
        token.value = response.access_token || response.token
        
        // Persist token and user data locally
        tokenManager.setToken(response.access_token || response.token)
        tokenManager.setUser(response.user)
        
        // Start the refresh cycle
        startAutoRefresh()
        
        return { success: true }
      } else {
        return { 
          success: false, 
          message: response.message || response.detail || 'Login failed, please try again' 
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.response?.data?.detail || error.response?.data?.message || error.message || 'Login failed, please try again' 
      }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      // Prepare payload in the format expected by the backend
      const registerData = {
        username: userData.username,
        full_name: userData.full_name,
        invite_code: userData.invite_code
      }
      
      const response = await authService.register(registerData)
      if (response.success) {
        // Do not auto-login; require a manual sign-in
        return { success: true, message: response.message || 'Registration successful, please sign in' }
      } else {
        return { 
          success: false, 
          message: response.message || response.detail || 'Registration failed, please try again' 
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        message: error.response?.data?.detail || error.response?.data?.message || error.message || 'Registration failed, please try again' 
      }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      // Attempt to notify the backend about logout
      await authService.logout()
    } catch (error) {
      console.error('Logout request failed:', error)
    }
    
    // Reset local state
    user.value = null
    token.value = null
    tokenManager.clearToken()
    
    // Clear the auto-refresh timer
    if (autoRefreshTimer.value) {
      clearInterval(autoRefreshTimer.value)
      autoRefreshTimer.value = null
    }
  }

  const checkAuth = async () => {
    if (!token.value) return false
    
    try {
      const response = await authService.getCurrentUser()
      if (response.success && response.user) {
        user.value = response.user
        tokenManager.setUser(response.user)
        
        // Start auto refresh
        startAutoRefresh()
        return true
      }
    } catch (error) {
      console.error('Failed to verify user identity:', error)
      await logout()
    }
    return false
  }

  // Validate token on initialization
  const initialize = async () => {
    const savedToken = tokenManager.getToken()
    if (savedToken) {
      token.value = savedToken
      user.value = tokenManager.getUser()
      
      // Validate token authenticity
      const isValid = await checkAuth()
      if (isValid) {
        startAutoRefresh()
      }
    }
  }

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    loading: computed(() => loading.value),
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    refreshToken,
    initialize
  }
})
