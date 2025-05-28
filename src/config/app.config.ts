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
  // Validation patterns with improved support for various LinkedIn URL formats
  validation: {
    // Basic pattern for LinkedIn URLs
    linkedinUrlPattern: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i,
    
    // Enhanced pattern for LinkedIn post IDs (19-21 digits)
    postIdPattern: /(?:^|[^0-9])([0-9]{19,21})(?:$|[^0-9])/,
      // Enhanced pattern for LinkedIn comment formats
    commentIdPattern: /fsd_comment:\((\d+),urn:li:activity:\d+\)|commentUrn=urn%3Ali%3Acomment%3A\((\d+)%2C|activity:(\d+)/,
    
    // Known LinkedIn URL patterns for posts and updates
    postUrlPatterns: [
      // Post URLs
      /linkedin\.com\/posts\/[^/]+_([0-9]{19,21})(?:_|\/)/i,
      
      // Feed update URLs
      /linkedin\.com\/feed\/update\/urn:li:activity:([0-9]{19,21})/i,
      
      // Shares URLs
      /linkedin\.com\/.*\/shares\/([0-9]{19,21})/i,
      
      // Pulse article URLs
      /linkedin\.com\/pulse\/[^/]+_([0-9]{19,21})(?:_|\/)/i
    ]
  }
};

export default CONFIG;
