import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Canvas } from '@react-three/fiber';
import { BlogList } from '@/components/blog/BlogList';
import { BlogPost } from '@/types/blog';
import { fetchBlogPosts } from '@/services/blogApi';
import Header from '@/components/Header';
import BackgroundSVG from '@/components/BackgroundSVG';
import { AnimatedModalDemoWrapper } from '@/components/ui/demo';
import GradientBackground from '@/components/GradientBackground';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Animated Box component for 3D CTA
const AnimatedBox: React.FC<{ initialPosition: [number, number, number] }> = ({ initialPosition }) => {
  return (
    <mesh position={initialPosition}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color="#FF69B4" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#FFD700"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const Blog: React.FC = () => {
  const navigate = useNavigate();
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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <Helmet>
        <title>Blog - SWT Labs</title>
        <meta name="description" content="Latest insights, tutorials, and updates from SWT Labs on AI-powered development, modern web technologies, and software engineering best practices." />
        <meta property="og:title" content="Blog - SWT Labs" />
        <meta property="og:description" content="Stay updated with the latest in AI-powered development and modern web technologies." />
      </Helmet>

      <BackgroundSVG />
      <Header />

      <main className="relative z-10">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-[#FFD700] to-[#FF69B4] bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto">
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
                className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg 
                         text-white placeholder-neutral-400 focus:outline-none focus:ring-2 
                         focus:ring-[rgb(218,119,134)] focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
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
                    className="bg-gradient-to-r from-[#FFD700] to-[#FF69B4] hover:from-[#FFD700]/80 hover:to-[#FF69B4]/80 text-black font-semibold"
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

          {/* Enhanced CTA Section with 3D Canvas */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="relative mt-16 mb-8 min-h-[500px] w-screen left-1/2 -translate-x-1/2">
              {/* 3D Canvas Background */}
              <div className="absolute inset-0 h-[500px]">
                <Canvas
                  camera={{ position: [0, 5, 15], fov: 40 }}
                  gl={{ alpha: true }}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <AnimatedBox initialPosition={[-4, 0.5, -2]} />
                  <AnimatedBox initialPosition={[4, 0.5, -3]} />
                  <AnimatedBox initialPosition={[0, 0.5, -4]} />
                  <AnimatedBox initialPosition={[-3, 1, -5]} />
                  <AnimatedBox initialPosition={[3, 1, -5]} />
                  <AnimatedBox initialPosition={[-1, 0.5, -6]} />
                  <AnimatedBox initialPosition={[1, 0.5, -6]} />
                </Canvas>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center h-[500px] bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent px-4">
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog; 