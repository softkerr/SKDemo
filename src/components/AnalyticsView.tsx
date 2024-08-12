'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  AvatarGroup,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  TrendingUp,
  TrendingDown,
  Timeline as TimelineIcon,
  Speed,
  CheckCircle,
  Assignment,
  Schedule,
  CalendarToday,
  Person,
  Flag,
  Insights,
  FilterList,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
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
  startDate: string;
  endDate: string;
}

export default function AnalyticsView() {
  const theme = useTheme();
  const [kanbanData, setKanbanData] = useState<KanbanData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');

  useEffect(() => {
    setIsMounted(true);
    const savedKanban = localStorage.getItem('kanbanData');
    if (savedKanban) {
      setKanbanData(JSON.parse(savedKanban));
    }

    const savedProjects = localStorage.getItem('roadmapProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  // Calculate analytics
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

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  
  // Team performance data
  const teamMembers = new Set<string>();
  const teamPerformance: Record<string, { completed: number; inProgress: number; total: number }> = {};
  
  if (kanbanData) {
    Object.values(kanbanData.tasks).forEach((task: any) => {
      if (task.assignee) {
        teamMembers.add(task.assignee);
        if (!teamPerformance[task.assignee]) {
          teamPerformance[task.assignee] = { completed: 0, inProgress: 0, total: 0 };
        }
        teamPerformance[task.assignee].total++;
        
        const column = Object.values(kanbanData.columns).find((col: any) =>
          col.taskIds.includes(task.id)
        );
        if (column && (column as any).id === 'column-3') {
          teamPerformance[task.assignee].completed++;
        } else if (column && (column as any).id === 'column-2') {
          teamPerformance[task.assignee].inProgress++;
        }
      }
    });
  }

  // Task velocity data (mock - showing trend over time)
  const velocityData = [
    { date: 'Week 1', completed: 3, created: 5, velocity: 0.6 },
    { date: 'Week 2', completed: 7, created: 6, velocity: 1.17 },
    { date: 'Week 3', completed: 5, created: 4, velocity: 1.25 },
    { date: 'Week 4', completed: 8, created: 7, velocity: 1.14 },
    { date: 'Week 5', completed: completedTasks || 6, created: totalTasks - completedTasks || 5, velocity: totalTasks > 0 ? completedTasks / (totalTasks - completedTasks || 1) : 1 },
  ];

  // Burndown chart data
  const burndownData = [
    { day: 'Day 1', remaining: totalTasks, ideal: totalTasks },
    { day: 'Day 2', remaining: totalTasks - 2, ideal: totalTasks * 0.85 },
    { day: 'Day 3', remaining: totalTasks - 4, ideal: totalTasks * 0.7 },
    { day: 'Day 4', remaining: totalTasks - 6, ideal: totalTasks * 0.55 },
    { day: 'Day 5', remaining: totalTasks - completedTasks, ideal: totalTasks * 0.4 },
  ];

  // Project timeline comparison
  const projectTimeline = projects.map((project) => {
    const start = new Date(project.startDate).getTime();
    const end = new Date(project.endDate).getTime();
    const now = new Date().getTime();
    const duration = end - start;
    const elapsed = now - start;
    const timeProgress = Math.min(100, Math.max(0, (elapsed / duration) * 100));
    
    return {
      name: project.name.substring(0, 15),
      progress: project.progress,
      timeProgress: Math.round(timeProgress),
      onTrack: project.progress >= timeProgress - 10,
    };
  });

  // Team workload radar
  const teamRadarData = Array.from(teamMembers).slice(0, 6).map((member) => {
    const perf = teamPerformance[member] || { completed: 0, inProgress: 0, total: 0 };
    return {
      member,
      completed: perf.completed,
      inProgress: perf.inProgress,
      workload: perf.total,
      completionRate: perf.total > 0 ? Math.round((perf.completed / perf.total) * 100) : 0,
    };
  });

  // Priority over time
  const priorityTrendData = [
    { week: 'W1', high: 2, medium: 5, low: 3 },
    { week: 'W2', high: 4, medium: 6, low: 2 },
    { week: 'W3', high: 3, medium: 4, low: 5 },
    { week: 'W4', high: 5, medium: 7, low: 3 },
    { week: 'W5', 
      high: kanbanData ? Object.values(kanbanData.tasks).filter((t: any) => t.priority === 'high').length : 3,
      medium: kanbanData ? Object.values(kanbanData.tasks).filter((t: any) => t.priority === 'medium').length : 6,
      low: kanbanData ? Object.values(kanbanData.tasks).filter((t: any) => t.priority === 'low').length : 4,
    },
  ];

  // Performance metrics
  const avgCompletionTime = 3.5; // days (mock)
  const taskThroughput = completedTasks > 0 ? (completedTasks / 7).toFixed(1) : '0'; // tasks per day
  const cycleTime = 2.8; // days (mock)
  const velocity = velocityData[velocityData.length - 1].velocity;

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
            Analytics & Insights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track performance, trends, and team productivity
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={(e, value) => value && setTimeRange(value)}
          size="small"
        >
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="quarter">Quarter</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* Performance Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: '#3b82f6', width: 56, height: 56 }}>
                  <Speed />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Velocity
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {velocity.toFixed(2)}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TrendingUp sx={{ fontSize: '1rem', color: '#10b981' }} />
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                      +8%
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: '#10b981', width: 56, height: 56 }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Throughput
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {taskThroughput}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    tasks/day
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: '#f59e0b', width: 56, height: 56 }}>
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Cycle Time
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {cycleTime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    days avg
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: '#8b5cf6', width: 56, height: 56 }}>
                  <TimelineIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Lead Time
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {avgCompletionTime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    days avg
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Velocity Trend */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Velocity Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={velocityData}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorCompleted)"
                    name="Completed"
                  />
                  <Area
                    type="monotone"
                    dataKey="created"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorCreated)"
                    name="Created"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Team Performance Radar */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Team Workload
              </Typography>
              {teamRadarData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={teamRadarData}>
                    <PolarGrid stroke={theme.palette.divider} />
                    <PolarAngleAxis dataKey="member" stroke={theme.palette.text.secondary} />
                    <PolarRadiusAxis stroke={theme.palette.text.secondary} />
                    <Radar
                      name="Workload"
                      dataKey="workload"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Completed"
                      dataKey="completed"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Person sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    No team data available
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Burndown Chart */}
        <Grid item xs={12} lg={6}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Sprint Burndown
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={burndownData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ideal"
                    stroke="#94a3b8"
                    strokeDasharray="5 5"
                    name="Ideal"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="remaining"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Priority Trend */}
        <Grid item xs={12} lg={6}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Priority Distribution Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="week" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="high" stackId="a" fill="#ef4444" name="High" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium" />
                  <Bar dataKey="low" stackId="a" fill="#06b6d4" name="Low" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Timeline Comparison */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Project Progress vs Timeline
              </Typography>
              {projectTimeline.length > 0 ? (
                <Stack spacing={3}>
                  {projectTimeline.map((project, index) => (
                    <Box key={index}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {project.name}
                        </Typography>
                        <Chip
                          label={project.onTrack ? 'On Track' : 'Behind'}
                          size="small"
                          sx={{
                            bgcolor: project.onTrack ? '#10b98120' : '#ef444420',
                            color: project.onTrack ? '#10b981' : '#ef4444',
                            fontWeight: 600,
                          }}
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">
                            Work Progress
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {project.progress}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: '#3b82f6',
                            },
                          }}
                        />
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" color="text.secondary">
                            Time Elapsed
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {project.timeProgress}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={project.timeProgress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: '#94a3b8',
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Assignment sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    No projects to analyze
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Top Performers */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0} sx={{ border: 1, borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Top Performers
              </Typography>
              <List sx={{ p: 0 }}>
                {teamRadarData
                  .sort((a, b) => b.completionRate - a.completionRate)
                  .slice(0, 5)
                  .map((member, index) => (
                    <React.Fragment key={member.member}>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center" width="100%">
                          <Avatar
                            sx={{
                              bgcolor: index === 0 ? '#f59e0b' : 'primary.main',
                              width: 40,
                              height: 40,
                              fontSize: '0.875rem',
                            }}
                          >
                            {member.member}
                          </Avatar>
                          <Box flex={1}>
                            <Stack direction="row" justifyContent="space-between" mb={0.5}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {member.member}
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {member.completionRate}%
                              </Typography>
                            </Stack>
                            <LinearProgress
                              variant="determinate"
                              value={member.completionRate}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 3,
                                  bgcolor: index === 0 ? '#f59e0b' : '#3b82f6',
                                },
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {member.completed} / {member.workload} tasks completed
                            </Typography>
                          </Box>
                        </Stack>
                      </ListItem>
                      {index < Math.min(teamRadarData.length, 5) - 1 && <Divider />}
                    </React.Fragment>
                  ))}
              </List>
              {teamRadarData.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Person sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    No team members to display
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
