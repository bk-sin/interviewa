/**
 * Navigation Module
 * @description Shared route constants (tabs, onboarding)
 *
 * Feature-specific routes are in their features:
 * - Interview: @/src/features/interview/routes
 * - Auth: @/src/features/auth/routes
 *
 * Navigation helpers are also in features:
 * - Interview: @/src/features/interview (useInterviewNavigation)
 * - Auth: @/src/features/auth (useAuthNavigation)
 * - Generic: @/src/shared (useNavigation)
 *
 * @example
 * ```tsx
 * import { TAB_ROUTES } from '@/src/lib/navigation';
 * import { INTERVIEW_ROUTES } from '@/src/features/interview';
 *
 * router.push(TAB_ROUTES.HOME);
 * router.push(INTERVIEW_ROUTES.SESSION);
 * ```
 */

export { ONBOARDING_ROUTE, TAB_ROUTES } from "./routes";
export type { TabRoute } from "./routes";
