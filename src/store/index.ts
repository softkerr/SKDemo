import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './slices/kanbanSlice';
import timelineReducer from './slices/timelineSlice';
import teamReducer from './slices/teamSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
    timeline: timelineReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
