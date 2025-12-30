import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/src/shared/components";
import { theme } from "@/src/theme";
import { useMicroFeedbackLogic } from "../hooks";

const { colors, spacing, typography } = theme;

/**
 * MicroFeedbackScreen
 * @description
 */
export default function MicroFeedbackScreen() {
  const insets = useSafeAreaInsets();
  const { isLoading, error, handleAction } = useMicroFeedbackLogic();

  return (
    <ThemedView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 100,
          },
        ]}
      >
        <ThemedText style={styles.title}>MicroFeedback</ThemedText>

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}

        {/* Add your UI here */}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
  },
  error: {
    ...typography.body,
    color: colors.text.error,
    marginTop: spacing.sm,
  },
});
