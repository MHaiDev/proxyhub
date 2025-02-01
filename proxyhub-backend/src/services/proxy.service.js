const ping = require('ping')
const Proxy = require('../models/proxy.model')
const ProxyLog = require('../models/proxy-log.model')

const checkProxyStatus = async (proxy) => {
  try {
    const result = await ping.promise.probe(proxy.host)
    const status = result.alive ? 'active' : 'inactive'
    
    // Status aktualisieren
    await Proxy.findByIdAndUpdate(proxy._id, { 
      status,
      lastCheck: new Date(),
      latency: result.time
    })

    // Log erstellen
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

// Regelmäßige Überprüfung
setInterval(async () => {
  const proxies = await Proxy.find()
  for (const proxy of proxies) {
    await checkProxyStatus(proxy)
  }
}, 5 * 60 * 1000) // Alle 5 Minuten 