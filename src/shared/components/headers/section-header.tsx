import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { colors, spacing, typography } = theme;

/**
 * SectionHeader - Header for content sections with optional action
 * @description Use to introduce sections within a screen
 *
 * @example
 * ```tsx
 * <SectionHeader title="Historial reciente" />
 *
 * <SectionHeader
 *   title="Tus roles"
 *   actionLabel="Ver todos"
 *   onAction={() => router.push('/roles')}
 * />
 * ```
 */
export interface SectionHeaderProps {
  /** Section title */
  readonly title: string;
  /** Action text (e.g., "Ver todos") */
  readonly actionLabel?: string;
  /** Action callback */
  readonly onAction?: () => void;
  /** Additional container styles */
  readonly style?: ViewStyle;
  /** Test ID for testing */
  readonly testID?: string;
}

export const SectionHeader = memo(function SectionHeader({
  title,
  actionLabel,
  onAction,
  style,
  testID,
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={[typography.h4, styles.title]}>{title}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          accessibilityLabel={actionLabel}
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[typography.bodySmall, styles.action]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

SectionHeader.displayName = "SectionHeader";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text.primary,
  },
  action: {
    color: colors.primary,
  },
});
