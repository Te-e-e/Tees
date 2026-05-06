-- ============================================================
-- Sakura-Kitsune Portfolio — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Prop',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  image_before_url TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Site content table (key-value for editable text)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for projects
-- Public can read visible projects
CREATE POLICY "Public can view visible projects"
  ON projects FOR SELECT
  USING (visible = true);

-- Authenticated users can read ALL projects (including hidden)
CREATE POLICY "Authenticated can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update
CREATE POLICY "Authenticated can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete
CREATE POLICY "Authenticated can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- 5. RLS Policies for site_content
-- Public can read all content
CREATE POLICY "Public can view site content"
  ON site_content FOR SELECT
  USING (true);

-- Authenticated users can update
CREATE POLICY "Authenticated can update site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated can insert site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 6. Seed default site content
INSERT INTO site_content (key, value) VALUES
  ('hero_title', 'Crafting Digital Worlds'),
  ('hero_subtitle', '3D Artist & Environment Designer'),
  ('hero_bio', 'Specializing in game-ready assets, stylized environments, and photorealistic renders. Every polygon tells a story.'),
  ('pricing_tier1_name', 'Basic'),
  ('pricing_tier1_price', '299'),
  ('pricing_tier1_features', 'Simple props & items;Up to 5K polygons;PBR textures included;2 revision rounds;5-day delivery'),
  ('pricing_tier2_name', 'Standard'),
  ('pricing_tier2_price', '599'),
  ('pricing_tier2_features', 'Characters & vehicles;Up to 25K polygons;PBR + stylized options;4 revision rounds;10-day delivery;Rigging included'),
  ('pricing_tier3_name', 'Premium'),
  ('pricing_tier3_price', '1299'),
  ('pricing_tier3_features', 'Full environments;Unlimited polygons;Complete texture sets;Unlimited revisions;Custom timeline;Animation ready')
ON CONFLICT (key) DO NOTHING;

-- 7. Create storage bucket (run this separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
