import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
 * Valid Material Icons names
 */
export type MaterialIconName = React.ComponentProps<
  typeof MaterialIcons
>["name"];

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
  /** Optional icon element to display before text (deprecated, use leftAccessory) */
  readonly icon?: React.ReactNode;
  /** Optional Material Icon name to display on the left side */
  readonly leftIcon?: MaterialIconName;
  /** Optional Material Icon name to display on the right side */
  readonly rightIcon?: MaterialIconName;
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
  leftIcon,
  rightIcon,
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

  // Determine icon color based on variant
  const getIconColor = () => {
    if (disabled) return colors.text.muted;
    if (variant === "primary") return colors.text.dark;
    if (variant === "link") return colors.primary;
    return colors.text.primary;
  };

  const iconColor = getIconColor();
  const iconSize = 20;

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
      {/* Backwards compatibility: show icon prop if provided */}
      {icon}
      {/* Left accessory as Material Icon */}
      {leftIcon && (
        <MaterialIcons name={leftIcon} size={iconSize} color={iconColor} />
      )}
      <Text style={textStyle}>{children}</Text>
      {/* Right accessory as Material Icon */}
      {rightIcon && (
        <MaterialIcons name={rightIcon} size={iconSize} color={iconColor} />
      )}
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
  },
  secondaryButton: {
    backgroundColor: colors.background.card,
    borderWidth: 0,
    borderColor: colors.border.dark,
    elevation: 0,
  },
  socialButton: {
    backgroundColor: colors.background.accent,
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
