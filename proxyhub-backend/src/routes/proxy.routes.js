/**
 * Router for proxy-related endpoints
 * Handles all proxy CRUD operations and status management
 * @module ProxyRoutes
 */

const router = require('express').Router()
const { 
  getProxies, 
  createProxy, 
  updateProxy, 
  deleteProxy,
  toggleStatus
} = require('../controllers/proxy.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * Redis cache middleware configuration
 * Falls back to dummy middleware if Redis is unavailable
 * @type {Function}
 */
let cacheMiddleware = (req, res, next) => next()
try {
  const { cacheMiddleware: redisCacheMiddleware } = require('../services/redis.service')
  cacheMiddleware = redisCacheMiddleware
} catch (error) {
  console.log('Redis not available, continuing without caching')
}

router.use(authMiddleware)

// Cache-Middleware nur für GET requests
router.get('/', cacheMiddleware, getProxies)
router.post('/', createProxy)
router.put('/:id', updateProxy)
router.delete('/:id', deleteProxy)
router.patch('/:id/toggle', toggleStatus)

module.exports = router 