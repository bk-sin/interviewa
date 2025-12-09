import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { Badge, ProgressBar } from "@/src/shared/ui";
import { theme } from "@/src/theme";
import type { ProgressMetric } from "@/src/types";

const { borderRadius, colors, shadows, spacing, typography } = theme;

// Re-export type for convenience
export type { ProgressMetric };

/**
 * StatsCard - Displays user statistics with score, streak and progress metrics
 * @description Shows average score, streak days, and skill progress bars
 *
 * @example
 * ```tsx
 * <StatsCard
 *   averageScore="8.7/10"
 *   streakDays={5}
 *   metrics={[
 *     { label: "Claridad", percent: 85 },
 *     { label: "Confianza", percent: 90 },
 *   ]}
 * />
 * ```
 */
export interface StatsCardProps {
  /** Average score display text */
  readonly averageScore: string;
  /** Streak count in days */
  readonly streakDays: number;
  /** Array of progress metrics to display */
  readonly metrics: ProgressMetric[];
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

export const StatsCard = memo(function StatsCard({
  averageScore,
  streakDays,
  metrics,
  style,
  testID,
}: StatsCardProps) {
  const midpoint = Math.ceil(metrics.length / 2);
  const leftMetrics = metrics.slice(0, midpoint);
  const rightMetrics = metrics.slice(midpoint);

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.header}>
        <View>
          <Text style={[typography.bodySmall, styles.label]}>
            Puntuación Promedio
          </Text>
          <Text style={[typography.h3, styles.score]}>{averageScore}</Text>
        </View>
        <Badge
          icon="local-fire-department"
          text={`Racha: ${streakDays} días`}
          color={colors.primary}
          backgroundColor={colors.primaryMuted}
        />
      </View>

      <View style={styles.progressGrid}>
        <View style={styles.progressColumn}>
          {leftMetrics.map((metric) => (
            <ProgressBar
              key={metric.label}
              label={metric.label}
              percent={metric.percent}
            />
          ))}
        </View>
        <View style={styles.progressColumn}>
          {rightMetrics.map((metric) => (
            <ProgressBar
              key={metric.label}
              label={metric.label}
              percent={metric.percent}
            />
          ))}
        </View>
      </View>
    </View>
  );
});

StatsCard.displayName = "StatsCard";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    ...shadows.base,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.base,
  },
  label: {
    color: colors.text.muted,
  },
  score: {
    color: colors.primary,
  },
  progressGrid: {
    flexDirection: "row",
    gap: spacing.base,
  },
  progressColumn: {
    flex: 1,
    gap: spacing.md,
  },
});
