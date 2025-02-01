import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// MSW nur aktivieren wenn wir es explizit wollen
const ENABLE_MOCKS = false

async function enableMocking() {
  if (!ENABLE_MOCKS) return
  
  const { worker } = await import('./mocks/browser')
  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
