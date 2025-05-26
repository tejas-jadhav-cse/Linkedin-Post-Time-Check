// LinkedIn timestamp extraction utilities
import CONFIG from '../config/app.config';

export interface TimestampResult {
  unix: number;
  iso: string;
  local: string;
  relative: string;
}

export function extractPostId(linkedinURL: string): string | null {
  const match = CONFIG.validation.postIdPattern.exec(linkedinURL);
  return match ? match[1] : null;
}

export function extractCommentId(linkedinURL: string): string | null {
  const decodedURL = decodeURIComponent(linkedinURL);
  const match = CONFIG.validation.commentIdPattern.exec(decodedURL);
  return match ? match[1] : null;
}

export function extractUnixTimestamp(postId: string): number | null {
  if (!postId) return null;
  
  try {
    // Convert to binary and extract first 41 bits
    const asBinary = BigInt(postId).toString(2);
    const first41Chars = asBinary.slice(0, 41);
    const timestamp = parseInt(first41Chars, 2);
    return timestamp;
  } catch (error) {
    console.error('Error extracting timestamp:', error);
    return null;
  }
}

export function formatTimestamp(timestamp: number): TimestampResult | null {
  if (!timestamp) return null;
  
  try {
    const date = new Date(timestamp);
    
    // Calculate relative time
    const now = new Date();
    const diffMs = now.getTime() - timestamp;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    let relative: string;
    if (diffMinutes < 1) {
      relative = 'Just now';
    } else if (diffMinutes < 60) {
      relative = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      relative = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      relative = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      relative = date.toLocaleDateString();
    }
    
    return {
      unix: timestamp,
      iso: date.toISOString(),
      local: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      relative
    };
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return null;
  }
}

export function extractTimestampFromURL(linkedinURL: string): TimestampResult | null {
  // Try extracting comment ID first, then post ID
  const commentId = extractCommentId(linkedinURL);
  const postId = commentId || extractPostId(linkedinURL);
  
  if (!postId) return null;
  
  const timestamp = extractUnixTimestamp(postId);
  if (!timestamp) return null;
  
  return formatTimestamp(timestamp);
}
