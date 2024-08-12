import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  icon: string;
  color: string;
  team: string[];
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  startDate: string;
  endDate: string;
  progress: number;
  milestones: Milestone[];
}

interface TimelineState {
  projects: Project[];
}

const initialState: TimelineState = {
  projects: [],
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setTimelineData: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    addMilestone: (
      state,
      action: PayloadAction<{ projectId: string; milestone: Milestone }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        project.milestones.push(action.payload.milestone);
        // Update project progress
        const avgProgress =
          project.milestones.reduce((sum, m) => sum + m.progress, 0) /
          project.milestones.length;
        project.progress = Math.round(avgProgress);
      }
    },
    updateMilestone: (
      state,
      action: PayloadAction<{ projectId: string; milestone: Milestone }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        const index = project.milestones.findIndex(
          (m) => m.id === action.payload.milestone.id
        );
        if (index !== -1) {
          project.milestones[index] = action.payload.milestone;
          // Update project progress
          const avgProgress =
            project.milestones.reduce((sum, m) => sum + m.progress, 0) /
            project.milestones.length;
          project.progress = Math.round(avgProgress);
        }
      }
    },
    deleteMilestone: (
      state,
      action: PayloadAction<{ projectId: string; milestoneId: string }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        project.milestones = project.milestones.filter(
          (m) => m.id !== action.payload.milestoneId
        );
        // Update project progress
        if (project.milestones.length > 0) {
          const avgProgress =
            project.milestones.reduce((sum, m) => sum + m.progress, 0) /
            project.milestones.length;
          project.progress = Math.round(avgProgress);
        } else {
          project.progress = 0;
        }
      }
    },
  },
});

export const {
  setTimelineData,
  addProject,
  updateProject,
  deleteProject,
  addMilestone,
  updateMilestone,
  deleteMilestone,
} = timelineSlice.actions;
export default timelineSlice.reducer;
