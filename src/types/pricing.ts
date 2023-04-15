export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For showing discounts
  currency: string;
  category: 'web-design' | 'development' | 'marketing' | 'seo' | 'maintenance' | 'consulting';
  features: string[];
  image?: string;
  badge?: string; // "Popular", "Best Value", "New", etc.
  deliveryTime?: string; // "2-3 weeks", "1 month", etc.
  isRecurring?: boolean; // Monthly subscription vs one-time
  billingCycle?: 'monthly' | 'yearly' | 'one-time';
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  discount?: number;
  discountCode?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}
