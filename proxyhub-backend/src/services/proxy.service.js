/**
 * Service for proxy status monitoring and logging
 * Handles periodic status checks and performance metrics
 * @module ProxyService
 */

const ping = require('ping')
const Proxy = require('../models/proxy.model')
const ProxyLog = require('../models/proxy-log.model')

/**
 * Checks the status of a single proxy
 * Measures latency and updates proxy status
 * @param {Object} proxy - Proxy object to check
 * @returns {Promise<string>} Status of the proxy ('active', 'inactive', or 'error')
 */
const checkProxyStatus = async (proxy) => {
  try {
    const result = await ping.promise.probe(proxy.host)
    const status = result.alive ? 'active' : 'inactive'
    
    // Update proxy status and metrics
    await Proxy.findByIdAndUpdate(proxy._id, { 
      status,
      lastCheck: new Date(),
      latency: result.time
    })

    // Create status log entry
    await ProxyLog.create({
      proxyId: proxy._id,
      status,
      latency: result.time,
      timestamp: new Date()
    })

    return status
  } catch (error) {
    console.error(`Error checking proxy ${proxy.host}:`, error)
    return 'error'
  }
}

// Periodic status check interval (5 minutes)
setInterval(async () => {
  const proxies = await Proxy.find()
  for (const proxy of proxies) {
    await checkProxyStatus(proxy)
  }
}, 5 * 60 * 1000)

module.exports = {
  checkProxyStatus
} 