import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, shadows, spacing, typography } = theme;

/**
 * HeroCard - Gradient card with title, description and action buttons
 * @description Main CTA card for starting interviews
 *
 * @example
 * ```tsx
 * <HeroCard
 *   onPrimaryPress={() => startInterview()}
 *   onSecondaryPress={() => selectRole()}
 * />
 * ```
 */
export interface HeroCardProps {
  /** Main title text */
  readonly title?: string;
  /** Description text */
  readonly description?: string;
  /** Primary button text */
  readonly primaryButtonText?: string;
  /** Secondary button text */
  readonly secondaryButtonText?: string;
  /** Callback when primary button is pressed */
  readonly onPrimaryPress?: () => void;
  /** Callback when secondary button is pressed */
  readonly onSecondaryPress?: () => void;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

export const HeroCard = memo(function HeroCard({
  title = "Prepárate para tu próxima entrevista",
  description = "Comienza una nueva práctica o elige un rol específico para enfocarte.",
  primaryButtonText = "Comenzar Entrevista",
  secondaryButtonText = "Seleccionar puesto",
  onPrimaryPress,
  onSecondaryPress,
  style,
  testID,
}: HeroCardProps) {
  return (
    <LinearGradient
      colors={colors.gradients.dark}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
      testID={testID}
    >
      <Text style={[typography.h3, styles.title]}>{title}</Text>
      <Text style={[typography.bodySmall, styles.description]}>
        {description}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={onPrimaryPress}
          style={styles.primaryButton}
          activeOpacity={0.8}
          accessibilityLabel={primaryButtonText}
          accessibilityRole="button"
          accessibilityHint="Inicia una nueva sesión de práctica de entrevista"
        >
          <Text style={[typography.button, styles.primaryButtonText]}>
            {primaryButtonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSecondaryPress}
          style={styles.outlineButton}
          activeOpacity={0.8}
          accessibilityLabel={secondaryButtonText}
          accessibilityRole="button"
          accessibilityHint="Elige un puesto específico para practicar"
        >
          <Text style={[typography.button, styles.outlineButtonText]}>
            {secondaryButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
});

HeroCard.displayName = "HeroCard";

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.rgba(colors.primary, 0.1),
  },
  title: {
    color: colors.text.primary,
    fontSize: 20,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.text.secondary,
    marginBottom: spacing.base,
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: spacing.md,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.base,
    alignItems: "center",
    ...shadows.sm,
  },
  primaryButtonText: {
    color: colors.background.dark,
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.rgba(colors.primary, 0.5),
    paddingVertical: spacing.md,
    borderRadius: borderRadius.base,
    alignItems: "center",
  },
  outlineButtonText: {
    color: colors.primary,
  },
});
