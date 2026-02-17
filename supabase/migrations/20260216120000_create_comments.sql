-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public can view approved comments
CREATE POLICY "Public can view approved comments" ON comments
    FOR SELECT USING (is_approved = true);

-- Public can insert comments
CREATE POLICY "Public can insert comments" ON comments
    FOR INSERT WITH CHECK (true);

-- Authenticated users (admins) can manage all comments
CREATE POLICY "Authenticated users can manage all comments" ON comments
    FOR ALL USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT, INSERT ON comments TO anon;
GRANT ALL PRIVILEGES ON comments TO authenticated;
