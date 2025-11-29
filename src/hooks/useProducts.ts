import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/sanity/queries';
import { SanityProduct } from '@/types/sanity';
import { Product } from '@/types/pricing';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  sanityError: boolean;
}

/**
 * Custom hook to fetch and manage products from Sanity CMS
 * Handles loading states, error fallback, and currency conversion
 */
export function useProducts(locale: string, currency: string): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sanityError, setSanityError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        try {
          const sanityProducts = await getProducts(locale);

          if (sanityProducts && sanityProducts.length > 0) {
            // Convert Sanity products to Product format
            const convertedProducts: Product[] = sanityProducts.map((p: SanityProduct) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.pricing[currency.toLowerCase() as 'usd' | 'eur'],
              originalPrice: p.originalPricing
                ? p.originalPricing[currency.toLowerCase() as 'usd' | 'eur']
                : undefined,
              currency: currency,
              category: p.category,
              features: p.features,
              badge: p.badge,
              deliveryTime: p.deliveryTime,
              billingCycle: p.billingCycle,
              isRecurring: p.isRecurring,
            }));

            setProducts(convertedProducts);
            setSanityError(false);
            console.log(`✅ Loaded ${convertedProducts.length} products from Sanity`);
          } else {
            console.warn('⚠️ No products from Sanity, using static data');
            setSanityError(true);
          }
        } catch (sanityError) {
          console.error('❌ Error fetching from Sanity, using static data:', sanityError);
          setSanityError(true);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [locale, currency]);

  return { products, loading, sanityError };
}
