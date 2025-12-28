import { ThemedText } from "@/src/shared/components";
import { theme } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const { colors, spacing, typography, borderRadius } = theme;

interface Stat {
  id: string;
  icon: any;
  value: string;
  label: string;
}

interface SetupStatsProps {
  stats: readonly Stat[];
}

export const SetupStats = ({ stats }: SetupStatsProps) => {
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat) => (
        <View key={stat.id} style={styles.statCard}>
          <MaterialIcons name={stat.icon} size={24} color={colors.primary} />
          <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
          <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  statValue: { ...typography.h3, marginTop: 8, textAlign: "center" },
  statLabel: { ...typography.caption, opacity: 0.4, marginTop: 2 },
});
