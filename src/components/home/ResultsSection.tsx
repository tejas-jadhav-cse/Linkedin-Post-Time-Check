import { useApp } from '../../context/AppContext';
import { CopyableField } from '../shared/CopyableField';

export function ResultsSection() {
  const { result, darkMode } = useApp();
  
  if (!result) return null;
  
  return (
    <div className="max-w-4xl mx-auto mb-10 sm:mb-16 px-3 sm:px-0">
      <div className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <span>Timestamp Successfully Extracted</span>
          </div>
          <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Here's Your Timestamp Data
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <CopyableField 
            label="Unix Timestamp"
            value={result.unix.toString()}
            field="unix"
          />
          
          <CopyableField 
            label="ISO Format"
            value={result.iso}
            field="iso"
          />
          
          <CopyableField 
            label="Local Time"
            value={result.local}
            field="local"
          />
          
          <CopyableField 
            label="Relative Time"
            value={result.relative}
            field="relative"
          />
        </div>
      </div>
    </div>
  );
}
