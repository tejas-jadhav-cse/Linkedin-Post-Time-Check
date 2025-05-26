// Application configuration
export const CONFIG = {
  // App metadata
  app: {
    name: 'LinkedIn Timestamp Extractor',
    description: 'Extract exact timestamps from LinkedIn posts and comments',
    version: '1.0.0',
    author: 'LinkedIn Timestamp Extractor Team'
  },
  
  // UI configuration
  ui: {
    maxHistoryItems: 10,
    animationDuration: {
      fade: 500,
      slide: 400,
      loading: 800
    },
    themes: {
      light: {
        primary: 'rgb(0, 119, 181)', // LinkedIn blue
        background: 'from-blue-50 via-white to-indigo-50'
      },
      dark: {
        primary: 'rgb(59, 130, 246)',
        background: 'from-gray-900 via-gray-800 to-gray-900'
      }
    }
  },
  
  // Feature flags
  features: {
    darkMode: true,
    history: true,
    clipboard: true,
    animations: true,
    demo: true
  },
  
  // External links
  links: {
    originalRepo: 'https://github.com/Ollie-Boyd/Linkedin-post-timestamp-extractor',
    documentation: '#',
    support: '#'
  },
  
  // Validation patterns
  validation: {
    linkedinUrlPattern: /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
    postIdPattern: /([0-9]{19})/,
    commentIdPattern: /fsd_comment:\((\d+),urn:li:activity:\d+\)/
  }
};

export default CONFIG;
