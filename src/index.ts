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
 * import { useUser, useInterviewRoles } from '@/src/queries';
 *
 * // Import Zustand stores for client state
 * import { useUIStore } from '@/src/store';
 *
 * // Import data layer
 * import { authProvider, interviewProvider } from '@/src/data';
 *
 * // Import types
 * import type { User, InterviewSession } from '@/src/types';
 *
 * // Import theme
 * import { theme, colors, spacing } from '@/src/theme';
 * ```
 */

// Re-export modules for convenience
export * from "./data";
export * from "./lib";
export * from "./queries";
export * from "./shared";
export * from "./store";
export * from "./theme";
// Note: hooks re-exports store hooks, so we don't export again to avoid conflicts
