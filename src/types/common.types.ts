/**
 * Common/Shared Types
 */

import { MaterialIcons } from "@expo/vector-icons";

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  readonly data: T;
  readonly success: boolean;
  readonly message?: string;
  readonly timestamp: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly hasMore: boolean;
}

/**
 * Generic error type
 */
export interface AppError {
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, unknown>;
}

/**
 * Quick action item
 */
export interface QuickAction {
  readonly id: string;
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  readonly title: string;
  readonly subtitle: string;
  readonly route?: string;
}

/**
 * Loading state helper
 */
export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

/**
 * Async thunk state
 */
export interface AsyncState<T> {
  readonly data: T | null;
  readonly status: LoadingState;
  readonly error: string | null;
}
