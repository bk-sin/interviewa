/**
 * src/index.ts
 * Main entry point for all src modules
 *
 * @example
 * ```tsx
 * // Import shared components
 * import { Button, ThemedText } from '@/src/shared';
 *
 * // Import features
 * import { useSignInLogic } from '@/src/features/auth';
 * import { HeroCard } from '@/src/features/home';
 *
 * // Import TanStack Query hooks (PREFERRED)
 * import { useUser } from '@/src/features/auth';
 * import { useInterviewRoles } from '@/src/features/interview';
 *
 * // Import Zustand stores for client state
 * import { useUIStore } from '@/src/store';
 *
 * // Import data layer
 * import { authProvider, interviewProvider } from '@/src/data';
 *
 * // Import types
 * import type { ApiResponse } from '@/src/types';
 * import type { User } from '@/src/features/auth';
 * import type { InterviewSession } from '@/src/features/interview';
 *
 * // Import theme
 * import { theme, colors, spacing } from '@/src/theme';
 * ```
 */

// Re-export modules for convenience
export * from "./data";
export * from "./lib";
export * from "./shared";
export * from "./store";
export * from "./theme";
// Note: hooks re-exports store hooks, so we don't export again to avoid conflicts
