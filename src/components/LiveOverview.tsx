'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  AvatarGroup,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setKanbanData } from '@/store/slices/kanbanSlice';
import { setTimelineData } from '@/store/slices/timelineSlice';
import { setTeamData } from '@/store/slices/teamSlice';

export default function LiveOverview() {
  const dispatch = useAppDispatch();
  const kanbanData = useAppSelector((state) => state.kanban.data);
  const projects = useAppSelector((state) => state.timeline.projects);
  const teamMembers = useAppSelector((state) => state.team.members);

  // Load data from localStorage on mount
  useEffect(() => {
    const kanbanLocalData = localStorage.getItem('kanbanData');
    if (kanbanLocalData) {
      dispatch(setKanbanData(JSON.parse(kanbanLocalData)));
    }

    const roadmapData = localStorage.getItem('roadmapProjects');
    if (roadmapData) {
      dispatch(setTimelineData(JSON.parse(roadmapData)));
    }

    const teamData = localStorage.getItem('teamMembers');
    if (teamData) {
      dispatch(setTeamData(JSON.parse(teamData)));
    }
  }, [dispatch]);

  // Calculate metrics from Redux state
  const allTasks = kanbanData?.tasks ? Object.values(kanbanData.tasks) : [];
  const totalTasks = allTasks.length;
  
  // Get completed tasks (tasks in "Done" column)
  const doneColumn = kanbanData?.columns ? Object.values(kanbanData.columns).find(
    col => col.title.toLowerCase() === 'done'
  ) : null;
  const completedTasks = doneColumn?.taskIds?.length || 0;
  
  // Get in-progress tasks
  const inProgressColumn = kanbanData?.columns ? Object.values(kanbanData.columns).find(
    col => col.title.toLowerCase().includes('progress')
  ) : null;
  const inProgressTasks = inProgressColumn?.taskIds?.length || 0;
  
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const activeProjects = Array.isArray(projects) 
    ? projects.filter((p) => p.status === 'active').length 
    : 0;
  const totalProjects = Array.isArray(projects) ? projects.length : 0;
  const avgProjectProgress = Array.isArray(projects) && projects.length > 0
    ? projects.reduce((acc, p) => acc + p.progress, 0) / projects.length
    : 0;

  const activeMembers = Array.isArray(teamMembers) 
    ? teamMembers.filter((m) => m.status === 'Active').length 
    : 0;
  const totalMembers = Array.isArray(teamMembers) ? teamMembers.length : 0;
  const avgPerformance = Array.isArray(teamMembers) && teamMembers.length > 0
    ? teamMembers.reduce((acc, m) => acc + m.performance, 0) / teamMembers.length
    : 0;

  // Get high priority tasks
  const highPriorityTasks = allTasks.filter((task) => task.priority === 'high').length;

  // Get upcoming deadlines (next 7 days)
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingDeadlines = allTasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= now && dueDate <= nextWeek;
  }).length;

  // Get active team members for avatars
  const activeTeamMembers = Array.isArray(teamMembers)
    ? teamMembers.filter((m) => m.status === 'Active').slice(0, 5)
    : [];

  const metrics = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      subtitle: `${completedTasks} completed`,
      icon: <AssignmentIcon />,
      color: 'primary.main',
      progress: completionRate,
      trend: completedTasks > 0 ? '+12%' : '0%',
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      subtitle: `${totalProjects} total`,
      icon: <TimelineIcon />,
      color: 'info.main',
      progress: avgProjectProgress,
      trend: activeProjects > 0 ? '+8%' : '0%',
    },
    {
      title: 'Team Performance',
      value: `${Math.round(avgPerformance)}%`,
      subtitle: `${activeMembers}/${totalMembers} active`,
      icon: <TrendingUpIcon />,
      color: 'success.main',
      progress: avgPerformance,
      trend: avgPerformance >= 85 ? 'Excellent' : 'Good',
    },
    {
      title: 'High Priority',
      value: highPriorityTasks,
      subtitle: `${upcomingDeadlines} due soon`,
      icon: <SpeedIcon />,
      color: 'warning.main',
      progress: (inProgressTasks / (totalTasks || 1)) * 100,
      trend: highPriorityTasks > 0 ? 'Action needed' : 'On track',
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time project metrics and team performance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {activeTeamMembers.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
                {activeTeamMembers.map((member) => (
                  <Tooltip key={member.id} title={member.name}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {member.avatar}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
              <Typography variant="body2" color="text.secondary">
                {activeMembers} online
              </Typography>
            </Box>
          )}
          <Chip
            icon={<CheckCircleIcon />}
            label="Live Data"
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      {metric.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {metric.subtitle}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: metric.color,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {metric.icon}
                  </Avatar>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {Math.round(metric.progress)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={metric.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'action.hover',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: metric.color,
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>

                <Chip
                  label={metric.trend}
                  size="small"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24,
                  }}
                  color={
                    metric.trend.includes('+') || metric.trend === 'Excellent'
                      ? 'success'
                      : metric.trend === 'Action needed'
                      ? 'warning'
                      : 'default'
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
