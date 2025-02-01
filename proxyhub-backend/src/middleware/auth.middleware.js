const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    // Bearer Token aus Header holen
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    
    // Token verifizieren
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // User-ID an Request anhängen
    req.user = { id: decoded.userId }
    
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authMiddleware 