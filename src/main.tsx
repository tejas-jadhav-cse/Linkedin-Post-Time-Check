import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import AppEnhanced from './App-enhanced-fixed'
import App from './App'
import { Tools } from './pages/Tools'
import BatchAnalyzer from './pages/BatchAnalyzer'
import UrlValidator from './pages/UrlValidator'
import TimeZoneConverter from './pages/TimeZoneConverter'
import ApiAccess from './pages/ApiAccess'
import { AppProvider } from './context/AppContext.tsx'

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
const HomeComponent = standardVersion ? App : AppEnhanced;

// Routes setup
const AppRoutes = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/batch" element={<BatchAnalyzer />} />
        <Route path="/validator" element={<UrlValidator />} />
        <Route path="/timezone" element={<TimeZoneConverter />} />
        <Route path="/api" element={<ApiAccess />} />
      </Routes>
    </AppProvider>
  </BrowserRouter>
);

// Measure initial render performance
if (isDev) {
  const startTime = performance.now();
  
  console.log(`⚡ App rendering started with Router`);
  
  root.render(
    <StrictMode>
      <AppRoutes />
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
      <AppRoutes />
    </StrictMode>
  );
}
