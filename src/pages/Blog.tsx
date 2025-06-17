import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BlogList } from '@/components/blog/BlogList';
import { BlogPost } from '@/types/blog';
import { fetchBlogPosts } from '@/services/blogApi';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from '@/components/Header';
import BackgroundSVG from '@/components/BackgroundSVG';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogPosts({ limit: 20, offset: 0 });
        setPosts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Helmet>
        <title>Blog - SWT Labs</title>
        <meta name="description" content="Latest insights, tutorials, and updates from SWT Labs on AI-powered development, modern web technologies, and software engineering best practices." />
        <meta property="og:title" content="Blog - SWT Labs" />
        <meta property="og:description" content="Stay updated with the latest in AI-powered development and modern web technologies." />
      </Helmet>

      <BackgroundSVG />
      <Header />

      <main className="relative z-10">
        <div className={`container mx-auto px-4 ${isMobile ? 'pt-24' : 'pt-32'}`}>
          {/* Page Header */}
          <div className="mb-12">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-6 text-neutral-400 hover:text-white hover:bg-neutral-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <div className="text-center mb-8">
              <h1 className={`font-bold text-white mb-4 ${isMobile ? 'text-4xl' : 'text-6xl'}`}>
                Blog
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                Insights, tutorials, and updates on AI-powered development and modern web technologies
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg 
                           text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-neutral-400">Loading blog posts...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Error Loading Posts</h3>
                  <p className="text-neutral-400 mb-4">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Results Info */}
                {searchTerm && (
                  <div className="mb-6 text-center">
                    <p className="text-neutral-400">
                      {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  </div>
                )}

                {/* Blog Posts */}
                <BlogList
                  posts={filteredPosts}
                  onPostClick={handlePostClick}
                  emptyMessage={
                    searchTerm 
                      ? `No posts found matching "${searchTerm}"`
                      : "No blog posts available yet. Check back soon for exciting content!"
                  }
                />
              </>
            )}
          </div>

          {/* Call to Action */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="text-center mt-16 mb-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Want to stay updated?
                </h3>
                <p className="text-neutral-300 mb-6">
                  Get the latest insights on AI-powered development and modern web technologies
                </p>
                <Button
                  onClick={() => navigate('/estimate')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Project Estimate
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog; 