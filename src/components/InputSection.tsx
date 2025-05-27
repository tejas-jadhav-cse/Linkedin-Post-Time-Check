import { memo } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InputSectionProps {
  darkMode: boolean;
}

/**
 * Input section component for URL entry and extraction
 * Uses React.memo for performance optimization
 */
export const InputSection = memo(function InputSection({ darkMode }: InputSectionProps) {
  const { url, setUrl, error, loading, handleExtract } = useApp();

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div className={`p-8 rounded-2xl border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="space-y-6">
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your LinkedIn URL here..."
              className={`w-full px-6 py-4 text-lg rounded-xl border transition-all ${
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
            <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={handleExtract}
            disabled={loading || !url.trim()}
            className={`w-full py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-200 ${
              loading || !url.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl'
            } text-white`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Extracting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Extract Timestamp</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});