import { lazy, Suspense } from 'react';
import { Moon, Sun, History, Linkedin } from 'lucide-react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import { AboutSection } from './components/AboutSection';
import { InputSection } from './components/InputSection';

// Lazy load secondary components for better performance
const ResultSection = lazy(() => import('./components/ResultSection.js'));

const HistorySection = lazy(() => import('./components/HistorySection.js'));

function AppContent() {
  const { 
    result, 
    darkMode, 
    toggleDarkMode, 
    showHistory, 
    setShowHistory
  } = useApp();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Navigation */}
      <nav className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                TimestampExtractor
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

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

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                TimestampExtractor
              </span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2025 LinkedIn Timestamp Extractor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
