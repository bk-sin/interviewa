import { ThemedText } from "@/src/shared/components";
import { Button } from "@/src/shared/ui";
import { colors, spacing } from "@/src/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useHomeNavigation } from "../utils/navigation";

export const HeroSection = () => {
  const { startInterview } = useHomeNavigation();

  return (
    <View style={styles.section}>
      <ThemedText type="title" style={styles.heroTitle}>
        Practice a real interview.{"\n"}
        <ThemedText type="title" style={styles.heroHighlight}>
          Speak your answers.
        </ThemedText>
      </ThemedText>

      <ThemedText type="default" style={styles.heroSubtitle}>
        Timed questions, spoken answers, and immediate feedback.
      </ThemedText>

      <Button
        variant="primary"
        onPress={startInterview}
        rightIcon="arrow-forward"
        style={styles.primaryButton}
      >
        Start a practice session
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  heroHighlight: {
    color: colors.primary,
    fontSize: 32,
  },
  heroSubtitle: {
    fontSize: 17,
    color: colors.text.secondary,
    lineHeight: 24,
    fontWeight: "500",
  },
  primaryButton: {
    marginTop: spacing.xs,
  },
});
