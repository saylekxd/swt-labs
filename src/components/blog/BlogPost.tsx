import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BlogPost as BlogPostType } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostType;
  onBack?: () => void;
  className?: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  post,
  onBack,
  className
}) => {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <article className={cn("relative w-screen left-1/2 -translate-x-1/2", className)}>
      {/* Back Button */}
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-3 sm:mb-6 text-neutral-400 hover:text-white hover:bg-neutral-700/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      )}

      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-4 sm:mb-8">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-4 sm:mb-8">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mb-2 sm:mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author_name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{estimateReadingTime(post.content)}</span>
          </div>
          {!post.published && (
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
              Draft
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-base sm:text-xl text-neutral-300 leading-relaxed mb-4 sm:mb-6">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-neutral-700/50 border-neutral-600 text-neutral-300 hover:bg-neutral-600/50"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <div 
          className="text-neutral-200 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: formatMarkdownContent(post.content) 
          }}
        />
      </div>
    </article>
  );
};

// Helper function to format markdown content
// This is a simple implementation - you might want to use a proper markdown parser
function formatMarkdownContent(content: string): string {
  // Basic markdown formatting
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-white mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-white mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-white mt-12 mb-8">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Code blocks
    .replace(/```(.*?)```/gs, '<pre class="bg-neutral-900 border border-neutral-800 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-green-400">$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-neutral-800 px-2 py-1 rounded text-green-400">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[rgb(218,119,134)] hover:text-[rgb(218,119,134)]/80 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>');
} 