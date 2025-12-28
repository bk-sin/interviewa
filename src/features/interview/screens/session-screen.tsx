import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { ThemedText } from "@/src/shared/components";
import { Button } from "@/src/shared/ui";
import { theme } from "@/src/theme";

const { colors, spacing, typography, borderRadius } = theme;

export default function InterviewSessionScreen() {
  const insets = useSafeAreaInsets();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 5;
  const progress = (currentQuestion / totalQuestions) * 100;

  // Animation for AI pulse
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.2, {
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        withTiming(1, { duration: 1000, easing: Easing.bezier(0.4, 0, 0.2, 1) })
      ),
      -1,
      true
    );
  }, [pulse]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 1.2 - pulse.value,
  }));

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Progress Header */}
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <ThemedText style={styles.progressText}>
            Question {currentQuestion}{" "}
            <ThemedText style={styles.progressTotal}>
              of {totalQuestions}
            </ThemedText>
          </ThemedText>
        </View>

        {/* AI Assistant Visualization */}
        <View style={styles.aiContainer}>
          <View style={styles.aiCoreContainer}>
            <Animated.View style={[styles.aiPulse, animatedPulseStyle]} />
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.aiCore}
            >
              <MaterialIcons
                name="insights"
                size={40}
                color={colors.background.dark}
              />
            </LinearGradient>
          </View>
          <ThemedText style={styles.aiStatus}>
            AI Assistant Listening...
          </ThemedText>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <ThemedText style={styles.questionCategory}>
            TECHNICAL SKILLS
          </ThemedText>
          <ThemedText style={styles.questionText}>
            {
              '"Tell me about a complex React Native performance issue you\'ve faced and how you solved it."'
            }
          </ThemedText>
        </View>

        {/* Live Transcript / Feedback placeholder */}
        <View style={styles.transcriptContainer}>
          <ThemedText style={styles.transcriptPlaceholder}>
            Your response will appear here as you speak...
          </ThemedText>
        </View>
      </SafeAreaView>

      {/* Control Footer */}
      <View
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.secondaryAction}>
            <MaterialIcons name="pause" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.micButton}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.micGradient}
            >
              <MaterialIcons
                name="mic"
                size={32}
                color={colors.background.dark}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() =>
              setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions))
            }
          >
            <MaterialIcons
              name="skip-next"
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        </View>

        <Button variant="secondary" onPress={() => {}} style={styles.endButton}>
          Finish Interview
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  progressContainer: {
    height: 6,
    backgroundColor: theme.rgba(colors.text.primary, 0.05),
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    ...typography.caption,
    fontWeight: "700",
    color: colors.primary,
  },
  progressTotal: {
    color: theme.rgba(colors.text.primary, 0.4),
  },
  aiContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  aiCoreContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  aiCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    ...theme.shadows.lg,
    shadowColor: colors.primary,
  },
  aiPulse: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    zIndex: 1,
  },
  aiStatus: {
    ...typography.body,
    color: theme.rgba(colors.text.primary, 0.7),
    fontWeight: "500",
  },
  questionCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: theme.rgba(colors.text.primary, 0.05),
    ...theme.shadows.md,
    marginTop: spacing.md,
  },
  questionCategory: {
    ...typography.caption,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  questionText: {
    ...typography.h3,
    color: colors.text.primary,
    lineHeight: 32,
  },
  transcriptContainer: {
    flex: 1,
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  transcriptPlaceholder: {
    ...typography.body,
    color: theme.rgba(colors.text.primary, 0.2),
    textAlign: "center",
    fontStyle: "italic",
  },
  footer: {
    backgroundColor: theme.rgba(colors.background.dark, 0.95),
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.rgba(colors.text.primary, 0.05),
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    marginBottom: spacing.lg,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    ...theme.shadows.lg,
    shadowColor: colors.primary,
  },
  micGradient: {
    flex: 1,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryAction: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.rgba(colors.text.primary, 0.05),
    justifyContent: "center",
    alignItems: "center",
  },
  endButton: {
    borderRadius: borderRadius.lg,
  },
});
