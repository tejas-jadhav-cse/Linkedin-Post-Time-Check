import { useState, useEffect } from 'react';
import './App.css';
import type { TimestampResult } from './types';

// Import basic functionality
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TimestampResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{url: string; result: TimestampResult}>>([]);

  // Check for dark mode preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedMode = localStorage.getItem('darkMode');
      
      const isDark = savedMode ? savedMode === 'true' : prefersDarkMode;
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
      
      // Load history from localStorage
      try {
        const savedHistory = localStorage.getItem('linkedinTimestampHistory');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (err) {
        console.error('Error loading history:', err);
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  // Extract timestamp from LinkedIn URL
  const extractTimestamp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a LinkedIn URL');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call - in the real app this would call the linkedinExtractor utility
    setTimeout(() => {
      if (url.includes('linkedin.com')) {
        const now = new Date();
        const newResult = {
          unix: Math.floor(now.getTime() / 1000),
          iso: now.toISOString(),
          local: now.toLocaleString(),
          relative: 'Just now'
        };
        
        setResult(newResult);
        
        // Add to history
        const newHistory = [
          { url, result: newResult },
          ...history.slice(0, 9) // Keep only the 10 most recent
        ];
        setHistory(newHistory);
        localStorage.setItem('linkedinTimestampHistory', JSON.stringify(newHistory));
        
        setLoading(false);
      } else {
        setError('Not a valid LinkedIn URL');
        setResult(null);
        setLoading(false);
      }
    }, 1000);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('linkedinTimestampHistory');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`py-4 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md fixed w-full top-0 z-10`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="text-xl font-bold">LinkedIn Timestamp</span>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">LinkedIn Post Timestamp Extractor</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={extractTimestamp} className="space-y-4">
              <div>
                <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LinkedIn Post URL
                </label>
                <input
                  type="text"
                  id="linkedin-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/posts/username_postid-activity-12345..."
                  className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Paste the URL of a LinkedIn post to extract its timestamp
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Extracting...
                  </span>
                ) : 'Extract Timestamp'}
              </button>
            </form>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400">
              {error}
            </div>
          )}
          
          {/* Results Section */}
          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Results</h2>
                
                {/* Share button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `LinkedIn Post Timestamp:\n${result.local}\nISO: ${result.iso}\nUnix: ${result.unix}\nExtracted from: ${url}`
                    );
                  }}
                  className="flex items-center space-x-1 py-1 px-3 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-blue-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span className="text-sm font-medium">Copy</span>
                </button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Unix Timestamp</div>
                  <div className="font-mono text-lg">{result.unix}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">ISO Format</div>
                  <div className="font-mono text-sm sm:text-base overflow-x-auto">{result.iso}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Local Time</div>
                  <div className="font-mono">{result.local}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Relative Time</div>
                  <div>{result.relative}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* History Section */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Extractions</h2>
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Clear History
                </button>
              </div>
              
              <div className="space-y-3">
                {history.map((item, index) => (
                  <div key={index} className="p-3 border rounded-md border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      <div className="font-medium truncate max-w-xs">{item.url}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.result.local}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>LinkedIn Timestamp Extractor</p>
          <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
