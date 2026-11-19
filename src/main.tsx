import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

async function startApplication() {
  const { worker } = await import('./api/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })

  const root = document.getElementById('root')
  if (!root) throw new Error('The application root element was not found.')

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void startApplication()
