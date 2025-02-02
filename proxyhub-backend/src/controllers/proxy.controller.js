const Proxy = require('../models/proxy.model')
const { invalidateCache } = require('../services/redis.service')

// Get all proxies for user
const getProxies = async (req, res) => {
  try {
    const proxies = await Proxy.find({ userId: req.user.id })
    res.json(proxies)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proxies' })
  }
}

// Create new proxy
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

// Update proxy
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

// Delete proxy
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

// Toggle proxy status
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