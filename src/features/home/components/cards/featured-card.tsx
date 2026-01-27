import { ThemedText } from "@/src/shared/components";
import { colors, shadows, spacing } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useHomeNavigation } from "../../utils/navigation";

export const FeaturedCard = () => {
  const { goToInterviewConfig } = useHomeNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.tagContainer}>
          <ThemedText type="default" style={styles.tagText}>
            FEATURED
          </ThemedText>
        </View>
        <MaterialIcons
          name="bookmark"
          size={20}
          color="rgba(146, 201, 183, 0.5)"
        />
      </View>

      <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
        Behavioral Interview – Clear & Structured Answers
      </ThemedText>

      <View style={styles.metaRow}>
        <ThemedText type="default" style={styles.metaText}>
          10 realistic questions
        </ThemedText>
        <ThemedText type="default" style={styles.metaDot}>
          •
        </ThemedText>
        <ThemedText type="default" style={styles.metaText}>
          60–90 sec answers
        </ThemedText>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="event-available"
          size={16}
          color={colors.primary}
        />
        <ThemedText type="default" style={styles.infoText}>
          Designed for real interviews happening soon
        </ThemedText>
      </View>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={goToInterviewConfig}
      >
        <ThemedText type="defaultSemiBold" style={styles.outlineButtonText}>
          Start session
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border.dark,
    ...shadows.md,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  tagContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.text.secondary,
  },
  cardTitle: {
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  metaText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  metaDot: {
    color: "rgba(255, 255, 255, 0.2)",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: 12,
    color: "rgba(19, 236, 164, 0.9)",
    fontWeight: "600",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: colors.background.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  outlineButtonText: {
    color: colors.text.primary,
    fontSize: 15,
  },
});
