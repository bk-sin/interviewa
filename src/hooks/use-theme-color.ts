/**
 * useThemeColor Hook
 * @description Get color based on current theme
 */

import { colors } from "@/src/theme";


// color definitions
const themeColors = {
  dark: {
    text: colors.text.primary,
    background: colors.background.dark,
    tint: colors.primary,
    icon: colors.text.muted,
    tabIconDefault: colors.text.muted,
    tabIconSelected: colors.primary,
  },
} as const;

type ThemeColorName = keyof typeof themeColors.dark;

export function useThemeColor(
  props: { dark?: string },
  colorName: ThemeColorName
): string {
  const theme = "dark";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return themeColors[theme][colorName];
}
