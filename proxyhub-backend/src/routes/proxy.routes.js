const router = require('express').Router()
const { 
  getProxies, 
  createProxy, 
  updateProxy, 
  deleteProxy,
  toggleStatus
} = require('../controllers/proxy.controller')
const authMiddleware = require('../middleware/auth.middleware')

// Optional Redis einbinden
let cacheMiddleware = (req, res, next) => {
  console.log('Cache disabled, using dummy middleware')
  next()
}
try {
  const { cacheMiddleware: redisCacheMiddleware } = require('../services/redis.service')
  cacheMiddleware = async (req, res, next) => {
    console.log('Checking Redis cache...')
    await redisCacheMiddleware(req, res, next)
  }
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