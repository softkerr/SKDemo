'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types/pricing';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useNotification } from '@/hooks/useNotification';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ShopHero,
  SortControls,
  ProductGrid,
  NoResults,
  MobileActions,
  MobileFilterDrawer,
} from '@/components/shop';
import ShoppingCartSidebar from '@/components/pricing/ShoppingCartSidebar';
import FilterSidebar from '@/components/pricing/FilterSidebar';

export default function ShopPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation('shop');
  const { currency, currencyConfig } = useCurrency();

  // Custom hooks
  const { products, loading, sanityError } = useProducts(i18n.language || 'en', currency);
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    clearFilters,
  } = useProductFilters(products);
  const notification = useNotification();
  const { cart, addToCart, removeFromCart, updateQuantity, isInCart, getItemCount } = useCart();

  // Local state
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Handlers
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    notification.show(t('notifications.addedToCart', { productName: product.name }));
  };

  const handleCheckout = () => {
    alert(
      `${t('checkout.comingSoon')}\n\n${t('checkout.yourCart')}\n` +
        cart.items.map((item) => `${item.quantity}x ${item.product.name}`).join('\n') +
        `\n\n${t('checkout.total')} ${currencyConfig.symbol}${cart.total.toLocaleString()}`
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (isMobile) setFilterDrawerOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="xl">
        <ShopHero sanityError={sanityError} />

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid size={{ md: 3 }}>
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                totalProducts={products.length}
                filteredProducts={filteredProducts.length}
              />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 9 }}>
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 400,
                }}
              >
                <CircularProgress size={60} />
              </Box>
            )}

            {!loading && (
              <>
                <SortControls sortBy={sortBy} onSortChange={setSortBy} />
                {filteredProducts.length > 0 ? (
                  <ProductGrid
                    products={filteredProducts}
                    onAddToCart={handleAddToCart}
                    isInCart={isInCart}
                  />
                ) : (
                  <NoResults onClearFilters={clearFilters} />
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {!isMobile && (
        <ShoppingCartSidebar
          items={cart.items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          taxRate={cart.taxRate}
          isExpanded={cartExpanded}
          onToggleExpanded={() => setCartExpanded(!cartExpanded)}
        />
      )}

      {isMobile && (
        <>
          <MobileActions
            cartItemCount={getItemCount()}
            onOpenCart={() => setCartDrawerOpen(true)}
            onOpenFilters={() => setFilterDrawerOpen(true)}
          />
          <MobileFilterDrawer isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)}>
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalProducts={products.length}
              filteredProducts={filteredProducts.length}
            />
          </MobileFilterDrawer>
          <ShoppingCartSidebar
            items={cart.items}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
            taxRate={cart.taxRate}
            isOpen={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
          />
        </>
      )}

      <Snackbar
        open={notification.isOpen}
        autoHideDuration={3000}
        onClose={notification.hide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={notification.hide}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
