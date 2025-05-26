import { useEffect } from 'react';

export default function DebugFixed() {
  useEffect(() => {
    console.log('Debug component mounted');
    console.log('Document classes:', document.documentElement.className);
  }, []);
  
  return null;
}
