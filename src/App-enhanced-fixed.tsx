import { 
  Clock,
  History as HistoryIcon,
  Moon,
  Sun,
  Linkedin,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Copy,
  Check,
  AlertTriangle,
  X
} from 'lucide-react';
import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from './context/AppContext';

function App() {
  const { 
    url,
    setUrl,
    result,
    loading,
    error,
    darkMode,
    toggleDarkMode,
    showHistory, 
    setShowHistory,
    handleExtract
  } = useApp();
  
  const [copySuccess, setCopySuccess] = useState('');
  const [showNotice, setShowNotice] = useState(true);
  
  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(format);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-white'
    }`}>
      {/* Navigation */}
      <nav className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  TimestampExtractor
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">      <Link
                to="/tools"
                className={`p-2 rounded-lg transition-colors flex items-center ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Clock className="w-5 h-5 mr-1" />
                <span>Tools</span>
              </Link>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <HistoryIcon className="w-5 h-5" />
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
          </h2>          <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get exact timestamps from any LinkedIn post or comment in seconds. 
            No more guessing when content was published.
          </p>

          {/* Main Input Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className={`p-8 rounded-2xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="space-y-6">
                <div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your LinkedIn URL here..."
                    className={`w-full px-6 py-4 text-lg rounded-xl border transition-all ${
                      error 
                        ? 'border-red-300 focus:border-red-500' 
                        : darkMode
                          ? 'border-gray-600 focus:border-blue-500 bg-gray-700 text-white'
                          : 'border-gray-300 focus:border-blue-500 bg-white'
                    } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                    onKeyPress={(e) => e.key === 'Enter' && handleExtract()}
                  />
                </div>

                {error && (
                  <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <button
                  onClick={handleExtract}
                  disabled={loading || !url.trim()}
                  className={`w-full py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-200 ${
                    loading || !url.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Extracting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Extract Timestamp</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section (conditionally rendered) */}
          {result && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className={`p-8 rounded-2xl border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <span>Timestamp Successfully Extracted</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Here's Your Timestamp Data
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                  {/* Unix Timestamp */}
                  <div className={`p-6 rounded-xl border ${
                    darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Unix Timestamp
                      </h4>
                      <button
                        onClick={() => copyToClipboard(result.unix.toString(), 'unix')}
                        className={`p-2 rounded-lg transition-colors ${
                          copySuccess === 'unix'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                            : darkMode 
                              ? 'hover:bg-gray-600 text-gray-400' 
                              : 'hover:bg-gray-200 text-gray-600'
                        }`}
                        aria-label="Copy Unix timestamp"
                      >
                        {copySuccess === 'unix' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className={`text-xl font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {result.unix}
                    </p>
                  </div>

                  {/* ISO Format */}
                  <div className={`p-6 rounded-xl border ${
                    darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ISO Format
                      </h4>
                      <button
                        onClick={() => copyToClipboard(result.iso, 'iso')}
                        className={`p-2 rounded-lg transition-colors ${
                          copySuccess === 'iso'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                            : darkMode 
                              ? 'hover:bg-gray-600 text-gray-400' 
                              : 'hover:bg-gray-200 text-gray-600'
                        }`}
                        aria-label="Copy ISO format"
                      >
                        {copySuccess === 'iso' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className={`text-xl font-mono break-all ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {result.iso}
                    </p>
                  </div>

                  {/* Local Time */}
                  <div className={`p-6 rounded-xl border ${
                    darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Local Time
                      </h4>
                      <button
                        onClick={() => copyToClipboard(result.local, 'local')}
                        className={`p-2 rounded-lg transition-colors ${
                          copySuccess === 'local'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                            : darkMode 
                              ? 'hover:bg-gray-600 text-gray-400' 
                              : 'hover:bg-gray-200 text-gray-600'
                        }`}
                        aria-label="Copy local time"
                      >
                        {copySuccess === 'local' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {result.local}
                    </p>
                  </div>

                  {/* Relative Time */}
                  <div className={`p-6 rounded-xl border ${
                    darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Relative Time
                      </h4>
                      <button
                        onClick={() => copyToClipboard(result.relative, 'relative')}
                        className={`p-2 rounded-lg transition-colors ${
                          copySuccess === 'relative'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                            : darkMode 
                              ? 'hover:bg-gray-600 text-gray-400' 
                              : 'hover:bg-gray-200 text-gray-600'
                        }`}
                        aria-label="Copy relative time"
                      >
                        {copySuccess === 'relative' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {result.relative}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show History Section (conditionally rendered) */}
          {showHistory && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className={`p-8 rounded-2xl border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your Extraction History
                </h3>
                <div className="space-y-4">
                  {/* History will be shown here */}
                </div>
              </div>
            </div>          )}          {/* Why Use Our Extractor Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Why Use Our Extractor?
              </h3>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Professional tools for accurate timestamp extraction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Lightning Fast
                </h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Extract timestamps in seconds, not minutes. No complex setup required.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Precise Results
                </h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get exact timestamps down to the millisecond with our proven algorithm.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Multiple Formats
                </h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Unix, ISO, local time, and relative formats for any use case.
                </p>
              </div>
            </div>
            
            <div className={`mt-12 p-8 rounded-xl border ${
              darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
            }`}>
              <h3 className={`text-2xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>About This App</h3>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                LinkedIn Timestamp Extractor helps you get precise timestamps from any LinkedIn post or comment URL. 
                Simply paste a URL and get accurate timing information instantly. Our advanced algorithm works with 
                various LinkedIn URL formats and provides timestamps in multiple useful formats.
              </p>
            </div>
          </div>
        </div>
      </div>      {/* Footer */}
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
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Designed & Developed with ❤️ by Tejas Jadhav
            </p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2025 LinkedIn Timestamp Extractor. All rights reserved.
            </p>          </div>
        </div>
      </footer>      {/* Development Notice */}
      {showNotice && (
        <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-50 max-w-[calc(100%-2rem)] sm:max-w-xs md:max-w-sm animate-fadein">
          <div className={`flex items-start rounded-xl border shadow-lg p-3 sm:p-4 md:p-5 transition-all duration-300 transform hover:-translate-y-1 ${
            darkMode 
              ? 'bg-amber-900/80 border-amber-700 text-amber-100' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <div className="flex-shrink-0 mr-3 md:mr-4">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center ${
                darkMode ? 'bg-amber-800' : 'bg-amber-100'
              }`}>
                <AlertTriangle className={`w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 ${darkMode ? 'text-amber-200' : 'text-amber-600'}`} />
              </div>
            </div>
            <div className="flex-1 min-w-0">              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base sm:text-lg truncate">Notice</h3>
                <button 
                  onClick={() => setShowNotice(false)}
                  className={`p-1 rounded-full hover:bg-amber-700/20 transition-colors flex-shrink-0 ml-2 ${
                    darkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-700 hover:text-amber-900'
                  }`}
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className={`text-sm mt-1 text-left ${darkMode ? 'text-amber-200' : 'text-amber-700'}`}>
                WebApp is in Development phase, but don't worry you can use it.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
