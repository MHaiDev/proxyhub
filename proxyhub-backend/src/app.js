const express = require('express')
const cors = require('cors')
const proxyRoutes = require('./routes/proxy.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/proxies', proxyRoutes)
app.use('/api/auth', authRoutes)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

module.exports = app 