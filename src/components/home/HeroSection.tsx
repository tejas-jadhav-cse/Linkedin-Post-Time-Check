import { useApp } from '../../context/AppContext';

export function HeroSection() {
  const { darkMode } = useApp();
  
  return (
    <div className="text-center">
      <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-3 sm:mb-6 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Extract LinkedIn
      </h1>
      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold text-blue-600 mb-6 sm:mb-8`}>
        Timestamps Instantly
      </h2>
      <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 sm:mb-12 ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Get exact timestamps from any LinkedIn post or comment in seconds. 
        No more guessing when content was published.
      </p>
    </div>
  );
}
