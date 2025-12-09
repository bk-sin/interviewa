import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import interviewReducer from "./slices/interview.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state (for Date objects, etc.)
        ignoredActions: ["interview/setCurrentSession"],
        ignoredPaths: ["interview.currentSession.startedAt"],
      },
    }),
});

// Infer types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
