import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, User, Tag, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BlogCardProps } from '@/types/blog';

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onClick,
  showExcerpt = true,
  showAuthor = true,
  showTags = true,
  className,
  ...props
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-xl",
        "bg-neutral-800/50 border-neutral-700 backdrop-blur-sm",
        "hover:bg-neutral-800/80 hover:border-neutral-600",
        "hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="aspect-video w-full overflow-hidden rounded-t-xl">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-2">
          {showAuthor && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{post.author_name}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          {!post.published && (
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 text-xs">
              Draft
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[rgb(218,119,134)] transition-colors">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Excerpt */}
        {showExcerpt && post.excerpt && (
          <p className="text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {showTags && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-neutral-700/50 border-neutral-600 text-neutral-300 hover:bg-neutral-600/50"
              >
                <Tag className="w-2 h-2 mr-1" />
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-neutral-700/50 border-neutral-600 text-neutral-400"
              >
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Read More Indicator */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="w-3 h-3" />
            <span>Click to read</span>
          </div>
          <div className="text-[rgb(218,119,134)] opacity-0 group-hover:opacity-100 transition-opacity">
            Read more →
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 