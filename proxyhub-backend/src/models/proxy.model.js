/**
 * Mongoose model for proxy management
 * Defines the schema and methods for proxy objects
 * @module ProxyModel
 */

const mongoose = require('mongoose')

/**
 * Proxy Schema
 * @type {mongoose.Schema}
 */
const proxySchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastCheck: {
    type: Date,
    default: null
  },
  latency: {
    type: Number,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id.toString()
      return ret
    }
  }
})

const Proxy = mongoose.model('Proxy', proxySchema)
module.exports = Proxy 