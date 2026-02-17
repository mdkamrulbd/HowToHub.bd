-- Function to get category counts from posts
CREATE OR REPLACE FUNCTION get_category_counts()
RETURNS TABLE (name TEXT, count BIGINT)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    category AS name,
    COUNT(*) AS count
  FROM
    posts,
    UNNEST(categories) AS category
  WHERE
    published = true
  GROUP BY
    category
  ORDER BY
    count DESC;
$$;

-- Grant execute permission to anon and authenticated
GRANT EXECUTE ON FUNCTION get_category_counts() TO anon, authenticated;
