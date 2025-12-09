import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

const { colors, spacing, typography } = theme;

/**
 * LoadingScreen - Full screen loading indicator
 * @description Display while content is being fetched
 *
 * @example
 * ```tsx
 * if (isLoading) return <LoadingScreen />;
 * if (isLoading) return <LoadingScreen message="Cargando entrevistas..." />;
 * ```
 */
export interface LoadingScreenProps {
  /** Loading message to display */
  readonly message?: string;
  /** Additional container styles */
  readonly style?: ViewStyle;
  /** Test ID for testing */
  readonly testID?: string;
}

export function LoadingScreen({
  message = "Cargando...",
  style,
  testID,
}: LoadingScreenProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[typography.body, styles.message]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.dark,
    padding: spacing.xl,
  },
  message: {
    color: colors.text.secondary,
    marginTop: spacing.base,
    textAlign: "center",
  },
});
