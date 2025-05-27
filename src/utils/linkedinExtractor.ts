// LinkedIn timestamp extraction utilities with performance optimizations
import CONFIG from '../config/app.config';
import type { TimestampResult } from '../types';

/**
 * Extract the post ID from a LinkedIn URL
 * @param linkedinURL - The LinkedIn URL to extract from
 * @returns The extracted post ID or null if not found
 */
export function extractPostId(linkedinURL: string): string | null {
  if (!linkedinURL || typeof linkedinURL !== 'string') return null;
  
  // Use a memoization cache for commonly used URLs
  if (!extractPostId.cache) {
    extractPostId.cache = new Map<string, string | null>();
  }
  
  // Return cached result if available
  if (extractPostId.cache.has(linkedinURL)) {
    return extractPostId.cache.get(linkedinURL) || null;
  }
  
  const match = CONFIG.validation.postIdPattern.exec(linkedinURL);
  const result = match ? match[1] : null;
  
  // Cache the result
  extractPostId.cache.set(linkedinURL, result);
  
  return result;
}
// Add cache to function type
extractPostId.cache = new Map<string, string | null>();

/**
 * Extract the comment ID from a LinkedIn URL
 * @param linkedinURL - The LinkedIn URL to extract from
 * @returns The extracted comment ID or null if not found
 */
export function extractCommentId(linkedinURL: string): string | null {
  if (!linkedinURL || typeof linkedinURL !== 'string') return null;
  
  try {
    const decodedURL = decodeURIComponent(linkedinURL);
    const match = CONFIG.validation.commentIdPattern.exec(decodedURL);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error decoding URL:', error);
    return null;
  }
}

/**
 * Extract the Unix timestamp from a LinkedIn post ID
 * @param postId - The LinkedIn post ID
 * @returns The extracted Unix timestamp or null if not extractable
 */
export function extractUnixTimestamp(postId: string): number | null {
  if (!postId) return null;
  
  try {
    // LinkedIn uses the first 41 bits for the timestamp
    // This is a more efficient implementation using bitwise operations
    const postIdBigInt = BigInt(postId);
    const timestamp = Number(postIdBigInt >> BigInt(22)); // Shift right to get first 41 bits
    
    // Validate the timestamp (must be after 2003 when LinkedIn was founded and before current time)
    const linkedInFoundedTimestamp = new Date('2003-01-01').getTime() / 1000;
    const now = Date.now() / 1000;
    
    if (timestamp < linkedInFoundedTimestamp || timestamp > now) {
      console.warn('Extracted timestamp is outside valid range:', timestamp);
      return null;
    }
    
    return timestamp;
  } catch (error) {
    console.error('Error extracting timestamp:', error);
    return null;
  }
}

/**
 * A simple cache to store previously computed timestamp formats
 */
const timestampCache = new Map<number, TimestampResult>();

/**
 * Format a Unix timestamp into various human-readable formats
 * Uses a cache for better performance when formatting the same timestamp repeatedly
 * 
 * @param timestamp - Unix timestamp in seconds or milliseconds
 * @returns Formatted timestamp result or null if invalid
 */
export function formatTimestamp(timestamp: number): TimestampResult | null {
  if (!timestamp || typeof timestamp !== 'number') return null;
  
  // Ensure timestamp is a valid number
  const validTimestamp = Number(timestamp);
  if (isNaN(validTimestamp)) return null;
  
  // Check cache first for performance
  if (timestampCache.has(validTimestamp)) {
    return timestampCache.get(validTimestamp)!;
  }
  try {
    // Convert to milliseconds if needed (LinkedIn timestamps are typically in seconds)
    const timestampMs = validTimestamp < 10000000000 ? validTimestamp * 1000 : validTimestamp;
    const date = new Date(timestampMs);
    
    // Validate the date
    if (isNaN(date.getTime())) {
      throw new Error('Invalid timestamp: ' + validTimestamp);
    }
    
    // Calculate relative time more efficiently
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    // Format the relative time with proper pluralization
    let relative: string;
    if (diffSeconds < 10) {
      relative = 'Just now';
    } else if (diffMinutes < 1) {
      relative = `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffMinutes < 60) {
      relative = `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      relative = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      relative = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      relative = date.toLocaleDateString();
    }
    
    const result = {
      unix: Math.floor(timestampMs / 1000), // Always store as seconds for consistency
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
      // Store in cache for future use (with cache size limit)
    if (timestampCache.size > 100) {
      // Prevent unbounded growth by clearing oldest entry
      const oldestKey = timestampCache.keys().next().value;
      if (oldestKey !== undefined) {
        timestampCache.delete(oldestKey);
      }
    }
    timestampCache.set(validTimestamp, result);
    
    return result;
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return null;
  }
}

/**
 * Extract a formatted timestamp from a LinkedIn URL
 * @param linkedinURL - LinkedIn post or comment URL
 * @returns Formatted timestamp result or null if extraction fails
 */
export function extractTimestampFromURL(linkedinURL: string): TimestampResult | null {
  if (!linkedinURL) return null;
  
  try {
    // Try extracting comment ID first, then post ID
    const commentId = extractCommentId(linkedinURL);
    const postId = commentId || extractPostId(linkedinURL);
    
    if (!postId) {
      console.warn('No post ID or comment ID found in URL:', linkedinURL);
      return null;
    }
    
    const timestamp = extractUnixTimestamp(postId);
    if (!timestamp) {
      console.warn('Could not extract timestamp from ID:', postId);
      return null;
    }
    
    return formatTimestamp(timestamp);
  } catch (error) {
    console.error('Error extracting timestamp from URL:', error);
    return null;
  }
}
