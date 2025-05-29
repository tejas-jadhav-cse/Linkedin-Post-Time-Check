import { Clock, History, Globe, Sparkles, BarChart, Target, FileEdit } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  darkMode: boolean;
}

const ToolCard = ({ title, description, icon, url, darkMode }: ToolCardProps) => {
  return (
    <Link 
      to={url}
      className={`p-6 rounded-xl border transition-all hover:scale-[1.02] ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-lg mr-4 flex items-center justify-center ${
          darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
        }`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
      </div>      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
    </Link>
  );
};

export const Tools = () => {
  const { darkMode } = useApp();
  const tools = [
    {
      title: 'Timestamp Extractor',
      description: 'Extract exact timestamps from any LinkedIn post or comment URL',
      icon: <Clock className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
      url: '/',
    },
    {
      title: 'Post History',
      description: 'View and manage your LinkedIn post extraction history',
      icon: <History className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />,
      url: '/?showHistory=true',
    },
    {
      title: 'Batch URL Analyzer',
      description: 'Process multiple LinkedIn URLs at once for bulk timestamp extraction',
      icon: <BarChart className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />,
      url: '/batch',
    },
    {
      title: 'Post Formatter',
      description: 'Format and optimize LinkedIn posts for maximum engagement and readability',
      icon: <FileEdit className={`w-6 h-6 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />,
      url: '/formatter',
    },
    {
      title: 'URL Validator',
      description: 'Check if a URL is a valid LinkedIn post or comment URL',
      icon: <Sparkles className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />,
      url: '/validator',
    },
    {
      title: 'Time Zone Converter',
      description: 'Convert LinkedIn timestamps between different time zones',
      icon: <Globe className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />,
      url: '/timezone',
    },
    {      title: 'API Access',
      description: 'Developer tools for integrating timestamp extraction into your applications',
      icon: <Target className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />,
      url: '/api',
    },
  ];
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            LinkedIn Tools Collection
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A comprehensive set of tools for LinkedIn content analysis and timestamp extraction
          </p>
        </div>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <ToolCard 
            key={tool.title}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            url={tool.url}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
    </Layout>  );
};
