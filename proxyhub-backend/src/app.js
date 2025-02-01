const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const proxyRoutes = require('./routes/proxy.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()

// CORS vor allen anderen Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Security Middleware
app.use(helmet())

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use('/api/', limiter)

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/proxies', proxyRoutes)

// Error handling mit Logging
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

module.exports = app 