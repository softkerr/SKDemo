import React from 'react';
import { ViewKanban, Timeline, Dashboard, Assessment, Settings, People } from '@mui/icons-material';
import KanbanBoard from '@/components/KanbanBoard';
import TimelineRoadmap from '@/components/TimelineRoadmap';
import DashboardOverview from '@/components/DashboardOverview';
import AnalyticsView from '@/components/AnalyticsView';
import TeamManagement from '@/components/TeamManagement';
import SettingsView from '@/components/SettingsView';
import i18n from '@/i18n/config';

export interface AdminTabConfig {
  id: string;
  label: string;
  icon: React.ReactElement;
  component: React.ReactNode;
}

export const getAdminTabs = (): AdminTabConfig[] => [
  {
    id: 'kanban',
    label: i18n.t('tabs.kanban', { ns: 'admin' }),
    icon: <ViewKanban />,
    component: <KanbanBoard />,
  },
  {
    id: 'timeline',
    label: i18n.t('tabs.timeline', { ns: 'admin' }),
    icon: <Timeline />,
    component: <TimelineRoadmap />,
  },
  {
    id: 'dashboard',
    label: i18n.t('tabs.dashboard', { ns: 'admin' }),
    icon: <Dashboard />,
    component: <DashboardOverview />,
  },
  {
    id: 'analytics',
    label: i18n.t('tabs.analytics', { ns: 'admin' }),
    icon: <Assessment />,
    component: <AnalyticsView />,
  },
  {
    id: 'team',
    label: i18n.t('tabs.team', { ns: 'admin' }),
    icon: <People />,
    component: <TeamManagement />,
  },
  {
    id: 'settings',
    label: i18n.t('tabs.settings', { ns: 'admin' }),
    icon: <Settings />,
    component: <SettingsView />,
  },
];

// Legacy export for backward compatibility
export const adminTabs = getAdminTabs();
