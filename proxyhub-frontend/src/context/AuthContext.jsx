import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      // Später durch echte API ersetzen
      if (email === 'test@test.com' && password === 'test123') {
        setUser({ email, name: 'Test User' })
        navigate('/dashboard')
        toast({
          title: 'Login successful',
          status: 'success'
        })
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email, password, name) => {
    setIsLoading(true)
    try {
      // Später durch echte API ersetzen
      setUser({ email, name })
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
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    navigate('/')
    toast({
      title: 'Logged out successfully',
      status: 'success'
    })
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user
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