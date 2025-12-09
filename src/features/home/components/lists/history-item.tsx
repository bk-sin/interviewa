import { MaterialIcons } from "@expo/vector-icons";
import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { IconBox } from "@/src/shared/ui/icon-box";
import { theme } from "@/src/theme";

const { colors, spacing, typography } = theme;

/**
 * HistoryItem - Displays a practice history entry
 * @description Individual row in history list
 *
 * @example
 * ```tsx
 * <HistoryItem
 *   icon="code"
 *   title="Frontend Developer"
 *   date="Hace 2 días"
 *   score="9.2/10"
 *   isPrimaryScore
 * />
 * ```
 */
export interface HistoryItemProps {
  /** Material icon name for the history item */
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  /** Title of the practice session */
  readonly title: string;
  /** Date or time description */
  readonly date: string;
  /** Score achieved */
  readonly score: string;
  /** Whether to highlight the score with primary color */
  readonly isPrimaryScore?: boolean;
  /** Optional test ID */
  readonly testID?: string;
}

export const HistoryItem = memo(function HistoryItem({
  icon,
  title,
  date,
  score,
  isPrimaryScore = false,
  testID,
}: HistoryItemProps) {
  const scoreStyle = useMemo(
    () => [
      typography.body,
      styles.score,
      isPrimaryScore ? styles.scorePrimary : styles.scoreMuted,
    ],
    [isPrimaryScore]
  );

  return (
    <View
      style={styles.container}
      testID={testID}
      accessible={true}
      accessibilityLabel={`Práctica de ${title}, ${date}, puntuación ${score}`}
      accessibilityRole="text"
    >
      <View style={styles.left}>
        <IconBox
          icon={icon}
          size="lg"
          iconColor={colors.text.muted}
          backgroundColor={colors.background.card}
          style={styles.iconBox}
        />
        <View>
          <Text style={[typography.body, styles.title]}>{title}</Text>
          <Text style={[typography.caption, styles.date]}>{date}</Text>
        </View>
      </View>
      <Text style={scoreStyle}>{score}</Text>
    </View>
  );
});

HistoryItem.displayName = "HistoryItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.rgba(colors.border.dark, 0.5),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
  },
  iconBox: {
    width: 44,
    height: 44,
  },
  title: {
    color: colors.text.primary,
    fontWeight: "500",
  },
  date: {
    color: colors.text.muted,
  },
  score: {
    fontWeight: "bold",
  },
  scorePrimary: {
    color: colors.primary,
  },
  scoreMuted: {
    color: colors.text.muted,
  },
});
