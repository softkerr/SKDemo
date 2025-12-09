'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Tooltip,
  Stack,
  Divider,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTeamData, addMember as addMemberToRedux, updateMember as updateMemberInRedux, deleteMember as deleteMemberFromRedux } from '@/store/slices/teamSlice';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'Developer' | 'Designer' | 'QA' | 'Intern';
  department: string;
  avatar: string;
  joinDate: string;
  status: 'Active' | 'Away' | 'Busy' | 'Offline';
  tasksAssigned: number;
  tasksCompleted: number;
  performance: number; // 0-100
  skills: string[];
}

const roleColors = {
  Admin: '#f44336',
  Manager: '#9c27b0',
  Developer: '#2196f3',
  Designer: '#ff9800',
  QA: '#4caf50',
  Intern: '#607d8b',
};

const statusColors = {
  Active: '#4caf50',
  Away: '#ff9800',
  Busy: '#f44336',
  Offline: '#9e9e9e',
};

const initialMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 234 567 8901',
    role: 'Admin',
    department: 'Management',
    avatar: 'AJ',
    joinDate: '2023-01-15',
    status: 'Active',
    tasksAssigned: 25,
    tasksCompleted: 23,
    performance: 92,
    skills: ['Leadership', 'Strategy', 'Communication'],
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1 234 567 8902',
    role: 'Developer',
    department: 'Engineering',
    avatar: 'BS',
    joinDate: '2023-03-20',
    status: 'Active',
    tasksAssigned: 18,
    tasksCompleted: 16,
    performance: 89,
    skills: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@example.com',
    phone: '+1 234 567 8903',
    role: 'Designer',
    department: 'Design',
    avatar: 'CW',
    joinDate: '2023-05-10',
    status: 'Busy',
    tasksAssigned: 12,
    tasksCompleted: 11,
    performance: 92,
    skills: ['UI/UX', 'Figma', 'Prototyping'],
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+1 234 567 8904',
    role: 'Manager',
    department: 'Product',
    avatar: 'DB',
    joinDate: '2023-02-01',
    status: 'Active',
    tasksAssigned: 20,
    tasksCompleted: 18,
    performance: 90,
    skills: ['Product Management', 'Agile', 'Analytics'],
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+1 234 567 8905',
    role: 'QA',
    department: 'Quality',
    avatar: 'ED',
    joinDate: '2023-06-15',
    status: 'Away',
    tasksAssigned: 15,
    tasksCompleted: 14,
    performance: 93,
    skills: ['Testing', 'Automation', 'Bug Tracking'],
  },
  {
    id: '6',
    name: 'Frank Wilson',
    email: 'frank@example.com',
    phone: '+1 234 567 8906',
    role: 'Developer',
    department: 'Engineering',
    avatar: 'FW',
    joinDate: '2023-07-01',
    status: 'Active',
    tasksAssigned: 16,
    tasksCompleted: 13,
    performance: 81,
    skills: ['Python', 'Django', 'PostgreSQL'],
  },
];

export default function TeamManagement() {
  const dispatch = useAppDispatch();
  const reduxMembers = useAppSelector((state) => state.team.members);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: 'Developer',
    department: '',
    avatar: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    tasksAssigned: 0,
    tasksCompleted: 0,
    performance: 0,
    skills: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem('teamMembers');
    if (saved) {
      const parsedMembers = JSON.parse(saved);
      setMembers(parsedMembers);
      dispatch(setTeamData(parsedMembers));
    } else {
      setMembers(initialMembers);
      dispatch(setTeamData(initialMembers));
      localStorage.setItem('teamMembers', JSON.stringify(initialMembers));
    }
  }, [dispatch]);

  const saveToLocalStorage = (data: TeamMember[]) => {
    localStorage.setItem('teamMembers', JSON.stringify(data));
    dispatch(setTeamData(data));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, member: TeamMember) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddMember = () => {
    setIsEditing(false);
    setFormData({
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      role: 'Developer',
      department: '',
      avatar: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      tasksAssigned: 0,
      tasksCompleted: 0,
      performance: 0,
      skills: [],
    });
    setDialogOpen(true);
  };

  const handleEditMember = () => {
    if (selectedMember) {
      setIsEditing(true);
      setFormData(selectedMember);
      setDialogOpen(true);
      handleMenuClose();
    }
  };

  const handleDeleteMember = () => {
    if (selectedMember) {
      const updated = members.filter((m) => m.id !== selectedMember.id);
      setMembers(updated);
      saveToLocalStorage(updated);
      handleMenuClose();
    }
  };

  const handleSaveMember = () => {
    if (!formData.name || !formData.email || !formData.department) {
      return;
    }

    const avatar = formData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const memberData = { ...formData, avatar };

    if (isEditing) {
      const updated = members.map((m) => (m.id === memberData.id ? memberData : m));
      setMembers(updated);
      saveToLocalStorage(updated);
    } else {
      const updated = [...members, memberData];
      setMembers(updated);
      saveToLocalStorage(updated);
    }

    setDialogOpen(false);
  };

  const handleInputChange = (field: keyof TeamMember, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const skills = event.target.value.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData({ ...formData, skills });
  };

  const filteredMembers = members.filter((member) => {
    const roleMatch = filterRole === 'all' || member.role === filterRole;
    const deptMatch = filterDepartment === 'all' || member.department === filterDepartment;
    return roleMatch && deptMatch;
  });

  const departments = Array.from(new Set(members.map((m) => m.department)));
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'Active').length;
  const avgPerformance = members.reduce((acc, m) => acc + m.performance, 0) / members.length || 0;
  const totalTasks = members.reduce((acc, m) => acc + m.tasksCompleted, 0);

  return (
    <Box>
      {/* Header with Stats */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Team Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddMember}
            size="large"
          >
            Add Member
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Total Members
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {totalMembers}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <GroupIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Active Now
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {activeMembers}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                    <PersonIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Avg Performance
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {avgPerformance.toFixed(0)}%
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                    <TrendingUpIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Tasks Completed
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {totalTasks}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Role</InputLabel>
                <Select
                  value={filterRole}
                  label="Filter by Role"
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Designer">Designer</MenuItem>
                  <MenuItem value="QA">QA</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Department</InputLabel>
                <Select
                  value={filterDepartment}
                  label="Filter by Department"
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Team Members */}
      {filteredMembers.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <GroupIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No Team Members
          </Typography>
          <Typography color="text.secondary" paragraph>
            Add your first team member to get started.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddMember}>
            Add Member
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredMembers.map((member) => (
            <Grid size={{ xs: 12, sm: 6, md: viewMode === 'grid' ? 4 : 12 }} key={member.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: roleColors[member.role],
                          fontSize: '1.25rem',
                          fontWeight: 600,
                        }}
                      >
                        {member.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {member.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                          <Chip
                            label={member.role}
                            size="small"
                            sx={{
                              bgcolor: roleColors[member.role],
                              color: 'white',
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            label={member.status}
                            size="small"
                            sx={{
                              bgcolor: statusColors[member.status],
                              color: 'white',
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <IconButton onClick={(e) => handleMenuOpen(e, member)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {member.department}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {member.email}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {member.phone}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Joined {new Date(member.joinDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  {/* Performance */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Performance
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {member.performance}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={member.performance}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          bgcolor:
                            member.performance >= 90
                              ? 'success.main'
                              : member.performance >= 70
                              ? 'info.main'
                              : 'warning.main',
                        },
                      }}
                    />
                  </Box>

                  {/* Tasks */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {member.tasksAssigned}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Assigned
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                        <Typography variant="h6" fontWeight={600} color="success.main">
                          {member.tasksCompleted}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Completed
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Skills */}
                  {member.skills.length > 0 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Skills
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {member.skills.map((skill, index) => (
                          <Chip key={index} label={skill} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditMember}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit Member
        </MenuItem>
        <MenuItem onClick={handleDeleteMember} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Delete Member
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />

            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />

            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => handleInputChange('role', e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="QA">QA</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Department"
              fullWidth
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Away">Away</MenuItem>
                <MenuItem value="Busy">Busy</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Join Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.joinDate}
              onChange={(e) => handleInputChange('joinDate', e.target.value)}
            />

            <TextField
              label="Performance (%)"
              type="number"
              fullWidth
              inputProps={{ min: 0, max: 100 }}
              value={formData.performance}
              onChange={(e) => handleInputChange('performance', Number(e.target.value))}
            />

            <TextField
              label="Tasks Assigned"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={formData.tasksAssigned}
              onChange={(e) => handleInputChange('tasksAssigned', Number(e.target.value))}
            />

            <TextField
              label="Tasks Completed"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={formData.tasksCompleted}
              onChange={(e) => handleInputChange('tasksCompleted', Number(e.target.value))}
            />

            <TextField
              label="Skills (comma separated)"
              fullWidth
              multiline
              rows={2}
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
              placeholder="React, TypeScript, Node.js"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveMember} variant="contained">
            {isEditing ? 'Save Changes' : 'Add Member'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
