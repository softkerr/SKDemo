'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Zoom from '@mui/material/Zoom';
import { useCurrency } from '@/context/CurrencyContext';

interface PricingCardProps {
  title: string;
  priceUSD: number;
  priceEUR: number;
  features: string[];
  popular?: boolean;
  buttonText: string;
  index?: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  priceUSD,
  priceEUR,
  features,
  popular = false,
  buttonText,
  index = 0 
}) => {
  const { formatPrice } = useCurrency();

  return (
    <Zoom in timeout={500 + index * 100}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'all 0.3s ease',
          border: popular ? '3px solid' : '2px solid transparent',
          borderColor: popular ? 'primary.main' : 'transparent',
          transform: popular ? 'scale(1.05)' : 'scale(1)',
          '&:hover': {
            transform: popular ? 'scale(1.07)' : 'scale(1.02)',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 20px 50px rgba(47, 128, 237, 0.2)'
                : '0 20px 50px rgba(77, 159, 255, 0.3)',
          },
        }}
      >
        {popular && (
          <Chip
            label="Most Popular"
            color="primary"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              fontWeight: 700,
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom fontWeight={700}>
            {title}
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography
              variant="h3"
              component="div"
              color="primary"
              sx={{ fontWeight: 800, display: 'inline' }}
            >
              {formatPrice(priceUSD, priceEUR)}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ display: 'inline', ml: 1 }}
            >
              /month
            </Typography>
          </Box>
          <List sx={{ mt: 3 }}>
            {features.map((feature, idx) => (
              <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={feature}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions sx={{ p: 4, pt: 0 }}>
          <Button
            variant={popular ? 'contained' : 'outlined'}
            color="primary"
            fullWidth
            size="large"
          >
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </Zoom>
  );
};
