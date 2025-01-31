import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from '@chakra-ui/theme'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<div>Settings (coming soon)</div>} />
          <Route path="/profile" element={<div>Profile (coming soon)</div>} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
