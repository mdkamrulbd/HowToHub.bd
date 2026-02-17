-- Trigger function to automatically generate slug on insert/update
CREATE OR REPLACE FUNCTION set_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
  -- Only generate slug if title changed or it's a new record
  IF NEW.slug IS NULL OR (TG_OP = 'UPDATE' AND NEW.title != OLD.title) THEN
    NEW.slug := generate_unique_slug(NEW.title, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_slug_trigger
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION set_slug_from_title();
