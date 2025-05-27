import { memo } from 'react';
import { CheckCircle2, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Component definition using React memo for performance
const ResultSection = memo(function ResultSectionComponent() {
  const { result, darkMode, copySuccess, copyToClipboard } = useApp();

  if (!result) return null;

  return (
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
    </div>  );
});

export default ResultSection;