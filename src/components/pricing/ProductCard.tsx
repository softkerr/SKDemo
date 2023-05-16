'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from '@mui/material';
import { CheckCircle, ShoppingCart, AccessTime, TrendingUp } from '@mui/icons-material';
import { Product } from '@/types/pricing';
import { useCurrency } from '@/context/CurrencyContext';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

export default function ProductCard({ product, onAddToCart, isInCart }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const { currencyConfig } = useCurrency();
  const { t } = useTranslation(['shop', 'products']);

  // Map badge names to translation keys
  const getBadgeTranslationKey = (badge: string): string => {
    const badgeMap: Record<string, string> = {
      Popular: t('badges.popular'),
      'Best Value': t('badges.bestValue'),
      New: t('badges.new'),
      Essential: t('badges.essential'),
    };
    return badgeMap[badge] || badge;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      }}
    >
      {/* Badge */}
      {product.badge && (
        <Chip
          label={getBadgeTranslationKey(product.badge)}
          color={
            product.badge === 'Popular'
              ? 'primary'
              : product.badge === 'Best Value'
                ? 'success'
                : 'info'
          }
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontWeight: 700,
            zIndex: 1,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, pt: 4 }}>
        {/* Title */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t(`products:${product.id}.name`, product.name)}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
          {t(`products:${product.id}.description`, product.description)}
        </Typography>

        {/* Price */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
            <Typography
              variant="h3"
              component="span"
              sx={{ fontWeight: 800, color: 'primary.main' }}
            >
              {currencyConfig.symbol}
              {product.price.toLocaleString()}
            </Typography>
            {hasDiscount && (
              <Typography
                variant="h6"
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.disabled',
                }}
              >
                {currencyConfig.symbol}
                {product.originalPrice!.toLocaleString()}
              </Typography>
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {product.isRecurring ? `${t('product.perMonth')}` : t('product.oneTime')}
          </Typography>
        </Box>

        {/* Delivery Time */}
        {product.deliveryTime && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {t(`products:${product.id}.deliveryTime`, product.deliveryTime)}
            </Typography>
          </Box>
        )}

        {/* Features */}
        <List dense disablePadding>
          {product.features.map((feature, index) => (
            <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircle fontSize="small" color="success" />
              </ListItemIcon>
              <ListItemText
                primary={t(`products:${product.id}.features.${index}`, feature)}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.secondary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant={isInCart ? 'outlined' : 'contained'}
          fullWidth
          size="large"
          startIcon={isInCart ? <CheckCircle /> : <ShoppingCart />}
          onClick={() => onAddToCart(product)}
          disabled={isInCart}
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '1rem',
            background: isInCart
              ? 'transparent'
              : (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          {isInCart ? t('product.inCart') : t('product.addToCart')}
        </Button>
      </CardActions>
    </Card>
  );
}
