const router = require('express').Router()
const { 
  getProxies, 
  createProxy, 
  updateProxy, 
  deleteProxy,
  toggleStatus
} = require('../controllers/proxy.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.use(authMiddleware)

router.get('/', getProxies)
router.post('/', createProxy)
router.put('/:id', updateProxy)
router.delete('/:id', deleteProxy)
router.patch('/:id/toggle', toggleStatus)

module.exports = router 