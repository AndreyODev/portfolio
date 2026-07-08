import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/shared/theme/fonts'
import '@/index.css'
import { App } from '@/presentation/pages/App'
import { LanguageProvider } from '@/shared/i18n/LanguageProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
