import { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun 
} from 'lucide-react';

function MinimalApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [url, setUrl] = useState('');
  
  // Check system preference for dark mode on mount
  useEffect(() => {
    // Check if we're in a browser environment (important for SSR compatibility)
    if (typeof window !== 'undefined') {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedMode = localStorage.getItem('darkMode');
      
      // If saved preference exists, use it; otherwise use system preference
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

  // Handle URL input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('URL submitted:', url);
    // In the full app, this would trigger the timestamp extraction
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            LinkedIn Timestamp Extractor
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This is a minimal working version to verify that the layout and styling are working properly.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder="Paste LinkedIn URL here..."
              className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Extract Timestamp
          </button>
        </form>
        
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 bg-red-500 dark:bg-red-600 rounded-lg"></div>
            <div className="h-16 bg-green-500 dark:bg-green-600 rounded-lg"></div>
            <div className="h-16 bg-blue-500 dark:bg-blue-600 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>  );
}

export default MinimalApp;
