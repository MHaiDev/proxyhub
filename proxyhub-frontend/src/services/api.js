import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'  // Zurück zur funktionierenden Version
})

// Token Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Error Interceptor mit mehr Details
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    })
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const proxyApi = {
  getAll: async () => {
    const { data } = await api.get('/api/proxies')
    return data
  },
  
  create: async (proxy) => {
    const { data } = await api.post('/api/proxies', proxy)
    return data
  },
  
  update: async (id, proxy) => {
    const { data } = await api.put(`/api/proxies/${id}`, proxy)
    return data
  },
  
  delete: async (id) => {
    if (!id) throw new Error('No ID provided for delete')
    await api.delete(`/api/proxies/${id}`)
    return id
  },
  
  toggleStatus: async (id) => {
    if (!id) throw new Error('No ID provided for toggle')
    const { data } = await api.patch(`/api/proxies/${id}/toggle`)
    return data
  }
} 