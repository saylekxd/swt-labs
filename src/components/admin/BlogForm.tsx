import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  X,
  Wand2,
  FileImage,
  Calendar
} from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { BlogPost, CreateBlogRequest, UpdateBlogRequest } from '@/types/blog';
import { createBlogPost, updateBlogPost } from '@/services/blogApi';
import { ContentGenerator } from './ContentGenerator';
import { ContentImprover } from './ContentImprover';
import { cn } from '@/lib/utils';

interface BlogFormProps {
  post?: BlogPost;
  onSave?: (post: BlogPost) => void;
  onCancel?: () => void;
  className?: string;
}

export const BlogForm: React.FC<BlogFormProps> = ({
  post,
  onSave,
  onCancel,
  className
}) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featured_image: post?.featured_image_url || '',
    tags: post?.tags || [],
    status: post?.published ? 'published' : 'draft' as 'draft' | 'published',
    published_at: post?.created_at ? new Date(post.created_at).toISOString().slice(0, 16) : ''
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [success, setSuccess] = useState(false);

  const mdEditorRef = useRef<any>(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const postData = {
        ...formData,
        published_at: formData.status === 'published' && formData.published_at 
          ? new Date(formData.published_at).toISOString()
          : null
      };

      let response;
      if (post?.id) {
        // Update existing post
        response = await updateBlogPost(post.id, postData as UpdateBlogRequest);
      } else {
        // Create new post
        response = await createBlogPost(postData as CreateBlogRequest);
      }

      if (response.success && response.data) {
        setSuccess(true);
        onSave?.(response.data);
      } else {
        setError(response.error || 'Failed to save blog post');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleGeneratedContent = (generated: any) => {
    setFormData(prev => ({
      ...prev,
      title: generated.title || prev.title,
      content: generated.content || prev.content,
      excerpt: generated.excerpt || prev.excerpt,
      tags: generated.tags ? [...new Set([...prev.tags, ...generated.tags])] : prev.tags
    }));
    setShowAIAssistant(false);
  };

  const handleImprovedContent = (improved: string) => {
    setFormData(prev => ({ ...prev, content: improved }));
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <FileImage className="w-5 h-5 text-blue-400" />
              {post ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={togglePreview}
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                {previewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter blog post title..."
                className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the post..."
                rows={3}
                className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                           text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-neutral-800/50 border-neutral-700 text-neutral-300 cursor-pointer hover:bg-red-900/20"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Content *
              </label>
              {previewMode ? (
                <div className="min-h-[400px] p-4 bg-neutral-800/30 border border-neutral-700 rounded-lg">
                  <MDEditor.Markdown source={formData.content} />
                </div>
              ) : (
                <div data-color-mode="dark">
                  <MDEditor
                    ref={mdEditorRef}
                    value={formData.content}
                    onChange={(val) => setFormData(prev => ({ ...prev, content: val || '' }))}
                    preview="edit"
                    height={400}
                    data-color-mode="dark"
                  />
                </div>
              )}
            </div>

            {/* Publishing Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    status: e.target.value as 'draft' | 'published' 
                  }))}
                  className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                           text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Publish Date */}
              {formData.status === 'published' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-200 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.published_at}
                    onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                             text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Success Display */}
            {success && (
              <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-sm">
                  Blog post {post ? 'updated' : 'created'} successfully!
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {post ? 'Update Post' : 'Create Post'}
                  </>
                )}
              </Button>
              
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* AI Assistant Panel */}
      {showAIAssistant && (
        <div className="space-y-6">
          <ContentGenerator onGenerated={handleGeneratedContent} />
          <ContentImprover 
            initialContent={formData.content}
            onImproved={handleImprovedContent} 
          />
        </div>
      )}
    </div>
  );
}; 