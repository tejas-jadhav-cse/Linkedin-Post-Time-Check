import { describe, it, expect } from 'vitest';
import { 
  extractPostId, 
  extractCommentId, 
  extractUnixTimestamp, 
  formatTimestamp,
  extractTimestampFromURL,
  analyzeLinkedInURL,
  clearCaches
} from '../src/utils/linkedinExtractor.optimized';

describe('Optimized LinkedIn Timestamp Extractor', () => {
  // Clear caches before each test
  beforeEach(() => {
    clearCaches();
  });

  // Sample test URLs for different LinkedIn formats
  const testUrls = {
    // Post URLs
    post: 'https://www.linkedin.com/posts/johndoe_7223467890123456789_sample-post',
    postWithParams: 'https://www.linkedin.com/posts/johndoe_7223467890123456789_sample-post?utm_source=share&utm_medium=member_desktop',
    
    // Feed update URLs
    feedUpdate: 'https://www.linkedin.com/feed/update/urn:li:activity:7223467890123456789/',
    feedUpdateWithParams: 'https://www.linkedin.com/feed/update/urn:li:activity:7223467890123456789/?commentUrn=123',
    
    // Comment URLs
    comment: 'https://www.linkedin.com/feed/update/urn:li:activity:7223467890123456789/?commentUrn=urn%3Ali%3Acomment%3A(7223467890123456780%2Curn%3Ali%3Aactivity%3A7223467890123456789)',
    fsdComment: 'https://www.linkedin.com/posts/johndoe_test-post_fsd_comment:(7223467890123456780,urn:li:activity:7223467890123456789)',
    
    // Share URLs
    share: 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.linkedin.com%2Fposts%2Fjohndoe_7223467890123456789_sample-post',
    
    // Pulse URLs
    pulse: 'https://www.linkedin.com/pulse/title-johndoe_7223467890123456789/',
    
    // URLs that should fail
    profile: 'https://www.linkedin.com/in/johndoe/',
    company: 'https://www.linkedin.com/company/linkedin/',
    nonLinkedIn: 'https://example.com/page'
  };

  describe('extractPostId', () => {
    it('should extract post ID from standard post URL', () => {
      const postId = extractPostId(testUrls.post);
      expect(postId).toBe('7223467890123456789');
    });

    it('should extract post ID from feed update URL', () => {
      const postId = extractPostId(testUrls.feedUpdate);
      expect(postId).toBe('7223467890123456789');
    });

    it('should extract post ID from URLs with query parameters', () => {
      const postId = extractPostId(testUrls.postWithParams);
      expect(postId).toBe('7223467890123456789');
    });

    it('should extract post ID from pulse article URL', () => {
      const postId = extractPostId(testUrls.pulse);
      expect(postId).toBe('7223467890123456789');
    });

    it('should return null for profile URLs', () => {
      const postId = extractPostId(testUrls.profile);
      expect(postId).toBeNull();
    });

    it('should return null for non-LinkedIn URLs', () => {
      const postId = extractPostId(testUrls.nonLinkedIn);
      expect(postId).toBeNull();
    });
    
    it('should use cache for repeated calls with the same URL', () => {
      // First call should extract the ID
      const firstResult = extractPostId(testUrls.post);
      expect(firstResult).toBe('7223467890123456789');
      
      // Second call should use the cache
      const spy = vi.spyOn(console, 'error');
      const secondResult = extractPostId(testUrls.post);
      
      expect(secondResult).toBe('7223467890123456789');
      // No additional console errors if cached properly
      expect(spy).not.toHaveBeenCalled();
      
      spy.mockRestore();
    });
  });

  describe('extractCommentId', () => {
    it('should extract comment ID from standard comment URL', () => {
      const commentId = extractCommentId(testUrls.comment);
      expect(commentId).toBe('7223467890123456780');
    });

    it('should extract comment ID from fsd comment format', () => {
      const commentId = extractCommentId(testUrls.fsdComment);
      expect(commentId).toBe('7223467890123456780');
    });

    it('should return null for post URLs', () => {
      const commentId = extractCommentId(testUrls.post);
      expect(commentId).toBeNull();
    });
  });

  describe('analyzeLinkedInURL', () => {
    it('should correctly identify post URLs', () => {
      const analysis = analyzeLinkedInURL(testUrls.post);
      expect(analysis.isValid).toBe(true);
      expect(analysis.type).toBe('post');
    });

    it('should correctly identify feed update URLs', () => {
      const analysis = analyzeLinkedInURL(testUrls.feedUpdate);
      expect(analysis.isValid).toBe(true);
      expect(analysis.type).toBe('feed-update');
    });

    it('should correctly identify comment URLs', () => {
      const analysis = analyzeLinkedInURL(testUrls.comment);
      expect(analysis.isValid).toBe(true);
      expect(analysis.type).toBe('comment');
    });

    it('should correctly identify profile URLs as invalid for timestamps', () => {
      const analysis = analyzeLinkedInURL(testUrls.profile);
      expect(analysis.isValid).toBe(false);
      expect(analysis.type).toBe('profile');
      expect(analysis.reason).toBeDefined();
    });

    it('should identify non-LinkedIn URLs', () => {
      const analysis = analyzeLinkedInURL(testUrls.nonLinkedIn);
      expect(analysis.isValid).toBe(false);
      expect(analysis.type).toBe('not-linkedin');
    });
  });

  describe('extractTimestampFromURL', () => {
    it('should extract and format timestamp from post URL', () => {
      const result = extractTimestampFromURL(testUrls.post);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.unix).toBeGreaterThan(0);
        expect(result.iso).toMatch(/^\d{4}-\d{2}-\d{2}T/);
        expect(result.local).toBeDefined();
        expect(result.relative).toBeDefined();
      }
    });

    it('should extract and format timestamp from feed update URL', () => {
      const result = extractTimestampFromURL(testUrls.feedUpdate);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.unix).toBeGreaterThan(0);
      }
    });

    it('should extract and format timestamp from comment URL', () => {
      const result = extractTimestampFromURL(testUrls.comment);
      expect(result).not.toBeNull();
    });

    it('should return null for profile URLs', () => {
      const result = extractTimestampFromURL(testUrls.profile);
      expect(result).toBeNull();
    });

    it('should return null for non-LinkedIn URLs', () => {
      const result = extractTimestampFromURL(testUrls.nonLinkedIn);
      expect(result).toBeNull();
    });

    it('should use cache for repeated extractions', () => {
      // First extraction
      const firstResult = extractTimestampFromURL(testUrls.post);
      expect(firstResult).not.toBeNull();
      
      // Second extraction of the same URL should use cache
      const spy = vi.spyOn(console, 'error');
      const secondResult = extractTimestampFromURL(testUrls.post);
      
      expect(secondResult).toEqual(firstResult);
      expect(spy).not.toHaveBeenCalled();
      
      spy.mockRestore();
    });
  });

  describe('extractUnixTimestamp', () => {
    it('should extract valid timestamp from post ID', () => {
      const timestamp = extractUnixTimestamp('7223467890123456789');
      expect(timestamp).toBeGreaterThan(0);
    });

    it('should handle invalid post IDs gracefully', () => {
      const timestamp = extractUnixTimestamp('not-a-valid-id');
      expect(timestamp).toBeNull();
    });
    
    it('should reject timestamps that are too old', () => {
      // This would be before LinkedIn was founded
      const invalidId = '123456789012345'; // Very old timestamp
      const timestamp = extractUnixTimestamp(invalidId);
      expect(timestamp).toBeNull();
    });
    
    it('should reject timestamps that are in the future', () => {
      // This would be far in the future
      const invalidId = '9223372036854775807'; // Max BigInt
      const timestamp = extractUnixTimestamp(invalidId);
      expect(timestamp).toBeNull();
    });
  });

  describe('formatTimestamp', () => {
    it('should format timestamp correctly with different formats', () => {
      const now = Math.floor(Date.now() / 1000);
      const result = formatTimestamp(now);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.unix).toBe(now);
        expect(result.iso).toMatch(/^\d{4}-\d{2}-\d{2}T/);
        expect(result.local).toMatch(/\d{1,2}:\d{2}/);
        expect(result.relative).toBe('Just now');
      }
    });
    
    it('should format older timestamps with appropriate relative text', () => {
      // 1 hour ago
      const hourAgo = Math.floor(Date.now() / 1000) - 3600;
      const result = formatTimestamp(hourAgo);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.relative).toBe('1 hour ago');
      }
    });
    
    it('should handle timestamps in milliseconds', () => {
      const nowMs = Date.now();
      const result = formatTimestamp(nowMs);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.unix).toBe(Math.floor(nowMs / 1000));
      }
    });

    it('should return null for invalid timestamps', () => {
      expect(formatTimestamp(0)).toBeNull();
      expect(formatTimestamp(NaN)).toBeNull();
    });
  });

  describe('cache management', () => {
    it('should clear caches when clearCaches is called', () => {
      // Populate caches
      extractTimestampFromURL(testUrls.post);
      extractPostId(testUrls.feedUpdate);
      extractCommentId(testUrls.comment);
      formatTimestamp(Date.now());
      
      // Clear caches
      clearCaches();
      
      // Check if caches are cleared by forcing recalculation
      const spy = vi.spyOn(console, 'error');
      extractTimestampFromURL(testUrls.post); // Should recalculate
      
      // If cache was cleared, internal functions would need to be called again
      // but shouldn't cause errors
      expect(spy).not.toHaveBeenCalled();
      
      spy.mockRestore();
    });
  });
});
