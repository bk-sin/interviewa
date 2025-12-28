import { ThemedText } from "@/src/shared/components";
import { theme } from "@/src/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { EvaluationFocusItem } from "./evaluation-focus-item";

const { spacing, typography } = theme;

interface FocusGoal {
  icon: any;
  title: string;
  description: string;
}

interface SetupFocusProps {
  goals: readonly FocusGoal[];
}

export const SetupFocus = ({ goals }: SetupFocusProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Evaluation Focus</ThemedText>
        <ThemedText style={styles.sectionSubtitle}>GOALS</ThemedText>
      </View>

      <View style={styles.focusList}>
        {goals.map((goal, index) => (
          <EvaluationFocusItem
            key={index}
            description={goal.description}
            title={goal.title}
            icon={goal.icon}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: spacing.md,
  },
  sectionTitle: { ...typography.h4 },
  sectionSubtitle: { ...typography.caption, opacity: 0.5 },
  focusList: { gap: spacing.sm },
});
