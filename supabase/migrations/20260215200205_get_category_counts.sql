-- Function to get categories with post counts
CREATE OR REPLACE FUNCTION get_category_counts()
RETURNS TABLE (category text, count bigint)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    c.category,
    count(p.id) as count
  FROM (
    SELECT DISTINCT unnest(categories) as category
    FROM posts
    WHERE published = true
  ) c
  JOIN posts p ON p.published = true AND p.categories @> ARRAY[c.category]
  GROUP BY c.category
  ORDER BY count DESC, c.category ASC;
$$;
