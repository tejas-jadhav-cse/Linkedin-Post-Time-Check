import { 
  Clock, 
  History as HistoryIcon, 
  Moon, 
  Sun, 
  Linkedin, 
  ChevronDown, 
  Settings, 
  Database, 
  Globe, 
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useState, useRef, useEffect } from 'react';

export function Navigation() {
  const { darkMode, toggleDarkMode, showHistory, setShowHistory } = useApp();
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setToolsMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <nav className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className={`text-lg sm:text-xl font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                TimestampExtractor
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4" ref={toolsMenuRef}>            <div className="relative">
              <button
                onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
                className={`p-1 sm:p-2 rounded-lg transition-colors flex items-center ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Tools menu"
              >
                <Clock className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Tools</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsMenuOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="py-1">
                    <Link
                      to="/tools"
                      className={`flex items-center px-4 py-2 text-sm ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setToolsMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      <span>All Tools</span>
                    </Link>
                    <Link
                      to="/batch"
                      className={`flex items-center px-4 py-2 text-sm ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setToolsMenuOpen(false)}
                    >
                      <Database className="w-4 h-4 mr-2" />
                      <span>Batch Analyzer</span>
                    </Link>
                    <Link
                      to="/timezone"
                      className={`flex items-center px-4 py-2 text-sm ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setToolsMenuOpen(false)}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      <span>Timezone Converter</span>
                    </Link>
                    <Link
                      to="/api"
                      className={`flex items-center px-4 py-2 text-sm ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setToolsMenuOpen(false)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      <span>API Access</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="View history"
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
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
