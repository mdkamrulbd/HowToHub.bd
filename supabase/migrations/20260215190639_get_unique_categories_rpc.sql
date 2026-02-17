-- Create a function to get unique categories from posts
CREATE OR REPLACE FUNCTION get_unique_categories()
RETURNS TABLE (category text)
LANGUAGE sql
STABLE
AS $$
  SELECT DISTINCT unnest(categories)
  FROM posts
  WHERE published = true
  ORDER BY 1;
$$;
