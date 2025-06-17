import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Loader2, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Languages,
  Volume2,
  BookOpen
} from 'lucide-react';
import { generateBlogPost } from '@/services/blogApi';
import { AIGenerationRequest, GeneratedBlogPost } from '@/types/blog';
import { cn } from '@/lib/utils';

interface ContentGeneratorProps {
  onGenerated?: (post: GeneratedBlogPost) => void;
  className?: string;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  onGenerated,
  className
}) => {
  const [formData, setFormData] = useState<AIGenerationRequest>({
    topic: '',
    keywords: [],
    language: 'en',
    tone: 'professional',
    length: 'medium'
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedBlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await generateBlogPost(formData);
      if (response.success && response.data) {
        setGeneratedPost(response.data);
        onGenerated?.(response.data);
      } else {
        setError(response.error || 'Failed to generate content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords?.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords?.filter(k => k !== keyword) || []
    }));
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

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Topic Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Topic *
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="e.g., React performance optimization, AI in web development..."
                className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Keywords (Optional)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Add keyword..."
                  className="flex-1 px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                           text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                />
                <Button
                  type="button"
                  onClick={addKeyword}
                  variant="outline"
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
                >
                  Add
                </Button>
              </div>
              {formData.keywords && formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="bg-neutral-800/50 border-neutral-700 text-neutral-300 cursor-pointer hover:bg-red-900/20"
                      onClick={() => removeKeyword(keyword)}
                    >
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  <Languages className="w-4 h-4 inline mr-1" />
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value as 'en' | 'pl' }))}
                  className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                           text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="pl">Polski</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  <Volume2 className="w-4 h-4 inline mr-1" />
                  Tone
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                           text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Length
                </label>
                <select
                  value={formData.length}
                  onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                           text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="short">Short (500-800 words)</option>
                  <option value="medium">Medium (800-1200 words)</option>
                  <option value="long">Long (1200-2000 words)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !formData.topic.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Blog Post
                </>
              )}
            </Button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedPost && (
        <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-200">Title</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generatedPost.title, 'title')}
                  className="text-neutral-400 hover:text-white"
                >
                  {copied === 'title' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <div className="p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg">
                <p className="text-white font-medium">{generatedPost.title}</p>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-200">Excerpt</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generatedPost.excerpt, 'excerpt')}
                  className="text-neutral-400 hover:text-white"
                >
                  {copied === 'excerpt' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <div className="p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg">
                <p className="text-neutral-300">{generatedPost.excerpt}</p>
              </div>
            </div>

            {/* Tags */}
            {generatedPost.tags && generatedPost.tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">Tags</label>
                <div className="flex flex-wrap gap-1">
                  {generatedPost.tags.map((tag, index) => (
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

            {/* Content Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-200">Content Preview</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generatedPost.content, 'content')}
                  className="text-neutral-400 hover:text-white"
                >
                  {copied === 'content' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <div className="p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg max-h-48 overflow-y-auto">
                <pre className="text-neutral-300 text-sm whitespace-pre-wrap font-mono">
                  {generatedPost.content.substring(0, 500)}
                  {generatedPost.content.length > 500 && '...'}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 