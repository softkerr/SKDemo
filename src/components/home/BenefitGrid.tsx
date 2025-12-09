import React from 'react';
import { Box, Stack, Typography, Grid, alpha } from '@mui/material';
import type { Benefit } from '@/data/homepage';

interface BenefitGridProps {
  benefits: Benefit[];
  color: string;
}

export const BenefitGrid: React.FC<BenefitGridProps> = ({ benefits, color }) => {
  return (
    <Grid container spacing={2}>
      {benefits.map((item, idx) => (
        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 40,
                height: 40,
                minWidth: 40,
                borderRadius: 2,
                background: alpha(color, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
              }}
            >
              {item.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};
