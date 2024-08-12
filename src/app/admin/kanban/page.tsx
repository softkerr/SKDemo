'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Card, CardContent, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ViewKanban, Timeline, TrendingUp } from '@mui/icons-material';
import KanbanBoard from '@/components/KanbanBoard';
import TimelineRoadmap from '@/components/TimelineRoadmap';

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
      id={`management-tabpanel-${index}`}
      aria-labelledby={`management-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ManagementToolsPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
              label="Project Management"
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
              Management Tools
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
              Organize tasks with Kanban boards and track progress with interactive timelines
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Tabs Navigation */}
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            mb: 4,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="management tools tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minHeight: 64,
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
          </Tabs>

          {/* Stats Bar */}
          <Box
            sx={{
              px: 3,
              py: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" spacing={4} flexWrap="wrap" gap={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Total Tasks
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  12
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  In Progress
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  4
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                  3
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Team Members
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  6
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Card>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <KanbanBoard />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <TimelineRoadmap />
        </TabPanel>
      </Container>

      {/* Info Section */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50',
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 4,
            }}
          >
            Features
          </Typography>
          <Stack spacing={3}>
            <Card
              elevation={0}
              sx={{
                border: 1,
                borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#3b82f620',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ViewKanban sx={{ color: '#3b82f6', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Drag & Drop Kanban
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      Organize tasks visually with drag-and-drop functionality. Move cards between
                      columns effortlessly using @dnd-kit library for smooth interactions.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                border: 1,
                borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#8b5cf620',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Timeline sx={{ color: '#8b5cf6', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Interactive Timeline
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      Visualize project roadmaps and milestones with beautiful timeline views.
                      Track progress, dates, and team assignments for each milestone.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                border: 1,
                borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#10b98120',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUp sx={{ color: '#10b981', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      localStorage Persistence
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      All your changes are automatically saved to localStorage. Your task
                      organization and timeline data persist across browser sessions.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
