import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { theme } from "@/src/theme";

const { spacing } = theme;

/**
 * Section - Content section wrapper with consistent spacing
 * @description Wraps content with horizontal padding and bottom margin
 *
 * @example
 * ```tsx
 * <Section>
 *   <StatsCard />
 * </Section>
 *
 * <Section spacing="lg" noPadding>
 *   <FullWidthBanner />
 * </Section>
 * ```
 */
export interface SectionProps {
  /** Child components */
  readonly children: ReactNode;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Vertical spacing size */
  readonly spacing?: "none" | "sm" | "md" | "lg" | "xl";
  /** Remove horizontal padding */
  readonly noPadding?: boolean;
  /** Test ID for testing */
  readonly testID?: string;
}

const SPACING_MAP = {
  none: 0,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
} as const;

export function Section({
  children,
  style,
  spacing: spacingSize = "lg",
  noPadding = false,
  testID,
}: SectionProps) {
  return (
    <View
      style={[
        styles.section,
        { marginBottom: SPACING_MAP[spacingSize] },
        noPadding && styles.noPadding,
        style,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.base,
  },
  noPadding: {
    paddingHorizontal: 0,
  },
});
