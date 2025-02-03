/**
 * Redis service for caching and performance optimization
 * Handles caching of proxy data and cache invalidation
 * @module RedisService
 */

const Redis = require('ioredis')

/**
 * Redis client instance
 * @type {Redis}
 */
let redis = null
let isRedisAvailable = false

try {
  redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy: () => null
  })

  redis.on('error', (err) => {
    console.log('Redis error:', err)
    isRedisAvailable = false
  })

  redis.on('connect', () => {
    console.log('Redis connected')
    isRedisAvailable = true
  })
} catch (error) {
  console.log('Redis initialization failed:', error)
}

const CACHE_TTL = 60 * 5 // 5 Minuten

/**
 * Cache middleware for request handling
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 * @returns {Promise<void>}
 */
const cacheMiddleware = async (req, res, next) => {
  if (!isRedisAvailable || req.method !== 'GET') return next()

  const key = `cache:${req.user.id}:${req.originalUrl}`
  try {
    const cached = await redis.get(key)
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    
    const originalJson = res.json
    res.json = function(data) {
      redis.setex(key, CACHE_TTL, JSON.stringify(data))
      originalJson.call(this, data)
    }
    
    next()
  } catch (error) {
    next()
  }
}

/**
 * Invalidates cache for a specific user
 * @param {string} userId - User ID whose cache needs to be invalidated
 * @returns {Promise<void>}
 */
const invalidateCache = async (userId) => {
  if (!isRedisAvailable) return
  
  try {
    const pattern = `cache:${userId}:*`
    const keys = await redis.keys(pattern)
    if (keys.length) {
      await redis.del(keys)
    }
  } catch (error) {
    console.error('Cache invalidation failed:', error)
  }
}

module.exports = {
  redis,
  cacheMiddleware,
  invalidateCache
} 