import { ArrowRight, Zap } from 'lucide-react';

export const VersionNav = () => {
  const params = new URLSearchParams(window.location.search);
  const isStandardVersion = params.get('standard') === 'true';
  
  return (
    <div className="version-nav fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-4 py-2 flex items-center space-x-2">
        {isStandardVersion ? (
          <a 
            href="/" 
            className="text-purple-600 dark:text-purple-400 flex items-center hover:underline"
            title="Switch to enhanced version (default)"
          >
            <span>Enhanced</span>
            <Zap size={16} className="ml-1" />
          </a>
        ) : (
          <a 
            href="/?standard=true" 
            className="text-blue-600 dark:text-blue-400 flex items-center hover:underline"
            title="Switch to standard version"
          >
            <span>Standard</span>
            <ArrowRight size={16} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};