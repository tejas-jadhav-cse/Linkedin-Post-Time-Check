import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply dark mode class immediately if needed to prevent flash of light mode
if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}

// Create root and render app with performance measurement
const root = createRoot(document.getElementById('root')!);
const isDev = import.meta.env.DEV;

// Measure initial render performance
if (isDev) {
  const startTime = performance.now();
  
  console.log('⚡ App rendering started');
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  window.addEventListener('load', () => {
    const endTime = performance.now();
    console.log(`⚡ App rendered in ${(endTime - startTime).toFixed(2)}ms`);
  });
} else {
  // In production, just render without the performance logging
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
