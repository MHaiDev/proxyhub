const Proxy = require('../models/proxy.model')

const getProxies = async (req, res) => {
  try {
    const proxies = await Proxy.find({ userId: req.user.id })
    res.json(proxies)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proxies' })
  }
}

const createProxy = async (req, res) => {
  try {
    const proxy = new Proxy({
      ...req.body,
      userId: req.user.id
    })
    await proxy.save()
    res.status(201).json(proxy)
  } catch (error) {
    res.status(400).json({ message: 'Error creating proxy' })
  }
}

module.exports = {
  getProxies,
  createProxy
} 