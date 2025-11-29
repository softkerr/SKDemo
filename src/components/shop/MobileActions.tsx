import React from 'react';
import { Fab, Badge, Box, Typography, Button } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';

interface MobileActionsProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenFilters: () => void;
}

export const MobileActions: React.FC<MobileActionsProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenFilters,
}) => {
  return (
    <>
      {/* Filter FAB */}
      <Fab
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: 96,
          right: 32,
          zIndex: 999,
        }}
        onClick={onOpenFilters}
        aria-label="Open filters"
      >
        <MenuIcon />
      </Fab>

      {/* Cart FAB */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 160,
          right: 32,
          zIndex: 999,
        }}
        onClick={onOpenCart}
        aria-label="Open cart"
      >
        <Badge badgeContent={cartItemCount} color="error">
          <ShoppingCart />
        </Badge>
      </Fab>
    </>
  );
};

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      {/* Drawer */}
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
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1200,
          overflow: 'auto',
          p: 3,
          boxShadow: isOpen ? 24 : 0,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filters
          </Typography>
          <Button size="small" onClick={onClose}>
            Close
          </Button>
        </Box>
        {children}
      </Box>

      {/* Overlay */}
      {isOpen && (
        <Box
          onClick={onClose}
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
    </>
  );
};
