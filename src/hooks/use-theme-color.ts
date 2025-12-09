/**
 * useThemeColor Hook
 * @description Get color based on current theme
 */

import { colors } from "@/src/theme";

import { useColorScheme } from "./use-color-scheme";

// Light/Dark color definitions
const themeColors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
  },
  dark: {
    text: colors.text.primary,
    background: colors.background.dark,
    tint: colors.primary,
    icon: colors.text.muted,
    tabIconDefault: colors.text.muted,
    tabIconSelected: colors.primary,
  },
} as const;

type ThemeColorName = keyof typeof themeColors.light;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName
): string {
  const theme = useColorScheme() ?? "dark";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return themeColors[theme][colorName];
}
