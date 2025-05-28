import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

interface ProgressIndicatorProps {
  // Empty interface for future extensibility
}

/**
 * A simple progress bar that indicates loading state
 * This can be shown at the top of the page during navigation or data fetching
 */
export function ProgressIndicator({}: ProgressIndicatorProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { loading } = useApp();

  useEffect(() => {
    if (loading) {
      setVisible(true);
      setProgress(0);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          // Increase progress but slow down as we get closer to 90%
          const increment = Math.max(1, (95 - prev) / 10);
          const newProgress = prev + increment;
          return newProgress < 95 ? newProgress : 95;
        });
      }, 100);
      
      return () => clearInterval(interval);
    } else if (visible) {
      // When loading is complete, quickly finish the progress bar
      setProgress(100);
      
      // Hide after animation completes
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [loading]);
  
  if (!visible && !loading) return null;
  
  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <div 
        className="h-1 bg-blue-600 transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1
        }}
      />
    </div>
  );
}
