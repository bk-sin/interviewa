// src/features/interview/components/evaluation-focus-item.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/src/shared/components";
import { IconBox } from "@/src/shared/ui/icon-box";
import { theme } from "@/src/theme";

const { colors, spacing, typography, borderRadius } = theme;

interface FocusItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
}

export const EvaluationFocusItem = ({
  icon,
  title,
  description,
}: FocusItemProps) => (
  <View style={styles.container}>
    <IconBox
      icon={icon}
      backgroundColor={colors.background.accent}
      iconColor={colors.primary}
      size="md"
      style={styles.iconBox}
    />
    <View style={styles.content}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.rgba(colors.text.primary, 0.05),
    gap: spacing.md,
  },
  iconBox: {
    borderRadius: borderRadius.full,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.body,
    fontWeight: "700",
    color: colors.text.primary,
  },
  description: {
    ...typography.caption,
    color: theme.rgba(colors.text.primary, 0.5),
    lineHeight: 20,
  },
});
