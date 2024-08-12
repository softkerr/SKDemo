'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  LinearProgress, 
  Avatar, 
  Grid, 
  IconButton, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  Tooltip,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { 
  Rocket, 
  Code, 
  Palette, 
  BugReport, 
  CloudUpload, 
  CheckCircle, 
  Schedule, 
  TrendingUp, 
  Add,
  Edit,
  Delete,
  MoreVert,
  Close,
  Folder,
  Flag,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTimelineData, addProject as addProjectToRedux, updateProject as updateProjectInRedux, deleteProject as deleteProjectFromRedux } from '@/store/slices/timelineSlice';

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  team: string[];
  icon: string;
  color: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'active' | 'completed' | 'planned';
  milestones: Milestone[];
}

const iconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  code: Code,
  design: Palette,
  bug: BugReport,
  cloud: CloudUpload,
  check: CheckCircle,
  schedule: Schedule,
  trending: TrendingUp,
};

const initialProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    progress: 65,
    status: 'active',
    milestones: [
      {
        id: 'milestone-1',
        title: 'Project Kickoff',
        description: 'Initial meeting and requirements gathering',
        date: '2025-11-01',
        status: 'completed',
        progress: 100,
        team: ['JD', 'SM'],
        icon: 'rocket',
        color: '#3b82f6',
      },
      {
        id: 'milestone-2',
        title: 'Design Phase',
        description: 'Create wireframes, mockups, and design system',
        date: '2025-11-15',
        status: 'completed',
        progress: 100,
        team: ['AR', 'TC'],
        icon: 'design',
        color: '#8b5cf6',
      },
      {
        id: 'milestone-3',
        title: 'Development Sprint',
        description: 'Build core features and components',
        date: '2025-11-25',
        status: 'in-progress',
        progress: 60,
        team: ['TC', 'MK'],
        icon: 'code',
        color: '#f59e0b',
      },
      {
        id: 'milestone-4',
        title: 'Testing & QA',
        description: 'Comprehensive testing and bug fixes',
        date: '2025-12-15',
        status: 'upcoming',
        progress: 0,
        team: ['SM', 'AR'],
        icon: 'bug',
        color: '#ef4444',
      },
      {
        id: 'milestone-5',
        title: 'Production Deploy',
        description: 'Deploy to production servers',
        date: '2025-12-31',
        status: 'upcoming',
        progress: 0,
        team: ['MK', 'TC'],
        icon: 'cloud',
        color: '#10b981',
      },
    ],
  },
  {
    id: 'project-2',
    name: 'Mobile App Launch',
    description: 'Launch iOS and Android mobile applications',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    progress: 0,
    status: 'planned',
    milestones: [
      {
        id: 'milestone-6',
        title: 'Requirements Analysis',
        description: 'Gather requirements and create specifications',
        date: '2026-01-15',
        status: 'upcoming',
        progress: 0,
        team: ['JD', 'NP'],
        icon: 'schedule',
        color: '#06b6d4',
      },
      {
        id: 'milestone-7',
        title: 'MVP Development',
        description: 'Build minimum viable product',
        date: '2026-02-15',
        status: 'upcoming',
        progress: 0,
        team: ['TC', 'MK'],
        icon: 'code',
        color: '#f59e0b',
      },
      {
        id: 'milestone-8',
        title: 'App Store Launch',
        description: 'Submit to App Store and Play Store',
        date: '2026-03-31',
        status: 'upcoming',
        progress: 0,
        team: ['NP', 'SM'],
        icon: 'rocket',
        color: '#10b981',
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  completed: '#10b981',
  'in-progress': '#f59e0b',
  upcoming: '#6b7280',
  active: '#3b82f6',
  planned: '#8b5cf6',
};

export default function TimelineRoadmap() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const reduxProjects = useAppSelector((state) => state.timeline.projects);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isMounted, setIsMounted] = useState(false);
  
  // Dialog states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Menu states
  const [projectMenuAnchor, setProjectMenuAnchor] = useState<null | HTMLElement>(null);
  const [milestoneMenuAnchor, setMilestoneMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<{ milestone: Milestone; projectId: string } | null>(null);
  
  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    status: 'planned' as 'active' | 'completed' | 'planned',
  });

  const [milestoneForm, setMilestoneForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    status: 'upcoming' as 'completed' | 'in-progress' | 'upcoming',
    progress: 0,
    team: '',
    icon: 'rocket',
    color: '#3b82f6',
  });

  useEffect(() => {
    setIsMounted(true);
    const savedProjects = localStorage.getItem('roadmapProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      dispatch(setTimelineData(parsedProjects as any));
    } else {
      dispatch(setTimelineData(initialProjects as any));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('roadmapProjects', JSON.stringify(projects));
      dispatch(setTimelineData(projects as any));
    }
  }, [projects, isMounted, dispatch]);

  // Project CRUD Operations
  const handleAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      name: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      status: 'planned',
    });
    setProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
    });
    setProjectDialogOpen(true);
    setProjectMenuAnchor(null);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setProjectMenuAnchor(null);
  };

  const handleSaveProject = () => {
    if (!projectForm.name.trim()) return;

    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p =>
        p.id === editingProject.id
          ? { ...p, ...projectForm }
          : p
      ));
    } else {
      // Create new project
      const newProject: Project = {
        id: `project-${Date.now()}`,
        ...projectForm,
        progress: 0,
        milestones: [],
      };
      setProjects([...projects, newProject]);
    }

    setProjectDialogOpen(false);
    setEditingProject(null);
  };

  // Milestone CRUD Operations
  const handleAddMilestone = (projectId: string) => {
    setSelectedProjectId(projectId);
    setEditingMilestone(null);
    setMilestoneForm({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      status: 'upcoming',
      progress: 0,
      team: '',
      icon: 'rocket',
      color: '#3b82f6',
    });
    setMilestoneDialogOpen(true);
  };

  const handleEditMilestone = (milestone: Milestone, projectId: string) => {
    setSelectedProjectId(projectId);
    setEditingMilestone(milestone);
    setMilestoneForm({
      title: milestone.title,
      description: milestone.description,
      date: milestone.date,
      status: milestone.status,
      progress: milestone.progress,
      team: milestone.team.join(', '),
      icon: milestone.icon,
      color: milestone.color,
    });
    setMilestoneDialogOpen(true);
    setMilestoneMenuAnchor(null);
  };

  const handleDeleteMilestone = (milestoneId: string, projectId: string) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, milestones: p.milestones.filter(m => m.id !== milestoneId) }
        : p
    ));
    setMilestoneMenuAnchor(null);
  };

  const handleSaveMilestone = () => {
    if (!milestoneForm.title.trim() || !selectedProjectId) return;

    const teamArray = milestoneForm.team
      .split(',')
      .map(t => t.trim().toUpperCase().slice(0, 2))
      .filter(t => t.length > 0);

    if (editingMilestone) {
      // Update existing milestone
      setProjects(projects.map(p =>
        p.id === selectedProjectId
          ? {
              ...p,
              milestones: p.milestones.map(m =>
                m.id === editingMilestone.id
                  ? { ...m, ...milestoneForm, team: teamArray }
                  : m
              ),
            }
          : p
      ));
    } else {
      // Create new milestone
      const newMilestone: Milestone = {
        id: `milestone-${Date.now()}`,
        ...milestoneForm,
        team: teamArray,
      };

      setProjects(projects.map(p =>
        p.id === selectedProjectId
          ? { ...p, milestones: [...p.milestones, newMilestone] }
          : p
      ));
    }

    // Update project progress
    updateProjectProgress(selectedProjectId);

    setMilestoneDialogOpen(false);
    setEditingMilestone(null);
    setSelectedProjectId(null);
  };

  const updateProjectProgress = (projectId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === projectId && p.milestones.length > 0) {
          const totalProgress = p.milestones.reduce((sum, m) => sum + m.progress, 0);
          const avgProgress = Math.round(totalProgress / p.milestones.length);
          return { ...p, progress: avgProgress };
        }
        return p;
      })
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Box>
      {/* Header with Add Project Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            Projects & Roadmap
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your projects and track milestones
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProject}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
          }}
        >
          New Project
        </Button>
      </Stack>

      {/* Projects Overview */}
      <Grid container spacing={3} mb={4}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} key={project.id}>
            <Card
              elevation={0}
              sx={{
                border: 1,
                borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                height: '100%',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                    : '0 4px 12px rgba(37, 99, 235, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box flex={1}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Chip
                      label={project.status.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: `${statusColors[project.status]}20`,
                        color: statusColors[project.status],
                        fontWeight: 600,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        setSelectedProject(project);
                        setProjectMenuAnchor(e.currentTarget);
                      }}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={2} mb={2}>
                  <Typography variant="caption" color="text.secondary">
                    Start: {new Date(project.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    End: {new Date(project.endDate).toLocaleDateString()}
                  </Typography>
                </Stack>

                <Box mb={2}>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Progress
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
                        bgcolor: statusColors[project.status],
                      },
                    }}
                  />
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    Milestones:
                  </Typography>
                  <Chip
                    label={`${project.milestones.filter((m) => m.status === 'completed').length}/${project.milestones.length}`}
                    size="small"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={() => handleAddMilestone(project.id)}
                    sx={{ 
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      ml: 'auto',
                    }}
                  >
                    Add Milestone
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {projects.length === 0 && (
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                border: '2px dashed',
                borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                bgcolor: 'transparent',
                p: 6,
                textAlign: 'center',
              }}
            >
              <Folder sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Projects Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Create your first project to start tracking milestones
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddProject}
              >
                Create Project
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Timeline View */}
      {projects.length > 0 && (
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Project Timeline
            </Typography>

          {projects.map((project) => (
            <Box key={project.id} mb={6}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  pb: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                {project.name}
              </Typography>

              <Timeline position="right">
                {project.milestones.map((milestone, index) => {
                  const Icon = iconMap[milestone.icon] || CheckCircle;
                  const isLast = index === project.milestones.length - 1;

                  return (
                    <TimelineItem key={milestone.id}>
                      <TimelineOppositeContent
                        sx={{ 
                          m: 'auto 0', 
                          maxWidth: 120, 
                          textAlign: 'right',
                          fontSize: '0.875rem',
                          color: 'text.secondary',
                        }}
                      >
                        {new Date(milestone.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TimelineOppositeContent>

                      <TimelineSeparator>
                        <TimelineDot
                          sx={{
                            bgcolor: milestone.color,
                            boxShadow: `0 0 0 4px ${milestone.color}30`,
                            p: 1,
                          }}
                        >
                          <Icon sx={{ fontSize: 20, color: 'white' }} />
                        </TimelineDot>
                        {!isLast && (
                          <TimelineConnector
                            sx={{
                              bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            }}
                          />
                        )}
                      </TimelineSeparator>

                      <TimelineContent sx={{ py: 2, px: 2 }}>
                        <Card
                          elevation={0}
                          sx={{
                            border: 1,
                            borderColor:
                              milestone.status === 'in-progress'
                                ? milestone.color
                                : theme.palette.mode === 'dark'
                                ? 'grey.800'
                                : 'grey.200',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: milestone.color,
                              boxShadow: `0 4px 12px ${milestone.color}40`,
                            },
                          }}
                        >
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              mb={1}
                            >
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                                {milestone.title}
                              </Typography>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <Chip
                                  label={milestone.status.replace('-', ' ').toUpperCase()}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: '0.7rem',
                                    bgcolor: `${statusColors[milestone.status]}20`,
                                    color: statusColors[milestone.status],
                                    fontWeight: 600,
                                  }}
                                />
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    setSelectedMilestone({ milestone, projectId: project.id });
                                    setMilestoneMenuAnchor(e.currentTarget);
                                  }}
                                >
                                  <MoreVert fontSize="small" />
                                </IconButton>
                              </Stack>
                            </Stack>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2, fontSize: '0.875rem' }}
                            >
                              {milestone.description}
                            </Typography>

                            {milestone.status !== 'upcoming' && (
                              <Box mb={2}>
                                <Stack direction="row" justifyContent="space-between" mb={0.5}>
                                  <Typography variant="caption" color="text.secondary">
                                    Progress
                                  </Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                    {milestone.progress}%
                                  </Typography>
                                </Stack>
                                <LinearProgress
                                  variant="determinate"
                                  value={milestone.progress}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
                                    '& .MuiLinearProgress-bar': {
                                      borderRadius: 3,
                                      bgcolor: milestone.color,
                                    },
                                  }}
                                />
                              </Box>
                            )}

                            <Stack direction="row" spacing={-1}>
                              {milestone.team.map((member, idx) => (
                                <Avatar
                                  key={idx}
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    fontSize: '0.75rem',
                                    bgcolor: milestone.color,
                                    border: 2,
                                    borderColor: 'background.paper',
                                  }}
                                >
                                  {member}
                                </Avatar>
                              ))}
                            </Stack>
                          </CardContent>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            </Box>
          ))}
        </CardContent>
      </Card>
      )}

      {/* Project Menu */}
      <Menu
        anchorEl={projectMenuAnchor}
        open={Boolean(projectMenuAnchor)}
        onClose={() => setProjectMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => selectedProject && handleEditProject(selectedProject)}
        >
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit Project
        </MenuItem>
        <MenuItem
          onClick={() => selectedProject && handleDeleteProject(selectedProject.id)}
          sx={{ color: 'error.main' }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete Project
        </MenuItem>
      </Menu>

      {/* Milestone Menu */}
      <Menu
        anchorEl={milestoneMenuAnchor}
        open={Boolean(milestoneMenuAnchor)}
        onClose={() => setMilestoneMenuAnchor(null)}
      >
        <MenuItem
          onClick={() =>
            selectedMilestone &&
            handleEditMilestone(selectedMilestone.milestone, selectedMilestone.projectId)
          }
        >
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit Milestone
        </MenuItem>
        <MenuItem
          onClick={() =>
            selectedMilestone &&
            handleDeleteMilestone(selectedMilestone.milestone.id, selectedMilestone.projectId)
          }
          sx={{ color: 'error.main' }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete Milestone
        </MenuItem>
      </Menu>

      {/* Project Dialog */}
      <Dialog
        open={projectDialogOpen}
        onClose={() => setProjectDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </Typography>
            <IconButton onClick={() => setProjectDialogOpen(false)} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <TextField
              label="Project Name"
              fullWidth
              required
              value={projectForm.name}
              onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
              placeholder="Enter project name"
              autoFocus
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              placeholder="Enter project description"
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={projectForm.status}
                label="Status"
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    status: e.target.value as 'active' | 'completed' | 'planned',
                  })
                }
              >
                <MenuItem value="planned">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Schedule sx={{ color: statusColors.planned }} />
                    <span>Planned</span>
                  </Stack>
                </MenuItem>
                <MenuItem value="active">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TrendingUp sx={{ color: statusColors.active }} />
                    <span>Active</span>
                  </Stack>
                </MenuItem>
                <MenuItem value="completed">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircle sx={{ color: '#10b981' }} />
                    <span>Completed</span>
                  </Stack>
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={projectForm.startDate}
              onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={projectForm.endDate}
              onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setProjectDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveProject}
            variant="contained"
            disabled={!projectForm.name.trim()}
            startIcon={editingProject ? <Edit /> : <Add />}
          >
            {editingProject ? 'Update Project' : 'Create Project'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Milestone Dialog */}
      <Dialog
        open={milestoneDialogOpen}
        onClose={() => setMilestoneDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {editingMilestone ? 'Edit Milestone' : 'Create New Milestone'}
            </Typography>
            <IconButton onClick={() => setMilestoneDialogOpen(false)} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <TextField
              label="Milestone Title"
              fullWidth
              required
              value={milestoneForm.title}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
              placeholder="Enter milestone title"
              autoFocus
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={milestoneForm.description}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
              placeholder="Enter milestone description"
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={milestoneForm.status}
                label="Status"
                onChange={(e) =>
                  setMilestoneForm({
                    ...milestoneForm,
                    status: e.target.value as 'completed' | 'in-progress' | 'upcoming',
                  })
                }
              >
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Progress (%)"
              type="number"
              fullWidth
              value={milestoneForm.progress}
              onChange={(e) =>
                setMilestoneForm({
                  ...milestoneForm,
                  progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)),
                })
              }
              inputProps={{ min: 0, max: 100 }}
            />

            <FormControl fullWidth>
              <InputLabel>Icon</InputLabel>
              <Select
                value={milestoneForm.icon}
                label="Icon"
                onChange={(e) => setMilestoneForm({ ...milestoneForm, icon: e.target.value })}
              >
                <MenuItem value="rocket">🚀 Rocket</MenuItem>
                <MenuItem value="code">💻 Code</MenuItem>
                <MenuItem value="design">🎨 Design</MenuItem>
                <MenuItem value="bug">🐛 Bug</MenuItem>
                <MenuItem value="cloud">☁️ Cloud</MenuItem>
                <MenuItem value="check">✅ Check</MenuItem>
                <MenuItem value="schedule">📅 Schedule</MenuItem>
                <MenuItem value="trending">📈 Trending</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Color"
              type="color"
              fullWidth
              value={milestoneForm.color}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, color: e.target.value })}
            />

            <TextField
              label="Team Members"
              fullWidth
              value={milestoneForm.team}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, team: e.target.value })}
              placeholder="Enter initials separated by commas (e.g., JD, SM, AR)"
              helperText="Enter 2-letter initials, separated by commas"
            />

            <TextField
              label="Due Date"
              type="date"
              fullWidth
              value={milestoneForm.date}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setMilestoneDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveMilestone}
            variant="contained"
            disabled={!milestoneForm.title.trim()}
            startIcon={editingMilestone ? <Edit /> : <Add />}
          >
            {editingMilestone ? 'Update Milestone' : 'Create Milestone'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
