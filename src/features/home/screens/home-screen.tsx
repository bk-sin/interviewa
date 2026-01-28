import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AUTH_ROUTES } from "@/src/features/auth";
import { useUserSync } from "@/src/features/auth/hooks";
import {
  ActiveSessionCard,
  FeaturedCard,
  HeroSection,
  StepsGrid,
} from "@/src/features/home/components";
import { INTERVIEW_ROUTES } from "@/src/features/interview";
import { ONBOARDING_ROUTE, TAB_ROUTES } from "@/src/lib/navigation";
import { theme } from "@/src/theme";

const { spacing, colors } = theme;

/**
 * HomeScreen
 * @description Main dashboard showing interview stats, quick actions and history
 */
export default function HomeScreen() {
  // Sync user with backend once when home loads (only if auth is enabled)
  // Call hook unconditionally, but it will be a no-op if SKIP_AUTH is true
  useUserSync();
  const router = useRouter();

  const isDebug = __DEV__;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background.dark}
      />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons
                name="grid-view"
                size={20}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons
                name="notifications"
                size={20}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mainPadding}>
            <HeroSection />
            <StepsGrid />
            <View style={styles.cardsGap}>
              <ActiveSessionCard />
              <FeaturedCard />
            </View>

            {/* Debug Navigation Buttons */}
            {isDebug && (
              <View style={styles.debugSection}>
                <Text style={styles.debugTitle}>🔧 Debug Navigation</Text>

                <Text style={styles.debugSubtitle}>Auth Screens</Text>
                <View style={styles.debugGrid}>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(AUTH_ROUTES.SIGN_IN)}
                  >
                    <Text style={styles.debugButtonText}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(AUTH_ROUTES.SIGN_UP)}
                  >
                    <Text style={styles.debugButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(AUTH_ROUTES.VERIFY_EMAIL)}
                  >
                    <Text style={styles.debugButtonText}>Verify Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(AUTH_ROUTES.VERIFY_2FA)}
                  >
                    <Text style={styles.debugButtonText}>Verify 2FA</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.debugSubtitle}>Interview Flow</Text>
                <View style={styles.debugGrid}>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.START)}
                  >
                    <Text style={styles.debugButtonText}>Start</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.CONFIG)}
                  >
                    <Text style={styles.debugButtonText}>Config</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.CONFIG_ROLE)}
                  >
                    <Text style={styles.debugButtonText}>Config Role</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.SESSION)}
                  >
                    <Text style={styles.debugButtonText}>Session</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.PROCESSING)}
                  >
                    <Text style={styles.debugButtonText}>Processing</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.MICRO_FEEDBACK)}
                  >
                    <Text style={styles.debugButtonText}>Micro Feedback</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.CHECKPOINT)}
                  >
                    <Text style={styles.debugButtonText}>Checkpoint</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.FOLLOW_UP)}
                  >
                    <Text style={styles.debugButtonText}>Follow Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(INTERVIEW_ROUTES.FINAL_REPORT)}
                  >
                    <Text style={styles.debugButtonText}>Final Report</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.debugSubtitle}>Other Screens</Text>
                <View style={styles.debugGrid}>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(ONBOARDING_ROUTE)}
                  >
                    <Text style={styles.debugButtonText}>Onboarding</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(TAB_ROUTES.PRACTICES)}
                  >
                    <Text style={styles.debugButtonText}>Practices</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(TAB_ROUTES.HISTORY)}
                  >
                    <Text style={styles.debugButtonText}>History</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => router.push(TAB_ROUTES.PROFILE)}
                  >
                    <Text style={styles.debugButtonText}>Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  mainPadding: {
    paddingHorizontal: spacing.lg,
  },
  cardsGap: {
    gap: spacing.xl,
  },
  debugSection: {
    marginTop: spacing.xl * 2,
    padding: spacing.lg,
    backgroundColor: colors.background.accent,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  debugTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary.main,
    marginBottom: spacing.lg,
  },
  debugSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  debugGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  debugButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.light,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  debugButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text.secondary,
  },
});
