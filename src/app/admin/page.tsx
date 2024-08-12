'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Container, Typography, Tabs, Tab, Card, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  ViewKanban, 
  Timeline, 
  Dashboard, 
  Assessment, 
  Settings, 
  People 
} from '@mui/icons-material';
import KanbanBoard from '@/components/KanbanBoard';
import TimelineRoadmap from '@/components/TimelineRoadmap';
import DashboardOverview from '@/components/DashboardOverview';
import AnalyticsView from '@/components/AnalyticsView';
import TeamManagement from '@/components/TeamManagement';
import LiveOverview from '@/components/LiveOverview';
import SettingsView from '@/components/SettingsView';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  // Tab names for URL params
  const tabNames = ['kanban', 'timeline', 'dashboard', 'analytics', 'team', 'settings'];

  // Initialize tab from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const tabIndex = tabNames.indexOf(tab);
      if (tabIndex !== -1) {
        setActiveTab(tabIndex);
      }
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Update URL with search param
    const newTab = tabNames[newValue];
    router.push(`/admin?tab=${newTab}`, { scroll: false });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, md: 8 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'pulse 3s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
              '50%': { transform: 'scale(1.1)', opacity: 0.3 },
            },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label="Admin Dashboard"
              sx={{
                mb: 2,
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'white',
                mb: 2,
                textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              Project Management Hub
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'rgba(255,255,255,0.95)',
                maxWidth: '48rem',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Manage your projects with powerful tools: Kanban boards, timelines, analytics, and more
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Live Overview - Above Tabs */}
        <LiveOverview />

        {/* Tabs Navigation */}
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="admin tools tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minHeight: 64,
                minWidth: 120,
              },
            }}
          >
            <Tab
              icon={<ViewKanban />}
              iconPosition="start"
              label="Kanban Board"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<Timeline />}
              iconPosition="start"
              label="Timeline & Roadmap"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<Dashboard />}
              iconPosition="start"
              label="Dashboard"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<Assessment />}
              iconPosition="start"
              label="Analytics"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<People />}
              iconPosition="start"
              label="Team"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<Settings />}
              iconPosition="start"
              label="Settings"
              sx={{ gap: 1 }}
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Tab Panels */}
            <TabPanel value={activeTab} index={0}>
              <KanbanBoard />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <TimelineRoadmap />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <DashboardOverview />
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <AnalyticsView />
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <TeamManagement />
            </TabPanel>

            <TabPanel value={activeTab} index={5}>
              <SettingsView />
            </TabPanel>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
