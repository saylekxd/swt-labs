import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Loader2, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Zap,
  Languages,
  FileText
} from 'lucide-react';
import { 
  improveBlogContent, 
  generateBlogTitle, 
  generateBlogExcerpt, 
  generateBlogTags,
  translateBlogContent 
} from '@/services/blogApi';
import { cn } from '@/lib/utils';

interface ContentImproverProps {
  initialContent?: string;
  onImproved?: (improved: string) => void;
  className?: string;
}

export const ContentImprover: React.FC<ContentImproverProps> = ({
  initialContent = '',
  onImproved,
  className
}) => {
  const [content, setContent] = useState(initialContent);
  const [improvements, setImprovements] = useState<string[]>(['grammar', 'clarity', 'seo']);
  const [loading, setLoading] = useState(false);
  const [improvedContent, setImprovedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Quick improvement states
  const [titleLoading, setTitleLoading] = useState(false);
  const [excerptLoading, setExcerptLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [translateLoading, setTranslateLoading] = useState(false);

  const [generatedTitle, setGeneratedTitle] = useState<string>('');
  const [generatedExcerpt, setGeneratedExcerpt] = useState<string>('');
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [translatedContent, setTranslatedContent] = useState<string>('');

  const availableImprovements = [
    { key: 'grammar', label: 'Grammar & Spelling' },
    { key: 'clarity', label: 'Clarity & Readability' },
    { key: 'seo', label: 'SEO Optimization' },
    { key: 'engagement', label: 'Engagement' },
    { key: 'structure', label: 'Structure' },
    { key: 'conciseness', label: 'Conciseness' }
  ];

  const handleImprove = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await improveBlogContent({ 
        content, 
        improvements 
      });
      
      if (response.success && response.data) {
        setImprovedContent(response.data.improved);
        onImproved?.(response.data.improved);
      } else {
        setError(response.error || 'Failed to improve content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to improve content');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTitle = async () => {
    if (!content.trim()) return;

    setTitleLoading(true);
    try {
      const response = await generateBlogTitle(content);
      if (response.success && response.data) {
        setGeneratedTitle(response.data.title);
      }
    } catch (err) {
      console.error('Failed to generate title:', err);
    } finally {
      setTitleLoading(false);
    }
  };

  const handleGenerateExcerpt = async () => {
    if (!content.trim()) return;

    setExcerptLoading(true);
    try {
      const response = await generateBlogExcerpt(content);
      if (response.success && response.data) {
        setGeneratedExcerpt(response.data.excerpt);
      }
    } catch (err) {
      console.error('Failed to generate excerpt:', err);
    } finally {
      setExcerptLoading(false);
    }
  };

  const handleGenerateTags = async () => {
    if (!content.trim()) return;

    setTagsLoading(true);
    try {
      const response = await generateBlogTags(content);
      if (response.success && response.data) {
        setGeneratedTags(response.data.tags);
      }
    } catch (err) {
      console.error('Failed to generate tags:', err);
    } finally {
      setTagsLoading(false);
    }
  };

  const handleTranslate = async (targetLang: 'en' | 'pl') => {
    if (!content.trim()) return;

    setTranslateLoading(true);
    try {
      const response = await translateBlogContent({ 
        content, 
        targetLanguage: targetLang 
      });
      
      if (response.success && response.data) {
        setTranslatedContent(response.data.translated);
      }
    } catch (err) {
      console.error('Failed to translate content:', err);
    } finally {
      setTranslateLoading(false);
    }
  };

  const toggleImprovement = (improvement: string) => {
    setImprovements(prev => 
      prev.includes(improvement)
        ? prev.filter(i => i !== improvement)
        : [...prev, improvement]
    );
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const useImprovedContent = () => {
    setContent(improvedContent);
    setImprovedContent('');
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Zap className="w-5 h-5 text-yellow-400" />
            AI Content Improver
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-2">
              Content to Improve
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content here to improve it..."
              rows={8}
              className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                       text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          {/* Improvement Options */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-2">
              Improvement Focus
            </label>
            <div className="flex flex-wrap gap-2">
              {availableImprovements.map((improvement) => (
                <Badge
                  key={improvement.key}
                  variant={improvements.includes(improvement.key) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    improvements.includes(improvement.key)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:bg-neutral-700/50'
                  }`}
                  onClick={() => toggleImprovement(improvement.key)}
                >
                  {improvement.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={handleImprove}
              disabled={loading || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Improve Content
                </>
              )}
            </Button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateTitle}
                disabled={titleLoading || !content.trim()}
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                {titleLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Title'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateExcerpt}
                disabled={excerptLoading || !content.trim()}
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                {excerptLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Excerpt'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateTags}
                disabled={tagsLoading || !content.trim()}
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                {tagsLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Tags'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTranslate('pl')}
                disabled={translateLoading || !content.trim()}
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                {translateLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Languages className="w-3 h-3" />}
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Results */}
      {(generatedTitle || generatedExcerpt || generatedTags.length > 0 || translatedContent) && (
        <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-green-400" />
              Quick Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedTitle && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-200">Generated Title</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedTitle, 'title')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'title' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg">
                  <p className="text-white">{generatedTitle}</p>
                </div>
              </div>
            )}

            {generatedExcerpt && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-200">Generated Excerpt</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedExcerpt, 'excerpt')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'excerpt' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg">
                  <p className="text-neutral-300">{generatedExcerpt}</p>
                </div>
              </div>
            )}

            {generatedTags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">Generated Tags</label>
                <div className="flex flex-wrap gap-1">
                  {generatedTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-neutral-800/50 border-neutral-700 text-neutral-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {translatedContent && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-200">Translated Content</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(translatedContent, 'translated')}
                    className="text-neutral-400 hover:text-white"
                  >
                    {copied === 'translated' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg max-h-48 overflow-y-auto">
                  <p className="text-neutral-300 text-sm">{translatedContent}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Improved Content */}
      {improvedContent && (
        <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Improved Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Original */}
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">Original</label>
                <div className="p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg max-h-64 overflow-y-auto">
                  <p className="text-neutral-400 text-sm whitespace-pre-wrap">{content}</p>
                </div>
              </div>

              {/* Improved */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-200">Improved</label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(improvedContent, 'improved')}
                      className="text-neutral-400 hover:text-white"
                    >
                      {copied === 'improved' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={useImprovedContent}
                      className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
                    >
                      <ArrowRight className="w-3 h-3 mr-1" />
                      Use This
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-green-900/10 border border-green-800 rounded-lg max-h-64 overflow-y-auto">
                  <p className="text-neutral-200 text-sm whitespace-pre-wrap">{improvedContent}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 