import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * ScreenHeader - Header with greeting, subtitle and optional action button
 * @description Use at the top of screens for consistent header styling
 *
 * @example
 * ```tsx
 * <ScreenHeader
 *   title="Hola, Usuario 👋"
 *   subtitle="¡Es un gran día para practicar!"
 *   actionIcon="person"
 *   onAction={() => router.push('/profile')}
 * />
 * ```
 */
export interface ScreenHeaderProps {
  /** Main title text */
  readonly title: string;
  /** Subtitle text */
  readonly subtitle?: string;
  /** Right action icon */
  readonly actionIcon?: keyof typeof MaterialIcons.glyphMap;
  /** Right action callback */
  readonly onAction?: () => void;
  /** Action accessibility label */
  readonly actionLabel?: string;
  /** Additional container styles */
  readonly style?: ViewStyle;
  /** Test ID for testing */
  readonly testID?: string;
}

export const ScreenHeader = memo(function ScreenHeader({
  title,
  subtitle,
  actionIcon,
  onAction,
  actionLabel = "Acción",
  style,
  testID,
}: ScreenHeaderProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.textContainer}>
        <Text style={[typography.h3, styles.title]}>{title}</Text>
        {subtitle && (
          <Text style={[typography.bodySmall, styles.subtitle]}>
            {subtitle}
          </Text>
        )}
      </View>
      {actionIcon && onAction && (
        <TouchableOpacity
          onPress={onAction}
          style={styles.actionButton}
          accessibilityLabel={actionLabel}
          accessibilityRole="button"
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={actionIcon}
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

ScreenHeader.displayName = "ScreenHeader";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.base,
    paddingTop: spacing.xl,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.card,
    alignItems: "center",
    justifyContent: "center",
  },
});
