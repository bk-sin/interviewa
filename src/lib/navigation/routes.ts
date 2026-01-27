/**
 * Shared Navigation Routes
 * @description Route constants shared across all features (tabs, onboarding)
 * Feature-specific routes are in their respective features
 *
 * Usage:
 * ```tsx
 * import { TAB_ROUTES } from '@/src/lib/navigation';
 * import { INTERVIEW_ROUTES } from '@/src/features/interview';
 *
 * router.push(TAB_ROUTES.HOME);
 * router.push(INTERVIEW_ROUTES.SESSION);
 * ```
 */

// Tab routes (main navigation - shared across features)
export const TAB_ROUTES = {
  ROOT: "/(tabs)" as const,
  HOME: "/(tabs)/" as const,
  PRACTICES: "/(tabs)/practices" as const,
  HISTORY: "/(tabs)/history" as const,
  PROFILE: "/(tabs)/profile" as const,
} as const;

export type TabRoute = (typeof TAB_ROUTES)[keyof typeof TAB_ROUTES];

// Onboarding (shared)
export const ONBOARDING_ROUTE = "/onboarding" as const;
