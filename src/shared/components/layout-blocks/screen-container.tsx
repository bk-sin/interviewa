import React, { ReactNode } from "react";
import { StatusBar, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/src/theme";

const { colors } = theme;

/**
 * ScreenContainer - Base container for all screens
 * @description Provides SafeArea handling and consistent background
 *
 * @example
 * ```tsx
 * <ScreenContainer>
 *   <YourContent />
 * </ScreenContainer>
 * ```
 */
export interface ScreenContainerProps {
  /** Child components */
  readonly children: ReactNode;
  /** Additional container styles */
  readonly style?: ViewStyle;
  /** SafeArea edges to apply (default: top, left, right) */
  readonly edges?: ("top" | "bottom" | "left" | "right")[];
  /** StatusBar style */
  readonly statusBarStyle?: "dark-content";
  /** Test ID for testing */
  readonly testID?: string;
}

export function ScreenContainer({
  children,
  style,
  edges = ["top", "left", "right"],
  statusBarStyle = "dark-content",
  testID,
}: ScreenContainerProps) {
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
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
});
