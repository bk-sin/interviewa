/**
 * Components Barrel File
 * Clean imports for all components
 *
 * @example
 * import { Button, FeatureItem, ThemedText } from '@/components';
 */

// UI Components (re-export from ui barrel)
export * from "./ui";

// Feature Components
export { FeatureItem } from "./feature-item";
export type { FeatureItemProps } from "./feature-item";

// Text Components
export { ThemedText } from "./themed-text";
export { Text as ThemedTextInter } from "./themed-text-inter";
export { ThemedView } from "./themed-view";

// Interactive Components
export { ExternalLink } from "./external-link";
export { HapticTab } from "./haptic-tab";
export { HelloWave } from "./hello-wave";

// Layout Components
export { default as ParallaxScrollView } from "./parallax-scroll-view";
