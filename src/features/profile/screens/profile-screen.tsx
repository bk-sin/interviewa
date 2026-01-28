import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/src/shared/components";
import { colors, spacing } from "@/src/theme";

/**
 * Pulsing Dot Component
 * @description Animated dot with pulsing effect
 */
const PulsingDot = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return <Animated.View style={[styles.dot, { opacity }]} />;
};

/**
 * Header Component
 */
const Header = () => (
  <View style={styles.header}>
    <ThemedText style={styles.headerTitle}>Estado de Uso</ThemedText>
    <TouchableOpacity style={styles.settingsButton}>
      <MaterialIcons name="settings" size={20} color={colors.primary.main} />
    </TouchableOpacity>
  </View>
);

/**
 * Premium Card Component
 */
const PremiumCard = () => (
  <View style={styles.premiumCardContainer}>
    <View style={styles.premiumCardInner}>
      <View style={styles.planBadge}>
        <PulsingDot />
        <ThemedText style={styles.planText}>PLAN ACTUAL</ThemedText>
      </View>

      <ThemedText style={styles.statsTitle}>
        🎤 1 <ThemedText style={{ color: colors.primary.main }}>/</ThemedText> 1
      </ThemedText>
      <ThemedText style={styles.statsSubtitle}>Entrevistas usadas</ThemedText>

      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>

      <ThemedText style={styles.limitText}>Límite semanal alcanzado</ThemedText>
    </View>
  </View>
);

/**
 * Last Result Card Component
 */
const LastResultCard = () => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <ThemedText style={styles.sectionLabel}>ÚLTIMO RESULTADO</ThemedText>
      <ThemedText style={styles.dateLabel}>12 Ene</ThemedText>
    </View>

    <View style={styles.resultCard}>
      <View style={styles.resultRow}>
        <View style={styles.resultDot} />
        <View style={styles.resultContent}>
          <ThemedText style={styles.resultTitle}>
            Tu foco:{" "}
            <ThemedText style={{ color: colors.primary.main }}>
              Empieza con una frase-resumen
            </ThemedText>
          </ThemedText>
          <ThemedText style={styles.resultDescription}>
            Tus respuestas son sólidas, pero falta estructura inicial para guiar
            al reclutador durante los primeros segundos.
          </ThemedText>
        </View>
      </View>
    </View>
  </View>
);

/**
 * Upgrade Section Component
 */
const UpgradeSection = () => (
  <View style={styles.upgradeContainer}>
    <TouchableOpacity activeOpacity={1} style={styles.lockedButton}>
      <MaterialIcons name="lock" size={20} color={colors.text.tertiary} />
      <ThemedText style={styles.lockedButtonText}>
        Desbloquear más entrevistas
      </ThemedText>
    </TouchableOpacity>

    <ThemedText style={styles.comingSoonText}>
      INTERVIEWA PRO · PRÓXIMAMENTE
    </ThemedText>
  </View>
);

/**
 * ProfileScreen
 * @description User profile screen with usage stats and upgrade options
 */
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background.dark}
      />

      <View style={styles.contentContainer}>
        <Header />

        <ScrollView
          contentContainerStyle={styles.scrollPadding}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.spacerTop} />
          <PremiumCard />
          <LastResultCard />
          <UpgradeSection />

          <View style={styles.footerQuote}>
            <ThemedText style={styles.quoteText}>
              "Las buenas entrevistas no se improvisan. Se entrenan."
            </ThemedText>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  contentContainer: {
    flex: 1,
  },
  scrollPadding: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 130,
  },
  spacerTop: {
    height: 10,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  settingsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  // Premium Card
  premiumCardContainer: {
    marginTop: 10,
    borderRadius: 24,
    backgroundColor: colors.border.light,
    padding: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 10,
  },
  premiumCardInner: {
    backgroundColor: colors.background.light,
    borderRadius: 23,
    padding: spacing.xl,
    alignItems: "center",
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary.main,
  },
  planText: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.primary.main,
    letterSpacing: 2,
  },
  statsTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.text.primary,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  statsSubtitle: {
    marginTop: spacing.sm,
    fontSize: 15,
    fontWeight: "500",
    color: colors.text.primary,
    textAlign: "center",
  },
  progressTrack: {
    marginTop: spacing.lg,
    width: "100%",
    height: 6,
    backgroundColor: colors.background.dark,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary.main,
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  limitText: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  // Last Result Section
  sectionContainer: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text.secondary,
    letterSpacing: 1.5,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.text.tertiary,
  },
  resultCard: {
    backgroundColor: colors.background.light,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  resultDot: {
    marginTop: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.main,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  resultDescription: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  // Upgrade Section
  upgradeContainer: {
    marginTop: 40,
  },
  lockedButton: {
    width: "100%",
    height: 56,
    backgroundColor: colors.background.accent,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.dark,
    opacity: 0.8,
  },
  lockedButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.tertiary,
  },
  comingSoonText: {
    marginTop: spacing.sm,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
    color: colors.text.tertiary,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  // Footer
  footerQuote: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    alignItems: "center",
  },
  quoteText: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "italic",
    color: colors.text.tertiary,
    textAlign: "center",
    maxWidth: 220,
    lineHeight: 22,
  },
});
