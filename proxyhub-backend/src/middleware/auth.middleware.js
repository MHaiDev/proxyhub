const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  // Temporär für Tests - später durch echte JWT Auth ersetzen
  req.user = { id: '123' }
  next()
}

module.exports = authMiddleware 