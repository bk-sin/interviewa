/**
 * Typography System
 * Fonts, sizes, and text styles
 */

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  // System fonts (for compatibility)
  rounded: "System",
  mono: "SpaceMono",
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
