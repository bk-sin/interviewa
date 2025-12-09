import { theme } from "@/src/theme";
import { Link } from "expo-router";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface ErrorAlertProps {
  /** Main error message */
  message: string;
  /** Optional suggestion text */
  suggestion?: string;
  /** Optional link text for the suggestion */
  linkText?: string;
  /** Optional link href for navigation */
  linkHref?: string;
}

/**
 * ErrorAlert - Accessible error display component
 * Features:
 * - accessibilityLiveRegion for screen reader announcements
 * - Support for suggestions with optional navigation links
 * - Consistent styling across the app
 */
export const ErrorAlert = memo(function ErrorAlert({
  message,
  suggestion,
  linkText,
  linkHref,
}: ErrorAlertProps) {
  return (
    <View
      style={styles.container}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      accessible={true}
      accessibilityLabel={`Error: ${message}${
        suggestion ? `. ${suggestion}` : ""
      }`}
    >
      <Text style={styles.message}>{message}</Text>
      {suggestion && (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionText}>
            {suggestion}{" "}
            {linkHref && linkText && (
              <Link href={linkHref as any} asChild>
                <Text style={styles.link}>{linkText}</Text>
              </Link>
            )}
          </Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fee2e2",
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    width: "100%",
    maxWidth: 480,
  },
  message: {
    ...theme.typography.bodySmall,
    color: "#dc2626",
    textAlign: "center",
  },
  suggestionContainer: {
    marginTop: theme.spacing.xs,
  },
  suggestionText: {
    ...theme.typography.bodySmall,
    color: "#dc2626",
    textAlign: "center",
  },
  link: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
});
