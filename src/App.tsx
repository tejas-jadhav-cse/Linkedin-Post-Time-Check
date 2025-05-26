import { useState, useEffect } from 'react';
import { 
  Clock, 
  Moon, 
  Sun, 
  Copy, 
  Check, 
  History, 
  ExternalLink, 
  ArrowRight,
  CheckCircle2,
  Globe,
  Linkedin,
  Zap,
  Target
} from 'lucide-react';
import { extractTimestampFromURL } from './utils/linkedinExtractor';
import { useHistory } from './hooks/useHistory';
import { DemoSection } from './components/DemoSection';
import { ShareButton } from './components/ShareButton';
import CONFIG from './config/app.config';
import type { TimestampResult } from './types';

function App() {  
  // Add debug component
  console.log('App component rendering');
  
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<TimestampResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  const { history, addToHistory, clearHistory } = useHistory();

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    // If saved preference exists, use it; otherwise use system preference
    const isDark = savedMode ? savedMode === 'true' : prefersDarkMode;
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };  const handleExtract = async () => {
    if (!url.trim()) {
      setError('Please enter a LinkedIn URL');
      return;
    }

    if (!isValidUrl) {
      setError('Please enter a valid LinkedIn URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const extractedResult = extractTimestampFromURL(url);
      
      if (extractedResult) {
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
    }  };
  
  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Minimal Navigation */}
      <nav className={`py-6 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md fixed w-full top-0 z-10`}>
        <div className="container">
          <div className="flex justify-between items-center w-full max-w-3xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold tracking-tight`}>
                TimestampExtractor
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-full transition-all hover:scale-105 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="View history"
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all hover:scale-105 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-28 mt-6">
        <div className="text-center fade-in container-sm">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Extract <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>LinkedIn</span>
          </h1>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Timestamps Instantly
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Get exact timestamps from any LinkedIn post or comment in seconds.
          </p>

          {/* Minimal Input Section */}
          <div className="container-sm mb-16 fade-in" style={{animationDelay: "0.2s"}}>
            <div className={`p-8 rounded-2xl shadow-lg ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-100'
            } card`}>
              <div className="space-y-6">                <div>
                  <div className="relative">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const newUrl = e.target.value;
                        setUrl(newUrl);
                        setIsValidUrl(newUrl.trim() !== '' && CONFIG.validation.linkedinUrlPattern.test(newUrl));
                      }}
                      placeholder="Paste your LinkedIn URL here..."
                      className={`w-full px-6 py-4 text-lg minimal-input ${
                        error 
                          ? 'border-red-400' 
                          : url.trim() !== '' && isValidUrl
                            ? 'border-green-400'
                            : darkMode
                              ? 'border-gray-600 focus:border-blue-400 text-white placeholder:text-gray-500'
                              : 'border-gray-200 focus:border-blue-500 placeholder:text-gray-400'
                      }`}
                      onKeyPress={(e) => e.key === 'Enter' && handleExtract()}
                    />
                    {url.trim() !== '' && isValidUrl && (
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                        <Check className="w-5 h-5" />
                      </span>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="flex items-center justify-center space-x-2 text-red-500 p-3">
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <button
                  onClick={handleExtract}
                  disabled={loading || !url.trim()}
                  className={`w-full py-4 px-8 text-md font-medium rounded-full transition-all duration-300 ${
                    loading || !url.trim()
                      ? 'bg-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-blue-600 hover:bg-blue-500 active:translate-y-0.5 hover:shadow-lg'
                  } text-white`}
                >                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full loading-spinner"></div>
                      <span>Extracting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Extract Timestamp</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="container-sm mb-16 fade-in" style={{animationDelay: "0.3s"}}>
            <div className={`p-6 rounded-2xl shadow-lg ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-100'
            } card`}>              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Success</span>
                </div>
                <h3 className={`text-xl font-medium`}>
                  Timestamp Data
                </h3>
                <div className="mt-3">
                  <ShareButton result={result} url={url} darkMode={darkMode} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Unix Timestamp */}
                <div className={`p-4 rounded-xl transition-all ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Unix Timestamp
                    </h4>
                    <button
                      onClick={() => copyToClipboard(result.unix.toString(), 'unix')}
                      className={`p-1.5 rounded-full transition-all hover:scale-110 ${
                        copySuccess === 'unix'
                          ? 'text-green-500' 
                          : darkMode 
                            ? 'text-gray-400 hover:text-gray-200' 
                            : 'text-gray-500 hover:text-gray-800'
                      }`}
                      aria-label="Copy Unix timestamp"
                    >
                      {copySuccess === 'unix' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className={`text-lg font-mono`}>
                    {result.unix}
                  </p>
                </div>

                {/* ISO Format */}
                <div className={`p-4 rounded-xl transition-all ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      ISO Format
                    </h4>
                    <button
                      onClick={() => copyToClipboard(result.iso, 'iso')}
                      className={`p-1.5 rounded-full transition-all hover:scale-110 ${
                        copySuccess === 'iso'
                          ? 'text-green-500' 
                          : darkMode 
                            ? 'text-gray-400 hover:text-gray-200' 
                            : 'text-gray-500 hover:text-gray-800'
                      }`}
                      aria-label="Copy ISO format"
                    >
                      {copySuccess === 'iso' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className={`text-md font-mono overflow-auto`}>
                    {result.iso}
                  </p>
                </div>

                {/* Local Time */}
                <div className={`p-4 rounded-xl transition-all ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Local Time
                    </h4>
                    <button
                      onClick={() => copyToClipboard(result.local, 'local')}
                      className={`p-1.5 rounded-full transition-all hover:scale-110 ${
                        copySuccess === 'local'
                          ? 'text-green-500' 
                          : darkMode 
                            ? 'text-gray-400 hover:text-gray-200' 
                            : 'text-gray-500 hover:text-gray-800'
                      }`}
                      aria-label="Copy local time"
                    >
                      {copySuccess === 'local' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className={`text-md`}>
                    {result.local}
                  </p>
                </div>

                {/* Relative Time */}
                <div className={`p-4 rounded-xl transition-all ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Relative Time
                    </h4>
                    <button
                      onClick={() => copyToClipboard(result.relative, 'relative')}
                      className={`p-1.5 rounded-full transition-all hover:scale-110 ${
                        copySuccess === 'relative'
                          ? 'text-green-500' 
                          : darkMode 
                            ? 'text-gray-400 hover:text-gray-200' 
                            : 'text-gray-500 hover:text-gray-800'
                      }`}
                      aria-label="Copy relative time"
                    >
                      {copySuccess === 'relative' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className={`text-md`}>
                    {result.relative}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {showHistory && (
          <div className="container-sm mb-16 fade-in" style={{animationDelay: "0.2s"}}>
            <div className={`p-6 rounded-2xl shadow-lg ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-100'
            } card`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-medium`}>
                  History
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-red-500 hover:text-red-600 px-3 py-1 text-sm rounded-full border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <History className={`w-10 h-10 mx-auto mb-4 opacity-40 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No history yet
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setUrl(item.url)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                        darkMode 
                          ? 'hover:bg-gray-700 bg-gray-700/70' 
                          : 'hover:bg-gray-100 bg-gray-50'
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
                        <ExternalLink className={`w-3.5 h-3.5 ml-3 opacity-50 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="container fade-in" style={{animationDelay: "0.4s"}}>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <h3 className={`text-2xl font-medium mb-3`}>
                Features
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-blue-100/60 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className={`text-md font-medium mb-1`}>
                  Lightning Fast
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Extract timestamps instantly
                </p>
              </div>

              <div className="text-center p-4 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-green-100/60 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Target className="w-6 h-6 text-green-500" />
                </div>
                <h4 className={`text-md font-medium mb-1`}>
                  Precise
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Accurate to the millisecond
                </p>
              </div>

              <div className="text-center p-4 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-purple-100/60 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Globe className="w-6 h-6 text-purple-500" />
                </div>
                <h4 className={`text-md font-medium mb-1`}>
                  Multiple Formats
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Unix, ISO, local & relative
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <DemoSection 
          onSelectExample={(exampleUrl) => setUrl(exampleUrl)}
          darkMode={darkMode}
        />
      </div>

      {/* Footer */}
      <footer className={`mt-auto py-6 ${darkMode ? 'bg-gray-800/80' : 'bg-gray-50/80'} backdrop-blur-sm`}>
        <div className="container">
          <div className="text-center max-w-xs mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <Linkedin className="w-3.5 h-3.5 text-white" />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                TimestampExtractor
              </span>
            </div>            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} LinkedIn Timestamp Extractor
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
