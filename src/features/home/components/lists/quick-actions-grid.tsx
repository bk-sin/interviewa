import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { theme } from "@/src/theme";
import type { QuickAction } from "@/src/types";

import { QuickActionCard } from "../cards/quick-action-card";

const { spacing } = theme;

// Re-export type for convenience
export type { QuickAction };

/**
 * QuickActionsGrid - Grid of actionable cards
 * @description Displays quick action cards in a row
 *
 * @example
 * ```tsx
 * <QuickActionsGrid
 *   actions={actions}
 *   onActionPress={(id) => handleAction(id)}
 * />
 * ```
 */
export interface QuickActionsGridProps {
  /** Array of quick actions to display */
  readonly actions: QuickAction[];
  /** Callback when an action is pressed */
  readonly onActionPress?: (actionId: string) => void;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

export const QuickActionsGrid = memo(function QuickActionsGrid({
  actions,
  onActionPress,
  style,
  testID,
}: QuickActionsGridProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {actions.map((action) => (
        <QuickActionCard
          key={action.id}
          icon={action.icon}
          title={action.title}
          subtitle={action.subtitle}
          onPress={() => onActionPress?.(action.id)}
        />
      ))}
    </View>
  );
});

QuickActionsGrid.displayName = "QuickActionsGrid";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.base,
  },
});
