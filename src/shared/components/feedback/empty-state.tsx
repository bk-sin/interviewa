import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * EmptyState - Display when no content is available
 * @description Use to show empty lists, search results, etc.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon="history"
 *   title="Sin entrevistas"
 *   description="Completa tu primera entrevista"
 *   actionLabel="Empezar"
 *   onAction={() => router.push('/interview')}
 * />
 * ```
 */
export interface EmptyStateProps {
  /** Material icon name */
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  /** Main title */
  readonly title: string;
  /** Description text */
  readonly description?: string;
  /** Action button label */
  readonly actionLabel?: string;
  /** Action button callback */
  readonly onAction?: () => void;
  /** Additional container styles */
  readonly style?: ViewStyle;
  /** Test ID for testing */
  readonly testID?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  style,
  testID,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={48} color={colors.text.muted} />
      </View>
      <Text style={[typography.h4, styles.title]}>{title}</Text>
      {description && (
        <Text style={[typography.body, styles.description]}>{description}</Text>
      )}
      {actionLabel && onAction && (
        <TouchableOpacity
          style={styles.button}
          onPress={onAction}
          activeOpacity={0.8}
          accessibilityLabel={actionLabel}
          accessibilityRole="button"
        >
          <Text style={[typography.button, styles.buttonText]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    minHeight: 300,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.base,
  },
  title: {
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.text.muted,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  buttonText: {
    color: colors.background.dark,
  },
});
