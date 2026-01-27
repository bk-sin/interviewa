/**
 * Shared Types
 *
 * @description
 * Only cross-feature types are exported here.
 * Feature-specific types live in their respective features:
 * - User types: @/src/features/auth/types
 * - Interview types: @/src/features/interview/types
 *
 * @example
 * ```tsx
 * import type { ApiResponse, PaginatedResponse } from '@/src/types';
 * import type { User } from '@/src/features/auth';
 * import type { InterviewSession } from '@/src/features/interview';
 * ```
 */

// Common types (truly shared across features)
export type {
  ApiResponse,
  AppError,
  AsyncState,
  LoadingState,
  PaginatedResponse,
  QuickAction,
} from "./common.types";
