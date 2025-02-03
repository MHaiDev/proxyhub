/**
 * Main application setup and configuration
 * Configures Express server, middleware, and routes
 * @module App
 */

const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const proxyRoutes = require('./routes/proxy.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()

/**
 * Configure security and middleware
 */
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(helmet())
app.use(express.json())

/**
 * Rate limiting configuration
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use('/api/', limiter)

/**
 * Route configuration
 */
app.use('/api/auth', authRoutes)
app.use('/api/proxies', proxyRoutes)

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

module.exports = app 