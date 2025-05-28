import { Zap, Target, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function FeatureSection() {
  const { darkMode } = useApp();
  
  return (
    <div className="max-w-6xl mx-auto mb-10 sm:mb-16 px-3 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Why Use Our Extractor?
        </h3>
        <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Professional tools for accurate timestamp extraction
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        <FeatureCard 
          icon={<Zap className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />}
          title="Lightning Fast"
          description="Extract timestamps in seconds, not minutes. No complex setup required."
          bgColor="bg-blue-100 dark:bg-blue-900/30"
        />
        
        <FeatureCard 
          icon={<Target className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />}
          title="Precise Results"
          description="Get exact timestamps down to the millisecond with our proven algorithm."
          bgColor="bg-green-100 dark:bg-green-900/30"
        />
        
        <div className="sm:col-span-2 md:col-span-1 mx-auto max-w-md sm:max-w-none">
          <FeatureCard 
            icon={<Globe className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />}
            title="Multiple Formats"
            description="Unix, ISO, local time, and relative formats for any use case."
            bgColor="bg-purple-100 dark:bg-purple-900/30"
          />
        </div>
      </div>
      
      <div className={`mt-8 sm:mt-12 p-4 sm:p-8 rounded-lg sm:rounded-xl border ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
      }`}>
        <h3 className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>About This App</h3>
        <p className={`text-sm sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          LinkedIn Timestamp Extractor helps you get precise timestamps from any LinkedIn post or comment URL. 
          Simply paste a URL and get accurate timing information instantly. Our advanced algorithm works with 
          various LinkedIn URL formats and provides timestamps in multiple useful formats.
        </p>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

function FeatureCard({ icon, title, description, bgColor }: FeatureCardProps) {
  const { darkMode } = useApp();
  
  return (
    <div className="text-center p-4 sm:p-6">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
        {icon}
      </div>
      <h4 className={`text-lg sm:text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h4>
      <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
}
