import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/src/shared/components";
import { borderRadius, colors, rgba, spacing, typography } from "@/src/theme";
import { CheckpointProgress } from "../components";
import { useCheckpointLogic } from "../hooks";

/**
 * CheckpointScreen
 * @description Pantalla de checkpoint intermedio en la entrevista
 */
export default function CheckpointScreen() {
  const insets = useSafeAreaInsets();
  const { handleContinue, handleQuit, progressValue, stats } =
    useCheckpointLogic();

  return (
    <ThemedView style={styles.container}>
      {/* --- Top App Bar --- */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerSpacer} />
        <ThemedText style={styles.headerTitle}>CHECKPOINT ALCANZADO</ThemedText>
        <TouchableOpacity onPress={handleQuit} style={styles.headerAction}>
          <ThemedText style={styles.quitText}>Salir</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Headline --- */}
        <Animated.View
          entering={FadeInUp.duration(600)}
          style={styles.heroSection}
        >
          <ThemedText style={styles.title}>¡Gran momento!</ThemedText>
          <ThemedText style={styles.subtitle}>
            Estás dominando esta sesión.
          </ThemedText>
        </Animated.View>

        {/* --- Progress Ring --- */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)}>
          <CheckpointProgress
            progress={progressValue}
            percentage={stats.percentage}
            trend={stats.trend}
          />
        </Animated.View>

        {/* --- Stats Chip --- */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(600)}
          style={styles.chipContainer}
        >
          <View style={styles.chip}>
            <MaterialIcons
              name="bar-chart"
              color={colors.text.primary}
              size={18}
            />
            <ThemedText style={styles.chipText}>
              Puntaje de Claridad: {stats.clarityScore} ({stats.topPercent})
            </ThemedText>
          </View>
        </Animated.View>

        {/* --- AI Insight Card --- */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={styles.cardContainer}
        >
          <View style={styles.card}>
            {/* Background Pattern Overlay */}
            <View style={styles.cardBgOverlay} />

            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <MaterialIcons
                  name="auto-awesome"
                  size={18}
                  color={colors.primary}
                />
              </View>
              <ThemedText style={styles.cardLabel}>ANÁLISIS DE IA</ThemedText>
            </View>

            <ThemedText style={styles.cardBody}>
              &ldquo;{stats.aiFeedback.prefix}{" "}
              <ThemedText style={{ color: colors.primary, fontWeight: "700" }}>
                {stats.aiFeedback.highlight}
              </ThemedText>{" "}
              {stats.aiFeedback.suffix}&rdquo;
            </ThemedText>
          </View>
        </Animated.View>
      </ScrollView>

      {/* --- Sticky Footer --- */}
      <View style={styles.footerWrapper}>
        {/* Gradient Fade para suavizar el corte del scroll */}
        <LinearGradient
          colors={[
            "transparent",
            colors.background.dark,
            colors.background.dark,
          ]}
          style={styles.gradientOverlay}
        />

        <View
          style={[
            styles.footerContent,
            { paddingBottom: insets.bottom + spacing.md },
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContinue}
            activeOpacity={0.9}
          >
            <ThemedText style={styles.buttonText}>
              Continuar Entrevista
            </ThemedText>
            <MaterialIcons
              name="arrow-forward"
              color={colors.background.dark}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background.dark,
    zIndex: 10,
  },
  headerSpacer: { width: 40 },
  headerTitle: {
    ...typography.caption,
    fontWeight: "700",
    letterSpacing: 1.5,
    opacity: 0.7,
    textTransform: "uppercase",
  },
  headerAction: {
    width: 40,
    alignItems: "flex-end",
  },
  quitText: {
    fontSize: 14,
    fontWeight: "700",
    color: rgba(colors.text.primary, 0.5),
  },
  // Scroll Content
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: rgba(colors.text.primary, 0.6),
    textAlign: "center",
  },
  // Chip
  chipContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: "#23483c", // Dark mint/slate background
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: rgba(colors.primary, 0.2),
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
  },
  // Card
  cardContainer: {
    width: "100%",
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: rgba(colors.primary, 0.2),
    position: "relative",
    overflow: "hidden",
  },
  cardBgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: rgba(colors.text.primary, 0.02),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: rgba(colors.primary, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  cardBody: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.text.primary,
    fontWeight: "500",
  },
  // Footer
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradientOverlay: {
    height: 120,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  footerContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: borderRadius.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonText: {
    color: colors.background.dark,
    fontSize: 18,
    fontWeight: "700",
  },
});
