// LinkedIn Post Formatter tool page
import { useApp } from '../../context/AppContext';
import { FileEdit, Type, Copy, Check, Clock, Save, RefreshCw, AlertTriangle, FileText, FileCode, FileDigit, Hash, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { generateDemoPost, type PostFormatOptions, type FormattedPostResult } from '../../formatters/linkedinFormatter';
import { formatPostApi, getSuggestedHashtags, saveFormattedPost } from '../../formatters/formatterApi';
import { Navigation } from '../../components/shared/Navigation';
import { Footer } from '../../components/shared/Footer';

export const LinkedInPostFormatter = () => {
  const { darkMode } = useApp();
  const [originalText, setOriginalText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [formatOptions, setFormatOptions] = useState<PostFormatOptions>({
    maxLength: 3000,
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
  });
  const [customHashtag, setCustomHashtag] = useState('');
  const [metrics, setMetrics] = useState<{ characterCount: number; wordCount: number; lineCount: number }>({
    characterCount: 0,
    wordCount: 0,
    lineCount: 0
  });
  const [copySuccess, setCopySuccess] = useState('');
  const [formattedResult, setFormattedResult] = useState<FormattedPostResult | null>(null);
  const [showNotice, setShowNotice] = useState(true);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Format the post whenever text or options change
  useEffect(() => {
    if (originalText) {
      // Use the API version for potential future remote processing
      formatPostApi(originalText, formatOptions).then(response => {
        if (response.success) {
          const result = response.result;
          setFormattedText(result.formattedText);
          setMetrics({
            characterCount: result.characterCount,
            wordCount: result.wordCount,
            lineCount: result.lineCount
          });
          setFormattedResult(result);
        }
      });
    } else {
      setFormattedText('');
      setMetrics({
        characterCount: 0,
        wordCount: 0,
        lineCount: 0
      });
      setFormattedResult(null);
    }
  }, [originalText, formatOptions]);

  // Handle copying to clipboard
  const copyToClipboard = async () => {
    if (formattedText) {
      try {
        await navigator.clipboard.writeText(formattedText);
        setCopySuccess('copied');
        setTimeout(() => setCopySuccess(''), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Load demo content
  const loadDemoContent = () => {
    const demoContent = generateDemoPost();
    setOriginalText(demoContent);
  };

  // Handle adding custom hashtag
  const addCustomHashtag = () => {
    if (customHashtag.trim()) {
      const tag = customHashtag.trim().startsWith('#') ? customHashtag.trim() : `#${customHashtag.trim()}`;
      setFormatOptions({
        ...formatOptions,
        customHashtags: [...(formatOptions.customHashtags || []), tag],
        addHashtags: true
      });
      setCustomHashtag('');
    }
  };

  // Handle removing custom hashtag
  const removeCustomHashtag = (index: number) => {
    const updatedHashtags = [...(formatOptions.customHashtags || [])];
    updatedHashtags.splice(index, 1);
    setFormatOptions({
      ...formatOptions,
      customHashtags: updatedHashtags,
      addHashtags: updatedHashtags.length > 0
    });
  };
  
  // Reset all formatting options
  const resetOptions = () => {
    setFormatOptions({
      maxLength: 3000,
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
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            LinkedIn Post Formatter
          </h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto mb-8 sm:mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Format and optimize your LinkedIn posts for maximum engagement and readability
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left column: Input */}
          <div className="lg:col-span-1">
            <div className={`p-4 sm:p-6 rounded-xl border mb-6 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <div className="flex items-center">
                    <FileText className={`mr-2 w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span>Original Text</span>
                  </div>
                </h2>
                <button
                  onClick={loadDemoContent}
                  className={`text-xs sm:text-sm px-2 py-1 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Load Demo
                </button>
              </div>              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  className={`w-full h-64 p-3 rounded-lg border resize-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Paste or type your LinkedIn post content here..."
                />
                <div className={`absolute bottom-2 right-2 px-2 py-1 text-xs rounded-md ${
                  originalText.length > (formatOptions.maxLength || Infinity) 
                    ? darkMode 
                      ? 'bg-red-900/30 text-red-300' 
                      : 'bg-red-100 text-red-700'
                    : darkMode
                      ? 'bg-gray-800/70 text-gray-300' 
                      : 'bg-gray-100/70 text-gray-600'
                }`}>
                  {originalText.length}/{formatOptions.maxLength || '∞'}
                </div>
              </div>
              <div className={`mt-3 text-xs sm:text-sm flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span>{metrics.characterCount} characters</span>
                <span>{metrics.wordCount} words</span>
                <span>{metrics.lineCount} lines</span>
              </div>
            </div>
            
            {/* Format Options */}
            <div className={`p-4 sm:p-6 rounded-xl border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>              <h2 className={`text-lg sm:text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <FileEdit className={`mr-2 w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span>Format Options</span>
              </h2>
              
              {/* Platform Selection */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Target Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  {['linkedin', 'twitter', 'facebook', 'instagram'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setFormatOptions({
                        ...formatOptions, 
                        platform: platform as 'linkedin' | 'twitter' | 'facebook' | 'instagram'
                      })}
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        formatOptions.platform === platform
                          ? darkMode 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-blue-100 text-blue-700'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Format Style */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Format Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {['plain', 'markdown', 'html'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setFormatOptions({
                        ...formatOptions, 
                        formatStyle: style as 'plain' | 'markdown' | 'html'
                      })}
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        formatOptions.formatStyle === style
                          ? darkMode 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-purple-100 text-purple-700'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Custom Hashtags */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Add Custom Hashtags
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={customHashtag}
                    onChange={(e) => setCustomHashtag(e.target.value)}
                    className={`flex-1 p-2 text-sm rounded-l-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500/30`}
                    placeholder="Enter hashtag..."
                    onKeyPress={(e) => e.key === 'Enter' && addCustomHashtag()}
                  />
                  <button
                    onClick={addCustomHashtag}
                    className={`px-3 py-2 rounded-r-lg text-white ${
                      customHashtag.trim() 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!customHashtag.trim()}
                  >
                    Add
                  </button>
                </div>
                
                {/* Display custom hashtags */}
                {formatOptions.customHashtags && formatOptions.customHashtags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formatOptions.customHashtags.map((tag, index) => (
                      <div 
                        key={index} 
                        className={`px-2 py-1 rounded-full text-xs flex items-center ${
                          darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {tag}
                        <button 
                          className="ml-1.5 text-xs rounded-full w-4 h-4 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800"
                          onClick={() => removeCustomHashtag(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Toggle Options */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <input
                    id="addLineBreaks"
                    type="checkbox"
                    checked={formatOptions.addLineBreaks}
                    onChange={(e) => setFormatOptions({...formatOptions, addLineBreaks: e.target.checked})}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="addLineBreaks" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Add semantic line breaks
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="addSignature"
                    type="checkbox"
                    checked={formatOptions.addSignature}
                    onChange={(e) => setFormatOptions({...formatOptions, addSignature: e.target.checked})}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="addSignature" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Add signature
                  </label>
                </div>
                
                {formatOptions.addSignature && (
                  <input
                    type="text"
                    value={formatOptions.signature}
                    onChange={(e) => setFormatOptions({...formatOptions, signature: e.target.value})}
                    className={`w-full mt-1 p-2 text-sm rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Your signature..."
                  />
                )}
              </div>
                {/* Hashtag Suggestions */}
              <div className="mt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Suggested Hashtags
                  </label>
                  <button
                    onClick={() => {
                      getSuggestedHashtags(formatOptions.platform || 'linkedin')
                        .then(tags => {
                          setFormatOptions({
                            ...formatOptions, 
                            customHashtags: [...(formatOptions.customHashtags || []), ...tags],
                            addHashtags: true
                          });
                        });
                    }}
                    className={`text-xs flex items-center px-2 py-1 rounded-md ${
                      darkMode 
                        ? 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/30' 
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    <Hash className="w-3 h-3 mr-1" />
                    <span>Get Suggestions</span>
                  </button>
                </div>
              </div>
              
              {/* Reset Button */}
              <button
                onClick={resetOptions}
                className={`w-full mt-2 flex items-center justify-center px-4 py-2 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <RefreshCw className="w-4 h-4 mr-1.5" />
                <span>Reset Options</span>
              </button>
            </div>
          </div>
          
          {/* Right column: Output */}
          <div className="lg:col-span-2">
            <div className={`p-4 sm:p-6 rounded-xl border mb-6 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <div className="flex items-center">
                    <FileCode className={`mr-2 w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <span>Formatted Post</span>
                  </div>
                </h2>              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (formattedResult) {
                      saveFormattedPost(formattedResult)
                        .then(success => {
                          if (success) {
                            setCopySuccess('saved');
                            setTimeout(() => setCopySuccess(''), 2000);
                          }
                        });
                    }
                  }}
                  className={`flex items-center px-2.5 py-1.5 rounded-lg transition-colors ${
                    copySuccess === 'saved'
                      ? darkMode 
                        ? 'bg-indigo-900/30 text-indigo-400' 
                        : 'bg-indigo-100 text-indigo-700'
                      : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  disabled={!formattedText}
                >
                  {copySuccess === 'saved' ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-1.5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center px-2.5 py-1.5 rounded-lg transition-colors ${
                    copySuccess === 'copied'
                      ? darkMode 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-green-100 text-green-700'
                      : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  disabled={!formattedText}
                >
                  {copySuccess === 'copied' ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              </div>
              
              <div className={`relative h-96 overflow-auto p-4 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}>
                {formattedText ? (
                  <pre className={`whitespace-pre-wrap font-sans text-sm ${
                    darkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                    {formattedText}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Type className={`w-10 h-10 mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Enter your post content to see the formatted output here
                    </p>
                  </div>
                )}
              </div>
              
              {formattedResult?.hasExceededLimit && (
                <div className={`mt-3 flex items-center text-xs sm:text-sm ${
                  darkMode ? 'text-amber-300' : 'text-amber-600'
                }`}>
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  <span>
                    Your post exceeds the {formatOptions.platform} character limit 
                    ({formattedResult.characterCount}/{formatOptions.maxLength})
                  </span>
                </div>
              )}
            </div>
            
            {/* Post Analytics */}
            {formattedResult && (
              <div className={`p-4 sm:p-6 rounded-xl border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-lg sm:text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <FileDigit className={`mr-2 w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <span>Post Analytics</span>
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-xs sm:text-sm uppercase font-medium mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Characters</div>
                    <div className={`text-lg sm:text-xl font-semibold ${
                      formattedResult.hasExceededLimit
                        ? darkMode ? 'text-red-400' : 'text-red-600'
                        : darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formattedResult.characterCount}
                      <span className={`text-xs sm:text-sm ml-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        / {formatOptions.maxLength || '∞'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-xs sm:text-sm uppercase font-medium mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Words</div>
                    <div className={`text-lg sm:text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formattedResult.wordCount}
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-xs sm:text-sm uppercase font-medium mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Lines</div>
                    <div className={`text-lg sm:text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formattedResult.lineCount}
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-xs sm:text-sm uppercase font-medium mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Read Time</div>
                    <div className={`text-lg sm:text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 opacity-70" />
                        {Math.max(1, Math.ceil(formattedResult.wordCount / 200))} min
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hashtags and Mentions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Hashtags ({formattedResult.hashtags.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formattedResult.hashtags.length > 0 ? (
                        formattedResult.hashtags.map((tag, index) => (
                          <div 
                            key={index} 
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {tag}
                          </div>
                        ))
                      ) : (
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          No hashtags found
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mentions ({formattedResult.mentions.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formattedResult.mentions.length > 0 ? (
                        formattedResult.mentions.map((mention, index) => (
                          <div 
                            key={index} 
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {mention}
                          </div>
                        ))
                      ) : (
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          No mentions found
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Development Notice */}
      {showNotice && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-0 sm:bottom-6 sm:max-w-md sm:mx-auto">
          <div className={`flex items-start p-3 sm:p-4 rounded-xl border shadow-lg ${
            darkMode 
              ? 'bg-amber-900/80 border-amber-700 text-amber-100 backdrop-blur-sm' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <div className="flex-shrink-0 mr-2 sm:mr-3 md:mr-4">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-amber-800' : 'bg-amber-100'
              }`}>
                <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${darkMode ? 'text-amber-200' : 'text-amber-600'}`} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm sm:text-base truncate">Notice</h3>
                <button 
                  onClick={() => setShowNotice(false)}
                  className={`p-1 rounded-full hover:bg-amber-700/20 transition-colors flex-shrink-0 ml-2 ${
                    darkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-700 hover:text-amber-900'
                  }`}
                  aria-label="Close notification"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
              <p className={`text-xs sm:text-sm mt-1 text-left ${darkMode ? 'text-amber-200' : 'text-amber-700'}`}>
                WebApp is in Development phase, but don't worry you can use it.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default LinkedInPostFormatter;
