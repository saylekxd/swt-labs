-- Migration: 003_setup_row_level_security.sql
-- Description: Configure Row Level Security for blog tables
-- Created: 2024

-- Enable Row Level Security on blog_posts table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published posts
CREATE POLICY "Public can view published posts" ON blog_posts
    FOR SELECT USING (published = true);

-- Policy: Allow full access for admin operations
-- Note: In production, you would typically use a more sophisticated auth system
-- For now, we'll use a service role key or admin user context
CREATE POLICY "Admin can manage all posts" ON blog_posts
    FOR ALL USING (
        -- This assumes admin operations will use service role key
        -- or a specific admin user role
        current_setting('role') = 'service_role' OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'admin'
    );

-- Enable Row Level Security on blog_categories table (if using categories)
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to categories
CREATE POLICY "Public can view categories" ON blog_categories
    FOR SELECT USING (true);

-- Policy: Allow admin to manage categories
CREATE POLICY "Admin can manage categories" ON blog_categories
    FOR ALL USING (
        current_setting('role') = 'service_role' OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'admin'
    );

-- Enable Row Level Security on blog_post_categories relationship table
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to post-category relationships for published posts
CREATE POLICY "Public can view post-category relationships" ON blog_post_categories
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM blog_posts 
            WHERE blog_posts.id = blog_post_categories.post_id 
            AND blog_posts.published = true
        )
    );

-- Policy: Allow admin to manage post-category relationships
CREATE POLICY "Admin can manage post-category relationships" ON blog_post_categories
    FOR ALL USING (
        current_setting('role') = 'service_role' OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'admin'
    );

-- Grant necessary permissions to authenticated users (for public read access)
GRANT SELECT ON blog_posts TO authenticated;
GRANT SELECT ON blog_categories TO authenticated;
GRANT SELECT ON blog_post_categories TO authenticated;

-- Grant necessary permissions to anonymous users (for public read access)
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON blog_categories TO anon;
GRANT SELECT ON blog_post_categories TO anon; 