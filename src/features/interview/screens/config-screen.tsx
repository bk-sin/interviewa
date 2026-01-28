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
 * Pulsing Text Component
 * @description Animated motivational text with fade effect
 */
const PulsingText = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.Text style={[styles.motivationalText, { opacity }]}>
      Take a breath. This is just practice.
    </Animated.Text>
  );
};

/**
 * Stat Item Component
 */
interface StatItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => (
  <View style={styles.statItemRow}>
    <View style={styles.statIconContainer}>
      <MaterialIcons name={icon} size={20} color={colors.primary.main} />
    </View>
    <View>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
  </View>
);

/**
 * Practice Item Component
 */
interface PracticeItemProps {
  title: string;
  subtitle: string;
}

const PracticeItem = ({ title, subtitle }: PracticeItemProps) => (
  <View style={styles.practiceRow}>
    <View style={styles.checkContainer}>
      <MaterialIcons name="check" size={14} color={colors.primary.main} />
    </View>
    <View>
      <ThemedText style={styles.practiceTitle}>{title}</ThemedText>
      <ThemedText style={styles.practiceSubtitle}>{subtitle}</ThemedText>
    </View>
  </View>
);

/**
 * ConfigScreen (Pre-Session)
 * @description Interview pre-session screen showing what to expect
 */
export default function ConfigScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background.dark}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Title Section */}
          <View style={styles.introSection}>
            <View style={styles.badgeRow}>
              <View style={styles.badgeDot} />
              <ThemedText style={styles.badgeText}>
                YOU'RE ABOUT TO START
              </ThemedText>
            </View>

            <ThemedText style={styles.mainTitle}>
              Behavioral Interview
            </ThemedText>

            <View style={styles.descriptionContainer}>
              <ThemedText style={styles.descriptionText}>
                Interview-style questions focused on how you explain your
                experience and respond to scenarios.
              </ThemedText>
            </View>
          </View>

          {/* Stats Divider */}
          <View style={styles.statsContainer}>
            <StatItem icon="timer" value="~10 minutes" label="DURATION" />
            <StatItem icon="forum" value="5 questions" label="FORMAT" />
          </View>

          {/* Practice List */}
          <View style={styles.practiceSection}>
            <ThemedText style={styles.sectionHeader}>
              You'll be practicing
            </ThemedText>

            <View style={styles.practiceList}>
              <PracticeItem
                title="Clarity"
                subtitle="Expressing ideas concisely."
              />
              <PracticeItem
                title="Structure"
                subtitle="Logical, organized answers."
              />
              <PracticeItem
                title="Confidence"
                subtitle="Calm, professional delivery."
              />
            </View>
          </View>

          {/* Animated Motivational Text */}
          <View style={styles.motivationContainer}>
            <PulsingText />
          </View>

          {/* Padding for Bottom Button */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Footer Fixed Button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.9}>
          <ThemedText style={styles.startButtonText}>
            Start interview
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
  },
  // Intro Section
  introSection: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.main,
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  badgeText: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: 38,
  },
  descriptionContainer: {
    borderLeftWidth: 2,
    borderLeftColor: colors.border.light,
    paddingLeft: spacing.md,
    paddingVertical: 2,
  },
  descriptionText: {
    color: colors.text.tertiary,
    fontSize: 16,
    lineHeight: 24,
  },
  // Stats
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.dark,
    marginBottom: spacing.xl,
  },
  statItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: colors.background.accent,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  statLabel: {
    color: colors.text.tertiary,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  // Practice Section
  practiceSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  practiceList: {
    gap: spacing.lg,
  },
  practiceRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background.accent,
    borderWidth: 1,
    borderColor: colors.primary.light,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  practiceSubtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  // Motivation
  motivationContainer: {
    alignItems: "center",
    marginTop: spacing.lg,
  },
  motivationalText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.tertiary,
  },
  // Footer
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: Platform.OS === "ios" ? 34 : spacing.lg,
    paddingTop: spacing.lg,
    backgroundColor: colors.background.dark,
    borderTopWidth: 1,
    borderTopColor: colors.border.dark,
  },
  startButton: {
    backgroundColor: colors.primary.main,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  startButtonText: {
    color: colors.background.dark,
    fontSize: 18,
    fontWeight: "bold",
  },
});
