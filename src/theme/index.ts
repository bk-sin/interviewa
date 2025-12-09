/**
 * Theme Design System
 * Unified theme export for the entire application
 *
 * @example
 * ```tsx
 * import { theme } from '@/src/theme';
 *
 * const { colors, spacing, typography } = theme;
 * ```
 */

import { colors } from "./colors";
import { layout, opacity, rgba } from "./layout";
import { shadows } from "./shadows";
import { borderRadius, spacing } from "./spacing";
import { fonts, fontSizes, typography } from "./typography";

export const theme = {
  colors,
  fonts,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
  typography,
  layout,
  opacity,
  rgba,
} as const;

// Re-export individual modules for direct imports
export { colors } from "./colors";
export { layout, opacity, rgba } from "./layout";
export { shadows } from "./shadows";
export { borderRadius, spacing } from "./spacing";
export { fonts, fontSizes, typography } from "./typography";

export default theme;
