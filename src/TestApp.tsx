import { useState } from 'react';

function TestApp() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Simple Test App
        </h1>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This is a simple test to verify Tailwind styles are working.
        </p>
        
        <button
          onClick={toggleTheme}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors mb-4"
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-500 dark:bg-red-700 text-white p-4 rounded-lg">
            Red Box
          </div>
          <div className="bg-blue-500 dark:bg-blue-700 text-white p-4 rounded-lg">
            Blue Box
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestApp;
