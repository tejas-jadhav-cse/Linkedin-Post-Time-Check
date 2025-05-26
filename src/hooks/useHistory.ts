import { useState, useEffect } from 'react';
import CONFIG from '../config/app.config';

export interface HistoryItem {
  id: string;
  url: string;
  timestamp: number;
  extractedAt: number;
}

const STORAGE_KEY = 'linkedin-extractor-history';
const MAX_HISTORY_ITEMS = CONFIG.ui.maxHistoryItems;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  const addToHistory = (url: string, timestamp: number) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      url,
      timestamp,
      extractedAt: Date.now()
    };

    setHistory(prev => {
      const filtered = prev.filter(item => item.url !== url);
      const newHistory = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
}
