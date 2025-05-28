import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export function DevelopmentNotice() {
  const [showNotice, setShowNotice] = useState(true);
  const { darkMode } = useApp();
  
  if (!showNotice) return null;
  
  return (
    <div className="fixed bottom-3 sm:bottom-6 md:bottom-8 left-3 sm:left-6 md:left-8 z-50 max-w-[calc(100%-1.5rem)] sm:max-w-xs md:max-w-sm animate-fadein">
      <div className={`flex items-start rounded-lg sm:rounded-xl border shadow-lg p-3 sm:p-4 md:p-5 transition-all duration-300 transform hover:-translate-y-1 ${
        darkMode 
          ? 'bg-amber-900/80 border-amber-700 text-amber-100 backdrop-blur-sm' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <div className="flex-shrink-0 mr-2 sm:mr-3 md:mr-4">
          <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${
            darkMode ? 'bg-amber-800' : 'bg-amber-100'
          }`}>
            <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${darkMode ? 'text-amber-200' : 'text-amber-600'}`} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm sm:text-base truncate">Notice</h3>
            <button 
              onClick={() => setShowNotice(false)}
              className={`p-1 rounded-full hover:bg-amber-700/20 transition-colors flex-shrink-0 ml-2 ${
                darkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-700 hover:text-amber-900'
              }`}
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
          <p className={`text-xs sm:text-sm mt-1 text-left ${darkMode ? 'text-amber-200' : 'text-amber-700'}`}>
            WebApp is in Development phase, but don't worry you can use it.
          </p>
        </div>
      </div>
    </div>
  );
}
