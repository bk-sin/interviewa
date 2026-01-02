/**
 * Centralized Type Definitions
 *
 * @description
 * All domain types exported from a single entry point.
 *
 * @example
 * ```tsx
 * import type { User, InterviewSession, ApiResponse } from '@/src/types';
 * ```
 */

// User types
export type { User, UserPreferences, UserStats } from "./user.types";

// Interview types
export type {
  CheckpointData,
  DifficultyLevel,
  DifficultyOption,
  FeedbackRating,
  InterviewConfigData,
  InterviewDifficulty,
  InterviewFeedback,
  InterviewHistoryEntry,
  InterviewQuestion,
  InterviewRole,
  InterviewSession,
  InterviewSessionPayload,
  InterviewSessionResponse,
  InterviewState,
  InterviewStatus,
  ProgressMetric,
  QuestionCategory,
  QuestionCount,
  QuestionCountOption,
  RoleCategory,
  RoleOption,
} from "./interview.types";

// Common types
export type {
  ApiResponse,
  AppError,
  AsyncState,
  LoadingState,
  PaginatedResponse,
  QuickAction,
} from "./common.types";
