import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamMember {
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
  performance: number;
  skills: string[];
}

interface TeamState {
  members: TeamMember[];
}

const initialState: TeamState = {
  members: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeamData: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
    addMember: (state, action: PayloadAction<TeamMember>) => {
      state.members.push(action.payload);
    },
    updateMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
  },
});

export const { setTeamData, addMember, updateMember, deleteMember } = teamSlice.actions;
export default teamSlice.reducer;
