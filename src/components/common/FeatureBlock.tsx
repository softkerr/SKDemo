'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

interface FeatureBlockProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({ 
  icon, 
  title, 
  description,
  index = 0 
}) => {
  return (
    <Grow in timeout={500 + index * 100}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 12px 32px rgba(0, 0, 0, 0.12)'
                : '0 12px 32px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white',
              mb: 3,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};
