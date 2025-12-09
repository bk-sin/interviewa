/**
 * Layout System
 * Layout constants and dimensions
 */

import { spacing } from "./spacing";

export const layout = {
  containerPadding: spacing.base,
  headerHeight: 64,
  tabBarHeight: 60,
  inputHeight: 48,
  buttonHeight: 48,
  iconSize: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 32,
    xl: 40,
  },
} as const;

export const opacity = {
  transparent: 0,
  "05": 0.05,
  "10": 0.1,
  "20": 0.2,
  "30": 0.3,
  "40": 0.4,
  "50": 0.5,
  "60": 0.6,
  "70": 0.7,
  "80": 0.8,
  "90": 0.9,
  full: 1,
} as const;

/**
 * Helper to create rgba colors from hex
 */
export const rgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
