-- Add slug column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION generate_unique_slug(title text, current_id uuid DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  base_slug text;
  new_slug text;
  counter integer := 0;
  exists_count integer;
BEGIN
  -- Convert title to base slug (lowercase, replace non-alphanumeric with hyphens)
  base_slug := lower(regexp_replace(title, '[^a-zA-Z0-9\u0980-\u09FF]+', '-', 'g'));
  -- Remove leading/trailing hyphens
  base_slug := trim(both '-' from base_slug);
  
  -- If empty (e.g. only symbols), use 'post'
  IF base_slug = '' THEN
    base_slug := 'post';
  END IF;

  new_slug := base_slug;
  
  LOOP
    -- Check if slug exists (excluding current post if updating)
    SELECT count(*) INTO exists_count
    FROM posts
    WHERE slug = new_slug
    AND (current_id IS NULL OR id != current_id);
    
    IF exists_count = 0 THEN
      EXIT; -- Unique slug found
    END IF;
    
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN new_slug;
END;
$$;

-- Update existing posts with slugs
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id, title FROM posts WHERE slug IS NULL LOOP
    UPDATE posts
    SET slug = generate_unique_slug(r.title, r.id)
    WHERE id = r.id;
  END LOOP;
END $$;

-- Make slug required for future inserts
ALTER TABLE posts ALTER COLUMN slug SET NOT NULL;
