import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

// Importiere das Standard-Theme von Chakra UI
import { theme } from '@chakra-ui/theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<div>Dashboard (coming soon)</div>} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
