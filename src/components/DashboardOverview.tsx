'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  AvatarGroup,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Schedule,
  Assignment,
  People,
  Flag,
  CalendarToday,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface KanbanData {
  tasks: Record<string, any>;
  columns: Record<string, any>;
}

interface Project {
  id: string;
  name: string;
  progress: number;
  status: string;
  milestones: any[];
}

export default function DashboardOverview() {
  const theme = useTheme();
  const [kanbanData, setKanbanData] = useState<KanbanData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load Kanban data
    const savedKanban = localStorage.getItem('kanbanData');
    if (savedKanban) {
      setKanbanData(JSON.parse(savedKanban));
    }

    // Load Timeline/Roadmap data
    const savedProjects = localStorage.getItem('roadmapProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  // Calculate statistics
  const totalTasks = kanbanData ? Object.keys(kanbanData.tasks).length : 0;
  const completedTasks = kanbanData
    ? Object.values(kanbanData.tasks).filter((task: any) => {
        const column = Object.values(kanbanData.columns).find((col: any) =>
          col.taskIds.includes(task.id)
        );
        return column && (column as any).id === 'column-3';
      }).length
    : 0;

  const inProgressTasks = kanbanData
    ? Object.values(kanbanData.tasks).filter((task: any) => {
        const column = Object.values(kanbanData.columns).find((col: any) =>
          col.taskIds.includes(task.id)
        );
        return column && (column as any).id === 'column-2';
      }).length
    : 0;

  const todoTasks = totalTasks - completedTasks - inProgressTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const plannedProjects = projects.filter((p) => p.status === 'planned').length;

  // Calculate average project progress
  const avgProjectProgress =
    projects.length > 0
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
      : 0;

  // Get unique team members
  const teamMembers = new Set<string>();
  if (kanbanData) {
    Object.values(kanbanData.tasks).forEach((task: any) => {
      if (task.assignee) teamMembers.add(task.assignee);
    });
  }
  projects.forEach((project) => {
    project.milestones.forEach((milestone) => {
      milestone.team.forEach((member: string) => teamMembers.add(member));
    });
  });

  // Task priority distribution
  const priorityData = [
    {
      name: 'High',
      value: kanbanData
        ? Object.values(kanbanData.tasks).filter((t: any) => t.priority === 'high').length
        : 0,
      color: '#ef4444',
    },
    {
      name: 'Medium',
      value: kanbanData
        ? Object.values(kanbanData.tasks).filter((t: any) => t.priority === 'medium').length
        : 0,
      color: '#f59e0b',
    },
    {
      name: 'Low',
      value: kanbanData
        ? Object.values(kanbanData.tasks).filter((t: any) => t.priority === 'low').length
        : 0,
      color: '#06b6d4',
    },
  ];

  // Weekly progress data (mock)
  const weeklyData = [
    { name: 'Mon', completed: 4, created: 2 },
    { name: 'Tue', completed: 3, created: 5 },
    { name: 'Wed', completed: 5, created: 3 },
    { name: 'Thu', completed: 7, created: 4 },
    { name: 'Fri', completed: 6, created: 3 },
    { name: 'Sat', completed: 2, created: 1 },
    { name: 'Sun', completed: 1, created: 2 },
  ];

  // Project status data
  const projectStatusData = [
    { name: 'Active', value: activeProjects, color: '#3b82f6' },
    { name: 'Completed', value: completedProjects, color: '#10b981' },
    { name: 'Planned', value: plannedProjects, color: '#8b5cf6' },
  ];

  // Recent activity (mock)
  const recentActivity = [
    { id: 1, type: 'task', action: 'completed', title: 'Design Review', time: '2 hours ago', user: 'JD' },
    { id: 2, type: 'project', action: 'updated', title: 'Website Redesign', time: '4 hours ago', user: 'SM' },
    { id: 3, type: 'milestone', action: 'created', title: 'Testing Phase', time: '6 hours ago', user: 'AR' },
    { id: 4, type: 'task', action: 'moved', title: 'Bug Fix #123', time: '1 day ago', user: 'TC' },
    { id: 5, type: 'project', action: 'created', title: 'Mobile App Launch', time: '2 days ago', user: 'NP' },
  ];

  // Upcoming deadlines
  const upcomingDeadlines = kanbanData
    ? Object.values(kanbanData.tasks)
        .filter((task: any) => task.dueDate)
        .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5)
    : [];

  return (
    <Box>
      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        {/* Total Tasks */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              height: '100%',
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Tasks
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {totalTasks}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#3b82f6', width: 48, height: 48 }}>
                  <Assignment />
                </Avatar>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  icon={<ArrowUpward sx={{ fontSize: '0.875rem' }} />}
                  label="+12%"
                  size="small"
                  sx={{ bgcolor: '#10b98120', color: '#10b981', fontWeight: 600 }}
                />
                <Typography variant="caption" color="text.secondary">
                  vs last week
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Completion Rate */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              height: '100%',
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Completion Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {completionRate}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#10b981', width: 48, height: 48 }}>
                  <CheckCircle />
                </Avatar>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={completionRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: '#10b981',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Active Projects */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              height: '100%',
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Active Projects
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {activeProjects}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#f59e0b', width: 48, height: 48 }}>
                  <Schedule />
                </Avatar>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {avgProjectProgress}% avg progress
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Team Members */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
              height: '100%',
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Team Members
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {teamMembers.size}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#8b5cf6', width: 48, height: 48 }}>
                  <People />
                </Avatar>
              </Stack>
              <AvatarGroup max={4}>
                {Array.from(teamMembers).map((member, idx) => (
                  <Avatar
                    key={idx}
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: '0.75rem',
                      bgcolor: 'primary.main',
                    }}
                  >
                    {member}
                  </Avatar>
                ))}
              </AvatarGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Weekly Activity Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Weekly Activity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="created" fill="#3b82f6" name="Created" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Task Priority Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Task Priority
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack spacing={1} mt={2}>
                {priorityData.map((item) => (
                  <Stack key={item.name} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography variant="body2">{item.name} Priority</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Status */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Project Status
              </Typography>
              <Stack spacing={3}>
                {projectStatusData.map((item) => (
                  <Box key={item.name}>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.value}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={projects.length > 0 ? (item.value / projects.length) * 100 : 0}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: item.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Activity
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.875rem' }}>
                          {activity.user}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {activity.title}
                          </Typography>
                        }
                        secondary={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={activity.action}
                              size="small"
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Upcoming Deadlines
              </Typography>
              {upcomingDeadlines.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {upcomingDeadlines.map((task: any, index) => (
                    <React.Fragment key={task.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor:
                                task.priority === 'high'
                                  ? '#ef4444'
                                  : task.priority === 'medium'
                                  ? '#f59e0b'
                                  : '#06b6d4',
                              width: 36,
                              height: 36,
                            }}
                          >
                            <Flag fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {task.title}
                            </Typography>
                          }
                          secondary={
                            <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                              <CalendarToday sx={{ fontSize: '0.875rem' }} />
                              <Typography variant="caption" color="text.secondary">
                                {new Date(task.dueDate).toLocaleDateString()}
                              </Typography>
                            </Stack>
                          }
                        />
                      </ListItem>
                      {index < upcomingDeadlines.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CalendarToday sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No upcoming deadlines
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
