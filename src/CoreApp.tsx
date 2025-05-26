import { useState, useEffect } from 'react';
import type { TimestampResult } from './types';

// Share button component directly included to avoid import issues
function ShareButton({ result, url, darkMode }: { result: TimestampResult, url: string, darkMode: boolean }) {
  const [isShared, setIsShared] = useState(false);
  const [supportsShare, setSupportsShare] = useState(false);
  
  // Check if Web Share API is supported
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setSupportsShare(!!navigator.share);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'LinkedIn Timestamp',
      text: `LinkedIn Post Timestamp: ${result.local} (Unix: ${result.unix})`,
      url: window.location.href
    };

    try {
      if (supportsShare) {
        await navigator.share(shareData);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(
          `LinkedIn Post Timestamp:\n${result.local}\nISO: ${result.iso}\nUnix: ${result.unix}\nExtracted from: ${url}`
        );
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center space-x-1 py-1 px-3 rounded-lg transition-all ${
        darkMode
          ? 'bg-blue-600 hover:bg-blue-500 text-white'
          : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
      }`}
      aria-label="Share result"
    >
      {isShared ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="text-sm font-medium">{supportsShare ? 'Shared' : 'Copied'}</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span className="text-sm font-medium">{supportsShare ? 'Share' : 'Copy All'}</span>
        </>
      )}
    </button>
  );
}

function CoreApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TimestampResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Check system preference for dark mode on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedMode = localStorage.getItem('darkMode');
      
      const isDark = savedMode ? savedMode === 'true' : prefersDarkMode;
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };
  
  // Simulate timestamp extraction
  const extractTimestamp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a LinkedIn URL');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (url.includes('linkedin.com')) {
        const now = new Date();
        setResult({
          unix: Math.floor(now.getTime() / 1000),
          iso: now.toISOString(),
          local: now.toLocaleString(),
          relative: 'Just now'
        });
        setLoading(false);
      } else {
        setError('Not a valid LinkedIn URL');
        setResult(null);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            LinkedIn Timestamp
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? 
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
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            }
          </button>
        </div>
        
        <form onSubmit={extractTimestamp}>
          <div className="mb-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste LinkedIn URL here..."
              className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Extracting...' : 'Extract Timestamp'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
        
        {result && (          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Result:</h2>
              
              {/* Share Button */}
              <ShareButton result={result} url={url} darkMode={darkMode} />
            </div>
            
            <div className="grid gap-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">Unix Timestamp</div>
                <div className="font-mono text-gray-800 dark:text-gray-200">{result.unix}</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">ISO Format</div>
                <div className="font-mono text-gray-800 dark:text-gray-200">{result.iso}</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">Local Time</div>
                <div className="font-mono text-gray-800 dark:text-gray-200">{result.local}</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">Relative</div>
                <div className="font-mono text-gray-800 dark:text-gray-200">{result.relative}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoreApp;
