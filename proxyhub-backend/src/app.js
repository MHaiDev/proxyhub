const express = require('express')
const cors = require('cors')
const proxyRoutes = require('./routes/proxy.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Middleware
app.use(cors())
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