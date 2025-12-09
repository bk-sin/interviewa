import { MaterialIcons } from "@expo/vector-icons";
import React, { memo, useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

import { HistoryItem } from "./history-item";

const { spacing, typography, colors } = theme;

/**
 * History entry data structure
 */
export interface HistoryEntry {
  /** Unique identifier */
  readonly id: string;
  /** Material icon name */
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  /** Practice title */
  readonly title: string;
  /** Date description */
  readonly date: string;
  /** Score achieved */
  readonly score: string;
  /** Whether score should be highlighted */
  readonly isPrimaryScore?: boolean;
}

/**
 * HistoryList - Virtualized list of past practice sessions
 * @description Uses FlatList for better performance with larger datasets
 *
 * @example
 * ```tsx
 * <HistoryList entries={historyData} />
 * ```
 */
export interface HistoryListProps {
  /** Section title */
  readonly title?: string;
  /** Array of history entries */
  readonly entries: HistoryEntry[];
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

const keyExtractor = (item: HistoryEntry): string => item.id;

export const HistoryList = memo(function HistoryList({
  title = "Últimas 5 prácticas",
  entries,
  style,
  testID,
}: HistoryListProps) {
  const renderItem: ListRenderItem<HistoryEntry> = useCallback(
    ({ item }) => (
      <HistoryItem
        icon={item.icon}
        title={item.title}
        date={item.date}
        score={item.score}
        isPrimaryScore={item.isPrimaryScore}
      />
    ),
    []
  );

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessible={true}
      accessibilityRole="list"
      accessibilityLabel={`${title}, ${entries.length} elementos`}
    >
      <Text style={[typography.h4, styles.title]}>{title}</Text>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
});

HistoryList.displayName = "HistoryList";

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
});
