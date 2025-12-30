import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Text, ThemedView } from "@/src/shared/components";
import { rgba, theme } from "@/src/theme";
import { FeedbackCard, Header } from "../components";

const { colors, spacing, typography, borderRadius } = theme;

/**
 * MicroFeedbackScreen
 * @description Micro feedback screen for interview practice
 */
export default function MicroFeedbackScreen() {
  return (
    <ThemedView>
      <Header
        onBack={() => console.log("back")}
        totalQuestions={10}
        currentQuestion={3}
        showProgress
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent]}
      >
        <View style={styles.headlineSection}>
          <View style={styles.badge}>
            <MaterialIcons
              name="auto-awesome"
              color={colors.primary}
              size={16}
            />
            <Text style={styles.badgeText}>AI ANALYSIS</Text>
          </View>
          <Text style={styles.mainTitle}>How you did</Text>
          <Text style={styles.subtitle}>
            Here&apos;s a quick breakdown of your answer.
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <FeedbackCard
            type="strength"
            title="Strong confidence & eye contact"
            description="Great use of the STAR method to structure your response clearly."
          />

          <FeedbackCard
            type="improvement"
            title="Expand on the 'Result'"
            description="Your answer was a bit brief. Quantify your impact to make it stronger."
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.xl,
    paddingTop: spacing.sm,
  },
  headlineSection: {
    alignItems: "center",
    paddingVertical: spacing["2xl"],
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primaryMuted,
    borderColor: rgba(colors.primary, 0.2),
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  mainTitle: {
    ...typography.h1,
    fontSize: 30,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  cardsContainer: {
    gap: spacing.base,
  },
});
