import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "@/src/shared/components";
import { borderRadius, colors, rgba, spacing } from "@/src/theme";

interface QuestionCardProps {
  context: string;
  question: string;
  hint: string;
}

/**
 * QuestionCard
 * @description Tarjeta de pregunta con indicador "Live" animado
 */
export const QuestionCard = ({
  context,
  question,
  hint,
}: QuestionCardProps) => {
  // Animación del punto "Live"
  const opacity = useSharedValue(0.5);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1,
      true
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Glow Trasero */}
      <View style={styles.backGlow} />

      <LinearGradient
        colors={[
          rgba(colors.background.dark, 0.85),
          rgba(colors.background.dark, 0.98),
        ]}
        style={styles.card}
      >
        {/* Live Indicator */}
        <View style={styles.liveBadge}>
          <Animated.View style={[styles.liveDot, animatedDotStyle]} />
          <ThemedText style={styles.liveText}>EN VIVO</ThemedText>
        </View>

        {/* Header & Context */}
        <View style={styles.content}>
          <View style={styles.contextContainer}>
            <View style={styles.typeRow}>
              <MaterialIcons
                name="psychology"
                size={20}
                color={colors.primary}
              />
              <ThemedText style={styles.typeText}>
                PREGUNTA DE SEGUIMIENTO
              </ThemedText>
            </View>
            <ThemedText style={styles.contextText}>
              &ldquo;{context}&rdquo;
            </ThemedText>
          </View>

          {/* Main Question */}
          <ThemedText style={styles.questionText}>{question}</ThemedText>

          {/* Hint Box */}
          <View style={styles.hintBox}>
            <ThemedText style={styles.hintText}>{hint}</ThemedText>
          </View>
        </View>

        {/* Decorative Bottom Line */}
        <LinearGradient
          colors={["transparent", rgba(colors.primary, 0.5), "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bottomLine}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
    position: "relative",
  },
  backGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: rgba(colors.primary, 0.05),
    borderRadius: 100,
    transform: [{ scale: 1.05 }],
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: rgba(colors.primary, 0.2),
    overflow: "hidden",
    padding: spacing.lg,
    paddingTop: spacing.xl * 1.5,
  },
  liveBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    opacity: 0.8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  liveText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 1.5,
  },
  content: {
    gap: spacing.lg,
  },
  contextContainer: {
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
    paddingLeft: spacing.md,
    gap: spacing.xs,
  },
  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  typeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  contextText: {
    color: rgba(colors.text.primary, 0.6),
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    color: colors.text.primary,
  },
  hintBox: {
    backgroundColor: rgba(colors.primary, 0.05),
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: rgba(colors.primary, 0.1),
  },
  hintText: {
    color: rgba(colors.text.primary, 0.6),
    fontSize: 12,
    textAlign: "center",
  },
  bottomLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
});
