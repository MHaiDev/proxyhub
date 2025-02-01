const mongoose = require('mongoose')

const proxySchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const Proxy = mongoose.model('Proxy', proxySchema)

module.exports = Proxy 