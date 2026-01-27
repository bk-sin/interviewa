import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useUserSync } from "@/src/features/auth/hooks";
import {
  ActiveSessionCard,
  FeaturedCard,
  HeroSection,
  StepsGrid,
} from "@/src/features/home/components";
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
});
