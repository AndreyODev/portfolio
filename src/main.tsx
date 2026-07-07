import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/shared/theme/fonts'
import '@/index.css'
import { App } from '@/presentation/pages/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
