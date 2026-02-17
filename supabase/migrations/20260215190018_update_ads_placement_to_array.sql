-- Convert placement column to text array
ALTER TABLE ads 
  ALTER COLUMN placement TYPE text[] USING string_to_array(placement, ',');

-- Create index for array containment queries
CREATE INDEX IF NOT EXISTS idx_ads_placement_array ON ads USING GIN (placement);
