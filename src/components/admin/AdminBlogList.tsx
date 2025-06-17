import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { getAdminBlogPosts, deleteBlogPost } from '@/services/blogApi';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface AdminBlogListProps {
  onEdit?: (post: BlogPost) => void;
  onView?: (post: BlogPost) => void;
  onCreate?: () => void;
  refreshTrigger?: number;
  className?: string;
}

export const AdminBlogList: React.FC<AdminBlogListProps> = ({
  onEdit,
  onView,
  onCreate,
  refreshTrigger,
  className
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAdminBlogPosts();
      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        setError(response.error || 'Failed to fetch posts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    setDeletingId(postId);
    try {
      const response = await deleteBlogPost(postId);
      if (response.success) {
        setPosts(prev => prev.filter(p => p.id !== postId));
      } else {
        alert(response.error || 'Failed to delete post');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'published' && post.published) ||
      (statusFilter === 'draft' && !post.published);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-neutral-300">Loading posts...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-blue-400" />
              Blog Posts Management
            </CardTitle>
            <Button
              onClick={onCreate}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
                className="px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Posts List */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-300 mb-2">
                {posts.length === 0 ? 'No blog posts yet' : 'No posts match your search'}
              </h3>
              <p className="text-neutral-500 mb-4">
                {posts.length === 0 
                  ? 'Create your first blog post to get started.' 
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
              {posts.length === 0 && (
                <Button onClick={onCreate} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="bg-neutral-800/30 border-neutral-700 hover:bg-neutral-800/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Post Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white truncate">{post.title}</h3>
                          <Badge
                            variant={post.published ? "default" : "outline"}
                            className={post.published 
                              ? "bg-green-600 text-white" 
                              : "bg-neutral-800/50 border-neutral-700 text-neutral-300"
                            }
                          >
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>

                        {post.excerpt && (
                          <p className="text-neutral-400 text-sm mb-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author_name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="outline" 
                                  className="bg-neutral-800/50 border-neutral-700 text-neutral-400 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-neutral-500 text-xs">
                                  +{post.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onView?.(post)}
                          className="text-neutral-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEdit?.(post)}
                          className="text-neutral-400 hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="text-neutral-400 hover:text-red-400"
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 