import { useState, useMemo } from 'react';
import { Product } from '@/types/pricing';
import { filterProducts, sortProducts, SortOption } from '@/utils/productFilters';

interface UseProductFiltersReturn {
  filteredProducts: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  clearFilters: () => void;
}

/**
 * Custom hook to manage product filtering and sorting
 * Handles category, search, and sort state with memoized results
 */
export function useProductFilters(products: Product[]): UseProductFiltersReturn {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      category: selectedCategory,
      searchQuery,
    });
    return sortProducts(filtered, sortBy);
  }, [products, selectedCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('popular');
  };

  return {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    clearFilters,
  };
}
