import { Product } from '@/types/pricing';

export type SortOption = 'price-asc' | 'price-desc' | 'popular';

export interface FilterOptions {
  category: string;
  searchQuery: string;
}

/**
 * Filter products by category and search query
 */
export function filterProducts(products: Product[], options: FilterOptions): Product[] {
  return products.filter((product) => {
    // Filter by category
    if (options.category !== 'all' && product.category !== options.category) {
      return false;
    }

    // Filter by search query
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.features.some((f) => f.toLowerCase().includes(query))
      );
    }

    return true;
  });
}

/**
 * Sort products based on selected option
 */
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
      default:
        // Calculate popularity score based on badges and discounts
        const aScore = (a.badge ? 10 : 0) + (a.originalPrice ? 5 : 0);
        const bScore = (b.badge ? 10 : 0) + (b.originalPrice ? 5 : 0);
        return bScore - aScore;
    }
  });
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
