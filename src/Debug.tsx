import { useEffect } from 'react';

function Debug() {
  useEffect(() => {
    console.log('React DOM loaded successfully');
    
    // Check for dark mode
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    console.log('Dark mode enabled:', darkModeEnabled);
    
    // Check for stylesheets
    const styleSheets = document.styleSheets;
    console.log('Stylesheet count:', styleSheets.length);
    
    // Check Tailwind
    try {
      const tailwindExists = !!document.querySelector('.container');
      console.log('Tailwind classes found:', tailwindExists);
    } catch (e) {
      console.error('Error checking Tailwind:', e);
    }
    
    // Check for any global errors
    window.onerror = (msg, source, lineNo, colNo, error) => {
      console.error('Global error:', { msg, source, lineNo, colNo, error });
    };
  }, []);
  
  return null;
}

export default Debug;
