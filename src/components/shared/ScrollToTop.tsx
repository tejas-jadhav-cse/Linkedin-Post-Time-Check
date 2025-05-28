import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode } = useApp();
  
  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button
      className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      } ${
        darkMode 
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
          : 'bg-white text-gray-600 hover:bg-gray-100'
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
