import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const redirectPath = new URLSearchParams(window.location.search).get('p')

if (redirectPath) {
  const params = new URLSearchParams(window.location.search)
  const restoredQuery = params.get('q')
  const restoredHash = params.get('h')
  const restoredUrl = `${redirectPath}${restoredQuery ? `?${restoredQuery}` : ''}${restoredHash ? `#${restoredHash}` : ''}`

  window.history.replaceState(null, '', restoredUrl)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
