const router = require('express').Router()
const { getProxies, createProxy } = require('../controllers/proxy.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.use(authMiddleware)

router.get('/', getProxies)
router.post('/', createProxy)

module.exports = router 