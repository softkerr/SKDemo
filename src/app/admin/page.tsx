'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import LiveOverview from '@/components/LiveOverview';
import { useAdminTabs } from '@/hooks/useAdminTabs';
import { AdminHero, AdminTabs } from '@/components/admin';

export default function AdminPage() {
  const { activeTab, handleTabChange } = useAdminTabs();

  return (
    <Box>
      <AdminHero />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <LiveOverview />
        <AdminTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </Container>
    </Box>
  );
}
