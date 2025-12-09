import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { theme } from "@/src/theme";

const { borderRadius, colors } = theme;

/**
 * Available icon box size variants
 */
export type IconBoxSize = "sm" | "md" | "lg";

/**
 * Props for IconBox component
 */
export interface IconBoxProps {
  /** Material icon name */
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  /** Size variant of the icon box */
  readonly size?: IconBoxSize;
  /** Icon color */
  readonly iconColor?: string;
  /** Background color of the box */
  readonly backgroundColor?: string;
  /** Additional styles */
  readonly style?: ViewStyle;
  /** Optional test ID */
  readonly testID?: string;
}

const sizeConfig: Record<IconBoxSize, { box: number; icon: number }> = {
  sm: { box: 32, icon: 18 },
  md: { box: 40, icon: 24 },
  lg: { box: 48, icon: 28 },
};

/**
 * IconBox - Container for displaying icons with consistent styling
 */
export const IconBox = memo(function IconBox({
  icon,
  size = "md",
  iconColor = colors.text.primary,
  backgroundColor = theme.rgba(colors.primary, 0.2),
  style,
  testID,
}: IconBoxProps) {
  const { box, icon: iconSize } = sizeConfig[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: box,
          height: box,
          backgroundColor,
        },
        style,
      ]}
      testID={testID}
    >
      <MaterialIcons name={icon} size={iconSize} color={iconColor} />
    </View>
  );
});

IconBox.displayName = "IconBox";

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.base,
    alignItems: "center",
    justifyContent: "center",
  },
});
