import React from 'react';
import { Box, Card, Tabs, Tab, useTheme } from '@mui/material';
import { adminTabs } from '@/data/admin';

interface AdminTabsProps {
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

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

export const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={onTabChange}
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
        {adminTabs.map((tab) => (
          <Tab
            key={tab.id}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
            sx={{ gap: 1 }}
          />
        ))}
      </Tabs>

      <Box sx={{ p: 3 }}>
        {adminTabs.map((tab, index) => (
          <TabPanel key={tab.id} value={activeTab} index={index}>
            {tab.component}
          </TabPanel>
        ))}
      </Box>
    </Card>
  );
};
