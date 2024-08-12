import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
  color: string;
}

export interface KanbanData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

interface KanbanState {
  data: KanbanData;
}

const initialState: KanbanState = {
  data: {
    tasks: {},
    columns: {},
    columnOrder: [],
  },
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setKanbanData: (state, action: PayloadAction<KanbanData>) => {
      state.data = action.payload;
    },
    addTask: (state, action: PayloadAction<{ task: Task; columnId: string }>) => {
      const { task, columnId } = action.payload;
      state.data.tasks[task.id] = task;
      if (state.data.columns[columnId]) {
        state.data.columns[columnId].taskIds.push(task.id);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      if (state.data.tasks[action.payload.id]) {
        state.data.tasks[action.payload.id] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      delete state.data.tasks[action.payload];
      Object.values(state.data.columns).forEach((column) => {
        column.taskIds = column.taskIds.filter((id) => id !== action.payload);
      });
    },
  },
});

export const { setKanbanData, addTask, updateTask, deleteTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;
