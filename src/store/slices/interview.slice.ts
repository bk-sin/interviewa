import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {
  InterviewHistoryEntry,
  InterviewRole,
  InterviewSession,
  InterviewSessionResponse,
  InterviewState as InterviewStateType,
  ProgressMetric,
} from "@/src/types";

interface InterviewState {
  roles: InterviewRole[];
  currentSession: InterviewSession | null;
  
  // Nueva data de la sesión activa (desde backend)
  activeSession: InterviewSessionResponse | null;
  
  history: InterviewHistoryEntry[];
  progressMetrics: ProgressMetric[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InterviewState = {
  roles: [],
  currentSession: null,
  activeSession: null,
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
    
    // Nueva acción para setear la sesión activa desde el backend
    setActiveSession: (
      state,
      action: PayloadAction<InterviewSessionResponse | null>
    ) => {
      state.activeSession = action.payload;
    },
    
    // Actualizar solo el estado de la sesión
    updateInterviewState: (
      state,
      action: PayloadAction<InterviewStateType>
    ) => {
      if (state.activeSession) {
        state.activeSession.state = action.payload;
      }
    },
    
    // Actualizar el payload de la sesión
    updateSessionPayload: (
      state,
      action: PayloadAction<Partial<InterviewSessionResponse['payload']>>
    ) => {
      if (state.activeSession) {
        state.activeSession.payload = {
          ...state.activeSession.payload,
          ...action.payload,
        };
      }
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
      state.activeSession = null;
      state.error = null;
    },
  },
});

export const {
  setRoles,
  setCurrentSession,
  setActiveSession,
  updateInterviewState,
  updateSessionPayload,
  setHistory,
  addHistoryEntry,
  setProgressMetrics,
  setLoading,
  setError,
  resetInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;
