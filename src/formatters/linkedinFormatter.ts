// LinkedIn post formatter utility with various formatting options

export interface PostFormatOptions {
  maxLength?: number;
  includeTags?: boolean; 
  includeLinks?: boolean;
  addHashtags?: boolean;
  customHashtags?: string[];
  formatStyle?: 'plain' | 'markdown' | 'html';
  includeEmojis?: boolean;
  addSignature?: boolean;
  signature?: string;
  platform?: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  addLineBreaks?: boolean;
}

export interface FormattedPostResult {
  formattedText: string;
  characterCount: number;
  wordCount: number;
  lineCount: number;
  hasExceededLimit: boolean;
  hashtags: string[];
  mentions: string[];
  links: string[];
}

// Platform-specific character limits
const PLATFORM_LIMITS = {
  linkedin: 3000,
  twitter: 280,
  facebook: 63206,
  instagram: 2200,
};

/**
 * Format a LinkedIn post according to specified options
 */
export function formatLinkedInPost(
  postText: string,
  options: PostFormatOptions = {}
): FormattedPostResult {
  if (!postText) {
    return createEmptyResult();
  }

  // Apply default options
  const defaultOptions: PostFormatOptions = {
    maxLength: PLATFORM_LIMITS[options.platform || 'linkedin'],
    includeTags: true,
    includeLinks: true,
    addHashtags: false,
    customHashtags: [],
    formatStyle: 'plain',
    includeEmojis: true,
    addSignature: false,
    signature: '',
    platform: 'linkedin',
    addLineBreaks: true,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  // Extract components
  const extractedLinks = extractLinks(postText);
  const extractedHashtags = extractHashtags(postText);
  const extractedMentions = extractMentions(postText);

  // Process text
  let processedText = postText;

  // Format based on style
  switch (mergedOptions.formatStyle) {
    case 'markdown':
      processedText = convertToMarkdown(processedText);
      break;
    case 'html':
      processedText = convertToHtml(processedText);
      break;
    default:
      // For plain text, just clean up excessive whitespace
      processedText = processedText.replace(/\s+/g, ' ').trim();
  }

  // Add line breaks if requested
  if (mergedOptions.addLineBreaks) {
    processedText = addLineBreaks(processedText, mergedOptions.formatStyle);
  }

  // Add custom hashtags if requested
  let customTags = '';
  if (mergedOptions.addHashtags && mergedOptions.customHashtags && mergedOptions.customHashtags.length > 0) {
    customTags = '\n\n' + mergedOptions.customHashtags
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
      .join(' ');
  }

  // Add signature if requested
  let signatureText = '';
  if (mergedOptions.addSignature && mergedOptions.signature) {
    signatureText = '\n\n' + mergedOptions.signature;
  }

  // Combine everything
  let formattedText = processedText + customTags + signatureText;

  // Trim to max length if specified
  const hasExceededLimit = formattedText.length > (mergedOptions.maxLength || Infinity);
  if (mergedOptions.maxLength && hasExceededLimit) {
    formattedText = formattedText.substring(0, mergedOptions.maxLength);
  }

  // Calculate metrics
  const characterCount = formattedText.length;
  const wordCount = countWords(formattedText);
  const lineCount = countLines(formattedText);

  return {
    formattedText,
    characterCount,
    wordCount,
    lineCount,
    hasExceededLimit,
    hashtags: extractedHashtags,
    mentions: extractedMentions,
    links: extractedLinks,
  };
}

/**
 * Create a demo post for testing purposes
 */
export function generateDemoPost(): string {
  return `Check out our new product launch! We're excited to announce our latest innovation that will transform how you work. 🚀

Join us for a live demonstration on June 15th at 2pm EST.

Some key features:
- AI-powered workflow automation
- Seamless integration with existing tools
- Enhanced collaboration features
- Real-time analytics dashboard

Tag a colleague who would be interested! @JohnDoe @JaneSmith

#ProductLaunch #Innovation #TechNews #LinkedIn
www.example.com/product-launch`;
}

/**
 * Extract links from text
 */
function extractLinks(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches || [];
}

/**
 * Extract hashtags from text
 */
function extractHashtags(text: string): string[] {
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  const matches = Array.from(text.matchAll(hashtagRegex));
  return matches.map(match => match[0]);
}

/**
 * Extract mentions from text
 */
function extractMentions(text: string): string[] {
  const mentionRegex = /@([a-zA-Z0-9_]+)/g;
  const matches = Array.from(text.matchAll(mentionRegex));
  return matches.map(match => match[0]);
}

/**
 * Convert plain text to markdown
 */
function convertToMarkdown(text: string): string {
  // Basic markdown conversions
  let markdown = text;
  
  // Convert URLs to markdown links if they're not already
  markdown = markdown.replace(
    /(https?:\/\/[^\s]+)/g, 
    (url) => url.includes('](') ? url : `[${url}](${url})`
  );

  // Add bold to lines that might be headers (short lines ending with a colon)
  markdown = markdown.replace(
    /^(.{1,50}:)$/gm,
    '**$1**'
  );

  // Convert bullet points
  markdown = markdown.replace(
    /^[-•]\s+(.*)/gm,
    '* $1'
  );

  return markdown;
}

/**
 * Convert plain text to HTML
 */
function convertToHtml(text: string): string {
  // Basic HTML conversions
  let html = text;
  
  // Convert newlines to <br> tags
  html = html.replace(/\n/g, '<br>');
  
  // Convert URLs to HTML links
  html = html.replace(
    /(https?:\/\/[^\s<]+)/g, 
    '<a href="$1" target="_blank">$1</a>'
  );

  // Convert bullet points
  html = html.replace(
    /^[-•]\s+(.*)/gm,
    '<li>$1</li>'
  );

  // Wrap bullet point lists in <ul> tags
  html = html.replace(
    /(<li>.*<\/li>)\n(<li>.*<\/li>)/g,
    '<ul>$1$2</ul>'
  );

  return html;
}

/**
 * Add semantic line breaks based on sentence structure
 */
function addLineBreaks(text: string, format: string = 'plain'): string {
  // Split by sentences and add line breaks
  let processed = text;
  
  // Add a line break after each sentence that ends with a period followed by a space
  processed = processed.replace(/\.\s+/g, '.\n\n');
  
  // Add a line break before bullet points
  processed = processed.replace(/\n[-•*]\s+/g, '\n\n• ');
  
  // Handle format-specific line breaks
  if (format === 'html') {
    processed = processed.replace(/\n\n/g, '<br><br>');
  } else if (format === 'markdown') {
    // Markdown already handles line breaks well
    processed = processed.replace(/\n{3,}/g, '\n\n'); // Limit consecutive line breaks
  }

  return processed;
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Count lines in text
 */
function countLines(text: string): number {
  return text.split('\n').length;
}

/**
 * Create an empty result object
 */
function createEmptyResult(): FormattedPostResult {
  return {
    formattedText: '',
    characterCount: 0,
    wordCount: 0,
    lineCount: 0,
    hasExceededLimit: false,
    hashtags: [],
    mentions: [],
    links: [],
  };
}

/**
 * Advanced LinkedIn post optimization strategies
 */
export const optimizationStrategies = {
  engagement: (post: string): string => {
    // Add engagement prompts and questions
    let optimized = post;
    if (!post.includes('?')) {
      optimized += '\n\nWhat do you think? Share your thoughts in the comments below!';
    }
    return optimized;
  },
  
  visibility: (post: string): string => {
    // Add trending hashtags for better visibility
    const trendingHashtags = ['#innovation', '#leadership', '#professionaldevelopment'];
    const existingHashtags = extractHashtags(post);
    
    let optimized = post;
    if (existingHashtags.length < 3) {
      const additionalTags = trendingHashtags
        .filter(tag => !existingHashtags.includes(tag))
        .slice(0, 3 - existingHashtags.length)
        .join(' ');
      
      optimized += `\n\n${additionalTags}`;
    }
    return optimized;
  },
  
  conciseness: (post: string): string => {
    // Make the post more concise
    let optimized = post;
    
    // Replace common verbose phrases with concise alternatives
    const verbosePhrases = [
      { verbose: 'in order to', concise: 'to' },
      { verbose: 'due to the fact that', concise: 'because' },
      { verbose: 'at this point in time', concise: 'now' },
      { verbose: 'in the event that', concise: 'if' },
      { verbose: 'a majority of', concise: 'most' },
    ];
    
    verbosePhrases.forEach(({ verbose, concise }) => {
      const regex = new RegExp(verbose, 'gi');
      optimized = optimized.replace(regex, concise);
    });
    
    return optimized;
  }
};
