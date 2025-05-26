import { useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';

interface DemoSectionProps {
  onSelectExample: (url: string) => void;
  darkMode: boolean;
}

const exampleURLs = [
  {
    type: 'LinkedIn Post',
    url: 'https://www.linkedin.com/posts/example_7206573431516921856_innovation-technology-future',
    description: 'Example of a typical LinkedIn post URL with embedded timestamp'
  },
  {
    type: 'LinkedIn Comment',
    url: 'https://www.linkedin.com/posts/example_fsd_comment:(1234567890987654321,urn:li:activity:7206573431516921856)_comment-example',
    description: 'Example of a LinkedIn comment URL with timestamp'
  }
];

export function DemoSection({ onSelectExample, darkMode }: DemoSectionProps) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="container-sm fade-in" style={{animationDelay: "0.5s"}}>
      <div className={`mb-6 p-3 rounded-lg border ${
        darkMode 
          ? 'bg-gray-800/20 border-gray-700/20' 
          : 'bg-blue-50/30 border-blue-100/40'
      } transition-all duration-300`}>
        <button
          onClick={() => setShowDemo(!showDemo)}
          className={`flex items-center space-x-2 text-xs font-medium transition-all ${
            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showDemo ? 'Hide' : 'Show'} examples</span>
        </button>
        
        {showDemo && (
          <div className="mt-4 space-y-2 fade-in">
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try these example URLs:
            </p>
            
            {exampleURLs.map((example, index) => (
              <div 
                key={index}
                className={`p-2 rounded cursor-pointer transition-all hover:translate-x-1 duration-300 ${
                  darkMode 
                    ? 'hover:bg-gray-700/30 bg-gray-700/10' 
                    : 'hover:bg-blue-100/30 bg-blue-50/40'
                }`}
                onClick={() => onSelectExample(example.url)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`font-medium text-xs ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {example.type}
                    </div>
                    <div className={`text-xs mt-0.5 ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {example.description}
                    </div>
                    <div className={`text-xs mt-1 font-mono break-all overflow-hidden text-ellipsis ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} style={{maxWidth: "100%", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical"}}>
                      {example.url}
                    </div>
                  </div>
                  <ExternalLink className={`w-3.5 h-3.5 ml-2 flex-shrink-0 opacity-50 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>
            ))}
            
            <div className={`text-xs italic ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Example URLs for demonstration purposes only
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
