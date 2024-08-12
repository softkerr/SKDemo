'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Slide from '@mui/material/Slide';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  link?: string;
  index?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  category,
  description,
  link,
  index = 0 
}) => {
  return (
    <Slide direction="up" in timeout={400 + index * 100}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          border: '2px solid transparent',
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: 'primary.main',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 16px 40px rgba(47, 128, 237, 0.15)'
                : '0 16px 40px rgba(77, 159, 255, 0.25)',
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'white',
                mr: 2,
              }}
            >
              {icon}
            </Box>
            <Chip 
              label={category} 
              size="small" 
              color="secondary"
              variant="outlined"
            />
          </Box>
          <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {link && (
          <CardActions sx={{ p: 3, pt: 0 }}>
            <Button size="small" color="primary">
              Learn More →
            </Button>
          </CardActions>
        )}
      </Card>
    </Slide>
  );
};
