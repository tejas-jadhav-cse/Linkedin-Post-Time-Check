import { memo } from 'react';

interface AboutSectionProps {
  darkMode: boolean;
}

/**
 * About section component for displaying information about the application
 * Wrapped with React.memo for performance optimization when darkMode doesn't change
 */
export const AboutSection = memo(function AboutSection({ darkMode }: AboutSectionProps) {
  return (
    <div className="container-sm fade-in" style={{ animationDelay: '0.5s' }}>
      <div className={`mx-auto my-6 max-w-md p-4 rounded-xl border shadow-sm transition-all duration-300 ${
        darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="text-center">
          <h3 className={darkMode ? 'text-white' : 'text-gray-800'}>About This App</h3>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            LinkedIn Timestamp Extractor helps you get precise timestamps from any LinkedIn post or comment URL.
            Simply paste a URL and get accurate timing information instantly.
          </p>
        </div>
      </div>
    </div>  );
});
