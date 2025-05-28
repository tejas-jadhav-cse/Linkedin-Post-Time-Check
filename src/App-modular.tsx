import './App.css';
import { lazy, Suspense } from 'react';
import { useApp } from './context/AppContext';
import { Navigation } from './components/shared/Navigation';
import { Footer } from './components/shared/Footer';
import { DevelopmentNotice } from './components/shared/DevelopmentNotice';
import { ProgressIndicator } from './components/shared/ProgressIndicator';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { HeroSection } from './components/home/HeroSection';
import { InputSection } from './components/home/InputSection';

// Lazy loaded components for better performance
const ResultsSection = lazy(() => 
  import('./components/home/ResultsSection')
    .then(module => ({ default: module.ResultsSection }))
);

const FeatureSection = lazy(() => 
  import('./components/home/FeatureSection')
    .then(module => ({ default: module.FeatureSection }))
);

// Lazy loaded component for better performance
const HistorySection = lazy(() => import('./components/HistorySection'));

function App() {
  const { darkMode, showHistory } = useApp();
  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-white'
    }`}>
      <ProgressIndicator />
      <Navigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <HeroSection />
        <InputSection />        <Suspense fallback={
          <div className="max-w-4xl mx-auto mb-10 sm:mb-16 px-3 sm:px-0">
            <div className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <div className="h-40 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading results...</span>
              </div>
            </div>
          </div>
        }>
          <ResultsSection />
        </Suspense>
        
        {/* History Section with Suspense for performance */}
        {showHistory && (
          <Suspense fallback={
            <div className="max-w-4xl mx-auto mb-10 sm:mb-16 px-3 sm:px-0">
              <div className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <div className="h-40 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          }>
            <HistorySection />
          </Suspense>
        )}
          <Suspense fallback={
          <div className="h-40 flex flex-col items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading features...</span>
          </div>
        }>
          <FeatureSection />
        </Suspense>
      </div>
        <Footer />
      <DevelopmentNotice />
      <ScrollToTop />
    </div>
  );
}

export default App;
