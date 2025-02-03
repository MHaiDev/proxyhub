/**
 * Application entry point
 * Initializes MongoDB connection and starts the Express server
 * @module Index
 */

const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

/**
 * Environment configuration
 * @constant {number} PORT - Server port number
 * @constant {string} MONGODB_URI - MongoDB connection string
 */
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/proxyhub'

/**
 * Initialize database connection and start server
 * Handles connection errors and successful startup
 */
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  }) 