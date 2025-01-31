import { http, HttpResponse } from 'msw'

const MOCK_PROXIES = [
  { id: 1, name: 'Proxy 1', host: '192.168.1.1', port: 8080, status: 'active' },
  { id: 2, name: 'Proxy 2', host: '192.168.1.2', port: 8081, status: 'inactive' },
  { id: 3, name: 'Proxy 3', host: '192.168.1.3', port: 8082, status: 'active' }
]

let proxies = [...MOCK_PROXIES]

export const handlers = [
  // Get all proxies
  http.get('http://localhost:3000/proxies', () => {
    return HttpResponse.json(proxies, {
      delay: 500
    })
  }),

  // Create proxy
  http.post('http://localhost:3000/proxies', async ({ request }) => {
    const newProxy = {
      id: Date.now(),
      ...(await request.json())
    }
    proxies.push(newProxy)
    return HttpResponse.json(newProxy, {
      delay: 500
    })
  }),

  // Update proxy
  http.put('/api/proxies/:id', async ({ params, request }) => {
    const { id } = params
    const updatedProxy = await request.json()
    proxies = proxies.map(proxy => 
      proxy.id === Number(id) ? { ...updatedProxy, id: Number(id) } : proxy
    )
    return HttpResponse.json(updatedProxy, {
      delay: 500
    })
  }),

  // Delete proxy
  http.delete('/api/proxies/:id', ({ params }) => {
    const { id } = params
    proxies = proxies.filter(proxy => proxy.id !== Number(id))
    return new HttpResponse(null, {
      status: 200,
      delay: 500
    })
  }),

  // Toggle proxy status
  http.patch('/api/proxies/:id/toggle', ({ params }) => {
    const { id } = params
    const proxy = proxies.find(p => p.id === Number(id))
    if (proxy) {
      proxy.status = proxy.status === 'active' ? 'inactive' : 'active'
    }
    return HttpResponse.json(proxy, {
      delay: 500
    })
  })
] 