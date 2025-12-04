/**
 * Constants Barrel File
 * Clean imports for all constants and configurations
 *
 * @example
 * import { theme, colors, onboardingFeatures } from '@/constants';
 */

// Theme Design System
export {
  borderRadius,
  colors,
  fonts,
  fontSizes,
  layout,
  rgba,
  shadows,
  spacing,
  theme,
  typography,
} from "./theme.design";

// Theme (legacy)
export { Colors } from "./theme";

// Onboarding Configuration
export { onboardingContent, onboardingFeatures } from "./onboarding.config";
export type { Feature } from "./onboarding.config";
