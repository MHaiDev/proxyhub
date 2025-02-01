const router = require('express').Router()
const { 
  getProxies, 
  createProxy, 
  updateProxy, 
  deleteProxy,
  toggleStatus
} = require('../controllers/proxy.controller')
const authMiddleware = require('../middleware/auth.middleware')
const { cacheMiddleware } = require('../services/redis.service')

router.use(authMiddleware)

router.get('/', cacheMiddleware, getProxies)
router.post('/', createProxy)
router.put('/:id', updateProxy)
router.delete('/:id', deleteProxy)
router.patch('/:id/toggle', toggleStatus)

module.exports = router 