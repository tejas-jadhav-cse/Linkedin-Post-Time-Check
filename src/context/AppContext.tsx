import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useHistory } from '../hooks/useHistory';
import type { TimestampResult } from '../types';
import CONFIG from '../config/app.config';

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
  };  // Handle extraction of timestamp with improved error handling
  const handleExtract = async () => {
    if (!url.trim()) {
      setError('Please enter a LinkedIn URL');
      return;
    }

    // Basic URL validation before proceeding
    if (!url.toLowerCase().includes('linkedin.com')) {
      setError('Please enter a valid LinkedIn URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {      // Import the optimized extractor functions dynamically to improve initial load performance
      const { 
        extractTimestampFromURL, 
        getDemoResult, 
        analyzeLinkedInURL 
      } = await import('../utils/linkedinExtractor.optimized');
      
      // Generate demo data for testing if demo mode is enabled
      const demoMode = CONFIG.features.demo && url.includes('demo');
      let extractedResult = null;
      
      if (demoMode) {
        // Use the demo result generator
        extractedResult = getDemoResult();
      } else {
        // First analyze the URL to provide better feedback
        const urlAnalysis = analyzeLinkedInURL(url);
        
        if (!urlAnalysis.isValid) {
          // If URL is recognized as LinkedIn but known not to contain timestamp data
          if (urlAnalysis.type === 'profile' || urlAnalysis.type === 'company') {
            setError(`${urlAnalysis.reason}. Please provide a LinkedIn post or comment URL.`);
            setLoading(false);
            return;
          }
        }
        
        // Use the optimized extractor
        extractedResult = extractTimestampFromURL(url);
        
        // Better error messages based on URL type if extraction failed
        if (!extractedResult) {
          let errorMessage = 'Could not extract timestamp. ';
          
          if (urlAnalysis.type === 'unknown') {
            errorMessage += 'URL format not recognized. Please ensure this is a valid LinkedIn post or comment URL.';
          } else if (urlAnalysis.type === 'post' || urlAnalysis.type === 'feed-update') {
            errorMessage += 'Please ensure this is a direct link to a LinkedIn post.';
          } else if (urlAnalysis.type === 'comment') {
            errorMessage += 'Comment URL format may not be supported. Try using the parent post URL.';
          } else {
            errorMessage += 'Please ensure this is a valid LinkedIn post or comment URL.';
          }
          
          setError(errorMessage);
          setLoading(false);
          return;
        }
      }
      
      if (extractedResult) {
        setResult(extractedResult);
        addToHistory(url, extractedResult.unix);
      } else {
        setError('Could not extract timestamp. Please ensure this is a valid LinkedIn post or comment URL.');
      }
    } catch (err) {
      setError('An error occurred while extracting the timestamp');
      console.error('Extraction error:', err);
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