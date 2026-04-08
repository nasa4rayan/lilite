import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from '@/hooks/useLanguage'
import './index.css'
import favicon from './assets/favicon.ico'

const faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null

if (faviconLink) {
  faviconLink.href = favicon
} else {
  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/x-icon'
  link.href = favicon
  document.head.appendChild(link)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>,
)
