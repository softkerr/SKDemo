'use client';

import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  children
}) => {
  return (
    <Fade in timeout={800}>
      <Box sx={{ mb: 6, textAlign: align }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
                : 'linear-gradient(135deg, #4D9FFF 0%, #8DD6FF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ maxWidth: 700, mx: align === 'center' ? 'auto' : 0 }}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </Box>
    </Fade>
  );
};
