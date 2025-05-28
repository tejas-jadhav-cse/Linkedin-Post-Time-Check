import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const TimeZoneConverter = () => {
  const { darkMode } = useApp();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Time Zone Converter
          </h1>
        <p className={`text-xl max-w-3xl mx-auto mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Convert LinkedIn timestamps between different time zones.
        </p>
        
        <div className={`max-w-3xl mx-auto p-8 rounded-xl border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Coming soon! This feature is currently under development.
          </p>
        </div>      </div>
    </div>
    </Layout>
  );
};

export default TimeZoneConverter;
