'use client';

import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface SectionProps {
  children: ReactNode;
  bgcolor?: string;
  py?: number;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  bgcolor, 
  py = 8,
  fullWidth = false 
}) => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: bgcolor || 'transparent',
        py,
      }}
    >
      {fullWidth ? (
        children
      ) : (
        <Container maxWidth="lg">{children}</Container>
      )}
    </Box>
  );
};
