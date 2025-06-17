import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  LogOut, 
  Shield, 
  Loader2,
  Settings,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { BlogForm } from '@/components/admin/BlogForm';
import { AdminBlogList } from '@/components/admin/AdminBlogList';
import { BlogPost } from '@/types/blog';

type ViewMode = 'list' | 'create' | 'edit';

const AdminBlog: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, loading, logout } = useAdmin();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [adminKey, setAdminKey] = useState('');

  const handleLogin = () => {
    if (adminKey.trim()) {
      // This would typically call the login function
      // For now, we'll just redirect to the URL with the key
      const url = `/admin/blog?key=${adminKey}`;
      window.location.href = url;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/blog');
  };

  const handleCreate = () => {
    setSelectedPost(null);
    setViewMode('create');
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setViewMode('edit');
  };

  const handleView = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`);
  };

  const handleSave = () => {
    setRefreshTrigger(prev => prev + 1);
    setViewMode('list');
    setSelectedPost(null);
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
          <span>Checking admin access...</span>
        </div>
      </div>
    );
  }

  // Admin Login Form
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-white">
              <Shield className="w-6 h-6 text-blue-400" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-200 mb-2">
                Admin Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key..."
                className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>Admin URL:</strong> Access via{' '}
                <code className="bg-neutral-800 px-1 rounded text-xs">
                  /admin/blog?key=your-secret-key
                </code>
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleLogin}
                disabled={!adminKey.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Shield className="w-4 h-4 mr-2" />
                Access Admin
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/blog')}
                className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                <h1 className="text-xl font-bold">Blog Admin</h1>
              </div>
              
              {viewMode !== 'list' && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <span>/</span>
                  <span>{viewMode === 'create' ? 'New Post' : 'Edit Post'}</span>
                  {selectedPost && (
                    <>
                      <span>/</span>
                      <span className="text-neutral-300">{selectedPost.title}</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {viewMode !== 'list' && (
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to List
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => navigate('/blog')}
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                View Blog
              </Button>
              
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-700 text-red-300 hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'list' && (
          <AdminBlogList
            onEdit={handleEdit}
            onView={handleView}
            onCreate={handleCreate}
            refreshTrigger={refreshTrigger}
          />
        )}

        {(viewMode === 'create' || viewMode === 'edit') && (
          <BlogForm
            post={selectedPost || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>

      {/* Admin Status Indicator */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 bg-green-900/20 border border-green-800 rounded-lg text-green-300 text-sm">
          <Shield className="w-4 h-4" />
          <span>Admin Mode Active</span>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog; 