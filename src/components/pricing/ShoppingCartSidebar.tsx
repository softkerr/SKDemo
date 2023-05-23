'use client';

import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Chip,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  Add,
  Remove,
  Close,
  LocalOffer,
  CheckCircle,
} from '@mui/icons-material';
import { CartItem } from '@/types/pricing';
import { useCurrency } from '@/context/CurrencyContext';
import { useTranslation } from 'react-i18next';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  taxRate?: number;
  isOpen?: boolean;
  onClose?: () => void;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export default function ShoppingCartSidebar({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  taxRate = 0.1, // 10% tax
  isOpen = true,
  onClose,
  isExpanded = false,
  onToggleExpanded,
}: ShoppingCartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currencyConfig } = useCurrency();
  const { t } = useTranslation('shop');

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const cartContent = (
    <Box
      sx={{
        width: isMobile ? '100vw' : 400,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(
            theme.palette.background.default,
            0.98
          )})`,
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: 1,
          borderColor: 'divider',
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
              theme.palette.secondary.main,
              0.1
            )})`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Badge badgeContent={items.length} color="primary">
              <ShoppingCart sx={{ fontSize: 28 }} />
            </Badge>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t('cart.title')}
            </Typography>
          </Box>
          <IconButton onClick={isMobile ? onClose : onToggleExpanded} edge="end">
            <Close />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      {/* Cart Items */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {items.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 2,
              py: 8,
            }}
          >
            <ShoppingCart sx={{ fontSize: 80, color: 'text.disabled', opacity: 0.3 }} />
            <Typography variant="h6" color="text.secondary" align="center">
              {t('cart.empty')}
            </Typography>
            <Typography variant="body2" color="text.disabled" align="center">
              {t('cart.emptyMessage')}
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {items.map((item, index) => (
              <React.Fragment key={item.product.id}>
                <ListItem
                  disablePadding
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    background: (theme) => alpha(theme.palette.background.paper, 0.6),
                    border: 1,
                    borderColor: 'divider',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.05),
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    {/* Product Name & Price */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1, pr: 2 }}>
                        {item.product.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => onRemoveItem(item.product.id)}
                        sx={{
                          color: 'error.main',
                          '&:hover': {
                            background: (theme) => alpha(theme.palette.error.main, 0.1),
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Category & Billing */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={item.product.category.replace('-', ' ')}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                      {item.product.isRecurring && (
                        <Chip
                          label={item.product.billingCycle}
                          size="small"
                          color="info"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      )}
                    </Box>

                    {/* Quantity Controls & Price */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          sx={{
                            border: 1,
                            borderColor: 'divider',
                            '&:hover': { borderColor: 'primary.main' },
                          }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography
                          sx={{
                            minWidth: 40,
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          sx={{
                            border: 1,
                            borderColor: 'divider',
                            '&:hover': { borderColor: 'primary.main' },
                          }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {currencyConfig.symbol}
                        {(item.product.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      {/* Cart Summary */}
      {items.length > 0 && (
        <Box
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: 'divider',
            background: (theme) => alpha(theme.palette.background.paper, 0.8),
          }}
        >
          {/* Promo Code Input */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t('cart.promoCode')}
              InputProps={{
                startAdornment: <LocalOffer sx={{ mr: 1, color: 'text.secondary' }} />,
                endAdornment: (
                  <Button size="small" variant="text">
                    {t('cart.apply')}
                  </Button>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Price Breakdown */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {t('cart.subtotal')}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {currencyConfig.symbol}
                {subtotal.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {t('cart.tax')} ({(taxRate * 100).toFixed(0)}%)
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {currencyConfig.symbol}
                {tax.toLocaleString()}
              </Typography>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t('cart.total')}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                {currencyConfig.symbol}
                {total.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Checkout Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<CheckCircle />}
            onClick={onCheckout}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              transition: 'all 0.2s ease',
            }}
          >
            {t('cart.checkout')}
          </Button>

          {/* Security Badge */}
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            sx={{ display: 'block', mt: 2 }}
          >
            🔒 Secure checkout with SSL encryption
          </Typography>
        </Box>
      )}
    </Box>
  );

  // Use Drawer for both mobile and desktop
  return (
    <>
      {/* Cart Icon Button (Desktop only) */}
      {!isMobile && !isExpanded && (
        <Box
          sx={{
            position: 'fixed',
            top: 100,
            right: 24,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={onToggleExpanded}
            sx={{
              width: 64,
              height: 64,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.primary.main, 0.6)}`,
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Badge badgeContent={items.length} color="error" max={99}>
              <ShoppingCart sx={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
        </Box>
      )}

      {/* Drawer for both Mobile and Desktop */}
      <Drawer
        anchor="right"
        open={isMobile ? isOpen : isExpanded}
        onClose={isMobile ? onClose : onToggleExpanded}
        sx={{
          '& .MuiDrawer-paper': {
            boxShadow: (theme) => `0 0 40px ${alpha(theme.palette.common.black, 0.3)}`,
          },
        }}
        SlideProps={{
          timeout: 400,
          easing: {
            enter: 'cubic-bezier(0.4, 0, 0.2, 1)',
            exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      >
        {cartContent}
      </Drawer>
    </>
  );
}
