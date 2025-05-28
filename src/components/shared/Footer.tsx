import { Linkedin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Footer() {
  const { darkMode } = useApp();
  
  return (
    <footer className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              TimestampExtractor
            </span>
          </div>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className={`text-xs sm:text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
            Designed & Developed with ❤️ by Tejas Jadhav
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} LinkedIn Timestamp Extractor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
