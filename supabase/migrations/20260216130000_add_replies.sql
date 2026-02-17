-- Add reply support to comments table
ALTER TABLE comments ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES comments(id) ON DELETE CASCADE;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS is_admin_reply BOOLEAN DEFAULT FALSE;

-- Create index for parent_id
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
