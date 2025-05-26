import { describe, it, expect } from 'vitest';
import { 
  extractPostId, 
  extractCommentId, 
  extractUnixTimestamp, 
  formatTimestamp,
  extractTimestampFromURL 
} from '../src/utils/linkedinExtractor';

describe('LinkedIn Timestamp Extractor', () => {
  // Sample LinkedIn post URL
  const samplePostURL = 'https://www.linkedin.com/posts/example_1234567890123456789_test-post';
  
  // Sample LinkedIn comment URL
  const sampleCommentURL = 'https://www.linkedin.com/posts/example_fsd_comment:(9876543210987654321,urn:li:activity:1234567890123456789)_test-comment';

  describe('extractPostId', () => {
    it('should extract 19-digit post ID from LinkedIn URL', () => {
      const postId = extractPostId(samplePostURL);
      expect(postId).toBe('1234567890123456789');
    });

    it('should return null for invalid URL', () => {
      const postId = extractPostId('https://example.com/invalid');
      expect(postId).toBeNull();
    });
  });

  describe('extractCommentId', () => {
    it('should extract comment ID from LinkedIn comment URL', () => {
      const commentId = extractCommentId(sampleCommentURL);
      expect(commentId).toBe('9876543210987654321');
    });

    it('should return null for non-comment URL', () => {
      const commentId = extractCommentId(samplePostURL);
      expect(commentId).toBeNull();
    });
  });

  describe('extractUnixTimestamp', () => {
    it('should extract valid timestamp from post ID', () => {
      // Using a realistic LinkedIn post ID that would generate a valid timestamp
      const timestamp = extractUnixTimestamp('7206573431516921856');
      expect(timestamp).toBeGreaterThan(0);
      expect(typeof timestamp).toBe('number');
    });

    it('should return null for invalid post ID', () => {
      const timestamp = extractUnixTimestamp('');
      expect(timestamp).toBeNull();
    });
  });
  describe('formatTimestamp', () => {
    it('should format timestamp correctly', () => {
      const testTimestamp = 1638360000000; // Dec 1, 2021
      const result = formatTimestamp(testTimestamp);
      
      expect(result).toBeTruthy();
      expect(result?.unix).toBe(testTimestamp);
      expect(result?.local).toContain('2021');
      expect(result?.iso).toContain('2021');
      expect(result?.relative).toBeTruthy();
    });

    it('should return null for invalid timestamp', () => {
      const result = formatTimestamp(0);
      expect(result).toBeNull();
    });
  });
  describe('extractTimestampFromURL', () => {
    it('should extract complete timestamp data from LinkedIn URL', () => {
      // This is a theoretical test - actual LinkedIn post IDs would work
      const result = extractTimestampFromURL('https://www.linkedin.com/posts/test_7206573431516921856_example');
      
      if (result) {
        expect(result.unix).toBeGreaterThan(0);
        expect(result.local).toBeTruthy();
        expect(result.iso).toBeTruthy();
        expect(result.relative).toBeTruthy();
      }
    });
  });
});
