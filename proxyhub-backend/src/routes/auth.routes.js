const router = require('express').Router()

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body
  
  // Mock authentication
  if (email === 'test@test.com' && password === 'test123') {
    res.json({ 
      token: 'mock-jwt-token',
      user: { 
        id: '123',
        email: 'test@test.com',
        name: 'Test User'
      }
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

router.post('/register', (req, res) => {
  const { email, name } = req.body
  res.json({ 
    token: 'mock-jwt-token',
    user: { 
      id: '123',
      email,
      name 
    }
  })
})

module.exports = router 