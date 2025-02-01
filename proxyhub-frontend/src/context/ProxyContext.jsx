import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { proxyApi } from '../services/api'
import { useAuth } from './AuthContext'

const ProxyContext = createContext(null)

export const ProxyProvider = ({ children }) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  // Query-Key mit userId
  const queryKey = ['proxies', user?.id]

  // Fetch proxies mit optimierter Konfiguration
  const { data: proxies = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await proxyApi.getAll()
      return data
    },
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    enabled: !!localStorage.getItem('token')
  })

  // Add proxy
  const { mutate: addProxy, isPending: isAddingProxy } = useMutation({
    mutationFn: proxyApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
      toast({ title: 'Proxy added successfully', status: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to add proxy', status: 'error' })
    }
  })

  // Update proxy
  const { mutate: updateProxy, isPending: isUpdating } = useMutation({
    mutationFn: async (data) => {
      if (!data.id) throw new Error('No ID provided for update')
      const { id, ...updateData } = data
      const response = await proxyApi.update(id, updateData)
      queryClient.setQueryData(queryKey, (old) => 
        old.map(p => p.id === id ? { ...p, ...updateData } : p)
      )
      return response
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    }
  })

  // Delete proxy
  const { mutate: deleteProxy, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const response = await proxyApi.delete(id)
      queryClient.setQueryData(queryKey, (old) => 
        old.filter(p => p.id !== id)
      )
      return response
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    }
  })

  // Toggle proxy status
  const { mutate: toggleProxyStatus, isPending: isToggling } = useMutation({
    mutationFn: async (id) => {
      const response = await proxyApi.toggleStatus(id)
      queryClient.setQueryData(queryKey, (old) => 
        old.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p)
      )
      return response
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    }
  })

  return (
    <ProxyContext.Provider 
      value={{
        proxies,
        isLoading,
        isAddingProxy,
        isUpdating,
        isDeleting,
        isToggling,
        addProxy,
        updateProxy,
        deleteProxy,
        toggleProxyStatus
      }}
    >
      {children}
    </ProxyContext.Provider>
  )
}

export const useProxies = () => {
  const context = useContext(ProxyContext)
  if (!context) {
    throw new Error('useProxies must be used within a ProxyProvider')
  }
  return context
} 