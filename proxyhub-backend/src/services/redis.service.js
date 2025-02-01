const Redis = require('ioredis')

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000)
    return delay
  }
})

redis.on('error', (err) => console.error('Redis Client Error:', err))
redis.on('connect', () => console.log('Redis Client Connected'))

const CACHE_TTL = 60 * 5 // 5 Minuten

const cacheMiddleware = async (req, res, next) => {
  if (req.method !== 'GET') return next()

  const key = `cache:${req.user.id}:${req.originalUrl}`
  try {
    const cached = await redis.get(key)
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    
    // Original response.json speichern
    const originalJson = res.json
    res.json = function(data) {
      redis.setex(key, CACHE_TTL, JSON.stringify(data))
      originalJson.call(this, data)
    }
    
    next()
  } catch (error) {
    console.error('Redis Error:', error)
    next()
  }
}

const invalidateCache = async (userId) => {
  const pattern = `cache:${userId}:*`
  const keys = await redis.keys(pattern)
  if (keys.length) {
    await redis.del(keys)
  }
}

module.exports = {
  redis,
  cacheMiddleware,
  invalidateCache
} 