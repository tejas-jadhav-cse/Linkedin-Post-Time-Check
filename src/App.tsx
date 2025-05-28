import { lazy, Suspense } from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import { AboutSection } from './components/AboutSection';
import { InputSection } from './components/InputSection';
import { Layout } from './components/Layout';

// Lazy load secondary components for better performance
const ResultSection = lazy(() => import('./components/ResultSection'));

const HistorySection = lazy(() => import('./components/HistorySection'));

function AppContent() {
  const { 
    result, 
    darkMode,
    showHistory
  } = useApp();  return (
    <Layout>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Extract LinkedIn
          </h1>
          <h2 className={`text-3xl md:text-5xl font-bold text-blue-600 mb-8`}>
            Timestamps Instantly
          </h2>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get exact timestamps from any LinkedIn post or comment in seconds. 
            No more guessing when content was published.
          </p>

          {/* Main Input Section */}
          <InputSection darkMode={darkMode} />
        </div>

        {/* Results Section */}
        <Suspense fallback={<div className="text-center py-8">Loading results...</div>}>
          {result && <ResultSection />}
        </Suspense>

        {/* History Section */}
        <Suspense fallback={<div className="text-center py-8">Loading history...</div>}>
          {showHistory && <HistorySection />}
        </Suspense>

        {/* About Section */}
        <AboutSection darkMode={darkMode} />
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
