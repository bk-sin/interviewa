import React, { memo } from "react";
import {
  AccessibilityRole,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import {
  borderRadius,
  colors,
  layout,
  shadows,
  spacing,
  typography,
} from "@/src/theme";
import { Text } from "../components/text/themed-text-inter";

/**
 * Available button variants
 */
export type ButtonVariant = "primary" | "secondary" | "social" | "link";

/**
 * Props interface for Button component
 */
export interface ButtonProps {
  /** Function called when button is pressed */
  readonly onPress: () => void;
  /** Button label text */
  readonly children: string;
  /** Visual variant of the button */
  readonly variant?: ButtonVariant;
  /** Optional icon element to display before text */
  readonly icon?: React.ReactNode;
  /** Additional styles for the button container */
  readonly style?: ViewStyle;
  /** Whether the button is disabled */
  readonly disabled?: boolean;
  /** Whether button should take full width of container */
  readonly fullWidth?: boolean;
  /** Accessibility label for screen readers */
  readonly accessibilityLabel?: string;
  /** Accessibility hint describing button action */
  readonly accessibilityHint?: string;
  /** Accessibility role override */
  readonly accessibilityRole?: AccessibilityRole;
  /** Optional test ID for testing purposes */
  readonly testID?: string;
}

/**
 * Button - Reusable button component with multiple variants
 * Memoized to prevent unnecessary re-renders
 */
export const Button = memo(function Button({
  onPress,
  children,
  variant = "primary",
  icon,
  style,
  disabled = false,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  testID,
}: ButtonProps) {
  const role: AccessibilityRole = accessibilityRole ?? "button";
  const isLinkVariant = variant === "link";

  const buttonStyle = [
    styles.button,
    variant === "primary" && styles.primaryButton,
    variant === "secondary" && styles.secondaryButton,
    variant === "social" && styles.socialButton,
    isLinkVariant && styles.linkButton,
    disabled && styles.disabledButton,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    variant === "primary" && styles.primaryButtonText,
    variant === "secondary" && styles.secondaryButtonText,
    variant === "social" && styles.socialButtonText,
    isLinkVariant && styles.linkButtonText,
    disabled && styles.disabledButtonText,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      activeOpacity={0.8}
      disabled={disabled}
      accessible={true}
      accessibilityRole={role}
      accessibilityLabel={accessibilityLabel || children}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      testID={testID}
    >
      {icon}
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
});

// Display name for debugging
Button.displayName = "Button";

const styles = StyleSheet.create({
  button: {
    height: layout.buttonHeight,
    borderRadius: borderRadius.base,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    ...shadows.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    marginTop: spacing.base,
  },
  secondaryButton: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  socialButton: {
    backgroundColor: "#23483c",
  },
  linkButton: {
    backgroundColor: "transparent",
    height: undefined,
    minHeight: undefined,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 0,
    shadowColor: "transparent",
    elevation: 0,
    gap: 0,
  },
  fullWidth: {
    width: "100%",
  },
  disabledButton: {
    opacity: 0.9,
  },
  buttonText: {
    ...typography.button,
  },
  primaryButtonText: {
    color: colors.text.dark,
  },
  secondaryButtonText: {
    color: colors.text.primary,
  },
  socialButtonText: {
    color: colors.text.primary,
  },
  linkButtonText: {
    color: colors.primary,
  },
  disabledButtonText: {
    color: colors.text.muted,
  },
});
