import { ThemedText } from "@/src/shared/components";
import { Badge } from "@/src/shared/ui";
import { colors, spacing } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useHomeNavigation } from "../../utils/navigation";

export const ActiveSessionCard = () => {
  const { continueSession } = useHomeNavigation();

  return (
    <View style={[styles.card, styles.glowShadow]}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.headerContent}>
          <Badge
            text="IN PROGRESS"
            color={colors.primary}
            backgroundColor={colors.primaryMuted}
            style={styles.badge}
          />

          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Continue your last practice
          </ThemedText>

          <ThemedText type="default" style={styles.cardSubtitle}>
            Behavioral Interview · Question 5 of 10
          </ThemedText>
        </View>

        <TouchableOpacity style={styles.playButton}>
          <MaterialIcons name="play-arrow" size={20} color={colors.text.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: "50%" }]} />
      </View>

      <TouchableOpacity
        style={styles.cardButton}
        activeOpacity={0.9}
        onPress={continueSession}
      >
        <ThemedText type="defaultSemiBold" style={styles.cardButtonText}>
          Continue session
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.accent,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primaryMuted,
  },
  glowShadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  headerContent: {
    flex: 1,
    gap: spacing.xs,
  },
  badge: {
    alignSelf: "flex-start",
  },
  cardTitle: {
    fontSize: 17,
    color: colors.text.primary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "rgba(12, 26, 22, 0.5)",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  cardButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    alignItems: "center",
  },
  cardButtonText: {
    color: colors.text.dark,
    fontSize: 15,
  },
});
