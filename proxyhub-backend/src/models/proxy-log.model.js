const mongoose = require('mongoose')

const proxyLogSchema = new mongoose.Schema({
  proxyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proxy',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'error'],
    required: true
  },
  latency: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const ProxyLog = mongoose.model('ProxyLog', proxyLogSchema)

module.exports = ProxyLog 