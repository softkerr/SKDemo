// Sanity CMS Types
// All content is stored in English only
// Translations are handled via Locize based on English text as keys

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityService {
  _id: string;
  title: string; // English only - use as Locize key
  slug: {
    current: string;
  };
  category: string;
  description: string; // English only - use as Locize key
  icon?: string;
  featured: boolean;
  order: number;
}

export interface SanityPricingTier {
  _id: string;
  name: string; // English only - use as Locize key
  slug: {
    current: string;
  };
  description?: string; // English only - use as Locize key
  priceUSD: number;
  priceEUR: number;
  features: string[]; // English only - use as Locize keys
  popular: boolean;
  order: number;
  buttonText?: string; // English only - use as Locize key
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  role: string; // English only - use as Locize key
  bio?: string; // English only - use as Locize key
  image?: SanityImage;
  order: number;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface SanitySiteSettings {
  _id: string;
  companyName: string;
  tagline?: string; // English only - use as Locize key
  logo?: SanityImage;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  seo?: {
    metaTitle?: string; // English only - use as Locize key
    metaDescription?: string; // English only - use as Locize key
    keywords?: string[];
  };
}

export interface SanityPage {
  _id: string;
  title: string; // English only - use as Locize key
  slug: {
    current: string;
  };
  subtitle?: string; // English only - use as Locize key
  content?: any[]; // Portable Text blocks in English
  seo?: {
    metaTitle?: string; // English only - use as Locize key
    metaDescription?: string; // English only - use as Locize key
  };
}

export interface SanityNavigationSubItem {
  label: string; // English only - use as Locize key
  translationKey?: string; // Optional Locize key override
  linkType: 'internal' | 'external';
  internalLink?: string;
  externalLink?: string;
  icon?: string;
  order: number;
}

export interface SanityNavigationItem {
  label: string; // English only - use as Locize key
  translationKey?: string; // Optional Locize key override (e.g., 'nav.home')
  linkType: 'internal' | 'external' | 'none';
  internalLink?: string; // e.g., '/', '/services', '/about'
  externalLink?: string;
  openInNewTab: boolean;
  icon?: string; // MUI icon name
  order: number;
  showInHeader: boolean;
  showInFooter: boolean;
  children?: SanityNavigationSubItem[];
}

export interface SanityNavigation {
  _id: string;
  title: string; // Internal name (e.g., "Main Menu")
  identifier: {
    current: string; // e.g., "main-menu", "footer-menu"
  };
  items: SanityNavigationItem[];
}

export interface SanityProduct {
  _id: string;
  id: string; // Product slug
  name: string; // Localized name
  description: string; // Localized description
  category: 'web-design' | 'development' | 'marketing' | 'seo' | 'maintenance' | 'consulting';
  pricing: {
    usd: number;
    eur: number;
  };
  originalPricing?: {
    usd: number;
    eur: number;
  };
  features: string[]; // Localized features
  badge?: string;
  deliveryTime: string; // Localized delivery time
  billingCycle: 'one-time' | 'monthly' | 'yearly';
  isRecurring: boolean;
  image?: string;
  sortOrder: number;
}
