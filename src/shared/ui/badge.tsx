import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * Props for Badge component
 */
export interface BadgeProps {
  /** Badge text content */
  readonly text: string;
  /** Optional Material icon name */
  readonly icon?: keyof typeof MaterialIcons.glyphMap;
  /** Badge color (applies to icon and text) */
  readonly color?: string;
  /** Background color of the badge */
  readonly backgroundColor?: string;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

/**
 * Badge - Compact indicator with optional icon
 */
export const Badge = memo(function Badge({
  text,
  icon,
  color = colors.primary,
  backgroundColor = colors.primaryMuted,
  style,
  testID,
}: BadgeProps) {
  return (
    <View
      style={[styles.container, { backgroundColor }, style]}
      testID={testID}
    >
      {icon && <MaterialIcons name={icon} size={16} color={color} />}
      <Text style={[typography.caption, styles.text, { color }]}>{text}</Text>
    </View>
  );
});

Badge.displayName = "Badge";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  text: {
    fontWeight: "bold",
  },
});
