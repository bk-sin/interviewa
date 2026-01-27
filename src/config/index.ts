/**
 * App Configuration
 * @description Cross-feature configuration exports
 *
 * Note: Feature-specific configs are now in their respective features:
 * - Auth config: @/src/features/auth/config
 * - Interview config: @/src/features/interview/config
 */

export { onboardingContent, onboardingFeatures } from "./onboarding.config";
export type { Feature } from "./onboarding.config";

// Reactotron configuration
export { default as reactotronConfig } from "./reactotron.config";

// TanStack Query configuration
export { queryClient } from "./tanstack.config";
