import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * Props for ProgressBar component
 */
export interface ProgressBarProps {
  /** Label text displayed above the progress bar */
  readonly label: string;
  /** Progress percentage (0-100) */
  readonly percent: number;
  /** Optional custom color for the progress fill */
  readonly fillColor?: string;
  /** Optional test ID for testing */
  readonly testID?: string;
}

/**
 * ProgressBar - Displays progress with label and customizable fill
 */
export const ProgressBar = memo(function ProgressBar({
  label,
  percent,
  fillColor = colors.primary,
  testID,
}: ProgressBarProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <View style={styles.container} testID={testID}>
      <Text style={[typography.bodySmall, styles.label]}>{label}</Text>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${clampedPercent}%`, backgroundColor: fillColor },
          ]}
        />
      </View>
    </View>
  );
});

ProgressBar.displayName = "ProgressBar";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: "500",
  },
  track: {
    height: 8,
    backgroundColor: colors.background.dark,
    borderRadius: borderRadius.full,
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: borderRadius.full,
  },
});
