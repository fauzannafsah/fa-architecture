-- ============================================
-- FA Architecture — Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor → New Query

-- 1. Key-Value Content Table
-- Stores all editable text/URL content as key-value pairs
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tiktok_url TEXT,
  size TEXT DEFAULT 'small' CHECK (size IN ('small', 'large')),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  wa_message TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read site_content" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "Public read portfolio_projects" ON portfolio_projects
  FOR SELECT USING (true);

CREATE POLICY "Public read services" ON services
  FOR SELECT USING (true);

-- Authenticated write access for all tables
CREATE POLICY "Admin insert site_content" ON site_content
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin update site_content" ON site_content
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin delete site_content" ON site_content
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert portfolio_projects" ON portfolio_projects
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin update portfolio_projects" ON portfolio_projects
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin delete portfolio_projects" ON portfolio_projects
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert services" ON services
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin update services" ON services
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin delete services" ON services
  FOR DELETE TO authenticated USING (true);

-- ============================================
-- Storage Bucket for Images
-- ============================================
-- Run this separately in Supabase Dashboard → Storage → New Bucket
-- Bucket name: "images"
-- Public bucket: YES (so images are publicly accessible)
--
-- Or via SQL:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Admin upload images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

CREATE POLICY "Admin update images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'images');

CREATE POLICY "Admin delete images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'images');

-- ============================================
-- Updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
