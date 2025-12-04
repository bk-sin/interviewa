/**
 * Theme Design System
 * Colores, tipografía, espaciado, sombras y más
 */

export const colors = {
  // Primary Colors
  primary: "#13eca4",
  primaryLight: "#5ff4c4",
  primaryDark: "#0d9f7a",
  primaryMuted: "rgba(19, 236, 164, 0.2)",

  // Background Colors
  background: {
    light: "#ffffff",
    dark: "#10221c",
    card: "#1a2f28",
    input: "#f6f8f7",
  },

  // Text Colors
  text: {
    primary: "#ffffff",
    secondary: "#92c9b7",
    dark: "#10221c",
    muted: "#6b7280",
    error: "#ef4444",
    success: "#10b981",
  },

  // UI Colors
  border: {
    light: "#e5e7eb",
    dark: "#374151",
    focus: "#13eca4",
  },

  // Status Colors
  status: {
    error: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    info: "#3b82f6",
  },

  // Gradients
  gradients: {
    primary: ["#13eca4", "#0d9f7a", "#0a7d5f"],
    dark: ["#10221c", "#1a2f28"],
  },
} as const;

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 36,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
} as const;

export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: fontSizes["4xl"],
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: fontSizes["3xl"],
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: fonts.bold,
    fontSize: fontSizes["2xl"],
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h4: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.xl,
    lineHeight: 28,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.base,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.base,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.xs,
    lineHeight: 16,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.base,
    lineHeight: 24,
  },
  buttonLarge: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.lg,
    lineHeight: 28,
  },
} as const;

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

// Utility functions
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

// Helper to create rgba colors
export const rgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const theme = {
  colors,
  fonts,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
  typography,
  layout,
  opacity,
  rgba,
} as const;

export default theme;
