import React, { memo, useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { Text } from "@/src/shared/components/text/themed-text-inter";
import { theme } from "@/src/theme";

import { RolePill } from "./role-pill";

const { spacing, typography, colors } = theme;

/**
 * Role data structure
 */
export interface Role {
  /** Unique identifier */
  readonly id: string;
  /** Display name */
  readonly name: string;
}

/**
 * RolesScroller - Virtualized horizontal scrollable list of role pills
 * @description Horizontal scroller for selecting interview roles
 *
 * @example
 * ```tsx
 * <RolesScroller
 *   roles={roles}
 *   onRoleSelect={(id) => console.log(id)}
 * />
 * ```
 */
export interface RolesScrollerProps {
  /** Section title */
  readonly title?: string;
  /** Array of roles to display */
  readonly roles: Role[];
  /** Currently selected role ID */
  readonly selectedRoleId?: string;
  /** Callback when a role is selected */
  readonly onRoleSelect?: (roleId: string) => void;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

const keyExtractor = (item: Role): string => item.id;

const ItemSeparator = memo(() => <View style={styles.separator} />);
ItemSeparator.displayName = "ItemSeparator";

export const RolesScroller = memo(function RolesScroller({
  title = "Roles más usados",
  roles,
  selectedRoleId,
  onRoleSelect,
  style,
  testID,
}: RolesScrollerProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string>(
    selectedRoleId || roles[0]?.id || ""
  );

  const activeRoleId = selectedRoleId ?? internalSelectedId;

  const handleRolePress = useCallback(
    (roleId: string) => {
      if (onRoleSelect) {
        onRoleSelect(roleId);
      } else {
        setInternalSelectedId(roleId);
      }
    },
    [onRoleSelect]
  );

  const renderItem: ListRenderItem<Role> = useCallback(
    ({ item }) => (
      <RolePill
        role={item.name}
        isActive={item.id === activeRoleId}
        onPress={() => handleRolePress(item.id)}
      />
    ),
    [activeRoleId, handleRolePress]
  );

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessible={true}
      accessibilityRole="list"
      accessibilityLabel={`${title}, ${roles.length} roles disponibles`}
    >
      <Text style={[typography.h4, styles.title]}>{title}</Text>
      <FlatList
        horizontal
        data={roles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ItemSeparatorComponent={ItemSeparator}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
      />
    </View>
  );
});

RolesScroller.displayName = "RolesScroller";

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text.primary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.base,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
  },
  separator: {
    width: spacing.sm,
  },
});
