import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

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