/**
 * Redux Store
 *
 * @description
 * Central state management with typed hooks.
 *
 * @example
 * ```tsx
 * // In your root _layout.tsx
 * import { Provider } from 'react-redux';
 * import { store } from '@/src/store';
 *
 * <Provider store={store}>
 *   <App />
 * </Provider>
 *
 * // In components
 * import { useAppSelector, useAppDispatch } from '@/src/store';
 *
 * const { user } = useAppSelector((s) => s.auth);
 * const dispatch = useAppDispatch();
 * ```
 */

export { store } from "./store";
export type { AppDispatch, RootState } from "./store";

export { useAppDispatch, useAppSelector } from "./hooks";

// Auth actions
export {
  clearAuth,
  setError as setAuthError,
  setLoading as setAuthLoading,
  setStats,
  setUser,
} from "./slices/auth.slice";

// Interview actions
export {
  addHistoryEntry,
  resetInterview,
  setCurrentSession,
  setHistory,
  setError as setInterviewError,
  setLoading as setInterviewLoading,
  setProgressMetrics,
  setRoles,
} from "./slices/interview.slice";
