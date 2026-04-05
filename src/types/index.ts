export interface Project {
  id: string;
  name: string;
  slug: string;
  address: string;
  neighborhood: string;
  neighborhoodSlug: string;
  developer: string;
  developerId: string | null;
  architect: string | null;
  floors: number | null;
  units: number | null;
  priceMin: number | null;
  priceMax: number | null;
  pricePerSqft: number | null;
  completionYear: number | null;
  status: 'pre-construction' | 'under-construction' | 'completed' | 'selling';
  buildingType: 'condo' | 'townhome' | 'detached' | 'stacked-townhome' | 'mixed';
  description: string;
  longDescription: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  faqJson: { question: string; answer: string }[] | null;
  amenities: string[] | null;
  features: string[] | null;
  mainImageUrl: string;
  galleryImages: string[] | null;
  latitude: number;
  longitude: number;
  footprint: object | null;
  modelUrl: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  avgPrice: number | null;
  avgPricePerSqft: number | null;
  projectCount: number;
  displayOrder: number;
}

export interface Developer {
  id: string;
  name: string;
  slug: string;
  bio: string;
  logoUrl: string | null;
  website: string | null;
  foundedYear: number | null;
  headquarters: string | null;
  projectCount: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  keywords: string[] | null;
  publishedAt: string;
  readingTime: number;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  projectId: string | null;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  projectId: string | null;
  name: string;
  slug: string;
  neighborhood: string;
  address: string;
  status: 'for_sale' | 'sold' | 'under_contract';
  storyContent: string | null;
  originalPrice: number | null;
  soldPrice: number | null;
  daysOnMarket: number | null;
  tagline: string;
  imageUrl: string;
  galleryImages: string[] | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  isFeatured: boolean;
  createdAt: string;
}
