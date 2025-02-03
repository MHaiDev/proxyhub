/**
 * Authentication middleware for protecting routes
 * Verifies JWT tokens and attaches user data to request
 * @module AuthMiddleware
 */

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * Middleware to verify JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = { id: decoded.userId }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authMiddleware 