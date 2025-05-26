import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [errors, setErrors] = useState<string[]>([]);
  
  useEffect(() => {
    // Capture console errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      setErrors(prev => [...prev, args.join(' ')]);
      originalConsoleError.apply(console, args);
    };
    
    // Capture unhandled errors
    const handleError = (event: ErrorEvent) => {
      setErrors(prev => [...prev, `UNHANDLED ERROR: ${event.error?.message || 'Unknown error'}`]);
      event.preventDefault();
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      console.error = originalConsoleError;
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  if (errors.length > 0) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'red',
        color: 'white',
        padding: '1rem',
        zIndex: 9999,
        maxHeight: '50vh',
        overflow: 'auto'
      }}>
        <h2>Errors detected:</h2>
        <ul>
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  return children;
}
