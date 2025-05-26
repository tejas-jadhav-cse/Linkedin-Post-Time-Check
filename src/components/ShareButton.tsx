import { useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';
import type { TimestampResult } from '../types';

interface ShareButtonProps {
  result: TimestampResult;
  url: string;
  darkMode: boolean;
}

export function ShareButton({ result, url, darkMode }: ShareButtonProps) {
  const [isShared, setIsShared] = useState(false);
  const [supportsShare, setSupportsShare] = useState(false);
  
  // Check if Web Share API is supported
  useEffect(() => {
    setSupportsShare(!!navigator.share);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'LinkedIn Timestamp',
      text: `LinkedIn Post Timestamp: ${result.local} (Unix: ${result.unix})`,
      url: window.location.href
    };

    try {
      if (supportsShare) {
        await navigator.share(shareData);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(
          `LinkedIn Post Timestamp:\n${result.local}\nISO: ${result.iso}\nUnix: ${result.unix}\nExtracted from: ${url}`
        );
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center space-x-1 py-2 px-4 rounded-lg transition-all ${
        darkMode
          ? 'bg-blue-600 hover:bg-blue-500 text-white'
          : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
      }`}
      aria-label="Share result"
    >      {isShared ? (
        <>
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{supportsShare ? 'Shared' : 'Copied'}</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">{supportsShare ? 'Share' : 'Copy All'}</span>
        </>
      )}
    </button>
  );
}
