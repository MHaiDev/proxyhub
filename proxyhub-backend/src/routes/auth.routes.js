/**
 * Authentication routes for user registration and login
 * Handles user authentication and token generation
 * @module AuthRoutes
 */

const router = require('express').Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * Login route handler
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 * @returns {Object} User data and JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Benutzer in DB finden
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Passwort überprüfen
    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Echter JWT Token statt mock-token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Login failed' })
  }
})

/**
 * Registration route handler
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 * @param {string} req.body.name - User name
 * @returns {Object} User data and JWT token
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Prüfen ob Email bereits existiert
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // Neuen User erstellen
    const user = new User({ email, password, name })
    await user.save()

    // JWT Token erstellen
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' })
  }
})

module.exports = router 