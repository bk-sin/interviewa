import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { borderRadius, colors, shadows, spacing, typography } = theme;

/**
 * ContinueCard - Card for resuming last interview with play button
 * @description Shows last interview info with a play button to resume
 *
 * @example
 * ```tsx
 * <ContinueCard
 *   subtitle="Frontend: ¿Qué es el DOM virtual?"
 *   onPlayPress={() => resumeInterview()}
 * />
 * ```
 */
export interface ContinueCardProps {
  /** Title text */
  readonly title?: string;
  /** Subtitle/question text */
  readonly subtitle: string;
  /** Callback when play button is pressed */
  readonly onPlayPress?: () => void;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

export const ContinueCard = memo(function ContinueCard({
  title = "Continuar última entrevista",
  subtitle,
  onPlayPress,
  style,
  testID,
}: ContinueCardProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View>
        <Text style={[typography.body, styles.title]}>{title}</Text>
        <Text style={[typography.bodySmall, styles.subtitle]}>{subtitle}</Text>
      </View>
      <TouchableOpacity
        onPress={onPlayPress}
        style={styles.playButton}
        activeOpacity={0.8}
        accessibilityLabel="Continuar entrevista"
        accessibilityRole="button"
      >
        <MaterialIcons
          name="play-arrow"
          size={24}
          color={colors.background.dark}
        />
      </TouchableOpacity>
    </View>
  );
});

ContinueCard.displayName = "ContinueCard";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background.card,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  title: {
    color: colors.text.primary,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.text.muted,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
