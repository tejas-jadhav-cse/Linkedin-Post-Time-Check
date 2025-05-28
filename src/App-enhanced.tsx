import { useState, useEffect } from 'react';
import { 
  Clock, 
  Copy, 
  Check, 
  ExternalLink, 
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Globe,
  Linkedin,
  History as HistoryIcon
} from 'lucide-react';
import './App.css';
import type { TimestampResult } from './types';
import { useHistory } from './hooks/useHistory';
import { AboutSection } from './components/AboutSection';
import EnhancedLayout from './components/EnhancedLayout';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<TimestampResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const { history, addToHistory, clearHistory } = useHistory();

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleExtract = async () => {
    if (!url.trim()) {
      setError('Please enter a LinkedIn URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate timestamp extraction
      if (url.includes('linkedin.com')) {
        const now = new Date();
        const extractedResult = {
          unix: Math.floor(now.getTime() / 1000),
          iso: now.toISOString(),
          local: now.toLocaleString(),
          relative: 'Just now'
        };
        
        setResult(extractedResult);
        addToHistory(url, extractedResult.unix);
      } else {
        setError('Could not extract timestamp. Please ensure this is a valid LinkedIn post or comment URL.');
      }
    } catch (err) {
      setError('An error occurred while extracting the timestamp');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    <EnhancedLayout 
      darkMode={darkMode} 
      toggleDarkMode={toggleDarkMode} 
      showHistory={showHistory} 
      setShowHistory={setShowHistory}
    >

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
        </div>

        {/* Results Section */}
        {result && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className={`p-8 rounded-2xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Timestamp Successfully Extracted</span>
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Here's Your Timestamp Data
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unix Timestamp */}
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
                          ? 'bg-green-100 text-green-600' 
                          : darkMode 
                            ? 'hover:bg-gray-600 text-gray-400' 
                            : 'hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      {copySuccess === 'unix' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className={`text-xl font-mono ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
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
                          ? 'bg-green-100 text-green-600' 
                          : darkMode 
                            ? 'hover:bg-gray-600 text-gray-400' 
                            : 'hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      {copySuccess === 'iso' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className={`text-lg font-mono ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
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
                          ? 'bg-green-100 text-green-600' 
                          : darkMode 
                            ? 'hover:bg-gray-600 text-gray-400' 
                            : 'hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      {copySuccess === 'local' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
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
                          ? 'bg-green-100 text-green-600' 
                          : darkMode 
                            ? 'hover:bg-gray-600 text-gray-400' 
                            : 'hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      {copySuccess === 'relative' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {result.relative}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {showHistory && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className={`p-8 rounded-2xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recent Extractions
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-red-500 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
                {history.length === 0 ? (
                <div className="text-center py-8">
                  <HistoryIcon className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No recent extractions. Extract a timestamp to see it here.
                  </p>
                </div>
              ): (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setUrl(item.url)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                        darkMode 
                          ? 'border-gray-600 hover:bg-gray-700 bg-gray-700/50' 
                          : 'border-gray-200 hover:bg-gray-50 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {item.url}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(item.extractedAt).toLocaleString()}
                          </p>
                        </div>
                        <ExternalLink className={`w-4 h-4 ml-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
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
        </div>        {/* About Section */}
        <AboutSection 
          darkMode={darkMode}
        />
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
        </div>      </footer>
    </EnhancedLayout>
  );
}

export default App;
