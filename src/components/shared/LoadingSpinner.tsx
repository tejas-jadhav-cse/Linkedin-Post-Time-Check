import { useApp } from '../../context/AppContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'border-blue-600' 
}: LoadingSpinnerProps) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  return (
    <div className={`${sizeClass[size]} border-2 ${color} border-t-transparent rounded-full animate-spin`}></div>
  );
}

interface LoadingFallbackProps {
  height?: string;
  message?: string;
}

export function LoadingFallback({ 
  height = 'h-40', 
  message = 'Loading...' 
}: LoadingFallbackProps) {
  const { darkMode } = useApp();
  
  return (
    <div className={`${height} flex flex-col items-center justify-center`}>
      <LoadingSpinner size="md" />
      {message && (
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
