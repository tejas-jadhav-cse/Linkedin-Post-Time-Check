import { memo } from 'react';
import { History, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

const HistorySection = memo(function HistorySectionComponent() {
  const { darkMode, history, clearHistory, setUrl } = useApp();

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className={`p-8 rounded-2xl border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Extractions
          </h3>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-red-500 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
        
        {history.length === 0 ? (
          <div className="text-center py-8">
            <History className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No recent extractions. Extract a timestamp to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => setUrl(item.url)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? 'border-gray-600 hover:bg-gray-700 bg-gray-700/50' 
                    : 'border-gray-200 hover:bg-gray-50 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.url}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {new Date(item.extractedAt).toLocaleString()}
                    </p>
                  </div>
                  <ExternalLink className={`w-4 h-4 ml-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>  );
});

export default HistorySection;
