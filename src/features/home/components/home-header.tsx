import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Text } from "@/src/shared/components";
import { theme } from "@/src/theme";

const { borderRadius, colors, spacing, typography } = theme;

/**
 * Props for HomeHeader component
 */
export interface HomeHeaderProps {
  /** User's display name */
  readonly userName: string;
  /** Greeting subtitle message */
  readonly subtitle?: string;
  /** Callback when profile button is pressed */
  readonly onProfilePress?: () => void;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

/**
 * HomeHeader - Header with greeting message and profile button
 */
export const HomeHeader = memo(function HomeHeader({
  userName,
  subtitle = "¡Es un gran día para practicar!",
  onProfilePress,
  style,
  testID,
}: HomeHeaderProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View>
        <Text style={[typography.h3, styles.greeting]}>
          Hola, {userName} 👋
        </Text>
        <Text style={[typography.bodySmall, styles.subtitle]}>{subtitle}</Text>
      </View>
      <TouchableOpacity
        onPress={onProfilePress}
        style={styles.profileButton}
        accessibilityLabel="Ver perfil"
        accessibilityRole="button"
      >
        <MaterialIcons name="person" size={24} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
});

HomeHeader.displayName = "HomeHeader";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.base,
    paddingTop: spacing.xl,
  },
  greeting: {
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.card,
    alignItems: "center",
    justifyContent: "center",
  },
});

