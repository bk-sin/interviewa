import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * ErrorState - Display when an error occurs
 * @description Use for API errors, network issues, etc.
 *
 * @example
 * ```tsx
 * <ErrorState
 *   title="Error de conexión"
 *   description="No se pudo cargar los datos"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export interface ErrorStateProps {
  /** Error title */
  readonly title?: string;
  /** Error description */
  readonly description?: string;
  /** Retry button label */
  readonly retryLabel?: string;
  /** Retry callback */
  readonly onRetry?: () => void;
  /** Additional container styles */
  readonly style?: ViewStyle;
  /** Test ID for testing */
  readonly testID?: string;
}

export function ErrorState({
  title = "Algo salió mal",
  description = "No pudimos cargar el contenido. Por favor, intenta de nuevo.",
  retryLabel = "Reintentar",
  onRetry,
  style,
  testID,
}: ErrorStateProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="error-outline"
          size={48}
          color={colors.status.error}
        />
      </View>
      <Text style={[typography.h4, styles.title]}>{title}</Text>
      <Text style={[typography.body, styles.description]}>{description}</Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}
          activeOpacity={0.8}
          accessibilityLabel={retryLabel}
          accessibilityRole="button"
        >
          <MaterialIcons
            name="refresh"
            size={20}
            color={colors.background.dark}
          />
          <Text style={[typography.button, styles.buttonText]}>
            {retryLabel}
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
    backgroundColor: "rgba(239, 68, 68, 0.1)",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  buttonText: {
    color: colors.background.dark,
  },
});
