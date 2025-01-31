import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { proxyApi } from '../services/api'

const ProxyContext = createContext(null)

export const ProxyProvider = ({ children }) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  // Fetch proxies
  const { data: proxies = [] } = useQuery({
    queryKey: ['proxies'],
    queryFn: proxyApi.getAll
  })

  // Add proxy
  const { mutate: addProxy } = useMutation({
    mutationFn: proxyApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['proxies'])
      toast({ title: 'Proxy added successfully', status: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to add proxy', status: 'error' })
    }
  })

  // Update proxy
  const { mutate: updateProxy } = useMutation({
    mutationFn: ({ id, ...data }) => proxyApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['proxies'])
      toast({ title: 'Proxy updated successfully', status: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to update proxy', status: 'error' })
    }
  })

  // Delete proxy
  const { mutate: deleteProxy } = useMutation({
    mutationFn: proxyApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['proxies'])
      toast({ title: 'Proxy deleted successfully', status: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to delete proxy', status: 'error' })
    }
  })

  // Toggle proxy status
  const { mutate: toggleProxyStatus } = useMutation({
    mutationFn: proxyApi.toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['proxies'])
      toast({ title: 'Status updated successfully', status: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to update status', status: 'error' })
    }
  })

  return (
    <ProxyContext.Provider 
      value={{
        proxies,
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