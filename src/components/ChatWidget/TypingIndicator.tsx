import React from 'react';
import { Box, CircularProgress, Typography, Avatar, alpha, Fade } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function TypingIndicator() {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={300}>
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          mb: 2,
          px: { xs: 1, sm: 2 },
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.mode === 'dark'
              ? alpha('#4ade80', 0.2)
              : alpha('#10b981', 0.2),
            color: '#10b981',
            width: 36,
            height: 36,
            boxShadow: `0 2px 8px ${alpha('#10b981', 0.3)}`,
          }}
        >
          <SmartToy fontSize="small" />
        </Avatar>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 2,
            borderRadius: 3,
            background: theme.palette.mode === 'dark'
              ? alpha('#fff', 0.05)
              : '#fff',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 2px 12px ${alpha('#000', 0.08)}`,
          }}
        >
          <CircularProgress size={16} thickness={5} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            AI is thinking...
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}
