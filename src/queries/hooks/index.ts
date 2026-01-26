/**
 * TanStack Query Hooks Barrel Export
 * Centralized exports for all query hooks
 */

// Auth hooks
export {
  authKeys,
  useLogin,
  useLogout,
  useUpdateProfile,
  useUser,
  useUserStats,
} from "./useAuth";

// Interview hooks
export {
  interviewKeys,
  useActiveSession,
  useCompleteInterviewSession,
  useCreateInterviewSession,
  useInterviewHistory,
  useInterviewRoles,
  useProgressMetrics,
  useResetInterviewSession,
  useUpdateInterviewState,
  useUpdateSessionPayload,
} from "./useInterview";
