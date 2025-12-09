import React, { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * RolePill - Selectable role tag pill
 * @description Used in horizontal scrollers for role selection
 *
 * @example
 * ```tsx
 * <RolePill
 *   role="Frontend"
 *   isActive={selected === "frontend"}
 *   onPress={() => setSelected("frontend")}
 * />
 * ```
 */
export interface RolePillProps {
  /** Role name to display */
  readonly role: string;
  /** Whether this role is currently selected/active */
  readonly isActive?: boolean;
  /** Callback when pill is pressed */
  readonly onPress?: () => void;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

export const RolePill = memo(function RolePill({
  role,
  isActive = false,
  onPress,
  style,
  testID,
}: RolePillProps) {
  const containerStyle = useMemo(
    () => [styles.container, isActive && styles.activeContainer, style],
    [isActive, style]
  );

  const textStyle = useMemo(
    () => [
      typography.bodySmall,
      styles.text,
      isActive ? styles.textActive : styles.textInactive,
    ],
    [isActive]
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
      activeOpacity={0.7}
      testID={testID}
      accessibilityLabel={`Rol ${role}${isActive ? ", seleccionado" : ""}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityHint="Toca para seleccionar este rol de entrevista"
    >
      <Text style={textStyle}>{role}</Text>
    </TouchableOpacity>
  );
});

RolePill.displayName = "RolePill";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.dark,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.background.card,
  },
  activeContainer: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  text: {
    fontWeight: "500",
  },
  textActive: {
    color: colors.primary,
  },
  textInactive: {
    color: colors.text.secondary,
  },
});
