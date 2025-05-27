import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useHistory } from '../hooks/useHistory';
import type { TimestampResult } from '../types';

interface AppContextType {
  url: string;
  setUrl: (url: string) => void;
  result: TimestampResult | null;
  setResult: (result: TimestampResult | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  copySuccess: string;
  setCopySuccess: (format: string) => void;
  copyToClipboard: (text: string, format: string) => Promise<void>;
  history: Array<{
    id: string;
    url: string;
    timestamp: number;
    extractedAt: number;
  }>;
  addToHistory: (url: string, timestamp: number) => void;
  clearHistory: () => void;
  handleExtract: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<TimestampResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  
  const { history, addToHistory, clearHistory } = useHistory();

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  // Handle copy to clipboard
  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(format);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle extraction of timestamp
  const handleExtract = async () => {
    if (!url.trim()) {
      setError('Please enter a LinkedIn URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Import the extractor function dynamically to improve initial load performance
      const { extractTimestampFromURL } = await import('../utils/linkedinExtractor');
      const extractedResult = extractTimestampFromURL(url);
      
      if (extractedResult) {
        setResult(extractedResult);
        addToHistory(url, extractedResult.unix);
      } else {
        setError('Could not extract timestamp. Please ensure this is a valid LinkedIn post or comment URL.');
      }
    } catch (err) {
      setError('An error occurred while extracting the timestamp');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    url,
    setUrl,
    result,
    setResult,
    loading,
    setLoading,
    error,
    setError,
    darkMode,
    toggleDarkMode,
    showHistory,
    setShowHistory,
    copySuccess,
    setCopySuccess,
    copyToClipboard,
    history,
    addToHistory,
    clearHistory,
    handleExtract,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}