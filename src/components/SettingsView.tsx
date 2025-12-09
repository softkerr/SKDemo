'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person,
  Notifications,
  Security,
  Palette,
  Language,
  Storage,
  CloudUpload,
  CloudDownload,
  Delete,
  Save,
  RestartAlt,
  Email,
  Sms,
  NotificationsActive,
  VolumeUp,
  Lock,
  Key,
  Fingerprint,
  Shield,
  DarkMode,
  LightMode,
  SettingsBrightness,
  Check,
  Close,
  Warning,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SettingsView() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'reset' | 'clear' | null>(null);

  // Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    role: 'Administrator',
    department: 'Engineering',
    timezone: 'UTC-8 (Pacific Time)',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    taskAssigned: true,
    taskCompleted: true,
    projectUpdates: true,
    teamMentions: true,
    weeklyDigest: true,
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    themeMode: 'system',
    colorScheme: 'blue',
    compactMode: false,
    animationsEnabled: true,
    fontSize: 'medium',
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginNotifications: true,
  });

  // Data & Privacy
  const [dataSettings, setDataSettings] = useState({
    autoSave: true,
    dataRetention: '365',
    analyticsEnabled: true,
    crashReports: true,
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.profile) setProfileSettings(parsed.profile);
        if (parsed.notifications) setNotificationSettings(parsed.notifications);
        if (parsed.appearance) setAppearanceSettings(parsed.appearance);
        if (parsed.security) setSecuritySettings(parsed.security);
        if (parsed.data) setDataSettings(parsed.data);
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      profile: profileSettings,
      notifications: notificationSettings,
      appearance: appearanceSettings,
      security: securitySettings,
      data: dataSettings,
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setSnackbarMessage('Settings saved successfully!');
    setSnackbarOpen(true);
  };

  const handleExportData = () => {
    const allData = {
      settings: {
        profile: profileSettings,
        notifications: notificationSettings,
        appearance: appearanceSettings,
        security: securitySettings,
        data: dataSettings,
      },
      kanban: localStorage.getItem('kanbanData'),
      timeline: localStorage.getItem('roadmapProjects'),
      team: localStorage.getItem('teamMembers'),
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setSnackbarMessage('Data exported successfully!');
    setSnackbarOpen(true);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        
        if (imported.settings) {
          if (imported.settings.profile) setProfileSettings(imported.settings.profile);
          if (imported.settings.notifications) setNotificationSettings(imported.settings.notifications);
          if (imported.settings.appearance) setAppearanceSettings(imported.settings.appearance);
          if (imported.settings.security) setSecuritySettings(imported.settings.security);
          if (imported.settings.data) setDataSettings(imported.settings.data);
        }
        
        if (imported.kanban) localStorage.setItem('kanbanData', imported.kanban);
        if (imported.timeline) localStorage.setItem('roadmapProjects', imported.timeline);
        if (imported.team) localStorage.setItem('teamMembers', imported.team);

        setSnackbarMessage('Data imported successfully! Refresh to see changes.');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('Failed to import data. Invalid file format.');
        setSnackbarOpen(true);
      }
    };
    reader.readAsText(file);
  };

  const handleResetSettings = () => {
    setConfirmAction('reset');
    setConfirmDialogOpen(true);
  };

  const handleClearAllData = () => {
    setConfirmAction('clear');
    setConfirmDialogOpen(true);
  };

  const confirmActionHandler = () => {
    if (confirmAction === 'reset') {
      localStorage.removeItem('appSettings');
      // Reset to defaults
      setProfileSettings({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        role: 'Administrator',
        department: 'Engineering',
        timezone: 'UTC-8 (Pacific Time)',
      });
      setNotificationSettings({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        soundEnabled: true,
        taskAssigned: true,
        taskCompleted: true,
        projectUpdates: true,
        teamMentions: true,
        weeklyDigest: true,
      });
      setSnackbarMessage('Settings reset to defaults!');
    } else if (confirmAction === 'clear') {
      localStorage.clear();
      setSnackbarMessage('All data cleared! Page will refresh.');
      setTimeout(() => window.location.reload(), 2000);
    }
    setSnackbarOpen(true);
    setConfirmDialogOpen(false);
    setConfirmAction(null);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Settings Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<Person />} iconPosition="start" label="Profile" />
            <Tab icon={<Notifications />} iconPosition="start" label="Notifications" />
            <Tab icon={<Palette />} iconPosition="start" label="Appearance" />
            <Tab icon={<Security />} iconPosition="start" label="Security" />
            <Tab icon={<Storage />} iconPosition="start" label="Data & Privacy" />
          </Tabs>
        </Box>

        <CardContent>
          {/* Profile Tab */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'primary.main',
                      fontSize: '2rem',
                      fontWeight: 600,
                    }}
                  >
                    {profileSettings.fullName.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Button variant="outlined" component="label">
                      Upload Photo
                      <input type="file" hidden accept="image/*" />
                    </Button>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      JPG, PNG or GIF. Max size 2MB
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={profileSettings.fullName}
                  onChange={(e) => setProfileSettings({ ...profileSettings, fullName: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={profileSettings.email}
                  onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={profileSettings.phone}
                  onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={profileSettings.role}
                    label="Role"
                    onChange={(e) => setProfileSettings({ ...profileSettings, role: e.target.value })}
                  >
                    <MenuItem value="Administrator">Administrator</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Designer">Designer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Department"
                  fullWidth
                  value={profileSettings.department}
                  onChange={(e) => setProfileSettings({ ...profileSettings, department: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={profileSettings.timezone}
                    label="Timezone"
                    onChange={(e) => setProfileSettings({ ...profileSettings, timezone: e.target.value })}
                  >
                    <MenuItem value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</MenuItem>
                    <MenuItem value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</MenuItem>
                    <MenuItem value="UTC+0 (GMT)">UTC+0 (GMT)</MenuItem>
                    <MenuItem value="UTC+1 (CET)">UTC+1 (CET)</MenuItem>
                    <MenuItem value="UTC+8 (China)">UTC+8 (China)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" gutterBottom>
              Notification Channels
            </Typography>
            <Stack spacing={2} sx={{ mb: 4 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })
                    }
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email fontSize="small" />
                    <span>Email Notifications</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })
                    }
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NotificationsActive fontSize="small" />
                    <span>Push Notifications</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })
                    }
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Sms fontSize="small" />
                    <span>SMS Notifications</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.soundEnabled}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, soundEnabled: e.target.checked })
                    }
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VolumeUp fontSize="small" />
                    <span>Sound Effects</span>
                  </Box>
                }
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Activity Notifications
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.taskAssigned}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, taskAssigned: e.target.checked })
                    }
                  />
                }
                label="Task Assigned to Me"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.taskCompleted}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, taskCompleted: e.target.checked })
                    }
                  />
                }
                label="Task Completed"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.projectUpdates}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, projectUpdates: e.target.checked })
                    }
                  />
                }
                label="Project Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.teamMentions}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, teamMentions: e.target.checked })
                    }
                  />
                }
                label="Team Mentions"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.weeklyDigest}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, weeklyDigest: e.target.checked })
                    }
                  />
                }
                label="Weekly Digest Email"
              />
            </Stack>
          </TabPanel>

          {/* Appearance Tab */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Theme Mode</InputLabel>
                  <Select
                    value={appearanceSettings.themeMode}
                    label="Theme Mode"
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, themeMode: e.target.value })}
                  >
                    <MenuItem value="light">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LightMode fontSize="small" />
                        <span>Light</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="dark">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DarkMode fontSize="small" />
                        <span>Dark</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="system">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SettingsBrightness fontSize="small" />
                        <span>System</span>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Color Scheme</InputLabel>
                  <Select
                    value={appearanceSettings.colorScheme}
                    label="Color Scheme"
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, colorScheme: e.target.value })}
                  >
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Font Size</InputLabel>
                  <Select
                    value={appearanceSettings.fontSize}
                    label="Font Size"
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, fontSize: e.target.value })}
                  >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={appearanceSettings.compactMode}
                      onChange={(e) =>
                        setAppearanceSettings({ ...appearanceSettings, compactMode: e.target.checked })
                      }
                    />
                  }
                  label="Compact Mode"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={appearanceSettings.animationsEnabled}
                      onChange={(e) =>
                        setAppearanceSettings({ ...appearanceSettings, animationsEnabled: e.target.checked })
                      }
                    />
                  }
                  label="Enable Animations"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Alert severity="info" icon={<Shield />}>
                  Keep your account secure with these security settings
                </Alert>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Two-Factor Authentication
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add an extra layer of security to your account
                      </Typography>
                    </Box>
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, twoFactorEnabled: e.target.checked })
                      }
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Session Timeout (minutes)</InputLabel>
                  <Select
                    value={securitySettings.sessionTimeout}
                    label="Session Timeout (minutes)"
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  >
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">1 hour</MenuItem>
                    <MenuItem value="120">2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Password Expiry (days)</InputLabel>
                  <Select
                    value={securitySettings.passwordExpiry}
                    label="Password Expiry (days)"
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                  >
                    <MenuItem value="30">30 days</MenuItem>
                    <MenuItem value="60">60 days</MenuItem>
                    <MenuItem value="90">90 days</MenuItem>
                    <MenuItem value="never">Never</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.loginNotifications}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, loginNotifications: e.target.checked })
                      }
                    />
                  }
                  label="Login Notifications"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button variant="outlined" startIcon={<Key />} fullWidth>
                  Change Password
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button variant="outlined" color="error" startIcon={<Lock />} fullWidth>
                  View Active Sessions
                </Button>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Data & Privacy Tab */}
          <TabPanel value={activeTab} index={4}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Data Management
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataSettings.autoSave}
                      onChange={(e) => setDataSettings({ ...dataSettings, autoSave: e.target.checked })}
                    />
                  }
                  label="Auto-save enabled"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Data Retention (days)</InputLabel>
                  <Select
                    value={dataSettings.dataRetention}
                    label="Data Retention (days)"
                    onChange={(e) => setDataSettings({ ...dataSettings, dataRetention: e.target.value })}
                  >
                    <MenuItem value="90">90 days</MenuItem>
                    <MenuItem value="180">180 days</MenuItem>
                    <MenuItem value="365">1 year</MenuItem>
                    <MenuItem value="forever">Forever</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Privacy
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataSettings.analyticsEnabled}
                      onChange={(e) => setDataSettings({ ...dataSettings, analyticsEnabled: e.target.checked })}
                    />
                  }
                  label="Send anonymous usage analytics"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataSettings.crashReports}
                      onChange={(e) => setDataSettings({ ...dataSettings, crashReports: e.target.checked })}
                    />
                  }
                  label="Send crash reports"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Import / Export
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownload />}
                  fullWidth
                  onClick={handleExportData}
                >
                  Export All Data
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button variant="outlined" component="label" startIcon={<CloudUpload />} fullWidth>
                  Import Data
                  <input type="file" hidden accept=".json" onChange={handleImportData} />
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom color="error">
                  Danger Zone
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<RestartAlt />}
                  fullWidth
                  onClick={handleResetSettings}
                >
                  Reset Settings
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  fullWidth
                  onClick={handleClearAllData}
                >
                  Clear All Data
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>

        {/* Save Button */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<Save />} onClick={saveSettings}>
            Save Changes
          </Button>
        </Box>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning color="warning" />
            {confirmAction === 'reset' ? 'Reset Settings?' : 'Clear All Data?'}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmAction === 'reset'
              ? 'This will reset all settings to their default values. This action cannot be undone.'
              : 'This will permanently delete all your data including tasks, projects, and team members. This action cannot be undone.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmActionHandler} color={confirmAction === 'clear' ? 'error' : 'warning'} variant="contained">
            {confirmAction === 'reset' ? 'Reset' : 'Delete All'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
