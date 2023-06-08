'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Fab,
  Badge,
  alpha,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ShoppingCart, TrendingUp, Star, Menu as MenuIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { getProducts } from '@/lib/sanity/queries';
import { SanityProduct } from '@/types/sanity';
import { Product } from '@/types/pricing';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/context/CurrencyContext';
import ProductCard from '@/components/pricing/ProductCard';
import ShoppingCartSidebar from '@/components/pricing/ShoppingCartSidebar';
import FilterSidebar from '@/components/pricing/FilterSidebar';
import CurrencySelector from '@/components/CurrencySelector';

export default function ShopPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation('shop');
  const { currency, currencyConfig } = useCurrency();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sanityError, setSanityError] = useState(false);

  const { cart, addToCart, removeFromCart, updateQuantity, isInCart, getItemCount } = useCart();

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const locale = i18n.language || 'en';

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
            // Fallback to static products
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
  }, [i18n.language, currency]);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.features.some((f) => f.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popular':
        default:
          const aScore = (a.badge ? 10 : 0) + (a.originalPrice ? 5 : 0);
          const bScore = (b.badge ? 10 : 0) + (b.originalPrice ? 5 : 0);
          return bScore - aScore;
      }
    });
  console.log(filteredProducts, products);
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setSnackbarMessage(t('notifications.addedToCart', { productName: product.name }));
    setSnackbarOpen(true);
  };

  const handleCheckout = () => {
    alert(
      `${t('checkout.comingSoon')}\n\n${t('checkout.yourCart')}\n` +
        cart.items.map((item) => `${item.quantity}x ${item.product.name}`).join('\n') +
        `\n\n${t('checkout.total')} ${currencyConfig.symbol}${cart.total.toLocaleString()}`
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            🛍️ {t('hero.title')}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2, maxWidth: 800, mx: 'auto' }}>
            {t('hero.subtitle')}
          </Typography>

          {/* Sanity Status Banner */}
          {sanityError && (
            <Alert severity="info" sx={{ mt: 3, maxWidth: 800, mx: 'auto' }}>
              {t('banner.sanityDisabled')} <code>{t('banner.sanityCommand')}</code>
            </Alert>
          )}

          {/* Currency Selector */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CurrencySelector />
          </Box>
        </Box>{' '}
        {/* Main Layout: Filter Sidebar + Products Grid */}
        <Grid container spacing={3}>
          {/* Left Sidebar - Filters (Desktop only) */}
          {!isMobile && (
            <Grid item md={3}>
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

          {/* Center - Products Grid */}
          <Grid item xs={12} md={9}>
            {/* Loading State */}
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

            {/* Products Content */}
            {!loading && (
              <>
                {/* Sort Options - Top Right */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                  <ButtonGroup variant="outlined" size="small">
                    <Button
                      variant={sortBy === 'popular' ? 'contained' : 'outlined'}
                      onClick={() => setSortBy('popular')}
                      startIcon={<Star />}
                    >
                      {t('sort.popular')}
                    </Button>
                    <Button
                      variant={sortBy === 'price-asc' ? 'contained' : 'outlined'}
                      onClick={() => setSortBy('price-asc')}
                      startIcon={<TrendingUp sx={{ transform: 'rotate(180deg)' }} />}
                    >
                      {t('sort.lowToHigh')}
                    </Button>
                    <Button
                      variant={sortBy === 'price-desc' ? 'contained' : 'outlined'}
                      onClick={() => setSortBy('price-desc')}
                      startIcon={<TrendingUp />}
                    >
                      {t('sort.highToLow')}
                    </Button>
                  </ButtonGroup>
                </Box>
                {/* Products Grid */}
                <Grid container spacing={3}>
                  {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} lg={4} key={product.id}>
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        isInCart={isInCart(product.id)}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* No Results */}
                {filteredProducts.length === 0 && (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8,
                    }}
                  >
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {t('noResults.title')}
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                      {t('noResults.message')}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                    >
                      {t('noResults.clearFilters')}
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Shopping Cart - Right Side (Desktop - Collapsed/Expanded) */}
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

      {/* Mobile: Filter FAB */}
      {isMobile && (
        <Fab
          color="secondary"
          sx={{
            position: 'fixed',
            bottom: 96,
            right: 32,
            zIndex: 999,
          }}
          onClick={() => setFilterDrawerOpen(true)}
        >
          <MenuIcon />
        </Fab>
      )}

      {/* Mobile: Cart FAB */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 160,
            right: 32,
            zIndex: 999,
          }}
          onClick={() => setCartDrawerOpen(true)}
        >
          <Badge badgeContent={getItemCount()} color="error">
            <ShoppingCart />
          </Badge>
        </Fab>
      )}

      {/* Mobile: Filter Drawer */}
      {isMobile && (
        <Box
          component="nav"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '80vw',
            maxWidth: 360,
            height: '100vh',
            background: (theme) => theme.palette.background.paper,
            transform: filterDrawerOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            zIndex: 1200,
            overflow: 'auto',
            p: 3,
            boxShadow: filterDrawerOpen ? 24 : 0,
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Filters
            </Typography>
            <Button size="small" onClick={() => setFilterDrawerOpen(false)}>
              Close
            </Button>
          </Box>
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setFilterDrawerOpen(false);
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalProducts={products.length}
            filteredProducts={filteredProducts.length}
          />
        </Box>
      )}

      {/* Mobile: Filter Overlay */}
      {isMobile && filterDrawerOpen && (
        <Box
          onClick={() => setFilterDrawerOpen(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1199,
          }}
        />
      )}

      {/* Mobile: Cart Drawer */}
      {isMobile && (
        <ShoppingCartSidebar
          items={cart.items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          taxRate={cart.taxRate}
          isOpen={cartDrawerOpen}
          onClose={() => setCartDrawerOpen(false)}
        />
      )}

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
