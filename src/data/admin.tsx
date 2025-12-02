import React from 'react';
import { ViewKanban, Timeline, Dashboard, Assessment, Settings, People } from '@mui/icons-material';
import KanbanBoard from '@/components/KanbanBoard';
import TimelineRoadmap from '@/components/TimelineRoadmap';
import DashboardOverview from '@/components/DashboardOverview';
import AnalyticsView from '@/components/AnalyticsView';
import TeamManagement from '@/components/TeamManagement';
import SettingsView from '@/components/SettingsView';

export interface AdminTabConfig {
  id: string;
  label: string;
  icon: React.ReactElement;
  component: React.ReactNode;
}

export const adminTabs: AdminTabConfig[] = [
  {
    id: 'kanban',
    label: 'Kanban Board',
    icon: <ViewKanban />,
    component: <KanbanBoard />,
  },
  {
    id: 'timeline',
    label: 'Timeline & Roadmap',
    icon: <Timeline />,
    component: <TimelineRoadmap />,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    component: <DashboardOverview />,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <Assessment />,
    component: <AnalyticsView />,
  },
  {
    id: 'team',
    label: 'Team',
    icon: <People />,
    component: <TeamManagement />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    component: <SettingsView />,
  },
];
