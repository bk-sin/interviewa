import React, { ReactNode } from "react";
import { ScrollView, StatusBar, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/src/theme";

const { colors } = theme;

/**
 * ScrollScreen - Scrollable screen container with SafeArea
 * @description Use this for screens that need vertical scrolling
 *
 * @example
 * ```tsx
 * <ScrollScreen>
 *   <Section><Card /></Section>
 *   <Section><List /></Section>
 * </ScrollScreen>
 * ```
 */
export interface ScrollScreenProps {
  /** Child components */
  readonly children: ReactNode;
  /** Additional container styles */
  readonly style?: ViewStyle;
  /** Additional scroll content styles */
  readonly contentStyle?: ViewStyle;
  /** SafeArea edges to apply (default: top, left, right - bottom handled by tabs) */
  readonly edges?: ("top" | "bottom" | "left" | "right")[];
  /** StatusBar style */
  readonly statusBarStyle?: "light-content" | "dark-content";
  /** Show scroll indicator */
  readonly showsScrollIndicator?: boolean;
  /** Bottom padding for scroll content */
  readonly bottomPadding?: number;
  /** Test ID for testing */
  readonly testID?: string;
}

export function ScrollScreen({
  children,
  style,
  contentStyle,
  edges = ["top", "left", "right"],
  statusBarStyle = "light-content",
  showsScrollIndicator = false,
  bottomPadding = 100,
  testID,
}: ScrollScreenProps) {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={edges}
      testID={testID}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={colors.background.dark}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPadding },
          contentStyle,
        ]}
        showsVerticalScrollIndicator={showsScrollIndicator}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
