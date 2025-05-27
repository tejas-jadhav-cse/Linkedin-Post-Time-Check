import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppEnhanced from './App-enhanced.tsx'
import App from './App.tsx'

// Apply dark mode class immediately if needed to prevent flash of light mode
if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}

// Create root and render app with performance measurement
const root = createRoot(document.getElementById('root')!);
const isDev = import.meta.env.DEV;

// Determine which version to show based on URL or query parameter
const params = new URLSearchParams(window.location.search);
const standardVersion = params.get('standard') === 'true';

// Component to render based on URL or query parameter (Enhanced is now the default)
const ComponentToRender = standardVersion ? App : AppEnhanced;

// Measure initial render performance
if (isDev) {
  const startTime = performance.now();
  
  console.log(`⚡ App rendering started (${standardVersion ? 'Standard' : 'Enhanced'} version)`);
  
  root.render(
    <StrictMode>
      <ComponentToRender />
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
      <ComponentToRender />
    </StrictMode>
  );
}
