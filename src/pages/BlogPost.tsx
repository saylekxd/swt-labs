import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BlogPost as BlogPostComponent } from '@/components/blog/BlogPost';
import { BlogPost as BlogPostType } from '@/types/blog';
import { fetchBlogPost } from '@/services/blogApi';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from '@/components/Header';
import BackgroundSVG from '@/components/BackgroundSVG';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Blog post not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchBlogPost(slug);
        if (response.success && response.data) {
          setPost(response.data);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleBack = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#242424' }}>
        <BackgroundSVG />
        <Header />
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen text-white relative" style={{ backgroundColor: '#242424' }}>
        <Helmet>
          <title>Blog Post Not Found - SWT Labs</title>
        </Helmet>
        <BackgroundSVG />
        <Header />
        <div className="relative z-10">
          <div className={`container mx-auto px-4 ${isMobile ? 'pt-24' : 'pt-32'}`}>
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <h1 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h1>
                <p className="text-neutral-400 mb-6">
                  {error || "The blog post you're looking for doesn't exist or has been removed."}
                </p>
                <div className="space-x-4">
                  <Button
                    onClick={handleBack}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="border-neutral-700 text-neutral-300 hover:bg-neutral-800/50"
                  >
                    Go Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative" style={{ backgroundColor: '#242424' }}>
      <Helmet>
        <title>{post.title} - SWT Labs Blog</title>
        <meta name="description" content={post.excerpt || `Read ${post.title} on SWT Labs blog`} />
        <meta property="og:title" content={`${post.title} - SWT Labs`} />
        <meta property="og:description" content={post.excerpt || `Read ${post.title} on SWT Labs blog`} />
        {post.featured_image_url && (
          <meta property="og:image" content={post.featured_image_url} />
        )}
        <meta property="og:type" content="article" />
        <meta property="article:author" content={post.author_name} />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        {post.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <BackgroundSVG />
      <Header />

      <main className="relative z-10">
        <div className={`container mx-auto px-4 ${isMobile ? 'pt-20' : 'pt-24'}`}>
          <div 
            className="max-w-4xl mx-auto bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8"
            style={{ 
              boxShadow: '0 2px 16px rgba(36, 36, 36, 0.3), 0 4px 32px rgba(36, 36, 36, 0.2), 0 8px 48px rgba(36, 36, 36, 0.1)' 
            }}
          >
            <BlogPostComponent
              post={post}
              onBack={handleBack}
            />

            {/* New CTA Section */}
            <div className="mt-12 pt-6 border-t border-neutral-700">
              <div 
                className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 rounded-lg p-8 text-center backdrop-blur-sm"
                style={{ 
                  boxShadow: '0 4px 20px rgba(36, 36, 36, 0.4), 0 8px 40px rgba(36, 36, 36, 0.2), 0 16px 60px rgba(36, 36, 36, 0.1), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Transform Your Ideas?
                </h3>
                <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
                  Let's discuss how we can bring your vision to life with cutting-edge AI-powered solutions and modern web technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/estimate')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Get Free Estimate
                  </Button>
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-neutral-600 text-neutral-300 hover:bg-neutral-700/50 px-8 py-3 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    More Articles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage; 