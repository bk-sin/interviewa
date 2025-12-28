import { ThemedText } from "@/src/shared/components";
import { Badge } from "@/src/shared/ui";
import { theme } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

const { colors, spacing, typography, borderRadius } = theme;

export const SetupHero = () => {
  return (
    <View style={styles.heroSection}>
      <LinearGradient
        colors={[theme.rgba(colors.primary, 0.15), "transparent"]}
        style={styles.heroIconContainer}
      >
        <MaterialIcons name="terminal" size={42} color={colors.primary} />
      </LinearGradient>

      <ThemedText style={styles.roleTitle}>Frontend Developer</ThemedText>

      <View style={styles.badgesContainer}>
        <Badge text="Senior Level" />
        <ThemedText style={styles.badgeDot}>•</ThemedText>
        <ThemedText style={styles.mockText}>Mock Interview</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: { alignItems: "center", marginBottom: spacing.xl },
  heroIconContainer: {
    width: 84,
    height: 84,
    borderRadius: borderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: theme.rgba(colors.primary, 0.2),
  },
  roleTitle: {
    ...typography.h3,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  badgesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  badgeDot: { color: colors.text.primary, opacity: 0.3, marginHorizontal: 4 },
  mockText: { ...typography.body, opacity: 0.6, fontWeight: "500" },
});
