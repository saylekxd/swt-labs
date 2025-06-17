import React from 'react';
import { BlogCard } from './BlogCard';
import { BlogPost } from '@/types/blog';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showTags?: boolean;
  emptyMessage?: string;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  onPostClick,
  showExcerpt = true,
  showAuthor = true,
  showTags = true,
  emptyMessage = "No blog posts available."
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
          <p className="text-neutral-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      isMobile 
        ? 'grid-cols-1' 
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          onClick={() => onPostClick?.(post)}
          showExcerpt={showExcerpt}
          showAuthor={showAuthor}
          showTags={showTags}
        />
      ))}
    </div>
  );
}; 