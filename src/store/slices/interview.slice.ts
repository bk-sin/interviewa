import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {
  InterviewHistoryEntry,
  InterviewRole,
  InterviewSession,
  ProgressMetric,
} from "@/src/types";

interface InterviewState {
  roles: InterviewRole[];
  currentSession: InterviewSession | null;
  history: InterviewHistoryEntry[];
  progressMetrics: ProgressMetric[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InterviewState = {
  roles: [],
  currentSession: null,
  history: [],
  progressMetrics: [],
  isLoading: false,
  error: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<InterviewRole[]>) => {
      state.roles = action.payload;
    },
    setCurrentSession: (
      state,
      action: PayloadAction<InterviewSession | null>
    ) => {
      state.currentSession = action.payload;
    },
    setHistory: (state, action: PayloadAction<InterviewHistoryEntry[]>) => {
      state.history = action.payload;
    },
    addHistoryEntry: (state, action: PayloadAction<InterviewHistoryEntry>) => {
      state.history.unshift(action.payload);
    },
    setProgressMetrics: (state, action: PayloadAction<ProgressMetric[]>) => {
      state.progressMetrics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetInterview: (state) => {
      state.currentSession = null;
      state.error = null;
    },
  },
});

export const {
  setRoles,
  setCurrentSession,
  setHistory,
  addHistoryEntry,
  setProgressMetrics,
  setLoading,
  setError,
  resetInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;
