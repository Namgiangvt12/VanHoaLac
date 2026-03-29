-- Blog Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Tin tức',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Bánh Trung Thu',
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Site Settings Table (for text content)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view published content)
CREATE POLICY "Anyone can view published posts" ON posts 
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Anyone can insert posts" ON posts;
CREATE POLICY "Anyone can insert posts" ON posts 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view in-stock products" ON products 
  FOR SELECT USING (in_stock = true);

DROP POLICY IF EXISTS "Anyone can insert products" ON products;
CREATE POLICY "Anyone can insert products" ON products 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view site settings" ON site_settings 
  FOR SELECT USING (true);

-- Authenticated user policies (admin can manage all)
CREATE POLICY "Authenticated users can view all posts" ON posts 
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert posts" ON posts 
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update posts" ON posts 
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete posts" ON posts 
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view all products" ON products 
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert products" ON products 
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update products" ON products 
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete products" ON products 
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can manage site settings" ON site_settings 
  FOR ALL TO authenticated USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
