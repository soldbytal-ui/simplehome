-- SimpleHome.ca Database Schema for Supabase

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  "neighborhoodSlug" TEXT NOT NULL,
  developer TEXT NOT NULL,
  "developerId" TEXT,
  architect TEXT,
  floors INTEGER,
  units INTEGER,
  "priceMin" BIGINT,
  "priceMax" BIGINT,
  "pricePerSqft" INTEGER,
  "completionYear" INTEGER,
  status TEXT NOT NULL DEFAULT 'pre-construction',
  "buildingType" TEXT NOT NULL DEFAULT 'condo',
  description TEXT NOT NULL,
  "longDescription" TEXT,
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "faqJson" JSONB,
  amenities TEXT[],
  features TEXT[],
  "mainImageUrl" TEXT NOT NULL,
  "galleryImages" TEXT[],
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  footprint JSONB,
  "modelUrl" TEXT,
  website TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  "avgPrice" BIGINT,
  "avgPricePerSqft" INTEGER,
  "projectCount" INTEGER DEFAULT 0,
  "displayOrder" INTEGER DEFAULT 0
);

-- Developers table
CREATE TABLE IF NOT EXISTS developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT NOT NULL,
  "logoUrl" TEXT,
  website TEXT,
  "foundedYear" INTEGER,
  headquarters TEXT,
  "projectCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  category TEXT NOT NULL,
  keywords TEXT[],
  "publishedAt" TIMESTAMPTZ NOT NULL,
  "readingTime" INTEGER NOT NULL,
  "metaTitle" TEXT,
  "metaDescription" TEXT
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  "projectId" TEXT,
  status TEXT DEFAULT 'new',
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "projectId" TEXT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  neighborhood TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'for_sale',
  "storyContent" TEXT,
  "originalPrice" BIGINT,
  "soldPrice" BIGINT,
  "daysOnMarket" INTEGER,
  tagline TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "galleryImages" TEXT[],
  beds INTEGER,
  baths INTEGER,
  sqft INTEGER,
  "isFeatured" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_neighborhood ON projects("neighborhoodSlug");
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_developer ON projects("developerId");
CREATE INDEX IF NOT EXISTS idx_neighborhoods_slug ON neighborhoods(slug);
CREATE INDEX IF NOT EXISTS idx_developers_slug ON developers(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts("publishedAt" DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio_items(status);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS policy: allow inserts from anon
CREATE POLICY "Allow anonymous lead submissions" ON leads
  FOR INSERT TO anon WITH CHECK (true);

-- RLS policy: allow select for authenticated only
CREATE POLICY "Allow authenticated lead reads" ON leads
  FOR SELECT TO authenticated USING (true);
