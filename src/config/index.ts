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

export { onboardingContent, onboardingFeatures } from "./onboarding.config";
export type { Feature } from "./onboarding.config";

// Reactotron configuration
export { default as reactotronConfig } from "./reactotron.config";
