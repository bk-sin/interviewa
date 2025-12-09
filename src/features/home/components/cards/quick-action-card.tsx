import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { IconBox } from "@/src/shared/ui";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * QuickActionCard - Actionable card with icon, title and subtitle
 * @description Used in grids for quick actions
 *
 * @example
 * ```tsx
 * <QuickActionCard
 *   icon="bolt"
 *   title="Entrenamiento Rápido"
 *   subtitle="5 min"
 *   onPress={() => startQuickTraining()}
 * />
 * ```
 */
export interface QuickActionCardProps {
  /** Material icon name */
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  /** Card title */
  readonly title: string;
  /** Subtitle or duration text */
  readonly subtitle: string;
  /** Callback when card is pressed */
  readonly onPress?: () => void;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

export const QuickActionCard = memo(function QuickActionCard({
  icon,
  title,
  subtitle,
  onPress,
  style,
  testID,
}: QuickActionCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
      testID={testID}
      accessibilityLabel={`${title}, ${subtitle}`}
      accessibilityRole="button"
      accessibilityHint={`Accede a ${title}`}
    >
      <IconBox
        icon={icon}
        size="md"
        iconColor={colors.text.primary}
        style={styles.iconBox}
      />
      <Text style={[typography.bodyMedium, styles.title]}>{title}</Text>
      <Text style={[typography.caption, styles.subtitle]}>{subtitle}</Text>
    </TouchableOpacity>
  );
});

QuickActionCard.displayName = "QuickActionCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: "flex-start",
  },
  iconBox: {
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text.primary,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.text.muted,
  },
});
