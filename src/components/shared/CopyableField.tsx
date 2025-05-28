import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { TimestampResult } from '../../types';

interface CopyableFieldProps {
  label: string;
  value: string;
  field: keyof TimestampResult;
}

export function CopyableField({ label, value, field }: CopyableFieldProps) {
  const [copySuccess, setCopySuccess] = useState('');
  const { darkMode } = useApp();
  
  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(fieldName);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className={`p-4 sm:p-6 rounded-lg sm:rounded-xl border ${
      darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h4 className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {label}
        </h4>
        <button
          onClick={() => copyToClipboard(value, field)}
          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
            copySuccess === field
              ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
              : darkMode 
                ? 'hover:bg-gray-600 text-gray-400' 
                : 'hover:bg-gray-200 text-gray-600'
          }`}
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          {copySuccess === field ? 
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : 
            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>
      <p className={`text-base sm:text-xl ${field === 'unix' ? 'font-mono' : ''} break-all ${
        darkMode ? 'text-gray-300' : 'text-gray-700'}`
      }>
        {value}
      </p>
    </div>
  );
}
