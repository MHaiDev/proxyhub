/**
 * Mongoose model for user management
 * Handles user data and password hashing
 * @module UserModel
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

/**
 * User Schema
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

/**
 * Password hashing middleware
 * @param {Function} next - Mongoose middleware next function
 */
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

/**
 * Compare password method
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>} True if password matches
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User 