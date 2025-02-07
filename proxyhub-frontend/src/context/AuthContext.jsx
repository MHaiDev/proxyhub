import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'

const AuthContext = createContext(null)

// Token aus localStorage holen
const getStoredToken = () => localStorage.getItem('token')
const getStoredUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser)
  const [token, setToken] = useState(getStoredToken)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const queryClient = useQueryClient()

  // Token und User im localStorage speichern
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      // Echte API-Anfrage statt Mock
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setToken(data.token)
      setUser(data.user)
      // Cache leeren beim Login
      queryClient.clear()
      navigate('/dashboard')
      toast({
        title: 'Login successful',
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error'
      })
      setToken(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email, password, name) => {
    setIsLoading(true)
    try {
      // Echte API-Anfrage statt Mock
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setToken(data.token)
      setUser(data.user)
      navigate('/dashboard')
      toast({
        title: 'Registration successful',
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        status: 'error'
      })
      setToken(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    // Cache leeren beim Logout
    queryClient.clear()
    navigate('/login')
    toast({
      title: 'Logged out successfully',
      status: 'success'
    })
  }

  // Token-Validierung (später mit echter JWT-Validierung)
  const isValidToken = () => {
    return !!token
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: isValidToken()
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 