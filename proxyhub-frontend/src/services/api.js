import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
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

// Error Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token abgelaufen oder ungültig
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const proxyApi = {
  getAll: async () => {
    const { data } = await api.get('/proxies')
    return data
  },
  
  create: async (proxy) => {
    const { data } = await api.post('/proxies', proxy)
    return data
  },
  
  update: async (id, proxy) => {
    const { data } = await api.put(`/proxies/${id}`, proxy)
    return data
  },
  
  delete: async (id) => {
    await api.delete(`/proxies/${id}`)
    return id
  },
  
  toggleStatus: async (id) => {
    const { data } = await api.patch(`/proxies/${id}/toggle`)
    return data
  }
} 