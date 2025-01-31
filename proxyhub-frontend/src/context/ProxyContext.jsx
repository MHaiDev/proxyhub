import { createContext, useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ProxyContext = createContext(null)

export const ProxyProvider = ({ children }) => {
  const [proxies, setProxies] = useState([
    { id: 1, name: 'Proxy 1', host: '192.168.1.1', port: 8080, status: 'active' },
    { id: 2, name: 'Proxy 2', host: '192.168.1.2', port: 8081, status: 'inactive' },
    { id: 3, name: 'Proxy 3', host: '192.168.1.3', port: 8082, status: 'active' }
  ])
  const toast = useToast()

  const showToast = (title, status = 'success') => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    })
  }

  const addProxy = (proxy) => {
    try {
      setProxies([...proxies, { ...proxy, id: Date.now() }])
      showToast('Proxy added successfully')
    } catch (error) {
      showToast('Failed to add proxy', 'error')
      console.error('Error adding proxy:', error)
    }
  }

  const updateProxy = (id, updatedProxy) => {
    try {
      setProxies(proxies.map(proxy => 
        proxy.id === id ? { ...updatedProxy, id } : proxy
      ))
      showToast('Proxy updated successfully')
    } catch (error) {
      showToast('Failed to update proxy', 'error')
      console.error('Error updating proxy:', error)
    }
  }

  const deleteProxy = (id) => {
    try {
      setProxies(proxies.filter(proxy => proxy.id !== id))
      showToast('Proxy deleted successfully')
    } catch (error) {
      showToast('Failed to delete proxy', 'error')
      console.error('Error deleting proxy:', error)
    }
  }

  const toggleProxyStatus = (id) => {
    try {
      setProxies(proxies.map(proxy => {
        if (proxy.id === id) {
          const newStatus = proxy.status === 'active' ? 'inactive' : 'active'
          showToast(`Proxy ${newStatus}`)
          return { ...proxy, status: newStatus }
        }
        return proxy
      }))
    } catch (error) {
      showToast('Failed to toggle proxy status', 'error')
      console.error('Error toggling proxy status:', error)
    }
  }

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

ProxyProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useProxies = () => {
  const context = useContext(ProxyContext)
  if (!context) {
    throw new Error('useProxies must be used within a ProxyProvider')
  }
  return context
} 