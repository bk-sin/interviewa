/**
 * App Configuration
 * @description Centralized app configuration exports
 */

export {
  AUTH_MESSAGES,
  AUTH_ROUTES,
  AUTH_STRATEGIES,
  AUTH_VALIDATION,
} from "./auth.config";
export type { AuthRoute, OAuthStrategy } from "./auth.config";

export {
  DEFAULT_INTERVIEW_CONFIG,
  DIFFICULTY_OPTIONS,
  FOCUS_AREAS,
  QUESTION_COUNT_OPTIONS,
} from "./interview-config.config";

export { onboardingContent, onboardingFeatures } from "./onboarding.config";
export type { Feature } from "./onboarding.config";

export { DEFAULT_ROLE_ID, ROLES_DATA } from "./roles.config";

// Reactotron configuration
export { default as reactotronConfig } from "./reactotron.config";
