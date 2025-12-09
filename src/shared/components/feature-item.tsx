import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Feature } from "@/src/config";
import { theme } from "@/src/theme";

/**
 * Props interface for FeatureItem component
 */
export interface FeatureItemProps {
  /** Feature data object containing id, icon, title, and description */
  readonly feature: Feature;
  /** Optional test ID for testing purposes */
  readonly testID?: string;
}

/**
 * FeatureItem - Displays a single feature with icon, title, and description
 * Memoized to prevent unnecessary re-renders when parent updates
 */
export const FeatureItem = memo(function FeatureItem({
  feature,
  testID,
}: FeatureItemProps) {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`${feature.title}: ${feature.description}`}
    >
      <View
        style={styles.iconContainer}
        accessibilityElementsHidden={true}
        importantForAccessibility="no-hide-descendants"
      >
        <MaterialIcons
          name={feature.icon}
          size={theme.layout.iconSize.base}
          color={theme.colors.text.primary}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{feature.title}</Text>
        <Text style={styles.description}>{feature.description}</Text>
      </View>
    </View>
  );
});

// Display name for debugging
FeatureItem.displayName = "FeatureItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.base,
  },
  iconContainer: {
    width: theme.layout.iconSize.xl + 8,
    height: theme.layout.iconSize.xl + 8,
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  description: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
});
