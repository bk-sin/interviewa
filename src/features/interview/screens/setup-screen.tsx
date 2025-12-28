// src/features/interview/screens/setup-screen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/src/shared/components";
import { theme } from "@/src/theme";
import {
  Footer,
  Header,
  SetupFocus,
  SetupHero,
  SetupStats,
} from "../components";
import { useSetupLogic } from "../hooks/use-setup-logic";

const { spacing, typography } = theme;

export default function SetupScreen() {
  const insets = useSafeAreaInsets();
  const { interviewStats, focusGoals, handleStartInterview, handleBack } =
    useSetupLogic();

  return (
    <ThemedView>
      <Header onBack={handleBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
      >
        <SetupHero />
        <SetupStats stats={interviewStats} />
        <SetupFocus goals={focusGoals} />

        <ThemedText style={styles.footerNote}>
          Take a deep breath. Find a quiet space.{"\n"}
          The session will be recorded for AI analysis.
        </ThemedText>
      </ScrollView>

      <Footer
        buttons={[
          {
            label: "Start Interview",
            onPress: handleStartInterview,
            variant: "primary",
          },
        ]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  footerNote: {
    marginTop: spacing.xl,
    textAlign: "center",
    ...typography.caption,
    opacity: 0.3,
    lineHeight: 18,
  },
});
