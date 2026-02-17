-- Add categories column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT ARRAY[]::TEXT[];
