// Database types for Supabase tables

export interface SiteContent {
  key: string;
  value: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  year: string;
  image_url: string;
  tiktok_url: string | null;
  size: "small" | "large";
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  image_url: string;
  wa_message: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
