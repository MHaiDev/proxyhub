/**
 * Controller for handling proxy-related operations
 * Manages CRUD operations and status management for proxies
 * @module ProxyController
 */

const Proxy = require('../models/proxy.model')
const { invalidateCache } = require('../services/redis.service')

/**
 * Retrieves all proxies for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - JSON array of proxies
 */
const getProxies = async (req, res) => {
  try {
    const proxies = await Proxy.find({ userId: req.user.id })
    res.json(proxies)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proxies' })
  }
}

/**
 * Creates a new proxy for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} req.body - Proxy data
 * @param {string} req.body.name - Name of the proxy
 * @param {string} req.body.host - Host address
 * @param {number} req.body.port - Port number
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - JSON of created proxy
 */
const createProxy = async (req, res) => {
  try {
    const proxy = new Proxy({
      ...req.body,
      userId: req.user.id
    })
    const savedProxy = await proxy.save()
    // Cache invalidieren nach Create
    await invalidateCache(req.user.id)
    res.status(201).json(savedProxy)
  } catch (error) {
    res.status(400).json({ message: 'Error creating proxy' })
  }
}

/**
 * Updates an existing proxy
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Proxy ID to update
 * @param {Object} req.body - Updated proxy data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - JSON of updated proxy
 */
const updateProxy = async (req, res) => {
  try {
    const proxy = await Proxy.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { ...req.body },
      { new: true }
    )
    
    if (!proxy) {
      return res.status(404).json({ message: 'Proxy not found' })
    }

    // Cache invalidieren
    await invalidateCache(req.user.id)
    res.json(proxy)
  } catch (error) {
    console.error('Update proxy error:', error)
    res.status(500).json({ message: 'Error updating proxy' })
  }
}

/**
 * Deletes a proxy
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Proxy ID to delete
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Success message
 */
const deleteProxy = async (req, res) => {
  try {
    const proxy = await Proxy.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    })
    if (!proxy) {
      return res.status(404).json({ message: 'Proxy not found' })
    }
    // Cache invalidieren nach Delete
    await invalidateCache(req.user.id)
    res.json({ message: 'Proxy deleted' })
  } catch (error) {
    res.status(400).json({ message: 'Error deleting proxy' })
  }
}

/**
 * Toggles proxy active/inactive status
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Proxy ID to toggle
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - JSON of updated proxy
 */
const toggleStatus = async (req, res) => {
  try {
    const proxy = await Proxy.findOne({
      _id: req.params.id,
      userId: req.user.id
    })
    
    if (!proxy) {
      return res.status(404).json({ message: 'Proxy not found' })
    }

    proxy.status = proxy.status === 'active' ? 'inactive' : 'active'
    await proxy.save()

    // Cache invalidieren
    await invalidateCache(req.user.id)
    res.json(proxy)
  } catch (error) {
    console.error('Toggle status error:', error)
    res.status(500).json({ message: 'Error toggling proxy status' })
  }
}

module.exports = {
  getProxies,
  createProxy,
  updateProxy,
  deleteProxy,
  toggleStatus
} 