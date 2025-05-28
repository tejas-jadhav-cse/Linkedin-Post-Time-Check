import { Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function InputSection() {
  const { 
    url, 
    setUrl, 
    loading, 
    error, 
    darkMode, 
    handleExtract 
  } = useApp();
  
  return (
    <div className="max-w-2xl mx-auto mb-10 sm:mb-16 px-3 sm:px-0">
      <div className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your LinkedIn URL here..."
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl border transition-all ${
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
            <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={handleExtract}
            disabled={loading || !url.trim()}
            className={`w-full py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-200 ${
              loading || !url.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl'
            } text-white`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Extracting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Extract Timestamp</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
