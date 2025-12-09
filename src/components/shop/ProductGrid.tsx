import React from 'react';
import { Grid } from '@mui/material';
import { Product } from '@/types/pricing';
import ProductCard from '@/components/pricing/ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isInCart: (productId: string) => boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, isInCart }) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            isInCart={isInCart(product.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
