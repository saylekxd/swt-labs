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
import GradientBackground from '@/components/GradientBackground';
import { AnimatedModalDemoWrapper } from '@/components/ui/demo';

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
    <div className="text-white relative overflow-hidden" style={{ backgroundColor: '#242424', minHeight: '100vh' }}>
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
          <div className="max-w-4xl mx-auto">
            <BlogPostComponent
              post={post}
              onBack={handleBack}
            />
          </div>
        </div>
        
        {/* Content Overlay - Full Width */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center h-[500px] bg-gradient-to-t from-[#242424] via-[#242424]/80 to-transparent px-4">
          <h2 className="text-2xl pt-20 sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">
            Chcesz być na bieżąco z najnowszymi trendami?
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 mb-6 sm:mb-8 max-w-2xl text-center">
            Dołącz do nas i odkryj najnowsze trendy w AI-powered development i nowoczesnych technologiach webowych.
          </p>
          <>
            <AnimatedModalDemoWrapper />
            <GradientBackground />
          </>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage; 