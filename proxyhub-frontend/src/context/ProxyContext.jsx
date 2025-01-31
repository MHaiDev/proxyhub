import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const ProxyContext = createContext(null)

export const ProxyProvider = ({ children }) => {
  const [proxies, setProxies] = useState([
    { id: 1, name: 'Proxy 1', host: '192.168.1.1', port: 8080, status: 'active' },
    { id: 2, name: 'Proxy 2', host: '192.168.1.2', port: 8081, status: 'inactive' },
    { id: 3, name: 'Proxy 3', host: '192.168.1.3', port: 8082, status: 'active' }
  ])

  const addProxy = (proxy) => {
    setProxies([...proxies, { ...proxy, id: Date.now() }])
  }

  const updateProxy = (id, updatedProxy) => {
    setProxies(proxies.map(proxy => 
      proxy.id === id ? { ...updatedProxy, id } : proxy
    ))
  }

  const deleteProxy = (id) => {
    setProxies(proxies.filter(proxy => proxy.id !== id))
  }

  const toggleProxyStatus = (id) => {
    setProxies(proxies.map(proxy => 
      proxy.id === id 
        ? { ...proxy, status: proxy.status === 'active' ? 'inactive' : 'active' }
        : proxy
    ))
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