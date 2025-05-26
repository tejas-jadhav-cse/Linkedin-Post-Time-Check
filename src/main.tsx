import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App-enhanced.tsx'

// Apply dark mode class immediately if needed
if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}

// Log debug info
console.log('Main.tsx executed - Using fixed App component');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
