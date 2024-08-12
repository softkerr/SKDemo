'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Chip, 
  Stack, 
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  Tooltip,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  Add, 
  MoreVert, 
  Delete, 
  Edit, 
  CheckCircle,
  PersonOutline,
  CalendarToday,
  FlagOutlined,
  Close,
} from '@mui/icons-material';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setKanbanData, addTask as addTaskToRedux, updateTask as updateTaskInRedux, deleteTask as deleteTaskFromRedux } from '@/store/slices/kanbanSlice';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
  color: string;
}

interface KanbanData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

const initialData: KanbanData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Design Homepage',
      description: 'Create wireframes and mockups for the new homepage',
      priority: 'high',
      assignee: 'JD',
      dueDate: '2025-12-01',
    },
    'task-2': {
      id: 'task-2',
      title: 'API Integration',
      description: 'Integrate payment gateway API',
      priority: 'high',
      assignee: 'SM',
      dueDate: '2025-11-28',
    },
    'task-3': {
      id: 'task-3',
      title: 'User Testing',
      description: 'Conduct user testing sessions',
      priority: 'medium',
      assignee: 'AR',
      dueDate: '2025-12-05',
    },
    'task-4': {
      id: 'task-4',
      title: 'Code Review',
      description: 'Review pull requests from team',
      priority: 'medium',
      assignee: 'TC',
      dueDate: '2025-11-25',
    },
    'task-5': {
      id: 'task-5',
      title: 'Deploy to Production',
      description: 'Deploy latest version to production',
      priority: 'low',
      assignee: 'MK',
      dueDate: '2025-12-10',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
      color: '#3b82f6',
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3', 'task-4'],
      color: '#f59e0b',
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5'],
      color: '#10b981',
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const priorityColors = {
  low: '#06b6d4',
  medium: '#f59e0b',
  high: '#ef4444',
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

function TaskCard({ task, onEdit, onDelete, onUpdate }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<null | HTMLElement>(null);
  const [assigneeDialogOpen, setAssigneeDialogOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.title);
  const [tempDescription, setTempDescription] = useState(task.description);
  const [tempAssignee, setTempAssignee] = useState(task.assignee);
  const [tempDate, setTempDate] = useState(task.dueDate);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit(task);
    handleMenuClose();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(task.id);
    handleMenuClose();
  };

  const handlePriorityClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setPriorityAnchorEl(event.currentTarget);
  };

  const handlePriorityChange = (priority: 'low' | 'medium' | 'high') => {
    onUpdate(task.id, { priority });
    setPriorityAnchorEl(null);
  };

  const handleAssigneeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAssigneeDialogOpen(true);
  };

  const handleAssigneeSave = () => {
    if (tempAssignee.trim()) {
      onUpdate(task.id, { assignee: tempAssignee.toUpperCase().slice(0, 2) });
    }
    setAssigneeDialogOpen(false);
  };

  const handleDateClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDatePickerOpen(true);
  };

  const handleDateSave = () => {
    if (tempDate) {
      onUpdate(task.id, { dueDate: tempDate });
    }
    setDatePickerOpen(false);
  };

  const handleTitleDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingTitle(true);
    setTempTitle(task.title);
  };

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      onUpdate(task.id, { title: tempTitle });
    }
    setEditingTitle(false);
  };

  const handleDescriptionDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingDescription(true);
    setTempDescription(task.description);
  };

  const handleDescriptionSave = () => {
    if (tempDescription.trim()) {
      onUpdate(task.id, { description: tempDescription });
    }
    setEditingDescription(false);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        elevation={0}
        sx={{
          mb: 2,
          cursor: 'grab',
          border: 1,
          borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(59, 130, 246, 0.3)'
              : '0 4px 12px rgba(37, 99, 235, 0.15)',
          },
          '&:active': {
            cursor: 'grabbing',
          },
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
            {editingTitle ? (
              <TextField
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') setEditingTitle(false);
                }}
                size="small"
                fullWidth
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                sx={{ mr: 1 }}
              />
            ) : (
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  flex: 1,
                  cursor: 'text',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    px: 1,
                    mx: -1,
                  },
                }}
                onDoubleClick={handleTitleDoubleClick}
                title="Double-click to edit"
              >
                {task.title}
              </Typography>
            )}
            <IconButton 
              size="small" 
              sx={{ ml: 1 }}
              onClick={handleMenuOpen}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Stack>
          
          {editingDescription ? (
            <TextField
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              onBlur={handleDescriptionSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) handleDescriptionSave();
                if (e.key === 'Escape') setEditingDescription(false);
              }}
              size="small"
              fullWidth
              multiline
              rows={2}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2, 
                fontSize: '0.875rem',
                cursor: 'text',
                '&:hover': {
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  px: 1,
                  mx: -1,
                },
              }}
              onDoubleClick={handleDescriptionDoubleClick}
              title="Double-click to edit"
            >
              {task.description}
            </Typography>
          )}
          
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
            <Chip
              icon={<FlagOutlined sx={{ fontSize: '0.875rem' }} />}
              label={task.priority.toUpperCase()}
              size="small"
              onClick={handlePriorityClick}
              onPointerDown={(e) => e.stopPropagation()}
              sx={{
                bgcolor: `${priorityColors[task.priority]}20`,
                color: priorityColors[task.priority],
                fontWeight: 600,
                fontSize: '0.7rem',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: `${priorityColors[task.priority]}40`,
                },
              }}
              title="Click to change priority"
            />
            <Chip
              icon={<CalendarToday sx={{ fontSize: '0.875rem' }} />}
              label={task.dueDate}
              size="small"
              variant="outlined"
              onClick={handleDateClick}
              onPointerDown={(e) => e.stopPropagation()}
              sx={{ 
                fontSize: '0.7rem',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              title="Click to change date"
            />
            <Tooltip title={`Assigned to ${task.assignee} - Click to change`}>
              <Avatar
                onClick={handleAssigneeClick}
                onPointerDown={(e) => e.stopPropagation()}
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: '0.7rem',
                  bgcolor: 'primary.main',
                  ml: 'auto',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.2s',
                }}
              >
                {task.assignee}
              </Avatar>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit Task
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete Task
        </MenuItem>
      </Menu>

      {/* Priority Menu */}
      <Menu
        anchorEl={priorityAnchorEl}
        open={Boolean(priorityAnchorEl)}
        onClose={() => setPriorityAnchorEl(null)}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={() => handlePriorityChange('high')}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FlagOutlined sx={{ color: priorityColors.high }} />
            <span>High Priority</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handlePriorityChange('medium')}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FlagOutlined sx={{ color: priorityColors.medium }} />
            <span>Medium Priority</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handlePriorityChange('low')}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FlagOutlined sx={{ color: priorityColors.low }} />
            <span>Low Priority</span>
          </Stack>
        </MenuItem>
      </Menu>

      {/* Assignee Dialog */}
      <Dialog 
        open={assigneeDialogOpen} 
        onClose={() => setAssigneeDialogOpen(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Change Assignee</DialogTitle>
        <DialogContent>
          <TextField
            label="Assignee Initials"
            value={tempAssignee}
            onChange={(e) => setTempAssignee(e.target.value.toUpperCase().slice(0, 2))}
            fullWidth
            autoFocus
            inputProps={{ maxLength: 2 }}
            helperText="Enter 2-letter initials (e.g., JD)"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssigneeDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAssigneeSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Date Picker Dialog */}
      <Dialog 
        open={datePickerOpen} 
        onClose={() => setDatePickerOpen(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Change Due Date</DialogTitle>
        <DialogContent>
          <TextField
            label="Due Date"
            type="date"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDatePickerOpen(false)}>Cancel</Button>
          <Button onClick={handleDateSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Column({ column, tasks, onAddTask, onEditTask, onDeleteTask, onUpdateTask }: { 
  column: Column; 
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}) {
  const theme = useTheme();
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: 320,
        maxWidth: 320,
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        borderRadius: 2,
        p: 2,
        height: 'fit-content',
        minHeight: 400,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: column.color,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {column.title}
          </Typography>
          <Chip
            label={tasks.length}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.75rem',
              bgcolor: `${column.color}20`,
              color: column.color,
            }}
          />
        </Stack>
        <Tooltip title="Add Task">
          <IconButton 
            size="small"
            onClick={() => onAddTask(column.id)}
            sx={{
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
        <Box sx={{ minHeight: 200 }}>
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEditTask} 
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
            />
          ))}
          {tasks.length === 0 && (
            <Box
              sx={{
                p: 3,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                border: '2px dashed',
                borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: column.color,
                  bgcolor: theme.palette.mode === 'dark' 
                    ? `${column.color}10` 
                    : `${column.color}05`,
                },
              }}
            >
              <Typography variant="body2" gutterBottom>Drop tasks here</Typography>
              <Typography variant="caption">or click + to add a task</Typography>
            </Box>
          )}
        </Box>
      </SortableContext>
    </Box>
  );
}

export default function KanbanBoard() {
  const dispatch = useAppDispatch();
  const reduxData = useAppSelector((state) => state.kanban.data);
  const [data, setData] = useState<KanbanData>(initialData);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: '',
    dueDate: '',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem('kanbanData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
      dispatch(setKanbanData(parsedData));
    } else {
      dispatch(setKanbanData(initialData));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('kanbanData', JSON.stringify(data));
      dispatch(setKanbanData(data));
    }
  }, [data, isMounted, dispatch]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn = findColumnByTaskId(overId) || findColumnById(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id !== overColumn.id) {
      setData((prevData) => {
        const activeTaskIds = Array.from(activeColumn.taskIds);
        const overTaskIds = Array.from(overColumn.taskIds);

        const activeIndex = activeTaskIds.indexOf(activeId);
        const overIndex = overTaskIds.indexOf(overId);

        activeTaskIds.splice(activeIndex, 1);

        if (overId in prevData.columns) {
          overTaskIds.push(activeId);
        } else {
          overTaskIds.splice(overIndex, 0, activeId);
        }

        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [activeColumn.id]: {
              ...activeColumn,
              taskIds: activeTaskIds,
            },
            [overColumn.id]: {
              ...overColumn,
              taskIds: overTaskIds,
            },
          },
        };
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn = findColumnByTaskId(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id === overColumn.id) {
      const columnTaskIds = Array.from(activeColumn.taskIds);
      const activeIndex = columnTaskIds.indexOf(activeId);
      const overIndex = columnTaskIds.indexOf(overId);

      const newTaskIds = arrayMove(columnTaskIds, activeIndex, overIndex);

      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [activeColumn.id]: {
            ...activeColumn,
            taskIds: newTaskIds,
          },
        },
      }));
    }
  };

  const findColumnByTaskId = (taskId: string): Column | undefined => {
    return Object.values(data.columns).find((column) =>
      column.taskIds.includes(taskId)
    );
  };

  const findColumnById = (columnId: string): Column | undefined => {
    return data.columns[columnId];
  };

  // CRUD Operations
  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setEditingTask(null);
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: new Date().toISOString().split('T')[0],
    });
    setTaskDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
    });
    setTaskDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setData((prevData) => {
      const column = findColumnByTaskId(taskId);
      if (!column) return prevData;

      const newTasks = { ...prevData.tasks };
      delete newTasks[taskId];

      const newTaskIds = column.taskIds.filter((id) => id !== taskId);

      return {
        ...prevData,
        tasks: newTasks,
        columns: {
          ...prevData.columns,
          [column.id]: {
            ...column,
            taskIds: newTaskIds,
          },
        },
      };
    });
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setData((prevData) => {
      const existingTask = prevData.tasks[taskId];
      if (!existingTask) return prevData;

      return {
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [taskId]: {
            ...existingTask,
            ...updates,
          },
        },
      };
    });
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) return;

    if (editingTask) {
      // Update existing task
      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [editingTask.id]: {
            ...editingTask,
            ...taskForm,
          },
        },
      }));
    } else if (selectedColumnId) {
      // Create new task
      const newTaskId = `task-${Date.now()}`;
      const newTask: Task = {
        id: newTaskId,
        ...taskForm,
      };

      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [newTaskId]: newTask,
        },
        columns: {
          ...prevData.columns,
          [selectedColumnId]: {
            ...prevData.columns[selectedColumnId],
            taskIds: [...prevData.columns[selectedColumnId].taskIds, newTaskId],
          },
        },
      }));
    }

    setTaskDialogOpen(false);
    setEditingTask(null);
    setSelectedColumnId(null);
  };

  const handleCloseDialog = () => {
    setTaskDialogOpen(false);
    setEditingTask(null);
    setSelectedColumnId(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'grey.200',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'grey.400',
            borderRadius: 4,
            '&:hover': {
              bgcolor: 'grey.500',
            },
          },
        }}
      >
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Column 
              key={column.id} 
              column={column} 
              tasks={tasks}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          );
        })}
      </Box>

      <DragOverlay>
        {activeId && data.tasks[activeId] ? (
          <Card
            elevation={8}
            sx={{
              width: 320,
              transform: 'rotate(5deg)',
              cursor: 'grabbing',
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {data.tasks[activeId].title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {data.tasks[activeId].description}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>

      {/* Task Dialog */}
      <Dialog 
        open={taskDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <TextField
              label="Task Title"
              fullWidth
              required
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              placeholder="Enter task title"
              autoFocus
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              placeholder="Enter task description"
            />

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={taskForm.priority}
                label="Priority"
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as 'low' | 'medium' | 'high' })}
              >
                <MenuItem value="low">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FlagOutlined sx={{ color: priorityColors.low }} />
                    <span>Low</span>
                  </Stack>
                </MenuItem>
                <MenuItem value="medium">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FlagOutlined sx={{ color: priorityColors.medium }} />
                    <span>Medium</span>
                  </Stack>
                </MenuItem>
                <MenuItem value="high">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FlagOutlined sx={{ color: priorityColors.high }} />
                    <span>High</span>
                  </Stack>
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Assignee"
              fullWidth
              value={taskForm.assignee}
              onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value.toUpperCase().slice(0, 2) })}
              placeholder="Initials (e.g., JD)"
              inputProps={{ maxLength: 2 }}
              helperText="Enter 2-letter initials"
            />

            <TextField
              label="Due Date"
              type="date"
              fullWidth
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleSaveTask} 
            variant="contained"
            disabled={!taskForm.title.trim()}
            startIcon={editingTask ? <Edit /> : <Add />}
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </DndContext>
  );
}
