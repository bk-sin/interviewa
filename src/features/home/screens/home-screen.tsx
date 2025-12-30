import { router } from "expo-router";
import React, { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  MOCK_HISTORY_ENTRIES,
  MOCK_LAST_INTERVIEW,
  MOCK_QUICK_ACTIONS,
  MOCK_ROLES,
  MOCK_STATS_METRICS,
  MOCK_USER_STATS,
} from "@/__mocks__/data.mock";
import { useUserSync } from "@/src/features/auth/hooks";
import {
  ContinueCard,
  HeroCard,
  HistoryList,
  HomeHeader,
  QuickActionsGrid,
  RolesScroller,
  StatsCard,
} from "@/src/features/home/components";
import { ThemedView } from "@/src/shared";
import { theme } from "@/src/theme";

const { spacing } = theme;

/**
 * HomeScreen
 * @description Main dashboard showing interview stats, quick actions and history
 */
export default function HomeScreen() {
  // Sync user with backend once when home loads
  useUserSync();

  // Memoized handlers to prevent unnecessary re-renders
  const handleProfilePress = useCallback(() => {
    router.push("/profile");
  }, []);

  const handleStartInterview = useCallback(() => {
    // TODO: Navigate to interview session
    router.push("/interview/processing");
    console.log("Start interview");
  }, []);

  const handleSelectRole = useCallback(() => {
    // TODO: Navigate to role selection
    console.log("Select role");
  }, []);

  const handleContinueInterview = useCallback(() => {
    // TODO: Resume last interview
    console.log("Continue interview");
  }, []);

  const handleRoleSelect = useCallback((roleId: string) => {
    // TODO: Start interview with selected role
    console.log("Role selected:", roleId);
  }, []);

  const handleQuickAction = useCallback((actionId: string) => {
    // TODO: Handle quick action navigation
    console.log("Quick action:", actionId);
  }, []);

  return (
    <ThemedView>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <HomeHeader userName="Emi" onProfilePress={handleProfilePress} />

        {/* Hero Card */}
        <View style={styles.section}>
          <HeroCard
            onPrimaryPress={handleStartInterview}
            onSecondaryPress={handleSelectRole}
          />
        </View>

        {/* Stats Card */}
        <View style={styles.section}>
          <StatsCard
            averageScore={MOCK_USER_STATS.averageScore}
            streakDays={MOCK_USER_STATS.streakDays}
            metrics={MOCK_STATS_METRICS}
          />
        </View>

        {/* Continue Last Interview */}
        <View style={styles.section}>
          <ContinueCard
            subtitle={`${MOCK_LAST_INTERVIEW.role}: ${MOCK_LAST_INTERVIEW.question}`}
            onPlayPress={handleContinueInterview}
          />
        </View>

        {/* Roles Scroller */}
        <RolesScroller roles={MOCK_ROLES} onRoleSelect={handleRoleSelect} />

        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <QuickActionsGrid
            actions={MOCK_QUICK_ACTIONS}
            onActionPress={handleQuickAction}
          />
        </View>

        {/* History List */}
        <View style={styles.section}>
          <HistoryList entries={MOCK_HISTORY_ENTRIES} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
});
