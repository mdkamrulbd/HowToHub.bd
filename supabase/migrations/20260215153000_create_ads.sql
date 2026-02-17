CREATE TABLE IF NOT EXISTS ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500),
    link_url VARCHAR(500),
    html TEXT,
    type VARCHAR(50) NOT NULL,
    placement VARCHAR(100) NOT NULL,
    enabled BOOLEAN DEFAULT false,
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ads_enabled ON ads(enabled);
CREATE INDEX IF NOT EXISTS idx_ads_placement ON ads(placement);
CREATE INDEX IF NOT EXISTS idx_ads_created_at ON ads(created_at DESC);

ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view enabled ads" ON ads
    FOR SELECT USING (enabled = true);

CREATE POLICY "Authenticated users can manage ads" ON ads
    FOR ALL USING (auth.role() = 'authenticated');

GRANT SELECT ON ads TO anon;
GRANT ALL PRIVILEGES ON ads TO authenticated;
