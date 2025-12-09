import { theme } from "@/src/theme";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface OrDividerProps {
  /** Text to display in the center (default: "O") */
  text?: string;
}

/**
 * OrDivider - Visual separator with horizontal lines and centered text
 * Used to separate alternative actions (e.g., OAuth vs Email login)
 */
export const OrDivider = memo(function OrDivider({
  text = "O",
}: OrDividerProps) {
  return (
    <View style={styles.container} accessibilityRole="none">
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 480,
    paddingVertical: theme.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.dark,
  },
  text: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    paddingHorizontal: theme.spacing.md,
  },
});
